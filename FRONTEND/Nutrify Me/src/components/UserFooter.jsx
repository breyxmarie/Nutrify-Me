import { useState } from "react";
import MainUserNavbar from "./MainUserNavbar";
import UserNotLogInNavBar from "./UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

function UserFooter() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Acme Corporation. All rights
          reserved.
        </p>
        <ul>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </div>
    </footer>
    // <footer position="fixed" style={{ background: "#000000" }}>
    // <Box
    //   sx={{
    //     display: "grid",
    //     gridTemplateColumns: "repeat(4, 1fr)",
    //     gap: 2,
    //   }}
    // >
    //   <Item>
    //     <img src="/images/diagnostic 1.png" width="170px" height="170px" />
    //     <center>
    //       <h2
    //         style={{
    //           background: "#99756E",
    //           borderRadius: 20,
    //           width: 30,
    //         }}
    //       >
    //         1
    //       </h2>
    //     </center>
    //     <h3>Profiling</h3>
    //     <p>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //     </p>
    //   </Item>
    //   <Item>
    //     <img src="/images/diagnostic 2.png" width="170px" height="170px" />
    //     <center>
    //       <h2
    //         style={{
    //           background: "#99756E",
    //           borderRadius: 20,
    //           width: 30,
    //         }}
    //       >
    //         2
    //       </h2>
    //     </center>
    //     <h3>Appointment</h3>
    //     <p>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //     </p>
    //   </Item>
    //   <Item>
    //     {" "}
    //     <img src="/images/diagnostic 3.png" width="170px" height="170px" />
    //     <center>
    //       <h2
    //         style={{
    //           background: "#99756E",
    //           borderRadius: 20,
    //           width: 30,
    //         }}
    //       >
    //         3
    //       </h2>
    //     </center>
    //     <h3>Diet Recommendation</h3>
    //     <p>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //     </p>
    //   </Item>
    //   <Item>
    //     {" "}
    //     <img src="/images/diagnostic 4.png" width="170px" height="170px" />
    //     <center>
    //       <h2
    //         style={{
    //           background: "#99756E",
    //           borderRadius: 20,
    //           width: 30,
    //         }}
    //       >
    //         4
    //       </h2>
    //     </center>
    //     <h3>Meal Plan Ordering</h3>
    //     <p>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
    //     </p>
    //   </Item>
    // </Box>
    // // </footer>
  );
}

export default UserFooter;
