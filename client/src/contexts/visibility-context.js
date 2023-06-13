import { createContext, useContext, useReducer } from "react";
import visibilityReducer from "../reducers/visibility-reducer";
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/actions";

const initialState = {
  isSidebarOpen: true,
};

const VisibilityContext = createContext();

const VisibilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  return (
    <VisibilityContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </VisibilityContext.Provider>
  );
};

const useVisibilityContext = () => {
  return useContext(VisibilityContext);
};

export { VisibilityProvider, useVisibilityContext };
