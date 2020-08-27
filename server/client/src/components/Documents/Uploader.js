import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// MUI
import "../styling/Uploader.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Components
import FileUploadForm from "../Forms/FileUploadForm";
import DocumentPreview from "./DocumentPreview";

// Helper libraries
import _ from "lodash";

// Actions
import { uploadFormData } from "../../actions";

const Uploader = (props) => {
  const renderSelectedFiles = () => {
    if (!props.selectedFiles || !props.selectedFiles.values) {
      return null;
    }
    const selected = props.selectedFiles.values.documents;
    console.log(selected);

    return _.map(selected, (file) => {
      return (
        <div key={file.name}>
          <DocumentPreview file={file} />
        </div>
      );
    });
  };

  //  const fileArray = Array.from(fileList);
  const onFormSubmit = (fileList) => {
    const fileArray = Array.from(fileList);

    let formData = new FormData();

    for (var key in fileArray) {
      formData.append(`formData`, fileArray[key]);
    }

    props.uploadFormData(formData);
  };

  const renderInstructions = () => {
    return (
      <div>
        <Typography variant="h3" color="secondary">
          Portal Uploader!
        </Typography>
        <Typography variant="h5" color="secondary">
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

  return (
    <div className="wrapper">
      {renderInstructions()}
      <div className="content">
        <FileUploadForm onSubmit={onFormSubmit} multiple />
        {renderSelectedFiles()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selectedFiles: state.form.documentForm };
};

export default connect(mapStateToProps, { uploadFormData })(Uploader);
