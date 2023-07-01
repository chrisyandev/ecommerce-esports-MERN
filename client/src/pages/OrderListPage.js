import { useEffect } from "react";
import styled from "styled-components";
import { PageHero, OrderList, Loading, Error } from "../components";
import { useOrdersContext } from "../contexts/orders-context";

const OrderListPage = () => {
  const { orders, ordersLoading, ordersError, fetchOrders } =
    useOrdersContext();

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

  return (
    <main>
      <PageHero title={"Orders"} />
      <StyledDiv className="page">
        <OrderList orders={orders} />
      </StyledDiv>
    </main>
  );
};

const StyledDiv = styled.div``;

export default OrderListPage;
