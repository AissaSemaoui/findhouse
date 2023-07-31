import { createRouter } from "next-connect";

import { onError, onNoMatch } from "../../../backend/utils/apiHelpers";
import { formatResponse } from "../../../backend/utils/apiHelpers";
import { connectToDatabase } from "../../../backend/utils/db";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await connectToDatabase();

    res.status(200).json(formatResponse(true, "Nothing happened!"));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "Multer error" });
  }
});

export default router.handler({
  onError,
  onNoMatch,
});
