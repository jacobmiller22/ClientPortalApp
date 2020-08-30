import axios from "axios";

import * as types from "./types";
import { reset } from "redux-form";

import { authRef, storageRef } from "../firebase";

const verifyAuthorization = (claims) => {
  if (!claims || !claims.administrator) {
    //User is NOT authorized to make request
    console.log("User is not authorized");
    return false;
  }
  return true;
};

export const uploadFormData = (formData) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdToken(false).then(async (idToken) => {
    const res = await axios.post("/api/files", formData, {
      params: {
        idToken,
      },
    });

    dispatch({
      type: types.UPLOAD_DOCUMENTS,
      payload: res.data,
    });

    dispatch(reset("documentForm"));
  });
};

/**
 * @params n - The number of documents to be fetched. An n < 1 will cause all documents to be fetched
 **/
export const fetchDocuments = (n) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdTokenResult().then(async (result) => {
    if (n < 1) {
      // List All
      return;
    }

    let listRef = storageRef.child(`${currentUser.uid}`);
    let firstPage = await listRef.list({ maxResults: n });

    dispatch({
      type: types.FETCH_DOCUMENTS,
      payload: firstPage.items,
    });
  });
};

export const fetchUsers = (n) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdTokenResult().then(async (result) => {
    if (!verifyAuthorization(result.claims)) return;

    const res = await axios.get("/api/users", {
      params: {
        idToken: result.token,
        maxResults: n,
      },
    });
    dispatch({
      type: types.FETCH_USERS,
      payload: res.data,
    });
  });
};

export const modifyUserPermissions = (uid, newPermissions) => async (
  dispatch
) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdTokenResult().then(async (result) => {
    if (!verifyAuthorization(result.claims)) return;

    const res = await axios.patch("/api/user", newPermissions, {
      params: {
        idToken: result.idToken,
        uid,
      },
    });

    dispatch({
      type: types.MODIFY_USER_PERMISSIONS,
      payload: res.data,
    });
  });
};

export const createUser = (credentials) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) {
    return;
  }

  currentUser.getIdTokenResult().then(async (result) => {
    if (!verifyAuthorization(result.claims)) return;

    const res = await axios.post("/api/create_user", credentials, {
      params: {
        idToken: result.idToken,
      },
    });

    dispatch({
      type: types.CREATE_USER,
      payload: res.data,
    });
  });
};

export const __changeAuthState__ = () => async (dispatch) => {
  await authRef.onAuthStateChanged((user) => {
    dispatch({
      type: types.USER_STATUS,
      payload: user || null,
    });

    if (!user) {
      return;
    }
    // Check User's permissions
    user.getIdTokenResult().then(async (result) => {
      if (result.claims) {
        // User has a custom claim
        dispatch({
          type: types.USER_PERMISSIONS,
          payload: result.claims,
        });
      }
    });
  });
};

export const signUserIn = (email, password) => () => {
  authRef.signInWithEmailAndPassword(email, password);
};

export const signUserOut = () => () => {
  authRef.signOut();
};
