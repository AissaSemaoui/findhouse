import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  propertyTitle: { type: String, required: true, index: true },
  propertyDescription: { type: String, required: true },
  propertyType: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  rooms: { type: Number, default: 1 },
  location: {
    country: { type: String, required: true, default: "Portugal" },
    address: { type: String, required: true },
    countyState: { type: String, default: "" },
    city: { type: String, default: "" },
    neighborhood: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  detailedInfo: {
    propertyID: { type: String, default: "" },
    areaSize: { type: Number, default: null },
    sizePrefix: { type: String, default: "" },
    landArea: { type: Number, default: null },
    landAreaSizePostfix: { type: String, default: "" },
    bedrooms: { type: Number, default: null },
    bathrooms: { type: Number, default: 1 },
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