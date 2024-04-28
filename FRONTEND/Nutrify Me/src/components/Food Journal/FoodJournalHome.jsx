import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

function FoodJournalHome() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

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
        <br />
        <Box sx={{ background: "#ffffff", color: "#898246", mx: "20px" }}>
          Calories
          <BorderLinearProgress variant="determinate" value={70} />
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid xs={6}>Meal Plan: </Grid>
        <Grid xs={6}>
          <Button>+ NEW JOURNAL ENTRY</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FoodJournalHome;
