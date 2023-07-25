import * as yup from "yup";

const fileSchema = yup
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
        (value) => value && value.length
      ),
  })
);

const propertyListingSchema = yup.object().shape({
  propertyTitle: yup.string().required("Property title is required"),
  propertyDescription: yup.string().required("Description is required"),
  propertyType: yup.string().required("Property type is required"),
  status: yup.string().required("Status is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  area: yup
    .number()
    .required("Area is required")
    .positive("Area must be positive"),
  rooms: yup.number().integer().min(1).default(1),
  location: yup.object().shape({
    country: yup.string().required("Country is required").default("Portugal"),
    address: yup.string().required("Address is required"),
    countyState: yup.string().default(""),
    city: yup.string().default(""),
    neighborhood: yup.string().default(""),
    zip: yup.string().default(""),
  }),
  detailedInfo: yup.object().shape({
    propertyID: yup.string().default(""),
    areaSize: yup.number().nullable().default(null),
    sizePrefix: yup.string().default(""),
    landArea: yup.number().nullable().default(null),
    landAreaSizePostfix: yup.string().default(""),
    bedrooms: yup.number().nullable().default(null),
    bathrooms: yup
      .number()
      .integer()
      .min(1, "Bathrooms must be positive")
      .default(1),
    garages: yup.number().nullable().default(null),
    garagesSize: yup.string().default(""),
    yearBuilt: yup.number().nullable().default(null),
    videoURL: yup.string().default(""),
    virtualTour360: yup.string().default(""),
  }),
  amenities: yup.array().of(yup.string()).default([]),
  propertyMedia: yup.array().of(fileSchema),
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
