import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./products-context";
import filterReducer from "../reducers/filter-reducer";
import { LOAD_PRODUCTS } from "../actions/filter-actions";

const initialState = {
  allProducts: [],
  filteredProducts: [],
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
