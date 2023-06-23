import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cart-actions";

const cartReducer = (state, action) => {
  if (action.type === CART_ADD_ITEM) {
    console.log(action.payload);
    return { ...state };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default cartReducer;
