import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../../contexts/cart-context";
import { formatPrice } from "../../utils/helpers";

const CartTotals = () => {
  const { totalAmount, shippingFee, tax } = useCartContext();

  return (
    <StyledSection>
      <div>
        <article>
          <h5>
            Subtotal : <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            Shipping Fee : <span>{formatPrice(shippingFee)}</span>
            Tax : <span>{formatPrice(tax)}</span>
          </p>
          <hr />
          <h4>
            Order Total :{" "}
            <span>{formatPrice(totalAmount + shippingFee + tax)}</span>
          </h4>
        </article>
        <Link to="/checkout" className="btn">
          Checkout
        </Link>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
