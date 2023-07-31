import React from "react";

import FormInput from "../../common/FormInput";
import FormSelect from "../../common/FormSelect";
import { PROPERTY_TYPES, STATUS } from "../../../config/constants";

const CreateList = ({ register, errors }) => {
  return (
    <>
      <div className="col-lg-12">
        <FormInput
          label="Property Title"
          name="propertyTitle"
          className="my_profile_setting_input"
          register={register}
          error={errors.propertyTitle}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <FormInput
          label="Property Description"
          name="propertyDescription"
          className="my_profile_setting_textarea"
          register={register}
          error={errors.propertyDescription}
          textarea
          rows={7}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <FormSelect
          label="Property Type"
          name="propertyType"
          className="my_profile_setting_input ui_kit_select_search"
          register={register}
          error={errors.propertyType}
          options={PROPERTY_TYPES}
          data-live-search="true"
          data-width="100%"
        />
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <FormSelect
          label="Status"
          name="status"
          className="my_profile_setting_input ui_kit_select_search"
          register={register}
          error={errors.status}
          options={STATUS}
          data-live-search="true"
          data-width="100%"
        />
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <FormInput
          type="number"
          label="Price"
          name="price"
          className="my_profile_setting_input"
          register={register}
          error={errors.price}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <FormInput
          type="number"
          label="Area"
          name="area"
          className="my_profile_setting_input"
          register={register}
          error={errors.area}
        />
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <FormSelect
          type="number"
          label="Rooms"
          name="rooms"
          className="my_profile_setting_input ui_kit_select_search"
          register={register}
          error={errors.rooms}
          options={[1, 2, 3, 4]}
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
    </>
  );
};

export default CreateList;
