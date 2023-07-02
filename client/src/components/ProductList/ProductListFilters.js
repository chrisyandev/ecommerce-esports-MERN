import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../../contexts/filter-context";
import { formatPrice, getDistinctValues } from "../../utils/helpers";

const ProductListFilters = () => {
  const {
    productFilters: {
      text,
      company,
      category,
      color,
      minPrice,
      maxPrice,
      price,
      freeShipping,
    },
    updateProductFilters,
    clearProductFilters,
    allProducts,
  } = useFilterContext();

  const categories = getDistinctValues(allProducts, "category");
  const companies = getDistinctValues(allProducts, "company");
  const colors = getDistinctValues(allProducts, "colors");

  return (
    <StyledSection>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={updateProductFilters}
            />
          </div>
          {/* Category */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((cat, index) => {
                let catFormatted = cat.charAt(0).toUpperCase() + cat.slice(1);
                if (cat === "vrheadset") {
                  catFormatted = "VR Headset";
                }
                return (
                  <button
                    key={index}
                    type="button"
                    name="category"
                    value={cat}
                    onClick={updateProductFilters}
                    className={`${cat === category ? "active" : null}`}
                  >
                    {catFormatted}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={updateProductFilters}
              className="company"
            >
              {companies.map((co, index) => {
                return (
                  <option key={index} value={co}>
                    &nbsp;{co}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Color */}
          <div className="form-control">
            <h5>Color</h5>
            <div className="color">
              {colors.map((clr, index) => {
                if (clr === "any") {
                  return (
                    <button
                      key={index}
                      name="color"
                      value="any"
                      onClick={updateProductFilters}
                      className={`${
                        clr === color ? "any-color-btn active" : "any-color-btn"
                      }`}
                    >
                      Any
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={index}
                      name="color"
                      value={clr}
                      onClick={updateProductFilters}
                      className={`${
                        clr === color ? "color-btn active" : "color-btn"
                      }`}
                      style={{ background: clr }}
                    >
                      {clr === color ? (
                        <FaCheck
                          color={clr === "#ffffff" ? "#000000" : "#ffffff"}
                        />
                      ) : null}
                    </button>
                  );
                }
              })}
            </div>
          </div>
          {/* Price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={updateProductFilters}
            />
          </div>
          {/* Free Shipping */}
          <div className="form-control free-shipping">
            <label htmlFor="free-shipping">Free Shipping</label>
            <input
              type="checkbox"
              id="free-shipping"
              name="freeShipping"
              checked={freeShipping}
              onChange={updateProductFilters}
            />
          </div>
          {/* Clear Filters */}
          <button
            type="button"
            className="clear-btn"
            onClick={clearProductFilters}
          >
            Clear Filters
          </button>
        </form>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    color: var(--clr-grey-1);
    background: var(--clr-grey-8);
    border: none;
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-4);
    cursor: pointer;
  }
  .active {
    color: var(--clr-white);
    border-color: var(--clr-white);
  }
  .company {
    color: var(--clr-grey-1);
    background: var(--clr-grey-8);
    border: none;
    border-radius: var(--radius);
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .color {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: 2px solid var(--clr-white);
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .any-color-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .any-color-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .free-shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default ProductListFilters;
