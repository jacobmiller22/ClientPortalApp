import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

class LoginPage extends Component {
  renderContent() {
    switch (this.props.authFirebase) {
      case false:
        return <p>Something went wrong...</p>;
      case null:
        return (
          <form
            onSubmit={this.props.handleSubmit((values) => {
              this.props.loginWithFirebaseAuth(values);
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
      default:
        return (
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              console.log("attempting to logout");
              this.props.logout();
            }}>
            logout
          </Button>
        );
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ authFirebase }) {
  return { authFirebase };
}

export default reduxForm({
  form: "loginForm",
})(connect(mapStateToProps, actions)(LoginPage));
