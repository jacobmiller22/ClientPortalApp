import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import documentsReducer from "./documentsReducer";
import { allUsersReducer, selectedUsersReducer } from "./usersReducer";
import { authReducer, authPermissionsReducer } from "./authReducer";
import { authErrorReducer } from "./errorsReducer";

export default combineReducers({
  // Custom
  documents: documentsReducer,
  users: combineReducers({
    allUsers: allUsersReducer,
    selectedUsers: selectedUsersReducer,
  }),
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
