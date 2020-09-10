import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Button,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";

const UserEdit = ({
  handleSubmit,
  pristine,
  submitting,
  user,
  handleClick,
}) => {
  const renderTextField = ({
    label,
    input,
    type,
    meta: { touched, error },
  }) => {
    const helperText = error && touched ? error : "";
    const showError = touched && error ? true : false;

    return (
      <TextField
        label={label}
        type={type}
        error={showError}
        helperText={helperText}
        style={{ width: "35ch" }}
        {...input}
      />
    );
  };

  return (
    <>
      <DialogTitle id='simple-dialog-title'>Modify User Info</DialogTitle>
      <DialogContent>
        <Button>Edit Information</Button>
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name='email'
              component={renderTextField}
              label='Email'
              value={user.email}
            />
          </div>
          <div>
            <Field
              name='password'
              type='password'
              component={renderTextField}
              label='Password'
            />
          </div>
          <div>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={pristine || submitting}>
              Update Credentials
            </Button>
          </div>
        </form>
        <Button color='primary' variant='contained' onClick={handleClick}>
          Delete User
        </Button>
      </DialogContent>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { initialValues: ownProps.user };
};

const validate = () => {};

const wrappedForm = reduxForm({
  form: "updateUserForm",
  validate,
  enableReinitialize: true,
})(UserEdit);

export default connect(mapStateToProps)(wrappedForm);
