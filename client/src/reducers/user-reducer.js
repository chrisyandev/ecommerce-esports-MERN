import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
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

  if (action.type === USER_LOGIN) {
    return { ...state, userLoading: true };
  }

  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      userLoading: false,
    };
  }

  if (action.type === USER_LOGIN_ERROR) {
    return { ...state, userLoading: false };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default userReducer;
