import { useEffect } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";
import {
  DEFAULT_LISTING_FILTER,
  MAX_PRICE_RANGE,
  MIN_PRICE_RANGE,
} from "../../config/constants";

const RangeSlider = () => {
  const [price, setPrice] = useState({
    value: {
      min: DEFAULT_LISTING_FILTER.price.min,
      max: DEFAULT_LISTING_FILTER.price.max,
    },
  });
  const dispath = useDispatch();

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  // price add to state
  useEffect(() => {
    dispath(
      addPrice({
        min: price.value.min,
        max: price.value.max,
      })
    );
  }, [dispath, price]);

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-around">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{price.value.min}</span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{price.value.max}</span>
          </div>
        </div>
      </div>

      <InputRange
        formatLabel={(value) => ``}
        maxValue={MAX_PRICE_RANGE}
        minValue={MIN_PRICE_RANGE}
        value={price.value}
        onChange={(value) => handleOnChange(value)}
      />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;
