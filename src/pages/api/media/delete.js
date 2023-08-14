import { createRouter } from "next-connect";

import {
  onError,
  onNoMatch,
  formatResponse,
} from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";
import { removeListingImages } from "../../../backend/controllers/listings.controller";
import { IMAGE_NOT_FOUND } from "../../../backend/utils/errors";

const router = createRouter();

// delete image from listing
router.post(async (req, res) => {
  try {
    await connectToDatabase();
    const { listingId, propertyName, fileInfo } = req.body;

    const Listing = await removeListingImages(
      listingId,
      propertyName,
      fileInfo
    );

    return res
      .status(200)
      .json(formatResponse(true, "Image delete successfully", Listing));
  } catch (err) {
    let error = {
      statusCode: 500,
      message: SERVER_ERROR,
    };

    if (err === IMAGE_NOT_FOUND) {
      error.statusCode = 404;
      error.message = IMAGE_NOT_FOUND;
    }

    console.log(err);
    return res
      .status(error.statusCode)
      .json(formatResponse(false, error.message));
  }
});

export default router.handler({
  onError,
  onNoMatch,
});
