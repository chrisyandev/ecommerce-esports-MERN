import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../contexts/cart-context";
import { PageHero, Cart } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();

  if (cart.length === 0) {
    return (
      <StyledMain className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            Shop
          </Link>
        </div>
      </StyledMain>
    );
  }

  return (
    <main>
      <PageHero title="cart" />
      <StyledMain className="page">
        <Cart />
      </StyledMain>
    </main>
  );
};

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
