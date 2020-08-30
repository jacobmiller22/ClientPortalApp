import React from "react";

import { Typography, CircularProgress } from "@material-ui/core";

const LoadMessage = ({ message, color, progressColor, messageColor }) => {
  const renderSharedLoad = (sharedColor) => {
    return (
      <div>
        <CircularProgress color={sharedColor} />
        <Typography color={sharedColor}>{message}</Typography>
      </div>
    );
  };

  if (!message) {
    message = "Loading...";
  }
  if (color) {
    return renderSharedLoad(color);
  }

  if ((progressColor || messageColor) && !(progressColor && messageColor)) {
    progressColor ? (color = progressColor) : (color = messageColor);
    return renderSharedLoad(color);
  }

  if (!progressColor && !messageColor) {
    color = "primary";
    renderSharedLoad(color);
  }

  return (
    <div>
      <CircularProgress color={progressColor} />
      <Typography color={messageColor}>{message}</Typography>
    </div>
  );
};

export default LoadMessage;
