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
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

import CustomDialog from "../CustomDialog";
import LabeledCheckbox from "../Forms/LabeledCheckbox";

import { deleteUser, selectUsers, deselectUsers } from "../../actions";
import UserEdit from "./UserEdit";

const UserDetail = ({
  deleteUser,
  selectUsers,
  deselectUsers,
  user,
  currentUser,
  allChecked,
}) => {
  const [editOpen, setEditOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    allChecked ? setChecked(true) : setChecked(false);
  }, [allChecked]);

  const handleDialogClose = () => {
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
    if (user.uid === currentUser.uid) {
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

  const renderDialogs = () => {
    return (
      <>
        <CustomDialog open={editOpen} onClose={handleDialogClose}>
          <UserEdit user={user} handleClick={() => setEditOpen(!editOpen)} />
        </CustomDialog>
      </>
    );
  };

  const isInset = !(user.customClaims && user.customClaims.administrator);
  const org = user.customClaims
    ? user.customClaims.organization
    : "Unaffiliated";
  return (
    <>
      {renderDialogs()}
      {renderAdminIcon()}

      <ListItemText disableTypography inset={isInset}>
        <Typography>{user.displayName || user.email}</Typography>
        <Typography noWrap={false} variant='caption'>
          {org || "Unaffiliated"}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        {renderAdminActions()}
        <LabeledCheckbox
          checked={checked}
          handleChange={() => {
            setChecked(!checked);
            if (!checked) {
              selectUsers(user);
            } else {
              deselectUsers(user);
            }
          }}
        />
      </ListItemSecondaryAction>
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, {
  deleteUser,
  selectUsers,
  deselectUsers,
})(UserDetail);
