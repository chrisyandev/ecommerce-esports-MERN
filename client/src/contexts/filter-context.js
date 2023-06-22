import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./products-context";
import filterReducer from "../reducers/filter-reducer";
import {
  PRODUCTS_LOAD,
  PRODUCTS_SORT,
  PRODUCTS_FILTER,
  PRODUCT_SORT_TYPE_UPDATE,
  PRODUCT_FILTERS_UPDATE,
  PRODUCT_FILTERS_CLEAR,
} from "../actions/filter-actions";
import { productSortTypes } from "../utils/constants";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  productSortType: productSortTypes.PRICE_LOW_TO_HIGH,
  productFilters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    freeShipping: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: PRODUCTS_LOAD, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: PRODUCTS_FILTER });
    dispatch({ type: PRODUCTS_SORT });
  }, [products, state.productSortType, state.productFilters]);

  const updateProductSortType = (e) => {
    dispatch({ type: PRODUCT_SORT_TYPE_UPDATE, payload: e.target.value });
  };

  const updateProductFilters = (e) => {
    dispatch({
      type: PRODUCT_FILTERS_UPDATE,
      payload: { key: e.target.name, value: e.target.value },
    });
  };

  const clearProductFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateProductSortType,
        updateProductFilters,
        clearProductFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
