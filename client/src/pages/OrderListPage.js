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
      <PageHero title="Orders" />
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

export default OrderListPage;
