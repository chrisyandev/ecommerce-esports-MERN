import React, { Link } from "react-router-dom";
import styled from "styled-components";
import { formatPrice, formatDate } from "../../utils/helpers";

const OrderCard = ({ order }) => {
  const { _id, dateCreated, total, orderItems, status } = order;

  return (
    <StyledSection>
      <div className="card-header">
        <div>
          <h6>Order Placed</h6>
          <span>{formatDate(dateCreated)}</span>
        </div>
        <div>
          <h6>Status</h6>
          <span>{status.toUpperCase()}</span>
        </div>
        <div>
          <h6>Total</h6>
          <span>{formatPrice(total)}</span>
        </div>
        <div>
          <h6>Order #</h6>
          <span>{_id}</span>
        </div>
      </div>
      <div className="card-body">
        {orderItems.map((item) => {
          const { _id, name, image, price, quantity, productId } = item;
          return (
            <article key={_id}>
              <img src={image.url} alt={image.altText} />
              <div>
                <h5>{name}</h5>
                <h5 className="price">
                  {formatPrice(price)} (qty: {quantity})
                </h5>
                <p>Return or replace: Eligible through...</p>
                <Link to={`/products/${productId}`} className="btn">
                  Buy it again
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0rem;
  margin-bottom: 1rem;
  background-color: var(--clr-grey-9);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: 1px solid black;
    overflow: auto;
  }
  .card-body {
    padding: 0.5rem 2rem 1rem 2rem;
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
      margin-top: 0.5rem;
    }
  }
  img {
    width: 100%;
    display: block;
    width: 90px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 0rem;
  }
  h5 {
    margin-bottom: 0rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 0rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
`;

export default OrderCard;
