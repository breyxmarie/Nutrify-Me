import { Button, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";
import ReactColorPicker from "@super-effective/react-color-picker";
import { HexColorPicker } from "react-colorful";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AxiosInstance from "../forms/AxiosInstance";
import { Modal, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MealPlanShopRequest() {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [approvedOrder, setApprovedOrder] = useState([]);
  const [disapprovedOrder, setDisapprovedOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    console.log(data);
    setSelectedOrder(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getRequestData = async () => {
    const responseCart = await AxiosInstance.get(`requestedmeals`);
    const mealData = await AxiosInstance.get(`generatedmeal`);

    const reverse = responseCart.data.reverse();

    const pendingData = reverse.filter((item) => item.status === "Pending");
    const approveData = reverse.filter((item) => item.status === "Approved");

    //setPendingOrder(reverse.filter((item) => item.status === "Pending"));

    //setApprovedOrder(reverse.filter((item) => item.user_id === "Approved"));

    const tempData = [];
    pendingData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempData.push(newData);
    });

    setPendingOrder(tempData);

    const tempDataApprove = [];
    approveData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempDataApprove.push(newData);
    });

    setApprovedOrder(tempDataApprove);
  };

  useEffect(() => {
    getRequestData();
  }, []);

  const pay = (datas) => {
    navigate("/meal-plan-shop-request-checkout", { state: datas });
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
      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em" }}
      >
        {" "}
        Pending Orders
      </Typography>
      <Grid container spacing={2}>
        {pendingOrder.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                background: "#898246",
                borderRadius: 4,
                mx: "10%",
                color: "#ffffff",
                py: 2,
              }}
            >
              Date: {item.request.date}
              <br />
              Status: {item.request.status}
              <br />
              <Button
                onClick={() => handleOpen(item.meal)}
                sx={{
                  background: "#ffffff",
                  color: "#E66253",
                  ml: 5,
                  mt: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#E66253",
                    color: "#ffffff",
                    border: 0.5,
                    borderColor: "#ffffff",
                  },
                }}
              >
                View Details
              </Button>
              {/* {item.meal.meal.map((items) => (
            <Box>
              {" "}
              {items.Day}
              {items.meals.map((item1) => (
                <>{item1.Meal}</>
              ))}
            </Box>
          ))} */}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 3 }}
      >
        {" "}
        Approved Orders
      </Typography>
      <Grid container spacing={2}>
        {approvedOrder.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                background: "#898246",
                borderRadius: 4,
                mx: "30%",
                color: "#ffffff",
                py: 2,
              }}
            >
              Date: {item.request.date}
              <br />
              Status: {item.request.status}
              <br />
              <Button
                onClick={() => handleOpen(item.meal)}
                sx={{
                  background: "#ffffff",
                  color: "#E66253",
                  ml: 5,
                  mt: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#E66253",
                    color: "#ffffff",
                    border: 0.5,
                    borderColor: "#ffffff",
                  },
                }}
              >
                View Details
              </Button>
              {/* {item.meal.meal.map((items) => (
            <Box>
              {" "}
              {items.Day}
              {items.meals.map((item1) => (
                <>{item1.Meal}</>
              ))}
            </Box>
          ))} */}
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* //! */}

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedOrder.name}
          {console.log(selectedOrder.meal)}
          {selectedOrder?.meal?.map((item) => (
            <Box>
              <center>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.3em" }}>
                  {item.Day}{" "}
                </Typography>
              </center>
              {console.log(item.meals)}
              <Grid container spacing={2}>
                {item.meals.map((items, index) => (
                  <Grid item xs={3} sm={4} md={6} key={index}>
                    <center>
                      <Box>
                        <img src={items?.image} width="40%" />
                        <br />
                        {items.Meal}
                        <br />

                        {items?.details.recipe.label}
                      </Box>
                    </center>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default MealPlanShopRequest;
