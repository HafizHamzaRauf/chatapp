import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import heroImage from "../images/hero1.jpg";
import { useNavigate } from "react-router-dom";
const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    gap: "10rem",
    m: {
      xs: "6rem 3rem",
      md: "12rem 7rem",
    },
  },
  heroDescription: {
    gap: "2rem",
  },
  heroImage: {
    borderRadius: "50%",
    width: "40rem",
    height: "40rem",
    display: {
      xs: "none",
      md: "block",
    },
  },
};
const Hero = () => {
  const navigate = useNavigate();
  const chatClickHandler = () => {
    navigate("/signup");
  };
  return (
    <Box sx={styles.hero}>
      <Stack sx={styles.heroDescription}>
        <Typography
          variant="h1" // Default variant for extra small screens and up
          component={"h2"}
        >
          Chat Anywhere, Anytime
        </Typography>
        <Typography variant="h5" component={"p"}>
          Join our chat community and start conversations that matter. Connect
          with people around the world in an instant
        </Typography>
        <Button
          onClick={chatClickHandler}
          sx={{ alignSelf: "flex-start", fontSize: "1.7rem" }}
          variant="contained"
        >
          Let's Chat
        </Button>
      </Stack>
      <img style={styles.heroImage} src={heroImage} />
    </Box>
  );
};

export default Hero;
