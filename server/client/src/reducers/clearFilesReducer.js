import { CLEAR_FILES } from "../actions/types";

export default function (state = null, action) {
  console.log("clear files reducer ran");
  console.log(action.type);

  switch (action.type) {
    case CLEAR_FILES:
      console.log(state);
      return null;
    default:
      return state;
  }
}
