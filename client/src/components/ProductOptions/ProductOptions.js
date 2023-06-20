import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProductOptionsColor, ProductOptionsQuantity } from "..";

const ProductOptions = ({ product }) => {
  const { id, stock, colors } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  return (
    <StyledSection>
      <ProductOptionsColor
        availableColors={colors}
        currentColor={color}
        setCurrentColor={(newColor) => setColor(newColor)}
      />
      <div className="btn-container">
        <ProductOptionsQuantity
          amount={amount}
          increment={() =>
            setAmount((prev) => (prev + 1 > stock ? prev : prev + 1))
          }
          decrement={() =>
            setAmount((prev) => (prev - 1 < 1 ? prev : prev - 1))
          }
        />
        <Link to="/cart" className="btn">
          Add To Cart
        </Link>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  margin-top: 2rem;

  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

export default ProductOptions;
