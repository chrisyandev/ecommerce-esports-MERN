import React from "react";
import { useFilterContext } from "../../contexts/filter-context";

const ProductList = () => {
  const { filteredProducts } = useFilterContext();

  return (
    <div>
      {filteredProducts.map((product, index) => {
        return (
          <img
            key={index}
            src={product.image.url}
            alt={product.image.altText}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
