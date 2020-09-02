import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, Typography, TextField } from "@material-ui/core";

import { createUser } from "../../../actions";

class SignUp extends React.Component {
  onSubmit = (values) => {
    // const { email, password } = values;
    // props.signUserIn(email, password);
    // createnewUser action
    console.log("New user is:", values);
    console.log(this.props);
    this.props.createUser(values);
  };

  renderAdmin() {
    if (this.props.admin) {
      return <Typography>Privileges</Typography>;
    }
  }

  // () => (
  //   <TextField id="filled-basic" variant="filled" label="Email" />
  // )

  renderForm() {
    return (
      <form
        onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
        <Typography>Email</Typography>
        <Field
          name="email"
          type="text"
          component="input"
          placeholder="Email"></Field>

        <br />

        <Typography>Password</Typography>
        <Field
          name="password"
          type="password"
          component="input"
          placeholder="Password"
        />

        <br />

        {this.renderAdmin()}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 5 }}>
          Create
        </Button>
      </form>
    );
  }

  render() {
    const { header } = this.props;

    return (
      <div>
        <Typography>{header || "Sign in!"}</Typography>
        {this.renderForm()}
      </div>
    );
  }
}

const wrappedForm = reduxForm({ form: "signUpForm" })(SignUp);

export default connect(null, { createUser })(wrappedForm);
