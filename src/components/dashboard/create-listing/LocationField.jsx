import React from "react";

import FormInput from "../../common/FormInput";
import FormSelect from "../../common/FormSelect";
import { COUNTRIES_LIST, DEFAULT_COUNTRY } from "../../../config/constants";

const LocationField = ({ register, errors }) => {
  return (
    <>
      <div className="col-lg-12">
        <FormInput
          label="Property Address"
          name="location.address"
          className="my_profile_setting_input"
          register={register}
          error={errors?.address}
        />
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <FormInput
          label="County / State"
          name="location.countyState"
          className="my_profile_setting_input"
          register={register}
          error={errors?.countyState}
        />
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <FormInput
          label="City"
          name="location.city"
          className="my_profile_setting_input"
          register={register}
          error={errors?.city}
        />
      </div>
      {/* End .col */}
      <div className="col-lg-4 col-xl-4">
        <FormInput
          label="Neighborhood"
          name="location.neighborhood"
          className="my_profile_setting_input"
          register={register}
          error={errors?.neighborhood}
        />
      </div>
      {/* End .col */}
      <div className="col-lg-4 col-xl-4">
        <FormInput
          label="Zip"
          name="location.zip"
          className="my_profile_setting_input"
          register={register}
          error={errors?.zip}
        />
      </div>
      {/* End .col */}
      <div className="col-lg-4 col-xl-4">
        <FormSelect
          label="Country"
          name="country"
          className="my_profile_setting_input ui_kit_select_search"
          register={register}
          error={errors?.country}
          defaultValue={DEFAULT_COUNTRY}
          options={COUNTRIES_LIST}
          data-live-search="true"
          data-width="100%"
        />
      </div>
      {/* End .col */}

      {/* <div className="col-xl-12">
        <div className="my_profile_setting_input steps_btns_wrapper">
          <button className="btn btn1">Back</button>
          <button className="btn btn2" type="submit">
            Next
          </button>
        </div>
      </div> */}
      {/* End .col */}
    </>
  );
};

export default React.memo(LocationField);

// Google map iframe with latitude, longitude and street view inputs

{
  /*       
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <div className="h400 bdrs8" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.721472711!2d-115.31508339643749!3d36.12519578053308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1669000531244!5m2!1sen!2sbd"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLat">Latitude (for Google Maps)</label>
          <input type="text" className="form-control" id="googleMapLat" />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLong">Longitude (for Google Maps)</label>
          <input type="text" className="form-control" id="googleMapLong" />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Google Map Street View</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Turkey">Street View v1</option>
            <option data-tokens="Iran">Street View v2</option>
            <option data-tokens="Iraq">Street View v3</option>
            <option data-tokens="Spain">Street View v4</option>
            <option data-tokens="Greece">Street View v5</option>
            <option data-tokens="Portugal">Street View v6</option>
          </select>
        </div>
      </div> */
}
{
  /* End .col */
}
