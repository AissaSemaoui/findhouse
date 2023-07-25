import React from "react";

const FormSelect = ({
  className,
  label,
  name,
  options,
  error,
  register,
  ...rest
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className={`form-control selectpicker ${error ? "is-invalid" : ""}`}
        {...register(name)}
        {...rest}
      >
        {options.map((option) => {
          const isUnit = ["string", "number"].includes(typeof option);
          const label = isUnit ? option : option.label;
          const value = isUnit ? option : option.value;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default FormSelect;
