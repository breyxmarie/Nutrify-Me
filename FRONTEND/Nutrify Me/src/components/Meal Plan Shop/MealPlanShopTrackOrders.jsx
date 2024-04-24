import MealPlanShopNavBar from "../MealPlanShopNavBar";
import { useState, useRef } from "react";
import * as React from "react";

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

function MealPlanShopTrackOrders() {
  const order = [
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "75840",
      image: "/images/food.png",
      status: "In Transit",
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
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "15840",
      image: "/images/food.png",
      status: "Packing",
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
      status: "Order Placed",
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
      case "In Transit":
        return "#F8E753";
      case "Delivered":
        return "#36FF24";
      case "Order Placed":
        return "#E66253";
      default:
        return "#0096FF";
    }
  }
  //console.log(order.items.name);
  {
    order.map((itemData) =>
      itemData.items.map((item, index) => console.log("try " + item.quantity))
    );
  }

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
      {order.map((item, index) => (
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
              <img src={item.image} width="60%" height="100%" />
            </Grid>
            <Grid xs={8} sx={{ color: "#99756E", textAlign: "left" }}>
              {item.name} <br />
              <Link
                to={`/meal-plan-shop-order/${item.number}`}
                state={{
                  date: `${item.date}`,
                  time: `${item.time}`,
                  description: `${item.description}`,
                  image: `${item.image}`,

                  status: `${item.status}`,
                  courier: `${item.courier}`,
                  deliveryDate: `${item.deliveryDate}`,
                  trackNum: `${item.trackNum}`,
                  shipLink: `${item.shipLink}`,
                  name: `${item.name}`,
                  quantity: `${item.quantity}`,
                  items: item.items,
                  totalPrice: `${item.totalPrice}`,
                  shippingPrice: `${item.shippingPrice}`,
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
