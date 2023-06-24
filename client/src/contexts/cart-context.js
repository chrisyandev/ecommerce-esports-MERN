import { createContext, useContext, useReducer } from "react";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cart-actions";
import cartReducer from "../reducers/cart-reducer";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingFee: 999,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  console.log(state);

  const addToCart = (id, color, quantity, product) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: { id, color, quantity, product },
    });
  };

  const removeFromCart = (id) => {};

  const stepCartItemQuantity = (id, type) => {};

  const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        stepCartItemQuantity,
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
