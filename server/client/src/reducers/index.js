import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import documentsReducer from "./documentsReducer";
import usersReducer from "./usersReducer";
import { authReducer, authPermissionsReducer } from "./authReducer";

export default combineReducers({
  // Custom
  documents: documentsReducer,
  users: usersReducer,
  auth: combineReducers({
    currentUser: authReducer,
    permissions: authPermissionsReducer,
  }),
  // External Libs
  form: reduxForm,
});
