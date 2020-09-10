import { useEffect } from "react";
import * as firebase from "firebase/app";
import history from "../history";

const useAuthRoute = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push("/auth");
      }
    });
  }, [history]);
};

export default useAuthRoute;
