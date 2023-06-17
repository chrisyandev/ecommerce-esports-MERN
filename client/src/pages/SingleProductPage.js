import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loading, Error } from "../components";
import { useProductsContext } from "../contexts/products-context";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    singleProductLoading,
    singleProductError,
    singleProduct,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    let timeoutHandle;
    if (singleProductError) {
      timeoutHandle = setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [singleProductError, navigate]);

  if (singleProductLoading) {
    return <Loading />;
  }
  if (singleProductError) {
    return <Error />;
  }

  return (
    <StyledMain>
      <img src={singleProduct.image} alt={singleProduct.name} />
    </StyledMain>
  );
};

const StyledMain = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
