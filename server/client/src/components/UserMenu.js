import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";

import SignInOut from "./Forms/Authentication/SignInOut";

const UserMenu = (props) => {
  const [open, setOpen] = useState(false);

  const { auth } = props;

  const renderAccessLevel = () => {
    if (auth) {
      if (auth.permissions.administrator) {
        return (
          <ListItem>
            <ListItemIcon>
              <SupervisorAccountSharpIcon color='primary' />
            </ListItemIcon>
            <ListItemText>Administrator</ListItemText>
          </ListItem>
        );
      }
      return <ListItemText>User</ListItemText>;
    }
    return <div>tbd</div>;
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color='inherit'>
        <Avatar>J</Avatar>
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
        <List>
          <ListItem>{renderAccessLevel()}</ListItem>

          <Divider />
          <ListItem>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Help</ListItemText>
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
