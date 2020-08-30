import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { signUserIn, signUserOut } from "../actions";

//import "../css/Header.css";
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "black",
  },
  logo: {
    width: 90,
  },
  root: {
    flexGrow: 1,
  },

  rightSideItems: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();

  const renderAuth = () => {
    if (props.currentUser) {
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
        <Button color="inherit" component={Link} to="/">
          <img
            className={classes.logo}
            alt="Stafford Tax Logo"
            src="http://staffordtaxadvisors.com/wp-content/uploads/2016/07/Logo-STBA-small-e1467831377961.png"
          />
        </Button>

        <Button color="inherit" component={Link} to="/upload">
          Uploader
        </Button>
        <Button color="inherit" component={Link} to="/history">
          History
        </Button>
        <Button color="inherit" component={Link} to="manage_users">
          Manage Users
        </Button>
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
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, {
  signUserIn,
  signUserOut,
})(Header);
