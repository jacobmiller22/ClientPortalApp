import React from "react";

class DocumentPreview extends React.Component {
  state = { previewURL: "" };

  componentDidMount() {
    if (this.props.file) {
      this.setState({ previewURL: URL.createObjectURL(this.props.file) });
    }
  }

  render() {
    console.log(this.state.previewURL);
    return <img src={this.state.previewURL} />;
  }
}

export default DocumentPreview;
