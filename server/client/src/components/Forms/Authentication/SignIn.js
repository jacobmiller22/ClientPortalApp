import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, TextField } from "@material-ui/core";

import { signUserIn, signUserOut } from "../../../actions";

const SignIn = (props) => {
  const onSubmit = (values) => {
    const { email, password } = values;
    console.log(values);
    props.signUserIn(email, password);
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
    return (
      <form onSubmit={props.handleSubmit((values) => onSubmit(values))}>
        <Field name='email' type='text' component='input' placeholder='Email' />
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
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state) => {
  return { currentUser: state.auth.currentUser };
};

const wrappedForm = reduxForm({
  form: "loginForm",
})(SignIn);

export default connect(mapStateToProps, { signUserIn, signUserOut })(
  wrappedForm
);
