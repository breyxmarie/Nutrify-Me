import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AxiosInstance from "../forms/AxiosInstance";
import Button from "@mui/material/Button";
import { Modal, Tab, Tabs } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import Grid from "@mui/material/Grid";

function SellerRequestOrders() {
  const buttons = ["Pending Orders", "Approved Orders"];
  const [requestData, setRequestData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenPriceRecommend, setIsOpenPriceRecommend] = useState(false);
  const [isOpenRecommend, setIsOpenRecommend] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approveRequests, setApproveRequests] = useState([]);
  const [disapproveRequests, setDisapproveRequests] = useState([]);
  const [price, setPrice] = useState(0);
  // request:
  //  meal
  const [loading1, setLoading1] = useState();

  const [loading2, setLoading2] = useState();
  const [loading3, setLoading3] = useState();
  const [loading4, setLoading4] = useState();

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
    console.log(data)
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenRecommend = (data) => {
    setSelectedOrder(data);
    console.log(data)
   setIsOpenRecommend(true);
  };

  const handleCloseRecommend = () => {
    setIsOpenRecommend(false);
  };

  const handleOpenPrice = (data) => {
    console.log("hi");
    setSelectedOrder(data);
    setIsOpenPrice(true);
  };

  const handleClosePrice = () => {
    setIsOpenPrice(false);
  };

  const handleOpenPriceRecommend = (data) => {
    console.log("hi");
    setSelectedOrder(data);
    setIsOpenPriceRecommend(true);
  };

  const handleClosePriceRecommend = () => {
    setIsOpenPriceRecommend(false);
  };

  const [userData, setUserData] = useState([])
  const refreshData = () => {};
  const [recommendData, setRecommendData] = useState([])
  const getData = async () => {
    const tempResponse = await AxiosInstance.get(`requestedmeals`);
    const tempRecommendResponse = await AxiosInstance.get(`requestedrecommendmeals/`);
    
    const mealData = await AxiosInstance.get(`generatedmeal`);
    const useData = await AxiosInstance.get(`user`);
    console.log(useData.data)
    setUserData(useData.data)
console.log(tempResponse)
    const reverseResponse = tempResponse.data.reverse();
    const reverseRecommendResponse = tempRecommendResponse.data.reverse();
    setRecommendData(reverseRecommendResponse)

    
    if (recommendData.filter(
      (item) => item.status === "Pending"
    ).length > 0) {
      setLoading2(true);
    } else {
      setLoading2(false);
    }

    console.log(recommendData.filter(
      (item) => item.status === "Approved"
    ).length)
    if (recommendData.filter(
      (item) => item.status === "Approved"
    ).length > 0) {
      setLoading4(true);
    } else {
      setLoading4(false);
    }
    
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

    if (tempData.length > 0) {
      setLoading1(true);
    } else {
      setLoading1(false);
    }
    setPendingRequests(tempData);
    if (tempDataApprove.length > 0) {
      setLoading3(true);
    } else {
      setLoading3(false);
    }
    setApproveRequests(tempDataApprove);
    setDisapproveRequests(tempDataDisapprove);
  };

  useEffect(() => {
    getData();
  }, []);



  const approveOrderRecommend = async () => {
    const response = await AxiosInstance.get(`requestedrecommendmeals`);

    const tempData = response.data.find(
      (item) => item.request_id === selectedOrder
    );
    console.log(price);
    try {
      AxiosInstance.put(`requestedrecommendmeals/`, {
        request_id: tempData.request_id,
        user_id: tempData.user_id,
        date: tempData.date,
        status: "Approved",
        price: price,
        start_week: tempData.start_week ,
        end_week: tempData.end_week ,
        meal: tempData.meal,
        recommend_mealplan_id: tempData.recommend_mealplan_id,
      }).then((res) => {
        console.log(res);
        getData();
        handleClosePriceRecommend();
        toast.success("Request Approved!");
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


  const disapproveOrderRecommend = async (id) => {
    const response = await AxiosInstance.get(`requestedrecommendmeals`);

    const tempData = response.data.find(
      (item) => item.request_id === id
    );
    console.log(response.data);
    try {
      AxiosInstance.put(`requestedrecommendmeals/`, {
        request_id: tempData.request_id,
        user_id: tempData.user_id,
        date: tempData.date,
        status: "Disapproved",
        price: price,
        start_week: tempData.start_week ,
        end_week: tempData.end_week ,
        meal: tempData.meal,
        recommend_mealplan_id: tempData.recommend_mealplan_id,
      }).then((res) => {
        console.log(res);
        getData();
        toast.success("Request Disapprove");
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
        start_week: tempData.start_week ,
        end_week: tempData.end_week ,
      }).then((res) => {
        console.log(res);
        getData();
        handleClosePrice();
        toast.success("Request Approved!");
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
        start_week: tempData.start_week ,
        end_week: tempData.end_week ,
      }).then((res) => {
        getData();
        toast.success("Request Dispproved!");
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
      <Grid container spacing={2}>
 {buttons.map((buttonLabel, index) => (
    <Grid item xs={6} sm={6} md={6} key={index}>
    <Button
      key={index}
      variant="contained" // Adjust variant as needed
      onClick={() => setActiveButton(index)}
      sx={{
        borderColor: "#ffffff",
        fontWeight: "bold",
        boxShadow: 1,
        mx: 1,
        fontSize: "20px",
        background: "#ffffff",
        color: activeButton === index ? "#E66253" : "#E3ACA5", // Adjust colors as desired
        "&:hover": {
          backgroundColor: "#E66253",
          color: "#ffffff",
          border: 0.5,
          borderColor: "#ffffff",
        },
      }}
    >
      {buttonLabel}
    </Button>{" "}
  </Grid>
 ))}
</Grid>

{activeButton === 0 ? (
        <>     

<Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 5, mb: 3 }}
      >
      Pending Requests</Typography> 

      <Grid container spacing = {2}> 
        <Grid xs = {6}> 
      Generated Meal Plans<br/>
      {console.log(pendingRequests)}
      {pendingRequests.length > 0 && loading1 === true ? 
      (<> {pendingRequests.map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box     sx={{
          background: "#898246",
          borderRadius: 4,
          mx: "10%",
          color: "#ffffff",
          py: 2,
          mt: 2
        }}> 
          {" "}
          {/* {console.log(item)} */}
          {item.request.date}
          <br/>
          By: {" "} 
          {userData.find((items) => items.user_id === item.request.user_id).first_name}
         {" "}
          {userData.find((items) => items.user_id === item.request.user_id).last_name}
         <br/>
          <Button      sx={{
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
                }} onClick={() => handleOpen(item.meal)}>View Details</Button>
          <Button     sx={{
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
                }} onClick={() => handleOpenPrice(item.request.request_id)}>
            Approve
          </Button>
          <Button     sx={{
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
                }} onClick={() => disapproveOrder(item.request.request_id)}>
            Disapprove
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
      ))}</>) : pendingRequests.length === 0 && loading1 === false ? (
            <>No Orders</>
          ) : (
            <>
              {" "}
              <img src="/images/magnify.gif" width="13%" />
              <Typography>Loading...</Typography>
            </>
          ) }</Grid>
        <Grid xs = {6}><Typography>Recommended Meal Plans</Typography>

{recommendData.filter(
      (item) => item.status === "Pending"
    ).length > 0 ? 
      (<>
{recommendData.filter(
      (item) => item.status === "Pending"
    ).map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box     sx={{
          background: "#898246",
          borderRadius: 4,
          mx: "10%",
          color: "#ffffff",
          py: 2,
          mt: 2, 
        }}> 
          {" "}
          {/* {console.log(item)} */}
          {item?.date}
          <br/>
          By: {" "} 
         {userData.find((items) => items.user_id === item.user_id).first_name}
         {" "}
          {userData.find((items) => items.user_id === item.user_id).last_name}
         <br/>  
          <Button      sx={{
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
                }} onClick={() => handleOpenRecommend(item)}>View Details</Button>
          <Button     sx={{
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
                }} onClick={() => handleOpenPriceRecommend(item.request_id)}>
            Approve
          </Button>
          <Button     sx={{
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
                }} onClick={() => disapproveOrderRecommend(item.request_id)}>
            Disapprove
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
       ))}</>) : recommendData.filter(
        (item) => item.status === "Pending"
      ).length === 0 && loading2 === false ? (
        <>No Orders</>
      ) : (
        <>
          {/* {" "}
          <img src="/images/magnify.gif" width="13%" />
          <Typography>Loading...</Typography> */}
        </>
      ) }</Grid>
      </Grid>
      
      </> ) : activeButton === 1 ? (<> 
      <Typography
        sx={{ color: "#99756E", fontWeight: "bold", fontSize: "1.6em", mt: 5, mb: 3 }}
      >
      Approved Request </Typography>
<Grid container spacing = {2}>
  <Grid xs = {6}>
      Generated Meal Plans <br/>
      {approveRequests.length > 0 && loading3 === true ? 
      (<>
      {approveRequests.map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box  sx={{
          background: "#898246",
          borderRadius: 4,
          mx: "10%",
          color: "#ffffff",
          py: 2,
          mt: 2,
        }}>
          {" "}
          {item.request.date}
          <br/>
          By: {" "} 
          {userData.find((items) => items.user_id === item.request.user_id).first_name}
         {" "}
          {userData.find((items) => items.user_id === item.request.user_id).last_name}
          <br/>
          <Button sx={{
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
                }} onClick={() => handleOpen(item.meal)}>View Details</Button>
          {/* <Button onClick={() => approveOrder(item.request.request_id)}> */}
          {/* <Button onClick={() => handleOpenPrice(item.request.request_id)}>
            Approve
          </Button>
          <Button onClick={() => disapproveOrder(item.request.request_id)}>
            Disapprove
          </Button> */}
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
      ))}</>) : approveRequests.length === 0 && loading3 === false ? (
        <Typography>No Orders</Typography>
      ) : (
        <>
          {" "}
          <img src="/images/magnify.gif" width="13%" />
          <Typography>Loading...</Typography>
        </>
      ) }</Grid> 
  <Grid xs = {6}><Typography>Recommended Meal Plans</Typography>
{recommendData.filter(
      (item) => item.status === "Approved"
    ).length > 0  ? 
      (<>
{recommendData.filter(
      (item) => item.status === "Approved"
    ).map((item) => (
        // const tempMeal = mealData.find((items) =>items.generatedMeal_id === item.generatedMeal_id)
        <Box     sx={{
          background: "#898246",
          borderRadius: 4,
          mx: "10%",
          color: "#ffffff",
          py: 2,
          mt: 2, 
        }}> 
          {" "}
          {/* {console.log(item)} */}
          {item?.date}
          <br/>
          By: {" "} 
         {userData.find((items) => items.user_id === item.user_id).first_name}
         {" "}
          {userData.find((items) => items.user_id === item.user_id).last_name}
         <br/>  
          <Button      sx={{
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
                }} onClick={() => handleOpenRecommend(item)}>View Details</Button>
        
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
      ))}</>) : recommendData.filter(
        (item) => item.status === "Approved"
      ).length === 0 && loading4 === false ? (
        <>No Orders</>
      ) : (
        <>
          {/* {" "}
          <img src="/images/magnify.gif" width="13%" />
          <Typography>Loading...</Typography> */}
        </>
      ) }</Grid> 

</Grid>
<br/>
</>) 
        : (<></>)
}





   





        
       

