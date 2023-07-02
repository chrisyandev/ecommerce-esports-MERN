import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from "../actions/orders-actions";
import ordersReducer from "../reducers/orders-reducer";

const initialState = {
  ordersLoading: true,
  ordersError: false,
  orders: [],
};

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS });
    axios
      .get("/api/v1/orders/my-orders")
      .then((res) => {
        const { orders } = res.data;
        dispatch({ type: GET_ORDERS_SUCCESS, payload: orders });
      })
      .catch((error) => {
        dispatch({ type: GET_ORDERS_ERROR, error });
      });
  };

  return (
    <OrdersContext.Provider value={{ ...state, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

const useOrdersContext = () => {
  return useContext(OrdersContext);
};

export { OrdersProvider, useOrdersContext };
