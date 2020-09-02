import React from "react";
import { connect } from "react-redux";

import { List, ListItem, Typography, Button } from "@material-ui/core";
import "../styling/Center.css";

import DocumentDetail from "./DocumentDetail";
import LoadMessage from "../Loading/LoadMessage";

import { fetchDocuments } from "../../actions";

class DocumentList extends React.Component {
  state = { page: 1 };

  componentDidMount() {
    this.props.fetchDocuments({ n: 5 });
  }

  onNextPageClick = () => {
    console.log(this.state);
    this.props.fetchDocuments({
      n: 5,
      nextPageToken: this.props.documents.nextPageToken,
    });
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  onPreviousPageClick = () => {
    this.props.fetchDocuments({
      n: 5,
      currPageNum: this.state.page,
    });
    const newPage = this.state.page - 1;
    this.setState({ page: newPage });
  };

  renderPages = () => {
    if (this.props.documents.nextPageToken) {
      var isNextDisabled = false;
    } else {
      var isNextDisabled = true;
    }

    const renderPageButtons = () => {
      return this.state.pages.map((page) => {
        return (
          <Button variant='contained' color='primary'>
            {page}
          </Button>
        );
      });
    };

    return (
      <>
        <Button
          variant='contained'
          color='primary'
          disabled={this.state.page === 1}
          onClick={this.onPreviousPageClick}>
          Previous
        </Button>
        <Typography variant='h5' display='inline' color='primary'>
          {this.state.page}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          disabled={isNextDisabled}
          onClick={this.onNextPageClick}>
          Next
        </Button>
      </>
    );
  };

  renderList = () => {
    if (!this.props.documents) {
      return <div>No documents</div>;
    }
    const { items } = this.props.documents;
    console.log(this.props.documents);
    if (!items) {
      return (
        <div>
          <LoadMessage color='primary' message='Loading files' />
        </div>
      );
    }

    return items.map((doc) => {
      return (
        <ListItem key={doc.fullPath}>
          <DocumentDetail doc={doc} />
        </ListItem>
      );
    });
  };

  render() {
    return (
      <div className='centered'>
        <List>
          <Typography variant='h5'>Files on record</Typography>
          {this.renderPages()}
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
