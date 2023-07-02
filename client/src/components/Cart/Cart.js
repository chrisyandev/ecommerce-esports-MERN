import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartColumns, CartItem, CartTotals } from "..";
import { useCartContext } from "../../contexts/cart-context";

const Cart = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <StyledSection className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.cartItemId} cartItem={item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="btn">
          Continue Shopping
        </Link>
        <button type="button" className="btn clear-btn" onClick={clearCart}>
          Clear
        </button>
      </div>
      <CartTotals />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .clear-btn {
    color: var(--clr-white);
    background: var(--clr-grey-9);
  }
  .clear-btn:hover {
    background: var(--clr-grey-8);
  }
`;

export default Cart;
