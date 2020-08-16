import React from "react";
import { connect } from "react-redux";

import { Typography, List, ListItem } from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";

import { fetchUsers } from "../../actions";

class UserList extends React.Component {
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

  renderUserList = () => {
    return this.props.users.map((user) => {
      return (
        <ListItem key={user.email}>
          {this.renderAdminIcon(user)}
          <Typography display="inline">{user.email}</Typography>
        </ListItem>
      );
    });
  };

  render() {
    return (
      <List>
        <Typography variant="h5">Users on record</Typography>
        {this.renderUserList()}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
