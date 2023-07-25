import { createRouter } from "next-connect";

import { onError, onNoMatch } from "../../backend/utils/apiHelpers";
import { formatResponse } from "../../backend/utils/apiHelpers";
import multer from "multer";
import { uploadFile, uploadFiles } from "../../backend/utils/s3";
import { connectToDatabase } from "../../backend/utils/db";
import PropertyListing from "../../backend/models/PropertyListing.schema";

const router = createRouter();

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(async (req, res) => {
  await connectToDatabase();

  const fileTypes = [{ name: "propertyMedia[]" }, { name: "planImages[]" }];

  return upload.fields(fileTypes)(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: "Multer error" });
    } else {
      try {
        const listingData = JSON.parse(req.body?.listingData);
        const ListingData = await PropertyListing.create(listingData);

        console.time("first");
        const propertyMedia = req.files["propertyMedia[]"];
        ListingData.propertyMedia = await uploadFiles(propertyMedia);
        console.timeEnd("first");

        console.time("second");
        const planImages = req.files["planImages[]"];
        const planImagesUrls = await uploadFiles(planImages);
        ListingData.floorPlans.forEach((floorPlan, index) => {
          floorPlan.planImage = planImagesUrls[index];
        });
        console.timeEnd("second");

        ListingData.save();

        res
          .status(200)
          .json(formatResponse(true, "Yeeey! it's success", ListingData));
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Multer error" });
      }
    }
  });
});

export default router.handler({
  onError,
  onNoMatch,
});
