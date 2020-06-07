import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Button variant='contained' color='primary' component='label'>
        {label}
        <input
          {...input}
          type='file'
          accept='.pdf'
          style={{ display: "none" }}
          value={undefined}
          multiple={true}
        />
      </Button>
      <div style={{ marginBottom: "20px", color: "red" }}>
        {touched && error}
      </div>
    </div>
  );
};
