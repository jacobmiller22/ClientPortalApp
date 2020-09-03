import {
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  SIGN_OUT_ERROR,
  TOKEN_RESULT_ERROR,
} from "../actions/types";

export const authErrorReducer = (state = null, action) => {
  switch (action.type) {
    case SIGN_IN_ERROR:
      return {
        ...action.payload,
        gist: "We encountered an error while signing you in.",
      };

    case SIGN_UP_ERROR:
      return {
        ...action.payload,
        gist: "We encountered an error while signing you up.",
      };
    case SIGN_OUT_ERROR:
      return {
        ...action.payload,
        gist: "We encountered an error while signing you out.",
      };
    case TOKEN_RESULT_ERROR:
      return {
        ...action.payload,
        gist: "We encountered an error while verifying your identity.",
      };
    default:
      return state;
  }
};
