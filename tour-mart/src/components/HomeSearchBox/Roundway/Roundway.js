import {
  Box,
  Button,
  Collapse,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  Container,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import { addDays } from "date-fns";

import CloseIcon from "@mui/icons-material/Close";

import flightData from "../flightData.js";
import { Calendar } from "react-date-range";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import RoomIcon from "@mui/icons-material/Room";

import Select from "react-select";
const isMobile = window.innerWidth <= 768;
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto var(--primary-color)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--secondary-color)",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
const Roundway = ({
  tripType,
  iconColor,
  bgColor,
  borderColor,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  fromSearchText,
  setFromSearchText,
  toSearchText,
  setToSearchText,
  departureDate,
  setDepartureDate,
  returningDate,
  setReturningDate,
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
  from,
  setFrom,
  to,
  setTo,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
}) => {
  const data = flightData; // json data from flight Data

  const [prefAir, setIsPrefAir] = useState(false);
  const [directFlight, setDirectFlight] = useState(3);

  const [showPrefText, setPrefText] = useState(true);

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

  const [airlines, setAirlines] = useState([]);
  const [searchInputPrefAir, setSearchInputPrefAir] = useState("");

  const valuesArea = airlines.map((airline) => ({
    label: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 10px",

          cursor: "pointer",
          ":hover": {
            "& .MuiTypography-root": {
              fontFamily: "Poppins, sans-serif  !important",
            },
          },
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>{airline.name}</Typography>
        <Typography sx={{ fontSize: "12px" }}>{airline.code}</Typography>
      </Box>
    ),
    value: `${airline.code}-${airline.name}`,
  }));

  //  show the form data when click input field
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

  const style4 = {
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
  const handleClose5 = () => setOpen5(false);

  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  const [users, setUsers] = useState("");

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  // Date picker
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);

  //todo: is Click state
  const [click, setClick] = useState(false);
  //todo: end of click state

  // handle click function
  const handleClickAwayCalender = () => {
    setOpenDate(false);
  };

  const handleSwapBtn = () => {
    setfaddress(toAddress);
    setToAddress(faddress);
    setFromSendData(toSendData);
    setToSendData(fromSendData);
    setFromSearchText(toSearchText);
    setToSearchText(fromSearchText);
  };

  //formOnChange Filter
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
      setOpenDate(false);
      setToSendData(code);
      setToSearchText(`${name} (${code})`);
      setToAddress(address);
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
        style={{
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
                    // backgroundColor: "var( --secondary-color)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    },
                    "&:hover .address": { color: "var(--white)" },
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
                    onClick={() => {
                      fromSuggestedText(
                        ` ${item.name}`,
                        ` ${item.code} `,
                        `${item.Address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
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
                          color: "var(--secondary-color)",
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
                          fontSize: "13px",
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "var(--secondary-color)",
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
                  color: "#DC143C",
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
                    backgroundColor: "var( --white)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    },
                    "&:hover .address": { color: "var(--white)" },
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
                        ` ${item.name}`,
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
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <span
                        className="text-change"
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "var(--secondary-color)",
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
                          fontSize: "13px",
                          paddingRight: "10px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--secondary-color)",
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
                  color: "#DC143C",
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
  };
  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
    setIsPrefAir(false);
  };

  const handleClose = () => {
    setOpen(false);
    setResult(adultCount + childCount + infant);
  };

  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
    }
  }

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

  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
      }
    }
  }

  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
    }
  }
  // Search Flight button click

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    //console.log(changeFrom);
    if (!changeFrom) {
      setFrom(startDate);
      setTo(startDate);
      if (startDate !== endDate) {
        setTo(endDate);
        setOpenDate(false);
        setTimeout(() => setOpen(true), 200);
      }
    } else {
      setTo(startDate);
      setChangeFrom(false);
      setOpenDate(false);
      setTimeout(() => setOpen(true), 200);
    }
  });

  let handleSelectFromDate = (date) => {
    setFrom(date);
    handleOpen4();
    handleClose3();
  };

  let handleSelectToDate = (date) => {
    setTo(date);
    handleClose4();
  };

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);

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

  const style6 = {
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
  const [open6, setOpen6] = React.useState(false);
  const handleOpen6 = () => setOpen6(true);
  const handleClose6 = () => {
    setOpen6(false);
    setIsPrefAir(false);
  };

  return (
    <>
      {/* from  */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
            <span
              onClick={() => handleClose1()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "var(--primary-color)" }} />
            </span>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--secondary-color)",
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
                color: "var(--secondary-color)",
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
                        backgroundColor: "var( --white)",
                        transition: "all .5s ease-in-out",
                        "&:hover": {
                          backgroundColor: "var(--primary-color)",
                          color: "var(--white)",
                        },
                        "&:hover .address": { color: "var(--white)" },
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

                          handleClose1();
                        }} //suggest to display name select with multiple data pass parameter
                      >
                        <Box>
                          <Typography
                            className="address"
                            sx={{
                              fontSize: "12px",
                              color: "var(--primary-color)",
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
                              color: "var(--secondary-color)",
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
                              color: "var(--secondary-color)",
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
                      color: "var(--primary-color)",
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
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
            <span
              onClick={() => handleClose2()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "var(--primary-color)" }} />
            </span>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--secondary-color)",
              zIndex: 10,
              mb: 2,
            }}
            backgroundColor="#fff"
          >
            <input
              autoComplete="off"
              autoFocus
              onChange={toOnChange}
              className="customPlaceholder"
              placeholder="Search a airport..."
              style={{
                color: "var(--secondary-color)",
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
                        mb: 2,
                        paddingLeft: "10px",
                        paddingRight: "0px",

                        backgroundColor: "var( --white)",
                        transition: "all .5s ease-in-out",
                        "&:hover": {
                          backgroundColor: "var(--primary-color)",
                          color: "var(--white)",
                        },
                        "&:hover .address": { color: "var(--white)" },
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
                        onClick={() => {
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
                              color: "var(--primary-color)",
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
                              color: "var(--secondary-color)",
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
                              color: "var(--secondary-color)",
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
                      color: "var(--primary-color)",
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

      {/*travel date  */}

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography sx={{ color: "var(--primary-color)" }}>
                Journey From
              </Typography>
            </Box>
            <span
              onClick={() => handleClose3()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "var(--primary-color)" }} />
            </span>
          </Box>

          <Box
            sx={{
              zIndex: 10,
            }}
          >
            <Calendar
              color="var(--primary-color)"
              date={new Date(from)}
              onChange={handleSelectFromDate}
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

      {/*return date  */}

      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "var(--primary-color)" }}>
              Journey To
            </Typography>
            <span
              onClick={() => handleClose4()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "var(--primary-color)" }} />
            </span>
          </Box>

          <Box
            sx={{
              zIndex: 10,
            }}
          >
            <Calendar
              color="var(--primary-color)"
              date={new Date(to)}
              onChange={handleSelectToDate}
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

      {/* passenger */}

      <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style5}>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
            <span
              onClick={() => handleClose5()}
              style={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "var(--primary-color)" }} />
            </span>
          </Box>

          <Box
            sx={{
              zIndex: 1000,
              borderRadius: "5px",
            }}
          >
            <Box>
              <Typography
                style={{
                  textAlign: "left",
                  marginBottom: "5px",
                  color: "var(--secondary-color)",

                  fontWeight: 400,
                }}
              >
                Passenger
              </Typography>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
                pb={1}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  width="40%"
                >
                  <button
                    onClick={adultDecrement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    -
                  </button>
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    {adultCount}
                  </Typography>
                  <button
                    onClick={adultInclement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    +
                  </button>
                </Stack>
                <Box width="60%">
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    Adult
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    12+ yrs
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
                pb={1}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  width="40%"
                >
                  <button
                    onClick={adult2Decrement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    -
                  </button>
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    {childCount}
                  </Typography>
                  <button
                    onClick={adult2Inclement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    +
                  </button>
                </Stack>
                <Box width="60%">
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    Child
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    2- less than 12 yrs
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
                pb={1}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  width="40%"
                >
                  <button
                    onClick={infantDecrement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    -
                  </button>
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    {infant}
                  </Typography>
                  <button
                    onClick={infantIncrement}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                    }}
                  >
                    +
                  </button>
                </Stack>
                <Box width="60%">
                  <Typography
                    sx={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    Infant
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", color: "var(--primary-color)" }}
                  >
                    0 - 23 month
                  </Typography>
                </Box>
              </Stack>
              <Box my={1}>
                <hr />
              </Box>
              <Box>
                <FormControl>
                  <RadioGroup value={className} onChange={handleClassName}>
                    <Stack direction="row">
                      <FormControlLabel
                        value="Economy"
                        control={<BpRadio />}
                        label={
                          <Typography
                            sx={{ color: "var(--primary-color)", fontSize: 12 }}
                          >
                            Economy
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="Business"
                        control={<BpRadio />}
                        label={
                          <Typography
                            sx={{ color: "var(--primary-color)", fontSize: 12 }}
                          >
                            Business
                          </Typography>
                        }
                      />
                    </Stack>
                    <Box sx={{ mt: 1 }}></Box>
                    <FormControlLabel
                      value="First Class"
                      control={<BpRadio sx={{ py: 0 }} />}
                      label={
                        <Typography
                          sx={{ color: "var(--primary-color)", fontSize: 12 }}
                        >
                          First Class
                        </Typography>
                      }
                    />

                    <Box sx={{ mt: 1 }}>
                      <FormControlLabel
                        value="PremiumEconomy"
                        control={<BpRadio sx={{ py: 0 }} />}
                        label={
                          <Typography
                            sx={{ color: "var(--primary-color)", fontSize: 12 }}
                          >
                            Premium Economy
                          </Typography>
                        }
                      />
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <FormControlLabel
                        value="PremiumFirst"
                        control={<BpRadio sx={{ py: 0 }} />}
                        label={
                          <Typography
                            sx={{ color: "var(--primary-color)", fontSize: 12 }}
                          >
                            Premium First
                          </Typography>
                        }
                      />
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <FormControlLabel
                        value=" PremiumBusiness"
                        control={<BpRadio sx={{ py: 0 }} />}
                        label={
                          <Typography
                            sx={{ color: "var(--primary-color)", fontSize: 12 }}
                          >
                            Premium Business
                          </Typography>
                        }
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>

                <Box mt={2} style={{ textAlign: "right" }}>
                  <Button
                    size="small"
                    onClick={() => handleClose5()}
                    className="shine-effect"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    }}
                  >
                    DONE
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* -----------new passenger- */}
          </Box>
        </Box>
      </Modal>

      {/* pref airlines */}

      <Modal
        open={open6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style6}>
          <Container>
            <Typography
              sx={{
                bgcolor: "var(--white)",
                px: 2,
                py: 1,
                mt: 6,
                color: "var(--primary-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Select Prefered Airlines</span>{" "}
              <span
                onClick={() => handleClose6()}
                style={{
                  background: "#FFF0ED",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CloseIcon sx={{ color: "var(--primary-color)" }} />
              </span>{" "}
            </Typography>
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                mt: 3,
                width: "100%",
                height: "100%",
                bgcolor: "white",
                zIndex: 1500,
              }}
            >
              <Select
                styles={{
                  dropdownIndicator: () => ({
                    display: "none",
                  }),

                  control: (_, state) => {
                    return {
                      borderColor: state.isFocused ? "" : "none",
                      display: "flex",
                      cursor: "pointer",
                    };
                  },
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused
                      ? "var(--third-color)"
                      : "none",
                    color: state.isFocused
                      ? "var(--primary-color)"
                      : "var(--text-dark)",
                    fontFamily: "Poppins, sans-serif  !important",
                    margin: "0px",
                    padding: "0px",
                  }),
                  menu: (provided) => {
                    return {
                      ...provided,
                      overflowY: "hidden",
                      borderRadius: 0,
                      margin: 0,
                      border: "none",
                      boxShadow: "none",
                    };
                  },

                  menuList: (provided) => {
                    return {
                      ...provided,

                      maxHeight: "500px",
                      marginBottom: "14px",
                      "::-webkit-scrollbar": {
                        width: "4px",
                        height: "0px",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "var(--third-color)",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "var(--third-color)",
                      },
                    };
                  },

                  multiValue: (provided) => {
                    return {
                      ...provided,

                      backgroundColor: "var(--third-color)",
                    };
                  },
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: "var(--primary-color)",

                    fontSize: "13px",
                    fontFamily: "Poppins, sans-serif  !important",
                  }),

                  multiValueRemove: (provided) => {
                    return {
                      ...provided,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                      padding: 1,
                      ":hover": {
                        backgroundColor: "",
                      },
                    };
                  },

                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "14px", // Set the font size of the placeholder
                  }),
                }}
                onChange={handleSelectAirlinesChange}
                onInputChange={(inputValue) => {
                  setSearchInputPrefAir(inputValue);
                }}
                value={selectedAirlines}
                menuIsOpen={true}
                isMulti
                placeholder="Select Maximum 5 Airlines"
                options={selectedAirlines.length === 5 ? [] : valuesArea}
              />
            </Box>
          </Container>
        </Box>
      </Modal>

      <ClickAwayListener onClickAway={handleClickAway}>
        <Box style={{ position: "relative" }}>
          <form>
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
                md={3}
                sx={{
                  position: "relative",
                  height: "90px",
                }}
              >
                <Box
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    height: "100%",
                    width: "100%",
                  }}
                  onClick={() => {
                    isMobile
                      ? handleOpen3()
                      : setTimeout(() => setOpenDate((prev) => !prev), 200);
                    setOpenFrom(false);
                    setOpenTo(false);
                    setOpen(false);
                  }}
                >
                  <Box style={{ display: "flex", gap: "3px" }}>
                    <Box
                      style={{
                        backgroundColor: "#fff",
                        height: "90px",
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <CalendarMonthIcon
                        style={{ fontSize: "30px", color: "#424242" }}
                      />
                      <Box cursor="pointer" mt={-0.5} pl={{ xs: 0.5, sm: 1.5 }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "rgb(66, 66, 66",
                          }}
                        >
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
                    </Box>
                    <Box
                      style={{
                        backgroundColor: "#fff",
                        height: "90px",
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <CalendarMonthIcon
                        style={{ fontSize: "30px", color: "#424242" }}
                      />
                      <Box cursor="pointer" mt={-0.5} pl={{ xs: 0.5, sm: 1.5 }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "rgb(66, 66, 66",
                          }}
                        >
                          {`${format(new Date(to), "MMM")}`}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "25px",
                            fontWeight: 500,
                            color: "#424242",
                          }}
                        >
                          {`${format(new Date(to), "dd")}`}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "rgb(66, 66, 66",
                          }}
                        >
                          {`${format(new Date(to), "eee")}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {openDate && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100px",
                      left: "-90px",
                      right: { sm: "auto", md: "auto", lg: "0%" },
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                    }}
                  >
                    <Box
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                        },
                      }}
                    >
                      <DateRange
                        onChange={handleSelect}
                        direction="horizontal"
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={ranges}
                        rangeColors={["var(--primary-color)"]}
                        minDate={new Date()}
                        style={{
                          fontSize: "11px",
                          padding: "0",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: {
                          lg: "none",
                          md: "none",
                          sm: "block",
                          xs: "block",
                        },
                      }}
                    >
                      <DateRange
                        onChange={handleSelect}
                        direction="vertical"
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={ranges}
                        rangeColors={["var(--primary-color)"]}
                        minDate={new Date()}
                        className="new-return-date-range"
                        style={{
                          fontSize: "11px",
                          padding: "0",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
                        }}
                      />
                    </Box>
                  </Box>
                )}
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

export default Roundway;
