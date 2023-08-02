export const ITEMS_PER_PAGE = 15;

export const AMENITIES_LIST = [
  "Aer condiționat",
  "Tehnică de uz casnic",
  "Piscină",
  "Gata de intrare",
  "Grătar",
  "Cuptor cu microunde",
  "Televiziune Digitală",
  "Șemineu",
  "Ascensor",
  "Interfon",
  "Supraveghere video",
  "Încălzire prin pardosea",
  "Sală de sport",
  "Mobilier",
  "WiFi",
  "Sistem (casă inteligentă)",
  "Geamuri termopane",
  "Saună",
  "Încălzire autonomă",
  "Teren de joacă",
];

export const PROPERTY_TYPES = [
  "Tip de imobil",
  "Apartament",
  "Case",
  "Comercial",
  "Oficii",
  "Terenuri",
];

export const STATUS = ["FOR SALE", "FOR RENT", "SOLD", "RENTED"];

export const COUNTRIES_LIST = ["Moldova", "UK", "Spain", "Roman", "Italy"];

export const DEFAULT_COUNTRY = "Moldova";

export const DEFAULT_LISTING = {
  propertyTitle: "",
  propertyDescription: "",
  propertyType: "",
  status: "",
  price: null,
  area: null,
  rooms: 1,
  location: {
    country: "Moldova",
    address: "",
    countyState: "",
    city: "",
    neighborhood: "",
    zip: "",
  },
  detailedInfo: {
    propertyID: null,
    areaSize: null,
    sizePrefix: "",
    landArea: null,
    landAreaSizePostfix: "",
    bedrooms: null,
    bathrooms: null,
    garages: null,
    garagesSize: "",
    yearBuilt: null,
    videoURL: "",
    virtualTour360: "",
  },
  propertyMedia: [],
  amenities: [],
  floorPlans: [],
};

export const DEFAULT_FLOOR_PLAN = {
  planDescription: "",
  planBedrooms: null,
  planBathrooms: null,
  planPrice: null,
  pricePostfix: "",
  planSize: null,
  planImage: [],
};

export const MAX_FILE_SIZE = 102400; //100MB

export const VALID_FILE_EXTENSIONS = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};
