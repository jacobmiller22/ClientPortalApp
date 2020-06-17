import { FETCH_USER_FIREBASE, UPDATE_AUTH } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER_FIREBASE:
      return action.payload;
    case UPDATE_AUTH:
      return action.payload || false;
    default:
      return state;
  }
}
