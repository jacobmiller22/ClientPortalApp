import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFiles } from "../../actions";

import Card from "@material-ui/core/Card";
import createFirebase from "../../actions/firebase";
import { withFirebase, firebaseConnect } from "react-redux-firebase";
import { Typography, Button } from "@material-ui/core";
import { landingTheme } from "../styling/themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

class FileList extends Component {
  componentDidMount() {
    this.props.fetchFiles(this.props.firebase);
  }

  downloadFile(file) {
    let firebase = this.props.firebase;

    let storage = firebase.storage();
    let auth = firebase.auth();
    let pathRef = storage.ref(auth.currentUser.uid + "/" + file.filename);

    pathRef
      .getDownloadURL()
      .then(function (url) {
        // TODO: MAKE HELPER FOR THIS
        let xhr = new XMLHttpRequest();
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
          <Card elevation={2} style={{ padding: 10 }}>
            <MuiThemeProvider theme={landingTheme}>
              <span>
                <Typography display='inline'>
                  <strong>File: </strong>
                  {file.originalname}
                </Typography>
              </span>
              <span style={{ float: "right" }}>
                &ensp;&ensp;
                <Button
                  color='primary'
                  display='inline'
                  onClick={(e) => {
                    e.preventDefault();
                    this.downloadFile(file);
                  }}>
                  view
                </Button>
              </span>
              <span style={{ float: "right" }}>
                <Typography display='inline'>
                  <strong>Date:&ensp;</strong>
                  {new Date(file.dateUploaded).toLocaleDateString()} at
                  {new Date(file.dateUploaded).toLocaleTimeString()}
                </Typography>
              </span>
            </MuiThemeProvider>
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

export default connect(mapStateToProps, { fetchFiles })(
  firebaseConnect()(FileList)
);
