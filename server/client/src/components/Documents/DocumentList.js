import React from "react";
import { connect } from "react-redux";
import { fetchDocuments } from "../../actions";

import _ from "lodash";

import { Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DocumentDetail from "./DocumentDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

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
      <List style={{ justifyContent: "center" }}>
        <Typography variant="h5">Files on record</Typography>
        {this.renderList()}
      </List>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps, { fetchDocuments })(DocumentList);
