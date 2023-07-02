import React from "react";
import { ProductListGridView, ProductListListView, Loading, Error } from "..";
import { useFilterContext } from "../../contexts/filter-context";
import { useVisibilityContext } from "../../contexts/visibility-context";
import { useProductsContext } from "../../contexts/products-context";
import { productListTypes } from "../../utils/constants";

const ProductList = () => {
  const { filteredProducts } = useFilterContext();
  const { productListType } = useVisibilityContext();
  const { productsLoading, productsError } = useProductsContext();

  if (productsLoading) {
    return <Loading />;
  }
  if (productsError) {
    return <Error />;
  }
  if (filteredProducts.length === 0) {
    return (
      <h5 style={{ textTransform: "none" }}>
        No products match your selected filters
      </h5>
    );
  }

  if (productListType === productListTypes.LIST) {
    return <ProductListListView products={filteredProducts} />;
  }

  return <ProductListGridView products={filteredProducts} />;
};

export default ProductList;
