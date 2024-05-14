import { Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Patients() {
  const users = [
    { patientId: "01", username: "juandelacruz" },
    { patientId: "02", username: "juandelacruz" },
    { patientId: "03", username: "juandelacruz" },
    { patientId: "04", username: "juandelacruz" },
  ];

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#99756E",
      }}
    >
      {" "}
      <Typography
        sx={{
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        MANAGE PATIENTS
      </Typography>
      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
        </Grid>
        <hr />

        {users.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.patientId}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: " #898246",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#898246",
                    border: 0.5,
                    borderColor: "#898246",
                  },
                }}
              >
                EDIT
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
              >
                DEACTIVATE
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
}

export default Patients;
