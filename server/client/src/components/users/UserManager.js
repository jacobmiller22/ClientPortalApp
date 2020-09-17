import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Toolbar,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Radio,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import UserList from "./UserList";

import CustomDialog from "../CustomDialog";
import SignUp from "../Forms/Authentication/SignUp";

import AuthDenied from "../Auth/AuthDenied";
import UserSearch from "./UserSearch";

import { deleteUser } from "../../actions";

const UserManager = ({
  auth: { currentUser, permissions },
  selectedUsers,
  deleteUser,
}) => {
  const [openNewUser, setOpenNewUser] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!currentUser || !permissions) {
    return null;
  }

  if (permissions.administrator === false) {
    return <AuthDenied />;
  }

  const renderSelectedDetails = () => {
    if (!selectedUsers) {
      return null;
    }

    return selectedUsers.map((user) => {
      console.log(user);
      return (
        <React.Fragment key={user.email}>
          {user.displayName || ""}
          <br />
          {user.email || ""}
          <br />
          {user.phoneNumber || ""}
          <br />
        </React.Fragment>
      );
    });
  };

  const renderDelete = () => {
    return (
      <>
        <DialogTitle>Delete User?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user(s):
            <br />
            <br />
            {renderSelectedDetails()}
            <br />
            This information is not recoverable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            startIcon={<DeleteForeverIcon />}
            variant='contained'
            color='primary'
            onClick={() => {
              setDeleteOpen(false);
              deleteUser(selectedUsers);
            }}>
            Delete
          </Button>
        </DialogActions>
      </>
    );
  };

  const renderPermissionsSelector = () => {
    return (
      <>
        <DialogTitle>Change permissions?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the permissions of users(s):
            <br />
            <br />
            {renderSelectedDetails()}
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Radio />
        </DialogActions>
        <DialogContent>
          <DialogContentText>Something</DialogContentText>
        </DialogContent>
      </>
    );
  };

  const renderOptions = () => {
    return (
      <>
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
          onClick={() => setDeleteOpen(true)}
          startIcon={<DeleteForeverIcon />}>
          Delete
        </Button>
        {/* <Button
          disabled={!selectedUsers.length}
          color='primary'
          variant='outlined'
          onClick={() => setPermissionsOpen(true)}>
          Change Permissions
        </Button> */}
        {/* <UserSearch
          selected={selected}
          handleChange={(e, user) => setSelected(user)}
        /> */}
      </>
    );
  };

  return (
    <>
      <CustomDialog open={openNewUser} onClose={() => setOpenNewUser(false)}>
        <DialogTitle>Create a User!</DialogTitle>
        <SignUp header=' ' admin />
      </CustomDialog>
      <CustomDialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        {renderDelete()}
      </CustomDialog>
      <CustomDialog open={permissionsOpen}>
        {renderPermissionsSelector()}
      </CustomDialog>
      <Toolbar>{renderOptions()}</Toolbar>
      <UserList />;
    </>
  );
};

const mapStateToProps = ({ auth, users: { selectedUsers } }) => {
  return { auth, selectedUsers };
};

export default connect(mapStateToProps, { deleteUser })(UserManager);
