import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Tab from "@mui/material/Tab";
import FlightIcon from "@mui/icons-material/Flight";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { addDays, format } from "date-fns";

import FlightSearchBox from "./FlightSearchBox/FlightSearchBox";

const HomeSearchBox = () => {
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState("oneway");
  const [fromSearchText, setFromSearchText] = useState("Origin");
  const [toSearchText, setToSearchText] = useState("Destination");

  const [departureDate, setDepartureDate] = useState(
    format(addDays(new Date(), 1), "dd MMM yy")
  );
  const [returningDate, setReturningDate] = useState(
    format(addDays(new Date(departureDate), 3), "dd MMM yy")
  );
  const [travelDate, setTravelDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  // for multiCity
  const now = useRef(new Date());
  const [from, setFrom] = useState(addDays(now.current, 1));
  const [to, setTo] = useState(addDays(now.current, 3));

  const [faddress, setfaddress] = useState("Dhaka,BANGLADESH");
  const [toAddress, setToAddress] = useState("Cox's Bazar,Bangladesh");
  const [fromSendData, setFromSendData] = useState("DAC");
  const [toSendData, setToSendData] = useState("CXB");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [className, setClassName] = useState("Economy");

  const handleTypeChange = (event, newValue) => {
    setType(newValue);
  };

  const [searchData, setSearchData] = useState({
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    CityCount: 2,
    segments: [
      {
        id: 0,
        openFrom: false,
        DepFrom: fromSendData.trim(),
        depFromText: fromSearchText,
        ArrTo: toSendData.trim(),
        arrToText: toSearchText,
        openTo: false,
        Date: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
      {
        id: 1,
        openFrom: false,
        DepFrom: toSendData.trim(),
        depFromText: toSearchText,
        ArrTo: "DXB",
        arrToText: "Dubai Intl Airport (DXB)",
        openTo: false,
        Date: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
    ],
  });
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
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
                borderRadius: "1px",
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
                backgroundColor: "rgba(0, 49, 67, 0.9)",
                color: "#fff",
                borderRadius: "1px",
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
            <FlightSearchBox
              type={type}
              setType={setType}
              value={value}
              setValue={setValue}
              fromSearchText={fromSearchText}
              setFromSearchText={setFromSearchText}
              toSearchText={toSearchText}
              setToSearchText={setToSearchText}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returningDate={returningDate}
              setReturningDate={setReturningDate}
              travelDate={travelDate}
              setTravelDate={setTravelDate}
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
              faddress={faddress}
              setfaddress={setfaddress}
              toAddress={toAddress}
              setToAddress={setToAddress}
              fromSendData={fromSendData}
              setFromSendData={setFromSendData}
              toSendData={toSendData}
              setToSendData={setToSendData}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              infant={infant}
              setInfant={setInfant}
              result={result}
              setResult={setResult}
              className={className}
              setClassName={setClassName}
              setChangeState={setChangeState}
              changeState={changeState}
              changeFrom={changeFrom}
              setChangeFrom={setChangeFrom}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </TabPanel>
          <TabPanel
            value={"hotel"}
            style={{ padding: "0px 0px 0px 0px" }}
          ></TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default HomeSearchBox;
