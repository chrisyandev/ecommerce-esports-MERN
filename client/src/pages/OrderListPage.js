import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";

const OrderListPage = () => {
  return (
    <main>
      <PageHero title={"Orders"} />
      <StyledDiv className="page"></StyledDiv>
    </main>
  );
};

const StyledDiv = styled.div``;

export default OrderListPage;
