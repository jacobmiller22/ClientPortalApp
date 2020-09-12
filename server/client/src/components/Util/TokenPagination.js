import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const TokenPagination = ({ page, handleChange, hasNext }) => {
  const classes = useStyles();

  const [count, setCount] = useState(1);

  useEffect(() => {
    if (hasNext && page === count) {
      setCount(count + 1);
    }
  }, [hasNext]);

  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color='primary'
        shape='rounded'
        size='large'
      />
    </div>
  );
};

export default TokenPagination;
