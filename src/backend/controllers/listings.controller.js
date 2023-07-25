import propertyListingSchema from "../../validations/propertyListing.validation";
import PropertyListing from "../models/PropertyListing.schema";
import { formatResponse } from "../utils/apiHelpers";
import { connectToDatabase } from "../utils/db";

const isValidListing = async (listingData) => {
  return await propertyListingSchema.isValid(listingData);
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

export { httpCreateNewListing, isValidListing };
