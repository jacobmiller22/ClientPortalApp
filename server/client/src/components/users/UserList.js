import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { List, ListItem, ListSubheader, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UserDetail from "./UserDetail";
import LoadMessage from "../Loading/LoadMessage";
import LabeledCheckbox from "../Forms/LabeledCheckbox";

import { fetchUsers } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  list: {
    width: "100%",
  },
}));

const UserList = ({ fetchUsers, users: { allUsers } }) => {
  const classes = useStyles();

  const [dense, setDense] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    // TODO: Make fetch users take in a variable amount of users and have pagination
    fetchUsers(100);
  }, [fetchUsers]);

  const renderUserList = () => {
    if (!allUsers || !allUsers.length) {
      // TODO: Delay loader by a few seconds
      return <LoadMessage color='primary' message='Loading users' />;
    }

    return allUsers.map((user) => {
      return (
        <ListItem dense={dense} divider key={user.email}>
          <UserDetail user={user} allChecked={allChecked} />
        </ListItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <FormGroup row>
          <ListSubheader>Users on record</ListSubheader>
          <LabeledCheckbox
            label='Dense'
            checked={dense}
            handleChange={() => setDense(!dense)}
          />
          <LabeledCheckbox
            label={allChecked ? "Deselect all" : "Select all"}
            checked={allChecked}
            handleChange={() => setAllChecked(!allChecked)}
          />
        </FormGroup>

        {renderUserList()}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
