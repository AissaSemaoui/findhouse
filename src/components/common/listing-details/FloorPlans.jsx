const FloorPlans = ({ floorPlans }) => {
  return (
    <div className="accordion" id="accordionExample">
      {floorPlans.map((floorPlan) => (
        <div className="card floor_plan">
          <div id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <ul className="mb0 d-flex align-items-cener flex-wrap">
                  <li className="d-inline-flex list-inline-item">
                    First Floor
                  </li>
                  <li className="d-inline-flex list-inline-item">
                    <p>Size:</p> <span>{floorPlan?.planSize} Sqft</span>
                  </li>
                  <li className="d-inline-flex list-inline-item">
                    <p>Rooms:</p> <span>{floorPlan?.planBedrooms} Sqft</span>
                  </li>
                  <li className="d-inline-flex list-inline-item">
                    <p>Baths:</p> <span>{floorPlan?.planBathrooms} Sqft</span>
                  </li>
                  <li className="d-inline-flex list-inline-item">
                    <p>Price:</p>{" "}
                    <span>
                      {floorPlan?.pricePostfix} {floorPlan?.planPrice}
                    </span>
                  </li>
                </ul>
              </button>
            </h2>
          </div>
          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body text-center">
              <img
                className="img-fluid"
                src={floorPlan?.planImage?.filePath}
                alt="floor_plan.png"
              />
              <p>{floorPlan?.planDescription}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloorPlans;
