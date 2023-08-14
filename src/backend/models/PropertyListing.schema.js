import mongoose from "mongoose";
import { generateUniqueId } from "../utils/apiHelpers";

const propertyListingSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  propertyTitle: { type: String, required: true, index: true },
  propertyDescription: { type: String, required: true },
  propertyType: { type: String, required: true },
  status: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  price: { type: Number, required: true },
  area: { type: Number },
  rooms: { type: Number, required: true },
  location: {
    country: { type: String, required: true, default: "Moldova" },
    address: { type: String, required: true },
    countyState: { type: String, default: "" },
    city: { type: String, required: true },
    neighborhood: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  detailedInfo: {
    propertyID: { type: String, unique: true, default: generateUniqueId },
    areaSize: { type: Number, required: true },
    sizePrefix: { type: String, default: "" },
    landArea: { type: Number, default: null },
    landAreaSizePostfix: { type: String, default: "" },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    garages: { type: Number, default: null },
    garagesSize: { type: String, default: "" },
    yearBuilt: { type: Number, default: null },
    videoURL: { type: String, default: "" },
    virtualTour360: { type: String, default: "" },
  },
  amenities: {
    type: [String],
  },
  propertyMedia: [
    {
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
    },
  ],
  attachments: [
    {
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
    },
  ],
  floorPlans: [
    {
      planDescription: { type: String, default: "" },
      planBedrooms: { type: Number, default: null },
      planBathrooms: { type: Number, default: null },
      planPrice: { type: Number, default: null },
      pricePostfix: { type: String, default: "" },
      planSize: { type: Number, default: null },
      planImage: {
        type: {
          filePath: { type: String, required: true },
          fileName: { type: String, required: true },
        },
        default: null,
      },
    },
  ],
  poster: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    name: { type: String },
    image: { type: String },
    email: { type: String },
  },
});

mongoose.models = {};

const PropertyListing = mongoose.model(
  "PropertyListing",
  propertyListingSchema
);

export default PropertyListing;
