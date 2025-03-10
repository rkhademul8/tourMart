import {
  Box,
  ClickAwayListener,
  Grid,
  Typography,
  Collapse,
  Modal,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import flightData from "../flightData.js";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Select from "react-select";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

const OneWay = ({
  tripType,
  iconColor,
  bgColor,
  borderColor,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSearchText,
  setFromSearchText,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  toSearchText,
  setToSearchText,
  departureDate,
  setDepartureDate,
  setValue,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  handleClassName,
  travelDate,
  setTravelDate,
  to,
  setTo,
  from,
  setFrom,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
  setData,
  setData2,
}) => {
  const data = flightData; // json data from flight Data
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const handleSelectAirlinesChange = (selectedOptions) => {
    const a = selectedOptions.map((ab) => {
      return {
        label: `${ab.value.split("-")[0]}`,
        value: ab.value,
      };
    });
    setSelectedAirlines(a);
  };

  const style3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#FFE9E9",
    height: "100vh",
    boxShadow: 24,
    p: 4,
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const initialData = [
    {
      code: "DAC",
      name: "Hazrat Shahjalal Intl Airport",
      Address: "Dhaka,BANGLADESH",
    },
    {
      code: "DXB",
      name: "Dubai Intl Airport",
      Address: "Dubai,UNITED ARAB EMIRATES",
    },
    {
      code: "CXB",
      name: "Cox's Bazar Airport",
      Address: "Cox's Bazar,Bangladesh",
    },
    {
      code: "JSR",
      name: "Jashore Airport",
      Address: "Jashore,Bangladesh",
    },
    {
      code: "BZL",
      name: "Barishal Airport",
      Address: "Barishal,Bangladesh",
    },
    {
      code: "RJH",
      name: "Shah Makhdum Airport",
      Address: "Rajshahi,Bangladesh",
    },
    {
      code: "SPD",
      name: "Saidpur Airport",
      Address: "Saidpur,Bangladesh",
    },
  ];

  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
  };

  const formOnChange = (e) => {
    setOpen(false);
    const searchvalue = e.target.value;
    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setFromSuggest(suggestion);
      }
    } else {
      setFromSuggest(initialData);
    }
  };

  const fromSuggestedText = (name, code, address) => {
    setFromSendData(code);
    setFromSearchText(`${name} (${code})`);
    setFromSuggest([]);
    setfaddress(address);
    setOpen(false);
    setOpenFrom(false);
    setOpenTo(true);
  };

  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setToSuggest(suggestion);
      }
    } else {
      setToSuggest(initialData);
    }
  };
  const toSuggestedText = (name, code, address) => {
    if (isMobile) {
      setToSendData(code);
      setToSearchText(`${name} (${code})`);
      setToAddress(address);
      setOpenDate(false);
      return;
    }
    setToSendData(code);
    setToSearchText(`${name} (${code})`);
    setToSuggest([]);
    setToAddress(address);
    setOpenTo(false);
    setTimeout(() => setOpenDate(true), 200);
  };

  const fromGetSuggetion = () => {
    return (
      <Box
        sx={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "transparent",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  className="name-textfrom"
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "5px",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#E5EFF1",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      // width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      fromSuggestedText(
                        `${item.name} `,
                        `${item.code}`,
                        `${item.Address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 400,
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <Typography
                        className="text-change"
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        className="text-change"
                        style={{
                          fontSize: "12px",
                          display: "block",
                          textAlign: "left",
                          color: "#fff",
                          fontWeight: 400,
                          backgroundColor: "#758692",
                          padding: "3px 8px",
                          borderRadius: "5px",
                        }}
                      >
                        {item.code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle-2"
                style={{
                  fontWidth: "bold",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const toGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          {toSuggest.length !== 0 ? (
            toSuggest.map((item, index) => {
              return (
                <Box
                  className="name-textfrom"
                  key={index}
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#E5EFF1",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() =>
                      toSuggestedText(
                        `${item.name} `,
                        `${item.code}`,
                        `${item.Address}`
                      )
                    } //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          display: "block",
                          textAlign: "left",
                          fontWeight: 400,
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <span
                        className="text-change"
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="text-change"
                        style={{
                          fontSize: "12px",
                          display: "block",
                          textAlign: "left",
                          color: "#fff",
                          fontWeight: 400,
                          backgroundColor: "#758692",
                          padding: "3px 8px",
                          borderRadius: "5px",
                        }}
                      >
                        {item.code}
                      </span>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle2"
                style={{
                  fontWidth: "bold",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  // SearchingField End

  // Opens the dialog when the user clicks.
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
  };

  // Sets the number of children.
  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
    }
  }

  // Decrement the count of children.
  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
        }
      }
    }
  }

  function adult2Inclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
    }
  }

  function adult2Decrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  }

  // Increment the default value if the value is not a child.
  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
      }
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
    }
  }
  //todo: form Submit function
  async function handleSearch(e) {
    e.preventDefault();
  }

  const isMobile = window.innerWidth <= 768;

  //todo: end of form Submit section
  const handleSelect = (date) => {
    if (isMobile) {
      handleClose3();
      setFrom(date);
      return;
    }

    setFrom(date);
    setChangeFrom(true);
    setOpenDate(false);
    setTimeout(() => setOpen(true), 200);
  };
  const handleSwapBtn = () => {
    setfaddress(toAddress);
    setToAddress(faddress);
    setFromSendData(toSendData);
    setToSendData(fromSendData);
    setToSearchText(fromSearchText);
    setFromSearchText(toSearchText);
    setOpenFrom(true);
  };

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#FFE9E9",
    height: "100vh",

    boxShadow: 24,
    p: 4,
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#FFE9E9",
    height: "100vh",
    boxShadow: 24,
    p: 4,
  };
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const style5 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#FFE9E9",
    height: "100vh",
    boxShadow: 24,
    p: 4,
  };
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => {
    setOpen5(false);
  };

  return (
    <>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              mb: 2,
            }}
            backgroundColor="#fff"
          >
            <input
              autoComplete="off"
              autoFocus
              onChange={formOnChange}
              placeholder="Search a airport..."
              className="customPlaceholder"
              style={{
                fontWeight: 400,
                paddingLeft: "20px",
                width: "100%",
                height: "40px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
            />
          </Box>

          <Box
            sx={{
              height: "fit-content",
              position: "relative",
              width: "100%",
              zIndex: "100",
            }}
          >
            <Box
              sx={{
                height: "800px",
                overflowY: "auto",
                background: "transparent",
              }}
            >
              {fromSuggest.length !== 0 ? (
                fromSuggest.map((item, index) => {
                  return (
                    <Box
                      sx={{
                        marginBottom: "10px",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        transition: "all .5s ease-in-out",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "0px 0px",
                          padding: "5px 0px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          fromSuggestedText(
                            `${item.name} `,
                            `${item.code}`,
                            `${item.Address}`
                          );

                          handleClose1();
                        }}
                        //suggest to display name select with multiple data pass parameter
                      >
                        <Box>
                          <Typography
                            className="address"
                            sx={{
                              fontSize: "12px",
                              display: "block",
                              textAlign: "left",
                              fontWeight: 400,
                            }}
                          >
                            {item.Address}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "11px",
                              display: "block",
                              textAlign: "left",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "13px",
                              display: "block",
                              textAlign: "left",
                              paddingRight: "5px",
                              fontWeight: 400,
                            }}
                          >
                            {item.code}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box>
                  <Typography
                    variant="subtitle-2"
                    style={{
                      fontWidth: "bold",
                      paddingLeft: "10px",
                    }}
                  >
                    Not found
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* to  */}

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              mb: 2,
            }}
            backgroundColor="#fff"
          >
            <input
              autoComplete="off"
              autoFocus
              onChange={formOnChange}
              placeholder="Search a airport..."
              className="customPlaceholder"
              style={{
                fontWeight: 400,
                paddingLeft: "20px",
                width: "100%",
                height: "40px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
            />
          </Box>

          <Box
            style={{
              height: "fit-content",
              position: "relative",
              width: "100%",
              zIndex: "100",
            }}
          >
            <Box
              sx={{
                overflowY: "auto",

                "&::-webkit-scrollbar": { width: "0px" },
              }}
            >
              {toSuggest.length !== 0 ? (
                toSuggest.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        marginBottom: "10px",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        transition: "all .5s ease-in-out",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "0px 0px",
                          padding: "5px 0px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={(e) => {
                          toSuggestedText(
                            `${item.name} `,
                            `${item.code}`,
                            `${item.Address}`
                          );

                          handleClose2();
                        }} //suggest to display name select with multiple data pass parameter
                      >
                        <Box>
                          <Typography
                            className="address"
                            sx={{
                              fontSize: "12px",
                              display: "block",
                              textAlign: "left",
                              fontWeight: 400,
                            }}
                          >
                            {item.Address}
                          </Typography>
                          <span
                            style={{
                              fontSize: "11px",
                              display: "block",
                              textAlign: "left",
                            }}
                          >
                            {item.name}
                          </span>
                        </Box>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              paddingRight: "10px",
                              display: "block",
                              textAlign: "left",
                              fontWeight: 400,
                            }}
                          >
                            {item.code}
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box>
                  <Typography
                    variant="subtitle2"
                    style={{
                      fontWidth: "bold",
                      paddingLeft: "10px",
                    }}
                  >
                    Not found
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* calender Travel Date */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Journey From</Typography>
            <span
              onClick={() => handleClose3()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon />
            </span>
          </Box>

          <Box
            sx={{
              zIndex: 10,
            }}
          >
            <Calendar
              date={new Date(from)}
              onChange={handleSelect}
              months={1}
              direction="horizontal"
              minDate={new Date()}
              style={{
                fontSize: "11px",
                padding: "0",
                backgroundColor: "#FFE9E9",
              }}
            />
          </Box>
        </Box>
      </Modal>

      <ClickAwayListener onClickAway={handleClickAway}>
        <Box style={{ position: "relative" }}>
          <form onSubmit={handleSearch}>
            <Grid container rowSpacing={0} columnSpacing={0.5}>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                sx={{
                  position: "relative",
                }}
              >
                {/* Departure */}
                <Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      isMobile ? handleOpen1() : setOpenFrom((prev) => !prev);
                      setOpenTo(false);
                      setOpenDate(false);
                      setOpen(false);
                      window.scrollTo({
                        top: 200,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "45px",
                          width: "35px",
                          borderRadius: "50%",
                        }}
                      >
                        <GpsNotFixedIcon
                          style={{
                            fontSize: "20px",
                            color: "rgb(158, 158, 158)",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box style={{ position: "relative" }}>
                        {faddress?.split(",")[0] ===
                          toAddress?.split(",")[0] && (
                          <Stack
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "0",
                              width: "100%",
                            }}
                          >
                            <Alert
                              icon={<ErrorOutlineIcon fontSize="inherit" />}
                              severity="error"
                              sx={{ fontSize: "11px" }}
                            >
                              Can't choose same place!
                            </Alert>
                          </Stack>
                        )}
                      </Box>

                      <Box style={{ width: "95%" }}>
                        <Typography
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            color: "rgb(158, 158, 158)",
                          }}
                        >
                          {fromSearchText}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      onClick={handleSwapBtn}
                      sx={{
                        display: {
                          lg: "flex",
                          md: "flex",
                          sm: "flex",
                          xs: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        position: "absolute",
                        left: {
                          lg: "93.5%",
                          md: "96%",
                          sm: "auto",
                          xs: "auto",
                        },
                        right: { lg: "auto", md: "auto", sm: 10, xs: 10 },
                        bottom: { lg: "auto", md: "auto", sm: -20, xs: -20 },
                        zIndex: 11,
                      }}
                    ></Box>
                  </Box>
                  <Collapse
                    in={openFrom}
                    timeout="auto"
                    unmountOnExit
                    sx={{ width: "40%" }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "11%",
                        right: "0",
                        backgroundColor: "#fff",
                        height: "fit-content",
                        zIndex: "999",
                        padding: "3px 5px 0px",
                        left: "4px",
                        width: "96%",
                        borderRadius: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 10,
                        }}
                        backgroundColor="#fff"
                      >
                        <GpsNotFixedIcon
                          style={{
                            fontSize: "20px",
                            color: "#02647A",
                          }}
                        />
                        <input
                          autoComplete="off"
                          autoFocus
                          onChange={formOnChange}
                          placeholder="Search a airport..."
                          className="customPlaceholder"
                          style={{
                            fontWeight: 400,
                            paddingLeft: "10px",
                            width: "100%",
                            height: "40px",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                          }}
                        />
                      </Box>
                      <Box>{fromGetSuggetion()}</Box>
                    </Box>
                  </Collapse>
                </Box>

                {/* arriaval  */}
                <Box mt={0.2}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      isMobile ? handleOpen2() : setOpenFrom(false);
                      setOpenTo((prev) => !prev);
                      setOpenDate(false);
                      setOpen(false);
                      window.scrollTo({
                        top: 200,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "45px",
                          width: "35px",
                          borderRadius: "50%",
                        }}
                      >
                        <RoomIcon
                          style={{
                            fontSize: "20px",
                            color: "rgb(158, 158, 158)",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ width: "100%", height: "100%" }}>
                      <Box style={{ position: "relative" }}>
                        <Typography>
                          {faddress?.split(",")[0] ===
                            toAddress?.split(",")[0] && (
                            <Stack
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                width: "100%",
                              }}
                            >
                              <Alert
                                icon={<ErrorOutlineIcon fontSize="inherit" />}
                                severity="error"
                                sx={{ fontSize: "11px" }}
                              >
                                Can't choose same place!
                              </Alert>
                            </Stack>
                          )}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          width: "100%",
                        }}
                      >
                        <Typography
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            color: "rgb(158, 158, 158)",
                          }}
                        >
                          {toSearchText}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Collapse
                    in={openTo}
                    timeout="auto"
                    unmountOnExit
                    sx={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "52%",
                        right: "0",
                        backgroundColor: "#fff",
                        height: "fit-content",
                        zIndex: "999",
                        padding: "3px 5px 0px",
                        left: "4px",
                        width: "96%",
                        borderRadius: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 10,
                        }}
                      >
                        <RoomIcon
                          style={{
                            fontSize: "20px",
                            color: "#02647A",
                          }}
                        />
                        <input
                          autoComplete="off"
                          autoFocus
                          onChange={toOnChange}
                          className="customPlaceholder"
                          placeholder="Search a airport..."
                          style={{
                            fontWeight: 400,
                            paddingLeft: "20px",
                            width: "100%",
                            height: "40px",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                          }}
                        />
                      </Box>
                      <Box>{toGetSuggetion()}</Box>
                    </Box>
                  </Collapse>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={1.5}
                sx={{
                  position: "relative",
                  height: "90px",
                }}
              >
                <Box
                  style={{
                    borderRadius: "10px",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  onClick={() => {
                    isMobile
                      ? handleOpen3()
                      : setTimeout(() => setOpenDate((prev) => !prev), 200);
                    setOpenFrom(false);
                    setOpenTo(false);
                    setOpen(false);
                    window.scrollTo({
                      top: 200,
                      behavior: "smooth",
                    });
                  }}
                >
                  <Stack direction="row" alignItems="center" height="100%">
                    <Box
                      ml={{ xs: 0.5, sm: 1.5 }}
                      sx={{
                        borderRadius: "100%",
                        height: { xs: "32px", sm: "35px" },
                        width: { xs: "32px", sm: "35px" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CalendarMonthIcon
                        style={{ fontSize: "30px", color: "#424242" }}
                      />
                    </Box>
                    <Box cursor="pointer" mt={-0.5} pl={{ xs: 0.5, sm: 1.5 }}>
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "rgb(66, 66, 66",
                        }}
                      >
                        {/* {`${format(new Date(from), "dd MMM yy")}`} */}
                        {`${format(new Date(from), "MMM")}`}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "25px",
                          fontWeight: 500,
                          color: "#424242",
                        }}
                      >
                        {`${format(new Date(from), "dd")}`}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "rgb(66, 66, 66",
                        }}
                      >
                        {`${format(new Date(from), "eee")}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                {openDate && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "90%",
                      left: { xs: "auto", md: "auto", lg: "18px" },
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                    }}
                  >
                    <Calendar
                      date={new Date(from)}
                      onChange={handleSelect}
                      months={1}
                      direction="horizontal"
                      minDate={new Date()}
                      style={{
                        fontSize: "11px",
                        padding: "0",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                      }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Box
                  style={{
                    borderRadius: "10px",
                    height: "90px",
                    width: "100%",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setValue("return")}
                >
                  <Box>
                    <CalendarTodayIcon
                      style={{ fontSize: "30px", color: "#424242" }}
                    />
                    <Typography
                      style={{
                        fontSize: "13px",
                        color: "rgb(66, 66, 66)",
                        fontWeight: 400,
                      }}
                    >
                      ADD RETURN
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={3}
                style={{
                  position: "relative",
                }}
              >
                <Box className="select-option">
                  <select
                    style={{
                      width: "100%",
                      borderRadius: "none",
                      height: "45px",
                      outline: "none",
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                      background: "#fff",
                      fontSize: "14px",
                      color: "rgb(66, 66, 66)",
                      padding: "0px 7px",
                    }}
                  >
                    <option>Economy</option>
                    <option>Premium Business</option>
                    <option>Business</option>
                    <option>First</option>
                  </select>
                </Box>

                <Box
                  mt={0.1}
                  style={{
                    height: "45px",
                    width: "100%",
                    background: "#fff",
                    borderBottomRightRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  onClick={isMobile ? handleOpen4 : handleClickOpen}
                >
                  <Stack direction="row" alignItems="center" height="100%">
                    <Box cursor="pointer">
                      <Typography
                        style={{
                          color: "rgb(66, 66, 66)",
                          fontWeight: 400,
                          fontSize: "14px",
                          padding: "0px 10px",
                        }}
                      >
                        {result} Passenger
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {open && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
                      right: "0px",
                      zIndex: 1000,
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <Box width="240px" p={2}>
                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="space-between"
                        alignItems="center"
                        pb={2}
                      >
                        <Box width="60%">
                          <Typography sx={{ fontSize: "14px", color: "#000" }}>
                            Adult 12+ yrs
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="space-between"
                          width="40%"
                        >
                          <button
                            onClick={adultDecrement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            -
                          </button>
                          <Typography sx={{ fontSize: "15px", color: "#000" }}>
                            {adultCount}
                          </Typography>
                          <button
                            onClick={adultInclement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="space-between"
                        alignItems="center"
                        pb={2}
                      >
                        <Box width="60%">
                          <Typography sx={{ fontSize: "14px", color: "#000" }}>
                            Child (2-11 years)
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="space-between"
                          width="40%"
                        >
                          <button
                            onClick={adult2Decrement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            -
                          </button>
                          <Typography sx={{ fontSize: "15px", color: "#000" }}>
                            {childCount}
                          </Typography>
                          <button
                            onClick={adult2Inclement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="space-between"
                        alignItems="center"
                        pb={1}
                      >
                        <Box width="60%">
                          <Typography sx={{ fontSize: "14px", color: "#000" }}>
                            Infant Under 2years
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="space-between"
                          width="40%"
                        >
                          <button
                            onClick={infantDecrement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            -
                          </button>
                          <Typography sx={{ fontSize: "15px", color: "#000" }}>
                            {infant}
                          </Typography>
                          <button
                            onClick={infantIncrement}
                            style={{
                              backgroundColor: "#02647A",
                              color: "#fff",
                              border: "none",
                              width: "25px",
                              height: "25px",
                              fontSize: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* -----------new passenger- */}
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={2} md={2}>
                <Box
                  style={{
                    backgroundColor: "#EF4050",
                    height: "90px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <SearchIcon style={{ color: "#fff", fontSize: "40px" }} />
                    <Typography
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                      }}
                    >
                      Search Flights
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default OneWay;
