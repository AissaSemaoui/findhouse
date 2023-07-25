import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import FloorPlan from "./FloorPlan";

const DynamicFloorPlans = ({ register, errors, setValue, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "floorPlans",
  });

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
        onClick={() => append({ planDescription: "" })}
      >
        Add More
      </button>
      <div className="row">
        {fields.length > 0 && (
          <FloorPlan
            setValue={setValue}
            register={register}
            errors={errors}
            item={fields[currentPlanIndex]?.item}
            index={currentPlanIndex}
          />
        )}

        <div className="col-xl-12">
          <div className="my_profile_setting_input steps_btns_wrapper">
            <button
              className="btn admore_btn mb30"
              type="button"
              onClick={() => remove(currentPlanIndex)}
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

export default React.memo(DynamicFloorPlans);
