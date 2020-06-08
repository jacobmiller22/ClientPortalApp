import { CLEAR_FILES } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case CLEAR_FILES:
      return null;
    default:
      return state;
  }
}
