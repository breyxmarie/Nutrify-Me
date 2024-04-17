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
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      <Typography
        sx={{ color: "#99756E", fontSize: "30px", fontWeight: "bold", m: 5 }}
      >
        CHECKOUT
      </Typography>

      <Box sx={{ mx: "80px" }}>
        <Grid container spacing={2}>
          <Grid xs={5} sx={{ mr: 10 }}>
            {" "}
            <Typography
              sx={{
                color: "#99756E",
                fontSize: "15px",
                fontWeight: "bold",
                m: 5,
              }}
            >
              BILLING DETAILS
            </Typography>
            <hr />
            <Grid container spacing={2}>
              <Grid xs={5}>First Name</Grid>
              <Grid xs={5}></Grid>
            </Grid>
          </Grid>
          <Grid xs={6} sx={{ border: 1, borderColor: "#000000" }}>
            {" "}
            <Typography
              sx={{
                color: "#99756E",
                fontSize: "15px",
                fontWeight: "bold",
                m: 5,
              }}
            >
              ORDER SUMMARY
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default MealPlanShopCheckout;
