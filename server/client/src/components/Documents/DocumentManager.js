import React from "react";
import { connect } from "react-redux";

import { Toolbar, Button } from "@material-ui/core";

import "../styling/Center.css";

import DocumentList from "./DocumentList";
import LoadMessage from "../Loading/LoadMessage";

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
        <Button color='primary' variant='outlined'>
          Contact Us!
        </Button>
        <Button color='primary' variant='outlined'>
          Contact Us!
        </Button>
        <Button color='primary' variant='outlined'>
          Contact Us!
        </Button>
      </Toolbar>
    );
  }

  renderFileList() {
    if (!this.props.currentUser) {
      return (
        <div className='centered'>
          <LoadMessage color='primary' message='Signing in...' />
        </div>
      );
    }

    return <DocumentList title='Uploaded by me' />;
  }

  render() {
    return (
      <div>
        {this.renderOptions()}
        {this.renderFileList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(DocumentManager);
