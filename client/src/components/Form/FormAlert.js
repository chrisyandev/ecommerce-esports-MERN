import React from "react";
import { alertTypes } from "../../utils/constants";

const FormAlert = ({ type, text }) => {
  return (
    <div
      className={`alert alert-${
        type === alertTypes.SUCCESS ? "success" : "danger"
      }`}
    >
      {text}
    </div>
  );
};

export default FormAlert;
