import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import authFirebaseReducer from "./authFirebaseReducer";
import filesReducer from "./filesReducer";

export default combineReducers({
  auth: authReducer,
  authFirebase: authFirebaseReducer,
  form: reduxForm,
  files: filesReducer,
});
