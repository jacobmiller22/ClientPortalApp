import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ButtonBase,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import { makeStyles } from "@material-ui/core/styles";

import SignInOut from "./Forms/Authentication/SignInOut";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const UserMenu = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { auth } = props;

  const renderUserTitles = () => {
    if (auth) {
      if (auth.permissions.administrator) {
        return (
          <ListItem>
            <Link to='/auth/profile' component={ButtonBase}>
              <ListItemIcon>
                <SupervisorAccountSharpIcon color='primary' />
              </ListItemIcon>
              <ListItemText
                secondary={currentUser.displayName || currentUser.email}>
                {currentUser.email}
              </ListItemText>
            </Link>
          </ListItem>
        );
      }
      return (
        <ListItem>
          <ListItemText
            inset
            secondary={currentUser.displayName || currentUser.email}>
            {currentUser.email}
          </ListItemText>
        </ListItem>
      );
    }
    return <div>tbd</div>;
  };

  const { currentUser } = props.auth;
  return (
    <>
      <Button onClick={() => setOpen(true)} color='inherit'>
        <Avatar className={classes.avatar}>J</Avatar>
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
        <List>
          {renderUserTitles()}
          <Divider />
          <ListItem>
            <ListItemText>
              <Link to='/documents/upload' component={ButtonBase}>
                Upload
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to='/documents' component={ButtonBase}>
                Documents
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to='/support' component={ButtonBase}>
                Help
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <SignInOut onClick={() => setOpen(false)} />
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserMenu);
