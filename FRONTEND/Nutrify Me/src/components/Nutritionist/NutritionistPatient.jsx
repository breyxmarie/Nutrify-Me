import { Typography } from "@mui/material";
import { ParticipantDetails } from "@stream-io/video-react-sdk";
import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLoggedInUser } from "../LoggedInUserContext";
import AxiosInstance from "../forms/AxiosInstance";
import { useNavigate } from "react-router-dom";

function NutritionistPatient() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  const [user, setUser] = useState();
  const GetData = async () => {
    AxiosInstance.get(`patientnutritionistagreement`).then((res) => {
      let tempUsers = res.data.filter(
        (item) => item.nutritionist_id === nutritionist.nutritionist_id && item.status === "Agree"
      );
      console.log(
        res.data.filter(
          (item) => item.nutritionist_id === nutritionist.nutritionist_id
        )
      );
      let finalUsers = [];
      AxiosInstance.get(`user`).then((resp) => {
        tempUsers.map((item1) =>
          finalUsers.push(
            resp.data.find((items1) => items1.user_id === item1.user_id)
          )
        );
        console.log(tempUsers);
        setUser(finalUsers);
      });
    });

    // AxiosInstance.get(`user`).then((res) => {
    //   setUser(res.data);
    // });
  };

  useEffect(() => {
    GetData();
  }, []);

  const patient = [
    { patientID: "01", username: "Brey" },
    { patientID: "02", username: "Brey" },
    { patientID: "03", username: "Brey" },
    { patientID: "04", username: "Brey" },
  ];
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
        color: "#000000",
      }}
    >
      <Typography sx={{ color: "#99756E" }}>MY PATIENTS</Typography>
      <br />
      <br />

      <Box sx={{ border: 1 }}>
        <br />

        <Grid container spacing={2} sx={{ color: "#99756E" }}>
          <Grid xs ={12} sm={3}>PATIENT ID</Grid>
          <Grid xs ={12} sm={3}>Username</Grid>
        </Grid>

        <hr />
        <br />
        {user?.map((item, index) => (
          <Grid container spacing={2} sx={{ my: {
            xs: 1,
            sm: 5
          }, border: {xs: 1,sm: 0} }}>
            <Grid xs = {12} sm={3}>{item.user_id}</Grid>
            <Grid xs = {12} sm={3}>
              {item.first_name} {item.last_name}
            </Grid>
            <Grid xs = {12} sm={3}>
              <Button
                sx={{ background: "#E66253", color: "#ffffff" }} 
                onClick={() =>
                  navigate("/nutritionist-patient-records", {
                    state: { item },
                  })
                }
              >
                VIEW RECORDS
              </Button>
            </Grid>
            <Grid xs = {12} sm={3}>
              <Button   onClick={() =>
                  navigate("/nutritionist-patient-create-meal-plan", {
                    state: { item },
                  })
                } sx={{ background: "#898246", color: "#ffffff" }}>
                CREATE MEAL PLAN
              </Button>
            </Grid>

            <hr />
          </Grid>
        ))}
      </Box>
    </div>
  );
}

export default NutritionistPatient;
