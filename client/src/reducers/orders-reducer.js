import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from "../actions/orders-actions";

const ordersReducer = (state, action) => {
  if (action.type === GET_ORDERS) {
    return {
      ...state,
      ordersLoading: true,
      ordersError: false,
    };
  }

  if (action.type === GET_ORDERS_SUCCESS) {
    return {
      ...state,
      ordersLoading: false,
      orders: action.payload,
    };
  }

  if (action.type === GET_ORDERS_ERROR) {
    return {
      ...state,
      ordersLoading: false,
      ordersError: true,
    };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default ordersReducer;
