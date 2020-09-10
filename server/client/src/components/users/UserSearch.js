import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import LoadMessage from "../Loading/LoadMessage";

import { fetchUsers } from "../../actions";

const UserSearch = ({ fetchUsers, handleChange, selected, users }) => {
  useEffect(() => {
    fetchUsers(100);
  }, []);

  const renderSearchBar = () => {
    return (
      <Autocomplete
        onChange={handleChange}
        value={selected}
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
