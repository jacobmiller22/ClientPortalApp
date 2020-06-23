import React from "react";
import Button from "@material-ui/core/Button";

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <span style={{ marginBottom: "5px" }}>
      <Button
        variant='contained'
        color='primary'
        component='label'
        style={{ margin: 5 }}>
        {label}
        <input
          {...input}
          type='file'
          accept='.pdf'
          style={{ display: "none" }}
          value={undefined}
          multiple={true}
          name='files'
        />
      </Button>
      <span style={{ marginBottom: "20px", color: "red" }}>
        {touched && error}
      </span>
    </span>
  );
};
