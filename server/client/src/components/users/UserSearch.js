import React, { useEffect } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { fetchUsers } from "../../actions";

const UserSearch = ({
  fetchUsers,
  handleChange,
  selected,
  users: { allUsers },
}) => {
  useEffect(() => {
    fetchUsers(100);
  }, [fetchUsers]);

  const renderSearchBar = () => {
    return (
      <Autocomplete
        onChange={handleChange}
        value={selected}
        options={allUsers}
        getOptionLabel={(user) => user.email}
        style={{ width: 300 }}
        noOptionsText={"No users"}
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
