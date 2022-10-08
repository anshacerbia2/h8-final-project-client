import React from "react";

const CategoriesRadio = ({ subCategories }) => {
  return (
    <>
      {subCategories.map((subCategory) => {
        return (
          <>
            <div className="form-check" key={subCategory.id}>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={subCategories.name}
              />
              <label className="form-check-label" htmlFor="category">
                {subCategory.name}
              </label>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CategoriesRadio;
