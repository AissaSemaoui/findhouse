const PropertyItem = ({ listing }) => {
  return (
    <ul className="mb0">
      {!!listing?.propertyType && (
        <li className="list-inline-item">
          <a href="#">{listing.propertyType}</a>
        </li>
      )}
      {!!listing?.detailedInfo?.bedrooms && (
        <li className="list-inline-item">
          <a href="#">Beds: {listing.detailedInfo.bedrooms}</a>
        </li>
      )}
      {!!listing?.detailedInfo?.bathrooms && (
        <li className="list-inline-item">
          <a href="#">Baths: {listing.detailedInfo.bathrooms}</a>
        </li>
      )}
      {!!listing?.detailedInfo?.areaSize && (
        <li className="list-inline-item">
          <a href="#">Sq Ft: {listing.detailedInfo.areaSize}</a>
        </li>
      )}
    </ul>
  );
};

export default PropertyItem;
