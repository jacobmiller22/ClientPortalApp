import axios from "axios";
import cloudStorage from "../apis/cloudStorage";
import { FETCH_DOCUMENTS, FETCH_USERS } from "./types";
import { reset } from "redux-form";

import { authRef, storageRef } from "../firebase";

export const uploadFormData = (formData) => async (dispatch) => {
  if (!authRef.currentUser) {
    return;
  }

  await authRef.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      await axios.post("/api/files", formData, {
        params: {
          idToken,
        },
      });
    })
    //Dispatch
    .catch((err) => {
      // Handle Error
      console.log(
        "There was an error while retrieving the current user's jwt id token",
        err
      );
    });
  dispatch(reset("documentForm"));
};

/**
 * @params n - The number of documents to be fetched. An n < 1 will cause all documents to be fetched
 **/
export const fetchDocuments = (n) => async (dispatch) => {
  console.log("fetch");
  if (!authRef.currentUser) {
    return;
  }

  authRef.currentUser.getIdTokenResult().then(async (result) => {
    console.log(result);
    if (!result) {
      return;
    }
    // Grab doc list
    if (n < 1) {
      // List All
      return;
    }
    let listRef = storageRef.child(`${authRef.currentUser.uid}`);
    let firstPage = await listRef.list({ maxResults: n });

    dispatch({
      type: FETCH_DOCUMENTS,
      payload: firstPage.items,
    });
  });
};

export const fetchUsers = (firebase) => async (dispatch) => {
  // Grabs the list of users from backend
  if (firebase.auth().currentUser) {
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
  if (firebase.auth().currentUser) {
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

export const createUser = (firebase, values) => async (dispatch) => {
  if (firebase.auth().currentUser) {
    await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        try {
          if (idTokenResult.claims.administrator) {
            // polish values

            const payload = {
              senderToken: idTokenResult.token,
              user: {
                email: values.email,
                displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
                phoneNumber: `+1${values.phone}`,
                password: values.password,
              },
            };
            const res = axios.post("/api/create_user", payload);
            dispatch(reset("formFiles"));
          } else {
            console.log("unauth");
            console.log(idTokenResult);
          }
        } catch (err) {
          console.log(err);
        }
      });
  }
};

export const __changeAuthState__ = () => async (dispatch) => {
  await authRef.onAuthStateChanged((user) => {
    dispatch({
      type: "USER_STATUS",
      payload: user || null,
    });
  });
};

export const signUserIn = (email, password) => () => {
  authRef.signInWithEmailAndPassword(email, password);
};

export const signUserOut = () => () => {
  authRef.signOut();
};
