import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import documentsReducer from "./documentsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export default combineReducers({
  // Custom
  documents: documentsReducer,
  users: usersReducer,
  auth: authReducer,
  // External Libs
  form: reduxForm,
});
