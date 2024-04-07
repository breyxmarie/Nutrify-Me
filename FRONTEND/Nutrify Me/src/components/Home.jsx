import { useState } from "react";
import MainUserNavbar from "./MainUserNavbar";
import UserNotLogInNavBar from "./UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <UserNotLogInNavBar />

      <Box
        sx={{
          mt: "50px",

          backgroundImage: "url('/images/HomeImage.png')",
          // flexDirection: "column",
          // display: "flex",
          height: "385px",
          minHeight: "500px",
          //minWidth: "1000px",
          width: "100%",
        }}
      >
        <h2>DIETICIANS AVAILABLE 24/7 TO REGULATE YOUR BLOOD PRESSURE!</h2>
        <br />
        <Button>BOOK AN APPOINTMENT</Button>
      </Box>

      <Box>
        <h2>The Process</h2>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>1</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>3</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>4</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
