import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

const LoginPage = ({ auth }) => {
  const renderContent = function () {
    switch (auth) {
      case null:
        return <p>Something went wrong...</p>;
      case false:
        return (
          <div>
            <h2>Please sign in!</h2>;
            <Button variant='contained' color='primary' href='/auth/google'>
              Login with Google
            </Button>
          </div>
        );
      default:
        return (
          <Button variant='contained' color='primary' href='/api/logout'>
            Logout
          </Button>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LoginPage);
