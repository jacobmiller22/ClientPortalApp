import React from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import FieldFileInput from "../FieldFileInput";

import * as actions from "../../actions";
import fileListToArr from "../../utils/fileListToArr";
import _ from "lodash";

import bytesToMegabytes from "../../utils/formatting";

import Grid from "@material-ui/core/Grid";
import { withFirebase } from "react-redux-firebase";

import { landingTheme } from "../styling/themes";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

function BrowseUploadFiles(props) {
  function renderRow(props) {
    if (props.formFiles) {
      var fileArray = fileListToArr(props.formFiles);
      var id = 0;
      return _.map(fileArray, (file) => {
        id++;

        return (
          <Grid container item xs={12} spacing={3} key={id} align='left'>
            <React.Fragment>
              <Grid item xs={4}>
                <Typography variant='body1'>
                  <strong>Name:</strong> {file.name}
                </Typography>
              </Grid>
              <Grid item xs={"auto"}>
                <Typography variant='body1'>
                  <strong>Size:</strong> {bytesToMegabytes(file.size)} MB
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        );
      });
    }
  }

  return (
    <MuiThemeProvider theme={landingTheme}>
      <form
        onSubmit={props.handleSubmit((values) => {
          console.log(props);
          if (values) {
            //   this.props.uploadFiles(values.browseFiles);
            let formData = new FormData();

            let files = values.browseFiles;

            for (let i = 0; i < files.length; i++) {
              let key = "file" + (i + 1).toString();
              formData.append(key, files[i]);
            }

            try {
              formData.append("author", props.firebase.auth().currentUser.uid); // Untested
              props.uploadFormData(formData);
            } catch (error) {
              console.log(error);
            }
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
        <Typography variant='h5' align='left'>
          File Details:
        </Typography>

        <Grid container spacing={1}>
          {renderRow(props)}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
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

  if (!values.browseFiles) {
    errors.browseFiles = "You must provide files to upload";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "formFiles",
})(connect(mapStateToProps, actions)(withFirebase(BrowseUploadFiles)));
