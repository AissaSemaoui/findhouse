import propertyListingSchema from "../../validations/propertyListing.validation";
import PropertyListing from "../models/PropertyListing.schema";
import { formatResponse } from "../utils/apiHelpers";
import { connectToDatabase } from "../utils/db";

import { ITEMS_PER_PAGE } from "../../config/constants";

const isValidListing = async (listingData) => {
  return await propertyListingSchema.isValid(listingData);
};

const getPaginatedListings = async (req, filters = {}) => {
  const currentPage = Number(req?.query?.page) || 1;

  let totalPages = (await PropertyListing.countDocuments({})) / ITEMS_PER_PAGE;
  totalPages = Math.ceil(totalPages);

  const listings = await PropertyListing.find(filters)
    .skip((currentPage - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return { totalPages, currentPage, listings };
};

// TODO : split the create new listing into small chunks
const httpCreateNewListing = async (req, res) => {
  const listingData = req.body?.listingData;

  console.log(req.body);

  if (!listingData) res.status(400).json(formatResponse(false, "Bad Request!"));

  const isValidData = await isValidListing(listingData);

  console.log(isValidData);

  if (!isValidData)
    res.status(400).json(formatResponse(false, "Invalid Data!"));

  await connectToDatabase();

  const response = PropertyListing.create(listingData);

  return res
    .status(201)
    .json(formatResponse(true, "Listing Created Successfully!", response));
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

export { getPaginatedListings, isValidListing, generateMongooseListingFilters };
