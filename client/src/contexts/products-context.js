import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";
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
  productsLoading: true,
  productsError: false,
  products: [],
  featureProducts: [],
  singleProductLoading: true,
  singleProductError: false,
  singleProduct: {},
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS });
    axios
      .get("/api/v1/products")
      .then((res) => {
        const { products } = res.data;
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
      })
      .catch((error) => {
        dispatch({ type: GET_PRODUCTS_ERROR, error });
      });
  };

  const fetchSingleProduct = useCallback(async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT });
    axios
      .get(`/api/v1/products/${id}`)
      .then((res) => {
        const { product } = res.data;
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
      })
      .catch((error) => {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR, error });
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProductsContext };
