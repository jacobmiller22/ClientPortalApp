import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import UserMenu from "./UserMenu";

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
}));

function Header(props) {
  const classes = useStyles();

  const renderAuth = () => {
    if (props.currentUser) {
      return <UserMenu />;
    } else {
      return (
        <Button color='inherit' component={Link} to='/auth'>
          Login
        </Button>
      );
    }
  };

  const renderAdmin = () => {
    if (!props.permissions) {
      return null;
    }
    if (props.permissions.administrator) {
      return (
        <>
          <Button color='inherit' component={Link} to='/users'>
            Manage Users
          </Button>
        </>
      );
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          <img
            className={classes.logo}
            alt='Stafford Tax Logo'
            src='http://staffordtaxadvisors.com/wp-content/uploads/2016/07/Logo-STBA-small-e1467831377961.png'
          />
        </Button>

        <Button color='inherit' component={Link} to='/documents/upload'>
          Upload
        </Button>
        <Button color='inherit' component={Link} to='/documents'>
          My Documents
        </Button>
        {renderAdmin()}
        <Typography align='right' style={{ flexGrow: 1 }}>
          {renderAuth()}
        </Typography>
      </Toolbar>
    );
  };

  return (
    <AppBar className={classes.appBar} position='static'>
      {renderToolbar()}
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    permissions: state.auth.permissions,
  };
};

export default connect(mapStateToProps, {
  signUserIn,
  signUserOut,
})(Header);
