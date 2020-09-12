import { Typography } from "@material-ui/core";
import React from "react";

const AuthDenied = ({ color, message }) => {
  return (
    <Typography color={color || "primary"}>
      {message || "Authentication Denied"}
    </Typography>
  );
};

export default AuthDenied;
