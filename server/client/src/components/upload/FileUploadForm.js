import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Button from "@material-ui/core/Button";

class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.docRef = React.createRef();
  }

  onFileSelect = (fileList) => {
    this.props.onFileSelect(fileList);
  };

  renderFormButton = (props) => {
    console.log(this.props);
    return (
      <Button variant="contained" color="primary" component="label">
        {props.label}
        {/* <input
          {...props.input}
          type="file"
          accept=".pdf"
          multiple={false}
          style={{ display: "none" }}
        /> */}
        <input
          {...props.input}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          multiple={this.props.multiple}
          ref={this.docRef}
          value={undefined}
          onChange={() => this.onFileSelect(this.docRef.current.files)}
        />
      </Button>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field name="filess" label="Browse" component={this.renderFormButton} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    );
  }
}

const wrappedForm = reduxForm({
  form: "fileUploadForm",
})(FileUploadForm);

export default connect(null)(wrappedForm);
