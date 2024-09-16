import { useState, useEffect, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TelemedicineMealPlans() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();

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

  //?
  // ? get Data
  const [mealData, setMealData] = useState([]);
  const [nutritionist, setNutritionist] = useState([]);
  const [mealPlanData, setMealPlanData] = useState([]);

  const getMealData = () => {
    let finalMeal = {
      MealName: "",
      meals: {
        day: "",
        meal: [],
      },
    };
    let tempOrder = [];
    let tempSet = [];
    let temp = [];

    let TempMealPlan = [];

    AxiosInstance.get(`nutritionist`).then((res) => {
      setNutritionist(res.data);
      console.log(res.data);
    });

    AxiosInstance.get(`recommendmealplan`).then((res) => {
      setMealPlanData(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );

      temp = res.data.filter((items) => items.user_id == loggedInUser.user_id);
    });

    AxiosInstance.get(`recommendmeal`).then((respo) => {
      let tempMealstalaga = [];
      console.log(respo);
      temp.forEach((item) => {
        let tempMealDay = [];
        //   tempMealstalaga.push(
        //   respo.data.filter(
        //     (items) => items.recommend_mealplan_id === item.recommend_mealplan_id
        //   )
        // )

        let data = respo.data.filter(
          (items) => items.recommend_mealplan_id === item.recommend_mealplan_id
        );

        for (let i = 1; i < 6; i++) {
          let tempRes = respo.data
            .filter((items) => parseInt(items.day) === i)
            .sort((a, b) => {
              const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
              return order.indexOf(a.type) - order.indexOf(b.type);
            });
          tempMealDay.push({
            day: i,
            meals: tempRes,
          });
        }
        console.log(tempMealDay);
        tempMealstalaga.push({
          MealName: item.name,
          meals: tempMealDay,
          nutritionist: item.nutritionist_id,
        });
      });
      console.log(tempMealstalaga);

      setMealData(tempMealstalaga);
      console.log(tempMealstalaga);
    });
  };

  useEffect(() => {
    getMealData();
  }, []);
  //?
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "8%",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      <Typography>Generated Meal Plans by your Nutritionist</Typography>

      <br />
      {mealData.map((item, index) => (
        <Box sx={{ ml: "5%" }}>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <Accordion>
                <AccordionSummary>
                  Meal Name: {item.MealName} <br />
                  By: Nutritionist{" "}
                  {console.log(
                    item.nutritionist_id_id,
                    nutritionist.find(
                      (items) => items.nutritionist_id === item.nutritionist
                    )
                  )}
                  {
                    nutritionist.find(
                      (items) => items.nutritionist_id === item.nutritionist
                    )?.first_name
                  }
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid xs={1}>
                      {" "}
                      <Button
                        onClick={() => handlePrevC(index)}
                        sx={{ mt: "100%", background: "#ffffff" }}
                      >
                        <img
                          src="/images/left arrow.png"
                          width="30px"
                          height="30px"
                        />
                      </Button>
                    </Grid>
                    <Grid xs={10}>
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
                        {item.meals.map((items, index) => (
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
                                {item.day}
                              </Typography>

                              <Grid container spacing={2} sx={{ mx: "0%" }}>
                                {items.meals.map((items1) => (
                                  <Grid item xs={6} sm={3} md={3} key={index}>
                                    <div className="parent-div">
                                      <Typography>{items1.Meal}</Typography>
                                      <center>
                                        {/* <img
                                      src={items1.image}
                                      width="100"
                                      height="100"
                                    /> */}
                                      </center>
                                      <Typography sx={{ mx: "5%" }}>
                                        {items1.food}
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
                                          {Math.floor(items1.calories)} calories
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
                                          {Math.floor(items1.carbs)} carbs
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
                                          {Math.floor(items1.fat)} fats
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
                                          {Math.floor(items1.protein)} protein
                                        </Grid>
                                      </Grid>

                                      {/* <Link
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
                                                  backgroundColor: "#ffffff",
                                                  color: "#E66253",
                                                  border: 1,
                                                  borderColor: "#E66253",
                                                },
                                              }}
                                            >
                                              Recipe
                                            </Button>
                                          </Link> */}
                                    </div>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </Box>
                        ))}
                      </Slider>
                    </Grid>
                    <Grid xs={1}>
                      <Button
                        onClick={() => handleNextC(index)}
                        sx={{ mt: "100%", background: "#ffffff" }}
                      >
                        <img
                          src="/images/right arrow.png"
                          width="30px"
                          height="30px"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <Typography>{item.MealName}</Typography> */}
                  {/* <Grid container spacing={2}>
                    {item.meals.map((item1) => (
                      <Grid xs={6}>
                        <Box sx={{ mt: 4 }}>
                          Day {item1.day}
                          <Grid container spacing={2}>
                            {item1.meals.map((item3) => (
                              <Grid xs={6}>
                                <Box sx={{ mx: 2, mt: 4 }}>
                                  {item3.type} <br />
                                  {item3.food}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                  </Grid> */}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}>
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
                    md: "0%",
                  },
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                  },
                }}
                // onClick={() => requestOrder(item.generatedMeal_id)}
              >
                Request To Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

export default TelemedicineMealPlans;
