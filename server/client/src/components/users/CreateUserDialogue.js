import React from "react";
import { withFirebase } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../actions";

import validateEmails from "../../utils/validateEmails";
import validatePhoneNumbers from "../../utils/validatePhoneNumbers";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Dialog, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const CreateUserDialogue = (props) => {
  // State
  // const [state, setState] = React.useState({});

  const classes = useStyles();

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
    //console.log(selectedValue);
  };

  const handleSaveChanges = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}>
        <DialogTitle id='simple-dialog-title'>Modify User Info</DialogTitle>
        <form
          onSubmit={props.handleSubmit((values) => {
            console.log(props);
            console.log(values);
            props.createUser(props.firebase, values);
            handleSaveChanges();
          })}>
          <div>
            <label>First Name:</label>
            <Field
              placeholder='First Name'
              type='text'
              name='firstName'
              component='input'
            />
          </div>
          <div>
            <label>Last Name:</label>
            <Field
              placeholder='Last Name'
              type='text'
              name='lastName'
              component='input'
            />
          </div>
          <div>
            <label>Email:</label>
            <Field
              placeholder='Email'
              type='text'
              name='email'
              component='input'
            />
          </div>
          <div>
            <label>Password:</label>
            <Field
              placeholder='Password'
              type='password'
              name='password'
              component='input'
            />
          </div>
          <div>
            <label>Phone:</label>
            <Field
              placeholder='Phone'
              type='text'
              name='phone'
              component='input'
            />
          </div>
          <div>
            <Button
              className={classes.formControl}
              variant='contained'
              color='primary'
              type='submit'>
              Create User
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

CreateUserDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  //selectedValue: PropTypes.string.isRequired,
};

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || "");

  errors.phone = validatePhoneNumbers(values.phone || "");

  /* This is run by each redux form Field, so there will be an error regardless of 
  the input. Fix this to iterate over array of field inputs*/
  if (!values.firstName) {
    errors.firstName = "You must provide a first name!";
  }
  if (!values.lastName) {
    errors.lastName = "You must provide a last name!";
  }
  if (!values.email) {
    errors.email = "You must provide an email!";
  }
  if (!values.phone) {
    errors.phone = "You must provide a phone number!";
  }
  if (!values.password) {
    errors.password = "You must provide a password";
  }

  return errors;
}

function getFormFromState(values) {
  console.log("fsdfsd");
}

export default reduxForm({
  // getFormFromState: (state) => state.createUser.createUserForm,
  validate,
  form: "new_user",
})(connect(null, actions)(withFirebase(CreateUserDialogue)));
