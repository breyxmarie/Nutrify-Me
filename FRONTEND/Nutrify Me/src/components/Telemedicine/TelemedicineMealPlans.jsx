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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";



function TelemedicineMealPlans() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();


  // ! weekly calendar
  dayjs.extend(isBetweenPlugin);

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
  })(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main,
      },
    }),
    ...(isHovered && {
      backgroundColor: theme.palette.primary[theme.palette.mode],
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary[theme.palette.mode],
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
  

  const [chosen, setChosen] = useState()
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    console.log(data, "hi")
    setChosen(data)
    
    setOpen(true)};
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
          let tempRes = data
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
        console.log(tempMealDay, item);
        tempMealstalaga.push({
          recommend_mealplan_id: item.recommend_mealplan_id,
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

  //! order
const requestOrder = () => {
  const currentWeekStart = dayjs(value).startOf("week").format("YYYY-MM-DD");
  const currentWeekEnd = dayjs(value).endOf("week").format("YYYY-MM-DD");

  console.log(currentWeekStart, currentWeekEnd)
  try {
    AxiosInstance.post(`requestedrecommendmeals/`, {
    meal: chosen.meals,
    date:dayjs().format("YYYY-MM-DD"),
    status: "Pending",
    start_week: currentWeekStart,
    end_week: currentWeekEnd,
    recommend_mealplan_id: chosen.recommend_mealplan_id,
    user_id: loggedInUser.user_id,
    price: 0,
    }).then((res) => {
       console.log(res, res.data);
      toast.success("Request Sent");
      handleClose()
    });
  } catch (error) {
    console.log(error);
  }
}

  //!
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
{console.log(mealData)}
      <br />
      {mealData.map((item, index) => (
        <Box sx={{ ml: "5%",mr: "5%", mt: 3, border: 1, pt: 2 }}>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <Accordion sx={{  border: 1 }}>
                <AccordionSummary   expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
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
                              <Typography sx={{ fontWeight: "bold", color: "#99756E" }}>
                                Day {items.day}
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
                  minDate={dayjs().startOf('week').endOf('week').add(1, 'day')}
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
                  <Button onClick={requestOrder}      sx={{
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
                  }}>Request Meal Plan</Button>
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
                    md: "8%",
                  },
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                  },
                }}
                onClick={() => handleOpen(item)}
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
