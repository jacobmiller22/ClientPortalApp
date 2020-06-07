import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import FieldFileInput from "../FieldFileInput";

import * as actions from "../../actions";
import validateFiles from "../../utils/validateFiles";
import fileListToArr from "../../utils/fileListToArr";
import _ from "lodash";

import "../../css/BrowseUpload.css";
import bytesToMegabytes from "../../utils/formatting";

const FILE_FIELDS = [];

class BrowseUpload extends Component {
  renderFileDetails() {
    var fileArray;

    if (this.props.files) {
      fileArray = fileListToArr(this.props.files.files);
    } else {
      return <h3> No file selected</h3>;
    }
    return _.map(this.props.files.files, (file) => {
      return (
        <tr key={file.name} style={{ textAlign: "left" }}>
          <td>
            <strong>Name:</strong> {file.name}
          </td>
          &ensp;&ensp;
          <td>
            <strong>Size:</strong> {bytesToMegabytes(file.size)} MB
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => {
            console.log("on submit");
            this.props.uploadFiles(values.files);
            this.props.clearFiles();
          })}
          encType='multipart/form-data'>
          <Field
            label='Browse'
            type='file'
            name='files'
            component={FieldFileInput}
            style={{ display: "none" }}
            accept='.pdf'
          />

          <Button type='submit' variant='contained' color='primary'>
            Upload
          </Button>
        </form>
        <div className='fileDetails'>
          <h2 style={{ textAlign: "left" }}> File Details</h2>
          <div>
            <table>{this.renderFileDetails()}</table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(values) {
  return { files: values.form.uploadedFiles.values };
}

function validate(formValues) {
  const errors = {};

  if (!formValues.files) {
    errors.files = "You must provide files to upload";
  }
  errors.files = validateFiles(formValues.files);

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "uploadedFiles",
})(connect(mapStateToProps, actions)(BrowseUpload));
