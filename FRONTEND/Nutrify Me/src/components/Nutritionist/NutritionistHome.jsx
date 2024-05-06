import { useState } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

function NutritionistHome() {
  const appointments = [
    {
      username: "user",
      type: "New Patient",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
    {
      username: "user",
      type: "New Patient",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
    {
      username: "user",
      type: "Follow Up",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
  ];

  // * progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  // *

  // * codes for calendar
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  const initialValue = dayjs();

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

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
  //*

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      <Grid container spacing={2} sx={{ mx: 5 }}>
        <Grid xs={6} sx={{ color: "#99756E", border: 1 }}>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "30px", float: "left" }}
            >
              Good morning, Nutritionist!
            </Typography>
            <br />
            <br />
            <Typography sx={{ float: "left" }}>
              You have 2 appointments for today.
            </Typography>
            <br />
            <br />
            <BorderLinearProgress
              sx={{ barColorPrimary: "red" }}
              variant="determinate"
              value={70}
            />
          </Box>
        </Grid>
        <Grid xs={6}>
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
          </LocalizationProvider>{" "}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5, mx: 2 }}>
        <Grid xs={6}>
          <Box
            sx={{
              backgroundImage: "url('/images/nutritionist home page.png')",
              width: "100%",
              height: "250px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              px: "0",
              justifyContent: "center",
              objectFit: "cover",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={6} sx={{ justifyContent: "flex-end", ml: "30px" }}>
                <Box display="flex" justifyContent="flex-start">
                  <Typography
                    sx={{
                      color: "#898246",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    READY TO TALK TO YOUR PATIENTS?
                    <Button
                      sx={{
                        background: "#E66253",
                        borderRadius: 3,
                        color: "#ffffff",
                        px: 4,
                      }}
                    >
                      GO TO TELEMEDICINE
                    </Button>
                  </Typography>
                  <br />
                </Box>
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              backgroundImage: "url('/images/nutritionist home page 2.png')",
              width: "100%",
              height: "250px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              px: "0",
              justifyContent: "center",
              objectFit: "cover",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={6} sx={{ justifyContent: "flex-end", ml: "30px" }}>
                <Box display="flex" justifyContent="flex-start">
                  <Typography
                    sx={{
                      color: "#898246",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    RECAP & EDIT YOUR PATIENT’S MEAL PLAN!
                    <br />
                    <Button
                      sx={{
                        background: "#E66253",
                        borderRadius: 3,
                        color: "#ffffff",
                        px: 4,
                      }}
                    >
                      VIEW HISTORY
                    </Button>
                    <br />
                    <Button
                      sx={{
                        background: "#E66253",
                        borderRadius: 3,
                        color: "#ffffff",
                        px: 4,
                      }}
                    >
                      EDIT MEAL PLAN
                    </Button>
                  </Typography>
                  <br />
                </Box>
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Box sx={{ border: 1 }}>
            <Typography>
              Upcoming Appointments
              <Button sx={{ color: "#B3B3B3", textDecoration: "underline" }}>
                View More
              </Button>
            </Typography>
            <br />
            {appointments.map((item, index) => (
              <>
                <Grid container spacing={2} sx={{ border: 1, ml: 5, mr: 5 }}>
                  <Grid xs={2}>
                    <img src={item.image} height="80px" />
                  </Grid>
                  <Grid xs={6}>
                    <Typography>{item.username}</Typography>
                    <Typography
                      sx={{
                        color: "#898246",
                        textDecoration: "underline",
                        mt: "30px",
                      }}
                    >
                      {item.type}
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography>
                      {item.date} <br /> {item.time}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
              </>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default NutritionistHome;
