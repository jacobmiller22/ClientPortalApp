import { USER_STATUS, USER_PERMISSIONS } from "../actions/types";
import _ from "lodash";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_STATUS:
      return _.isEmpty(action.payload) ? null : action.payload; // If null then not signed in and not signing in
    default:
      return state;
  }
};

export const authPermissionsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PERMISSIONS:
      return action.payload;
    default:
      return state;
  }
};
