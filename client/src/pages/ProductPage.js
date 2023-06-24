import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Loading,
  Error,
  PageHero,
  ProductImages,
  ProductRating,
  ProductOptions,
} from "../components";
import { useProductsContext } from "../contexts/products-context";
import { formatPrice } from "../utils/helpers";

const ProductPage = () => {
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

  const {
    name,
    price,
    description,
    stock,
    company,
    image,
    additionalImages,
    numOfReviews,
    averageRating,
  } = singleProduct;

  return (
    <StyledMain>
      <PageHero title={name} isProductPage={true} />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back To Products
        </Link>
        <div className="product-center">
          <ProductImages images={[image, ...additionalImages]} />
          <section className="content">
            <h2>{name}</h2>
            <ProductRating
              numOfReviews={numOfReviews}
              averageRating={averageRating}
            />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>SKU : </span>
              {id}
            </p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In Stock" : "Out Of Stock"}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <ProductOptions product={singleProduct} />}
          </section>
        </div>
      </div>
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

export default ProductPage;
