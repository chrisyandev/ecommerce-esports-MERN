import { LOAD_PRODUCTS } from "../actions/filter-actions";

const filterReducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      allProducts: [...action.payload], // copies payload instead of pointing to payload
      filteredProducts: [...action.payload],
    };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default filterReducer;
