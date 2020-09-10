import React, { useState } from "react";
import { connect } from "react-redux";

import { Typography, Toolbar, Button, DialogTitle } from "@material-ui/core";

import UserList from "./UserList";
import LoadMessage from "../Loading/LoadMessage";
import CustomDialog from "../CustomDialog";
import SignUp from "../Forms/Authentication/SignUp";
import useAuthRoute from "../../hooks/useAuthRoute";

const UserManager = ({ auth: { currentUser, permissions } }) => {
  const [openNewUser, setOpenNewUser] = useState(false);

  useAuthRoute();

  const renderOptions = () => {
    return (
      <Toolbar>
        <Button
          color='primary'
          variant='outlined'
          onClick={() => setOpenNewUser(true)}>
          Create new User
        </Button>
      </Toolbar>
    );
  };

  const renderUserList = () => {
    if (!currentUser) {
      return null;
    }
    if (!permissions.administrator) {
      // User is not authorized to view user list
      return (
        <Typography color='error'>
          You are not authorized to view page!
        </Typography>
      );
    }

    return <UserList />;
  };

  return (
    <div>
      <CustomDialog open={openNewUser} onClose={() => setOpenNewUser(false)}>
        <DialogTitle>Create a User!</DialogTitle>
        <SignUp header=' ' admin />
      </CustomDialog>
      {renderOptions()}
      {renderUserList()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserManager);
