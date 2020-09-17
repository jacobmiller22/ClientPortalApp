import axios from "axios";

import * as types from "./types";

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
    throw Error("Unauthorized user");
  } catch (error) {
    console.log(error);
  }
};

export const uploadFormData = (formData, user) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const { token } = await verifyAuthorization(true);

  const res = await axios.post("/api/files", formData, {
    headers: {
      idtoken: token,
    },
    params: {
      sender: currentUser,
      reciever: user,
    },
  });

  dispatch({
    type: types.UPLOAD_DOCUMENTS,
    payload: res.data,
  });
};

/**
 * @params n - The number of documents to be fetched. An n < 1 will cause all documents to be fetched
 **/
export const fetchDocuments = ({
  n,
  nextPageToken,
  currPageNum,
  path,
}) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const listRef = storageRef.child(`${path[0]}/${currentUser.uid}/${path[1]}/`);

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

      // Now get the next page, which will be the "previous page"
      thisPage = await listNextPage(preItems.nextPageToken);
    } else {
      thisPage = await listRef.list({ maxResults: n });
    }
  } else {
    thisPage = await listRef.list({ maxResults: n });
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

export const editUser = (user) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const result = await verifyAuthorization();

  const res = await axios.patch(
    "/api/users",
    { user },
    {
      headers: {
        idtoken: result.token,
      },
      params: {
        uid: user.uid,
      },
    }
  );

  dispatch({
    type: types.MODIFY_USER_PERMISSIONS,
    payload: res.data,
  });
};

export const createUser = (credentials) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const result = await verifyAuthorization();

  const res = await axios.post("/api/users", credentials, {
    headers: {
      idToken: result.token,
    },
  });
  dispatch({
    type: types.CREATE_USER,
    payload: res.data,
  });
};

export const deleteUser = (uid) => async (dispatch) => {
  const { currentUser } = authRef;

  if (!currentUser) return;

  const result = await verifyAuthorization();

  const res = await axios.delete("/api/users", {
    headers: {
      idtoken: result.token,
    },
    data: {
      uid,
    },
  });
  dispatch({
    type: types.DELETE_USER,
    payload: res.data,
  });
};

export const updateUser = (uid, credentials) => async (dispatch) => {};

export const registerAuthListener = () => async (dispatch) => {
  authRef.onAuthStateChanged(async (user) => {
    dispatch({
      type: types.USER_STATUS,
      payload: user || {},
    });

    if (!user) {
      return;
    }
    // Check User's permissions
    const result = await user.getIdTokenResult().catch((error) => {
      dispatch({
        type: types.TOKEN_RESULT_ERROR,
        payload: error,
      });
    });
    if (result.claims) {
      // User has a custom claim
      dispatch({
        type: types.USER_PERMISSIONS,
        payload: result.claims,
      });
    }
  });
};

export const signUserIn = (email, password) => async (dispatch) => {
  await authRef.signInWithEmailAndPassword(email, password).catch((error) => {
    console.log(error);
    dispatch({ type: types.SIGN_IN_ERROR, payload: error });
  });
};

export const signUserOut = () => (dispatch) => {
  authRef.signOut().catch((error) => {
    console.log(error);
    dispatch({ type: types.SIGN_OUT_ERROR, payload: error });
  });
};

export const selectUsers = (users) => (dispatch) => {
  dispatch({ type: types.SELECT_USERS, payload: users });
};
export const deselectUsers = (users) => (dispatch) => {
  dispatch({ type: types.DESELECT_USERS, payload: users });
};
