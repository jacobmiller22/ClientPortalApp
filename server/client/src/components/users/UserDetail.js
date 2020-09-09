import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Typography,
  IconButton,
  Button,
  DialogTitle,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

import CustomDialog from "../CustomDialog";

import { deleteUser } from "../../actions";
import UserEdit from "./UserEdit";

const UserDetail = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { user } = props;

  const handleDelete = () => {
    setDeleteOpen(false);
    props.deleteUser(user.uid);
  };

  const renderDeleteUser = () => {
    return (
      <>
        <DialogTitle>{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This user's information
            will not be recoverable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </>
    );
  };

  const handleDialogClose = () => {
    setDeleteOpen(false);
    setEditOpen(false);
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
        <IconButton onClick={() => setEditOpen(true)}>
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

  const handleDeleteOpen = () => setDeleteOpen(true);

  const renderDialogs = () => {
    return (
      <>
        <CustomDialog open={editOpen} onClose={handleDialogClose}>
          <UserEdit user={user} handleClick={handleDeleteOpen} />
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
