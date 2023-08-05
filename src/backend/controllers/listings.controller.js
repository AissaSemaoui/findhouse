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

const isValidListing = async (listingData) => {
  return await backendPropertyListingSchema.isValid(listingData);
};

const getPaginatedListings = async (req, filters = {}) => {
  const isAllPages = req.query?.page === "all";

  if (isAllPages) {
    const listings = await PropertyListing.find(filters);
    return { totalPages: 1, currentPage: 1, listings };
  }

  const currentPage = Number(req?.query?.page) || 1;

  let totalPages =
    (await PropertyListing.countDocuments(filters)) / ITEMS_PER_PAGE;
  totalPages = Math.ceil(totalPages);

  const listings = await PropertyListing.find(filters)
    .skip((currentPage - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return { totalPages, currentPage, listings };
};

const createListing = async (listingData, files, admin) => {
  try {
    const isValid = await isValidListing(listingData);
    console.log(isValid);
    // if (!isValid) throw INVALID_REQUEST;

    // Generate ID
    listingData.detailedInfo.propertyID = generateUniqueId();

    // Set poster info
    listingData.poster = {
      id: admin._id,
      name: admin.name,
      image: admin.image,
      email: admin.email,
    };

    // Create listing
    const Listing = await PropertyListing.create(listingData);

    // Upload images
    if (files) {
      Listing.propertyMedia = await uploadFiles(files.propertyMedia);
      Listing.floorPlans.forEach((plan) => {
        plan.image = files.planImages[index];
      });
    }

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

    const planImages = files?.["planImages[]"] || [];
    if (planImages.length > 0) {
      const planImagesUrls = await uploadFiles(planImages);
      console.log(planImagesUrls);
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
      removeFromArray(Listing.propertyMedia, index);
    } else if (propertyName === "floorPlans") {
      const plan = Listing.floorPlans.find(
        (p) => p.planImage.filePath === fileInfo.filePath
      );
      if (!plan) throw IMAGE_NOT_FOUND;

      await deleteImage(fileInfo.filePath);
      plan.planImage = null;
    }

    await Listing.save();
    return Listing;
  } catch (err) {
    throw err;
  }
};

const generateMongooseListingFilters = (filterQueries) => {
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
    console.log(filterQueries.isFeatured);
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

  console.log(filters);
  return filters;
};

export {
  createListing,
  updateListing,
  removeListing,
  removeListingImages,
  getPaginatedListings,
  isValidListing,
  generateMongooseListingFilters,
};
