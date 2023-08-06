import { createRouter } from "next-connect";

import {
  formatResponse,
  onError,
  onNoMatch,
} from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";
import {
  generateMongooseListingFilters,
  getPaginatedListings,
} from "../../../backend/controllers/listings.controller";

const router = createRouter();

router.get(async (req, res) => {
  console.log("we are getting the data!", req.query);
  try {
    await connectToDatabase();

    const { listings, currentPage, totalPages, numberOfResults } =
      await getPaginatedListings(
        req,
        generateMongooseListingFilters(req.query)
      );

    res.status(200).json(
      formatResponse(true, "You've got what you want!", {
        listings,
        currentPage,
        totalPages,
        numberOfResults,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(formatResponse(false, "Request Failed!"));
  }
});

export default router.handler({
  onError,
  onNoMatch,
});
