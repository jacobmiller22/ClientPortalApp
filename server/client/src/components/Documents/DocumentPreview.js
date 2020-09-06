import React, { useState, useEffect } from "react";

import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentPreview = (props) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const { file } = props;

  useEffect(() => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [file]);

  if (!file) {
    return null;
  }

  if (file.type === "application/pdf") {
    return (
      <Document file={file}>
        <Page pageNumber={1} height={300} />
      </Document>
    );
  }
  return <img height={300} src={previewUrl} alt={file.name} />;
};

export default DocumentPreview;
