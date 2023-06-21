import {
  PRODUCTS_LOAD,
  PRODUCT_SORT_TYPE_UPDATE,
} from "../actions/filter-actions";

const filterReducer = (state, action) => {
  if (action.type === PRODUCTS_LOAD) {
    return {
      ...state,
      allProducts: [...action.payload], // copies payload instead of pointing to payload
      filteredProducts: [...action.payload],
    };
  }

  if (action.type === PRODUCT_SORT_TYPE_UPDATE) {
    return { ...state, productSortType: action.payload };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default filterReducer;
