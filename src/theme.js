// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(257, 27%, 26%)",
    },
    secondary: {
      main: "#00FF00",
    },
    text: {
      primary: "hsl(255, 11%, 22%)",
      secondary: "hsl(260, 8%, 14%)",
      tertiary: "hsl(257, 7%, 63%)",
      disabled: "hsl(0, 0%, 75%)",
    },
    background: {
      default: "hsl(0, 0%, 100%)",
      disabled: "#f0f1f6",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontSize: 16,
  },
});

export default theme;
