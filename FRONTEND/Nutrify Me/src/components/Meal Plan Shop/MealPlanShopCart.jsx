import { useState, useEffect } from "react";
import * as React from "react";
import MainUserNavbar from "../NavBars/MainUserNavbar";
import TeleMedNavBar from "../NavBars/TeleMedNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useLoggedInUser } from "../LoggedInUserContext";
import AxiosInstance from "../forms/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";

function MealPlanShopCart() {
  const location = useLocation();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  const { addCart } = location.state || {};

  const [cartItems, setCartItems] = useState([
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
    {
      product: "High Protein",
      price: 50,
      quantity: 5,
      subtotal: 6,
      image: "/images/logo.png",
    },
  ]);

  // const addNewObject = () => {
  //   const updatedArray = [...cartItems].concat(addCart); // Create new array with spread and concat
  //   setCartItems(updatedArray);
  // };
  const [orderNumber, setOrderNumber] = useState(
    Math.floor(Math.random() * 1000000)
  );
  function generateOrderNumber() {
    const tempNum = Math.floor(Math.random() * 1000000);
    setOrderNumber(tempNum);
    console.log(orderNumber);
  }

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

  //! get address details

  //!
  const deleteItem = (item) => {
    // Handle click event for each slide item
    // Replace this with your desired logic (e.g., navigate, open modal)
    console.log("Clicked item:", item);

    const filteredArray = cartData[0].orders.filter(
      (items) => items !== item.shop_mealplan_id
    );
    console.log(filteredArray, "is it deleted na ba");

    try {
      AxiosInstance.put(`cart/`, {
        cart_id: cartData[0].cart_id,
        user_id: cartData[0].user_id,
        orders: filteredArray,

        //image: data.type, dito get yun details for res chuchu and update add na si meal plan
      }).then((res) => {
        console.log(res, res.data);
        toast.success("Meal Plan Deleted from the Cart");
        getCartData();
        getMealData();
        // window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // addNewObject();

    getCartData();
  }, []);

  useEffect(() => {
    if (cartData.length > 0 && shopMeal.length === 0) {
      getMealData();
    }

    console.log(cartData[0]);
  }, [cartData]);

  useEffect(() => {
    console.log(shopMeal, "did it work");
  }, [shopMeal]);

  const [cartDiv, setCartDiv] = useState();

  //! functions
  function calculateSubTotalPrice() {
    const newTotal = shopMeal.reduce((acc, item) => acc + item.price, 0);
    return newTotal;
  }
  //!

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      <ToastContainer />
      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
      >
        CART
      </Typography>
      {/* {cartDiv} */}
      <Box
        sx={{ color: "#99756E", border: 1, p: 5, mx: 15, textAlign: "left" }}
      >
        <Grid container spacing={2}>
          <Grid xs={2.3} sx={{ ml: "20px" }}>
            PRODUCT
          </Grid>
          <Grid xs={5}> DATE</Grid>
          <Grid xs={2}>PRICE</Grid>
          <Grid xs={2}>SUBTOTAL</Grid>
        </Grid>
        <hr />
        <br />
        {cartData[0]?.orders.length > 0 ? (
          // Render cart items if data is available
          shopMeal.map((item, index) => (
            <Grid container spacing={2} sx={{ py: 2 }}>
              <Grid xs={0.5}>
                {" "}
                <img
                  onClick={() => deleteItem(item)} // delete function here
                  src="/images/cross.png"
                  width="70%"
                  height="70%"
                />
              </Grid>
              <Grid xs={2}>{item.name}</Grid>
              <Grid xs={5}>
                {item.start_week} - {item.end_week}
              </Grid>
              <Grid xs={2}>
                {item.price}
                {/* <Grid container spacing={2} sx={{}}>
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
                </Grid> */}
              </Grid>
              <Grid xs={2}>{item.price}</Grid>
            </Grid>
          ))
        ) : // ) : (
        cartData[0]?.orders.length === 0 ? (
          // Display "Cart is empty" message if data is empty
          <p>Your cart is empty.</p>
        ) : (
          //  Display loading message while data is being fetched
          <p>Loading cart data...</p>
        )}
        {/* {console.log(cartData[0].orders.length)} */}
        <hr />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={3}>
            {/* <TextField
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
            /> */}
          </Grid>
          <Grid xs={3}>
            {/* <Button
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
            </Button> */}
          </Grid>
          <Grid xs={3}>
            SUBTOTAL{"            "}
            {/* <Button
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
            </Button> */}
            {calculateSubTotalPrice()}
          </Grid>
          <Grid xs = ></Grid>
        </Grid>
      </Box>
      <br />
      <br />
      {/* <Box
        sx={{
          border: 1,

          borderColor: "#000000",
          mx: 30,
          color: "#99756E",
          py: 5,
        }}
      > */}
      <center>
        {" "}
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
      </center>{" "}
      {/* <Typography
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
        </center> */}
      {/* </Box> */}
    </div>
  );
}

export default MealPlanShopCart;
MealPlanShopCart;
