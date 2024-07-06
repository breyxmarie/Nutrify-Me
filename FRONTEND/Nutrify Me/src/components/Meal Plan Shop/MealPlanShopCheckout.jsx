import { useState, useRef, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ReactDOM from "react-dom";
import { Modal, Tab, Tabs } from "@mui/material";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import dotenv from "dotenv";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  // PayPalCardFieldsProvider,
  // PayPalNameField,
  // PayPalNumberField,
  // PayPalExpiryField,
  // PayPalCVVField,
  // usePayPalCardFields,
} from "@paypal/react-paypal-js";
import {
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import PayPalPayment from "./PayPalPayment";
import LalamoveApi from "./LalamoveApi";

function MealPlanShopCheckout() {
  const { cartId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { cartItems } = location.state || {};
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [notes, setNotes] = useState("n/a");
  const [payment, setPayment] = useState("");
  const [shipping, setShipping] = useState("");

  //! get Address Data

  const [addressData, setAddressData] = useState([]);

  const getAddressData = async () => {
    try {
      const response = await AxiosInstance.get(`address`);
      const filteredData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );
      setAddressData(filteredData);
      console.log(addressData);
      // getMealData();
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const addAddress = async () => {
    try {
      AxiosInstance.post(`address/`, {
        user_id: loggedInUser.user_id,
        phone: "012345678901",
        address: "asdfasfdsfd random lorem ipsum",
        name: "random namessssssss",
        default: false,
      }).then((res) => {
        console.log(res, res.data);
        getCartData();
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleReset = () => {
    reset(); // Call reset function to clear form state and errors
  };
  //!

  //! get Cart data

  const [cartData, setCartData] = useState([]);
  const [shopMeal, setShopMeal] = useState([]);
  const [cartMeal, setCartMeal] = useState([]);

  const getCartData = async () => {
    try {
      const response = await AxiosInstance.get(`cart`);
      const filteredData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );
      setCartData(filteredData);
      console.log(cartData);
      // getMealData();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const getMealData = async () => {
    try {
      const response = await AxiosInstance.get(`shopmealplan`);

      // const filteredData = response.data;
      // filteredData.filter(
      //   (item) => item.mealplan_id == cartData[0].orders
      // );
      const filteredItems = new Set();
      const filteredData = response.data.filter((item) => {
        // Check if item.mealplan_id is present in cartData[0].orders
        if (
          cartData[0].orders &&
          cartData[0].orders.includes(item.shop_mealplan_id)
        ) {
          console.log("Condition met! Item:", item);
          filteredItems.add(item); // Add item to the set
        }

        return true; // Include all items in the filtered data
      });

      // Update shopMeal state with the filtered items after the filter completes
      setShopMeal(Array.from(filteredItems));

      // setShopMeal(filteredData);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }

    // const response = await AxiosInstance.get(`shopmeal`);
    // const filteredData = response.data;

    // setShopMeal(filteredData);
    // console.log(shopMeal);
    // AxiosInstance.get(`shopmeal`).then((res) => {
    //   setShopMeal(res.data);
    //   // setShopMeal(res.data.filter((item) => item.mealplan_id == );
    // });

    // // {
    // //   cartData[0].map((item, index) => console.log(item));
    // // }
  };

  const getCartMealData = () => {};
  //!
  const setAddress = () => {
    handleClose();
  };
  //! error handling for form
  const handleChange = (event) => {
    console.log(event.target.value);
    setPayment(event.target.value);
  };

  const handleChangeShipping = (event) => {
    setShipping(event.target.value);
    console.log(event.target.value);

    switch (event.target.value) {
      case "Lalamove":
        setShippingPrice(45);
        setTotalOrderPrice(() => subTotalPrices + 45);
        return;
      case "Grab Delivery":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
      case "Move It":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
    }
  };

  const schema = yup.object().shape({
    //  .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),

    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    street: yup.string().required("Street is required"),
    address2: yup.string().required("Address is required"),
    postalcode: yup.string().required("Postal Code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      AxiosInstance.post(`address/`, {
        user_id: loggedInUser.user_id,
        phone: data.phone,
        address: data.street + " " + data.address2,
        name: data.name,
        default: false,
        postalcode: data.postalcode,
      }).then((res) => {
        console.log(res, res.data);
        getAddressData();
        handleReset();
        setActiveTab(0);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const secondschema = yup.object().shape({
    payment: yup.string().required("Payment Method is required"),

    shipping: yup.string().required("Shipping is required"),
    // .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),
  });
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset1,
  } = useForm({
    resolver: yupResolver(secondschema),
  });

  const onSubmitHandler1 = async (data) => {
    console.log(payment);
    navigate(
      data.payment === "Paypal"
        ? "/user-home"
        : data.payment === "GCash"
        ? "/user-home"
        : "/meal-plan-shop-home"
    );

    try {
      AxiosInstance.post(`order/`, {
        user_id: loggedInUser.user_id,
        orders: cartData[0].orders,
        date: dayjs().format("YYYY-MM-DD"),
        status: "Ordered",
        address_id: selectedAddress,
        payment: payment,
        shipping: data.shipping,
        notes: notes,
        totalprice: subTotalPrices,
        shipping_price: shippingPrice,
        // shippingPrice
      }).then((res) => {
        console.log(res, res.data);

        try {
          const response = AxiosInstance.delete(`cart/${cartData[0].cart_id}`);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        // getAddressData();
        // handleReset();
        // setActiveTab(0);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //!
  // cartItems.map((item) => console.log(item));
  const listAddress = [
    {
      fullName: "lorem ipsum",
      address: "full randomsss addressqwe123",
      phoneNumber: "0123456",
    },
    {
      fullName: "lorem ipsum",
      address: "full random address",
      phoneNumber: "0123456",
    },
  ];

  function calculateSubTotalPrice() {
    const newTotal = shopMeal.reduce((acc, item) => acc + item.price, 0);
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
      case "Lalamove":
        setShippingPrice(45);
        setTotalOrderPrice(() => subTotalPrices + 45);
        return;
      case "Grab Delivery":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
      case "Move It":
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

  useEffect(() => {
    // addNewObject();

    getCartData();
    getAddressData();
  }, []);

  useEffect(() => {
    if (cartData.length > 0 && shopMeal.length === 0) {
      getMealData();
    }

    console.log(cartData[0], "this is the cart");
  }, [cartData]);

  useEffect(() => {
    console.log(shopMeal, "did it work");
  }, [shopMeal]);

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
              {addressData.map((item, index) => (
                <FormControlLabel
                  onChange={() => setSelectedAddress(item.address_id)}
                  // onChange={() =>
                  //   setSelectedAddress(console.log(item.address_id))
                  // }
                  value={item.address}
                  control={<Radio />}
                  label={(item.Name, item.address)}
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
              onClick={setAddress}
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
          <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  id="name"
                  name="name"
                  label="Full Name"
                  fullWidth
                  margin="dense"
                  {...register("name")}
                  error={errors.name ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.name?.message}
                </Typography>
              </Grid>
              <Grid xs={5} sx={{ ml: 4 }}>
                Phone <br />
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  margin="dense"
                  {...register("phone")}
                  error={errors.phone ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.phone?.message}
                </Typography>
              </Grid>
            </Grid>
            <Typography>Address</Typography>

            <TextField
              id="street"
              name="street"
              label="Food Street Name, Building, House No."
              placeholder="Street Name, Building, House No."
              fullWidth
              margin="dense"
              {...register("street")}
              error={errors.street ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.street?.message}
            </Typography>
            <br />
            <br />
            <TextField
              id="address2"
              name="address2"
              label="Barangay, City"
              placeholder="Barangay, City"
              fullWidth
              margin="dense"
              {...register("address2")}
              error={errors.address2 ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.address2?.message}
            </Typography>
            <br />
            <br />
            <TextField
              id="postalcode"
              name="postalcode"
              label="Postal Code"
              placeholder="Postal Code"
              fullWidth
              margin="dense"
              {...register("postalcode")}
              error={errors.postalcode ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.postalcode?.message}
            </Typography>
            <br />
            <br />
            <center>
              <Button
                type="submit"
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
          </form>
        </div>
      ),
    },
  ];

  //! paypal codes
  //TODO figure out here how yun mga nasa cart malilink to paypal I give up na muna sayo

  const clientID =
    "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d";
  const clientSecret =
    "ECq1HNxPasGMTi0RCU-ei7FNK4BgKM2bnSaManCsX2XH5x3UQ8ijEQLjH46mFQRNEb_YiXYFVYjdOHrZ";
  const baseURL = "https://api-m.sandbox.paypal.com";
  const initialOptions = {
    //   clientId:
    //     "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    clientId:
      "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua",
    currency: "PHP",
    intent: "capture",
  };

  async function generateAccessToken() {
    const response = await axios({
      url: baseURL + "/v1/oauth2/token",
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: clientID,
        password: clientSecret,
      },
    });

    return response.data.access_token;
  }

  const serverUrl = "http://localhost:5173/";
  const createOrder = async (data, actions) => {
    // console.log(process.env.BASE_URL);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "PHP",
            value: "0.01",
          },
        },
      ],
    });
    // return fetch(`${serverUrl}/my-server/create-paypal-order`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // use the "body" param to optionally pass additional order information
    //   // like product skus and quantities
    //   body: JSON.stringify({
    //     product: {
    //       description: "Wood Candy Sofa",
    //       cost: "399.0",
    //     },
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((order) => order.id);
  };

  const capturePayment = async (orderId) => {};

  const onApprove = async (data, actions) => {
    // return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderID: data.orderID,
    //   }),
    // }).then((response) => response.json());

    // return actions.order.capture().then(function (details) {
    //   alert("Transaction completed by: " + "me");
    // });

    const order = await actions.order.capture();
    console.log(order);
  };

  const SubmitPayment = () => {
    const { cardFields, fields } = usePayPalCardFields();

    function submitHandler() {
      if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it

      cardFields
        .submit()
        .then(() => {
          // submit successful
        })
        .catch(() => {
          // submission error
        });
    }
    return <button onClick={submitHandler}>Pay</button>;
  };

  function onError() {
    // merchant code
  }
  //!

  //! lalamove test
  const [pickupLocation, setPickupLocation] = useState({});
  const [deliveryLocation, setDeliveryLocation] = useState({});
  const [goods, setGoods] = useState([]); // Array of items
  const [quotes, setQuotes] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const handleGetQuotes = async () => {
    const fetchedQuotes = await LalamoveApi.getQuotes(
      pickupLocation,
      deliveryLocation,
      goods
    );
    setQuotes(fetchedQuotes);
  };

  const handleCreateOrder = async (selectedQuote) => {
    const orderDetails = {
      // ... construct order details based on selected quote and additional information
    };
    const createdOrder = await LalamoveApi.createOrder(orderDetails);
    setOrderId(createdOrder.id);
  };

  const handleTrackOrder = async () => {
    if (orderId) {
      const orderStatus = await LalamoveApi.trackOrder(orderId);
      // Update UI based on order status
    }
  };
  //!

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
      {/* //? */}
      <div>
        {/* ... input fields for pickup, delivery, goods */}
        <button onClick={handleGetQuotes}>Get Quotes</button>
        {quotes.length > 0 && (
          <div>
            {/* Display available quote options */}
            <button onClick={() => handleCreateOrder(selectedQuote)}>
              Create Order
            </button>
          </div>
        )}
        {orderId && (
          <div>
            <button onClick={handleTrackOrder}>Track Order</button>
            {orderStatus && (
              <div>
                {/* Display order status information here */}
                {/* Example: Show estimated delivery time, tracking URL, etc. */}
              </div>
            )}
          </div>
        )}
      </div>
      {/* //! */}
      <form onSubmit={handleSubmit1(onSubmitHandler1)}>
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
              {addressData.length === 0 ? (
                <Typography sx={{ color: "#000000" }}>Loading...</Typography>
              ) : (
                <>
                  <Typography sx={{ color: "#000000" }}>
                    {addressData[selectedAddress - 1].name} |{" "}
                    {addressData[selectedAddress - 1].phone} <br />
                    {addressData[selectedAddress - 1].address}
                  </Typography>
                </>
              )}
              {/* <Typography sx={{ color: "#000000" }}>
                {addressData[0].name} |{addressData[0].phone} <br />
                {addressData[0].address}
              </Typography> */}
              {/* {addressData.slice(1).map((item, index) => (
                <Typography sx={{ color: "#000000" }}>
                  {item.name} |{item.phone} <br />
                  {item.address}
                </Typography>
              ))} */}
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
            </Grid>
          </Grid>
        </Box>
        <br />
        <Box sx={{ border: 1, borderRadius: 3, mx: 20 }}>
          {shopMeal.map((item, index) => (
            <Grid container spacing={2} sx={{ mt: "20px" }}>
              <Grid xs={4}>
                {" "}
                <img src={item.image} width="150" height="180" />
              </Grid>
              <Grid xs={4} sx={{ textAlign: "left" }}>
                <Typography sx={{ color: "#99756E", mt: 3 }}>
                  {item.name}
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
              onChange={(event) => setNotes(event.target.value)}
            />
          </Box>
        </Box>

        <br />

        <Box sx={{ textAlign: "left", border: 1, mx: 20, color: "#99756E" }}>
          <Typography
            sx={{ ml: 5, mt: 5, color: "#99756E", fontWeight: "bold" }}
          >
            PAYMENT OPTION{" "}
          </Typography>
          <br />
          {/* <PayPalScriptProvider options={initialOptions}>
            <PayPalPayment /> 
          </PayPalScriptProvider>   clientId:
      "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    */}

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </PayPalScriptProvider>

          {/* <PayPalScriptProvider
            options={{
              clientId:
                "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
              components: "card-fields",
            }}
          >
            {" "}
            <PayPalCardFieldsProvider
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            >
              <PayPalNameField />
              <PayPalNumberField />
              <PayPalExpiryField />
              <PayPalCVVField />

              <SubmitPayment />
            </PayPalCardFieldsProvider>
          </PayPalScriptProvider> */}
          <FormControl sx={{ ml: 15, mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="payment"
              value={payment} // Use the state variable for value
              onChange={handleChange}
              error={errors1.payment ? true : false}
            >
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio />}
                label="Cash on Delivery"
                onChange={handleChange}
                {...register1("payment")} // Pass register to each Radio button
                error={errors1.payment ? true : false}
              />
              <FormControlLabel
                value="Paypal"
                control={<Radio />}
                label="Paypal"
                onChange={handleChange}
                {...register1("payment")}
                error={errors1.payment ? true : false}
              />
              <FormControlLabel
                value="GCash"
                control={<Radio />}
                label="GCash"
                onChange={handleChange}
                {...register1("payment")}
                error={errors1.payment ? true : false}
              />
            </RadioGroup>
            <Typography variant="inherit" color="textSecondary">
              {errors1.payment?.message}
            </Typography>
          </FormControl>
          <Button type="submit">Submit</Button>
        </Box>
        <br />
        <br />
        <Box sx={{ border: 1, mx: 20, color: "#99756E", fontSize: "20px" }}>
          <Typography
            sx={{
              color: "#99756E",
              fontWeight: "bold",
              my: 5,
              fontSize: "30px",
            }}
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
                <FormLabel id="demo-radio-buttons-group-label">
                  Shipping/Delivery
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="shipping"
                  value={shipping} // Use the state variable for value
                  onChange={handleChangeShipping}
                  error={errors1.shipping ? true : false}
                >
                  <FormControlLabel
                    value="Grab Delivery"
                    control={<Radio />}
                    label="Grab Delivery"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                  <FormControlLabel
                    value="Lalamove"
                    control={<Radio />}
                    label="Lalamove"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                  <FormControlLabel
                    value="Move It"
                    control={<Radio />}
                    label="Move It"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                </RadioGroup>
                <Typography variant="inherit" color="textSecondary">
                  {errors1.shipping?.message}
                </Typography>
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

        {/* <Link to={"/meal-plan-shop-home"}> */}
        <Button
          type="submit"
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
        {/* </Link> */}
      </form>
    </div>
  );
}

export default MealPlanShopCheckout;
