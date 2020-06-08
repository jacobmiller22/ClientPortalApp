import axios from "axios";
import { FETCH_USER, ACCOUNT_SAVE_SUCCESS, CLEAR_FILES } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const uploadFiles = (values) => async (dispatch) => {
  // Format
  if (!values) {
    return;
  }

  var formData = new FormData();

  for (var i = 0; i < values.length; i++) {
    var key = "file" + (i + 1).toString();
    formData.append(key, values[i]);
  }

  const res = await axios.post("/api/files", formData);
  console.log(res);
  dispatch({ type: ACCOUNT_SAVE_SUCCESS, payload: res });
};

export const clearFiles = () => (dispatch) => {
  dispatch({ type: CLEAR_FILES, payload: null });
};
