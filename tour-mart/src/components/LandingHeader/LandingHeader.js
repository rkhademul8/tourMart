import { Box, Typography, Grid, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import BedIcon from "@mui/icons-material/Bed";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../images/logo.svg";

export const LandingHeader = () => {
  return (
    <Box
      style={{
        backgroundColor: "#003143",
        padding: "0px",
      }}
    >
      <Container>
        <Box
          sx={{
            padding: "15px 0px",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
            }}
          >
            <Grid item>
              <Box sx={{ cursor: "pointer" }}>
                <img style={{ width: "150px" }} src={logo} />
              </Box>
            </Grid>
            <Grid item textAlign="end">
              <Box
                sx={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "8px 40px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  width: "fit-content",
                  border: "1px solid #fff",
                }}
              >
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                  {" "}
                  Sign in
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
            mt={2}
          >
            <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <BedIcon style={{ color: "#fff" }} />
              <span style={{ color: "#fff", fontSize: "16px" }}>Hotel</span>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FlightIcon className="rotate" />
              <span style={{ color: "#fff", fontSize: "16px" }}>Flight</span>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <HomeOutlinedIcon style={{ color: "#fff" }} />
              <span style={{ color: "#fff", fontSize: "16px" }}>Charlets</span>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <NotificationsIcon style={{ color: "#fff" }} />
              <span style={{ color: "#fff", fontSize: "16px" }}>
                Activities
              </span>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
