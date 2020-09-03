import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import documentsReducer from "./documentsReducer";
import usersReducer from "./usersReducer";
import { authReducer, authPermissionsReducer } from "./authReducer";
import { authErrorReducer } from "./errorsReducer";

export default combineReducers({
  // Custom
  documents: documentsReducer,
  users: usersReducer,
  auth: combineReducers({
    currentUser: authReducer,
    permissions: authPermissionsReducer,
  }),
  errors: combineReducers({
    auth: authErrorReducer,
  }),
  // External Libs
  form: reduxForm,
});
