import React from "react";
import styled from "styled-components";
import { OrderCard } from "..";

const OrderList = ({ orders }) => {
  return (
    <StyledDiv>
      {orders.toReversed().map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default OrderList;
