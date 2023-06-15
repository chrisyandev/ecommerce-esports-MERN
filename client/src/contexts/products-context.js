import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const fetchProducts = async () => {
    fetch("/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={"payload"}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProductsContext };
