import { deleteFileFromDB } from "../../../features/listings";
import { isObjectFile } from "../../../utils/file";
import FormInput from "../../common/FormInput";

const FloorPlan = ({ register, errors, watch, index, setValue, listingId }) => {
  const item = watch(`floorPlans.${index}`);

  const setPlanImage = (value) => {
    setValue(`floorPlans.${index}.planImage`, value);
  };

  const planImageUrl =
    typeof item?.planImage?.filePath === "string"
      ? item?.planImage?.filePath
      : isObjectFile(item?.planImage?.[0])
      ? URL.createObjectURL(item.planImage?.[0])
      : "";

  // delete planImage
  const deletePlanImage = async (planImage) => {
    const isUploaded = typeof planImage?.filePath === "string";
    const isFile = isObjectFile(planImage);
    let deleted = planImage;
    if (isFile) {
      deleted = null;
    } else if (isUploaded) {
      await deleteFileFromDB(listingId, "floorPlans", planImage);
      deleted = null;
    } else {
      deleted = null;
    }
    setPlanImage(deleted);
  };

  return (
    <div key={index}>
      <div className="row">
        <div className="col-lg-6 col-xl-4">
          <FormInput
            type="number"
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
              {!planImageUrl ? (
                <div
                  className={`avatar-edit ${
                    errors?.[index]?.planImage?.message && "is-invalid"
                  } `}
                >
                  <input
                    className={`btn btn-thm}`}
                    type="file"
                    // disabled={!!planImageUrl}
                    id="imageUpload"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    {...register(`floorPlans.${index}.planImage`)}
                  />
                  <label htmlFor="imageUpload"></label>
                </div>
              ) : (
                <div className="avatar-preview w-min-content position-relative is-invalid">
                  <a onClick={() => deletePlanImage(item?.planImage)}>
                    <div
                      className="edu_stats_list "
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <span className="flaticon-garbage"></span>
                    </div>
                  </a>
                  <img src={planImageUrl} id="imagePreview" />
                </div>
              )}
              <div className="invalid-feedback">
                {errors?.[index]?.planImage?.message}
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
