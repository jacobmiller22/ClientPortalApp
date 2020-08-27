import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CustomModal = (props) => {
  const classes = useStyles();

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      {props.content}
    </Modal>
  );
};

export default CustomModal;
