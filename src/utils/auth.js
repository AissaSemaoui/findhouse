import { signIn, signOut } from "next-auth/react";

export const signInWithCredentials = async (userInfo) => {
  return signIn("credentials", {
    redirect: false,
    ...userInfo,
    callbackUrl: "/",
  });
};

export const signInWithGoogle = async () => {
  return signIn("google", {
    callbackUrl: "/",
  });
};

export const signOutUser = async () => {
  return signOut({ redirect: false, callbackUrl: "/" });
};
