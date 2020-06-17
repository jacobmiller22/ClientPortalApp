import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
//import authReducer from "./authReducer";
import authFirebaseReducer from "./authFirebaseReducer";
import filesReducer from "./filesReducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  // Custom
  //auth: authReducer, // Deprecated
  authFirebase: authFirebaseReducer, // Deprecated
  files: filesReducer,
  // External Libs
  form: reduxForm,
  firebase: firebaseReducer,
});
