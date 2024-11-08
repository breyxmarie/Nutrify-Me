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

function PayPalRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.datas.totalprice);
  const receivedData = location.state;
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState([]);

  const createOrder = async (data, actions) => {
    // console.log(process.env.BASE_URL);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "PHP",
            value: location.state.datas.totalprice,
            //value: 0.01,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log(order);
    setLoading(true)
    setOrderDetails(order);
    console.log(location)

    try {
      console.log(location.state.state.meal.meal);
      AxiosInstance.post(`shopmealplan/`, {
        name: location.state.state.meal.name,
        approve: true,
        image: location.state.state.meal.meal[0].meals[0].details.recipe.image,
        description: "Generated Meal",
        start_week: dayjs("2019-10-25").format("YYYY-MM-DD"),
        end_week: dayjs("2019-10-31").format("YYYY-MM-DD"),
        price: location.state.state.request.price,
        // shippingPrice
      }).then((res) => {
        console.log(res);
        try {
          AxiosInstance.post(`order/`, {
            user_id: location.state.datas.user_id,
            orders: [res.data.id],
            date: dayjs().format("YYYY-MM-DD"),
            status: "Ordered",
            address_id: location.state.datas.address_id,
            payment: location.state.datas.payment,
            shipping: "Lalamove",
            notes: location.state.datas.notes,
            totalprice: location.state.datas.totalprice,
            shipping_price: location.state.datas.shipping_price,
            payment_details: order,
            schedule_date: [
              location.state.state.request.start_week,
              location.state.state.request.end_week
            ],
            // shippingPrice
          }).then((res) => {
            //   try {
            console.log(res);

            // const response = AxiosInstance.delete(
            //   `cart/${cartData[0].cart_id}`
            // );//
            // navigate("/meal-plan-shop-home");
            //   } catch (error) {
            //   console.log(error);
            //    }
            //   // getAddressData();
            //   // handleReset();
            //   // setActiveTab(0);
          });

          location.state.state.meal.meal.map((item) =>
            item.meals.map((items) =>
              //console.log(item.Day.substring(4))

              AxiosInstance.post(`shopmeal/`, {
                mealplan_id: res.data.id,
                type: items.Meal,
                calories: Math.floor(items.details.recipe.calories),
                fat: Math.floor(items.details.recipe.digest[0].daily),
                protein: Math.floor(items.details.recipe.digest[2].daily),
                carbs: Math.floor(items.details.recipe.digest[1].daily),
                sodium: Math.floor(items.details.recipe.digest[4].daily),
                potassium: Math.floor(items.details.recipe.digest[7].daily),
                food: items.details.recipe.label,
                image: items.details.recipe.image,
                day: item.Day.substring(4),
                // shippingPrice
              }).then((res) => {
                console.log(res);
              })
            )
          );
          AxiosInstance.get(`user/${location.state.datas.user_id}`).then((res) => {
            const userData = res.data;
         
            try {
              AxiosInstance.post(`notifications/`, {
                'type': "NewOrder", 
                'id': location.state.datas.user_id, 
                'user_id': 140, 
                'message': 
                `${userData.first_name + " " + 
                  userData.last_name} has made an order`,
                'link': '/seller-orders', 
                'seen': 0, 
                'other_id': location.state.datas.user_id,
                'title': "New Order",
                'date': dayjs().format("YYYY-MM-DD"),
              }).then((res) => {
                console.log(res, res.data);
              });
              } catch (error) {
                console.log(error);
              }
          })
          AxiosInstance.delete(
            `requestedmeals/${location.state.state.request.request_id}`
          ).then((res) => {
            console.log(res);
            setPaid(true);
            setLoading(false)
          });
          //   navigate("/meal-plan-shop-home");
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   AxiosInstance.post(`order/`, {
    //     user_id: location.state.user_id,
    //     orders: location.state.orders,
    //     date: dayjs().format("YYYY-MM-DD"),
    //     status: location.state.status,
    //     address_id: location.state.address_id,
    //     payment: location.state.payment,
    //     shipping: "Lalamove",
    //     notes: location.state.notes,
    //     totalprice: location.state.totalprice,
    //     shipping_price: location.state.shipping_price,
    //     payment_details: order,
    //     schedule_date: [
    //       dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
    //       dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
    //     ],
    //     // shippingPrice
    //   }).then((res) => {
    //     console.log(res, res.data);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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

export default PayPalRequest;
