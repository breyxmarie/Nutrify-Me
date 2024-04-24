import MainUserNavbar from "../MainUserNavbar";
import TeleMedNavBar from "../TeleMedNavBar";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import UserFooter from "../UserFooter";

function TelemedicineMessages() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      {" "}
      {/* <MainUserNavbar />
      <TeleMedNavBar /> */}
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "100%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <h2>Chats</h2>
      <Box sx={{ mx: 13 }}>
        <Grid container spacing={2} sx={{ border: 1, borderRadius: 5 }}>
          <Grid xs={6} sx={{ color: "#000000" }}>
            <Box sx={{ border: 1 }}>
              <Typography>Dr. 14m</Typography>
            </Box>
            <Box sx={{ border: 1 }}>
              <Typography>Dr. 14m</Typography>
            </Box>
            <Box sx={{ border: 1 }}>
              <Typography>Dr. 14m</Typography>
            </Box>
          </Grid>
          <Grid xs={6} sx={{ border: 1 }}>
            <Grid container spacing={2} sx={{ textAlign: "none", pt: 5 }}>
              <Grid xs={2}>
                <img
                  src="/images/logoCircle.png"
                  width="60px"
                  height="60px"
                  style={{}}
                />
              </Grid>
              <Grid xs={2} sx={{ textAlign: "left" }}>
                Name: <br />
                <Grid container spacing={2} sx={{ mt: "5px" }}>
                  <Grid xs={2}>
                    <CircleIcon sx={{ mt: 1, width: 10, color: "green" }} />
                  </Grid>
                  <Grid sx={{ mt: "9px" }}>Active Now</Grid>
                </Grid>
              </Grid>
            </Grid>
            <br /> <hr />
            <Box>Message</Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TelemedicineMessages;
