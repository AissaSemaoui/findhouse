import React, { useEffect, useState } from "react";

const AMENITIES_LIST = [
  "condiționat",
  "casnic",
  "Piscină",
  "intrare",
  "Grătar",
  "microunde",
  "Digitală",
  "Șemineu",
  "Ascensor",
  "Interfon",
  "video",
  "pardosea",
  "sport",
  "Mobilier",
  "WiFi",
  "Sistem (casă inteligentă)",
  "termopane",
  "Saună",
  "autonomă",
  "joacă",
];

const Amenities = ({ setValue }) => {
  const [checkedAmenities, setCheckedAmenities] = useState([]);

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
