import * as firebase from "firebase";
import { FirebaseConfig } from "./config/keys";

firebase.initializeApp(FirebaseConfig);

const storageRef = firebase.storage().ref();
// export const fileRef = storageRef().child("files");

export const authRef = firebase.auth();
