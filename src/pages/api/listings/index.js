import { createRouter } from "next-connect";

import {
  formatResponse,
  onError,
  onNoMatch,
} from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import { isValidListing } from "../../../backend/controllers/listings.controller";

const router = createRouter();

router.get(async (req, res) => {
  console.log("we are getting the data!");
  try {
    await connectToDatabase();
    const listings = await PropertyListing.find({});

    listings.forEach(async (listing) => {
      const isValid = await isValidListing(listing);
      return isValid;
    });

    res
      .status(200)
      .json(formatResponse(true, "Yeeey here are all the ", listings));
  } catch (err) {
    console.log(err);
    res.status(400).json(formatResponse(false, "Request Failed!"));
  }
});

export default router.handler({
  onError,
  onNoMatch,
});
