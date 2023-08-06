import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import FloorPlan from "./FloorPlan";
import { DEFAULT_FLOOR_PLAN } from "../../../config/constants";

const DynamicFloorPlans = ({ register, errors, watch, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "floorPlans",
  });

  console.log("all Plans : ", watch("floorPlans"));
  // State to keep track of the currently viewed floor plan index
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  // Function to go to the next floor plan
  const goToNextPlan = () => {
    if (currentPlanIndex < fields.length - 1) {
      setCurrentPlanIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to go to the previous floor plan
  const goToPrevPlan = () => {
    if (currentPlanIndex > 0) {
      setCurrentPlanIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRemovePlan = (currentPlanIndex) => {
    remove(currentPlanIndex);
    goToPrevPlan();
  };

  const handleAppendPlan = () => {
    append(DEFAULT_FLOOR_PLAN);
  };

  return (
    <>
      <div className="col-lg-12">
        <h3 className="mb30">
          Floor Plans{" "}
          {fields.length > 0 && (
            <span>
              - {currentPlanIndex + 1} / {fields.length}
            </span>
          )}
        </h3>
      </div>
      <button
        className="btn admore_btn mb30"
        type="button"
        onClick={handleAppendPlan}
      >
        Add More
      </button>
      <div className="row">
        {fields.length > 0 && (
          <FloorPlan
            watch={watch}
            register={register}
            errors={errors}
            item={fields[currentPlanIndex]}
            index={currentPlanIndex}
          />
        )}

        <div className="col-xl-12">
          <div className="my_profile_setting_input steps_btns_wrapper">
            <button
              className="btn admore_btn mb30"
              type="button"
              onClick={() => handleRemovePlan(currentPlanIndex)}
            >
              Remove Plan
            </button>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              type="button"
              className="btn btn1 float-start"
              onClick={goToPrevPlan}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn2 float-end"
              onClick={goToNextPlan}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicFloorPlans;
