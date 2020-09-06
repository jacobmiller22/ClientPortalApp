import React, { useState, useEffect } from "react";

import {
  Typography,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const UserEdit = (props) => {
  const [debouncedUser, setDebouncedUser] = useState({ email: "" });

  useEffect(() => {
    setDebouncedUser({
      email: props.user.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
