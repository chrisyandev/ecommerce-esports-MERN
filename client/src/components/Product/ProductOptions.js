import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProductColorPicker, ProductQuantityPicker } from "..";
import { useCartContext } from "../../contexts/cart-context";

const ProductOptions = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors } = product;

  const [color, setColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <StyledSection>
      <ProductColorPicker
        availableColors={colors}
        currentColor={color}
        setCurrentColor={(newColor) => setColor(newColor)}
      />
      <div className="btn-container">
        <ProductQuantityPicker
          quantity={quantity}
          increment={() =>
            setQuantity((prev) => (prev + 1 > stock ? prev : prev + 1))
          }
          decrement={() =>
            setQuantity((prev) => (prev - 1 < 1 ? prev : prev - 1))
          }
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, color, quantity, product)}
        >
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
    text-align: center;
  }
`;

export default ProductOptions;
