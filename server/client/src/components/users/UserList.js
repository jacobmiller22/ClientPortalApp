import React from "react";
import { connect } from "react-redux";

import {
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

import { fetchUsers } from "../../actions";

class UserList extends React.Component {
  state = { open: false };

  componentDidMount() {
    // Make request for Users
    // Fetch Users
    this.props.fetchUsers(100);
  }

  renderAdminIcon(user) {
    if (user.customClaims && user.customClaims.administrator) {
      return <SupervisorAccountSharpIcon color="primary" />;
    }
  }

  handleDialogOpen = () => this.setState({ open: true });

  handleDialogClose = () => this.setState({ open: false });

  renderDialogContent() {
    return (
      <>
        <DialogTitle id="simple-dialog-title">Modify User Info</DialogTitle>
      </>
    );
  }

  renderVerified(user) {
    if (user.emailVerified) {
      return <VerifiedUserIcon />;
    }
    return (
      <Button variant="contained" color="primary">
        Verify Email
      </Button>
    );
  }

  renderAdminActions(user) {
    if (user.customClaims && user.customClaims.administrator) {
      return (
        <IconButton onClick={this.handleModalOpen}>
          <EditIcon color="primary" />
        </IconButton>
      );
    }
  }

  renderUserList = () => {
    return this.props.users.map((user) => {
      return (
        <ListItem key={user.email}>
          {this.renderAdminIcon(user)}
          <Typography display="inline">{user.email}</Typography>
          {this.renderAdminActions(user)}
          {this.renderVerified(user)}
        </ListItem>
      );
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.handleModalClose}>
          {this.renderDialogContent()}
        </Dialog>

        <List>
          <Typography variant="h5">Users on record</Typography>

          {this.renderUserList()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
