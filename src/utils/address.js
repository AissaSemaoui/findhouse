const getAddressString = (location) => {
  let addressString = location.address;
  addressString += location.city ? `, ${location.city}` : "";
  addressString += location.countyState ? `, ${location.countyState}` : "";
  addressString += location.zip ? ` ${location.zip}` : "";
  addressString += location.neighborhood ? `, ${location.neighborhood}` : "";
  addressString += location.country ? `, ${location.country}` : "";

  return addressString;
};

export { getAddressString };
