import React from "react";

const FormInput = ({
  className,
  label,
  type = "text",
  name,
  error,
  register,
  textarea = false,
  ...rest
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name}>{label}</label>
      {!textarea ? (
        <input
          type={type}
          name={name}
          id={name}
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...register(name)}
          {...rest}
        />
      ) : (
        <textarea
          type={type}
          name={name}
          id={name}
          className={`form-control ${error ? "is-invalid" : ""}`}
          {...register(name)}
          {...rest}
        />
      )}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default FormInput;
