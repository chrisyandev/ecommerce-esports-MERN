import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  PRODUCT_LIST_GRID_VIEW,
  PRODUCT_LIST_LIST_VIEW,
  ALERT_SHOW,
  ALERT_HIDE,
} from "../actions/visibility-actions";
import { productListTypes } from "../utils/constants";

const visibilityReducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }

  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  if (action.type === PRODUCT_LIST_GRID_VIEW) {
    return { ...state, productListType: productListTypes.GRID };
  }

  if (action.type === PRODUCT_LIST_LIST_VIEW) {
    return { ...state, productListType: productListTypes.LIST };
  }

  if (action.type === ALERT_SHOW) {
    return {
      ...state,
      isAlertShown: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText,
    };
  }

  if (action.type === ALERT_HIDE) {
    return {
      ...state,
      isAlertShown: false,
      alertText: "",
    };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default visibilityReducer;
