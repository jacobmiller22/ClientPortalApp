import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import FieldFileInput from "../FieldFileInput";

import * as actions from "../../actions";
import fileListToArr from "../../utils/fileListToArr";
import _ from "lodash";

import bytesToMegabytes from "../../utils/formatting";

import Grid from "@material-ui/core/Grid";

class BrowseUpload extends Component {
  renderRow() {
    if (this.props.formFiles) {
      var fileArray = fileListToArr(this.props.formFiles);
      var id = 0;
      return _.map(fileArray, (file) => {
        id++;

        return (
          <Grid container item xs={12} spacing={3} key={id}>
            <React.Fragment>
              <Grid item xs={4}>
                <strong>Name:</strong> {file.name}
              </Grid>
              <Grid item xs={"auto"}>
                <strong>Size:</strong> {bytesToMegabytes(file.size)} MB
              </Grid>
            </React.Fragment>
          </Grid>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => {
            if (values) {
              this.props.uploadFiles(values.browseFiles);
            }
          })}>
          <Field
            label='Browse'
            type='file'
            name='browseFiles'
            component={FieldFileInput}
            accept='.pdf'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ margin: 5 }}>
            Upload
          </Button>
        </form>
        <div className='fileDetails'>
          <h2 style={{ textAlign: "left" }}> File Details</h2>
          <div>
            <Grid container spacing={1}>
              {this.renderRow()}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(values) {
  var filesForState = values.form.formFiles.values;
  if (filesForState) {
    return { formFiles: filesForState.browseFiles };
  }
  return { formFiles: filesForState };
}

function validate(values) {
  const errors = {};
  console.log("validate");
  console.log(values);
  if (!values.browseFiles) {
    errors.browseFiles = "You must provide files to upload";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "formFiles",
})(connect(mapStateToProps, actions)(BrowseUpload));
