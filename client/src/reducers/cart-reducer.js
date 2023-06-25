import {
  CART_ADD_ITEM,
  CART_ITEM_QUANTITY_STEP,
  CART_REMOVE_ITEM,
  CART_CLEAR,
  CART_TOTALS_UPDATE,
} from "../actions/cart-actions";

const cartReducer = (state, action) => {
  // add item
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

  // step item quantity
  if (action.type === CART_ITEM_QUANTITY_STEP) {
    const { cartItemId, stepType } = action.payload;

    const updatedCart = state.cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        switch (stepType) {
          case "+":
            return {
              ...item,
              quantity:
                item.quantity + 1 > item.maxQuantity
                  ? item.maxQuantity
                  : item.quantity + 1,
            };
          case "-":
            return {
              ...item,
              quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1,
            };
          default:
            break;
        }
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }

  // remove item
  if (action.type === CART_REMOVE_ITEM) {
    const updatedCart = state.cart.filter(
      (item) => item.cartItemId !== action.payload
    );
    return { ...state, cart: updatedCart };
  }

  // clear cart
  if (action.type === CART_CLEAR) {
    return { ...state, cart: [] };
  }

  // update totals
  if (action.type === CART_TOTALS_UPDATE) {
    const { totalQuantity, totalAmount } = state.cart.reduce(
      (totals, item) => {
        totals.totalQuantity += item.quantity;
        totals.totalAmount += item.price * item.quantity;
        return totals;
      },
      { totalQuantity: 0, totalAmount: 0 }
    );
    return { ...state, totalQuantity, totalAmount };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default cartReducer;
