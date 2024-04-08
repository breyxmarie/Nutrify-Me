import { useState } from "react";
import MainUserNavbar from "./MainUserNavbar";
import UserNotLogInNavBar from "./UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      maxWidth:false
      disableGutters
    >
      <UserNotLogInNavBar /> {/* Your navbar component */}
      <Box sx={{ px: 4, py: 4 }}>
        {" "}
        {/* Body Section */}
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: "url('/images/HomeImage.png')",
          }}
        >
          {" "}
          {/* Centered heading */}
          <Typography variant="h5" component="div">
            DIETICIANS AVAILABLE 24/7 TO REGULATE YOUR BLOOD PRESSURE!
          </Typography>
          <br />
          <Button variant="contained" sx={{ mx: "auto", display: "block" }}>
            BOOK AN APPOINTMENT
          </Button>{" "}
        </Container>
        {/* Centered button */}
        <Typography variant="h6" component="div">
          The Process
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {" "}
          {/* Grid of items */}
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>4</Item>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
