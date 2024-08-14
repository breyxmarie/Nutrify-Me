import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AxiosInstance from "../forms/AxiosInstance";
import Button from "@mui/material/Button";
import { Modal, Tab, Tabs } from "@mui/material";
import TextField from "@mui/material/TextField";

function SellerRequestOrders() {
  const [requestData, setRequestData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approveRequests, setApproveRequests] = useState([]);
  const [disapproveRequests, setDisapproveRequests] = useState([]);
  const [price, setPrice] = useState(0);
  // request:
  //  meal

  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
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

  const handleOpen = (data) => {
    setSelectedOrder(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenPrice = (data) => {
    console.log("hi");
    setSelectedOrder(data);
    setIsOpenPrice(true);
  };

  const handleClosePrice = () => {
    setIsOpenPrice(false);
  };

  const refreshData = () => {};
  const getData = async () => {
    const tempResponse = await AxiosInstance.get(`requestedmeals`);
    const mealData = await AxiosInstance.get(`generatedmeal`);

    const reverseResponse = tempResponse.data.reverse();

    const pendingData = reverseResponse.filter(
      (item) => item.status === "Pending"
    );
    // console.log(pendingData);
    const approveData = reverseResponse.filter(
      (item) => item.status === "Approved"
    );

    const disapproveData = reverseResponse.filter(
      (item) => item.status === "Dispproved"
    );

    const tempData = [];
    pendingData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      // console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempData.push(newData);
    });

    // console.log(tempData);
    const tempDataApprove = [];
    approveData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      // console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempDataApprove.push(newData);
    });

    const tempDataDisapprove = [];
    disapproveData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      // console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempDataDisapprove.push(newData);
    });

    // console.log(tempData);
    setRequestData(tempData);
    setPendingRequests(tempData);
    setApproveRequests(tempDataApprove);
    setDisapproveRequests(tempDataDisapprove);
  };

  useEffect(() => {
    getData();
  }, []);

  const approveOrder = async () => {
    const response = await AxiosInstance.get(`requestedmeals`);

    const tempData = response.data.find(
      (item) => item.request_id === selectedOrder
    );
    console.log(price);
    try {
      AxiosInstance.put(`requestedmeals/`, {
        request_id: tempData.request_id,
        user_id: tempData.user_id,
        generatedMeal_id: tempData.generatedMeal_id,
        date: tempData.date,
        status: "Approved",
        price: price,
      }).then((res) => {
        console.log(res);
        getData();
        handleClosePrice();
        // try {
        //   AxiosInstance.delete(`requestedmeals/${id}`).then((res) => {
        //     getData();
        //   });
        //   console.log(response);
        // } catch (error) {
        //   console.log(error);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disapproveOrder = async (id) => {
    const response = await AxiosInstance.get(`requestedmeals`);

    const tempData = response.data.find((item) => item.request_id === id);
    try {
      AxiosInstance.put(`requestedmeals/`, {
        request_id: tempData.request_id,
        user_id: tempData.user_id,
        generatedMeal_id: tempData.generatedMeal_id,
        date: tempData.date,
        status: "Disapproved",
      }).then((res) => {
        getData();
        // try {
        //   AxiosInstance.delete(`requestedmeals/${id}`).then((res) => {
        //     getData();
        //   });
        //   console.log(response);
        // } catch (error) {
        //   console.log(error);
        // }
      });
    } catch (error) {
      console.log(error);
    }
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
      Pending Requests
      {pendingRequests.map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box>
          {" "}
          {/* {console.log(item)} */}
          {item.request.date}
          <Button onClick={() => handleOpen(item.meal)}>View Details</Button>
          <Button onClick={() => handleOpenPrice(item.request.request_id)}>
            Approve
          </Button>
          <Button onClick={() => disapproveOrder(item.request.request_id)}>
            Disapprove
          </Button>
          {item.meal.meal.map((items) => (
            <Box>
              {" "}
              {items.Day}
              {items.meals.map((item1) => (
                <>{item1.Meal}</>
              ))}
            </Box>
          ))}
        </Box>
      ))}
      Appproved Request
      {approveRequests.map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box>
          {" "}
          {item.request.date}
          <Button onClick={() => handleOpen(item.meal)}>View Details</Button>
          {/* <Button onClick={() => approveOrder(item.request.request_id)}> */}
          {/* <Button onClick={() => handleOpenPrice(item.request.request_id)}>
            Approve
          </Button>
          <Button onClick={() => disapproveOrder(item.request.request_id)}>
            Disapprove
          </Button> */}
          {item.meal.meal.map((items) => (
            <Box>
              {" "}
              {items.Day}
              {items.meals.map((item1) => (
                <>{item1.Meal}</>
              ))}
            </Box>
          ))}
        </Box>
      ))}
      {/* setIsOpenPrice */}
      <Modal
        open={isOpenPrice}
        onClose={handleClosePrice}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          Input Price: onChange={(event) => setPrice(event.target.value)}
          <TextField
            onChange={(event) => setPrice(event.target.value)}
          ></TextField>
          <Button onClick={() => approveOrder()}>Approve</Button>
        </Box>
      </Modal>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedOrder?.name}
          {selectedOrder?.meal?.map((item) => (
            <Box>
              {item.Day}
              {console.log(item.meals)}
              {item.meals.map((items) => (
                <Box>
                  {items.Meal}
                  {items?.details.map((item1) => (
                    <Box>{item1.recipe.label}</Box>
                  ))}

                  {items?.details.recipe.label}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default SellerRequestOrders;
