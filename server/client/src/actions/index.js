import axios from "axios";
import { FETCH_USER, CLEAR_FORM_FILES, FETCH_FILES } from "./types";
import { reset } from "redux-form";

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
  dispatch({ type: CLEAR_FORM_FILES, payload: null });

  dispatch(reset("formFiles"));
};

export const fetchFiles = () => async (dispatch) => {
  const res = await axios.get("/api/files");

  dispatch({ type: FETCH_FILES, payload: res.data });
};
