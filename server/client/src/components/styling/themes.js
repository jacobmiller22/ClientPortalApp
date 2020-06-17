import { createMuiTheme } from "@material-ui/core/styles";

export const globalTheme = createMuiTheme({
  // Style sheet name ⚛️
  // MuiButton: {
  //   // Name of the rule
  //   text: {
  //     // Some CSS
  //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //     borderRadius: 3,
  //     border: 0,
  //     color: "white",
  //     height: 48,
  //     padding: "0 30px",
  //     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  //   },
  // },
});

export const landingTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#C32F27",
      dark: "#95190C",
    },
    secondary: {
      main: "#555555",
    },
    text: {
      main: "#443f3f",
    },
  },
});

// function OverridesCss() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Button>Overrides CSS</Button>
//     </ThemeProvider>
//   );
// }
