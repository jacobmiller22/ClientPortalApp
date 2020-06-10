import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

import filesReducer from "./filesReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  files: filesReducer,
});
