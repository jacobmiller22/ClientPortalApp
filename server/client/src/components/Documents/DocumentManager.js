import React from "react";
import { connect } from "react-redux";

import { AppBar, Toolbar, Button } from "@material-ui/core";

import DocumentList from "./DocumentList";

class DocumentManager extends React.Component {
  /**
   * Displays options in the subheader containing multiple administrator actions.
   * These actions include:
   *  - User Selector
   *  -
   */
  renderAdmin() {
    return <div>Admin</div>;
  }

  renderOptions() {
    return (
      <Toolbar style={{ backgroundColor: "#f6f7f7" }}>
        <Button color="primary">Contact Us!</Button>
        <Button color="primary">Contact Us!</Button>
        <Button color="primary">Contact Us!</Button>
      </Toolbar>
    );
  }

  renderFileList() {
    if (!this.props.currentUser) {
      return <div> Loading...</div>;
    }

    return (
      <div>
        {this.renderOptions()}
        <DocumentList />
      </div>
    );
  }

  render() {
    return <div>{this.renderFileList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth,
  };
};

export default connect(mapStateToProps)(DocumentManager);
