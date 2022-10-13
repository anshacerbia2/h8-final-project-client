import React, { useState } from "react";

const CategoriesRadio = ({ subCategories, filterHandler }) => {
  return (
    <>
      {subCategories.map((subCategory) => {
        return (
          <div className="form-check" key={'catradio-' + subCategory.id}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={subCategory.name}
              value={subCategory.id}
              onChange={(e) => filterHandler(e.currentTarget.value)}
            />
            <label className="form-check-label" htmlFor="category">
              {subCategory.name}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default CategoriesRadio;
