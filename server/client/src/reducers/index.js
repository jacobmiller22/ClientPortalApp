import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import filesReducer from "./filesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export default combineReducers({
  // Custom
  files: filesReducer,
  users: usersReducer,
  auth: authReducer,
  // External Libs
  form: reduxForm,
});
