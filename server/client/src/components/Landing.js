import React from "react";
//import LoginPage from "./LoginPage";
// MUI
import { Button, Typography } from "@material-ui/core";
// Styling
import { globalTheme, landingTheme } from "./styling/themes";
import { ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography color="secondary" variant="h5">
        Welcome to Stafford Tax and Business Advisors' Online Document Portal
      </Typography>
      <Typography color="secondary" variant="h6">
        Upload your documents safely and securely via the portal!
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/upload">
        Get Started
      </Button>
    </div>
  );
};

export default Landing;
