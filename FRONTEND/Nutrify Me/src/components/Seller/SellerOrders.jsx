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
import { Modal, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LalamoveApi from "../Meal Plan Shop//LalamoveApi";
import emailjs from "@emailjs/browser";

function SellerOrders() {
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [mealPlanData, setMealPlanData] = useState([]);
  const [orderedOrder, setOrderedOrder] = useState([]);
  const [onGoingOrder, setOnGoingOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState("Project Fit");
  const [phone, setPhone] = useState("012345678912");
  const [addressData, setAddressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [allOrder, setAllOrder] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };

  const handleOpen = (addressId, userId, orderId) => {
    console.log(userId);

    setUserDetails(userData.find((item) => item.user_id === userId));
    setOrderDetails(allOrder.find((item) => item.order_id === orderId));
    setSelectedOrder(orderId);
    setSelectedAddress(addressId);
    setSelectedUser(userId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [selectedMealDetails, setSelectedMealDetails] = useState([]);

  // {meal_plan: "plan",
  //  meals: ["joke", "joke"]
  // }
  const handleOpenDetails = async (orderId) => {
    setSelectedMealDetails([]);
    const tempPlanData = await AxiosInstance.get(`shopmealplan`);
    const tempMealsData = await AxiosInstance.get(`shopmeal`);

    const orderItems = allOrder.find((item) => item.order_id === orderId);
    console.log(tempPlanData.data);

    // let tempPlan = allOrder.find((item) => item.order_id === orderId);
    let tempMealArray = [];
    {
      orderItems.orders.forEach((items) => {
        const planIds = tempPlanData.data.find(
          (item) => item.shop_mealplan_id === items
        );

        console.log(tempMealsData.data);

        const meals = tempMealsData.data.filter(
          (item) => item.mealplan_id === planIds.shop_mealplan_id
        );

        const newMealDetail = {
          meal_plan: planIds,
          meals: meals,
        };
        tempMealArray.push(newMealDetail);
      });
    }
    // setSelectedMealDetails([...selectedMealDetails, newMealDetail]);

    setSelectedMealDetails(tempMealArray);
    console.log(selectedMealDetails);
    // tempPlan.filter((item) => item.user_id === userId;
    // setUserDetails(userData.find((item) => item.user_id === userId));
    // setOrderDetails(allOrder.find((item) => item.order_id === orderId));
    // setSelectedOrder(orderId);
    // setSelectedAddress(addressId);
    // setSelectedUser(userId);
    setIsOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setIsOpenDetails(false);
  };

  const sendEmail = (email, link, name) => {
    //e.preventDefault();
    // const newLogo = "/images/snacks.png"; // Replace with actual new logo path
    // setLogo(newLogo);
    // // setLogo("/images/snacks.png");
    // console.log(logo);
    // setPrimaryColor("blue");
    // console.log(primaryColor);
    // .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
    //   publicKey: "YOUR_PUBLIC_KEY",
    // })

    const forms = {
      user_email: email,
      link: link,
      to_name: name,
    };
    console.log(forms);
    emailjs
      .send(
        "service_1b6yxba",
        "template_bi87y8f",
        {
          user_email: email,
          link: link,
          to_name: name,
        },
        {
          publicKey: "_TwsSJqvcqcfz3C1h",
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const createOrder = async (address_ids, user_id, orderId) => {
    console.log(address_ids, addressData);
    const foundAddress = addressData.find(
      (item) => item.address_id === address_ids
    );

    console.log(foundAddress);
    console.log("foundAddress, address_id");

    try {
      setTimeout(async () => {
        try {
          const quotationData = await LalamoveApi.createQuotation(
            // 122.3573039,
            // 14.0592792,
            foundAddress.lang,
            foundAddress.longi,
            foundAddress.address
          );
          console.log(quotationData.data.data.stops[0].stopId);
          const orderData = await LalamoveApi.createOrder(
            quotationData.data.data.quotationId,
            foundAddress.phone,
            foundAddress.name,
            "none",
            quotationData.data.data.stops[0].stopId,
            quotationData.data.data.stops[1].stopId
          );

          // console.log(quotationData);
          console.log(orderData);

          const tempUser = userData.find((item) => item.user_id === user_id);
          console.log(tempUser, user_id);

          const tempOrder = allOrder.find((item) => item.order_id === user_id);
          console.log(tempUser, orderId);

          const tempAddress = addressData.find(
            (item) => item.address_id === user_id
          );
          console.log(tempUser, address_ids);
          // sendEmail();
          const data = {
            user: tempUser,
            order: tempOrder,
            address: tempAddress,
            order_details: orderData,
            date: dayjs().format("YYYY-MM-DD"),
            time: dayjs().format("HH:mm:ss"),
            status: "Deployed", // Deployed, Pick-Up, Delivering, Done
          };
          console.log(tempOrder);
          try {
            AxiosInstance.post(`deployedorder/`, {
              user: tempUser,
              order: tempOrder,
              address: tempAddress,
              order_details: orderData,
              date: dayjs().format("YYYY-MM-DD"),
              time: dayjs().format("HH:mm:ss"),
              status: "Deployed", // Deployed, Pick-Up, Delivering, Done
            }).then((res) => {
              console.log(res, res.data);
              sendEmail(
                tempUser.email,
                orderData.data.data.shareLink,
                tempAddress.name
              );
            });
          } catch (error) {
            console.log(error.response);
          }

          handleClose();
        } catch (error) {
          console.error("Error creating quotation:", error.message);
        }
      }, 2000); // Simulate a 2-second delay
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderData = async () => {
    console.log(dayjs().startOf("week").format("YYYY-MM-DD"));

    try {
      const reverses = await AxiosInstance.get(`order`);
      //   const filteredData = response.data.filter(
      //     (item) => item.user_id === loggedInUser.user_id
      //   );

      const mealsPlan = await AxiosInstance.get(`shopmealplan`);
      const meals = await AxiosInstance.get(`shopmeal`);

      setMealData(meals.data);
      setMealPlanData(mealsPlan.data);
      const temp = reverses.data;

      const response = temp.reverse();
      setAllOrder(response);
      const filteredOrderedData = response.filter(
        (item) => item.status === "Ordered"
      );

      setOrderedOrder(filteredOrderedData);
      // console.log(response);
      const filteredOnGoingData = response.filter((item) => {
        item.status === "On-Going";
      });

      setOnGoingOrder(filteredOnGoingData);

      const filteredDoneData = response.filter((item) => {
        item.status === "Delivered";
      });

      setDoneOrder(filteredDoneData);

      const userDeets = await AxiosInstance.get(`user`);
      setUserData(userDeets.data);
      // const filteredCartData = response.data.filter(
      //   (item) => item.user_id === loggedInUser.user_id
      // );

      // console.log(responseCart.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }

    try {
      const response = await AxiosInstance.get(`address`);
      setAddressData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrderData(); // Call getStatus only once on component mount
  }, []);

  const completeOrder = (deployedId) => {
    try {
      AxiosInstance.get(`order/`).then((res) => {
        console.log(res.data);
        const foundOrders = res.data.find(
          (item) => item.order_id === deployedId
        );

        console.log(foundOrders);

        try {
          AxiosInstance.put(`order/`, {
            order_id: foundOrders.order_id,
            user_id: foundOrders.user_id,
            orders: foundOrders.orders,
            date: foundOrders.date,
            status: "Delivered",
            address_id: foundOrders.address_id,
            payment: foundOrders.payment,
            shipping: foundOrders.shipping,
            notes: foundOrders.notes,
            totalprice: foundOrders.totalprice,
            shipping_price: foundOrders.shipping_price,
            payment_details: foundOrders.payment_details,
            schedule_date: foundOrders.schedule_date,
          }).then((res) => {
            console.log(res);
            getOrderData();
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {}
  };
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
      <ChatBox />
      New Orders <br />
      <Grid container spacing={2}>
        {orderedOrder.map((item, index) => (
          <Grid item xs={3} sm={4} md={6} key={index}>
            <Box
              sx={{
                border: 1,
                backgroundColor: "#E66253",
                borderRadius: 3,
                color: "#ffffff",
              }}
            >
              <br />

              <Grid container spacing={2}>
                <Grid xs={5}>Date: {item.date}</Grid>
                <Grid xs={6}>Payment: {item.payment}</Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid xs={6}>
                  Name:
                  {
                    userData?.find((items) => items.user_id === item.user_id)
                      ?.first_name
                  }
                </Grid>
                <Grid xs={6}>
                  Total Order Price:{item.totalprice - item.shipping_price}{" "}
                </Grid>
                <Grid xs={6}></Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid xs={6}>
                  <Button
                    sx={{
                      color: "#ffffff",
                      border: 0,
                      // fontWeight: "bold",
                      backgroundColor: "#539801",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: " #539801",
                        border: 0.5,
                        borderColor: "#539801",
                      },
                    }}
                    onClick={() => handleOpenDetails(item.order_id)}
                  >
                    Details
                  </Button>

                  <Modal
                    open={isOpenDetails}
                    onClose={handleCloseDetails}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <Box sx={style}>
                      {selectedMealDetails.map((item) => (
                        <>
                        <Typography>{item.meal_plan.name}</Typography>
                        <Typography>{item.meal_plan.name}</Typography>
                        </>
                       )
                      )}
                    </Box>
                  </Modal>
                </Grid>
                <Grid xs={6}>Shipping Price:{item.shipping_price}</Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid xs={6}></Grid>
                <Grid xs={6}>Total Price:{item.totalprice}</Grid>
              </Grid>

              <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={style}>
                  {" "}
                  {item.date}
                  <Grid container spacing={2} sx={{ my: 1, mx: 1 }}>
                    <Grid xs={2}>
                      {" "}
                      <img src="/images/food journal icon.png" />
                    </Grid>
                    <Grid xs={8}>Edit Food Information</Grid>
                    <Grid xs={2}>
                      <Button sx={{ float: "right" }} onClick={handleClose}>
                        <img src="/images/close.png" height="10" weight="10" />
                      </Button>
                    </Grid>
                  </Grid>
                  Name:
                  <TextField
                    id="outlined-multiline-flexible"
                    sx={{
                      width: "70%",
                      background: "#ffffff",
                      borderRadius: 0,
                    }}
                    // value={param.meals.Breakfast.food}
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  Phone Number:
                  <TextField
                    id="outlined-multiline-flexible"
                    sx={{
                      width: "70%",
                      background: "#ffffff",
                      borderRadius: 0,
                    }}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    // value={param.meals.Breakfast.food}
                    name="name"
                  />
                  {selectedAddress}
                  <Button
                    onClick={() =>
                      createOrder(selectedAddress, selectedUser, selectedOrder)
                    }
                  >
                    Create Order
                  </Button>
                </Box>
              </Modal>
              <Button
                sx={{
                  color: "#ffffff",
                  border: 0,
                  // fontWeight: "bold",
                  backgroundColor: "#539801",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: " #539801",
                    border: 0.5,
                    borderColor: "#539801",
                  },
                }}
                onClick={() =>
                  handleOpen(item.address_id, item.user_id, item.order_id)
                }
              >
                Deploy Order
              </Button>
              <Button
                onClick={() => completeOrder(item.order_id)}
                sx={{
                  color: "#E66253",
                  border: 0,
                  // fontWeight: "bold",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#E66253",
                    color: "#ffffff",
                    border: 0.5,
                    borderColor: "#ffffff",
                  },
                }}
              >
                Order Done
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      On Going Orders <br />
      Past Orders
    </div>
  );
}

export default SellerOrders;
