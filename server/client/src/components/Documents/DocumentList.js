import React from "react";
import { connect } from "react-redux";
import { fetchDocuments } from "../../actions";

import _ from "lodash";

import { Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DocumentDetail from "./DocumentDetail";

class DocumentList extends React.Component {
  componentDidMount() {
    this.props.fetchDocuments(100);
  }

  renderList() {
    return this.props.documents.map((doc) => {
      return (
        <ListItem key={doc.fullPath}>
          <DocumentDetail doc={doc} />
        </ListItem>
      );
    });
  }

  render() {
    return (
      <div>
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
