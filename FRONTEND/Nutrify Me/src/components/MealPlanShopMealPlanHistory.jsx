import { useState } from "react";
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

function MealPlanShopMealPlanHistory() {
  const history = [
    {
      name: "[NAME]",
      date: "9 March 2024, 12:19 PM",
      description: "lorem ipsum",
      image: "/images/food.png",
    },
  ];

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
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

      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "40px" }}
      >
        MEAL PLAN HISTORY
      </Typography>
      <br />
      <br />
      <br />
      {history.map((item, index) => (
        <Box sx={{ border: 1, ml: "5%", mr: "5%", p: 5, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <img src={item.image} width="60%" height="100%" />
            </Grid>
            <Grid xs={8} sx={{ textAlign: "left" }}>
              <Typography>{item.name}</Typography>
              <Typography>{item.date}</Typography>
              <Typography>{item.description}</Typography>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  px: 4,
                  py: 1,
                  fontSize: "15px",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 1,
                  }, // * to change the hover button
                }}
              >
                {" "}
                ORDER AGAIN
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

export default MealPlanShopMealPlanHistory;
