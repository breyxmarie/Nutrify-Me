import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import AxiosInstance from "../forms/AxiosInstance";
import dayjs from "dayjs";
import ChatBox from "./ChatBox";

function SellerOrders() {
  const [orderData, setOrderData] = useState([]);
  const [orderedOrder, setOrderedOrder] = useState([]);
  const [onGoingOrder, setOnGoingOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);

  const getOrderData = async () => {
    console.log(dayjs().startOf("week").format("YYYY-MM-DD"));

    try {
      const reverses = await AxiosInstance.get(`order`);
      //   const filteredData = response.data.filter(
      //     (item) => item.user_id === loggedInUser.user_id
      //   );

      const temp = reverses.data;
      const response = temp.reverse();

      const filteredOrderedData = response.filter(
        (item) => item.status === "Ordered"
      );

      setOrderedOrder(filteredOrderedData);
      console.log(response);
      const filteredOnGoingData = response.filter((item) => {
        item.status === "On-Going";
      });

      setOnGoingOrder(filteredOnGoingData);

      const filteredDoneData = response.filter((item) => {
        item.status === "On-Going";
      });

      setDoneOrder(filteredDoneData);

      const responseCart = await AxiosInstance.get(`shopmealplan`);
      const filteredCartData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      console.log(responseCart.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrderData(); // Call getStatus only once on component mount
  }, []);
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
      New Orders <br />
      {orderedOrder.map((item) => (
        <Box>
          {item.date} <br />
          {item.payment} <br />
          {item.shipping_price} <br />
          {item.totalprice} <br />
          <Button>Deploy Order</Button>
          <Button>Order Done</Button>
        </Box>
        // console.log(item);
      ))}
      On Going Orders <br />
      Past Orders
      <ChatBox />
    </div>
  );
}

export default SellerOrders;
