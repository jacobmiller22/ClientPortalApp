import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import BrowseUpload from "./BrowseUpload";

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
    marginLeft: 50,
    marginRight: 50,
  },
});

export default function Uploader() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.container} style={{ textAlign: "center" }}>
      <div>
        <h1>Portal Uploader!</h1>
        Upload content to your provider here
        <div className='numberedList' style={{ textAlign: "left" }}>
          <ol>
            <li>
              <Typography>Click browse</Typography>
            </li>
            <li>
              <Typography>Select file to upload</Typography>
            </li>
            <li>
              <Typography>Select file to upload</Typography>
            </li>
          </ol>
        </div>
      </div>
      <div>
        <Card className={classes.card} variant='outlined'>
          <CardContent>
            <BrowseUpload />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
