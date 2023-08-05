import { createRouter } from "next-connect";
import multer from "multer";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import {
  generateUniqueId,
  onError,
  onNoMatch,
  formatResponse,
} from "../../../backend/utils/apiHelpers";
import { uploadFiles } from "../../../backend/utils/s3";
import { verifyAdminAccess } from "../../../backend/controllers/admin.controller";
import { createListing } from "../../../backend/controllers/listings.controller";
import { SERVER_ERROR } from "../../../backend/utils/errors";

const router = createRouter();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Route to handle creating new Listing
router.post(async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase();

    console.time("isAdmin");
    // Verify admin access
    const admin = await verifyAdminAccess(req);
    if (!admin) {
      return res.status(403).json(formatResponse(false, "Unauthorized"));
    }
    console.timeEnd("isAdmin");

    // Define the file types to be uploaded
    const fileTypes = [{ name: "propertyMedia[]" }, { name: "planImages[]" }];

    // Upload the files
    return upload.fields(fileTypes)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: SERVER_ERROR });
      }

      // Parse the listing data from the request body
      const listingData = JSON.parse(req.body?.listingData);
      const files = req?.files;

      const Listing = await createListing(listingData, files, admin);

      return res
        .status(200)
        .json(formatResponse(true, "Yeeey! it's success", Listing));
    });
  } catch (err) {
    let error = {
      statusCode: 500,
      message: SERVER_ERROR,
    };

    if (err === INVALID_REQUEST) {
      error.statusCode = 400;
      error.message = INVALID_REQUEST;
    }

    console.log(err);
    return res.status(500).json(formatResponse(false, SERVER_ERROR));
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError,
  onNoMatch,
});
