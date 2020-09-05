import React from "react";

import { FormControlLabel, Checkbox } from "@material-ui/core";

const LabeledCheckbox = (props) => {
  const { checked, label, handleChange } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name='checkedDense'
          color='primary'
        />
      }
      label={label}
    />
  );
};

export default LabeledCheckbox;
