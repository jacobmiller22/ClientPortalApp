import axios from "axios";

import * as types from "./types";
import { reset } from "redux-form";

import { authRef, storageRef } from "../firebase";

const verifyAuthorization = async (resultOnly) => {
  const { currentUser } = authRef;
  try {
    const result = await currentUser.getIdTokenResult();

    // Returns the result if admin priviledges aren't needed
    if (resultOnly) {
      return result;
    }

    const { claims } = result;
    if (claims && claims.administrator) {
      return result;
    }
    throw "Unauthorized user";
  } catch (error) {
    console.log(error);
  }
};

export const uploadFormData = (formData) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdToken(false).then(async (idToken) => {});

  const { token } = await verifyAuthorization(true);

  const res = await axios.post("/api/files", formData, {
    headers: {
      idtoken: token,
    },
    params: {
      provider: "blaj",
    },
  });

  dispatch({
    type: types.UPLOAD_DOCUMENTS,
    payload: res.data,
  });

  dispatch(reset("documentForm"));
};

/**
 * @params n - The number of documents to be fetched. An n < 1 will cause all documents to be fetched
 **/
export const fetchDocuments = ({ n, nextPageToken, currPageNum }) => async (
  dispatch
) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  console.log(n);

  const listRef = storageRef.child(
    `User-Documents/U-${currentUser.uid}/Client-Provided/`
  );

  const listNextPage = async (nextPageToken) => {
    const nextPage = await listRef.list({
      maxResults: n,
      pageToken: nextPageToken,
    });
    return nextPage;
  };

  if (nextPageToken) {
    var thisPage = await listNextPage(nextPageToken);
  } else if (currPageNum > 0) {
    // List all items before previous page
    const numResults = n * (currPageNum - 2);
    if (numResults > 0) {
      const preItems = await listRef.list({ maxResults: numResults });
      console.log("pre page:", preItems);
      // Now get the next page, which will be the "previous page"
      var thisPage = await listNextPage(preItems.nextPageToken);
    } else {
      var thisPage = await listRef.list({ maxResults: n });
    }
  } else {
    var thisPage = await listRef.list({ maxResults: n });
  }

  dispatch({
    type: types.FETCH_DOCUMENTS,
    payload: thisPage,
  });
};

export const fetchUsers = (n) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const result = await verifyAuthorization();

  const res = await axios.get("/api/users", {
    headers: {
      idtoken: result.token,
    },
    params: {
      maxResults: n,
    },
  });
  dispatch({
    type: types.FETCH_USERS,
    payload: res.data,
  });
};

export const modifyUserPermissions = (uid, newPermissions) => async (
  dispatch
) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  currentUser.getIdTokenResult().then(async (result) => {
    if (!verifyAuthorization(result.claims)) return;

    const res = await axios.patch("/api/users", newPermissions, {
      headers: {
        idtoken: result.idToken,
      },
      params: {
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

    console.log(result);
    const res = await axios.post("/api/users", credentials, {
      headers: {
        idToken: result.token,
      },
    });

    dispatch({
      type: types.CREATE_USER,
      payload: res.data,
    });
  });
};

export const deleteUser = (uid) => async (dispatch) => {};

export const updateUser = (uid, credentials) => async (dispatch) => {};

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
