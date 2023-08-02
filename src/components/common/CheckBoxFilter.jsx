import { useDispatch } from "react-redux";
import { AMENITIES_LIST } from "../../config/constants";
import { addAmenities } from "../../features/properties/propertiesSlice";

const CheckBoxFilter = () => {
  const dispatch = useDispatch();

  const generateCheckboxes = () => {
    return AMENITIES_LIST.map((amenity, index) => {
      const id = `customCheck${index + 1}`;
      return (
        <li key={index} className="selectable-list__item">
          <div className="form-check custom-checkbox">
            <input
              type="checkbox"
              value={amenity}
              onChange={(e) => dispatch(addAmenities(e.target.value))}
              className="form-check-input"
              id={id}
            />
            <label className="form-check-label" htmlFor={id}>
              {amenity}
            </label>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="checkbox-grid">
        <ul className="ui_kit_checkbox selectable-list">
          {generateCheckboxes()}
        </ul>
      </div>
    </>
  );
};

export default CheckBoxFilter;
