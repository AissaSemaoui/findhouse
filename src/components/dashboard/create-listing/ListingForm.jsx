import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import propertyListingSchema from "../../../validations/propertyListing.validation";

import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import DynamicFloorPlans from "./DynamicFloorPlans";
import { DEFAULT_LISTING } from "../../../config/constants";

function ListingForm({
  defaultValues = DEFAULT_LISTING,
  onSubmit,
  isError,
  error,
  isLoading,
  listingId,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(propertyListingSchema),
    defaultValues,
  });

  console.log("here is the property Media : ", watch("propertyMedia"));

  console.log(errors);

  const handleReset = () => {
    reset(DEFAULT_LISTING);
  };

  if (isError) console.log("this is the response error : ", error);

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values, handleReset))}
      className="col-lg-12"
    >
      <div className="my_dashboard_review">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">Create Listing</h3>
          </div>
          <CreateList register={register} errors={errors} />
        </div>
      </div>
      <div className="my_dashboard_review mt30">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">Location</h3>
          </div>

          <LocationField register={register} errors={errors?.location} />
        </div>
      </div>
      <div className="my_dashboard_review mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Detailed Information</h3>
        </div>
        <DetailedInfo
          register={register}
          errors={errors?.detailedInfo}
          setValue={setValue}
          watch={watch}
        />
      </div>
      <div className="my_dashboard_review mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Property media</h3>
        </div>
        <PropertyMediaUploader
          watch={watch}
          setValue={setValue}
          errors={errors?.propertyMedia}
          listingId={listingId}
        />
      </div>
      <div className="my_dashboard_review mt30">
        <DynamicFloorPlans
          control={control}
          register={register}
          watch={watch}
          errors={errors?.floorPlans}
        />
      </div>

      <div className="flow-button  my_profile_setting_input">
        <button className="btn btn2" disabled={isLoading}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ListingForm;
