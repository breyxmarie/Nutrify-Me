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

import ReactDOM from "react-dom";

function MealPlanShopCheckout() {
  const listAdress = [
    {
      fullName: "lorem ipsum",
      address: "full random address",
      phoneNumber: "0123456",
    },
    {
      fullName: "lorem ipsum",
      address: "full random address",
      phoneNumber: "0123456",
    },
  ];

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
      <Typography
        sx={{ color: "#99756E", fontSize: "30px", fontWeight: "bold", m: 5 }}
      >
        CHECKOUT
      </Typography>

      <Box sx={{ borderRadius: 3, border: 1 }}>
        <img src="./images/location.png" />
        Delivery Address
        <img src="./images/right outline arrow.png" />
      </Box>
    </div>
  );
}

export default MealPlanShopCheckout;
