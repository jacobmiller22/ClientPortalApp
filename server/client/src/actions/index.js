import axios from "axios";
import {
  FETCH_USER,
  FETCH_FILES,
  FETCH_USER_FIREBASE,
  UPDATE_AUTH,
} from "./types";
import { reset } from "redux-form";
import createFirebase from "./firebase";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchUserFirebase = () => async (dispatch) => {
  var firebase = createFirebase();
  dispatch({
    type: UPDATE_AUTH,
    payload: firebase.auth().currentUser,
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
  dispatch(reset("formFiles"));
};

export const fetchFiles = () => async (dispatch) => {
  const res = await axios.get("/api/files");

  dispatch({ type: FETCH_FILES, payload: res.data });
};

export const loginWithFirebaseAuth = (values) => async (dispatch) => {
  var firebase = createFirebase();

  await firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch(function (error) {
      // handle errors

      if (error) {
        console.log(error.code);
        console.log(error.message);
      } else {
        // signed in
      }
    });
  dispatch({ type: UPDATE_AUTH, payload: firebase.auth().currentUser });
};

export const logout = () => async (dispatch) => {
  var firebase = createFirebase();

  await firebase.auth().signOut();
  dispatch({ type: UPDATE_AUTH, payload: firebase.auth().currentUser });
};
