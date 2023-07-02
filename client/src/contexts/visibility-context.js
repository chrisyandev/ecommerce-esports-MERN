import React, { createContext, useContext, useReducer } from "react";
import visibilityReducer from "../reducers/visibility-reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  PRODUCT_LIST_GRID_VIEW,
  PRODUCT_LIST_LIST_VIEW,
  ALERT_SHOW,
  ALERT_HIDE,
} from "../actions/visibility-actions";
import { productListTypes, alertTypes } from "../utils/constants";

const initialState = {
  isSidebarOpen: false,
  productListType: productListTypes.GRID,
  isAlertShown: false,
  alertType: alertTypes.ERROR,
  alertText: "",
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

  const showAlert = (alertType, alertText) => {
    dispatch({
      type: ALERT_SHOW,
      payload: { alertType, alertText },
    });
  };

  const hideAlert = () => {
    dispatch({ type: ALERT_HIDE });
  };

  return (
    <VisibilityContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        viewProductListAsGrid,
        viewProductListAsList,
        showAlert,
        hideAlert,
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
