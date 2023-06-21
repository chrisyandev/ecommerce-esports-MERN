import React from "react";
import styled from "styled-components";
import {
  PageHero,
  ProductListFilters,
  ProductListHeader,
  ProductList,
} from "../components";

const ProductsPage = () => {
  return (
    <main>
      <PageHero title="Products" />
      <StyledDiv className="page">
        <div className="section-center products">
          <ProductListFilters />
          <div>
            <ProductListHeader />
            <ProductList />
          </div>
        </div>
      </StyledDiv>
    </main>
  );
};

const StyledDiv = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
