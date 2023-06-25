import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "../actions/user-actions";

const userReducer = (state, action) => {
  if (action.type === USER_REGISTER) {
    console.log(action);
  }

  if (action.type === USER_REGISTER_SUCCESS) {
    console.log(action);
  }

  if (action.type === USER_REGISTER_ERROR) {
    console.log(action);
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default userReducer;
