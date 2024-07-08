import { Box } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Tab from "@mui/material/Tab";
import FlightIcon from "@mui/icons-material/Flight";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const HomeSearchBox = () => {
  const [type, setType] = useState("flight");

  const handleTypeChange = (event, newValue) => {
    setType(newValue);
  };
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <TabContext value={type}>
          <Box
            sx={{
              width: "100%",
              height: { md: "fit-content", sm: "100%", xs: "100%" },
              overflow: "hidden",
              display: "flex",
              opacity: "1",
              ".MuiTabs-root": {
                minHeight: "fit-content",
                mb: "20px",
                borderRadius: "6px",
              },
              ".MuiTabs-flexContainer": {
                background: "#ADB9BD",

                gap: { xs: "0", sm: "10px", md: "20px" },
                transition: "all .5s linear",
              },
              "& button": {
                opacity: "1",
                color: "rgb(51, 51, 51)",
                width: "fit-content",
                minHeight: "fit-content",
                fontSize: { xs: "10px", sm: "12px", md: "12px" },
                padding: { xs: "5px 3px", sm: "5px 10px", md: "5px 30px" },
              },
              "& button svg": {
                color: "rgb(51, 51, 51)",
              },
              "& button.Mui-selected": {
                background: "#013A4C",
                color: "#fff",
              },
              "& button.Mui-selected >svg": {
                color: "#fff !important",
              },
              ".MuiButtonBase-root": {
                minWidth: { xs: "75px", sm: "90px" },
              },
            }}
          >
            {/* -----For Tab to up device---- */}
            <Box display={{ xs: "none", sm: "block" }}>
              <TabList
                value={type}
                onChange={handleTypeChange}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                    padding: "0px",
                  },
                }}
              >
                <Tab
                  icon={
                    <FlightIcon
                      sx={{
                        fontSize: {
                          xs: "20px",
                        },
                        transform: "rotate(90deg)",
                        height: "38px",
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Flight"
                  value="flight"
                />
                <Tab
                  icon={
                    <HomeWorkOutlinedIcon
                      sx={{
                        fontSize: {
                          xs: "20px",
                        },
                        height: "38px",
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Hotel"
                  value="hotel"
                />
              </TabList>
            </Box>
          </Box>
          <TabPanel value={"flight"} style={{ padding: "0px 0px 0px 0px" }}>
            Hello 1
          </TabPanel>
          <TabPanel value={"hotel"} style={{ padding: "0px 0px 0px 0px" }}>
            Hello 2
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default HomeSearchBox;
