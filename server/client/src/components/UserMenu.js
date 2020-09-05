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
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";

const UserMenu = (props) => {
  const [open, setOpen] = useState(null);

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
        </List>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserMenu);
