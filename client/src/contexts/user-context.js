import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import userReducer from "../reducers/user-reducer";
import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
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
        const msg = error.response.data.msg;
        showAlert(alertTypes.ERROR, msg.charAt(0).toUpperCase() + msg.slice(1));
      });
  };

  const loginUser = async (userData) => {
    dispatch({ type: USER_LOGIN });
    axios
      .post("/api/v1/auth/login", userData)
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        showAlert(alertTypes.SUCCESS, "You logged in!");
      })
      .catch((error) => {
        dispatch({ type: USER_LOGIN_ERROR, error });
        if (error.response.status === 401) {
          showAlert(alertTypes.ERROR, "Invalid email or password");
        } else {
          showAlert(alertTypes.ERROR, "Could not login");
        }
      });
  };

  return (
    <UserContext.Provider value={{ ...state, registerUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
