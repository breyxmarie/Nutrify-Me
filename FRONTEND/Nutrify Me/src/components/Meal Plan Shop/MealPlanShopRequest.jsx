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
  const [pendingOrderRecommend, setPendingOrderRecommend] = useState([]);
  const [approvedOrderRecommend, setApprovedOrderRecommend] = useState([]);
  const [disapprovedOrderRecommend, setDisapprovedOrderRecommend] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedOrderRecommend, setSelectedOrderRecommend] = useState([]);

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

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (data) => {
    console.log(data);
    setSelectedOrder(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [isOpenRecommend, setIsOpenRecommend] = useState(false);

  const handleOpenRecommend = (data) => {
    console.log(data);
    setSelectedOrderRecommend(data);
    setIsOpenRecommend(true);
  };

  const handleCloseRecommend = () => {
    setIsOpenRecommend(false);
  };

  const getRequestData = async () => {
    const responseCart = await AxiosInstance.get(`requestedmeals`);
    const recommendData = await AxiosInstance.get(`requestedrecommendmeals`);
    const mealData = await AxiosInstance.get(`generatedmeal`);

    const reverse = responseCart.data.reverse();

    const pendingData = reverse.filter((item) => item.status === "Pending");
    const approveData = reverse.filter((item) => item.status === "Approved");
    const disapproveData = reverse.filter((item) => item.status === "Dispproved");
   
    const reverseRecommend = recommendData.data.reverse();
    const pendingDataRecommend = reverseRecommend.filter((item) => item.status === "Pending");
    const approveDataRecommend = reverseRecommend.filter((item) => item.status === "Approved");
    const disapproveDataRecommend = reverseRecommend.filter((item) => item.status === "Dispproved");
   
    setPendingOrderRecommend(pendingDataRecommend)
setApprovedOrderRecommend(approveDataRecommend)
    setDisapprovedOrderRecommend(disapproveDataRecommend)
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

    const tempDataDisapprove = [];
    disapproveData.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);
  
      const newData = {
        request: item,
        meal: meals,
      };
  
      tempDataDisapprove.push(newData);
    });
  
    setDisapprovedOrder(tempDataDisapprove);





    //? recommend

    const tempDataRecommend = [];
    pendingDataRecommend.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempDataRecommend.push(newData);
    });

   // setPendingOrderRecommend(tempDataRecommend);

    const tempDataApproveRecommend = [];
    approveDataRecommend.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);

      const newData = {
        request: item,
        meal: meals,
      };

      tempDataApproveRecommend.push(newData);
    });

   // setApprovedOrder(tempDataApproveRecommend);

    const tempDataDisapproveRecommend = [];
    disapproveDataRecommend.forEach((item) => {
      const meals = mealData.data.find(
        (items) => items.generatedMeal_id === item.generatedMeal_id
      );
      console.log(meals);
  
      const newData = {
        request: item,
        meal: meals,
      };
  
      tempDataDisapproveRecommend.push(newData);
    });
  
   // setDisapprovedOrder(tempDataDisapproveRecommend);
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
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 5, mb: 3 }}
      >
        {" "}
        Pending Orders
      </Typography>

      <Grid container spacing = {2}>
      <Grid xs = {6}>
        <Typography  sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Generated Meal Plans
        </Typography>
       {pendingOrder.length > 0 ?( <Grid container spacing={2}>
        {pendingOrder.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
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
      </Grid>) : (<>No Orders</>)}
      </Grid>



      <Grid xs = {6}>
      <Typography sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Recommended Meal Plans
        </Typography>

      {pendingOrderRecommend.length > 0 ? (  <Grid container spacing={2}>
        {pendingOrderRecommend.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box
              sx={{
                background: "#898246",
                borderRadius: 4,
                mx: "10%",
                color: "#ffffff",
                py: 2,
              }}
            >
              Date: {item.date}
              <br />
              Status: {item.status}
              <br />
              <Button
                onClick={() => handleOpenRecommend(item.meal)}
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
      </Grid>) : (<>No Orders</>)}
      </Grid>
      </Grid>

       
      
      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 3, mb: 3 }}
      >
        {" "}
        Approved Orders
      </Typography>

      <Grid container spacing = {2}>
      <Grid xs = {6}>
        <Typography  sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Generated Meal Plans
        </Typography>
     { approvedOrder.length > 0 ? (   <Grid container spacing={2}>
        {approvedOrder.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
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
              {console.log(item)}
              <Button
                onClick={() => pay(item)}
                sx={{
                  background: "#ffffff",
                  color: "#E66253",
                  ml: 3,
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
                Pay
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
      </Grid>) : (<>No Orders</>)}
      </Grid>
      <Grid xs = {6}>
      <Typography sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Recommended Meal Plans
        </Typography>

        {approvedOrderRecommend.length > 0 ? (<Grid container spacing={2}>
        {approvedOrderRecommend.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box
              sx={{
                background: "#898246",
                borderRadius: 4,
                mx: "10%",
                color: "#ffffff",
                py: 2,
              }}
            >
              Date: {item.date}
              <br />
              Status: {item.status}
              <br />
              <Button
                onClick={() => handleOpenRecommend(item.meal)}
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
      ) : (<>No Orders</>)}
      </Grid>
      </Grid>





      {/* //! */}


{/* //! disapprove  */}
<Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 5, mb: 5 }}
      >
        {" "}
        Disapproved Orders
      </Typography>

      <Grid container spacing = {2}>
      <Grid xs = {6}>
        <Typography  sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Generated Meal Plans
        </Typography>
      {disapprovedOrder.length > 0 ? (  <Grid container spacing={2}>
        {disapprovedOrder.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
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
      </Grid>) : (<>No Orders</>)}
      </Grid>
      <Grid xs = {6}>
      <Typography sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.5em", mb: 1 }}>
          Recommended Meal Plans
        </Typography>

        {disapprovedOrderRecommend.length > 0 ?(<Grid container spacing={2}>
        {disapprovedOrderRecommend.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box
              sx={{
                background: "#898246",
                borderRadius: 4,
                mx: "10%",
                color: "#ffffff",
                py: 2,
              }}
            >
              Date: {item.date}
              <br />
              Status: {item.status}
              <br />
              <Button
                onClick={() => handleOpenRecommend(item.meal)}
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
      </Grid>) : (<>No Orders</>)}
      </Grid>
      </Grid>










{/* //!  */}
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


      {/* //! recommend Modal */}
      <Modal
        open={isOpenRecommend}
        onClose={handleCloseRecommend}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedOrderRecommend.name}
          {console.log(selectedOrderRecommend)}
          {selectedOrderRecommend?.map((item) => (
            <Box>
              <center>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.3em" }}>
                  Day {" "}{item.day}{" "}
                </Typography>
              </center>
              {console.log(item.meals)}
              <Grid container spacing={2}>
                {item.meals.map((items, index) => (
                  <Grid item xs={3} sm={4} md={6} key={index}>
                    <center>
                      <Box>
                      {items?.type} <br/>
                        {items?.food}
                      </Box>
                    </center>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Modal>


      {/* //? */}
    </div>
  );
}

export default MealPlanShopRequest;
