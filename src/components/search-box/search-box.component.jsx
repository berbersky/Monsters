import React from "react";
import "./search-box.style.css";

const SearchBox = ({ placeholder, handelChange }) => (
  <input
    className="search"
    type="search"
    placeholder={placeholder}
    onChange={handelChange}
  />
);

export default SearchBox;
