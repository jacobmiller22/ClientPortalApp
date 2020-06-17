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
      <ThemeProvider theme={globalTheme}>
        <ThemeProvider theme={landingTheme}>
          <Typography color='primary'>
            Welcome to Stafford Tax and Business Advisors' Online Document
            Portal
          </Typography>
          <Button
            color='primary'
            variant='contained'
            component={Link}
            to='/upload'>
            Get Started
          </Button>
        </ThemeProvider>
      </ThemeProvider>
    </div>
  );
};

export default Landing;
