import React, { useState } from "react";
import { Box } from "@mui/system";
import { format, addDays, subDays } from "date-fns";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Tab } from "@mui/material";
import OneWay from "../OneWay/OneWay";
import Roundway from "../Roundway/Roundway";

const FlightSearchBox = ({
  type,
  setType,
  value,
  setValue,
  fromSearchText,
  setFromSearchText,
  toSearchText,
  setToSearchText,
  from,
  setFrom,
  to,
  setTo,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  setClassName,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
  searchData,
  setSearchData,
  setData,
  setData2,
  handleClassName,
}) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        style={{
          // backgroundColor: "rgba(0, 49, 67, 0.8)",
          paddingBottom: "20px",
        }}
      >
        <TabContext value={value}>
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
                // background: "#ADB9BD",
                gap: { xs: "0", sm: "10px", md: "20px" },
                transition: "all .5s linear",
              },
              "& button": {
                opacity: "1",
                color: "#fff",
                width: "fit-content",
                minHeight: "fit-content",
                fontSize: { xs: "10px", sm: "12px", md: "12px" },
                padding: { xs: "5px 3px", sm: "5px 10px", md: "5px 30px" },
              },
              "& button svg": {
                color: "rgb(51, 51, 51)",
              },
              "& button.Mui-selected": {
                background: "#266572",
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
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                    padding: "0px",
                  },
                }}
              >
                <Tab
                  style={{
                    height: "40px",
                  }}
                  iconPosition="start"
                  label="One way"
                  value="oneway"
                />
                <Tab
                  style={{
                    height: "40px",
                  }}
                  label="Round Way"
                  value="return"
                />
              </TabList>
            </Box>
          </Box>

          <TabPanel value="oneway" style={{ padding: "0px 0px 0px 0px" }}>
            <OneWay
              tripType={value}
              iconColor={"#DC143C"}
              bgColor={"#fff"}
              bordercolor={"var(--primary-color)"}
              faddress={faddress}
              fromSendData={fromSendData}
              setFromSendData={setFromSendData}
              toSendData={toSendData}
              setToSendData={setToSendData}
              setfaddress={setfaddress}
              toAddress={toAddress}
              setToAddress={setToAddress}
              fromSearchText={fromSearchText}
              setFromSearchText={setFromSearchText}
              toSearchText={toSearchText}
              setToSearchText={setToSearchText}
              setValue={setValue}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              infant={infant}
              setInfant={setInfant}
              result={result}
              setResult={setResult}
              className={className}
              handleClassName={handleClassName}
              to={to}
              setTo={setTo}
              from={from}
              setFrom={setFrom}
              setChangeState={setChangeState}
              changeState={changeState}
              changeFrom={changeFrom}
              setChangeFrom={setChangeFrom}
              setData={setData}
              setData2={setData2}
            />
          </TabPanel>
          <TabPanel value="return" style={{ padding: "0px 0px 0px 0px" }}>
            <Roundway
              tripType={value}
              iconColor={"#DC143C"}
              bgColor={"#fff"}
              bordercolor={"var(--primary-color)"}
              faddress={faddress}
              setfaddress={setfaddress}
              toAddress={toAddress}
              setToAddress={setToAddress}
              fromSendData={fromSendData}
              setFromSendData={setFromSendData}
              toSendData={toSendData}
              setToSendData={setToSendData}
              fromSearchText={fromSearchText}
              setFromSearchText={setFromSearchText}
              toSearchText={toSearchText}
              setToSearchText={setToSearchText}
              setValue={setValue}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              infant={infant}
              setInfant={setInfant}
              result={result}
              setResult={setResult}
              className={className}
              handleClassName={handleClassName}
              to={to}
              setTo={setTo}
              from={from}
              setFrom={setFrom}
              setChangeState={setChangeState}
              changeState={changeState}
              changeFrom={changeFrom}
              setChangeFrom={setChangeFrom}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default FlightSearchBox;
