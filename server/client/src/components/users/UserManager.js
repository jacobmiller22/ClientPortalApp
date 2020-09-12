import React, { useState } from "react";
import { connect } from "react-redux";

import { Toolbar, Button, DialogTitle } from "@material-ui/core";

import UserList from "./UserList";

import CustomDialog from "../CustomDialog";
import SignUp from "../Forms/Authentication/SignUp";

import AuthDenied from "../Auth/AuthDenied";

const UserManager = ({ auth: { currentUser, permissions }, selectedUsers }) => {
  const [openNewUser, setOpenNewUser] = useState(false);

  if (!currentUser) {
    return null;
  }

  if (!permissions.administrator) {
    return <AuthDenied />;
  }

  const renderOptions = () => {
    return (
      <Toolbar>
        <Button
          color='primary'
          variant='outlined'
          onClick={() => setOpenNewUser(true)}>
          Add User
        </Button>
        <Button
          disabled={!selectedUsers.length}
          color='primary'
          variant='outlined'
          onClick={() => setOpenNewUser(true)}>
          Delete
        </Button>
      </Toolbar>
    );
  };

  return (
    <>
      <CustomDialog open={openNewUser} onClose={() => setOpenNewUser(false)}>
        <DialogTitle>Create a User!</DialogTitle>
        <SignUp header=' ' admin />
      </CustomDialog>
      {renderOptions()}
      <UserList />;
    </>
  );
};

const mapStateToProps = ({ auth, users: { selectedUsers } }) => {
  return { auth, selectedUsers };
};

export default connect(mapStateToProps)(UserManager);
