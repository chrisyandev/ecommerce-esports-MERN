import { createContext, useContext, useReducer } from "react";
import userReducer from "../reducers/user-reducer";

const initialState = {
  user: null,
  token: null,
  userLocation: "",
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
