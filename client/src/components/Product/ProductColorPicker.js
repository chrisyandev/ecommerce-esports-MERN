import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const ProductOptionsColor = ({
  availableColors,
  currentColor,
  setCurrentColor,
}) => {
  return (
    <StyledDiv>
      <span> colors : </span>
      <div>
        {availableColors.map((color, index) => {
          return (
            <button
              key={index}
              style={{ background: color }}
              className={`${
                currentColor === color ? "color-btn active" : "color-btn"
              }`}
              onClick={() => setCurrentColor(color)}
            >
              {currentColor === color ? (
                <FaCheck
                  color={currentColor === "#ffffff" ? "#000000" : "#ffffff"}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 125px 1fr;
  align-items: center;
  margin-bottom: 1rem;

  span {
    text-transform: capitalize;
    font-weight: 700;
  }
  div {
    display: flex;
  }

  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: black;
    margin-right: 0.5rem;
    border: 2px solid var(--clr-white);
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
`;

export default ProductOptionsColor;
