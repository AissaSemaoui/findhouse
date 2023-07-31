import React from "react";

import FormInput from "../../common/FormInput";
import Amenities from "./Amenities";

const DetailedInfo = ({ register, errors, setValue, watch }) => {
  return (
    <div className="row">
      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="Property ID"
          name="detailedInfo.propertyID"
          className="my_profile_setting_input"
          register={register}
          error={errors?.propertyID}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Area Size"
          name="detailedInfo.areaSize"
          className="my_profile_setting_input"
          register={register}
          error={errors?.areaSize}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="Size Prefix"
          name="detailedInfo.sizePrefix"
          className="my_profile_setting_input"
          register={register}
          error={errors?.sizePrefix}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Land Area"
          name="detailedInfo.landArea"
          className="my_profile_setting_input"
          register={register}
          error={errors?.landArea}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="Land Area Size Postfix"
          name="detailedInfo.landAreaSizePostfix"
          className="my_profile_setting_input"
          register={register}
          error={errors?.landAreaSizePostfix}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Bedrooms"
          name="detailedInfo.bedrooms"
          className="my_profile_setting_input"
          register={register}
          error={errors?.bedrooms}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Bathrooms"
          name="detailedInfo.bathrooms"
          className="my_profile_setting_input"
          register={register}
          error={errors?.bathrooms}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Garages"
          name="detailedInfo.garages"
          className="my_profile_setting_input"
          register={register}
          error={errors?.garages}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="Garages Size"
          name="detailedInfo.garagesSize"
          className="my_profile_setting_input"
          register={register}
          error={errors?.garagesSize}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          type="number"
          label="Year Built"
          name="detailedInfo.yearBuilt"
          className="my_profile_setting_input"
          register={register}
          error={errors?.yearBuilt}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="Video URL"
          name="detailedInfo.videoURL"
          className="my_profile_setting_input"
          register={register}
          error={errors?.videoURL}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <FormInput
          label="360° Virtual Tour"
          name="detailedInfo.virtualTour360"
          className="my_profile_setting_input"
          register={register}
          error={errors?.virtualTour360}
        />
      </div>

      <div className="col-xl-12">
        <h4 className="mb10">Amenities</h4>
      </div>

      <Amenities setValue={setValue} watch={watch} />

      {/* <div className="col-xl-12">
        <div className="my_profile_setting_input steps_btns_wrapper overflow-hidden mt20">
          <button className="btn btn1">Back</button>
          <button className="btn btn2">Next</button>
        </div>
      </div> */}
      {/* End .col */}
    </div>
  );
};

export default React.memo(DetailedInfo);
