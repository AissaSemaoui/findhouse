import { getSession } from "next-auth/react";
import { AdminDB } from "../models/Admin.schema";

const verifyAdminAccess = async (req) => {
  const session = await getSession({ req });

  const userId = session?.user?.id;
  if (!userId) return null;

  const admin = AdminDB.findById(userId);

  if (!admin) return null;

  return admin;
};

export { verifyAdminAccess };
