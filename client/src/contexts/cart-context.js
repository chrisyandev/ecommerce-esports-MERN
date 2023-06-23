import { createContext, useContext, useReducer } from "react";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cart-actions";
import cartReducer from "../reducers/cart-reducer";

const initialState = {
  cart: [],
  cartItemsCount: 0,
  totalAmount: 0,
  shippingFee: 999,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (id, color, quantity, product) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: { id, color, quantity, product },
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
