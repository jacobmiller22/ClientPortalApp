import React from "react";
import { connect } from "react-redux";

import UserList from "./UserList";

import { fetchUsers } from "../../actions";

class UserManager extends React.Component {
  componentDidMount() {
    // Make request for Users
    // Fetch Users
  }

  renderUserList() {
    if (!this.props.currentUser) {
      return <div> Loading...</div>;
    }

    return <UserList />;
  }

  render() {
    return <div>{this.renderUserList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserManager);
