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
    width:"40%",
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

  const [mealData, setMealData] = useState([])
  const getMealPlanData = () => {

    let tempMeal = [];
    let planDetails; 
    let mealDetails;


   AxiosInstance.get(`shopmealplan`).then((res) => {
      planDetails = res.data.filter((item) => item.approve === false)
    

      AxiosInstance.get(`shopmeal`).then((respo) => {
        mealDetails = respo.data
        console.log(mealDetails)


        planDetails.forEach((item1) => {
          let tempDeets = [];
          
        for (let i=1; i<6; i++) {
          let mealList = [];
          mealDetails.map((item2) => {
            
            if (item2.mealplan_id === item1.shop_mealplan_id 
              && item2.day === i.toString()
            ){
              mealList.push(item2)
              
            }
          })
    console.log(mealList)
          tempDeets.push({Day: i, meals: mealList})
       
          console.log(i)
        }
        console.log(tempDeets)
        tempMeal.push({plan: item1, details: tempDeets})
        console.log(tempMeal)
      })

      console.log(tempMeal)
      setMealData(tempMeal)
      })
    
    
    
    
    
    
    })






    AxiosInstance.get(`shopmeal`).then((respo) => {
      mealDetails = respo.data
    })

    // planDetails.map((item) => (
    //     for (i=1; i<6; i++) {
    //         console.log(i)
    //       }
    // ))

  //   console.log(mealDetails)
  //   planDetails.forEach((item1) => {
  //     let tempDeets = [];
  //     let mealList = [];
  //   for (i=1; i<6; i++) {
  //     mealDetails.map((item2) => {
  //       if (item2.mealplan_id === item1.shop_mealplan_id 
  //           && item2.day === i
  //       ){
  //         mealList.push(item1)
  //       }
  //     })

  //     tempDeets.push ({Day: i, meals: tempDeets})
  //     console.log(i)
  //   }
  // })

    // for (i=1, i<6, i++) (
    //   planDetails.map((item) => (
    //   ))
    //   console.log(i)
    // )


    AxiosInstance.get(`shopmealplan`).then((res) => {
      setShopMealPlan(res.data);
      console.log(res.data.filter((item) => item.approve === false));


    //   AxiosInstance.get(`shopmeal`).then((respo) => {
    //     let mealList = [];

    //     respo.data.forEach((item3) => {

    //       for (i=1; i<6; i++) {
    //         console.log(i)
    //       }


    //       res.data.filter((item) => item.approve === false).forEach((item1) => {
    //         if (item3.mealplan_id === item1.shop_mealplan_id){
    //           mealList.push(item1)
    //         }
    //     })


    //     })
    //     console.log(mealList)
    //   });
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
          try {
          AxiosInstance.delete(`shopmealplan/${temp.shop_mealplan_id}`).then((respo) => {
            getMealPlanData();
            console.log(respo);
          });
         
        } catch (error) {
          console.log(error);
        }
       
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

      <Grid container={2} sx={{ mr: "5%", mt: "5%" }}>
        {shopMealPlan
          .filter((item, index) => item.approve === false)
          //.slice(0, 2)
          .map((items, index) => (
            <Grid xs={12} md={6}>
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
                Name: {" "}{items.name} <br />
                Description: {" "}{items.description}
                <br/>
                Start Week: {" "}{dayjs(items.start_week).format("MMMM DD, YYYY")}
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
          <center>
          {console.log(mealData.find((item) => item.plan.shop_mealplan_id === selectedOrderRecommend))}


          {mealData?.find((item) => item.plan.shop_mealplan_id === selectedOrderRecommend)?.details?.map(
            (item1) => ( 
              <Box>
                Day {" "} {item1?.Day}<br/>
                {item1?.meals.sort((a, b) => {
              const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
              return order.indexOf(a.type) - order.indexOf(b.type);
            }).map((item5) => (
                  <Box>
                  {item5?.type} : {item5.food}
                  </Box>
                ))}
              </Box>
            )
          )}
          {/* {console.log(
            shopMeal.filter(
              (item) => item.mealplan_id === selectedOrderRecommend
            )
          )} */}

         
          {/* {shopMeal
            .filter((item) => item.mealplan_id === selectedOrderRecommend)
            .map((items) => (
              <Box>
                {items.type}: {items.food}
              </Box>
            ))} */}
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
          </center>
        </Box>
      </Modal>
    </div>
  );
}

export default NutritionistApproveMealPlan;
