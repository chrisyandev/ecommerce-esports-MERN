import styled from "styled-components";

const OrderCard = ({ order }) => {
  const { tax, shippingFee, subtotal, total, orderItems, status } = order;

  return (
    <StyledDiv>
      {orderItems.map((item) => {
        return <li key={item._id}>{item.name}</li>;
      })}
    </StyledDiv>
  );
};

const StyledDiv = styled.div``;

export default OrderCard;
