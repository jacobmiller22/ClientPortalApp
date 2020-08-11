import React, { useState, setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { landingTheme } from "../styling/themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

import BrowseUpload from "./BrowseUpload";
import FileUploadForm from "../upload/FileUploadForm";
import { connect } from "react-redux";
import _ from "lodash";

import { uploadFormData } from "../../actions";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 575,
    textAlign: "center",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    marginLeft: "5rem",
    marginRight: "5rem",
  },
  container: { margin: "1rem", padding: "1rem" },
});

const Uploader = (props) => {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const renderSelectedFiles = () => {
    console.log(selectedFiles);
    return _.map(selectedFiles, (file) => {
      return <div key={file.name}>{file.name}</div>;
    });
  };

  const onFileSelect = (fileList) => {
    const fileArray = Array.from(fileList);

    setSelectedFiles(fileArray);
  };

  // TODO: FIX ME
  const onFormSubmit = (formValues) => {
    console.log("file are being submitted");

    // Fix once firebase is connected
    props.uploadFormData(formValues);
  };

  const renderInstructions = () => {
    return (
      <div>
        <MuiThemeProvider theme={landingTheme}>
          <Typography variant="h3" color="secondary">
            Portal Uploader!
          </Typography>
          <Typography variant="h5">
            Upload content to your provider here
          </Typography>
        </MuiThemeProvider>

        <div className="upload_instructions" style={{ textAlign: "left" }}>
          <ol>
            <li>
              <Typography>Click browse!</Typography>
            </li>
            <li>
              <Typography>Select file to upload!</Typography>
            </li>
            <li>
              <Typography>Click upload!</Typography>
            </li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      {renderInstructions()}
      <div>
        <Card className={classes.card} elevation={4}>
          <CardContent>
            <FileUploadForm
              onSubmit={onFormSubmit}
              onFileSelect={onFileSelect}
              multiple
            />
          </CardContent>
        </Card>
        {renderSelectedFiles()}
      </div>
    </div>
  );
};

export default connect(null, { uploadFormData })(Uploader);
