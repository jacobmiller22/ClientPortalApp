import axios from "axios";
import { FETCH_FILES, UPDATE_AUTH, FETCH_USERS } from "./types";
import { reset } from "redux-form";
import createFirebase from "./firebase";
import { firebaseReducer } from "react-redux-firebase";

export const fetchUserFirebase = () => async (dispatch) => {
  console.log("DEPRECATED FETCHUSERFIREBASE");
  var firebase = createFirebase();
  dispatch({
    type: UPDATE_AUTH,
    payload: firebase.auth().currentUser,
  });
};

export const uploadFormData = (formData) => async (dispatch) => {
  const res = await axios.post("/api/files", formData);
  dispatch(reset("formFiles"));
};

export const fetchFiles = (firebase) => async (dispatch) => {
  // BUG: When /history reloads, the auth object is null

  if (firebase.auth().currentUser) {
    await firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        try {
          const res = await axios.get("/api/files", {
            params: {
              currentUserToken: idToken,
            },
          });
          dispatch({ type: FETCH_FILES, payload: res.data });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export const fetchUsers = (firebase) => async (dispatch) => {
  // Grabs the list of users from backend
  if (!!firebase.auth().currentUser) {
    await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        try {
          // Confirm admin role
          if (idTokenResult.claims.administrator) {
            console.log("authorized user");

            const res = await axios.get("/api/users", {
              params: {
                currentUserToken: idTokenResult.token,
              },
            });
            dispatch({ type: FETCH_USERS, payload: res.data });
          } else {
            console.log("unauth");
            console.log(idTokenResult);
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
};

export const changePermissions = (firebase, user, role) => async (dispatch) => {
  if (!!firebase.auth().currentUser) {
    await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        try {
          // Confirm admin role
          if (idTokenResult.claims.administrator) {
            console.log("authorized user");

            const payload = {
              senderToken: idTokenResult.token,
              user,
              role,
            };
            const res = await axios.post("/api/grant_role", payload);
            console.log(res);
          } else {
            console.log("unauth");
            console.log(idTokenResult);
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
};
