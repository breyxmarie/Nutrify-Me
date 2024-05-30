import { useState } from "react";
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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

function MealPlanShopMealPlans() {
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
  console.log(value, currentWeekStart, currentWeekEnd);

  const getMealPlanData = () => {
    AxiosInstance.get(``).then((res) => {
      setUsers(res.data);
    });
  };

  const getMealData = () => {
    AxiosInstance.get(``).then((res) => {
      setUsers(res.data);
    });
  };
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
        <Grid container spacing={2}>
          {mealPlan.map((plan, index) => (
            <Grid item xs={3} sm={4} md={6} key={index}>
              <img src={plan.image} width="350px" height="350px" />
              <Typography variant="body1">{plan.name}</Typography>
              <Typography variant="body1">{plan.description}</Typography>

              <Link
                to={"/meal-plan-shop-cart"}
                state={{
                  // product: plan.product,
                  // price: plan.price,
                  // quantity: plan.quantity,
                  // subtotal: plan.subtotal,
                  // image: plan.image,

                  addCart: plan,
                }}
              >
                <Button
                  sx={{
                    borderRadius: 4,
                    background: "#D9D9D9",
                    color: "#000000",
                    px: 4,
                    py: 1,
                  }}
                >
                  ORDER NOW
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default MealPlanShopMealPlans;
