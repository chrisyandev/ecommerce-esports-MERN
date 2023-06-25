import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from "../actions/cart-actions";

const cartReducer = (state, action) => {
  if (action.type === CART_ADD_ITEM) {
    const { id, color, quantity, product } = action.payload;

    const cartItem = state.cart.find((item) => item.cartItemId === id + color);

    if (cartItem) {
      const newQuantity =
        cartItem.quantity + quantity > cartItem.maxQuantity
          ? cartItem.maxQuantity
          : cartItem.quantity + quantity;
      const updatedCart = state.cart.map((item) => {
        if (item === cartItem) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { ...state, cart: updatedCart };
    }

    const newCartItem = {
      cartItemId: id + color,
      name: product.name,
      color,
      quantity,
      image: product.image,
      price: product.price,
      maxQuantity: product.stock,
    };
    return { ...state, cart: [...state.cart, newCartItem] };
  }

  if (action.type === CART_REMOVE_ITEM) {
    const updatedCart = state.cart.filter(
      (item) => item.cartItemId !== action.payload
    );
    return { ...state, cart: updatedCart };
  }

  if (action.type === CART_CLEAR) {
    return { ...state, cart: [] };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default cartReducer;
