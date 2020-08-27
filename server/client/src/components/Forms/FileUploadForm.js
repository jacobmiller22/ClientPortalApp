import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Button from "@material-ui/core/Button";

class FileUploadForm extends React.Component {
  onFileSelect = (fileList) => {
    this.props.onFileSelect(fileList);
  };

  renderFormButton = (props) => {
    return (
      <Button
        variant="contained"
        color="primary"
        component="label"
        style={{ margin: "5px" }}>
        {props.label}
        <input
          {...props.input}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          multiple={this.props.multiple}
          value={undefined}
          encType="multipart/form-data"
        />
      </Button>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues.documents);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="documents"
          label="Browse"
          component={this.renderFormButton}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}>
          Submit
        </Button>
      </form>
    );
  }
}

const wrappedForm = reduxForm({
  form: "documentForm",
})(FileUploadForm);

export default connect(null)(wrappedForm);