<Modal
        open={isOpenRecommend}
        onClose={handleCloseRecommend}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedOrder?.name}
          <br/> 
        
          Date: {dayjs(selectedOrder?.start_week).format("MMMM DD,YYYY")} -  {" "}
          {dayjs(selectedOrder?.last_week).format("MMMM DD,YYYY")}
          {selectedOrder?.meal?.map((item) => (
            <Box>
              {item?.day}
              {console.log(item.meals)}
              {item?.meals?.map((items) => (
                <Box >
                  {items?.type}: {" "}
                  {items?.food}
              
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Modal>
      {/* setIsOpenPrice */}
      <Modal
        open={isOpenPrice}
        onClose={handleClosePrice}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          Input Price:
          <TextField
            onChange={(event) => setPrice(event.target.value)}
          ></TextField>
          <Button  sx={{
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
                }} onClick={() => approveOrder()}>Approve</Button>
        </Box>
      </Modal>

      <Modal
        open={isOpenPriceRecommend}
        onClose={handleClosePriceRecommend}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          Input Price:
       
          <TextField
            onChange={(event) => setPrice(event.target.value)}
          ></TextField>
          <Button    sx={{
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
                }} onClick={() => approveOrderRecommend()}>Approve</Button>
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
          <br/>
          Date: {dayjs(selectedOrder?.start_week).format("MMMM DD,YYYY")} -  {" "}
          {dayjs(selectedOrder?.last_week).format("MMMM DD,YYYY")}
          {selectedOrder?.meal?.map((item) => (
            <Box>
              {item?.Day}
              {console.log(item.meals)}
              {item?.meals?.map((items) => (
                <Box >
                  {items?.Meal}: {" "}
                  {items?.details?.recipe?.label}
             

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
