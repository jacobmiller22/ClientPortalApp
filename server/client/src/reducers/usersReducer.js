import { FETCH_USERS, SELECT_USERS, DESELECT_USERS } from "../actions/types";
import _ from "lodash";

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

export const selectedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_USERS:
      return [...state, action.payload];
    case DESELECT_USERS:
      return _.remove(state, (user) => {});
    default:
      return state;
  }
};
