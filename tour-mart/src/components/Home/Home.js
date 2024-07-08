import { Box, Container } from "@mui/material";
import React from "react";
import { LandingHeader } from "../LandingHeader/LandingHeader";
import homePhoto from "../../images/alm-360-hero-en2x_3.webp";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";

const Home = () => {
  return (
    <Box>
      <LandingHeader />

      {/* Search box */}

      <Box
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: ` url(${homePhoto})`,
        }}
      >
        <Container mt={2}>
          <HomeSearchBox />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
