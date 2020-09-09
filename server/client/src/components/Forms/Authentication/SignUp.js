import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, Typography, TextField } from "@material-ui/core";

import validateEmails from "../../../utils/validateEmails";

import { createUser } from "../../../actions";

const SignUp = (props) => {
  const onSubmit = (values) => {
    // const { email, password } = values;
    // props.signUserIn(email, password);
    // createnewUser action
    console.log("New user is:", values);
    console.log(props);
    props.createUser(values);
  };

  const renderAdmin = () => {
    if (props.admin) {
      return <Typography>Privileges</Typography>;
    }
  };
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

  const renderForm = () => {
    return (
      <form onSubmit={props.handleSubmit((values) => onSubmit(values))}>
        <div>
          <Field
            name='firstName'
            component={renderTextField}
            label='First Name'
          />
        </div>
        <div>
          <Field
            name='lastName'
            component={renderTextField}
            label='Last name'
          />
        </div>
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

        <br />

        {renderAdmin()}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{ margin: 5 }}>
          Create
        </Button>
      </form>
    );
  };

  const { header } = props;

  return (
    <div>
      <Typography>{header || "Sign in!"}</Typography>
      {renderForm()}
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  const required = ["firstName", "lastName", "email", "password"];

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

const wrappedForm = reduxForm({ form: "signUpForm", validate })(SignUp);

export default connect(null, { createUser })(wrappedForm);
