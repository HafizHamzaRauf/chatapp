import {
  Box,
  Button,
  Stack,
  Typography,
  breakpoints,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import iconImage from "../images/icon.png";
import theme from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context";
const styles = {
  icon: {
    width: "50px",
    height: "50px",
  },
  iconBox: {
    gap: "10px",
    alignItems: "center",
  },
  navigation: {
    backgroundColor: "#3683F7",
    display: "flex",
    justifyContent: "space-between",
    p: {
      md: "1rem 7rem",
      xs: "1rem 2rem",
    },
  },
  links: {
    gap: "25px",
    alignItems: "center",
  },
  button: {
    fontSize: "1.4rem",
  },
  link: {
    color: theme.palette.background.default,
    textDecoration: "none",
    fontSize: "2rem",
    "&:hover": {
      display: "none",
      color: "red",
    },
  },
};
const Navigation = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const ctx = useContext(Context);

  const signUpHandler = () => {
    if (ctx.token) {
      ctx.logout();
      return;
    }
    navigate("/login");
  };
  return (
    <Box sx={styles.navigation}>
      <Stack direction={"row"} sx={styles.iconBox}>
        <img style={styles.icon} alt="logo image" src={iconImage} />
        <Typography
          color={theme.palette.background.default}
          variant="h4"
          component={"h3"}
        >
          Live Chat
        </Typography>
      </Stack>
      <Stack sx={styles.links} direction={"row"}>
        {!isSmallScreen && (
          <>
            <Link style={styles.link} to={"/"}>
              Home
            </Link>
            <Link style={styles.link} to={"/chatbox"}>
              Chatbox
            </Link>
            <Link style={styles.link} to={"/"}>
              Settings
            </Link>
            <Link style={styles.link} to={"/"}>
              Services
            </Link>
            <Link style={styles.link} to={"/"}>
              Solutions
            </Link>
          </>
        )}
        <Button sx={styles.button} onClick={signUpHandler} variant="contained">
          {ctx.token ? "Logout" : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Navigation;
