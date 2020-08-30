import React from "react";
import { connect } from "react-redux";

import { Typography, Toolbar, Button, DialogTitle } from "@material-ui/core";

import UserList from "./UserList";
import LoadMessage from "../Loading/LoadMessage";
import CustomDialog from "../CustomDialog";
import SignUp from "../Forms/Authentication/SignUp";

class UserManager extends React.Component {
  state = {
    openNewUserForm: false,
  };

  handleClickNewUser = () => {
    this.setState({ openNewUserForm: true });
  };

  handleDialogClose = () => {
    this.setState({
      openNewUserForm: false,
    });
  };

  renderOptions() {
    return (
      <Toolbar style={{ backgroundColor: "#f6f7f7" }}>
        <Button color="primary" onClick={this.handleClickNewUser}>
          Create new User
        </Button>
      </Toolbar>
    );
  }

  renderUserList() {
    const { currentUser, permissions } = this.props.auth;

    if (!currentUser) {
      return <LoadMessage message="Please sign in" color="primary" />;
    }
    if (!permissions.administrator) {
      // User is not authorized to view user list
      return (
        <Typography color="error">
          You are not authorized to view this page!
        </Typography>
      );
    }

    return <UserList />;
  }

  render() {
    return (
      <div>
        <CustomDialog
          open={this.state.openNewUserForm}
          onClose={this.handleDialogClose}>
          <DialogTitle>Create a User!</DialogTitle>
          <SignUp header=" " admin />
        </CustomDialog>
        {this.renderOptions()}
        {this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserManager);
