import MealPlanShopNavBar from "../NavBars/MealPlanShopNavBar";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";

function MealPlanShopTrackOrders() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  const [orderData, setOrderData] = useState([]);
  const [onGoingOrder, setOnGoingOrder] = useState([]);
  const [pastOrder, setPastOrder] = useState([]);
  const [planData, setPlanData] = useState([]);

  const getOrderData = async () => {
    console.log(dayjs().startOf("week").format("YYYY-MM-DD"));

    console.log(
      dayjs("2024-08-25").isBetween(
        dayjs().startOf("week"),
        dayjs().endOf("week"),
        "day",
        "()"
      )
    );

    try {
      const response = await AxiosInstance.get(`order`);
      const filteredData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      const filteredOnGoingData = filteredData.filter((item) => {
        const checkDate = dayjs(item.schedule_date[0]);
        const weekStart = dayjs().startOf("week"); // Add 1 day to skip Monday
        const weekEnd = dayjs().endOf("week"); // Subtract 1 day to skip Sunday
        console.log(weekStart);
        return checkDate.isBetween(weekStart, weekEnd, "day");
      });

      setOnGoingOrder(filteredOnGoingData);

      const filteredPastOrderData = filteredData.filter((item) => {
        const checkDate = dayjs(item.schedule_date[0]);
        const weekStart = dayjs().startOf("week"); // Add 1 day to skip Monday
        const weekEnd = dayjs().endOf("week"); // Subtract 1 day to skip Sunday
        console.log(weekStart);
        return !checkDate.isBetween(weekStart, weekEnd, "day");
      });
      //  setPastOrder(filteredPastOrderData);
      // console.log(filteredPastOrderData);
      const reverse = filteredPastOrderData.reverse();

      setPastOrder(reverse);
      //  console.log(reverse);
      // setOrderData(reverse);

      const responseCart = await AxiosInstance.get(`shopmealplan`);
      const filteredCartData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      console.log(responseCart.data);
      setPlanData(responseCart.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const order = [
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "75840",
      image: "/images/food.png",
      status: "Order Confirmed",
      courier: "[courier]",
      deliveryDate: "12/15/2023",
      trackNum: "2SR7-P3J0-DFGT",
      shipLink: "https://www.shipmenttracking.com/182i333i29",
      quantity: 2,
      items: [
        { name: " lorem1 ", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem2", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem3", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem4", quantity: 2, price: 23, image: "/images/food.png" },
      ],
      totalPrice: 1000,
      shippingPrice: 80,
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "65840",
      image: "/images/food.png",
      status: "Order Confirmed",
      courier: "[courier]",
      deliveryDate: "12/15/2023",
      trackNum: "2SR7-P3J0-DFGT",
      shipLink: "https://www.shipmenttracking.com/182i333i29",
      quantity: 2,
      items: [
        { name: " lorem1 ", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem2", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem3", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem4", quantity: 2, price: 23, image: "/images/food.png" },
      ],
      totalPrice: 1000,
      shippingPrice: 80,
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "15840",
      image: "/images/food.png",
      status: "Shipping",
      courier: "[courier]",
      deliveryDate: "12/15/2023",
      trackNum: "2SR7-P3J0-DFGT",
      shipLink: "https://www.shipmenttracking.com/182i333i29",
      quantity: 2,
      items: [
        { name: " lorem1 ", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem2", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem3", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem4", quantity: 2, price: 23, image: "/images/food.png" },
      ],
      totalPrice: 1000,
      shippingPrice: 80,
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "55840",
      image: "/images/food.png",
      status: "Delivered",
      courier: "[courier]",
      deliveryDate: "12/15/2023",
      trackNum: "2SR7-P3J0-DFGT",
      shipLink: "https://www.shipmenttracking.com/182i333i29",
      quantity: 2,
      items: [
        { name: " lorem1 ", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem2", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem3", quantity: 2, price: 23, image: "/images/food.png" },
        { name: " lorem4", quantity: 2, price: 23, image: "/images/food.png" },
      ],
      totalPrice: 1000,
      shippingPrice: 80,
    },
  ];

  function getColor(status) {
    switch (status) {
      case "Ordered":
        return "#F8E753";
      case "On-Going":
        return "#36FF24";
      case "Order Done":
        return "#E66253";
      default:
        return "#0096FF";
    }
  }
  //console.log(order.items.name);
  // {
  //   order.map((itemData) =>
  //     itemData.items.map((item, index) => console.log("try " + item.quantity))
  //   );
  // }

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {" "}
      <Typography
        sx={{ color: "#99756E", fontSize: "20px", fontWeight: "bold", m: 5 }}
      >
        MY ORDERS
      </Typography>
      {/* {planData.length > 0 ? (
        <>
          {" "}
          hi
          {console.log(
            planData.filter((item) => item.shop_mealplan_id === 35),
            "hi"
          )}
        </>
      ) : (
        <> hello</>
      )} */}
      On Going
      {onGoingOrder.reverse().map((item, index) => (
        <Box
          sx={{
            border: 1,
            ml: "5%",
            mr: "5%",
            p: 5,
            my: 4,
            borderRadius: 3,
            borderColor: "#000000",
          }}
        >
          <Grid container spacing={2} sx={{ color: "#000000" }}>
            <Grid xs={4} sx={{ textAlign: "left", ml: 5 }}>
              {item.date}
            </Grid>
            <Grid xs={6} sx={{ textAlign: "right" }}>
              {item.number}
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid xs={2}>
              {" "}
              <img src="/images/food.png" width="60%" height="100%" />
            </Grid>
            {/* {console.log(item)} */}
            <Grid xs={8} sx={{ color: "#99756E", textAlign: "left" }}>
              {item.name} <br />
              Date of Delivery: {item.schedule_date} <br />
              <Link
                to={`/meal-plan-shop-order/${item.order_id}`}
                state={{
                  date: `${item.date}`,
                  time: "`${item.time}`",
                  description: "`${item.description}`",
                  image: "/images/food.png",

                  status: `${item.status}`,
                  courier: `${item.shipping}`,
                  deliveryDate: `${item.schedule_date}`,
                  trackNum: "`${item.trackNum}`",
                  shipLink: "`${item.shipLink}`",
                  name: "`${item.name}`",
                  quantity: 5,
                  items: item.orders,
                  totalPrice: item.totalprice,
                  shippingPrice: item.shipping_price,
                }}
              >
                <a h style={{ color: "#E66253", textDecoration: "underline" }}>
                  View Details
                </a>
              </Link>
            </Grid>
            <Grid xs={2}>
              <Box
                sx={{
                  borderRadius: 5,
                  background: getColor(item.status),
                  mt: "40%",
                  px: 2,
                  py: 1,
                }}
              >
                {item.status}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
      <br />
      {/* {order.map((item, index) => ( */}
      {/* {console.log(orderData.reverse())} */}
      Past Orders
      {pastOrder.reverse().map((item, index) => (
        <Box
          sx={{
            border: 1,
            ml: "5%",
            mr: "5%",
            p: 5,
            my: 4,
            borderRadius: 3,
            borderColor: "#000000",
          }}
        >
          <Grid container spacing={2} sx={{ color: "#000000" }}>
            <Grid xs={4} sx={{ textAlign: "left", ml: 5 }}>
              {item.date}
            </Grid>
            <Grid xs={6} sx={{ textAlign: "right" }}>
              {item.number}
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid xs={2}>
              {" "}
              <img src="/images/food.png" width="60%" height="100%" />
            </Grid>
            {/* {console.log(item)} */}
            <Grid xs={8} sx={{ color: "#99756E", textAlign: "left" }}>
              {item.name} <br />
              Date of Delivery: {item.schedule_date} <br />
              <Link
                to={`/meal-plan-shop-order/${item.order_id}`}
                state={{
                  date: `${item.date}`,
                  time: "`${item.time}`",
                  description: "`${item.description}`",
                  image: "/images/food.png",

                  status: `${item.status}`,
                  courier: `${item.shipping}`,
                  deliveryDate: `${item.schedule_date}`,
                  trackNum: "`${item.trackNum}`",
                  shipLink: "`${item.shipLink}`",
                  name: "`${item.name}`",
                  quantity: 5,
                  items: item.orders,
                  totalPrice: item.totalprice,
                  shippingPrice: item.shipping_price,
                }}
              >
                <a h style={{ color: "#E66253", textDecoration: "underline" }}>
                  View Details
                </a>
              </Link>
            </Grid>
            <Grid xs={2}>
              <Box
                sx={{
                  borderRadius: 5,
                  background: getColor(item.status),
                  mt: "40%",
                  px: 2,
                  py: 1,
                }}
              >
                {item.status}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

export default MealPlanShopTrackOrders;
