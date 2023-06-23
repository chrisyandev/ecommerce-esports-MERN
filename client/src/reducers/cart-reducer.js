import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cart-actions";

const cartReducer = (state, action) => {
  if (action.type === CART_ADD_ITEM) {
    const { id, color, quantity, product } = action.payload;

    const cartItem = state.cart.find((item) => item.cartId === id + color);

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
      cartId: id + color,
      name: product.name,
      color,
      quantity,
      image: product.image.url,
      price: product.price,
      maxQuantity: product.stock,
    };
    return { ...state, cart: [...state.cart, newCartItem] };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default cartReducer;
