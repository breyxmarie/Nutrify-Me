import { useState, useEffect, useRef } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import AxiosInstance from "../forms/AxiosInstance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Modal, Tab, Tabs } from "@mui/material";
import { useLoggedInUser } from "../LoggedInUserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";


function MealPlanShopMealPlans() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user

  //? sliders
  const sliderRefs = useRef([]);
  const [slidersReady, setSlidersReady] = useState(false);

  const sliderRefC = useRef(null);
  const handleNextC = () => {
    // console.log("handleNextC called with index:", index);
    // if (sliderRefs.current[index]) {
    // console.log("Calling slickNext for slider:", sliderRefs.current[index]);
    sliderRefC.current.slickNext();
    // } else {
    //   // console.error("Slider reference not found for index:", index);
    // }
  };

  const handlePrevC = () => {
    // console.log("handlePrevC called with index:", index);
    // if (sliderRefs.current[index]) {
    // console.log("Calling slickPrev for slider:", sliderRefs.current[index]);
    sliderRefC.current.slickPrev();
    // } else {
    //   //console.error("Slider reference not found for index:", index);
    // }
  };

  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };

  //?

  // ! modal style

  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    display: "flex",
    flexDirection: "column",
    overflowY: "auto", // Enable vertical scrolling
    position: "absolute",
    top: "50%",
    color: "#ffffff",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "90%", // Adjust minimum width as needed
    //bgcolor: "background.paper",
    background: "#E66253",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };
  //!
  const mealPlan = [
    {
      name: "High Protein",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "Vegetarian",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
  ];

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

  // !

  // ! retrieve data
  const currentWeekStart = dayjs(value).startOf("week").format("YYYY-MM-DD");
  const currentWeekEnd = dayjs(value).endOf("week").format("YYYY-MM-DD");
  // console.log(value, currentWeekStart, currentWeekEnd);
  const [shopMealPlan, setShopMealPlan] = useState([
    // {
    //   name: "High Protein",
    //   description: "lorem ipsum",
    //   image: "/images/plan food.png",
    //   price: 50,
    //   quantity: 1,
    //   subtotal: 6,
    //   product: "High Protein",
    // },
    // {
    //   name: "Vegetarian",
    //   description: "lorem ipsum",
    //   image: "/images/plan food.png",
    //   price: 50,
    //   quantity: 1,
    //   subtotal: 6,
    //   product: "Vegetarian",
    // },
  ]);
  const [shopMeal, setShopMeal] = useState();

  const getMealPlanData = () => {
    AxiosInstance.get(`shopmealplan`).then((res) => {
      setShopMealPlan(res.data.filter((item) => item.approve === true));
    });

    // setMealPlanDiv(
    //   <>
    //     {/* <Grid container spacing={2}> */}
    //     {shopMealPlan.map((plan, index) => (
    //       <Grid item xs={3} sm={4} md={6} key={index}>
    //         <img src={plan.image} width="350px" height="350px" />
    //         <Typography variant="body1">{plan.name}</Typography>
    //         <Typography variant="body1">{plan.description}</Typography>

    //         <Button
    //           sx={{
    //             borderRadius: 4,
    //             background: "#D9D9D9",
    //             color: "#000000",
    //             px: 4,
    //             py: 1,
    //           }}
    //         >
    //           ADD TO CART
    //         </Button>

    //         <Button
    //           sx={{
    //             borderRadius: 4,
    //             background: "#D9D9D9",
    //             color: "#000000",
    //             px: 4,
    //             py: 1,
    //           }}
    //           //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
    //           onClick={() => setMealDetails(plan.shop_mealplan_id)}
    //         >
    //           VIEW
    //         </Button>
    //       </Grid>
    //     ))}
    //     {/* </Grid> */}
    //   </>
    // );
  };

  const getMealData = () => {
    AxiosInstance.get(`shopmeal`).then((res) => {
      setShopMeal(res.data);
    });
  };

  //!

  // ! open meal plan modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDetails, setOpenDetails] = React.useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);
  const [selectedMeal, setSelectedMeal] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const openMealPlan = (num) => {
    console.log(shopMeal);

    setSelectedMeal(shopMeal.filter((item) => item.mealplan_id == num));
    console.log(selectedMeal[0]);
    handleOpen();
  };

  //!

  // ! set meal details

  const groupByDay = (data) => {
    const groupedData = {};
    for (const item of data) {
      const day = item.day; // Assuming you have a "day" property in each item
      if (!groupedData[day]) {
        groupedData[day] = [];
      }
      groupedData[day].push(item);
    }

    console.log(data);

    return groupedData;
  };

  const [selectedPlan, setSelectedPlan] = useState([])
  const setMealDetails = (num, planName) => {
    handleOpenDetails()
    setSelectedMeal(shopMeal.filter((item) => item.mealplan_id == num));
    const selects = shopMeal.filter((item) => item.mealplan_id == num);

    const days = groupByDay(selects);
    console.log(days);

    const data = [];

    for (let i = 1; i < 6; i++) {
      console.log("Iteration:", i);
      const meals = [];
      {
        days[i]
          .sort((a, b) => {
            const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
            return order.indexOf(a.type) - order.indexOf(b.type);
          })
          .map((item, index) => meals.push(item));
      }

      data.push({ day: i, meal: meals });
    }

    console.log(data);
    setSelectedPlan(data)
    setMealDetailsDiv(
      // <Box>
      //   {selectedMeal ? (
      //     <Box>
      //       {selectedMeal && selects[0].shop_meal_id}

      //       {Object.keys(days).map(
      //         (day) => (
      //           (<Typography>{day}</Typography>),
      //           days[day].map((item) => (console.log(item), console.log("did")))
      //         )
      //       )}
      //     </Box>
      //   ) : (
      //     <Typography sx={{ color: "#000000" }}>Loading...</Typography>
      //   )}
      // </Box>

      <Box
        sx={{
          ml: 7,
          border: 3,
          borderColor: "#898246",
          borderRadius: 4,
          pb: 3,
        }}
      >
        <Typography
          sx={{ color: "#898246", fontWeight: "bold", fontSize: "2em" }}
        >
          {planName}
        </Typography>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* {console.log(item)} */}
          <Grid
            item
            xs={0}
            sm={1}
            md={1}
            lg={1}
            sx={{
              display: {
                xs: "none", // Hide on extra small screens
                sm: "block",
                md: "block", // Display on small screens and up
              },
            }}
          >
            <Button
              onClick={() => handlePrevC()}
              sx={{ mt: "115%", background: "#ffffff" }}
            >
              <img src="/images/left arrow.png" width="30px" height="30px" />
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Slider
              {...settings}
              ref={sliderRefC}
              sx={{
                color: "#000000",
                border: 1,
                borderColor: "#000000",
              }}
            >
              {data.map((item) => (
                <Box
                  sx={{
                    mx: {
                      xs: "20%", // For extra small screens
                      sm: "10%", // For small screens
                      md: "8%", // For medium screens (default)
                      lg: "8%", // For large screens
                      xl: "8%", // For extra large screens
                    },
                  }}
                >
                 

                  <Typography
                    sx={{
                      color: "#898246",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      mr: "30%",
                    }}
                  >
                    Day {item.day}
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {item.meal.map((items, index) => (
                      <Grid
                        xs={12}
                        sm={12}
                        md={6}
                        key={index}
                        sx={{ my: "10%" }}
                      >
                        <Typography>{items.type}</Typography>
                        <br />

                        <Grid container spacing={2} xs={{ mt: 10 }}>
                          <Grid xs={5}>
                            <img src={items.image} width="100%" height="100%" />
                          </Grid>
                          <Grid xs={5}>{items.food}</Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Slider>
          </Grid>
          <Grid
            item
            xs={0}
            sm={1}
            md={1}
            lg={1}
            sx={{
              display: {
                xs: "none", // Hide on extra small screens
                sm: "block",
                md: "block", // Display on small screens and up
              },
            }}
          >
            {" "}
            {/* Button container (adjust width as needed) */}
            <Button
              onClick={() => handleNextC()}
              sx={{ mt: "80%", background: "#ffffff" }}
            >
              <img src="/images/right arrow.png" width="30px" height="30px" />
            </Button>
          </Grid>
        </Grid>

        <Typography
          sx={{
            color: "#000000",
            display: {
              xs: "block", // Hide on extra small screens
              sm: "none",
            },
            fontWeight: "bold",
            mt: 4,
          }}
        >
          Swipe to See More
        </Typography>

        {/* {days.map((item, index) => (
          <>hi</>
        ))} */}
        {/* {Object.keys(days).map((day, index) => (
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Button
                onClick={() => handlePrevC(index)}
                sx={{ mt: "235%", background: "#ffffff" }}
              >
                <img src="/images/left arrow.png" width="30px" height="30px" />
              </Button>
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
                <Typography key={day}>{day}</Typography>

                <Grid container spacing={2} sx={{ my: 2 }}>
                  {days[day]
                    .sort((a, b) => {
                      const order = ["breakfast", "lunch", "snack", "dinner"];
                      return order.indexOf(a.type) - order.indexOf(b.type);
                    })
                    .map((item, index) => (
                      <Box>
                        <Grid xs={3} sm={4} md={6} sx={{ mx: 2 }} key={index}>
                          <Grid></Grid>
                          <Grid></Grid>
                        </Grid>
                      </Box>
                    ))}
                </Grid>
              </Slider>
            </Grid>
            <Grid item xs={1}>
           
              <Button
                onClick={() => handleNextC(index)}
                sx={{ mt: "235%", background: "#ffffff" }}
              >
                <img src="/images/right arrow.png" width="30px" height="30px" />
              </Button>
            </Grid>
          </Grid>
        ))} */}
        {/*  */}
        {/* {Object.keys(days).map((day) => (
          <>
            <Typography key={day}>{day}</Typography>

            <Grid container spacing={2} sx={{ my: 2 }}>
              {days[day]
                .sort((a, b) => {
                  const order = ["breakfast", "lunch", "snack", "dinner"];
                  return order.indexOf(a.type) - order.indexOf(b.type);
                })
                .map((item, index) => (
                  <Box>
                    <Grid xs={3} sm={4} md={6} sx={{ mx: 2 }} key={index}>
                      <Grid>
                        {" "}
                        <Typography>{item.type}</Typography>
                      </Grid>
                      <Grid>
                        <Typography>{item.food}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </Grid>
          </>
        ))} */}
      </Box>
    );
  };

  // ! cart functions
  const [userCart, setUserCart] = useState([]);

  const getCartData = () => {
    AxiosInstance.get(`cart`).then((res) => {
      setUserCart(
        res.data.filter((item) => item.user_id == loggedInUser.user_id)
      );
    });

    if (userCart.length !== 0) {
      console.log(userCart);
    } else {
      console.log("no cart");
    }
  };

  const addToCart = (num) => {
    const tempnum = 65;
    if (userCart.length !== 0) {
      console.log(userCart);
      //  AxiosInstance.get(`cart/` + userCart[0].cart_id).then((res) => {
      // console.log(res.data);
      try {
        AxiosInstance.put(`cart/`, {
          cart_id: userCart[0].cart_id,
          user_id: userCart[0].user_id,
          orders: userCart[0].orders.concat(num),

          //image: data.type, dito get yun details for res chuchu and update add na si meal plan
        }).then((res) => {
          console.log(res, res.data);
          toast.success("Added to Cart");
        });
      } catch (error) {
        console.log(error);
      }
      //  });
    } else {
      console.log("no cart talaga");

      try {
        AxiosInstance.post(`cart/`, {
          user_id: loggedInUser.user_id,
          orders: [num],
        }).then((res) => {
          toast.success("Added to Cart");
          console.log(res, res.data);
          getCartData();
        });
      } catch (error) {
        console.log(error.response);
      }
    }

    AxiosInstance.get(`cart`).then((res) => {
      setShopMeal(res.data);
    });
  };

  //!

  const [mealDetailsDiv, setMealDetailsDiv] = useState(<Box>Details</Box>);

  //! meal plan div
  const [mealPlanDiv, setMealPlanDiv] = useState(
    <>
      {/* <Grid container spacing={2}> */}
      <Grid container spacing={2}>
        {shopMealPlan
          .filter(
            (item) =>
              item.start_week ==
              dayjs(value).startOf("week").format("YYYY-MM-DD")
          )
          .map((plan, index) => (
            <Grid item xs={3} sm={4} md={6} key={index}>
              <img src={plan.image} width="350px" height="350px" />
              <Typography variant="body1">{plan.name}</Typography>
              <Typography variant="body1">{plan.description}</Typography>

              <Button
                sx={{
                  borderRadius: 4,
                  background: "#E66253",
                  color: "#ffffff",
                  ml: 2,
                  height: "100%",
                  px: 2,
                  py: 1,
                  fontSize: "15px",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 1,
                  },
                }}
                onClick={() => addToCart(plan.shop_mealplan_id)}
              >
                ADD TO CART
              </Button>
              {console.log(plan.name, index)}
              <Button
                sx={{
                  borderRadius: 4,
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
                //  onClick={() => openMealPlan(plan.shop_mealplan_id)} plan.shop_mealplan_id,
                onClick={() => setMealDetails(plan.shop_mealplan_id, plan.name)}
              >
                VIEW
              </Button>
            </Grid>
          ))}
      </Grid>
      {/* </Grid> */}
    </>
  );

  //!

  useEffect(() => {
    if (shopMealPlan.length === 0) {
      getMealPlanData();
    }
    setMealPlanDiv(
      <>
        {/* <Grid container spacing={2}> */}
        {shopMealPlan === null ? (
          <></>
        ) : (
          <>
            <Grid container={2} sx={{ mx: "5%", mt: "5%" }}>
              {shopMealPlan
                .filter(
                  (item) =>
                    item.start_week ==
                    dayjs(value).startOf("week").format("YYYY-MM-DD")
                )
                .map((plan, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    key={index}
                    sx={{
                      mb: {
                        xs: "45%", // For extra small screens
                        sm: "18%", // For small screens
                        md: "10%", // For medium screens (default)
                        lg: "6%", // For large screens
                        xl: "7%", // For extra large screens
                      },
                    }}
                  >
                    <img src={plan.image} width="20%" height="50%" />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#99756E",
                        fontWeight: "bold",
                        fontSize: "1.5em",
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography sx={{ mx: "20%" }}>
                      {plan.description}
                    </Typography>
                    <Typography variant="body1">PHP {plan.price}</Typography>
                    <Button
                      sx={{
                        borderRadius: 4,
                        background: "#D9D9D9",
                        color: "#000000",
                        ml: 2,

                        px: 2,
                        py: 1,
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: 1,
                        },
                      }}
                      onClick={() => addToCart(plan.shop_mealplan_id)}
                    >
                      ADD TO CART
                    </Button>
                    <Button
                      sx={{
                        borderRadius: 4,
                        background: "#E66253",
                        color: "#ffffff",
                        ml: 2,

                        px: 2,
                        py: 1,
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: "#E66253",
                          border: 1,
                        },
                      }}
                      //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
                      onClick={() =>
                        setMealDetails(plan.shop_mealplan_id, plan.name)
                      }
                    >
                      VIEW
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        {/* </Grid> */}
      </>
    );
  }, [shopMealPlan, value]);
  //!

  // ! use Effect
  useEffect(() => {
    // getMealPlanData();
    getCartData();
    getMealData();
    if (shopMealPlan.length === 0) {
      getMealPlanData();
    }
  }, []);

  //!

  return (
    <div
      className="content"
      style={{
        paddingBottom: "0px",
        marginBottom: "80px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedMeal ? (
            <Box>{selectedMeal && selectedMeal[0]?.shop_meal_id}</Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>

      <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {selectedPlan.map((item) => (
          <><center><Typography sx = {{fontWeight: "bold"}}>Day {item.day}</Typography> </center><br/>
          <Grid container spacing={2} sx={{ mt: 0 }}>
          {item.meal .sort((a, b) => {
            const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
            return order.indexOf(a.type) - order.indexOf(b.type);
          }).map((items, index) => (
            
           
               <Grid
                        xs={12}
                        sm={12}
                        md={6}
                        key={index}
                        sx={{ my: 0 }}
                      >
                        <center>
            {items.type}<br/>
            <img src={items.image} width="30%" height="50%" />
            <br/>
            {items.food}
            </center>
            </Grid>
           
          ))
          }   
           </Grid>       </>
         ))}
        
        </Box>
      </Modal>

      {/* <Box
        sx={{
          backgroundImage: "url('/images/shop.png')",
          ml: "4%",
          mr: "4%",
          width: "92.5%",
          borderRadius: 3,
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "500px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box> */}

      <Box>
        <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "1.5em", // For small screens
              md: "2.0em", // For medium screens
              lg: "2.5em", // For large screens
            },
            p: 5,
          }}
        >
          MEAL PLANS OFFERED
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={7}>
            {/* {mealDetailsDiv} */}
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
                          > <Button
                          onClick={() => handlePrevC()}
                          sx={{ mt: "235%", background: "#ffffff" }}
                        >
                          <img
                            src="/images/left arrow.png"
                            width="30px"
                            height="30px"
                          />
                        </Button></Grid>
                        <Grid item xs={12} md={10}>
                        <Slider
              {...settings}
              ref={sliderRefC}
              sx={{
                color: "#000000",
                border: 1,
                borderColor: "#000000",
              }}
            > {shopMealPlan
              .filter(
                (item) =>
                  item.start_week ==
                  dayjs(value).startOf("week").format("YYYY-MM-DD")
              )
              .map((plan, index) => (
                <Grid
                //  item
                  xs={8}
                  sm={8}
                  md={6}
                 key={index}
                 //!
                 // key={plan.shop_mealplan_id}
                  sx={{
                    mb: {
                      xs: "45%", // For extra small screens
                      sm: "18%", // For small screens
                      md: "10%", // For medium screens (default)
                      lg: "6%", // For large screens
                      xl: "7%", // For extra large screens
                    },
                  }}
                >
                  <center>
                  <img src={plan.image} width="60%" height="30%" />
                  </center>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#99756E",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "1em", // For extra small screens
                        sm: "1.0em", // For small screens
                        md: "1.0em", // For medium screens
                        lg: "1.5em", // For large screens
                      },
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography
                    sx={{
                      mx: "0%",
                      fontSize: {
                        xs: "0.8em", // For extra small screens
                        sm: "1.0em", // For small screens
                        md: "1.0em", // For medium screens
                        lg: "1.0em", // For large screens
                      },
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <Typography variant="body1">
                    PHP {plan.price}
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: 4,
                      background: "#D9D9D9",
                      color: "#000000",
                      ml: 2,
                      px: 2,
                      py: 1,
                      fontSize: {
                        xs: "0.5em", // For extra small screens
                        sm: "0.5em", // For small screens
                        md: "0.8em", // For medium screens
                        lg: "0.8em", // For large screens
                      },
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        border: 1,
                      },
                    }}
                    onClick={() => addToCart(plan.shop_mealplan_id)}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    sx={{
                      borderRadius: 4,
                      background: "#E66253",
                      color: "#ffffff",
                      ml: 2,

                      px: 2,
                      py: 1,
                      fontSize: {
                        xs: "0.5em", // For extra small screens
                        sm: "0.5em", // For small screens
                        md: "0.8em", // For medium screens
                        lg: "0.8em", // For large screens
                      },
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#E66253",
                        border: 1,
                      },
                    }}
                    //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
                    onClick={() =>
                      setMealDetails(plan.shop_mealplan_id, plan.name)
                    }
                  >
                    VIEW
                  </Button>
                  <Typography
          sx={{
            color: "#000000",
            display: {
              xs: "block", // Hide on extra small screens
              sm: "none",
            },
            fontWeight: "bold",
            mt: 4,
          }}
        >
          Swipe to See More
        </Typography>
                </Grid>
              ))}</Slider> </Grid>
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
                              onClick={() => handleNextC()}
                              sx={{ mt: "235%", background: "#ffffff" }}
                            >
                              <img
                                src="/images/right arrow.png"
                                width="30px"
                                height="30px"
                              />
                            </Button>
                          </Grid>
            </Grid>
          </Grid>
      
          <Grid
            xs={12}
            sm={12}
            md={5}
            display="flex"
            justifyContent="flex-start"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                showDaysOutsideCurrentMonth
                displayWeekNumber
                slots={{ day: Day }}
                slotProps={{
                  day: (ownerState) => ({
                    selectedDay: value,
                    hoveredDay,
                    onPointerEnter: () => setHoveredDay(ownerState.day),
                    onPointerLeave: () => setHoveredDay(null),
                  }),
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* <Grid container spacing={2}>
          {shopMealPlan.length === 0 ? (
            <Typography>Loading...</Typography>
          ) : (
            // <>{mealPlanDiv}</>
            <>
              {shopMealPlan === null ? (
                <></>
              ) : (
                <>
                  <Grid container={2} sx={{ mx: "5%", mt: "5%" }}>
                    {shopMealPlan
                      .filter(
                        (item) =>
                          item.start_week ==
                          dayjs(value).startOf("week").format("YYYY-MM-DD")
                      )
                      .map((plan, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          key={index}
                          sx={{
                            mb: {
                              xs: "45%", // For extra small screens
                              sm: "18%", // For small screens
                              md: "10%", // For medium screens (default)
                              lg: "6%", // For large screens
                              xl: "7%", // For extra large screens
                            },
                          }}
                        >
                          <img src={plan.image} width="20%" height="50%" />
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: {
                                xs: "1em", // For extra small screens
                                sm: "1.0em", // For small screens
                                md: "1.0em", // For medium screens
                                lg: "1.5em", // For large screens
                              },
                            }}
                          >
                            {plan.name}
                          </Typography>
                          <Typography
                            sx={{
                              mx: "20%",
                              fontSize: {
                                xs: "0.8em", // For extra small screens
                                sm: "1.0em", // For small screens
                                md: "1.0em", // For medium screens
                                lg: "1.0em", // For large screens
                              },
                            }}
                          >
                            {plan.description}
                          </Typography>
                          <Typography variant="body1">
                            PHP {plan.price}
                          </Typography>
                          <Button
                            sx={{
                              borderRadius: 4,
                              background: "#D9D9D9",
                              color: "#000000",
                              ml: 2,

                              px: 2,
                              py: 1,
                              fontSize: {
                                xs: "0.5em", // For extra small screens
                                sm: "0.5em", // For small screens
                                md: "0.8em", // For medium screens
                                lg: "0.8em", // For large screens
                              },
                              "&:hover": {
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                border: 1,
                              },
                            }}
                            onClick={() => addToCart(plan.shop_mealplan_id)}
                          >
                            ADD TO CART
                          </Button>
                          <Button
                            sx={{
                              borderRadius: 4,
                              background: "#E66253",
                              color: "#ffffff",
                              ml: 2,

                              px: 2,
                              py: 1,
                              fontSize: {
                                xs: "0.5em", // For extra small screens
                                sm: "0.5em", // For small screens
                                md: "0.8em", // For medium screens
                                lg: "0.8em", // For large screens
                              },
                              "&:hover": {
                                backgroundColor: "#ffffff",
                                color: "#E66253",
                                border: 1,
                              },
                            }}
                            //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
                            onClick={() =>
                              setMealDetails(plan.shop_mealplan_id, plan.name)
                            }
                          >
                            VIEW
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid> */}
      </Box> 
    </div>
  );
}

export default MealPlanShopMealPlans;
