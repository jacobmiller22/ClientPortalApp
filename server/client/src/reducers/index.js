import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
//import authReducer from "./authReducer";
import authFirebaseReducer from "./authFirebaseReducer";
import filesReducer from "./filesReducer";
import usersReducer from "./usersReducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  // Custom
  //auth: authReducer, // Deprecated
  //authFirebase: authFirebaseReducer, // Deprecated
  files: filesReducer,
  users: usersReducer,
  // External Libs
  form: reduxForm,
  firebase: firebaseReducer,
});
