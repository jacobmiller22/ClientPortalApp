// React, React-Redux
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Actions
import { fetchUsers, changePermissions } from "../../actions";

// Firebase
import { withFirebase } from "react-redux-firebase";
import _ from "lodash";

// Material UI
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  InputLabel,
  FormHelperText,
  IconButton,
  FormControl,
  Select,
} from "@material-ui/core";

// Icons
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EditIcon from "@material-ui/icons/Edit";

// Themes
import { MuiThemeProvider } from "@material-ui/core/styles";
import { landingTheme } from "../styling/themes";

// Components
import UserDialogue from "./UserDialogue";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const UserList = (props) => {
  useEffect(() => {
    props.fetchUsers(props.firebase);
  }, []);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  // Verification
  const renderVerifyButton = (user) => {
    if (user.emailVerified) {
      return (
        <span>
          <VerifiedUserIcon color='primary' />
          <Typography display='inline' variant='body1' color='primary'>
            <strong>Verified</strong>
          </Typography>
        </span>
      );
    }
    return (
      <Button
        className={classes.FormControl}
        color='primary'
        variant='contained'>
        Verify
      </Button>
    );
  };

  const renderModifyButton = (user) => {
    const handleClose = (value) => {
      setOpen(false);

      //setSelectedValue(value);
      if (value) {
        console.log(value);
        // Request to update Permissions
        props.changePermissions(props.firebase, user, value);
      }
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    return (
      <div>
        <label>
          <IconButton
            color='primary'
            aria-label='edit permissions'
            component='span'
            onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </label>
        <UserDialogue open={open} onClose={handleClose} user={user} />
      </div>
    );
  };

  const renderUsers = (props) => {
    let usersArray = props.users;
    let i = 0;
    return _.map(usersArray.users, (user) => {
      i++;
      return (
        <div key={i} style={{ padding: 10 }}>
          <Card elevation={2} style={{ padding: 10 }}>
            <MuiThemeProvider theme={landingTheme}>
              <span>
                <Typography display='inline'>{user.email}</Typography>
              </span>
              <span style={{ float: "right" }}>{renderVerifyButton(user)}</span>
              <span style={{ float: "right" }}>{renderModifyButton(user)}</span>
            </MuiThemeProvider>
          </Card>
        </div>
      );
    });
  };
  //if administrator, render users, else display unauthorized

  return <div>{renderUsers(props)}</div>;
};

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers, changePermissions })(
  withFirebase(UserList)
);
