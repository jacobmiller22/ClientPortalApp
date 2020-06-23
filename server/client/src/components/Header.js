import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { withFirebase, isLoaded, isEmpty } from "react-redux-firebase";

//import "../css/Header.css";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "black",
  },
  logo: {
    width: 90,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  appBarItems: {
    font: "timesNewRoman",
  },
  rightSideItems: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();

  // const renderOAuthContent = function () {
  //   switch (auth) {
  //     case null:
  //       return;
  //     case false:
  //       return (
  //         <Button color='inherit' href='/auth/google'>
  //           Login with Google
  //         </Button>
  //       );
  //     default:
  //       return (
  //         <Button color='inherit' href='/api/logout'>
  //           Logout
  //         </Button>
  //       );
  //   }
  // };

  const renderFirebaseAuthContent = function (auth) {
    if (isLoaded(auth) && !isEmpty(auth)) {
      return (
        <Button
          color='inherit'
          onClick={() => {
            console.log("attempting to logout");
            props.firebase.logout();
          }}>
          logout
        </Button>
      );
    } else {
      return (
        <Button color='inherit' component={Link} to='/auth'>
          Login
        </Button>
      );
    }
  };

  const auth = useSelector((state) => state.firebase.auth);

  return (
    <AppBar className={classes.appBar} position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'>
          <Button color='inherit' component={Link} to='/'>
            <img
              className={classes.logo}
              alt='Stafford Tax Logo'
              src='http://staffordtaxadvisors.com/wp-content/uploads/2016/07/Logo-STBA-small-e1467831377961.png'
            />
          </Button>
        </IconButton>
        <Typography variant='h6' className={classes.appBarItems}>
          <Button color='inherit' component={Link} to='/upload'>
            Uploader
          </Button>
        </Typography>
        <Typography variant='h6' className={classes.appBarItems}>
          <Button color='inherit' component={Link} to='/history'>
            History
          </Button>
        </Typography>
        <Typography className={classes.rightSideItems}>
          <Button color='inherit' component={Link} to='manage_users'>
            Manage Users
          </Button>
        </Typography>
        <Typography align='right' className={classes.rightSideItems}>
          {renderFirebaseAuthContent(auth)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withFirebase(Header);
