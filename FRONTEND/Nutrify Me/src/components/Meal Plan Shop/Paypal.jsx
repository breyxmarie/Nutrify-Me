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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;

  const [paid, setPaid] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const createOrder = async (data, actions) => {
   
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "PHP",
           value: location.state.totalprice,

          // value: 0.01,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
  
    setLoading(true)
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
        AxiosInstance.delete(`cart/${location.state.cart_id}`)
        .then((resp) => {
          console.log(resp);
          setPaid(true);
        setLoading(false)
        });;
        
        
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
        marginTop: "40px",
        fontFamily: "Poppins",
      }}
    >
  
      {paid === true && loading === false ? (
        <>
          {" "}
          <img src="/images/payment.png" width="12%" height="12%" />
          <Typography
            sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.8em" }}
          >
            PAYMENT SUCCESSFUL!
          </Typography>
          <Button onClick={back} sx={{ textDecoration: "underline" }}>
            Back to Merchant
          </Button>
        </>
      ) : paid === false && loading === false ? (
        <>
          {" "}
          <img src="/images/payment.png" width="12%" height="12%" />
          <Typography
            sx={{ color: "#99756E", fontWeight: "bold", fontSize: "2.5em" }}
          >
            PAYMENT
          </Typography>
          <Typography sx={{ color: "#99756E", fontSize: "1.1em" }}>
            Select Payment Method
          </Typography>
          <center>
            <Box justifyContent="center" sx={{ px: "25%", mt: 2 }}>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)}
                />
              </PayPalScriptProvider>
            </Box>
          </center>
        </>
      ) : paid === false && loading === true ? (<>
       <center>
            <img src="/images/spin.gif" width="13%" />
            <br/>
            Capturing Order Please Wait...
            </center>
      </>)
    : (<></>)
    }
    </div>
  );
}

export default Paypal;
