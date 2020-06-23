import React from "react";

// Material UI
import { Box, Button, Typography } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { landingTheme } from "../styling/themes";

import UserList from "./UserList";

const UserManagement = () => {
  return (
    <MuiThemeProvider theme={landingTheme}>
      <div style={{ alignSelf: "center", textAlign: "center", margin: "auto" }}>
        <Typography display='inline' variant='h4'>
          Manage users here
        </Typography>

        <Box alignItems='center' justifyContent='center'>
          <Button variant='contained' color='primary' display='inline'>
            Publish Changes
          </Button>
          <Button variant='contained' color='primary' display='inline'>
            Create User
          </Button>
        </Box>
      </div>

      <div>
        <UserList />
      </div>
    </MuiThemeProvider>
  );
};

export default UserManagement;
