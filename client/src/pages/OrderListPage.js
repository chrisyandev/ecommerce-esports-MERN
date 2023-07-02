import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PageHero, OrderList, Loading, Error, FormAlert } from "../components";
import { useOrdersContext } from "../contexts/orders-context";
import { alertTypes } from "../utils/constants";

const OrderListPage = () => {
  const { orders, ordersLoading, ordersError, fetchOrders } =
    useOrdersContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ordersLoading) {
    return <Loading />;
  }
  if (ordersError) {
    return <Error />;
  }
  if (orders.length === 0) {
    return (
      <StyledMain className="page-100">
        <div className="empty">
          <h2>You have no orders</h2>
          <Link to="/products" className="btn">
            Shop
          </Link>
        </div>
      </StyledMain>
    );
  }

  return (
    <main>
      <PageHero title="Orders" />
      {searchParams.get("success") ? (
        <FormAlert
          type={alertTypes.SUCCESS}
          text="Order successfully placed!"
        />
      ) : null}
      <StyledDiv className="page">
        <div className="section-center orders">
          <OrderList orders={orders} />
        </div>
      </StyledDiv>
    </main>
  );
};

const StyledDiv = styled.div`
  .orders {
    padding: 1rem 0rem;
  }
  @media (min-width: 768px) {
    .orders {
      padding: 1rem 5rem;
    }
  }
`;

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

export default OrderListPage;
