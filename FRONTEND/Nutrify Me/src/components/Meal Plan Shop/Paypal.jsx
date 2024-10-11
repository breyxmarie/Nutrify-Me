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

function Paypal() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;
  console.log(location, receivedData)
  

  const [paid, setPaid] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const orders = location.state.orders;
  const [mealData, setMealData] = useState([])
  const [userData, setUserData] = useState()
  const getData = () => {
    AxiosInstance.get(`shopmealplan`).then((res) => {
      setMealData(res.data)
    })
    AxiosInstance.get(`user/${location.state.user_id}`).then((res) => {
      setUserData(res.data)
    })


  }
  useEffect(() => {
    getData();
  }, []);

  const createOrder = async (data, actions) => {
   
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "PHP",
           value: location.state.totalprice,

            //value: 0.01,
          },
        },
      ],
    });
  };

  const press = () => {
    for (let i=0; i < receivedData.orders.length; i++) {
      console.log(i)
      console.log("hi", mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]))
      console.log(receivedData.orders[i])

      try {
        console.log("hi", mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]))
        AxiosInstance.post(`order/`, {
          user_id: location.state.user_id,
          orders: [receivedData.orders[i]],
          date: dayjs().format("YYYY-MM-DD"),
          status: location.state.status,
          address_id: location.state.address_id,
          payment: location.state.payment,
          shipping: "Lalamove",
          notes: location.state.notes,
          totalprice: location.state.totalprice,
          shipping_price: location.state.shipping_price,
          payment_details: "test",
          schedule_date: [
            mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]).start_week, 
            mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]).end_week
            // dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
            // dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
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
      }
      catch (error) {
        console.log(error)
      }

    }
  }

  const onApprove = async (data, actions) => {
    // order = await actions.order.capture();
  

    try {
      const order = await actions.order.capture();
      console.log("Order captured:", order);



      AxiosInstance.get(`shopmealplan`).then((res) => {
      for (let i=0; i < location.state.orders.length; i++) {
      
        console.log(location.state.orders.length, location.state)
        try {
          console.log("hi", location.state.orders[i],res.data, res.data.find((item1) => item1.shop_mealplan_id === location.state.orders[i]))
          AxiosInstance.post(`order/`, {
            user_id: location.state.user_id,
            orders: [receivedData.orders[i]],
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
              res.data.find((item1) => item1.shop_mealplan_id === location.state.orders[i]).start_week,
              res.data.find((item1) => item1.shop_mealplan_id === location.state.orders[i]).end_week
              // dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
              // dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
            ],
            // shippingPrice
          }).then((res) => {
            console.log(res, res.data);
            AxiosInstance.delete(`cart/${location.state.cart_id}`)
            .then((resp) => {
              console.log(resp);

              try {
                AxiosInstance.post(`notifications/`, {
                  'type': "NewOrder", 
                  'id': location.state.user_id, 
                  'user_id': 140, 
                  'message': 
                  `${userData.first_name + " " + userData.last_name} has made an order`,
                  'link': '/seller-orders', 
                  'seen': 0, 
                  'other_id': loggedInUser.user_id,
                  'title': "New Order",
                  'date': dayjs().format("YYYY-MM-DD"),
                }).then((res) => {
                  console.log(res, res.data);
                });
                } catch (error) {
                  console.log(error.response.data);
                }
              setPaid(true);
            setLoading(false)
            });;
            
            
          });
        }
        catch (error) {
          console.log(error)
        }
      
      }
    })


      setLoading(true);

  
      // Remove loops and Axios calls for now
      setPaid(true);
      setLoading(false);
    } catch (error) {
      console.error("Error capturing order:", error);
    
  }

    // setLoading(true)
    // setOrderDetails(order);
    // console.log(location.state.orders)

    // receivedData.orders.forEach((item) => {
    //   console.log(item)
    // } )
    // console.log(receivedData.orders.length)
    // for (let i=0; i < receivedData.orders.length; i++) {
    //   console.log(i)
    //   console.log("hi", item, mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders.mealplan_id).start_week)


    // }

    
    // for (let i=0; i < receivedData.orders.length; i++) {
      
   
    //   try {
    //     console.log("hi", mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]))
    //     AxiosInstance.post(`order/`, {
    //       user_id: location.state.user_id,
    //       orders: [receivedData.orders[i]],
    //       date: dayjs().format("YYYY-MM-DD"),
    //       status: location.state.status,
    //       address_id: location.state.address_id,
    //       payment: location.state.payment,
    //       shipping: "Lalamove",
    //       notes: location.state.notes,
    //       totalprice: location.state.totalprice,
    //       shipping_price: location.state.shipping_price,
    //       payment_details: order,
    //       schedule_date: [
    //         mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]).start_week, 
    //         mealData.find((item1) => item1.shop_mealplan_id === receivedData.orders[i]).end_week
    //         // dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
    //         // dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
    //       ],
    //       // shippingPrice
    //     }).then((res) => {
    //       console.log(res, res.data);
    //       AxiosInstance.delete(`cart/${location.state.cart_id}`)
    //       .then((resp) => {
    //         console.log(resp);
    //         setPaid(true);
    //       setLoading(false)
    //       });;
          
          
    //     });
    //   }
    //   catch (error) {
    //     console.log(error)
    //   }
    
    // }

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
    //     AxiosInstance.delete(`cart/${location.state.cart_id}`)
    //     .then((resp) => {
    //       console.log(resp);
    //       setPaid(true);
    //     setLoading(false)
    //     });;
        
        
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

export default Paypal;
