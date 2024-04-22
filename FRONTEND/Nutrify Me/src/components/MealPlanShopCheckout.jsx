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
import { NavLink, Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainUserNavbar.css";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ReactDOM from "react-dom";
import Modal from "@mui/material/Modal";

function MealPlanShopCheckout() {
  const { cartId } = useParams();

  const location = useLocation();
  const { cartItems } = location.state || {};

  cartItems.map((item) => console.log(item));
  const listAddress = [
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

  function calculateSubTotalPrice() {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return newTotal;
  }

  const [shippingPrice, setShippingPrice] = useState(0);
  const subTotalPrices = calculateSubTotalPrice(); // Calculate total price here
  const [totalOrderPrice, setTotalOrderPrice] = useState(
    parseInt(subTotalPrices) + parseInt(shippingPrice) ||
      parseInt(subTotalPrices) + parseInt(shippingPrice)
  );

  const handleShippingChange = (event) => {
    switch (event.target.value) {
      case "J&T":
        setShippingPrice(45);
        setTotalOrderPrice(() => subTotalPrices + 45);
        return;
      case "Grab":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
    }
    setSelectedShipping(event.target.value); // Update state on radio button change
    // Optionally, calculate and update shipping price based on selectedShipping here
  };

  // modal codes
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 3,
    color: "#ffffff",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //

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

      <Box sx={{ borderRadius: 0, border: 1, mx: 20 }}>
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid xs={2}>
            <img src="/images/location.png" />
          </Grid>
          <Grid xs={8}>
            Delivery Address
            {listAddress.slice(1).map((item, index) => (
              <Typography>
                {item.fullName} |{item.phoneNumber} <br />
                {item.address}
              </Typography>
            ))}
          </Grid>

          <Grid xs={2}>
            {" "}
            <Button onClick={handleOpen}>
              <img src="/images/right outline arrow.png" />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{}}
            >
              <Box sx={style}>
                <Grid container spacing={2}>
                  <Grid xs={2}>
                    <img src="/images/location white.png" />
                  </Grid>
                  <Grid xs={8}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Address Selection
                    </Typography>
                  </Grid>
                  <Grid xs={2}>
                    <Button>
                      <img src="/images/close.png" />{" "}
                    </Button>
                  </Grid>
                </Grid>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>

                <FormControl sx={{ ml: 15, mb: 3 }}>
                  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {listAddress.map((item, index) => (
                      <FormControlLabel
                        value={item.address}
                        control={<Radio />}
                        label={(item.fullName, item.address)}
                        // onChange=
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box sx={{ border: 1, borderRadius: 3, mx: 20 }}>
        {cartItems.map((item, index) => (
          <Grid container spacing={2} sx={{ mt: "20px" }}>
            <Grid xs={4}>
              {" "}
              <img src={item.image} width="150" height="180" />
            </Grid>
            <Grid xs={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ color: "#99756E", mt: 3 }}>
                {item.product}
              </Typography>
              <Typography sx={{ color: "#E66253", mt: "12%" }}>
                {" "}
                Php {item.price}
              </Typography>
            </Grid>
            <Grid xs={4} sx={{ mt: "5%" }}>
              x {item.quantity}
            </Grid>
          </Grid>
        ))}
        <br />
        <br />

        <Box sx={{ mx: 5 }}>
          <Typography sx={{ textAlign: "left", color: "#99756E" }}>
            Order Notes (Optional)
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
            multiline
            rows={4}
            placeholder="Type message here"
          />
        </Box>
      </Box>

      <br />

      <Box sx={{ textAlign: "left", border: 1, mx: 20 }}>
        <Typography sx={{ ml: 5, mt: 5 }}>PAYMENT OPTION </Typography>
        <br />
        <FormControl sx={{ ml: 15, mb: 3 }}>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="cc"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel value="gcash" control={<Radio />} label="GCash" />
          </RadioGroup>
        </FormControl>
      </Box>
      <br />
      <br />
      <Box sx={{ border: 1, mx: 20 }}>
        <Typography>PAYMENT DETAILS</Typography>
        <hr />
        <br />
        <Grid container spacing={2}>
          {" "}
          <Grid xs={6}>ORDER SUBTOTAL</Grid>
          <Grid xs={6}>Php {subTotalPrices}</Grid>
        </Grid>

        <hr />
        <br />
        <Grid container spacing={2}>
          {" "}
          <Grid xs={6}>SHIPPING</Grid>
          <Grid xs={6}>
            {" "}
            <FormControl sx={{ ml: 15, mb: 3 }}>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="J&T"
                  control={<Radio />}
                  label="J & T"
                  onChange={handleShippingChange}
                />
                <FormControlLabel
                  value="Grab"
                  control={<Radio />}
                  label="Grab Delivery"
                  onChange={handleShippingChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <hr />
        <br />
        <Grid container spacing={2}>
          {" "}
          <Grid xs={6}>SHIPPING FEE</Grid>
          <Grid xs={6}>Php {shippingPrice}</Grid>
        </Grid>
        <br />

        <Grid container spacing={2}>
          {" "}
          <Grid xs={6}>TOTAL</Grid>
          <Grid xs={6}>Php {totalOrderPrice}</Grid>
        </Grid>
      </Box>
      <br />
      <br />
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
        {" "}
        PLACE ORDER
      </Button>
    </div>
  );
}

export default MealPlanShopCheckout;
