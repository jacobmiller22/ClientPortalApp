import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import clearFilesReducer from "./clearFilesReducer";

import { ACCOUNT_SAVE_SUCCESS } from "../actions/types";

export default combineReducers({
  auth: authReducer,
  form: reduxForm.plugin({
    account: (state, action) => {
      switch (action.type) {
        case ACCOUNT_SAVE_SUCCESS:
          return undefined;
        default:
          return state;
      }
    },
  }),
  files: clearFilesReducer,
});
