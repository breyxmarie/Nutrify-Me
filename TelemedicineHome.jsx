import { useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { NavLink, Link, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// * functions for calendar
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}
// *

function TelemedicineHome() {
  //codes for consultation pop up in selecting nutritionist

  const options = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In Progress", name: "In Progress" },
    { id: "Completed", name: "Completed" },
  ];

  // * codes for calendar

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  //*

  // * Book Consultation modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };
  //

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {/* <MainUserNavbar />
      <TeleMedNavBar /> */}
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "100%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>

      <Box sx={{ flexGrow: 1, my: 3, color: "#99756E", mx: 5 }}>
        {" "}
        {/* // ! modify pa dito like what if walang appointment si user */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>My Scheduled Appointments</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  },
                }}
                sx={{
                  border: 1,
                  borderColor: "#E66253",
                  "& .MuiPickersCalendar-week": {
                    backgroundColor: "lightgray",
                  }, // Style weeks
                  "& .MuiPickersDay-day": { backgroundColor: "#000000" },
                }}
              />
            </LocalizationProvider>
            {/* // ! add calendar */}
            <Button
              onClick={handleOpen}
              sx={{
                background: "#E66253",
                color: "#ffffff",
                mx: 10,

                my: 5,
                px: 5,
                py: 1,
                fontSize: 20,
              }}
            >
              Book a Consultation
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Book a Consultation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Nutritionist
                </Typography>
                <FormControl
                  variant="standard"
                  sx={{ width: "70%", background: "#ffffff" }}
                >
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={value}
                    // onChange={onChange}
                    // error={!!error}
                  >
                    {options.map((option) => (
                      <MenuItem value={option.id}>{option.name}</MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText sx={{ color: "#d32f2f" }}>
                    {error?.message}
                  </FormHelperText> */}
                </FormControl>
                <br />
                <br />

                <Grid container spacing={2}>
                  <Grid xs={6}>
                    {" "}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Date of Consultation <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ background: "#ffffff" }} />
                      </LocalizationProvider>
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    {" "}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Time of Consultation
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="With Time Clock"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          sx={{ background: "#ffffff" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <h2>Today's Agenda</h2>
            <Box
              sx={{
                border: 1,
                borderColor: "#E66253",
                px: 5,
                borderRadius: 4,
                py: "30px",
                mr: "150px",
              }}
            >
              <p>[Recipient’s Name]</p>
              <p>Time: 10:00 am</p>
              <p>Dietitian: [Name]</p>

              <center>
                <Link
                  to="/telemedicine-consultation"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                    Go to Consultation
                  </Button>
                </Link>
              </center>
            </Box>
            <center>
              <Link
                to="/telemedicine-messages"
                style={{
                  color: "#ffffff",
                }}
              >
                <Button
                  sx={{
                    background: "#E66253",
                    color: "#ffffff",
                    my: 5,
                    px: 5,
                    py: 1,
                    fontSize: 20,
                  }}
                >
                  <img src="/images/messages.png" width="30px" height="30px" />{" "}
                  &nbsp; Messages
                </Button>
              </Link>
            </center>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TelemedicineHome;
