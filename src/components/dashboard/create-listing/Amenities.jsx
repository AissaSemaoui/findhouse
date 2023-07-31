import React, { useEffect, useState } from "react";
import { AMENITIES_LIST } from "../../../config/constants";

const Amenities = ({ setValue, watch }) => {
  const [checkedAmenities, setCheckedAmenities] = useState(
    watch("amenities") || []
  );

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;

    if (isChecked) {
      checkedAmenities.push(value);
    } else {
      checkedAmenities = checkedAmenities.filter(
        (checkedValue) => checkedValue !== value
      );
    }
    setCheckedAmenities([...checkedAmenities]);
  };

  useEffect(() => {
    setValue("amenities", checkedAmenities);
  }, [checkedAmenities]);

  console.log(checkedAmenities);

  return (
    <div className="amenities-container">
      {AMENITIES_LIST.map((amenity, index) => (
        <div key={index} className="amenity-item">
          <div className="form-check custom-checkbox">
            <input
              type="checkbox"
              className="form-check-input"
              checked={checkedAmenities.includes(amenity)}
              id={`customCheck${index}`}
              value={amenity}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`customCheck${index}`}>
              {amenity}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
