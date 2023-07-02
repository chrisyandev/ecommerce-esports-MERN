import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  CART_ADD_ITEM,
  CART_ITEM_QUANTITY_STEP,
  CART_REMOVE_ITEM,
  CART_CLEAR,
  CART_TOTALS_UPDATE,
} from "../actions/cart-actions";
import cartReducer from "../reducers/cart-reducer";

const getLocalStorageCart = () => {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    return [];
  }
  return JSON.parse(cart);
};

const initialState = {
  cart: getLocalStorageCart(),
  totalQuantity: 0,
  totalAmount: 0,
  shippingFee: 999,
  tax: 1234,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: CART_TOTALS_UPDATE });
  }, [state.cart]);

  const addToCart = (id, color, quantity, product) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: { id, color, quantity, product },
    });
  };

  const stepCartItemQuantity = (cartItemId, stepType) => {
    dispatch({
      type: CART_ITEM_QUANTITY_STEP,
      payload: { cartItemId, stepType },
    });
  };

  const removeFromCart = (cartItemId) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: cartItemId });
  };

  const clearCart = () => {
    dispatch({ type: CART_CLEAR });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        stepCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
