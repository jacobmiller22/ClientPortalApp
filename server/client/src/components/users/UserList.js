import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Typography, List, ListItem, GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UserDetail from "./UserDetail";
import LoadMessage from "../Loading/LoadMessage";

import { fetchUsers } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
}));

const UserList = (props) => {
  const classes = useStyles();

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
        <ListItem autoFocus button key={user.email}>
          <UserDetail user={user} />
        </ListItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        <Typography variant='h5'>Users on record</Typography>
        {renderUserList()}
      </GridList>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
