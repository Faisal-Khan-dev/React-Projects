import React from "react";
import Styles from "./style.module.css";

const TextField = ({ type = "text", placeholder, onChange, value }) => {
  return (
    <input
      className={Styles.inp}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextField;
