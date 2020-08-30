import React from "react";
import { connect } from "react-redux";

import { Typography, IconButton, Button, DialogTitle } from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

import CustomDialog from "../CustomDialog";

class UserDetail extends React.Component {
  state = {
    open: false,
    user: {
      email: "",
    },
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      user: {
        email: user.email,
      },
    });
  }

  handleDialogOpen = () => this.setState({ open: true });

  handleDialogClose = () => this.setState({ open: false });

  renderDialogContent = () => {
    const { user } = this.state;

    return (
      <>
        <DialogTitle id="simple-dialog-title">Modify User Info</DialogTitle>
        <Button>Edit Information</Button>
        <Typography>Email: {user.email}</Typography>
        <form>
          <input value={this.state.email} type="text" />
        </form>
      </>
    );
  };

  renderAdminIcon() {
    const { user } = this.props;
    if (user.customClaims && user.customClaims.administrator) {
      return <SupervisorAccountSharpIcon color="primary" />;
    }
  }

  renderAdminActions() {
    const { user } = this.props;

    // Prevents current user from changing their own information in the manage users tab
    if (user.uid === this.props.currentUser.uid) {
      return null;
    }
    return (
      <IconButton onClick={this.handleDialogOpen}>
        <EditIcon color="primary" />
      </IconButton>
    );
  }

  renderVerified() {
    const { user } = this.props;

    if (user.emailVerified) {
      return <VerifiedUserIcon />;
    }
    return (
      <Button variant="contained" color="primary">
        Verify Email
      </Button>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <>
        <CustomDialog open={this.state.open} onClose={this.handleDialogClose}>
          {this.renderDialogContent()}
        </CustomDialog>

        {this.renderAdminIcon()}
        <Typography display="inline">{user.email}</Typography>
        {this.renderAdminActions()}
        {this.renderVerified()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps)(UserDetail);
