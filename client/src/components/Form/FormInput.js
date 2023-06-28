import React from "react";

const FormInput = ({ type, name, value, handleChange, labelText, onClick }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
        autoComplete="on"
        onClick={onClick}
      />
    </div>
  );
};

export default FormInput;
