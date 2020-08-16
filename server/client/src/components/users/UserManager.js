import React from "react";
import { connect } from "react-redux";

import UserList from "./UserList";

class UserManager extends React.Component {
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
  return { currentUser: state.auth };
};

export default connect(mapStateToProps)(UserManager);
