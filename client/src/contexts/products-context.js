import { createContext, useContext, useEffect, useReducer } from "react";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions/products-actions";
import productsReducer from "../reducers/products-reducer";

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featureProducts: [],
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS });
    try {
      fetch("/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const { products } = data;
          dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
        });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProductsContext };
