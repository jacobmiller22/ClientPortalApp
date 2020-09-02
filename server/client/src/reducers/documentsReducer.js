import { FETCH_DOCUMENTS } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return action.payload;
    default:
      return state;
  }
}
