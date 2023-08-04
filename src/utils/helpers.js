const removeFromArray = (arr, index) => {
  if (index < 0 || index >= arr.length) return;

  // Move last element to index
  arr[index] = arr[arr.length - 1];

  // Truncate array
  arr.length--;

  return arr;
};

const generateQueryParams = (filterState) => {
  const {
    keyword,
    propertyType,
    location,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
    statusType,
    isFeatured,
  } = filterState;

  const queryParams = [];

  if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
  if (propertyType)
    queryParams.push(`propertyType=${encodeURIComponent(propertyType)}`);
  if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
  if (price.min) queryParams.push(`price.min=${encodeURIComponent(price.min)}`);
  if (price.max) queryParams.push(`price.max=${encodeURIComponent(price.max)}`);
  if (bathrooms) queryParams.push(`bathrooms=${encodeURIComponent(bathrooms)}`);
  if (bedrooms) queryParams.push(`bedrooms=${encodeURIComponent(bedrooms)}`);
  if (garages)
    queryParams.push(
      `garages=${encodeURIComponent(garages === "yes" ? 1 : 0)}`
    );
  if (yearBuilt) queryParams.push(`yearBuilt=${encodeURIComponent(yearBuilt)}`);
  if (area.min) queryParams.push(`area.min=${encodeURIComponent(area.min)}`);
  if (area.max) queryParams.push(`area.max=${encodeURIComponent(area.max)}`);

  for (const amenity of amenities) {
    queryParams.push(`amenities=${encodeURIComponent(amenity)}`);
  }

  if (statusType)
    queryParams.push(`statusType=${encodeURIComponent(statusType)}`);
  if (isFeatured)
    queryParams.push(`featured=${encodeURIComponent(isFeatured)}`);

  return queryParams.join("&");
};

export { removeFromArray, generateQueryParams };
