const PropertyDetails = ({ listing }) => {
  const detailedInfo = listing?.detailedInfo;

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property ID : <span>{detailedInfo?.propertyID}</span>
            </p>
          </li>
          <li>
            <p>
              Price : <span>${listing?.price}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size :{" "}
              <span>
                {detailedInfo?.areaSize} {detailedInfo?.sizePrefix}
              </span>
            </p>
          </li>
          <li>
            <p>
              Year Built : <span>{detailedInfo?.yearBuilt}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Bedrooms : <span>{detailedInfo?.bedrooms}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms : <span>{detailedInfo?.bathrooms}</span>
            </p>
          </li>
          <li>
            <p>
              Garage : <span>{detailedInfo?.garages}</span>
            </p>
          </li>
          <li>
            <p>
              Garage Size : <span>{detailedInfo?.garagesSize}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Type : <span>{listing?.propertyType}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>{listing?.status}</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
