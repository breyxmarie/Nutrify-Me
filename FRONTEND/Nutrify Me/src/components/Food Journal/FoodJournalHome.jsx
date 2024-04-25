import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function FoodJournalHome() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <Box>Date</Box>
      <Box
        sx={{
          borderRadius: 0,
          background: "#898246",
          color: "#ffffff",
          display: "inline-block",
          justifyItems: "right",
        }}
      >
        {" "}
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          <img src="images/fire.png" /> Today's Food Intake
        </Typography>
      </Box>
    </div>
  );
}

export default FoodJournalHome;
