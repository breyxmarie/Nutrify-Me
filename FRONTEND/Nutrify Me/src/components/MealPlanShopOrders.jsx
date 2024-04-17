import MealPlanShopNavBar from "./MealPlanShopNavBar";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
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

function MealPlanShopOrders() {
  //* add up of props here for the data to be pass here everytime this page is open
  // const { orderNo, date, status } = props;
  const { orderId } = useParams();
  //const [orderID, setOrderID] = useState(null);

  const [status, setStatus] = useState(null);

  const location = useLocation();
  const { date, time, description, image } = location.state || {};
  console.log(orderId);
  console.log(useParams());
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
        sx={{
          textAlign: "left",
          color: "#99756E",
          fontSize: "30px",
          fontWeight: "bold",
          ml: 10,
        }}
      >
        {orderId || "No order ID provided"} <br />
        {date} <br />
        <img src={image} />
      </Typography>
    </div>
  );
}

export default MealPlanShopOrders;
