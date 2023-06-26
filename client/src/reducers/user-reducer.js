import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "../actions/user-actions";

const userReducer = (state, action) => {
  if (action.type === USER_REGISTER) {
    return { ...state, userLoading: true };
  }

  if (action.type === USER_REGISTER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      userLoading: false,
    };
  }

  if (action.type === USER_REGISTER_ERROR) {
    return { ...state, userLoading: false };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default userReducer;
