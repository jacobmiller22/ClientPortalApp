import React from "react";
import Dialog from "@material-ui/core/Dialog";

const CustomDialog = (props) => {
  const { onClose, open, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
};

export default CustomDialog;
