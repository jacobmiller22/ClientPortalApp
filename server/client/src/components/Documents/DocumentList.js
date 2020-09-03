import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  List,
  ListItem,
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import "../styling/Center.css";

import DocumentDetail from "./DocumentDetail";
import LoadMessage from "../Loading/LoadMessage";

import { fetchDocuments } from "../../actions";

const DocumentList = (props) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    props.fetchDocuments({ n: itemsPerPage });
  }, [itemsPerPage]);

  const onNextPageClick = () => {
    props.fetchDocuments({
      n: itemsPerPage,
      nextPageToken: props.documents.nextPageToken,
    });
    setPage(page + 1);
  };

  const onPreviousPageClick = () => {
    props.fetchDocuments({
      n: itemsPerPage,
      currPageNum: page,
    });
    setPage(page - 1);
  };

  const renderPages = () => {
    if (props.documents.nextPageToken) {
      var isNextDisabled = false;
    } else {
      isNextDisabled = true;
    }

    const renderPageButtons = () => {
      const pageNumberDisplay = `Page ${page}`;
      return (
        <>
          <Button variant='outlined' color='primary'>
            {pageNumberDisplay}
          </Button>
        </>
      );
    };

    if (!props.documents.items) {
      return;
    }
    const numResultsDisplay = `${props.documents.items.length} results`;

    return (
      <>
        <Typography>{numResultsDisplay}</Typography>
        <Button
          variant='contained'
          color='primary'
          disabled={page === 1}
          onClick={onPreviousPageClick}>
          Prev
        </Button>
        {renderPageButtons()}
        <Button
          variant='contained'
          color='primary'
          disabled={isNextDisabled}
          onClick={onNextPageClick}>
          Next
        </Button>
      </>
    );
  };

  const renderResultsPerPage = () => {
    const handleChange = (e) => {
      setItemsPerPage(e.target.value);
    };

    return (
      <FormControl variant='outlined' style={{ minWidth: 120 }}>
        <InputLabel>Results per page</InputLabel>
        <Select
          onChange={handleChange}
          value={itemsPerPage}
          label='Results per page'>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderList = () => {
    if (!props.documents) {
      return <div>No documents</div>;
    }
    const { items } = props.documents;

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

  return (
    <div className='centered'>
      <List>
        <Typography variant='h5'>{props.title}</Typography>
        {renderPages()}
        {renderList()}
        {renderResultsPerPage()}
      </List>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps, { fetchDocuments })(DocumentList);
