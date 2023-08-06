import { createRouter } from "next-connect";
import multer from "multer";

import {
  formatResponse,
  onError,
  onNoMatch,
} from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import { verifyAdminAccess } from "../../../backend/controllers/admin.controller";
import {
  removeListing,
  updateListing,
} from "../../../backend/controllers/listings.controller";
import {
  INVALID_REQUEST,
  LISTING_NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
} from "../../../backend/utils/errors";

const router = createRouter();

// Route for getting a single listing data
router.get(async (req, res) => {
  console.log("Retrieving single data...");
  try {
    await connectToDatabase();

    const { listingId } = req.query;

    const Listing = await PropertyListing.findById(listingId);

    res
      .status(200)
      .json(formatResponse(true, "Success! Here's the data", Listing));
  } catch (err) {
    console.log(err);
    res.status(400).json(formatResponse(false, INVALID_REQUEST));
  }
});

// Set up multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
});

// Route for updating listing data
router.put(async (req, res) => {
  console.log("Updating data...", req.query);
  try {
    await connectToDatabase();

    console.time("isAdmin");
    const admin = await verifyAdminAccess(req);
    if (!admin)
      return res.status(401).json(formatResponse(false, UNAUTHORIZED));
    console.timeEnd("isAdmin");

    const fileTypes = [
      { name: "propertyMedia[]" },
      { name: "planImages[]" },
      { name: "attachments[]" },
    ];

    // Handle file upload
    return upload.fields(fileTypes)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: SERVER_ERROR });
      }

      const { listingId } = req.query;
      const listingData = JSON.parse(req.body?.listingData);
      const files = req?.files;
      console.log(files?.["attachments[]"]);

      const Listing = await updateListing(listingId, listingData, files);
      console.log(Listing);

      return res
        .status(200)
        .json(formatResponse(true, "Success! Data has been updated", Listing));
    });
  } catch (err) {
    let error = {
      statusCode: 500,
      message: SERVER_ERROR,
    };

    if (err === LISTING_NOT_FOUND) {
      error.statusCode = 404;
      error.message = LISTING_NOT_FOUND;
    } else if (err === INVALID_REQUEST) {
      error.statusCode = 400;
      error.message = INVALID_REQUEST;
    }

    console.log(err);
    return res
      .status(error.statusCode)
      .json(formatResponse(false, error.message));
  }
});

// Route for deleting listing
router.delete(async (req, res) => {
  try {
    await connectToDatabase();

    console.time("isAdmin");
    const admin = await verifyAdminAccess(req);
    if (!admin)
      return res.status(401).json(formatResponse(false, UNAUTHORIZED));
    console.timeEnd("isAdmin");

    const { listingId } = req.query;
    const isDeleted = await removeListing(listingId);

    return res
      .status(200)
      .json(formatResponse(true, "Listing deleted successfully!", isDeleted));
  } catch (err) {
    let error = {
      statusCode: 500,
      message: SERVER_ERROR,
    };

    if (err === LISTING_NOT_FOUND) {
      error.statusCode = 404;
      error.message = LISTING_NOT_FOUND;
    }

    console.log(err);
    return res
      .status(error.statusCode)
      .json(formatResponse(false, error.message));
  }
});

// Set up API configuration
export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError,
  onNoMatch,
});
