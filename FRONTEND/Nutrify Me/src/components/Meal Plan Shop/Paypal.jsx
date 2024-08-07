import { useState } from "react";
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

function Paypal() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;
  const [paid, setPaid] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

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
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log(order);
    setPaid(true);
    setOrderDetails(order);

    try {
      AxiosInstance.post(`order/`, {
        user_id: location.state.user_id,
        orders: location.state.orders,
        date: dayjs().format("YYYY-MM-DD"),
        status: location.state.status,
        address_id: location.state.address_id,
        payment: location.state.payment,
        shipping: "Lalamove",
        notes: location.state.notes,
        totalprice: location.state.totalprice,
        shipping_price: location.state.shipping_price,
        payment_details: order,
        schedule_date: [
          dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
          dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
        ],
        // shippingPrice
      }).then((res) => {
        console.log(res, res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initialOptions = {
    //   clientId:
    //     "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    clientId:
      "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua",
    currency: "PHP",
    intent: "capture",
  };

  const back = () => {
    navigate("/meal-plan-shop-home");
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
      {console.log(location)}
      {paid ? (
        <>
          Payment Successful
          <Button onClick={back}>Back to Merchant</Button>
        </>
      ) : (
        <>
          {" "}
          Payment
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </PayPalScriptProvider>
        </>
      )}
    </div>
  );
}

export default Paypal;
