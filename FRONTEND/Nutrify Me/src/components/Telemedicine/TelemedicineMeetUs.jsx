import MainUserNavbar from "../NavBars/MainUserNavbar";
import TeleMedNavBar from "../NavBars/TeleMedNavBar";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import UserFooter from "../UserFooter";
import { Typography } from "@mui/material";

function TelemedicineHome() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      {/* <MainUserNavbar />
      <TeleMedNavBar /> */}

      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          mt: 2,
          borderRadius: 3,
          mx: "4%",
          mr: "6%",
          width: "92.5%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "500px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <Box sx={{ px: "50px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            margin: "0px",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "1.0em", // For small screens
              md: "2.5em", // For medium screens
              lg: "3.0em", // For large screens
              xl: "3.5em", // For extra large screens
            },
          }}
        >
          A Diet Expert On Call at the <br />
          Comfort of Your Own Homes!
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            fontSize: {
              xs: "0.8em", // For extra small screens
              sm: "1.0em", // For small screens
              md: "1.2em", // For medium screens
              lg: "1.2m", // For large screens
            },
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>
        <Typography
          sx={{
            margin: "20px",
            fontWeight: "bold",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "2.0em", // For small screens
              md: "2.5em", // For medium screens
            },
          }}
        >
          Get to Know Our Dietitians
        </Typography>
        <Box>
          <img src="/images/logoCircle.png" width="25%" height="25%" />
          <Typography>[NAME]</Typography>
          <Typography
            sx={{
              color: "#000000",
              fontSize: {
                xs: "0.8em", // For extra small screens
                sm: "1.0em", // For small screens
                md: "1.2em", // For medium screens
                lg: "1.2m", // For large screens
              },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Box>
        <br />
        <br />
        <Box>
          <img src="/images/logoCircle.png" width="25%" height="25%" />
          <Typography>[NAME]</Typography>
          <Typography
            sx={{
              color: "#000000",
              fontSize: {
                xs: "0.8em", // For extra small screens
                sm: "1.0em", // For small screens
                md: "1.2em", // For medium screens
                lg: "1.2m", // For large screens
              },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Box>

        <br />
        <br />
        <Box>
          <img src="/images/logoCircle.png" width="25%" height="25%" />
          <Typography>[NAME]</Typography>
          <Typography
            sx={{
              color: "#000000",
              fontSize: {
                xs: "0.8em", // For extra small screens
                sm: "1.0em", // For small screens
                md: "1.2em", // For medium screens
                lg: "1.2m", // For large screens
              },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default TelemedicineHome;
