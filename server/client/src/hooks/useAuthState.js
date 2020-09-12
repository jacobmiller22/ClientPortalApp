import React from "react";
import _ from "lodash";

const useAuthRoute = ({ currentUser }) => {
  if (!currentUser || _.isEmpty(currentUser)) {
    return null;
  }
};

export default useAuthRoute;
