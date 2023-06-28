import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import userReducer from "../reducers/user-reducer";
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
  POST_LOGIN_PATH_UPDATE,
} from "../actions/user-actions";
import { useVisibilityContext } from "./visibility-context";
import { alertTypes } from "../utils/constants";

export const initialState = {
  user: null,
  isLoggedIn: false,
  userLoading: true,
  postLoginPath: "/",
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { showAlert } = useVisibilityContext();

  useEffect(() => {
    checkIsUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const logoutUser = async () => {
    dispatch({ type: USER_LOGOUT });
    axios
      .get("/api/v1/auth/logout")
      .then(() => {
        dispatch({ type: USER_LOGOUT_SUCCESS });
        window.location.replace(window.location.origin);
      })
      .catch((error) => {
        dispatch({ type: USER_LOGOUT_ERROR, error });
      });
  };

  const checkIsUserLoggedIn = async () => {
    dispatch({ type: USER_GET_CURRENT });
    axios
      .get("/api/v1/users/show-me")
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: USER_GET_CURRENT_SUCCESS, payload: user });
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          logoutUser();
        }
        dispatch({ type: USER_GET_CURRENT_ERROR, error });
      });
  };

  const updatePostLoginPath = (path) => {
    dispatch({ type: POST_LOGIN_PATH_UPDATE, payload: path });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        updatePostLoginPath,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
