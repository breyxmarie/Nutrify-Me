import { useState } from "react";
import MainUserNavbar from "./MainUserNavbar";
import TeleMedNavBar from "./TeleMedNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function TelemedicineHome() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="content" style={{ paddingBottom: "40px" }}>
      <MainUserNavbar />
      <TeleMedNavBar />
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "100%",
          height: "900px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>

      <Box sx={{ flexGrow: 1, my: 3, color: "#99756E", mx: 5 }}>
        {" "}
        {/* // ! modify pa dito like what if walang appointment si user */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>My Scheduled Appointments</h2>

            {/* // ! add calendar */}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <h2>Today's Agenda</h2>
            <Box
              sx={{
                border: 1,
                borderColor: "#E66253",
                px: 5,
                borderRadius: 4,
                py: "30px",
              }}
            >
              <p>[Recipient’s Name]</p>
              <p>Time: 10:00 am</p>
              <p>Dietitian: [Name]</p>

              <center>
                <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                  Go to Consultation
                </Button>
              </center>
            </Box>
            <center>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  my: 5,
                  px: 5,
                  py: 1,
                  fontSize: 20,
                }}
              >
                <img src="/images/messages.png" width="30px" height="30px" />{" "}
                &nbsp; Messages
              </Button>
            </center>
          </Grid>
        </Grid>
      </Box>

      <Button sx={{ background: "#E66253", color: "#ffffff", mx: 10 }}>
        Book a Consultation
      </Button>
    </div>
  );
}

export default TelemedicineHome;
