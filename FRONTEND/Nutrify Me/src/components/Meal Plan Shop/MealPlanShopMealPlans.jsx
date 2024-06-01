import { useState, useEffect } from "react";
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

function MealPlanShopMealPlans() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  // ! modal style

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

  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs());

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
      setShopMealPlan(res.data);
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

  const setMealDetails = (num) => {
    setSelectedMeal(shopMeal.filter((item) => item.mealplan_id == num));
    const selects = shopMeal.filter((item) => item.mealplan_id == num);

    const days = groupByDay(selects);

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

      <Box sx={{ ml: 10 }}>
        hi
        {Object.keys(days).map((day) => (
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
        ))}
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
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
              >
                ADD TO CART
              </Button>

              <Button
                sx={{
                  borderRadius: 4,
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
                //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
                onClick={() => setMealDetails(plan.shop_mealplan_id)}
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
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
                onClick={() => addToCart(plan.shop_mealplan_id)}
              >
                ADD TO CART
              </Button>

              <Button
                sx={{
                  borderRadius: 4,
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
                //  onClick={() => openMealPlan(plan.shop_mealplan_id)}
                onClick={() => setMealDetails(plan.shop_mealplan_id)}
              >
                VIEW
              </Button>
            </Grid>
          ))}
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
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
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
      <Box
        sx={{
          backgroundImage: "url('/images/shop.png')",
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

      <Box>
        <Typography
          sx={{ color: "#99756E", fontWeight: "bold", fontSize: "50px", p: 5 }}
        >
          MEAL PLANS OFFERED
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={6}>{mealDetailsDiv}</Grid>
          <Grid xs={6}>
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

        <Grid container spacing={2}>
          {shopMealPlan.length === 0 ? (
            <Typography>Loading...</Typography>
          ) : (
            <>{mealPlanDiv}</>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default MealPlanShopMealPlans;
