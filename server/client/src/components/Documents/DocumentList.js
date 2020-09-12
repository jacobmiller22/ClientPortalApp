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
import TokenPagination from "../Util/TokenPagination";

import _ from "lodash";

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

const DocumentList = ({
  fetchDocuments,
  path,
  documents,
  title,
  auth: { currentUser },
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    fetchDocuments({ path, n: itemsPerPage });
  }, [itemsPerPage, title, currentUser, fetchDocuments, path]);

  if (_.isEmpty(documents)) {
    return null;
  }

  const renderResultsPerPage = () => {
    const handleChange = (e) => {
      setItemsPerPage(e.target.value);
      setPage(1);
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

  const handlePagination = (e, val) => {
    const prev = () => {
      fetchDocuments({
        path,
        n: itemsPerPage,
        currPageNum: page,
      });
    };
    const next = () => {
      fetchDocuments({
        path,
        n: itemsPerPage,
        nextPageToken: documents.nextPageToken,
      });
    };
    val > page ? next() : prev();
    setPage(val);
  };

  const renderListOptions = () => {
    return (
      <FormGroup row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
        {renderResultsPerPage()}
        <TokenPagination
          page={page}
          handleChange={handlePagination}
          hasNext={documents.nextPageToken}
        />
      </FormGroup>
    );
  };

  const renderList = () => {
    if (!documents.items.length) {
      return <Typography>No options!</Typography>;
    }

    return documents.items.map((doc) => {
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
        <FormGroup row>
          <ListSubheader>{title}</ListSubheader>
          <LabeledCheckbox
            label='Dense'
            checked={dense}
            handleChange={() => setDense(!dense)}
          />
        </FormGroup>
        {renderList()}
      </List>
      {renderListOptions()}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchDocuments })(DocumentList);
