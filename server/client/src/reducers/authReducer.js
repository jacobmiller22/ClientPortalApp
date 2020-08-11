// import { FETCH_USER, FETCH_USER_FIREBASE } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case "USER_STATUS":
      return action.payload || false;
    default:
      return state;
  }
}
