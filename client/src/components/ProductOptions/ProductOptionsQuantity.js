import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";

const ProductOptionsQuantity = ({ quantity, increment, decrement }) => {
  return (
    <StyledDiv>
      <button type="button" onClick={decrement}>
        <FaMinus />
      </button>
      <h2>{quantity}</h2>
      <button type="button" onClick={increment}>
        <FaPlus />
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ProductOptionsQuantity;
