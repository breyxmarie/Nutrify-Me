import { Typography } from "@mui/material";
import { ParticipantDetails } from "@stream-io/video-react-sdk";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLoggedInUser } from "../LoggedInUserContext";

function NutritionistPatient() {
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
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
          <Grid xs={3}>PATIENT ID</Grid>
          <Grid xs={3}>Username</Grid>
        </Grid>

        <hr />
        <br />
        {patient.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3}>{item.patientID}</Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                VIEW RECORDS
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button sx={{ background: "#898246", color: "#ffffff" }}>
                EDIT MEAL PLAN
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
