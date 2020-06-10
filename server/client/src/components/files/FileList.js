import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFiles } from "../../actions";

import Card from "@material-ui/core/Card";
import createFirebase from "../../actions/firebase";
class FileList extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  downloadFile(file) {
    const firebase = createFirebase();
    var storage = firebase.storage();

    var pathRef = storage.ref(file.filename);

    pathRef
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
          const urlFromBlob = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = urlFromBlob;
          a.download = file.filename || "download";

          const clickHandler = () => {
            setTimeout(() => {
              URL.revokeObjectURL(urlFromBlob);
              this.removeEventListener("click", clickHandler);
            }, 150);
          };

          a.addEventListener("click", clickHandler, false);
          a.click();
        };

        xhr.open("GET", url);
        xhr.send();
      })
      .catch(function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.code);
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  // TODO: Format Dates better
  renderFiles() {
    return this.props.files.reverse().map((file) => {
      return (
        <div key={file.filename} style={{ padding: 10 }}>
          <Card style={{ padding: 10, background: "#EEF0F2" }}>
            <span>{file.originalname}</span>
            <span style={{ float: "right" }}>
              &ensp;&ensp;
              <a
                href=''
                onClick={(e) => {
                  e.preventDefault();
                  this.downloadFile(file);
                }}>
                view
              </a>
            </span>
            <span style={{ float: "right" }}>
              Date:&ensp;{new Date(file.dateUploaded).toLocaleDateString()} at{" "}
              {new Date(file.dateUploaded).toLocaleTimeString()}
            </span>
          </Card>
        </div>
      );
    });
  }
  render() {
    return <div> {this.renderFiles()}</div>;
  }
}

function mapStateToProps(state) {
  return { files: state.files };
}

export default connect(mapStateToProps, { fetchFiles })(FileList);
