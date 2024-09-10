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
import { Buffer } from "buffer";
import axios from "axios";

function TelemedicinePaypalPayment() {
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

  const clientID =
    //  "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua";
    "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua";

  const clientSecret =
    // "ELKJGhT3-IhJlV61uzm2I0BfM2VSpKXt0sHmylv7Hg4VjOLk231k8JSGrv_--3iA0iFbYT3LD0HUFMo7";
    "ECq1HNxPasGMTi0RCU-ei7FNK4BgKM2bnSaManCsX2XH5x3UQ8ijEQLjH46mFQRNEb_YiXYFVYjdOHrZ";

  const basicAuth = Buffer.from(`${clientID}:${clientSecret}`).toString(
    "base64"
  );

  // const createOrder = async (data, actions) => {
  //   const payout = {
  //     sender_batch_header: {
  //       sender_batch_id: Math.floor(Math.random() * 1000000), // Replace with a unique ID
  //       email_subject: "You have a payout!",
  //       email_message: "You have received a payment.",
  //     },
  //     items: [
  //       {
  //         recipient_type: "EMAIL",
  //         amount: {
  //           value: 0.01,
  //           currency: "PHP", // Replace with desired currency
  //         },
  //         receiver: "nrmbelandres@gmail.com",
  //       },
  //     ],
  //   };
  // console.log(payout);
  // return actions.order.create(payout);

  // try {
  //   const response = await axios.post(
  //     "https://api-m.sandbox.paypal.com/v1/payments/payouts",
  //     payout,
  //     {
  //       headers: {
  //         Authorization: `Basic ${basicAuth}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(response.data);
  // } catch (error) {
  //   console.error("Error creating payout:", error);
  // }
  //};

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    setPaid(true);
    console.log(order);
  };

  const initialOptions = {
    //   clientId:
    //     "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    clientId: clientID,
    //"AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua",
    // "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua",
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
      ) : (
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
      )}
    </div>
  );
}

export default TelemedicinePaypalPayment;
