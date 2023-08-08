import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";
import {
  DEFAULT_LISTING_FILTER,
  MAX_PRICE_RANGE,
  MIN_PRICE_RANGE,
} from "../../config/constants";

const RangeSlider = ({ triggerSubmit = false }) => {
  const price = useSelector((state) => state.properties.price);

  const [getPrice, setPrice] = useState({
    value: {
      min: DEFAULT_LISTING_FILTER.price.min,
      max: DEFAULT_LISTING_FILTER.price.max,
    },
  });
  const dispath = useDispatch();

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  useMemo(() => handleOnChange(price), [price]);

  // price add to state
  useEffect(() => {
    dispath(
      addPrice({
        min: getPrice.value.min,
        max: getPrice.value.max,
      })
    );
  }, [dispath, triggerSubmit]);

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-around">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{getPrice.value.min}</span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{getPrice.value.max}</span>
          </div>
        </div>
      </div>

      <InputRange
        formatLabel={(value) => ``}
        maxValue={MAX_PRICE_RANGE}
        minValue={MIN_PRICE_RANGE}
        value={getPrice.value}
        onChange={(value) => handleOnChange(value)}
      />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;
