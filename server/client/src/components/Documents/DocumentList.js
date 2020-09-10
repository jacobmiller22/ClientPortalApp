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
  FormGroup,
  ListSubheader,
} from "@material-ui/core";
import "../styling/Center.css";
import { makeStyles } from "@material-ui/core/styles";

import DocumentDetail from "./DocumentDetail";
import LoadMessage from "../Loading/LoadMessage";
import LabeledCheckbox from "../Forms/LabeledCheckbox";

import { fetchDocuments } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  list: {
    width: "100%",
  },
}));

const DocumentList = ({ fetchDocuments, path, documents, title }) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    fetchDocuments({ path, n: itemsPerPage });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, title]);

  const onNextPageClick = () => {
    fetchDocuments({
      path,
      n: itemsPerPage,
      nextPageToken: documents.nextPageToken,
    });
    setPage(page + 1);
  };

  const onPreviousPageClick = () => {
    fetchDocuments({
      path,
      n: itemsPerPage,
      currPageNum: page,
    });
    setPage(page - 1);
  };

  const renderPages = () => {
    if (documents.nextPageToken) {
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

    if (!documents.items) {
      return;
    }
    const numResultsDisplay = `${documents.items.length} results`;

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
    if (!documents) {
      return <div>No documents</div>;
    }
    const { items } = documents;

    if (!items) {
      return (
        <div>
          <LoadMessage color='primary' message='Loading files' />
        </div>
      );
    }

    return items.map((doc) => {
      return (
        <ListItem dense={dense} divider key={doc.fullPath}>
          <DocumentDetail doc={doc} />
        </ListItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {renderPages()}
        <FormGroup row>
          <ListSubheader>{title}</ListSubheader>
          <LabeledCheckbox
            label='Dense'
            checked={dense}
            handleChange={() => setDense(!dense)}
          />
          {renderList()}
        </FormGroup>

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
