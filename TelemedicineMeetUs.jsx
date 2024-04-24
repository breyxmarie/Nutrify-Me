import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import UserFooter from "./UserFooter";

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
      <Box sx={{ px: "50px" }}>
        <h1 style={{ margin: "80px" }}>
          A Diet Expert On Call at the <br />
          Comfort of Your Own Homes!
        </h1>
        <p style={{ color: "#000000" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <h2 style={{ margin: "50px" }}>Get to Know Our Dietitians</h2>
        <Box>
          <img src="/images/logoCircle.png" width="350px" height="350px" />
          <h2>[NAME]</h2>
          <p style={{ color: "#000000" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </Box>

        <Box>
          <img src="/images/logoCircle.png" width="350px" height="350px" />
          <h2>[NAME]</h2>
          <p style={{ color: "#000000" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </Box>

        <Box>
          <img src="/images/logoCircle.png" width="350px" height="350px" />
          <h2>[NAME]</h2>
          <p style={{ color: "#000000" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </Box>
      </Box>
    </div>
  );
}

export default TelemedicineHome;
