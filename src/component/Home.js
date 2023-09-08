import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Navigation></Navigation>
      <Hero></Hero>
    </Box>
  );
};

export default Home;
