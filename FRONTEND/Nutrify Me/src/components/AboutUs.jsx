import { useState } from "react";
import UserNotLogInNavBar from "./NavBars/UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserFooter from "./UserFooter";
import { Typography } from "@mui/material";

function AboutUs() {
  return (
    <div className="content" style={{ paddingBottom: "40px" }}>
      {/* <UserNotLogInNavBar /> */}
      <Box
        sx={{
          backgroundImage: "url('/images/AboutUsImage.png')",
          width: "100%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "550px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <Box sx={{ mx: 5, mt: 3, mb: 15 }}>
        <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            textAlign: "left",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "1.5em", // For small screens
              md: "2.0em", // For medium screens
              lg: "2.5em", // For large screens
            },
            float: "left",
          }}
        >
          NutrifyMe, Your Healthy Companion to Proper Dieting for Hypertension
        </Typography>
        <Typography
          sx={{
            color: "#99756E",
            float: "right",
            textAlign: "justify",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "1.0em", // For small screens
              md: "1.5em", // For medium screens
              lg: "1.5em", // For large screens
            },
            mx: 0,
            mb: 3,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in
          eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis massa
          tincidunt dui ut ornare lectus sit. Curabitur gravida arcu ac tortor
          dignissim convallis aenean.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: "url('/images/AboutUsImage2.png')",
          width: "100%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "550px", // For medium screens
          },
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
          my: 2,
          py: 2,
          border: 2,
          color: "#898246",
          borderRadius: 4,
          ml: "5%",
          mr: "5%",
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{}}>
          <Grid xs={12} md={3} sx={{ mt: "3%", top: "0%" }}>
            <img src="/images/aboutUsIcon.png" width="35%" height="70%" />
          </Grid>
          <Grid
            xs={11}
            md={8}
            sx={{ color: "#898246", textAlign: "left", top: "50%", ml: 3 }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "2em", // For extra small screens
                  sm: "2.5em", // For small screens
                  md: "3.0em", // For medium screens
                  lg: "3.5em", // For large screens
                },
              }}
            >
              TELEMEDICINE
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1em", // For extra small screens
                  sm: "1.0em", // For small screens
                  md: "1.5em", // For medium screens
                  lg: "1.5em", // For large screens
                },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box
        sx={{
          my: 2,
          py: 2,
          border: 2,
          color: "#898246",
          borderRadius: 4,
          ml: "5%",
          mr: "5%",
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{ left: "50%" }}>
          <Grid xs={12} md={3} sx={{ mt: "3%", top: "0%" }}>
            <img src="/images/aboutUsIcon2.png" width="35%" height="70%" />
          </Grid>
          <Grid
            xs={11}
            md={8}
            sx={{ color: "#898246", textAlign: "left", top: "50%", ml: 3 }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "2em", // For extra small screens
                  sm: "2.5em", // For small screens
                  md: "3.0em", // For medium screens
                  lg: "3.5em", // For large screens
                },
              }}
            >
              E-COMMERCE
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1em", // For extra small screens
                  sm: "1.0em", // For small screens
                  md: "1.5em", // For medium screens
                  lg: "1.5em", // For large screens
                },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box
        sx={{
          my: 2,
          py: 2,
          border: 2,
          color: "#898246",
          borderRadius: 4,
          ml: "5%",
          mr: "5%",
          align: "left",
        }}
      >
        <Grid container spacing={1} sx={{}}>
          <Grid xs={12} md={3} sx={{ mt: "3%", top: "0%" }}>
            <img src="/images/aboutUsIcon3.png" width="35%" height="70%" />
          </Grid>
          <Grid
            xs={11}
            md={8}
            sx={{ color: "#898246", textAlign: "left", top: "50%", ml: 3 }}
          >
            {" "}
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "2em", // For extra small screens
                  sm: "2.5em", // For small screens
                  md: "3.0em", // For medium screens
                  lg: "3.5em", // For large screens
                },
              }}
            >
              MEAL PLAN GENERATOR
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1em", // For extra small screens
                  sm: "1.0em", // For small screens
                  md: "1.5em", // For medium screens
                  lg: "1.5em", // For large screens
                },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              in eu mi bibendum neque. Eget est lorem ipsum dolor sit. Turpis
              massa tincidunt dui ut ornare lectus sit. Curabitur gravida arcu
              ac tortor dignissim convallis aenean.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AboutUs;
