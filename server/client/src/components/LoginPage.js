import React from "react";

// UI
import { Button } from "@material-ui/core";

// Redux
import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";

function LoginPage(props) {
  const renderContent = function (props, auth) {
    if (isLoaded(auth) && !isEmpty(auth)) {
      return (
        <Button
          color='primary'
          variant='contained'
          onClick={() => props.firebase.logout()}>
          logout
        </Button>
      );
    } else {
      return (
        <form
          onSubmit={props.handleSubmit((values) => {
            props.firebase.login({
              email: values.email,
              password: values.password,
            });
          })}>
          <Field
            name='email'
            type='text'
            component='input'
            placeholder='Email'
          />
          <Field
            name='password'
            type='password'
            component='input'
            placeholder='Password'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ margin: 5 }}>
            Login
          </Button>
        </form>
      );
    }
  };
  const auth = useSelector((state) => state.firebase.auth);

  return <div>{renderContent(props, auth)}</div>;
}

export default reduxForm({
  form: "loginForm",
})(withFirebase(LoginPage));
