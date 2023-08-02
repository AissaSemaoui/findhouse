import { createRouter } from "next-connect";

import {
  onError,
  onNoMatch,
  formatResponse,
} from "../../../backend/utils/apiHelpers";
import { deleteImage } from "../../../backend/utils/s3";
import { connectToDatabase } from "../../../backend/utils/db";
import PropertyListing from "../../../backend/models/PropertyListing.schema";
import { removeFromArray } from "../../../utils/helpers";

const router = createRouter();

// delete image from listing
router.post(async (req, res) => {
  try {
    await connectToDatabase();
    const { listingId, propertyName, fileInfo } = req.body;

    const ListingData = await PropertyListing.findById(listingId);
    if (!ListingData)
      return res.status(404).json(formatResponse(false, "Listing not found!"));

    if (propertyName === "propertyMedia") {
      const fileIndex = ListingData?.propertyMedia?.findIndex(
        (media) => media?.filePath === fileInfo?.filePath
      );
      console.log(fileIndex);

      console.log(ListingData.propertyMedia, fileInfo);
      if (fileIndex === undefined || fileIndex === -1)
        return res.status(404).json(formatResponse(false, "Image not found!"));
      await deleteImage(fileInfo?.filePath);
      removeFromArray(ListingData?.propertyMedia, fileIndex);
    }

    if (propertyName === "floorPlans") {
      const floorPlan = ListingData?.floorPlans?.find(
        (floorPlan) => floorPlan.planImage?.filePath === fileInfo?.filePath
      );
      if (!floorPlan)
        return res.status(404).json(formatResponse(false, "Image not found!"));
      await deleteImage(fileInfo?.filePath);
      floorPlan.planImage = null;
    }

    console.log(ListingData.propertyMedia);
    await ListingData.save();

    return res
      .status(200)
      .json(formatResponse(true, "Image delete successfully"));
  } catch (err) {
    console.log("Error deleting image from listing : ", err);
    return res
      .status(500)
      .json(formatResponse(false, "Failed image deletion!"));
  }
});

export default router.handler({
  onError,
  onNoMatch,
});
