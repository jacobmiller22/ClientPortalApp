import React from "react";

import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
// Material UI
import { Box, Button, Typography } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { landingTheme } from "../styling/themes";

import UserList from "./UserList";
import CreateUserDialogue from "./CreateUserDialogue";

import { fetchUsers } from "../../actions";

const UserManagement = (props) => {
  const [cUDialogueOpen, setOpenCUDialogue] = React.useState(false);

  const renderCreateUserDialogue = () => {
    const handleClickOpenCUDialogue = () => {
      setOpenCUDialogue(true);
    };

    const handleCloseCUDialogue = () => {
      setOpenCUDialogue(false);
    };
    return (
      <span>
        <label>
          <Button
            onClick={handleClickOpenCUDialogue}
            variant='contained'
            color='primary'
            display='inline'>
            <CreateUserDialogue
              open={cUDialogueOpen}
              onClose={handleCloseCUDialogue}
            />
            Create User
          </Button>
        </label>
        <CreateUserDialogue
          open={cUDialogueOpen}
          onClose={handleCloseCUDialogue}
        />
      </span>
    );
  };

  const renderContent = (props) => {
    console.log(props.firebase.auth().currentUser);

    if (!props.firebase.auth().currentUser) {
      console.log("unauthorized to see manage users");
      return <div>UNAUTHORIZED</div>;
    }
    props.firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        if (!idTokenResult.claims.administrator) {
          return <div>UNAUTHORIZED</div>;
        }
      });
    return (
      <div>
        <div
          style={{
            alignSelf: "center",
            textAlign: "center",
            margin: "auto",
          }}>
          <Typography display='inline' variant='h4'>
            Manage users here
          </Typography>

          <Box alignItems='center' justifyContent='center'>
            <Button variant='contained' color='primary' display='inline'>
              Publish Changes
            </Button>
            {renderCreateUserDialogue()}
          </Box>
        </div>

        <div>
          <UserList />
        </div>
      </div>
    );
  };

  return (
    <MuiThemeProvider theme={landingTheme}>
      {renderContent(props)}
    </MuiThemeProvider>
  );
};
function mapStateToProps(state) {
  return state;
}

export default connect(null, { fetchUsers })(withFirebase(UserManagement));
