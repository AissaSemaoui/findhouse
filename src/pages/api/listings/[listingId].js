import { createRouter } from "next-connect";
import multer from "multer";

import {
  formatResponse,
  onError,
  onNoMatch,
} from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import { deleteImage, uploadFiles } from "../../../backend/utils/s3";
import { verifyAdminAccess } from "../../../backend/controllers/admin.controller";

const router = createRouter();

router.get(async (req, res) => {
  console.log("we are getting a signle data!");
  try {
    await connectToDatabase();

    const { listingId } = req.query;

    const listing = await PropertyListing.findById(listingId);

    res
      .status(200)
      .json(formatResponse(true, "Yeeey here are all the ", listing));
  } catch (err) {
    console.log(err);
    res.status(400).json(formatResponse(false, "Request Failed!"));
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
});

router.put(async (req, res) => {
  console.log("we are updating it", req.query);
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

      const { listingId } = req.query;

      const listingData = JSON.parse(req.body?.listingData);
      const ListingData = await PropertyListing.findOne({ _id: listingId });

      console.time("first");
      const propertyMedia = req.files?.["propertyMedia[]"] || [];
      if (propertyMedia.length > 0) {
        const newUploadedFiles = await uploadFiles(propertyMedia);
        listingData.propertyMedia.push(...newUploadedFiles);
      }
      console.timeEnd("first");

      console.time("second");
      const planImages = req.files?.["planImages[]"] || [];
      if (planImages.length > 0) {
        const planImagesUrls = await uploadFiles(planImages);
        listingData?.floorPlans?.forEach((floorPlan, index) => {
          const newImage = planImagesUrls.find(
            (image) => image?.fileName === floorPlan?.planImage?.name
          );

          if (newImage) floorPlan.planImage = newImage;
        });
      }
      console.timeEnd("second");

      Object.assign(ListingData, listingData);

      await ListingData.save();

      return res
        .status(200)
        .json(formatResponse(true, "Yeeey! it's success", ListingData));
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(formatResponse(false, err.message));
  }
});

router.delete(async (req, res) => {
  try {
    await connectToDatabase();

    console.time("isAdmin");
    const admin = await verifyAdminAccess(req);
    if (!admin)
      return res.status(403).json(formatResponse(false, "Unauthorized"));
    console.timeEnd("isAdmin");

    const { listingId } = req.query;
    const ListingData = await PropertyListing.findById(listingId);
    if (!ListingData)
      return res.status(404).json(formatResponse(false, "Listing not found!"));

    ListingData.propertyMedia.forEach((media) => deleteImage(media.filePath));

    ListingData.floorPlans.forEach((floorPlan) =>
      deleteImage(floorPlan.planImage.filePath)
    );

    const isDeleted = await ListingData.deleteOne();

    return res
      .status(200)
      .json(formatResponse(true, "Listing deleted successfully!", isDeleted));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(formatResponse(false, "Failed deleting listing"));
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
