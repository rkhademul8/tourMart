import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { LandingHeader } from "../LandingHeader/LandingHeader";
import homePhoto from "../../images/alm-360-hero-en2x_3.webp";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";
import { Height } from "@mui/icons-material";

const Home = () => {
  return (
    <Box>
      <LandingHeader />

      {/* Search box */}

      <Box
        style={{
          width: "100%",
          backgroundImage: `url(${homePhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Box pt={6} pb={7}>
            <Typography
              style={{
                color: "white",
                fontSize: "34px",
                fontWeight: "bold",
              }}
            >
              Let’s book your next trip!
            </Typography>
            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Choose from over 1.5 million hotels & 450+ airlines
            </Typography>
          </Box>
        </Container>

        <Box
          style={{
            backgroundColor: "rgba(0, 49, 67, 0.8)",
          }}
        >
          <Container mt={2}>
            <HomeSearchBox />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
