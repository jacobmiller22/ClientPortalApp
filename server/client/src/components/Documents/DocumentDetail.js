import React, { useEffect, useState } from "react";

import {
  Button,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import { formatBytesWhole } from "../../utils/formatting";

const DocumentDetail = ({ doc }) => {
  const [meta, setMeta] = useState(null);
  const [url, setURL] = useState(null);

  useEffect(() => {
    doc.getMetadata().then((doc) => {
      setMeta(doc);
    });
    doc.getDownloadURL().then((url) => {
      setURL(url);
    });
  }, [doc]);

  const onViewClick = (e) => {
    e.preventDefault();
    const a = document.createElement("a");

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

  const renderViewButton = () => {
    if (!url) {
      return null;
    }
    return (
      <Button onClick={onViewClick} color='primary' variant='outlined'>
        View
      </Button>
    );
  };

  const renderDetail = () => {
    return (
      <div key={meta.fullPath}>
        <ListItemText inset secondary={`${formatBytesWhole(meta.size)}`}>
          {meta.name}
        </ListItemText>

        <Typography display='inline'></Typography>

        <ListItemSecondaryAction>{renderViewButton()}</ListItemSecondaryAction>
      </div>
    );
  };

  if (!meta) {
    return null;
  }
  return <div>{renderDetail()}</div>;
};

export default DocumentDetail;
