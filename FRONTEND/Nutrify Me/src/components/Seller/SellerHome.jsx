import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import UserFooter from "../UserFooter";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Slider from "react-slick";
import ChatBox from "./ChatBox";

function SellerHome() {
  const handleNextC = () => {
    //* add sa carousel to handle prev and next buttons
    sliderRefC.current.slickNext(); // Trigger next slide transition
  };

  const handlePrevC = () => {
    sliderRefC.current.slickPrev(); // Trigger previous slide transition
  };
  const sliderRefC = useRef(null);
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };

  const menu = [
    {
      name: "High Protein",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 3,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 6,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 1,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 9,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 3,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 3,
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      stocks: 3,
    },
  ];

  const mealPlans = [
    {
      username: "[USERNAME]",
      orderId: "12345",
      date: "March 23, 2024",
      time: "2:00 pm",
      image: "/images/profile.png",
    },
    {
      username: "[USERNAME]",
      orderId: "12345",
      date: "March 23, 2024",
      time: "2:00 pm",
      image: "/images/profile.png",
    },
    {
      username: "[USERNAME]",
      orderId: "12345",
      date: "March 23, 2024",
      time: "2:00 pm",
      image: "/images/profile.png",
    },
  ];
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

  // *
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      <ChatBox />
      <Grid container spacing={2}>
        <Grid xs={6} sx={{ color: "#99756E" }}>
          <Box
            sx={{
              border: 2,
              borderRadius: 3,
              mx: "10%",
              textAlign: "left",
              py: 10,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "30px",
                mx: 5,
              }}
            >
              Good Morning, <br /> Project FIt!
            </Typography>
            <Typography sx={{ mx: 5 }}>
              You have 2 meal plans to create today
            </Typography>
            {/*  //* put progress bar chuchuness here */}
          </Box>
        </Grid>
        <Grid xs={6}>
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
        </Grid>
      </Grid>

      <Box
        component="section"
        sx={{
          // display: "flex",
          justifyContent: "center",
          backgroundImage: "url('/images/home seller.png')",
          display: "flex",
          alignItems: "center",
          mx: "5%",
          my: 5,
          height: "400px" /* Adjust height as per your requirement */,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 5,
          borderColor: "#898246",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={4}>
            <p></p>
          </Grid>
          <Grid
            xs={8}
            sx={{
              color: "#99756E",
              fontWeight: "bold",
              marginLeft: "auto",
              float: "right",
              mr: "60px",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#898246",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "45px",
                mx: "10%",
              }}
            >
              UPDATE THE MENU ITEMS <br /> READY FOR MEAL PLANNING!
            </Typography>

            <br />

            <Button
              variant="contained"
              sx={{
                float: "right",
                mx: "40%",
                display: "block",
                background: "#E66253",
                fontSize: "20px",
                px: "60px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}
            >
              BROWSE
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Box
            sx={{
              color: "#99756E",
              border: 2,
              borderRadius: 2,
              ml: "13%",
              mr: 4,
              borderColor: "#898246",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                ml: 5,
                fontWeight: "bold",
                fontSize: "20px",
                pt: 3,
              }}
            >
              Menu Items
            </Typography>
            <Box sx={{ mx: "100px", py: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <button onClick={handlePrevC} style={{ marginTop: "80%" }}>
                    <img
                      src="/images/left arrow.png"
                      width="30px"
                      height="30px"
                    />
                  </button>
                </Grid>
                <Grid item xs={10}>
                  <Slider
                    {...settings}
                    ref={sliderRefC}
                    sx={{
                      color: "#000000",
                      border: 1,
                      borderColor: "#000000",
                      ml: "30px",
                      mr: "30px",
                    }}
                  >
                    {menu.map((item, index) => (
                      <Box key={index} onClick={() => handleSlideClick(item)}>
                        <center>
                          <img
                            src={item.image}
                            width="140"
                            height="140"
                            style={{ marginLeft: 10 }}
                          />
                        </center>
                        <br />
                        {item.name}
                        <br />
                        <Typography>{item.stocks} stocks left!</Typography>

                        <Button
                          sx={{
                            background: "#898246",

                            color: "#ffffff",
                            px: 4,
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              color: "#898246",
                              border: 0.5,
                              borderColor: "#898246",
                            },
                          }}
                        >
                          VIEW
                        </Button>
                      </Box>
                    ))}
                  </Slider>
                </Grid>
                <Grid item xs={1}>
                  <button
                    onClick={handleNextC}
                    style={{ marginTop: "70%", background: "#ffffff" }}
                  >
                    <img
                      src="/images/right arrow.png"
                      width="30px"
                      height="30px"
                    />
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box
            sx={{
              color: "#99756E",
              border: 2,
              borderColor: "#898246",

              borderRadius: 3,
              mr: "13%",
              ml: 4,
            }}
          >
            <Grid container spacing={2} sx={{ pt: 3 }}>
              <Grid xs={6}>
                <Typography
                  sx={{
                    textAlign: "left",
                    ml: 5,
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Pending Meal Plans
                </Typography>
              </Grid>

              <Grid xs={6}>
                <Button
                  sx={{
                    float: "right",
                    mr: 3,
                    textDecoration: "underline",
                    color: "#B3B3B3",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                >
                  View More
                </Button>
              </Grid>
            </Grid>

            {mealPlans.map((items, index) => (
              <Box sx={{ my: 4, mx: 10, border: 2, borderRadius: 3 }}>
                <Grid container spacing={2} sx={{ mx: 5, my: 3 }}>
                  <Grid xs={2}>
                    <img src={items.image} />
                  </Grid>
                  <Grid xs={4}>
                    {items.username} <br />
                    <br />
                    <br />
                    <br />
                    ORDER #{items.orderId}
                  </Grid>
                  <Grid xs={4}>
                    {items.date} <br />
                    {items.time}
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SellerHome;
