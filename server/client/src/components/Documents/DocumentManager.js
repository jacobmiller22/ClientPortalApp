import React from "react";
import { connect } from "react-redux";
import DocumentList from "./DocumentList";

class DocumentManager extends React.Component {
  renderFileList() {
    if (!this.props.currentUser) {
      return <div> Loading...</div>;
    }

    return <DocumentList />;
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
