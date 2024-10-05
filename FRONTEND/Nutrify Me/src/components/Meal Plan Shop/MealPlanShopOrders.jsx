import MealPlanShopNavBar from "../NavBars/MealPlanShopNavBar";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AxiosInstance from "../forms/AxiosInstance";
import dayjs from "dayjs";

function MealPlanShopOrders() {
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();
  //* add up of props here for the data to be pass here everytime this page is open
  // const { orderNo, date, status } = props;
  const { orderId } = useParams();

  //const [orderID, setOrderID] = useState(null);

  //const [status, setStatus] = useState(null);
  const buttons = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  const getData = async () => {
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
          location.state.orders &&
          location.state.orders.includes(item.shop_mealplan_id)
        ) {
          console.log("Condition met! Item:", item);
          filteredItems.add(item); // Add item to the set
        }

        return true; // Include all items in the filtered data
      });

      // Update shopMeal state with the filtered items after the filter completes
      setOrderData(Array.from(filteredItems));

      // setShopMeal(filteredData);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(location.state);
  // const {
  //   date,
  //   time,
  //   description,
  //   image,
  //   status,
  //   courier,
  //   deliveryDate,
  //   trackNum,
  //   shipLink,
  //   name,
  //   quantity,
  //   items,
  //   totalPrice,
  //   shippingPrice,
  // } = location.state || {};

  console.log(location.state);
  console.log(orderId);
  console.log(useParams());

  function getColorStatus(status) {
    switch (status) {
      case "":
        return;
    }
  }

  // function calculateTotalPrice() {
  //   const newTotal = items.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );
  //   return newTotal;
  // }

  // const totalPrices = calculateTotalPrice(); // Calculate total price here
  // const [totalOrderPrice, setTotalOrderPrice] = useState(
  //   totalPrices + parseInt(shippingPrice) ||
  //     totalPrices + parseInt(shippingPrice)
  // ); // Use calculated price if totalPrice is not available

  console.log("try " + location.state.items);

  const [color1, setColor1] = useState("#E66253");
  const [color2, setColor2] = useState("#E66253");
  const [color3, setColor3] = useState("#E66253");
  const [phase1, setPhase1] = useState("ORDER PLACED");
  const [phase2, setPhase2] = useState("SHIPPED");

  const [phase3, setPhase3] = useState("ORDER DONE");

  function getStatus() {
    switch (location.state.status) {
      case "Ordered":
        setPhase2("To be Shipped");
        setPhase3("Order Not Done");
        setColor2("#B3B3B3");
        setColor3("#B3B3B3");
        return;
      case "On-Going":
        setPhase2("On Going Delivery");
        setPhase3("Order Not Done");
        setColor3("#B3B3B3");
        return;
    }
  }

  useEffect(() => {
    getStatus(); // Call getStatus only once on component mount
  }, []);

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
        color: "#000000",
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
        <br />
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Box
            sx={{
              borderRadius: "50%",
              background: color1,
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
            {dayjs(location.state.date).format("MMMM DD YYYY")}
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
              background: color2,
              height: "45px",
              width: "45px",
              display: "inline-block",
              justifyItems: "right",
            }}
          >
            <img src="/images/2.png" style={{ marginTop: 7 }} />
          </Box>
          <Typography>{phase2}</Typography>
          <Typography>Courier: {location.state.shipping} </Typography>
        </Grid>
        <Grid xs={2}>
          {" "}
          <hr style={{ marginTop: "3%" }} />
        </Grid>
        <Grid xs={3}>
          <Box
            sx={{
              borderRadius: "50%",
              background: color3,
              height: "45px",
              width: "45px",
              display: "inline-block",
              justifyItems: "left",
            }}
          >
            <img src="/images/3.png" style={{ marginTop: 7 }} />
          </Box>
          <Typography>{phase3}</Typography>
          <Typography>
            Date: <br />
            {location.state.schedule_date.map((item) => (
              <>{dayjs(item).format("MMMM DD YYYY")} - </>
            ))}{" "}
          </Typography>
        </Grid>
      </Grid>
      <br />
      {/* <Box>
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
      </Box> */}
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
        {console.log(orderData)}
        {orderData.map((item, index) => (
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
              <img src={ item.image && /\.(jpg|jpeg|png|gif)$/i.test(item.image)  ? item.image : "/images/food.png"} width="160px" height="160px" />

              </Grid>
              <Grid xs={3} sx={{ mt: "6%" }}>
                {item.name}{" "}
              </Grid>
              <Grid xs={1} sx={{ mt: "6%" }}></Grid>
              <Grid xs={4} sx={{ textAlign: "right", mr: 5, mt: "6%" }}>
                {" "}
                {item.price}
              </Grid>
            </Grid>
          </Box>
        ))}
        <br />
        <hr />
        <br />
        <Box>
          <Grid container spacing={2}>
            <Grid xs={5}></Grid>
            <Grid xs={3}> Product Total</Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
              {/* PHP {totalPrices} */} PHP{" "}
              {location.state.totalprice - location.state.shipping_price}
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid xs={5}></Grid>
            <Grid xs={3}> Shipping </Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
              PHP {location.state.shipping_price}
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={2}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <hr />
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={2} sx={{}}>
            <Grid xs={6}></Grid>
            <Grid xs={2} sx={{ textAlign: "left", ml: 5 }}>
              {" "}
              Total
            </Grid>
            <Grid xs={2.5} s>
              PHP {location.state.totalprice}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default MealPlanShopOrders;
