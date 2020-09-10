import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import LoadMessage from "../../Loading/LoadMessage";

import { signUserIn, signUserOut } from "../../../actions";

import history from "../../../history";

const SignInOut = (props) => {
  if (!props.auth) {
    return <LoadMessage message=' ' />;
  }
  if (!props.auth.currentUser) {
    return (
      <Button
        color='primary'
        variant='contained'
        to='/auth'
        component={Link}
        onClick={props.onClick}>
        Sign in
      </Button>
    );
  }
  return (
    <Button
      color='primary'
      variant='outlined'
      onClick={() => {
        props.signUserOut();
        history.push("/auth");
      }}>
      Sign out
    </Button>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { signUserIn, signUserOut })(SignInOut);
