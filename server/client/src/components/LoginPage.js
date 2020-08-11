import React, { useState } from "react";
// UI
import { Button } from "@material-ui/core";

// Redux
import { reduxForm, Field } from "redux-form";
import { useSelector, connect } from "react-redux";

import { signUserIn, signUserOut } from "../actions";

const LoginPage = (props) => {
  const onSubmit = (values) => {
    const { email, password } = values;
    props.signUserIn(email, password);
  };

  const renderContent = () => {
    if (props.auth) {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={() => props.signUserOut()}>
          logout
        </Button>
      );
    }
    return (
      <form onSubmit={props.handleSubmit((values) => onSubmit(values))}>
        <Field name="email" type="text" component="input" placeholder="Email" />
        <Field
          name="password"
          type="password"
          component="input"
          placeholder="Password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 5 }}>
          Login
        </Button>
      </form>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {renderContent()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const wrappedForm = reduxForm({
  form: "loginForm",
})(LoginPage);

export default connect(mapStateToProps, { signUserIn, signUserOut })(
  wrappedForm
);
