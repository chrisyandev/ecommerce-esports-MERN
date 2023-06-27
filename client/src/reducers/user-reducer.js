import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_GET_CURRENT,
  USER_GET_CURRENT_SUCCESS,
  USER_GET_CURRENT_ERROR,
} from "../actions/user-actions";
import { initialState } from "../contexts/user-context";

const userReducer = (state, action) => {
  if (action.type === USER_REGISTER) {
    return { ...state, userLoading: true };
  }

  if (action.type === USER_REGISTER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoggedIn: true,
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
      isLoggedIn: true,
      userLoading: false,
    };
  }

  if (action.type === USER_LOGIN_ERROR) {
    return { ...state, userLoading: false };
  }

  if (action.type === USER_LOGOUT) {
    return { ...state, userLoading: true };
  }

  if (action.type === USER_LOGOUT_SUCCESS) {
    return { ...initialState, userLoading: false };
  }

  if (action.type === USER_LOGOUT_ERROR) {
    return { ...state, userLoading: false };
  }

  if (action.type === USER_GET_CURRENT) {
    return { ...state, userLoading: true };
  }

  if (action.type === USER_GET_CURRENT_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoggedIn: true,
      userLoading: false,
    };
  }

  if (action.type === USER_GET_CURRENT_ERROR) {
    return { ...state, userLoading: false };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default userReducer;
