import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Button,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import LabeledCheckbox from "../Forms/LabeledCheckbox";

import { editUser } from "../../actions";

const UserEdit = ({
  handleClick,
  handleSubmit,
  pristine,
  submitting,
  editUser,
}) => {
  const renderTextField = ({
    label,
    input,
    type,
    meta: { touched, error },
    ...custom
  }) => {
    const helperText = error && touched ? error : "";
    const showError = touched && error ? true : false;

    return (
      <TextField
        autoFocus={false}
        label={label}
        type={type}
        error={showError}
        helperText={helperText}
        style={{ width: "35ch" }}
        InputProps={{ ...input }}
        {...custom}
      />
    );
  };

  const renderCheckbox = ({ label, input }) => {
    return (
      <LabeledCheckbox
        checked={input.value ? true : false}
        label={label}
        handleChange={input.onChange}
      />
    );
  };

  const onSubmit = ({
    administrator,
    organization,
    uid,
    email,
    emailVerified,
    displayName,
    phoneNumber,
    disabled,
  }) => {
    const user = {
      customClaims: {
        administrator,
        organization,
      },
      uid,
      email,
      emailVerified,
      displayName,
      phoneNumber,
      disabled,
    };
    editUser(user);
  };

  return (
    <>
      <DialogTitle id='simple-dialog-title'>Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit this user's information</DialogContentText>
      </DialogContent>
      <DialogActions>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <div>
            <Field
              name='displayName'
              component={renderTextField}
              label='Display Name'
            />
          </div>

          <div>
            <Field name='email' component={renderTextField} label='Email' />
          </div>
          <div>
            <Field
              name='organization'
              component={renderTextField}
              label='Organization'
            />
          </div>
          <div>
            <Field
              name='phoneNumber'
              component={renderTextField}
              label='Phone'
            />
          </div>
          <div>
            <Field
              name='administrator'
              component={renderCheckbox}
              label='Administrator'
            />
          </div>

          <div>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={pristine || submitting}
              onClick={handleClick}>
              Update Credentials
            </Button>
          </div>
        </form>
      </DialogActions>
    </>
  );
};

const mapStateToProps = (state, { user }) => {
  const { customClaims } = user;
  const administrator = customClaims ? customClaims.administrator : null;
  const organization = customClaims ? customClaims.organization : null;

  return {
    initialValues: {
      administrator,
      organization,
      ...user,
    },
  };
};

const validate = () => {};

const wrappedForm = reduxForm({
  form: "updateUserForm",
  validate,
  enableReinitialize: true,
})(UserEdit);

export default connect(mapStateToProps, { editUser })(wrappedForm);
