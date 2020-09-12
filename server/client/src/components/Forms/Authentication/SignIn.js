import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, TextField, Container } from "@material-ui/core";

import validateEmails from "../../../utils/validateEmails";

import { signUserIn, signUserOut } from "../../../actions";

import history from "../../../history";

const SignIn = (props) => {
  const onSubmit = (values) => {
    const { email, password } = values;
    props.signUserIn(email, password);
    history.push("/");
  };

  const renderContent = () => {
    if (props.auth) {
      return (
        <Button
          color='primary'
          variant='contained'
          onClick={() => props.signUserOut()}>
          logout
        </Button>
      );
    }

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
          {...input}
          style={{ width: "35ch" }}
        />
      );
    };

    const { handleSubmit, pristine, submitting } = props;

    return (
      <Container>
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <div>
            <Field name='email' component={renderTextField} label='Email' />
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
              disabled={pristine || submitting}
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: 5 }}>
              Sign in
            </Button>
          </div>
        </form>
      </Container>
    );
  };

  return <div>{renderContent()}</div>;
};

const validate = (values) => {
  const errors = {};
  const required = ["email", "password"];

  required.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.email) {
    errors.email = validateEmails(values.email);
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { currentUser: state.auth.currentUser };
};

const wrappedForm = reduxForm({
  form: "loginForm",
  validate,
})(SignIn);

export default connect(mapStateToProps, { signUserIn, signUserOut })(
  wrappedForm
);
