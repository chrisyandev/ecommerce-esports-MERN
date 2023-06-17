import React from "react";
import styled from "styled-components";
import { Loading, Error, Product } from "../components";
import { useProductsContext } from "../contexts/products-context";

const FeaturedProducts = () => {
  const { productsLoading, productsError, featuredProducts } =
    useProductsContext();

  if (productsLoading) {
    return <Loading />;
  }
  if (productsError) {
    return <Error />;
  }

  return (
    <StyledSection className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline" />
      </div>
      <div className="section-center featured">
        {featuredProducts.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
