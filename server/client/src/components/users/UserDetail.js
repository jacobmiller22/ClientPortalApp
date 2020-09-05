import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Typography,
  IconButton,
  Button,
  DialogTitle,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

import CustomDialog from "../CustomDialog";

import { deleteUser } from "../../actions";

const UserDetail = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [debouncedUser, setDebouncedUser] = useState({ email: "" });

  const { user } = props;

  useEffect(() => {
    setDebouncedUser({
      email: user.email,
    });
  }, []);

  const handleDelete = () => {
    console.log("deleting user");
    // delete User
  };

  const renderDeleteUser = () => {
    return (
      <div>
        <Typography>Are you sure you want to delete this user?</Typography>
        <Button variant='contained' color='primary' onClick={handleDelete}>
          Delete
        </Button>
      </div>
    );
  };

  const handleDialogOpen = () => this.setState({ open: true });

  const handleDialogClose = () => {
    setDeleteOpen(false);
    setEditOpen(false);
  };

  const renderDialogContent = () => {
    return (
      <>
        <DialogTitle id='simple-dialog-title'>Modify User Info</DialogTitle>
        <Button>Edit Information</Button>
        <Typography>Email: {debouncedUser.email}</Typography>
        <form>
          <input value={debouncedUser.email} type='text' />
        </form>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setDeleteOpen(true)}>
          Delete User
        </Button>
      </>
    );
  };

  const renderAdminIcon = () => {
    if (user.customClaims && user.customClaims.administrator) {
      return (
        <ListItemIcon>
          <SupervisorAccountSharpIcon color='primary' />
        </ListItemIcon>
      );
    }
  };

  const renderAdminActions = () => {
    // Prevents current user from changing their own information in the manage users tab
    if (user.uid === props.currentUser.uid) {
      return null;
    }
    return (
      <>
        <IconButton onClick={handleDialogOpen}>
          <EditIcon color='primary' />
        </IconButton>
        {renderVerified()}
      </>
    );
  };

  const renderVerified = () => {
    if (user.emailVerified) {
      return <VerifiedUserIcon />;
    }
    return (
      <Button variant='contained' color='primary'>
        Verify Email
      </Button>
    );
  };

  const renderDialogs = () => {
    return (
      <>
        <CustomDialog open={editOpen} onClose={handleDialogClose}>
          {renderDialogContent()}
        </CustomDialog>
        <CustomDialog open={deleteOpen} onClose={handleDialogClose}>
          {renderDeleteUser()}
        </CustomDialog>
      </>
    );
  };

  const isInset = !(user.customClaims && user.customClaims.administrator);

  return (
    <>
      {renderDialogs()}
      {renderAdminIcon()}

      <ListItemText disableTypography inset={isInset}>
        <Typography>{user.email}</Typography>
        <Typography noWrap={false} variant='caption'>
          Company Name
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>{renderAdminActions()}</ListItemSecondaryAction>
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, { deleteUser })(UserDetail);
