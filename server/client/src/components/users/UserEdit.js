import React, { useState, useEffect } from "react";

import {
  Typography,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
}));

const UserEdit = (props) => {
  const classes = useStyles();

  const [debouncedUser, setDebouncedUser] = useState({ email: "" });

  useEffect(() => {
    setDebouncedUser({
      email: props.user.email,
    });
  }, []);

  return (
    <>
      <DialogTitle id='simple-dialog-title'>Modify User Info</DialogTitle>
      <DialogContent>
        <Button>Edit Information</Button>
        <Typography>Email: {debouncedUser.email}</Typography>
        <form>
          <input value={debouncedUser.email} type='text' />
        </form>
        <Button color='primary' variant='contained' onClick={props.handleClick}>
          Delete User
        </Button>
      </DialogContent>
    </>
  );
};

export default UserEdit;
