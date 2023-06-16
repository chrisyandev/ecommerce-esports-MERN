import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../actions/visibility-actions";

const visibilityReducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }

  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default visibilityReducer;
