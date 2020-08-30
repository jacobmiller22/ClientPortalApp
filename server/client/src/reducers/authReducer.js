import { USER_STATUS, USER_PERMISSIONS } from "../actions/types";

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case USER_STATUS:
      return action.payload || false;
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
