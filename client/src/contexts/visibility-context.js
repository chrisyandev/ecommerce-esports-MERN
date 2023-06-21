import { createContext, useContext, useReducer } from "react";
import visibilityReducer from "../reducers/visibility-reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  PRODUCT_LIST_GRID_VIEW,
  PRODUCT_LIST_LIST_VIEW,
} from "../actions/visibility-actions";
import { listTypes } from "../utils/constants";

const initialState = {
  isSidebarOpen: false,
  productListType: listTypes.GRID,
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

  const viewProductListAsGrid = () => {
    dispatch({ type: PRODUCT_LIST_GRID_VIEW });
  };

  const viewProductListAsList = () => {
    dispatch({ type: PRODUCT_LIST_LIST_VIEW });
  };

  return (
    <VisibilityContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        viewProductListAsGrid,
        viewProductListAsList,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};

const useVisibilityContext = () => {
  return useContext(VisibilityContext);
};

export { VisibilityProvider, useVisibilityContext };
