import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Button,
  Container,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Profile = ({ currentUser, permissions, history }) => {
  if (!currentUser) {
    return null;
  }

  const renderAvatar = () => {
    return;
  };

  return (
    <Container>
      <Button
        color='primary'
        variant='outlined'
        startIcon={<ArrowBackIcon />}
        onClick={() => history.goBack()}>
        Go back
      </Button>
      <Card variant='outlined' raised>
        <CardHeader
          title={currentUser.displayName || "No display name"}
          avatar={<Avatar>J</Avatar>}
          subheader={currentUser.email}
        />

        <CardContent>Profile</CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
};

const mapStateToProps = ({ auth: { currentUser, permissions } }) => {
  return { currentUser, permissions };
};

export default connect(mapStateToProps)(Profile);
