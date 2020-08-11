import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { signUserIn, signUserOut } from "../actions";

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

  const renderAuth = () => {
    if (props.currentAuthUser) {
      return (
        <Button color="inherit" onClick={() => props.signUserOut()}>
          logout
        </Button>
      );
    } else {
      return (
        // Later user Modal
        <Button color="inherit" component={Link} to="/auth">
          Login
        </Button>
      );
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu">
          <Button color="inherit" component={Link} to="/">
            <img
              className={classes.logo}
              alt="Stafford Tax Logo"
              src="http://staffordtaxadvisors.com/wp-content/uploads/2016/07/Logo-STBA-small-e1467831377961.png"
            />
          </Button>
        </IconButton>
        <Typography variant="h6" className={classes.appBarItems}>
          <Button color="inherit" component={Link} to="/upload">
            Uploader
          </Button>
        </Typography>
        <Typography variant="h6" className={classes.appBarItems}>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
        </Typography>
        <Typography className={classes.rightSideItems}>
          <Button color="inherit" component={Link} to="manage_users">
            Manage Users
          </Button>
        </Typography>
        <Typography align="right" className={classes.rightSideItems}>
          {renderAuth()}
        </Typography>
      </Toolbar>
    );
  };

  return (
    <AppBar className={classes.appBar} position="static">
      {renderToolbar()}
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return { currentAuthUser: state.auth };
};

export default connect(mapStateToProps, {
  signUserIn,
  signUserOut,
})(Header);
