import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import "../css/Header.css";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "black",
  },
  logo: {
    width: 40,
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

export function Header({ auth }) {
  const classes = useStyles();

  const renderContent = function () {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Button color='inherit' href='/auth/google'>
            Login with Google
          </Button>
        );
      default:
        return (
          <Button color='inherit' href='/api/logout'>
            Logout
          </Button>
        );
    }
  };

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
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png'
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
          {renderContent()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
