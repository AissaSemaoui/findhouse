import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import propertyListingSchema from "../../../validations/propertyListing.validation";

import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import DynamicFloorPlans from "./DynamicFloorPlans";
import useDataFetching from "../../../hooks/useDataFetching";

function ListingForm() {
  const { fetchData, data, error, loading } = useDataFetching();

  const [propertyMedia, setPropertyMedia] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(propertyListingSchema),
  });

  console.log("here is the floor plans : ", watch("floorPlans"));

  // console.log(watch("floorPlans"));

  const handleCreateNewListing = async (listingData) => {
    const ListingForm = new FormData();
    console.log(listingData);

    const planImages = listingData.floorPlans.map((floorPlan) => {
      const planImage = floorPlan.planImage[0];
      floorPlan.planImage = null;
      return planImage;
    });
    console.log(planImages, propertyMedia);

    propertyMedia.forEach((media) => {
      ListingForm.append("propertyMedia[]", media);
    });

    planImages.forEach((media) => {
      ListingForm.append("planImages[]", media);
    });

    ListingForm.append("listingData", JSON.stringify(listingData));

    await fetchData({
      method: "post",
      url: "/api/listings/create",
      body: ListingForm,
      // headers: { "Content-Type": "multipart/form-data" },
    });

    // fetchData({
    //   method: "post",
    //   url: "/api/listings/create",
    //   body: { listingData },
    // });
  };

  console.log(errors);

  if (error) console.log("this is the response error : ", error);

  if (data) console.log("this is the response data : ", data);

  return (
    <form onSubmit={handleSubmit(handleCreateNewListing)} className="col-lg-12">
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
        />
      </div>
      <div className="my_dashboard_review mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Property media</h3>
        </div>
        <PropertyMediaUploader
          propertyMedia={propertyMedia}
          setPropertyMedia={setPropertyMedia}
          register={register}
          errors={errors?.propertyMedia}
        />
      </div>
      <div className="my_dashboard_review mt30">
        <DynamicFloorPlans
          control={control}
          register={register}
          setValue={setValue}
          errors={errors?.floorPlans}
        />
      </div>

      <div className="flow-button  my_profile_setting_input">
        <button className="btn btn2" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ListingForm;
