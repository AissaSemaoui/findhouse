const PropertyDetails = ({ listing }) => {
  const detailedInfo = listing?.detailedInfo;

  return (
    <>
      {detailedInfo && (
        <div className="col-md-6 col-lg-6 col-xl-4">
          <ul className="list-inline-item">
            {!!detailedInfo.propertyID && (
              <li>
                <p>
                  Property ID : <span>{detailedInfo.propertyID}</span>
                </p>
              </li>
            )}
            {!!listing.price && (
              <li>
                <p>
                  Price : <span>${listing.price}</span>
                </p>
              </li>
            )}
            {!!detailedInfo.areaSize && detailedInfo.sizePrefix && (
              <li>
                <p>
                  Property Size :
                  <span>
                    {detailedInfo.areaSize} {detailedInfo.sizePrefix}
                  </span>
                </p>
              </li>
            )}
            {!!detailedInfo.yearBuilt && (
              <li>
                <p>
                  Year Built : <span>{detailedInfo.yearBuilt}</span>
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
      {/* End .col */}

      {detailedInfo && (
        <div className="col-md-6 col-lg-6 col-xl-4">
          <ul className="list-inline-item">
            {!!detailedInfo.bedrooms && (
              <li>
                <p>
                  Bedrooms : <span>{detailedInfo.bedrooms}</span>
                </p>
              </li>
            )}
            {!!detailedInfo.bathrooms && (
              <li>
                <p>
                  Bathrooms : <span>{detailedInfo.bathrooms}</span>
                </p>
              </li>
            )}
            {!!detailedInfo.garages && (
              <li>
                <p>
                  Garage : <span>{detailedInfo.garages}</span>
                </p>
              </li>
            )}
            {!!detailedInfo.garagesSize && (
              <li>
                <p>
                  Garage Size : <span>{detailedInfo.garagesSize}</span>
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          {!!listing.propertyType && (
            <li>
              <p>
                Property Type : <span>{listing.propertyType}</span>
              </p>
            </li>
          )}
          {!!listing.status && (
            <li>
              <p>
                Property Status : <span>{listing.status}</span>
              </p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
