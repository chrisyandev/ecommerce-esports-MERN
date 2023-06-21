import React from "react";
import styled from "styled-components";
import {
  PageHero,
  ProductListFilters,
  ProductListSort,
  ProductList,
} from "../components";
import { useVisibilityContext } from "../contexts/visibility-context";

const ProductsPage = () => {
  const { viewProductListAsGrid, viewProductListAsList } =
    useVisibilityContext();

  return (
    <main>
      <PageHero title="Products" />
      <StyledDiv className="page">
        <div className="section-center products">
          <ProductListFilters />
          <div>
            <button type="button" onClick={viewProductListAsGrid}>
              GRID
            </button>
            <button type="button" onClick={viewProductListAsList}>
              LIST
            </button>
            <ProductListSort />
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
