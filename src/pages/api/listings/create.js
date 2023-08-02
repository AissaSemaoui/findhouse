import { createRouter } from "next-connect";

import {
  generateUniqueId,
  onError,
  onNoMatch,
} from "../../../backend/utils/apiHelpers";
import { formatResponse } from "../../../backend/utils/apiHelpers";
import multer from "multer";
import { uploadFiles } from "../../../backend/utils/s3";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import { verifyAdminAccess } from "../../../backend/controllers/admin.controller";

const router = createRouter();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(async (req, res) => {
  try {
    await connectToDatabase();

    console.time("isAdmin");
    const admin = await verifyAdminAccess(req);
    if (!admin)
      return res.status(403).json(formatResponse(false, "Unauthorized"));
    console.timeEnd("isAdmin");

    const fileTypes = [{ name: "propertyMedia[]" }, { name: "planImages[]" }];

    return upload.fields(fileTypes)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Multer error" });
      }

      const listingData = JSON.parse(req.body?.listingData);
      listingData.detailedInfo.propertyID = generateUniqueId();
      listingData.poster = {
        id: admin._id,
        name: admin.name,
        image: admin.image,
        email: admin.email,
      };

      const ListingData = await PropertyListing.create(listingData);

      console.time("first");
      const propertyMedia = req.files?.["propertyMedia[]"] || [];
      if (propertyMedia.length > 0) {
        ListingData.propertyMedia = await uploadFiles(propertyMedia);
      }
      console.timeEnd("first");

      console.time("second");
      const planImages = req.files?.["planImages[]"] || [];
      if (planImages.length > 0) {
        const planImagesUrls = await uploadFiles(planImages);
        ListingData?.floorPlans?.forEach((floorPlan, index) => {
          floorPlan.planImage = planImagesUrls[index];
        });
      }
      console.timeEnd("second");

      ListingData.save();

      return res
        .status(200)
        .json(formatResponse(true, "Yeeey! it's success", ListingData));
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(formatResponse(false, err.message));
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
