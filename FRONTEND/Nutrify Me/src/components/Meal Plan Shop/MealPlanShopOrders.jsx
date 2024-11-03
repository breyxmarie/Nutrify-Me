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

  const [isHovered, setIsHovered] = useState(false);



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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

  console.log(location.state);

  const [color1, setColor1] = useState("#E66253");
  const [color2, setColor2] = useState("#E66253");
  const [color3, setColor3] = useState("#E66253");
  const [phase1, setPhase1] = useState("Ordered");
  const [phase2, setPhase2] = useState("On-Going");

  const [phase3, setPhase3] = useState("Delivered");

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
            
            }}
          >
            <Grid container spacing={2} sx={{ mt: "2%", ml: "2%",   color: "#99756E",
              fontWeight: "bold",
              fontSize: "120%", }}>
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


            <table style={{width:"150%"}}>
                      <tr>
                        <th></th>
                        <th>Day 1</th>
                        <th>Day 2</th>
                        <th>Day 3</th>
                        <th>Day 4</th>
                        <th>Day 5</th>
                      </tr>
                      <tr>
                        <td>Breakfast</td>
                        <td>₱ {parseInt((item.price / 5) * 0.32 )}</td>
                        <td>₱ {parseInt((item.price / 5) * 0.33 )}</td>
                        <td>₱ {parseInt((item.price / 5) * 0.25)}</td>

                        <td>₱ {parseInt((item.price / 5) * 0.33 )}</td>
                        <td>₱ {parseInt((item.price / 5) * 0.21 )}</td>

                      </tr>

                      <tr>
                        <td>Lunch</td>
                        <td>₱ {parseInt((item.price / 5) * 0.37) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.23)}</td>
                        <td>₱ {parseInt((item.price / 5) * 0.33 )}</td>

                        <td>₱ {parseInt((item.price / 5) * 0.32) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.35) }</td>

                      </tr>

                      <tr>
                        <td>Snack</td>
                        <td>₱ {parseInt((item.price / 5) * 0.1) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.115) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.12) }</td>

                        <td>₱ {parseInt((item.price / 5) * 0.11) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.125 )}</td>

                      </tr>
                      <tr>
                        <td>Dinner</td>
                        <td>₱ {parseInt((item.price / 5) * 0.21) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.31) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.32) }</td>

                        <td>₱ {parseInt((item.price / 5) * 0.22) }</td>
                        <td>₱ {parseInt((item.price / 5) * 0.325 )}</td>

                      </tr>

                    </table>




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
            ₱ {Math.round(Math.round((location.state.totalprice - location.state.shipping_price) - ( (location.state.totalprice - location.state.shipping_price) - (location.state.totalprice - location.state.shipping_price) / 1.12))) }

            </Grid>
          </Grid>
          <br/>
          <Grid container spacing={2}>
            <Grid xs={5}></Grid>
            <Grid xs={2} sx = {{display: "flex", alignItems: "flex-end",
                                justifyContent: "flex-end"
            }}> VAT  </Grid>
              <Grid xs = {1}>
              <div   
 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
 style = {{border: '1px solid black', borderRadius: 15, marginRight: "60%"
  , marginLeft: "10%",  marginTop: "0%"
 }}>   

      ?
      {isHovered && <div className="tooltip"  style={{
        zIndex: 10,
        marginRight: "20%",
            position: 'absolute',
            left: '60%', // Adjust this value as needed
            top: '80%',
            transform: 'translateY(-50%)',
          backgroundColor: 'lightgray',
            padding: '10px',
            border: '1px solid black',
          fontSize: '20px',
            borderRadius: '5px',
            color: "#000000",
          }}>The Philippine government has implemented a 12% Value-Added Tax (VAT) on online purchases through Republic Act No. 12023. This law aims to expand the tax base and ensure fair taxation for both domestic and foreign digital service providers. </div>}
    </div></Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
              {/* PHP {totalPrices} */} ₱{" "}
              {parseInt( (location.state.totalprice - location.state.shipping_price) - (location.state.totalprice - location.state.shipping_price) / 1.12)}
         </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid xs={5}></Grid>
            <Grid xs={3}> Shipping </Grid>
            <Grid xs={2} sx={{ textAlign: "right", mr: 5 }}>
            ₱ {location.state.shipping_price}
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
            ₱ {location.state.totalprice}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default MealPlanShopOrders;
