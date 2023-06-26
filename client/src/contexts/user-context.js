import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import userReducer from "../reducers/user-reducer";
import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "../actions/user-actions";
import { useVisibilityContext } from "./visibility-context";
import { alertTypes } from "../utils/constants";

const initialState = {
  user: null,
  userLoading: false,
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { showAlert } = useVisibilityContext();

  const registerUser = async (userData) => {
    dispatch({ type: USER_REGISTER });
    axios
      .post("/api/v1/auth/register", userData)
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: USER_REGISTER_SUCCESS, payload: user });
        showAlert(alertTypes.SUCCESS, "You are registered!");
      })
      .catch((error) => {
        dispatch({ type: USER_REGISTER_ERROR, error });
        showAlert(alertTypes.ERROR, "Could not register");
      });
  };

  return (
    <UserContext.Provider value={{ ...state, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
