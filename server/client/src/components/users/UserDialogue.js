import React, { useEffect } from "react";

import { withFirebase } from "react-redux-firebase";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Button,
  InputLabel,
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
          }}>
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

    console.log(user);
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
        <Typography>Display Name: {user.displayName} </Typography>
        <Typography>Password: </Typography>

        <Typography>Email: {user.email}</Typography>

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
