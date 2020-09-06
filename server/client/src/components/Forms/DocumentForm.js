import React, { useState } from "react";

import { Button } from "@material-ui/core";

import DocumentPreview from "../Documents/DocumentPreview";

const DocumentForm = (props) => {
  const [selected, setSelected] = useState([]);

  const renderPreviews = () => {
    return selected.map((file) => {
      return <DocumentPreview key={file.name} file={file} />;
    });
  };

  const onFileSelect = (e) => {
    const fileArray = Array.from(e.target.files);
    setSelected(fileArray);
  };

  const renderInput = () => {
    return (
      <Button
        variant='contained'
        color='primary'
        component='label'
        style={{ margin: "5px" }}>
        Browse
        <input
          type='file'
          name='file'
          onChange={onFileSelect}
          accept={props.fileTypes}
          style={{ display: "none" }}
          multiple={props.multiple}
          encType='multipart/form-data'
        />
      </Button>
    );
  };

  const renderSubmit = () => {
    return (
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ margin: "5px" }}>
        Submit
      </Button>
    );
  };

  return (
    <>
      <form onSubmit={() => props.onSubmit(selected)}>
        <h1>File Upload</h1>
        {renderInput()}
        {renderSubmit()}
      </form>
      {renderPreviews()}
    </>
  );
};

export default DocumentForm;
