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

function MealPlanHistory() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  // ? get Data
  const [mealData, setMealData] = useState([]);

  const getMealData = () => {
    AxiosInstance.get(`generatedmeal`).then((res) => {
      setMealData(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );
      console.log(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );
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
    console.log("handleNextC called with index:", index);
    if (sliderRefs.current[index]) {
      console.log("Calling slickNext for slider:", sliderRefs.current[index]);
      sliderRefs.current[index].slickNext();
    } else {
      console.error("Slider reference not found for index:", index);
    }
  };

  const handlePrevC = (index) => {
    console.log("handlePrevC called with index:", index);
    if (sliderRefs.current[index]) {
      console.log("Calling slickPrev for slider:", sliderRefs.current[index]);
      sliderRefs.current[index].slickPrev();
    } else {
      console.error("Slider reference not found for index:", index);
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
  const requestOrder = (id) => {
    //Requested
    //Pending
    //Approved
    //Disapproved
    try {
      AxiosInstance.post(`requestedmeals/`, {
        user_id: loggedInUser.user_id,
        generatedMeal_id: id,
        date: dayjs().format("YYYY-MM-DD"),
        status: "Pending",
      }).then((res) => {
        console.log(res, res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "100px",
        fontFamily: "Poppins",
      }}
    >
      <Typography>Generated Meal Plan History</Typography>
      {mealData.map(
        (item, index) => (
          //  item.meal.map((items) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Grid container spacing={2} sx={{ mx: "10%", mt: 5 }}>
                <Grid xs={6}>
                  {" "}
                  <Grid container spacing={2} sx={{ mx: 0 }}>
                    <Grid xs={6}>
                      {" "}
                      <img
                        src={item.meal[0].meals[0].details.recipe.image}
                        width="100"
                        height="100"
                      />{" "}
                      <br />
                      <img
                        src={item.meal[0].meals[0].details.recipe.image}
                        width="100"
                        height="100"
                      />
                    </Grid>
                    <Grid xs={1}>
                      {" "}
                      <img
                        src={item.meal[0].meals[0].details.recipe.image}
                        width="100"
                        height="100"
                      />
                      <br />
                      <img
                        src={item.meal[0].meals[0].details.recipe.image}
                        width="100"
                        height="100"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={2}>
                  {" "}
                  <Typography>{item.name}</Typography>
                  <Typography>{item.date}</Typography>
                  <br />
                  <br />
                  <br />
                  <Button
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
                  </Button>
                </Grid>
                <Grid xs={4} sx={{ float: "right" }}>
                  Age: {item.age} <br />
                  Weight: {item.weight} <br />
                  Height: {item.height} <br />
                  Activity: {item.activity} <br />
                  Goal: {item.goal}
                  <br />
                  Allergen: {item.allergen} <br />
                  Diet: {item.diet} <br />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.name}</Typography>
              <Typography>{item.date}</Typography>

              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <button
                    onClick={() => handlePrevC(index)}
                    style={{ marginTop: "80%" }}
                  >
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
                    {item.meal.map((items) => console.log(items))}
                    {item.meal.map((items, index) => (
                      <Box key={index} onClick={() => handleSlideClick(item)}>
                        <Box
                          sx={{
                            color: "#000000",
                            border: 3,
                            borderColor: "#898246",
                            borderRadius: 3,
                            ml: "230px",
                            mr: "230px",
                          }}
                        >
                          {items.Day}

                          <Grid container spacing={2}>
                            {items.meals.map((items1) => (
                              <Grid item xs={3} sm={3} md={3} key={index}>
                                <div className="parent-div">
                                  <PopupTrigger>
                                    <Typography>{items1.Meal}</Typography>
                                    <img
                                      src={items1.details.recipe.image}
                                      width="100"
                                      height="100"
                                    />
                                    {items1.details.recipe.label}
                                  </PopupTrigger>
                                  <Popup>
                                    Ingredients
                                    <img
                                      src={items1.details.recipe.image}
                                      width="100"
                                      height="100"
                                    />
                                  </Popup>
                                </div>
                              </Grid>
                            ))}
                          </Grid>

                          <Grid>
                            {/* <img
                              src={item.image}
                              width="140"
                              height="140"
                              style={{ marginLeft: 10 }}
                            /> */}
                          </Grid>

                          <Grid>
                            <img
                              src="/images/star.png"
                              width="10"
                              height="10"
                              style={{ marginLeft: 10 }}
                            />
                            <Typography sx={{ color: "#000000" }}></Typography>
                          </Grid>
                        </Box>
                      </Box>
                    ))}
                  </Slider>
                </Grid>
                <Grid item xs={1}>
                  {" "}
                  {/* Button container (adjust width as needed) */}
                  <button
                    onClick={() => handleNextC(index)}
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
            </AccordionDetails>
          </Accordion>
        )
        //  ))
      )}
    </div>
  );
}

export default MealPlanHistory;
