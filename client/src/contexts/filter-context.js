import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./products-context";
import filterReducer from "../reducers/filter-reducer";
import {
  PRODUCTS_LOAD,
  PRODUCT_SORT_TYPE_UPDATE,
} from "../actions/filter-actions";
import { productSortTypes } from "../utils/constants";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  productSortType: productSortTypes.PRICE_LOW_TO_HIGH,
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: PRODUCTS_LOAD, payload: products });
  }, [products]);

  const updateProductSortType = (e) => {
    const value = e.target.value;
    dispatch({ type: PRODUCT_SORT_TYPE_UPDATE, payload: value });
  };

  return (
    <FilterContext.Provider value={{ ...state, updateProductSortType }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
