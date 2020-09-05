import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Typography,
  List,
  ListItem,
  ListSubheader,
  InputBase,
  FormGroup,
} from "@material-ui/core";
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

const UserList = (props) => {
  const classes = useStyles();

  const [dense, setDense] = useState(false);

  useEffect(() => {
    props.fetchUsers(100);
  }, []);

  const renderUserList = () => {
    const { users } = props;

    if (!users || !users.length) {
      return <LoadMessage color='primary' message='Loading users' />;
    }

    return users.map((user) => {
      return (
        <ListItem dense={dense} divider key={user.email}>
          <UserDetail user={user} />
        </ListItem>
      );
    });
  };

  const renderSearchBar = () => {};

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
