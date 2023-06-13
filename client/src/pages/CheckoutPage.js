import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title={"Checkout"} />
      <StyledDiv className="page"></StyledDiv>
    </main>
  );
};

const StyledDiv = styled.div``;

export default CheckoutPage;
