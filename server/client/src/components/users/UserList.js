import React from "react";
import { connect } from "react-redux";

import { Typography, List, ListItem } from "@material-ui/core";

import UserDetail from "./UserDetail";
import LoadMessage from "../Loading/LoadMessage";

import { fetchUsers } from "../../actions";

class UserList extends React.Component {
  componentDidMount() {
    // Make request for Users
    // Fetch Users
    this.props.fetchUsers(100);
  }

  renderUserList = () => {
    const { users } = this.props;

    if (!users) {
      return <LoadMessage message={"Loading users"} />;
    }

    return users.map((user) => {
      return (
        <ListItem autoFocus button key={user.email}>
          <UserDetail user={user} />
        </ListItem>
      );
    });
  };

  render() {
    return (
      <div>
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
