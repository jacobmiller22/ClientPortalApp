import React from "react";

import { reduxForm, Field } from "redux-form";

import { Button, Typography, TextField } from "@material-ui/core";

class SignUp extends React.Component {
  onSubmit = (values) => {
    // const { email, password } = values;
    // props.signUserIn(email, password);
    // createnewUser action
    console.log("New user is:", values);
  };

  renderAdmin() {
    if (this.props.admin) {
      return <Typography>Privileges</Typography>;
    }
  }

  renderForm() {
    return (
      <form
        onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
        <Typography>Email</Typography>
        <Field
          name="email"
          type="text"
          component={() => (
            <TextField id="filled-basic" variant="filled" label="Email" />
          )}
          placeholder="Email"></Field>

        <br />

        <Typography>Password</Typography>
        <Field
          name="password"
          type="password"
          component={() => (
            <TextField id="filled-basic" variant="filled" label="Email" />
          )}
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

export default reduxForm({ form: "signUpForm" })(SignUp);
