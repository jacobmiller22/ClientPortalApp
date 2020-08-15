import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { FirebaseConfig } from "./config/keys";

firebase.initializeApp(FirebaseConfig);

export const storageRef = firebase.storage().ref();
// export const fileRef = storageRef().child("files");

export const authRef = firebase.auth();
