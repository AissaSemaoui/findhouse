import FormInput from "../../common/FormInput";

const FloorPlan = ({ register, errors, setValue, index }) => {
  return (
    <div key={index}>
      <div className="row">
        <div className="col-lg-6 col-xl-4">
          <FormInput
            type="number"
            defaultValue={1}
            label="Plan Bedrooms"
            name={`floorPlans.${index}.planBedrooms`}
            className="my_profile_setting_input form-group"
            register={register}
            error={errors?.[index]?.planBedrooms}
          />
        </div>

        <div className="col-lg-6 col-xl-4">
          <FormInput
            type="number"
            defaultValue={1}
            label="Plan Bathrooms"
            name={`floorPlans.${index}.planBathrooms`}
            className="my_profile_setting_input form-group"
            register={register}
            error={errors?.[index]?.planBathrooms}
          />
        </div>

        <div className="col-lg-6 col-xl-4">
          <FormInput
            type="number"
            defaultValue={1}
            label="Plan Price"
            name={`floorPlans.${index}.planPrice`}
            className="my_profile_setting_input form-group"
            register={register}
            error={errors?.[index]?.planPrice}
          />
        </div>

        <div className="col-lg-6 col-xl-4">
          <FormInput
            label="Price Postfix"
            name={`floorPlans.${index}.pricePostfix`}
            className="my_profile_setting_input form-group"
            register={register}
            error={errors?.[index]?.pricePostfix}
          />
        </div>

        <div className="col-lg-6 col-xl-4">
          <FormInput
            type="number"
            defaultValue={1}
            label="Plan Size"
            name={`floorPlans.${index}.planSize`}
            className="my_profile_setting_input form-group"
            register={register}
            error={errors?.[index]?.planSize}
          />
        </div>

        <div className="col-lg-6 col-xl-4">
          <div className="my_profile_setting_input form-group">
            <label>Plan Image</label>
            <div className="avatar-upload">
              <div
                className={`avatar-edit ${
                  errors?.[index]?.planImage?.message && "is-invalid"
                } `}
              >
                <input
                  className={`btn btn-thm`}
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  {...register(`floorPlans.${index}.planImage`)}
                />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="invalid-feedback">
                {errors?.[index]?.planImage?.message}
              </div>
              <div className="avatar-preview">
                <div id="imagePreview"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <FormInput
            label="Plan Description"
            name={`floorPlans.${index}.planDescription`}
            className="my_profile_setting_textarea form-group"
            register={register}
            error={errors?.[index]?.planDescription}
            rows={7}
            textarea
          />
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;