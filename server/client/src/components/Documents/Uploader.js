import React, { useState } from "react";
import { connect } from "react-redux";

import "../styling/Uploader.css";
import { Typography, List, ListItem } from "@material-ui/core";

import DocumentForm from "../Forms/DocumentForm";
import UserSearch from "../Users/UserSearch";
import LoadMessage from "../Loading/LoadMessage";

import { uploadFormData, fetchUsers } from "../../actions";

import _ from "lodash";

const Uploader = ({ uploadFormData, auth: { currentUser, permissions } }) => {
  const [selected, setSelected] = useState(null);

  if (!currentUser || _.isEmpty(currentUser)) {
    return null;
  }

  const renderInstructions = () => {
    return (
      <div>
        <Typography variant='h3' color='secondary'>
          Portal Uploader!
        </Typography>
        <Typography variant='h5' color='secondary'>
          Upload content to your provider here
        </Typography>
        <List>
          <ListItem alignItems='flex-start'>
            <Typography>Click browse!</Typography>
          </ListItem>
          <ListItem alignItems='flex-start'>
            <Typography>Select file to upload!</Typography>
          </ListItem>
          <ListItem alignItems='flex-start'>
            <Typography>Click upload!</Typography>
          </ListItem>
        </List>
      </div>
    );
  };

  const renderUserSearch = () => {
    if (!currentUser) {
      return <LoadMessage message='Please sign in' color='primary' />;
    }
    if (!permissions.administrator) {
      // User is not authorized to view user list
      return null;
    }

    return (
      <UserSearch
        selected={selected}
        handleChange={(e, user) => setSelected(user)}
      />
    );
  };

  const onFormSubmit = (fileList) => {
    let formData = new FormData();
    const fileArray = Array.from(fileList);
    for (var key in fileArray) {
      formData.append(`formData`, fileArray[key]);
    }
    const { uid, email, displayName } = !selected ? currentUser : selected;
    uploadFormData(formData, { uid, email, displayName });
  };

  return (
    <div className='wrapper'>
      {renderInstructions()}
      {renderUserSearch()}
      <DocumentForm onSubmit={onFormSubmit} multiple fileTypes='.pdf' />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selectedFiles: state.form.documentForm, auth: state.auth };
};

export default connect(mapStateToProps, { uploadFormData, fetchUsers })(
  Uploader
);
