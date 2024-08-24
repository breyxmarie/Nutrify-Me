import { useState } from "react";
import UserNotLogInNavBar from "./NavBars/UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserFooter from "./UserFooter";

function AboutUs() {
  return (
    <div className="content" style={{ paddingBottom: "40px" }}>
      {/* <UserNotLogInNavBar /> */}
      <Box
        sx={{
          backgroundImage: "url('/images/AboutUsImage.png')",
          borderRadius: 3,
          mx: "4%",
          mr: "6%",
          width: "92.5%",
          mt: 4,
          height: "900px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <Box sx={{ mx: 5 }}>
        <h2
          style={{
            color: "#99756E",
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "40px",
            float: "left",
          }}
        >
          NutrifyMe, <br />
          Your Healthy Companion to <br />
          Proper Dieting for Hypertension
        </h2>
        <p
          style={{
            color: "#99756E",
            float: "right",
            textAlign: "justify",
            fontSize: "20px",
            mx: 50,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in
          eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis massa
          tincidunt dui ut ornare lectus sit. Curabitur gravida arcu ac tortor
          dignissim convallis aenean.
        </p>
      </Box>
      <Box
        sx={{
          backgroundImage: "url('/images/AboutUsImage2.png')",
          width: "100%",
          height: "550px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <br />
      <Box
        sx={{
          border: 2,
          color: "#898246",
          borderRadius: 4,
          mx: 15,
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{ left: "50%" }}>
          <Grid xs={4} sx={{ mt: 7, top: "50%" }}>
            <img src="/images/aboutUsIcon.png" width="200px" height="200px" />
          </Grid>
          <Grid sx={{ color: "#898246", textAlign: "left", top: "50%" }} xs={4}>
            <h1>TELEMEDICINE</h1>
            <p style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </p>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box
        sx={{
          border: 2,
          color: "#898246",
          borderRadius: 4,
          mx: 15,
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{ left: "50%" }}>
          <Grid xs={4} sx={{ mt: 7, top: "50%" }}>
            <img src="/images/aboutUsIcon2.png" width="200px" height="200px" />
          </Grid>
          <Grid sx={{ color: "#898246", textAlign: "left", top: "50%" }} xs={4}>
            <h1>E-COMMERCE</h1>
            <p style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </p>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box
        sx={{
          border: 2,
          color: "#898246",
          borderRadius: 4,
          mx: 15,
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{ left: "50%" }}>
          <Grid xs={4} sx={{ mt: 7, top: "50%" }}>
            <img src="/images/aboutUsIcon3.png" width="200px" height="200px" />
          </Grid>
          <Grid sx={{ color: "#898246", textAlign: "left", top: "50%" }} xs={4}>
            <h1>MEAL PLAN GENERATOR</h1>
            <p style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AboutUs;
