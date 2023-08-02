import * as yup from "yup";
import { MAX_FILE_SIZE, VALID_FILE_EXTENSIONS } from "../config/constants";

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    VALID_FILE_EXTENSIONS[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const fileSchema = yup
  .mixed()
  .required("Required")
  .test(
    "is-valid-type",
    "Not a valid image type",
    (value) =>
      isValidFileType(value && value?.name?.toLowerCase(), "image") ||
      (typeof value?.filePath === "string" &&
        typeof value?.fileName === "string")
  )
  .test(
    "is-valid-size",
    "Max allowed size is 100MB",
    (value) =>
      (value && value.size <= MAX_FILE_SIZE) ||
      (typeof value?.filePath === "string" &&
        typeof value?.fileName === "string")
  );

const backendFileSchema = yup
  .object()
  .shape({
    fileName: yup.string().required("File name is required"),
    filePath: yup.string(),
    file: yup.mixed().nullable(),
  })
  .notRequired();

const floorPlansSchema = yup.array().of(
  yup.object().shape({
    planDescription: yup.string().default(""),
    planBedrooms: yup.number().nullable().default(null),
    planBathrooms: yup.number().nullable().default(null),
    planPrice: yup.number().nullable().default(null),
    pricePostfix: yup.string().default(""),
    planSize: yup.number().nullable().default(null),
    planImage: yup
      .mixed()
      .test(
        "required",
        "Please select an Image",
        (value) => (value && value.length === 1) || value.filePath
      ),
  })
);

const propertyListingSchema = yup.object().shape({
  propertyTitle: yup.string().required("Property title is required"),
  propertyDescription: yup.string().required("Description is required"),
  propertyType: yup.string().required("Property type is required"),
  status: yup.string().required("Status is required"),
  price: yup
    .number("Price is required")
    .required("Price is required")
    .positive("Price must be positive"),
  area: yup
    .number("Area is required")
    .required("Area is required")
    .positive("Area must be positive"),
  rooms: yup
    .number()
    .integer()
    .min(1)
    .default(1)
    .required("Rooms field is required"),
  location: yup.object().shape({
    country: yup.string().required("Country is required").default("Moldova"),
    address: yup.string().required("Address is required"),
    countyState: yup.string().default(""),
    city: yup.string().required("City is required"),
    neighborhood: yup.string().default(""),
    zip: yup.string().default(""),
  }),
  detailedInfo: yup.object().shape({
    propertyID: yup.string().nullable().default(null),
    areaSize: yup.number().nullable().required("Area size is required"),
    sizePrefix: yup.string().default(""),
    landArea: yup.number().nullable().default(null),
    landAreaSizePostfix: yup.string().default(""),
    bedrooms: yup.number().nullable().required("Bedrooms is required"),
    bathrooms: yup
      .number()
      .integer()
      .min(1, "Bathrooms must be positive")
      .required("Bathrooms is required"),
    garages: yup.number().nullable().default(null),
    garagesSize: yup.string().default(""),
    yearBuilt: yup.number().nullable().default(null),
    videoURL: yup.string().default(""),
    virtualTour360: yup.string().default(""),
  }),
  amenities: yup.array().of(yup.string()).default([]),
  propertyMedia: yup
    .array()
    .of(fileSchema)
    .min(1, "At least one Image is required"),
  floorPlans: floorPlansSchema,
});

const backendFloorPlansSchema = yup.object().shape({
  ...floorPlansSchema.fields,
  planImage: fileSchema,
});

const backendPropertyListingSchema = yup.object().shape({
  ...propertyListingSchema.fields,
  floorPlans: yup.array().of(backendFloorPlansSchema),
});

export { backendPropertyListingSchema };
export default propertyListingSchema;
