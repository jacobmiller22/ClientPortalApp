import React from "react";

import { Button, Typography } from "@material-ui/core";

import LoadMessage from "../Loading/LoadMessage";

import { formatBytesWhole } from "../../utils/formatting";

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

  renderViewButton() {
    if (!this.state.url) {
      //<LoadMessage inline color="primary" message="url" />
      return null;
    }
    return (
      <Button onClick={this.onViewClick} color="primary">
        View
      </Button>
    );
  }

  renderDetail() {
    const { meta } = this.state;
    return (
      <div key={meta.fullPath}>
        <Typography display="inline">
          <strong>Name: </strong> {meta.name}
        </Typography>
        <Typography display="inline">
          <strong>Size: </strong> {formatBytesWhole(meta.size)}
        </Typography>

        {this.renderViewButton()}
      </div>
    );
  }

  render() {
    if (this.state.meta) {
      return <div>{this.renderDetail()}</div>;
    }
    return <LoadMessage color="primary" message="Loading File" />;
  }
}

export default DocumentDetail;
