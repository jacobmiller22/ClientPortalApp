import React, { useState } from "react";
import { connect } from "react-redux";

import "../styling/Uploader.css";
import { Typography } from "@material-ui/core";

import DocumentForm from "../Forms/DocumentForm";
import UserSearch from "../Users/UserSearch";
import LoadMessage from "../Loading/LoadMessage";

import { uploadFormData, fetchUsers } from "../../actions";

const Uploader = (props) => {
  const intitialSelectedState = { email: "" };
  const [selected, setSelected] = useState(intitialSelectedState);

  const { currentUser } = props.auth;
  if (!currentUser) {
    return <div>sign in!</div>;
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

        <ol>
          <li>
            <Typography>Click browse!</Typography>
          </li>
          <li>
            <Typography>Select file to upload!</Typography>
          </li>
          <li>
            <Typography>Click upload!</Typography>
          </li>
        </ol>
      </div>
    );
  };

  const renderUserSearch = () => {
    const { currentUser, permissions } = props.auth;

    if (!currentUser) {
      return <LoadMessage message='Please sign in' color='primary' />;
    }
    if (!permissions.administrator) {
      // User is not authorized to view user list
      return (
        <Typography color='error'>
          You are not authorized to view this page!
        </Typography>
      );
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

    // if (!formData)
    const { uid, email, displayName } = !selected.uid ? currentUser : selected;
    props.uploadFormData(formData, { uid, email, displayName });
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
