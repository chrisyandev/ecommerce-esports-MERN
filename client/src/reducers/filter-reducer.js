import {
  PRODUCTS_FILTER,
  PRODUCTS_LOAD,
  PRODUCTS_SORT,
  PRODUCT_FILTERS_CLEAR,
  PRODUCT_FILTERS_UPDATE,
  PRODUCT_SORT_TYPE_UPDATE,
} from "../actions/filter-actions";
import { productSortTypes } from "../utils/constants";

const filterReducer = (state, action) => {
  if (action.type === PRODUCTS_LOAD) {
    const maxPrice = Math.max(
      ...action.payload.map((product) => product.price)
    );
    return {
      ...state,
      allProducts: [...action.payload], // copies payload instead of pointing to payload
      filteredProducts: [...action.payload],
      productFilters: { ...state.productFilters, maxPrice, price: maxPrice }, // overrides initial filters
    };
  }

  if (action.type === PRODUCT_SORT_TYPE_UPDATE) {
    return { ...state, productSortType: action.payload };
  }

  if (action.type === PRODUCTS_SORT) {
    const { productSortType, filteredProducts } = state;

    if (productSortType === productSortTypes.PRICE_LOW_TO_HIGH) {
      filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (productSortType === productSortTypes.PRICE_HIGH_TO_LOW) {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (productSortType === productSortTypes.NAME_A_TO_Z) {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (productSortType === productSortTypes.NAME_Z_TO_A) {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state };
  }

  if (action.type === PRODUCT_FILTERS_UPDATE) {
    const { key, value } = action.payload;
    return {
      ...state,
      productFilters: {
        ...state.productFilters,
        [key]: value,
      },
    };
  }

  if (action.type === PRODUCT_FILTERS_CLEAR) {
    return {
      ...state,
      productFilters: {
        ...state.productFilters,
        text: "",
        company: "any",
        category: "any",
        color: "any",
        price: state.productFilters.maxPrice,
        freeShipping: false,
      },
    };
  }

  if (action.type === PRODUCTS_FILTER) {
    const { allProducts, productFilters } = state;
    const { text, company, category, color, price, freeShipping } =
      productFilters;

    let filteredProducts = [...allProducts];

    if (text) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }
    if (company !== "any") {
      filteredProducts = filteredProducts.filter(
        (product) => product.company === company
      );
    }
    if (category !== "any") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    if (color !== "any") {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.includes(color)
      );
    }
    // price
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= price
    );
    if (freeShipping) {
      filteredProducts = filteredProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filteredProducts };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default filterReducer;
