import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "../../../lib/db.js";
import { AdminDB } from "@/models/Admin.js";

async function handleCredentialsProvider(user) {
  const existingAdmin = await AdminDB.exists({
    email: user.email,
    password: user.password,
  });

  return !!existingAdmin;
}

async function handleGoogleProvider(user) {
  const existingAdmin = await AdminDB.findOne({
    email: user.email,
  });

  if (existingAdmin) {
    existingAdmin.image = user.image;
    existingAdmin.name = user.name;

    existingAdmin.save();
  }

  return !!existingAdmin;
}

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      type: "credentials",
      credentials: {},
      authorize(credentials) {
        const { email, password } = credentials;
        return {
          id: "",
          email: email,
          password: password,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectToDatabase();

        if (account.provider === "credentials") {
          return handleCredentialsProvider(user);
        } else if (account.provider === "google") {
          return handleGoogleProvider(user);
        } else {
          return false;
        }
      } catch (error) {
        console.log("we got an error : ", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const existingAdmin = await AdminDB.findOne({
          email: session.user.email,
        });

        if (!existingAdmin) {
          throw new Error("Existing admin not found");
        }

        session.user.id = existingAdmin._id;
        session.user.name ||= existingAdmin.name;
        session.user.image ||= existingAdmin.image;
      } catch (error) {
        throw new Error("Authentication failed");
      }

      return session;
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },

  pages: {
    signIn: "/login",
    error: "/my-dashboard",
  },
};

export default NextAuth(authOptions);
