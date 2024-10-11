import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, Link, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

function MealPlanHistory() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  // ! weekly calendar
  dayjs.extend(isBetweenPlugin);

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
  })(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
      backgroundColor: "#ffffff",
      color: "#000000",
      "&:hover, &:focus": {
        backgroundColor: "#ffffff",
      },
    }),
    ...(isHovered && {
      backgroundColor: "#ffffff",
      "&:hover, &:focus": {
        backgroundColor: "#ffffff",
      },
    }),
    ...(day.day() === 0 && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(day.day() === 6 && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  }));

  const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
      return false;
    }

    return dayA.isSame(dayB, "week");
  };

  function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
      <CustomPickersDay
        {...other}
        day={day}
        sx={{ px: 2.5 }}
        disableMargin
        selected={false}
        isSelected={isInSameWeek(day, selectedDay)}
        isHovered={isInSameWeek(day, hoveredDay)}
      />
    );
  }

  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(dayjs());

  //! modal

  const [chosen, setChosen] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    console.log(data, "hi");
    setChosen(data);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    borderRadius: 3,
    color: "#ffffff",
  };

  function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
      <CustomPickersDay
        {...other}
        day={day}
        sx={{ px: 2.5 }}
        disableMargin
        selected={false}
        isSelected={isInSameWeek(day, selectedDay)}
        isHovered={isInSameWeek(day, hoveredDay)}
      />
    );
  }

  //!

  // ? get Data
  const [mealData, setMealData] = useState([]);

  const getMealData = () => {
    AxiosInstance.get(`generatedmeal`).then((res) => {
      if (
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
          .length > 0
      ) {
        setLoading1(true);
      } else {
        setLoading1(false);
      }
      setMealData(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );
      // console.log(
      //   res.data.filter((items) => items.user_id == loggedInUser.user_id)
      // );
    });
  };

  useEffect(() => {
    getMealData();
  }, []);
  //?

  //!
  const PopupTrigger = styled.span`
    /* Styles for the trigger element */
    cursor: pointer; /* Indicate hoverability */
    position: relative;
    width: 20%;
  `;

  const Popup = styled.div`
    position: absolute;
    right: 20%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    ${PopupTrigger}:hover + & {
      /* Show popup on hover of the trigger element */
      opacity: 1;
      visibility: visible;
      bottom: 600;
    }
  `;

  const popupRef = useRef(null);
  const triggerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered && popupRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      popupRef.current.style.left = `${triggerRect.left}px`;
      popupRef.current.style.top = `${triggerRect.bottom}px`;
    }
  }, [isHovered, popupRef, triggerRef]);

  //!
  //? slider

  const sliderRefs = useRef([]);
  const [slidersReady, setSlidersReady] = useState(false);

  useEffect(() => {
    // Assuming sliders are ready after some time or condition
    setSlidersReady(true);
  }, []);

  const handleNextC = (index) => {
    //console.log("handleNextC called with index:", index);
    if (sliderRefs.current[index]) {
      console.log("Calling slickNext for slider:", sliderRefs.current[index]);
      sliderRefs.current[index].slickNext();
    } else {
      //  console.error("Slider reference not found for index:", index);
    }
  };

  const handlePrevC = (index) => {
    // console.log("handlePrevC called with index:", index);
    if (sliderRefs.current[index]) {
      // console.log("Calling slickPrev for slider:", sliderRefs.current[index]);
      sliderRefs.current[index].slickPrev();
    } else {
      // console.error("Slider reference not found for index:", index);
    }
  };

  const sliderRefC = useRef(null);
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };

  const testimonial = [
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
  ];

  //?
  const requestOrder = () => {
    //Requested
    //Pending
    //Approved
    //Disapproved
    const currentWeekStart = dayjs(value).startOf("week").format("YYYY-MM-DD");
    const currentWeekEnd = dayjs(value).endOf("week").format("YYYY-MM-DD");

    console.log(currentWeekStart, currentWeekEnd);

    try {
      AxiosInstance.post(`requestedmeals/`, {
        user_id: loggedInUser.user_id,
        generatedMeal_id: chosen,
        start_week: currentWeekStart,
        end_week: currentWeekEnd,
        date: dayjs().format("YYYY-MM-DD"),
        status: "Pending",
        price: 0,
      }).then((res) => {
        console.log(res, res.data);
        toast.success("Request Sent");
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }

    try {
      AxiosInstance.post(`notifications/`, {
        'type': "NewReqOrder", 
        'id': loggedInUser.user_id, 
        'user_id': 140, 
        'message': 
        `${loggedInUser.first_name + " " + loggedInUser.last_name} has made a request order, 
        Please confirm it`, 
        'link': '/seller-request-meals', 
        'seen': 0, 
        'other_id': loggedInUser.user_id,
        'title': "Generated Meal Plan Request",
        'date': dayjs().format("YYYY-MM-DD"),
      }).then((res) => {
        console.log(res, res.data);
      });
      } catch (error) {
        console.log(error.response.data);
      }
  };

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //! loading
  const [loading1, setLoading1] = useState();
  //!

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "100px",
        fontFamily: "Poppins",
      }}
    >
      <Typography
        sx={{ color: "#99756E", fontSize: "1.5em", fontWeight: "bold", m: 5 }}
      >
        Generated Meal Plan History
      </Typography>
      {mealData.length === 0 && loading1 === false ? (
        <>No Orders</>
      ) : mealData.length > 0 && loading1 === true ? (
        <>
          {mealData.map(
            (
              item,
              index // item.meal.map((items) => (
            ) => (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid xs={12} md={10}>
                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Grid container spacing={2} sx={{ mx: "10%", mt: 5 }}>
                          <Grid sx={12} md={4}>
                            {" "}
                            <Grid container spacing={2} sx={{ mx: 0 }}>
                              <Grid xs={6}>
                                {/* {console.log(item.meal)} */}
                                <img
                                  src={
                                    item.meal[getRandomInRange(0, 4)].meals[
                                      getRandomInRange(0, 3)
                                    ].image
                                  }
                                  width="100"
                                  height="100"
                                />{" "}
                                {console.log(
                                  item.meal[getRandomInRange(0, 4)].meals[
                                    getRandomInRange(0, 3)
                                  ].image
                                )}
                                <br />
                                <img
                                  src={
                                    item.meal[getRandomInRange(0, 4)].meals[
                                      getRandomInRange(0, 3)
                                    ].image
                                  }
                                  width="100"
                                  height="100"
                                />
                              </Grid>
                              <Grid xs={1}>
                                {" "}
                                <img
                                  src={
                                    item.meal[getRandomInRange(0, 4)].meals[
                                      getRandomInRange(0, 3)
                                    ].image
                                  }
                                  width="100"
                                  height="100"
                                />
                                <br />
                                <img
                                  src={
                                    item.meal[getRandomInRange(0, 4)].meals[
                                      getRandomInRange(0, 3)
                                    ].image
                                  }
                                  width="100"
                                  height="100"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid sx={6} md={4}>
                            {" "}
                            <Typography>{item.name}</Typography>
                            <Typography>
                              {dayjs(item.date).format("MMMM DD, YYYY")}
                            </Typography>
                            <br />
                            <br />
                            <br />
                            {/* <Button
                          sx={{
                            mx: "auto",
                            display: "block",
                            float: "right",
                            background: "#E66253",
                            fontSize: "13px",
                            color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              color: "#E66253",
                            },
                          }}
                          onClick={() => requestOrder(item.generatedMeal_id)}
                        >
                          Request To Order
                        </Button> */}
                          </Grid>
                          <Grid sx={6} md={4} alignItems="center">
                            <Typography
                              display="flex"
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              Age: {item.age} <br />
                              Weight: {item.weight} <br />
                              Height: {item.height} <br />
                              Activity: {item.activity} <br />
                              Goal: {item.goal}
                              <br />
                              Allergen: {item.allergen} <br />
                              Diet: {item.diet} <br />
                            </Typography>
                          </Grid>
                        </Grid>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography>{item.name}</Typography>
                        <Typography>
                          {" "}
                          {dayjs(item.date).format("MMMM DD, YYYY")}
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={0}
                            sm={0}
                            md={1}
                            lg={1}
                            sx={{
                              display: {
                                xs: "none", // Hide on extra small screens
                                sm: "none",
                                md: "block", // Display on small screens and up
                              },
                            }}
                          >
                            <Button
                              onClick={() => handlePrevC(index)}
                              sx={{ mt: "235%", background: "#ffffff" }}
                            >
                              <img
                                src="/images/left arrow.png"
                                width="30px"
                                height="30px"
                              />
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={10}>
                            <Slider
                              {...settings}
                              ref={(ref) => {
                                if (ref) {
                                  sliderRefs.current[index] = ref;
                                }
                              }}
                              sx={{
                                color: "#000000",
                                border: 1,
                                borderColor: "#000000",
                                ml: "30px",
                                mr: "30px",
                              }}
                            >
                              {item.meal.map((items, index) => (
                                <Box
                                  key={index}
                                  onClick={() => handleSlideClick(item)}
                                >
                                  <Box
                                    sx={{
                                      color: "#000000",
                                      border: 3,
                                      borderColor: "#898246",
                                      borderRadius: 3,
                                      ml: "0px",
                                      mr: "0px",
                                      pt: 1,
                                      pb: 10,
                                    }}
                                  >
                                    <Typography sx={{ fontWeight: "bold" }}>
                                      {items.Day}
                                    </Typography>

                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ mx: "0%" }}
                                    >
                                      {items.meals.map((items1) => (
                                        <Grid
                                          item
                                          xs={6}
                                          sm={3}
                                          md={3}
                                          key={index}
                                        >
                                          <div className="parent-div">
                                            <PopupTrigger>
                                              <Typography>
                                                {items1.Meal}
                                              </Typography>
                                              <center>
                                                <img
                                                  src={items1.image}
                                                  width="100"
                                                  height="100"
                                                />
                                              </center>
                                              <Typography sx={{ mx: "5%" }}>
                                                {items1.details.recipe.label}
                                              </Typography>

                                              <Grid
                                                container
                                                spacing={2}
                                                sx={{ mt: 1 }}
                                              >
                                                <Grid xs={2}>
                                                  {" "}
                                                  <img src="/images/calories.png" />
                                                </Grid>
                                                <Grid
                                                  xs={8}
                                                  display="flex"
                                                  justifyContent="flex-start"
                                                >
                                                  {" "}
                                                  {Math.floor(
                                                    items1.details.recipe
                                                      .calories /
                                                      items1.details.recipe
                                                        .yield
                                                  )}{" "}
                                                  calories
                                                </Grid>
                                              </Grid>

                                              <Grid
                                                container
                                                spacing={2}
                                                sx={{ mt: 1 }}
                                              >
                                                <Grid xs={2}>
                                                  {" "}
                                                  <img src="/images/carbs.png" />
                                                </Grid>
                                                <Grid
                                                  xs={8}
                                                  display="flex"
                                                  justifyContent="flex-start"
                                                >
                                                  {Math.floor(
                                                    items1.details.recipe
                                                      .digest[1].total
                                                  )}{" "}
                                                  carbs
                                                </Grid>
                                              </Grid>

                                              <Grid
                                                container
                                                spacing={2}
                                                sx={{ mt: 1 }}
                                              >
                                                <Grid xs={2}>
                                                  {" "}
                                                  <img src="/images/fat.png" />
                                                </Grid>
                                                <Grid
                                                  xs={8}
                                                  display="flex"
                                                  justifyContent="flex-start"
                                                >
                                                  {Math.floor(
                                                    items1.details.recipe
                                                      .digest[0].total
                                                  )}{" "}
                                                  fats
                                                </Grid>
                                              </Grid>

                                              <Grid
                                                container
                                                spacing={2}
                                                sx={{ mt: 1 }}
                                              >
                                                <Grid xs={2}>
                                                  {" "}
                                                  <img src="/images/protein.png" />
                                                </Grid>

                                                <Grid
                                                  xs={8}
                                                  display="flex"
                                                  justifyContent="flex-start"
                                                >
                                                  {Math.floor(
                                                    items1.details.recipe
                                                      .digest[2].total
                                                  )}{" "}
                                                  protein
                                                </Grid>
                                              </Grid>

                                              <Link
                                                to={items1.details.recipe.url}
                                                target="_blank"
                                              >
                                                <Button
                                                  sx={{
                                                    background: "#E66253",
                                                    color: "#ffffff",
                                                    fontSize: {
                                                      xs: "0.6em", // For extra small screens
                                                      sm: "0.8em", // For small screens
                                                      md: "1.0em", // For medium screens
                                                      lg: "1.0em", // For large screens
                                                    },
                                                    mt: 3,
                                                    borderRadius: 3,
                                                    px: 5,
                                                    "&:hover": {
                                                      backgroundColor:
                                                        "#ffffff",
                                                      color: "#E66253",
                                                      border: 1,
                                                      borderColor: "#E66253",
                                                    },
                                                  }}
                                                >
                                                  Recipe
                                                </Button>
                                              </Link>
                                            </PopupTrigger>
                                            <Popup>
                                              Ingredients
                                              <img
                                                src={items1.image}
                                                width="100"
                                                height="100"
                                              />
                                            </Popup>
                                          </div>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </Box>
                                </Box>
                              ))}
                            </Slider>
                          </Grid>
                          <Grid
                            item
                            xs={0}
                            sm={0}
                            md={1}
                            lg={1}
                            sx={{
                              display: {
                                xs: "none", // Hide on extra small screens
                                sm: "none",
                                md: "block", // Display on small screens and up
                              },
                            }}
                          >
                            {" "}
                            {/* Button container (adjust width as needed) */}
                            <Button
                              onClick={() => handleNextC(index)}
                              sx={{ mt: "235%", background: "#ffffff" }}
                            >
                              <img
                                src="/images/right arrow.png"
                                width="30px"
                                height="30px"
                              />
                            </Button>
                          </Grid>

                          <Typography
                            sx={{
                              color: "#000000",
                              display: {
                                xs: "block", // Hide on extra small screens
                                sm: "block",
                                md: "none",
                              },
                              fontWeight: "bold",
                              mt: 4,
                              mx: "auto",
                            }}
                          >
                            Swipe to See More
                          </Typography>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
                <Grid xs={12} md={1.5}>
                  {" "}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <Box sx={style}>
                      Choose your preferred week:
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          minDate={dayjs()
                            .startOf("week")
                            .endOf("week")
                            .add(1, "day")}
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          showDaysOutsideCurrentMonth
                          displayWeekNumber
                          slots={{ day: Day }}
                          slotProps={{
                            day: (ownerState) => ({
                              selectedDay: value,
                              hoveredDay,
                              onPointerEnter: () => setHoveredDay(null),
                              onPointerLeave: () => setHoveredDay(null),
                            }),
                          }}
                        />
                      </LocalizationProvider>
                      <Button
                        onClick={requestOrder}
                        sx={{
                          background: "#ffffff",
                          color: "#E66253",
                          my: 5,
                          px: 5,
                          py: 1,
                          fontSize: "0.9em",
                          "&:hover": {
                            backgroundColor: "#E66253",
                            color: "#ffffff",
                            border: 1,
                            borderColor: "#ffffff",
                          },
                        }}
                      >
                        Request Meal Plan
                      </Button>
                    </Box>
                  </Modal>
                  <Button
                    sx={{
                      mx: {
                        xs: "auto",
                        md: "auto",
                      },
                      display: "block",
                      // float: "right",
                      background: "#E66253",
                      fontSize: "13px",

                      mt: {
                        xs: "5%",
                        md: "60%",
                      },
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#E66253",
                      },
                    }}
                    onClick={() => handleOpen(item.generatedMeal_id)}
                  >
                    Request To Order
                  </Button>
                </Grid>
              </Grid>
            )
          )}{" "}
          // )) )
        </>
      ) : (
        <>
          {" "}
          <img src="/images/magnify.gif" width="6%" height="15%" />
          <Typography>Loading...</Typography>
        </>
      )}
    </div>
  );
}

export default MealPlanHistory;
