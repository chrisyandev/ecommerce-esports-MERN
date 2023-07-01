import { OrderCard } from "..";

const OrderList = ({ orders }) => {
  return (
    <>
      {orders.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </>
  );
};

export default OrderList;
