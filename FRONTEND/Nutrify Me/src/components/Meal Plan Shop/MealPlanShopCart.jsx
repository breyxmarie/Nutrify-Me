import { useState } from "react";
import * as React from "react";
import MainUserNavbar from "../MainUserNavbar";
import TeleMedNavBar from "../TeleMedNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";

function MealPlanShopCart() {
  const cartItems = [
    {
      product: "lorem",
      price: 50,
      quantity: 5,
      subtotal: 6,
      image: "/images/logo.png",
    },
    {
      product: "lorem",
      price: 50,
      quantity: 5,
      subtotal: 6,
      image: "/images/logo.png",
    },
  ];

  const [orderNumber, setOrderNumber] = useState(
    Math.floor(Math.random() * 1000000)
  );
  function generateOrderNumber() {
    const tempNum = Math.floor(Math.random() * 1000000);
    setOrderNumber(tempNum);
    console.log(orderNumber);
  }

  const deleteItem = (item) => {
    // Handle click event for each slide item
    // Replace this with your desired logic (e.g., navigate, open modal)
    console.log("Clicked item:", item);
  };

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
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
      >
        CART
      </Typography>

      <Box
        sx={{ color: "#99756E", border: 1, p: 5, mx: 15, textAlign: "left" }}
      >
        <Grid container spacing={2}>
          <Grid xs={5} sx={{ ml: "20px" }}>
            PRODUCT
          </Grid>
          <Grid xs={2}>PRICE</Grid>
          <Grid xs={2}>QUANTITY</Grid>
          <Grid xs={2}>SUBTOTAL</Grid>
        </Grid>
        <hr />
        <br />
        {cartItems.map((item, index) => (
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid xs={0.5}>
              {" "}
              <img
                onClick={() => deleteItem(item)}
                src="/images/cross.png"
                width="70%"
                height="70%"
              />
            </Grid>
            <Grid xs={4.8}>{item.product}</Grid>
            <Grid xs={2}>{item.price}</Grid>
            <Grid xs={2}>
              <Grid container spacing={2} sx={{}}>
                <Grid xs={3} sx={{ border: 1 }}>
                  <center>
                    <img
                      onClick={() => deleteItem(item)}
                      src="/images/+.png"
                      width="25%"
                      height="50%"
                    />
                  </center>
                </Grid>
                <Grid xs={3} sx={{ border: 1 }}>
                  <center>{item.quantity}</center>
                </Grid>
                <Grid xs={3} sx={{ border: 1 }}>
                  <center>
                    <img
                      onClick={() => deleteItem(item)}
                      src="/images/-.png"
                      width="25%"
                      height="20%"
                    />
                  </center>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={2}>{item.subtotal}</Grid>
          </Grid>
        ))}
        <hr />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={3}>
            <TextField
              sx={{
                width: "100%",
                background: "#ffffff",
                borderRadius: 2,
                height: "10%",
              }}
              id="outlined-basic"
              variant="outlined"
              placeholder="coupon code"
              name="coupon code"
            />
          </Grid>
          <Grid xs={3}>
            <Button
              sx={{
                background: "#E66253",
                color: "#ffffff",
                ml: 2,
                height: "100%",
                px: 2,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                },
              }}
            >
              Apply Coupon
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button
              sx={{
                float: "right",
                background: "#E66253",
                color: "#ffffff",
                height: "100%",
                px: 2,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                },
              }}
            >
              Update Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <Box
        sx={{
          border: 1,

          borderColor: "#000000",
          mx: 30,
          color: "#99756E",
          py: 5,
        }}
      >
        {" "}
        <Typography
          sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
        >
          CART
        </Typography>
        <hr />
        <Grid container spacing={2} sx={{ my: 3 }}>
          {" "}
          <Grid xs={2}>Subtotal</Grid>
          <Grid xs={2}></Grid>
        </Grid>
        <hr />
        <center>
          <Link
            to={`/meal-plan-shop-checkout/${orderNumber}`}
            state={{ cartItems: cartItems }}
            sx={{ mx: "30px" }}
          >
            <Button
              sx={{
                float: "center",
                background: "#E66253",
                color: "#ffffff",
                height: "100%",
                px: 2,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                },
              }}
            >
              CHECKOUT
            </Button>
          </Link>
        </center>
      </Box>
    </div>
  );
}

export default MealPlanShopCart;
MealPlanShopCart;
