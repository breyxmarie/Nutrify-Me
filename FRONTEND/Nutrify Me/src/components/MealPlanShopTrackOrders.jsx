import MealPlanShopNavBar from "./MealPlanShopNavBar";
import { useState, useRef } from "react";
import * as React from "react";
import MainUserNavbar from "./MainUserNavbar";
import TeleMedNavBar from "./TeleMedNavBar";
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
import "./MainUserNavbar.css";

function MealPlanShopTrackOrders() {
  const order = [
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "#75840",
      image: "/images/food.png",
      status: "In Transit",
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "#75840",
      image: "/images/food.png",
      status: "Delivered",
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "#75840",
      image: "/images/food.png",
      status: "Packing",
    },
    {
      name: "lorem",
      date: "11/21/23",
      time: "8am",
      description: "lorem ipsum",
      number: "#75840",
      image: "/images/food.png",
      status: "Order Placed",
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
              <a
                href=""
                style={{ color: "#E66253", textDecoration: "underline" }}
              >
                View Details
              </a>
            </Grid>
            <Grid xs={2}>
              <Box
                sx={{
                  borderRadius: 5,
                  background: getColor(item.status),
                  mt: "40%",
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
