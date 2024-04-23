import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import { Modal, Tab, Tabs } from "@mui/material";

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

  // modal codes open list address
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

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  //

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTabChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const tabContent = [
    {
      title: "Choose Address",
      content: (
        <div>
          <br />
          <Grid container spacing={2} sx={{ ml: 5 }}>
            <Grid xs={3}>
              <img src="/images/location white.png" />
            </Grid>
            <Grid xs={8}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Address Selection
              </Typography>
            </Grid>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
          <center>
            <Button
              sx={{
                background: "#ffffff",
                color: "#E66253",
                ml: 2,
                height: "100%",
                px: 2,
                borderRadius: 5,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 1,
                },
              }}
            >
              CHOOSE ADDRESS
            </Button>
          </center>
        </div>
      ),
    },
    {
      title: "ADD ADDRESS",
      content: (
        <div>
          <br />
          <Grid container spacing={2} sx={{ ml: 5 }}>
            <Grid xs={3}>
              <img src="/images/location white.png" />
            </Grid>
            <Grid xs={8}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Address
              </Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid xs={6}>
              Full Name <br />
              <TextField
                id="outlined-multiline-flexible"
                sx={{ width: "100%", background: "#ffffff", borderRadius: 0 }}
                placeholder="Name"
                name="name"
              />
            </Grid>
            <Grid xs={5} sx={{ ml: 4 }}>
              Phone <br />
              <TextField
                id="outlined-multiline-flexible"
                sx={{ width: "100%", background: "#ffffff", borderRadius: 0 }}
                placeholder="number"
                name="phone number"
              />
            </Grid>
          </Grid>
          <Typography>Address</Typography>

          <TextField
            id="outlined-multiline-flexible"
            sx={{ width: "100%", background: "#ffffff", borderRadius: 0 }}
            placeholder="Street Name, Building, House No."
            name="address line 1"
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            sx={{ width: "100%", background: "#ffffff", borderRadius: 0 }}
            placeholder="Barangay, City"
            name="address line 2"
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            sx={{ width: "100%", background: "#ffffff", borderRadius: 0 }}
            placeholder="Postal Code"
            name="address line 3"
          />

          <br />
          <br />
          <center>
            <Button
              sx={{
                background: "#ffffff",
                color: "#E66253",
                ml: 2,
                height: "100%",
                px: 2,
                borderRadius: 5,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 1,
                },
              }}
            >
              SUBMIT
            </Button>
          </center>
        </div>
      ),
    },

    // ... Add more tabs as needed
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

      <Box sx={{ borderRadius: 0, border: 1, mx: 20 }}>
        <Grid container spacing={2} sx={{ my: "20px", mx: "20px" }}>
          <Grid xs={2}>
            <img src="/images/location.png" />
          </Grid>
          <Grid
            xs={8}
            sx={{
              textAlign: "left",
              color: "#99756E",
              fontWeight: "bold",
            }}
          >
            Delivery Address
            {listAddress.slice(1).map((item, index) => (
              <Typography sx={{ color: "#000000" }}>
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
              open={isOpen}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={style}>
                <Button sx={{ float: "right" }} onClick={handleClose}>
                  <img src="/images/close.png" height="10" weight="10" />
                </Button>
                <Tabs
                  value={activeTab}
                  style={{
                    color: "#f00", // Change text color to red
                    fontSize: "18px", // Increase font size
                    fontWeight: "bold", // Make text bold
                  }}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  centered
                >
                  {tabContent.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab.title}
                      style={{
                        color: "#ffffff", // Change text color to red
                        fontSize: "14px", // Increase font size
                        //fontWeight: "bold", // Make text bold
                      }}
                    />
                  ))}
                </Tabs>
                {tabContent.map((tab, index) => (
                  <Box key={index} hidden={activeTab !== index}>
                    {tab.content}
                  </Box>
                ))}
              </Box>
            </Modal>
            {/* 
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
                <center>
                  <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 2,
                      height: "100%",
                      px: 2,
                      borderRadius: 5,
                      fontSize: "15px",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 1,
                      },
                    }}
                  >
                    CHOOSE ADDRESS
                  </Button>

                  <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 2,
                      height: "100%",
                      px: 2,
                      borderRadius: 5,
                      fontSize: "15px",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 1,
                      },
                    }}
                  >
                    ADD NEW ADDRESS
                  </Button>
                </center>
              </Box>
            </Modal> */}
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

      <Box sx={{ textAlign: "left", border: 1, mx: 20, color: "#99756E" }}>
        <Typography sx={{ ml: 5, mt: 5, color: "#99756E", fontWeight: "bold" }}>
          PAYMENT OPTION{" "}
        </Typography>
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
      <Box sx={{ border: 1, mx: 20, color: "#99756E", fontSize: "20px" }}>
        <Typography
          sx={{ color: "#99756E", fontWeight: "bold", my: 5, fontSize: "30px" }}
        >
          PAYMENT DETAILS
        </Typography>
        <hr />
        <br />
        <Grid container spacing={2} sx={{ my: 5 }}>
          {" "}
          <Grid xs={6}>ORDER SUBTOTAL</Grid>
          <Grid xs={6}>Php {subTotalPrices}</Grid>
        </Grid>

        <hr />
        <br />
        <Grid container spacing={2} sx={{ my: 5 }}>
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
        <Grid container spacing={2} sx={{ my: 5 }}>
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
