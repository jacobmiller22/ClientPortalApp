import React, { useEffect, useState } from "react";
import { ReactDom } from "react-dom";
import { withFirebase } from "react-redux-firebase";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

import { blue } from "@material-ui/core/colors";
import {
  Typography,
  Button,
  InputLabel,
  FormHelperText,
  IconButton,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const UserDialogue = (props) => {
  // State
  const [state, setState] = React.useState({
    permissions: "",
  });

  useEffect(() => {
    return () => {
      console.log(
        "Behavior right before the component is removed from the DOM."
      );
    };
  }, []);

  const classes = useStyles();

  // Permissions
  const renderPermissionSelector = (user) => {
    // On Change, affect State
    const handleChange = (event) => {
      const name = event.target.name;

      console.log(event.target.value);
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    return (
      <FormControl
        style={{ display: "inline-flex" }}
        variant='outlined'
        className={classes.formControl}>
        <InputLabel htmlFor='permissions-selector'>Permissions</InputLabel>
        <Select
          onChange={handleChange}
          value={state.permissions}
          native
          label='Permissions'
          inputProps={{
            name: "permissions",
            id: "permissions-selector",
          }}
          value={state.permissions}>
          <option aria-label='None' value='' />
          <option value='Client'>Client</option>
          <option value='Administrator'>Administrator</option>
        </Select>
      </FormControl>
    );
  };

  const { onClose, selectedValue, open, user } = props;

  const handleClose = () => {
    onClose();
    console.log(selectedValue);
  };

  const handleSaveChanges = () => {
    console.log(state);
    onClose(state.permissions);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}>
        <DialogTitle id='simple-dialog-title'>Modify User Info</DialogTitle>
        <Typography>Username: {user.email}</Typography>
        {renderPermissionSelector(user)}
        <Button
          className={classes.formControl}
          variant='contained'
          color='primary'
          onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Dialog>
    </div>
  );
};

UserDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  //selectedValue: PropTypes.string.isRequired,
};

export default withFirebase(UserDialogue);
