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

  //const [status, setStatus] = useState(null);

  const location = useLocation();
  const {
    date,
    time,
    description,
    image,
    status,
    courier,
    deliveryDate,
    trackNum,
    shipLink,
    name,
    quantity,
    items,
    totalPrice,
    shippingPrice,
  } = location.state || {};
  console.log(orderId);
  console.log(useParams());

  //const totalOrderPrice =
  // parseInt(totalPrice, 10) + parseInt(shippingPrice, 10);

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  function getColorStatus(status) {
    switch (status) {
      case "":
        return;
    }
  }

  function getTotalPrice(price) {
    setTotalOrderPrice(totalOrderPrice + parseInt(price));
  }

  // {
  //   items.map((itemData) => console.log("try" + itemData));
  // }

  console.log("try " + location.state.items);

  items.map((item, index) => console.log("try " + item.image));
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
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
        {" "}
        ORDER #{orderId || "No order ID provided"} <br />
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          color: "#99756E",
          fontSize: "20px",
          fontWeight: "bold",
          ml: 10,
        }}
      >
        {date} <br />
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Box
            sx={{
              borderRadius: "50%",
              background: "#E66253",
              height: "45px",
              width: "45px",
              display: "inline-block",
              justifyItems: "right",
            }}
          >
            <img src="/images/check.png" style={{ marginTop: 7 }} />
          </Box>

          <Typography>ORDER CONFIRMED</Typography>
          <Typography>
            {time}, {date}
          </Typography>
        </Grid>
        <Grid xs={3}>
          <hr style={{ marginTop: "3%" }} />
        </Grid>
        <Grid xs={2}>
          {" "}
          <Box
            sx={{
              borderRadius: "50%",
              background: "#E66253",
              height: "45px",
              width: "45px",
              display: "inline-block",
              justifyItems: "right",
            }}
          >
            <img src="/images/2.png" style={{ marginTop: 7 }} />
          </Box>
          <Typography>SHIPPING</Typography>
          <Typography>Shipped with {courier}</Typography>
        </Grid>
        <Grid xs={3}>
          {" "}
          <hr style={{ marginTop: "3%" }} />
        </Grid>
        <Grid xs={2}>
          <Box
            sx={{
              borderRadius: "50%",
              background: "#E66253",
              height: "45px",
              width: "45px",
              display: "inline-block",
              justifyItems: "left",
            }}
          >
            <img src="/images/3.png" style={{ marginTop: 7 }} />

            <Typography>TO DELIVERY</Typography>
            <Typography>Estimated Date: {deliveryDate}</Typography>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Box>
        <Grid container spacing={2} sx={{}}>
          <Grid xs={2} sx={{ textAlign: "left", ml: "5%", color: "#99756E" }}>
            TRACKING NUMBER:
          </Grid>
          <Grid xs={2} sx={{ textAlign: "left" }}>
            {trackNum}
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid xs={2} sx={{ textAlign: "left", ml: "5%", color: "#99756E" }}>
            SHIPMENT TRACKING URL:
          </Grid>
          <Grid xs={2} sx={{ textAlign: "left" }}>
            <a href={shipLink}>{shipLink}</a>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Typography
        sx={{
          textAlign: "left",
          color: "#99756E",
          fontSize: "20px",
          fontWeight: "bold",
          ml: 10,
        }}
      >
        ORDER SUMMARY:
      </Typography>
      <br />
      <Box
        sx={{
          border: 1,
          mx: "120px",
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "120%",
        }}
      >
        {items.map((item, index) => (
          <Box
            sx={{
              mx: 5,
              color: "#99756E",
              fontWeight: "bold",
              fontSize: "120%",
            }}
          >
            <Grid container spacing={2} sx={{ mt: "2%", ml: "2%" }}>
              <Grid xs={2}>
                <img src={item.image} width="160px" height="160px" />
              </Grid>
              <Grid xs={3} sx={{ mt: "6%" }}>
                {item.name}{" "}
              </Grid>
              <Grid xs={1} sx={{ mt: "6%" }}>
                x {item.quantity}
              </Grid>
              <Grid xs={5} sx={{ textAlign: "right", mr: 5, mt: "6%" }}>
                {/* {totalPrice} */}
                {setTotalOrderPrice(item.price)}
              </Grid>
            </Grid>
          </Box>
        ))}
        <br />
        <hr />
        <br />
        <Box>
          <Grid container spacing={2}>
            <Grid xs={6}></Grid>
            <Grid xs={3}> Product Total</Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
              PHP {totalPrice}
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid xs={6}></Grid>
            <Grid xs={3}> Shipping</Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
              PHP {shippingPrice}
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={2}>
            <Grid xs={7}></Grid>
            <Grid xs={5}>
              <hr />
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={2} sx={{}}>
            <Grid xs={7}></Grid>
            <Grid xs={2} sx={{ textAlign: "left", ml: 5 }}>
              {" "}
              Total
            </Grid>
            <Grid xs={2.5} s>
              PHP {totalOrderPrice}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default MealPlanShopOrders;
