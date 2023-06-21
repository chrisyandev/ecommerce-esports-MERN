import React from "react";
import { ProductListGridView, ProductListListView } from "..";
import { useFilterContext } from "../../contexts/filter-context";
import { useVisibilityContext } from "../../contexts/visibility-context";
import { productListTypes } from "../../utils/constants";

const ProductList = () => {
  const { filteredProducts } = useFilterContext();
  const { productListType } = useVisibilityContext();

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
