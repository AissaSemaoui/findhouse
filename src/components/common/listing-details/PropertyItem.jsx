const PropertyItem = ({ listing }) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{listing?.propertyType}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Beds: {listing?.detailedInfo?.bedrooms}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths: {listing?.detailedInfo?.bathrooms}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Sq Ft: {listing?.detailedInfo?.areaSize}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
