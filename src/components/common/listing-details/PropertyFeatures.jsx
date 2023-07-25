const PropertyFeatures = ({ features }) => {
  return (
    <>
      <ul className="amenities-container order_list list-inline-item">
        {features.map((val, i) => (
          <li key={i}>
            <span className="flaticon-tick"></span>
            {val}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyFeatures;
