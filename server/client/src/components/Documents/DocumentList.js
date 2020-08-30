import React from "react";
import { connect } from "react-redux";

import { List, ListItem, Typography } from "@material-ui/core";
import "../styling/Center.css";

import DocumentDetail from "./DocumentDetail";
import LoadMessage from "../Loading/LoadMessage";

import { fetchDocuments } from "../../actions";

class DocumentList extends React.Component {
  componentDidMount() {
    this.props.fetchDocuments(100);
    console.log("Fetching documents!");
  }

  renderList() {
    const { documents } = this.props;
    console.log(documents);
    if (!documents.length) {
      return (
        <div>
          <LoadMessage color="primary" message="Loading files" />
        </div>
      );
    }

    return documents.map((doc) => {
      return (
        <ListItem key={doc.fullPath}>
          <DocumentDetail doc={doc} />
        </ListItem>
      );
    });
  }

  render() {
    return (
      <div className="centered">
        <List>
          <Typography variant="h5">Files on record</Typography>
          {this.renderList()}
        </List>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps, { fetchDocuments })(DocumentList);
