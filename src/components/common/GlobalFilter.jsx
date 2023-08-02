import Router from "next/router";
import { useDispatch } from "react-redux";
import {
  addKeyword,
  addLocation,
  addPropertyType,
} from "../../features/properties/propertiesSlice";
import PricingRangeSlider from "./PricingRangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";
import GlobalSelectBox from "./GlobalSelectBox";
import { PROPERTY_TYPES } from "../../config/constants";

const GlobalFilter = ({ className = "" }) => {
  const dispatch = useDispatch();
  // submit handler
  const submitHandler = () => {
    Router.push("/listing-grid-v3");
  };

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Caută..."
              onChange={(e) => dispatch(addKeyword(e.target.value))}
            />
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => dispatch(addPropertyType(e.target.value))}
                className="selectpicker w100 form-select show-tick"
              >
                <option value="">Tip de imobil</option>
                {PROPERTY_TYPES.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="form-group">
            <input
              id="location"
              type="text"
              className="form-control"
              placeholder="Sector"
              onChange={(e) => dispatch(addLocation(e.target.value))}
            />
            <label htmlFor="location">
              <span className="flaticon-maps-and-flags"></span>
            </label>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="small_dropdown2">
            <div
              id="prncgs"
              className="btn dd_btn"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>Preț</span>
              <label htmlFor="prncgs">
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <PricingRangeSlider />
              </div>
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="custome_fields_520 list-inline-item">
          <div className="navbered">
            <div className="mega-dropdown ">
              <span
                className="dropbtn"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                Avansat <i className="flaticon-more pl10 flr-520"></i>
              </span>

              <div className="dropdown-content dropdown-menu ">
                <div className="row p15">
                  <div className="col-lg-12">
                    <h4 className="text-thm3 mb-4">Facilități</h4>
                  </div>

                  <CheckBoxFilter />
                </div>
                {/* End .row */}

                <div className="row p15 pt0-xsd">
                  <div className="col-lg-12 col-xl-12">
                    <ul className="apeartment_area_list mb0">
                      <GlobalSelectBox />
                    </ul>
                  </div>
                </div>
                {/* End .row */}
              </div>
              {/* End .dropdown-menu */}
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              Search
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </div>
  );
};

export default GlobalFilter;
