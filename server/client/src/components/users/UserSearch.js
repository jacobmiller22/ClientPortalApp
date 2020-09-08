import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import LoadMessage from "../Loading/LoadMessage";

import { fetchUsers } from "../../actions";

const UserSearch = (props) => {
  useEffect(() => {
    props.fetchUsers(100);
  }, []);

  const renderSearchBar = () => {
    const { users } = props;

    return (
      <Autocomplete
        onChange={props.handleChange}
        value={props.selected}
        freeSolo
        options={users}
        getOptionLabel={(user) => user.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='User' variant='outlined' />
        )}
      />
    );
  };

  return <div>{renderSearchBar()}</div>;
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UserSearch);

// />
