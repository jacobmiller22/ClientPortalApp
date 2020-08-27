import React from "react";

import { Button, Typography } from "@material-ui/core";

class DocumentDetail extends React.Component {
  state = { meta: null, url: null };

  componentDidMount() {
    this.props.doc.getMetadata().then((doc) => {
      this.setState({ meta: doc });
    });
    this.props.doc.getDownloadURL().then((url) => {
      this.setState({ url });
    });
  }

  onViewClick = (e) => {
    e.preventDefault();
    const a = document.createElement("a");
    const url = this.state.url;

    a.href = url;
    a.target = "_blank";

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };

    a.addEventListener("click", clickHandler, false);
    a.click();
  };

  renderDetail() {
    const { meta } = this.state;
    return (
      <div key={meta.fullPath}>
        <Typography display="inline">
          <strong>Name: </strong>
        </Typography>
        <Typography display="inline">{meta.name}</Typography>
        <Button onClick={this.onViewClick}>View</Button>
      </div>
    );
  }

  render() {
    if (this.state.meta && this.state.url) {
      return <div>{this.renderDetail()}</div>;
    }
    return null;
  }
}

export default DocumentDetail;
