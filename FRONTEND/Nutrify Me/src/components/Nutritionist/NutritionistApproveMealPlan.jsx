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
import Grid from "@mui/material/Grid";
import { Modal, Tab, Tabs } from "@mui/material";

function NutritionistApproveMealPlan() {
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
  const [selectedOrderRecommend, setSelectedOrderRecommend] = useState([]);
  const [isOpenRecommend, setIsOpenRecommend] = useState(false);

  const handleOpenRecommend = (data) => {
    console.log(data);
    setSelectedOrderRecommend(data);
    setIsOpenRecommend(true);
  };

  const handleCloseRecommend = () => {
    setIsOpenRecommend(false);
  };
  const [shopMeal, setShopMeal] = useState([]);
  const [shopMealPlan, setShopMealPlan] = useState([]);
  const getMealPlanData = () => {
    AxiosInstance.get(`shopmealplan`).then((res) => {
      setShopMealPlan(res.data);
      console.log(res);
    });
    AxiosInstance.get(`shopmeal`).then((res) => {
      setShopMeal(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    getMealPlanData();
  }, []);

  const approve = (id) => {
    console.log(id);
    const temp = shopMealPlan.find((item) => item.shop_mealplan_id === id);
    try {
      AxiosInstance.put(`shopmealplan/`, {
        shop_mealplan_id: temp.shop_mealplan_id,
        name: temp.name,
        image: temp.image,
        description: temp.description,
        start_week: temp.start_week,
        end_week: temp.end_week,
        price: temp.price,
        approve: 1,
      }).then((res) => {
        console.log(res);
        getMealPlanData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disapprove = (id) => {
    console.log(id);
    const temp = shopMealPlan.find((item) => item.shop_mealplan_id === id);
    try {
      AxiosInstance.put(`shopmealplan/`, {
        shop_mealplan_id: temp.shop_mealplan_id,
        name: temp.name,
        image: temp.image,
        description: temp.description,
        start_week: temp.start_week,
        end_week: temp.end_week,
        price: temp.price,
        approve: 0,
      }).then((res) => {
        console.log(res);
        getMealPlanData();
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
        marginTop: "40px",
        fontFamily: "Poppins",
      }}
    >
      {console.log(shopMealPlan.filter((item) => item.approve === true))}
      <Grid container={2} sx={{ mr: "5%", mt: "5%" }}>
        {shopMealPlan
          .filter((item, index) => item.approve === false)
          //.slice(0, 2)
          .map((items, index) => (
            <Grid xs={6}>
              <Box
                sx={{
                  background: "#898246",
                  borderRadius: 4,
                  color: "#ffffff",
                  ml: 5,
                  mr: 5,
                  py: 2,
                  mt: 2,
                }}
              >
                {items.name} <br />
                {items.description}
                {items.start_week}
                <br />
                <Button
                  onClick={() => handleOpenRecommend(items.shop_mealplan_id)}
                  sx={{
                    background: "#ffffff",
                    color: "#E66253",
                    ml: 0,
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
                <br />
                <Button
                  onClick={() => approve(items.shop_mealplan_id)}
                  sx={{
                    background: "#ffffff",
                    color: "#E66253",
                    ml: 0,
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
                  Approve
                </Button>
                <Button
                  onClick={() => disapprove(items.shop_mealplan_id)}
                  sx={{
                    background: "#ffffff",
                    color: "#E66253",
                    ml: 2,
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
                  Disapprove
                </Button>
              </Box>
            </Grid>
          ))}
      </Grid>

      <Modal
        open={isOpenRecommend}
        onClose={handleCloseRecommend}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {console.log(
            shopMeal.filter(
              (item) => item.mealplan_id === selectedOrderRecommend
            )
          )}
          {shopMeal
            .filter((item) => item.mealplan_id === selectedOrderRecommend)
            .map((items) => (
              <Box>
                {items.type}: {items.food}
              </Box>
            ))}
          {/* {selectedOrderRecommend.name}
          {console.log(selectedOrderRecommend)}
          {selectedOrderRecommend?.map((item) => (
            <Box>
              <center>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.3em" }}>
                  Day {item.day}{" "}
                </Typography>
              </center>
              {console.log(item.meals)}
              <Grid container spacing={2}>
                {item.meals.map((items, index) => (
                  <Grid item xs={3} sm={4} md={6} key={index}>
                    <center>
                      <Box>
                        {items?.type} <br />
                        {items?.food}
                      </Box>
                    </center>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))} */}
        </Box>
      </Modal>
    </div>
  );
}

export default NutritionistApproveMealPlan;
