import propertyListingSchema, {
  backendPropertyListingSchema,
} from "../../validations/propertyListing.validation";
import PropertyListing from "../models/PropertyListing.schema";
import { deleteImage, uploadFiles } from "../utils/s3";
import { removeFromArray } from "../../utils/helpers";

import { ITEMS_PER_PAGE } from "../../config/constants";
import {
  IMAGE_NOT_FOUND,
  INVALID_REQUEST,
  LISTING_NOT_FOUND,
} from "../utils/errors";
import { generateUniqueId } from "../utils/apiHelpers";

const isValidListing = async (listingData) => {
  return await backendPropertyListingSchema.isValid(listingData);
};

const getPaginatedListings = async (page, filters = {}) => {
  const isAllPages = page === "all";
  const numberOfResults = await PropertyListing.countDocuments(filters);

  if (isAllPages) {
    const listings = await PropertyListing.find(filters);
    return { totalPages: 1, currentPage: 1, numberOfResults, listings };
  }

  const currentPage = Number(page) || 1;

  let totalPages = numberOfResults / ITEMS_PER_PAGE;
  totalPages = Math.ceil(totalPages);

  const listings = await PropertyListing.find(filters)
    .skip((currentPage - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return { totalPages, currentPage, numberOfResults, listings };
};

const getAllListings = async (query) => {
  console.log(query);

  const page = query?.page;

  try {
    const filters = generateMongooseListingFilters(query);

    const { totalPages, currentPage, numberOfResults, listings } =
      await getPaginatedListings(page, filters);

    return { totalPages, currentPage, numberOfResults, listings };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createListing = async (listingData, files, admin) => {
  try {
    // Upload images
    if (files) {
      const propertyMedia = files?.["propertyMedia[]"] || [];
      if (propertyMedia.length > 0) {
        listingData.propertyMedia = await uploadFiles(propertyMedia);
      }

      const attachments = files?.["attachments[]"] || [];
      listingData.attachments = await uploadFiles(attachments);

      const planImages = files?.["planImages[]"] || [];
      const planImagesUrls = await uploadFiles(planImages);

      listingData.floorPlans.forEach((floorPlan) => {
        const newImage = planImagesUrls.find((image) =>
          image.fileName?.includes(floorPlan.planImage.name)
        );
        if (newImage) floorPlan.planImage = newImage;
      });
    }

    // Generate ID
    listingData.detailedInfo.propertyID = generateUniqueId();

    // Set poster info
    listingData.poster = {
      id: admin._id,
      name: admin.name,
      image: admin.image,
      email: admin.email,
    };

    const isValid = await isValidListing(listingData);

    if (!isValid) throw INVALID_REQUEST;

    const Listing = await PropertyListing.create(listingData);

    await Listing.save();

    return Listing;
  } catch (err) {
    throw err;
  }
};

const updateListing = async (listingId, listingData, files) => {
  try {
    const Listing = await PropertyListing.findById(listingId);
    if (!Listing) throw LISTING_NOT_FOUND;

    const propertyMedia = files?.["propertyMedia[]"] || [];
    if (propertyMedia.length > 0) {
      const newUploadedFiles = await uploadFiles(propertyMedia);
      listingData.propertyMedia.push(...newUploadedFiles);
    }

    const attachments = files?.["attachments[]"] || [];
    listingData.attachments = await uploadFiles(attachments);

    const planImages = files?.["planImages[]"] || [];
    if (planImages.length > 0) {
      const planImagesUrls = await uploadFiles(planImages);

      listingData.floorPlans.forEach((floorPlan) => {
        const newImage = planImagesUrls.find((image) =>
          image.fileName?.includes(floorPlan.planImage.name)
        );
        if (newImage) floorPlan.planImage = newImage;
      });
    }

    Object.assign(Listing, listingData);

    const isValid = await isValidListing(Listing);
    if (!isValid) throw INVALID_REQUEST;

    await Listing.save();

    return Listing;
  } catch (err) {
    throw err;
  }
};

const removeListing = async (listingId) => {
  try {
    const Listing = await PropertyListing.findById(listingId);
    if (!Listing) throw LISTING_NOT_FOUND;

    Listing.propertyMedia.forEach((media) => deleteImage(media.filePath));
    Listing.attachments.forEach((attachment) =>
      deleteImage(attachment.filePath)
    );
    Listing.floorPlans.forEach((plan) => deleteImage(plan.planImage.filePath));

    return await Listing.deleteOne();
  } catch (err) {
    throw err;
  }
};

const removeListingImages = async (listingId, propertyName, fileInfo) => {
  try {
    const Listing = await PropertyListing.findById(listingId);
    if (!Listing) throw LISTING_NOT_FOUND;

    if (propertyName === "propertyMedia") {
      const index = Listing.propertyMedia.findIndex(
        (m) => m.filePath === fileInfo.filePath
      );
      if (index < 0) throw IMAGE_NOT_FOUND;

      await deleteImage(fileInfo.filePath);
      Listing.propertyMedia = removeFromArray(Listing.propertyMedia, index);
    } else if (propertyName === "floorPlans") {
      const plan = Listing.floorPlans.find(
        (p) => p.planImage.filePath === fileInfo.filePath
      );
      if (!plan) throw IMAGE_NOT_FOUND;

      await deleteImage(fileInfo.filePath);
      plan.planImage = null;
    } else if (propertyName === "attachments") {
      const index = Listing.attachments.findIndex(
        (a) => a.filePath === fileInfo.filePath
      );
      if (index < 0) throw IMAGE_NOT_FOUND;

      await deleteImage(fileInfo.filePath);
      Listing.attachments = removeFromArray(Listing.attachments, index);
    }

    await Listing.save();
    return Listing;
  } catch (err) {
    throw err;
  }
};

const generateMongooseListingFilters = (filterQueries = {}) => {
  const filters = {};

  // Check and add filters based on the filterQueries
  const andFilters = [];

  if (filterQueries.keyword) {
    andFilters.push({
      $or: [
        { propertyTitle: new RegExp(filterQueries.keyword, "i") },
        { propertyDescription: new RegExp(filterQueries.keyword, "i") },
      ],
    });
  }

  if (filterQueries.status) {
    andFilters.push({
      status: { $regex: new RegExp(filterQueries.status, "i") },
    });
  }

  if (filterQueries.propertyType) {
    andFilters.push({
      propertyType: { $regex: new RegExp(filterQueries.propertyType, "i") },
    });
  }

  if (filterQueries.location) {
    const locationRegex = new RegExp(filterQueries.location, "i");
    andFilters.push({
      $or: [
        { "location.address": locationRegex },
        { "location.city": locationRegex },
        { "location.country": locationRegex },
        { "location.countyState": locationRegex },
        { "location.neighborhood": locationRegex },
        { "location.zip": locationRegex },
      ],
    });
  }

  if (filterQueries["price.min"] || filterQueries["price.max"]) {
    filters.price = {};
    if (filterQueries["price.min"])
      filters.price.$gte = filterQueries["price.min"];
    if (filterQueries["price.max"])
      filters.price.$lte = filterQueries["price.max"];
  }

  if (filterQueries.bathrooms) {
    andFilters.push({
      "detailedInfo.bathrooms": parseInt(filterQueries.bathrooms),
    });
  }

  if (filterQueries.bedrooms) {
    andFilters.push({
      "detailedInfo.bedrooms": parseInt(filterQueries.bedrooms),
    });
  }

  if (filterQueries.garages) {
    const garagesValue =
      parseInt(filterQueries.garages) === 1 ? { $gte: 1 } : 0;
    andFilters.push({
      "detailedInfo.garages": garagesValue,
    });
  }

  if (filterQueries.yearBuilt) {
    andFilters.push({
      "detailedInfo.yearBuilt": parseInt(filterQueries.yearBuilt),
    });
  }

  if (filterQueries["area.min"] || filterQueries["area.max"]) {
    filters["detailedInfo.areaSize"] = {};
    if (filterQueries["area.min"])
      filters["detailedInfo.areaSize"].$gte = parseInt(
        filterQueries["area.min"]
      );
    if (filterQueries["area.max"])
      filters["detailedInfo.areaSize"].$lte = parseInt(
        filterQueries["area.max"]
      );
  }

  if (filterQueries.isFeatured) {
    filters.isFeatured = true;
  }

  if (filterQueries.amenities?.length > 0) {
    andFilters.push({
      amenities: { $all: filterQueries.amenities },
    });
  }

  if (andFilters.length > 0) {
    filters.$and = andFilters;
  }

  return filters;
};

export {
  getAllListings,
  createListing,
  updateListing,
  removeListing,
  removeListingImages,
  getPaginatedListings,
  isValidListing,
  generateMongooseListingFilters,
};
