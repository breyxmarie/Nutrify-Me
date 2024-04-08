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
import "./MainUserNavbar.css";

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
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <UserNotLogInNavBar />
      <Box
        className="content"
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // pt: "60px",
          background: "white",
        }}
        // maxWidth:false
        // disableGutters
      >
        {/* Your navbar component sx={{ px: "200px", py: 4 }}*/}
        <Box sx={{ px: "200px", py: 4 }}>
          <Box
            component="section"
            sx={{
              // display: "flex",
              justifyContent: "center",
              backgroundImage: "url('/images/HomeImage.png')",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "400px" /* Adjust height as per your requirement */,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid>
                <p></p>
              </Grid>
              <Grid>
                <Typography variant="h5" component="div">
                  DIETICIANS AVAILABLE 24/7 TO REGULATE YOUR BLOOD PRESSURE!
                </Typography>

                <br />

                <Button
                  variant="contained"
                  sx={{ mx: "auto", display: "block" }}
                >
                  BOOK AN APPOINTMENT
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* Centered button */}
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#99756E", border: 1 }}
          >
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
            <Item>
              <img
                src="/images/diagnostic 1.png"
                width="170px"
                height="170px"
              />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                  }}
                >
                  1
                </h2>
              </center>
              <h3>Profiling</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Item>
            <Item>
              <img
                src="/images/diagnostic 2.png"
                width="170px"
                height="170px"
              />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                  }}
                >
                  2
                </h2>
              </center>
              <h3>Appointment</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Item>
            <Item>
              {" "}
              <img
                src="/images/diagnostic 3.png"
                width="170px"
                height="170px"
              />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                  }}
                >
                  3
                </h2>
              </center>
              <h3>Appointment</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Item>
            <Item>
              {" "}
              <img
                src="/images/diagnostic 2.png"
                width="170px"
                height="170px"
              />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                  }}
                >
                  2
                </h2>
              </center>
              <h3>Appointment</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Item>
          </Box>
        </Box>

        <Box
          component="section"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url('/images/HomeImage2.png')",
            width: "100%",
            height: "400px" /* Adjust height as per your requirement */,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={8}>
              <p></p>
            </Grid>
            <Grid xs={8}>
              <br />
              <Typography variant="h5" component="div">
                LOOKING FOR MEAL PLANS CATERED TO LESSEN HYPERTENSION?
              </Typography>

              <br />

              <Button variant="contained" sx={{ mx: "auto", display: "block" }}>
                VIEW MEAL PLANS
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ color: "#99756E" }}>
          <h2 style={{ justifyContent: "center" }}> Patients Testimonials</h2>

          <Grid
            container
            spacing={2}
            sx={{
              color: "#99756E",
              float: "left",
              border: 1,
              borderRadius: 2,
              width: "50%",
            }}
          >
            <Grid
              xs={4}
              sx={{ m: "5%", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src="/images/HomeImage.png"
                width="150px"
                height="150px"
              ></img>
            </Grid>
            <Grid xs={4} sx={{ m: 3 }}>
              {" "}
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <br />
              <p>
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
          </Grid>

          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid
            container
            spacing={2}
            sx={{
              color: "#99756E",
              float: "right",
              border: 1,
              borderRadius: 2,
              width: "50%",
            }}
          >
            <Grid
              xs={4}
              sx={{ m: "5%", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src="/images/HomeImage.png"
                width="150px"
                height="150px"
              ></img>
            </Grid>
            <Grid xs={4} sx={{ m: 3 }}>
              {" "}
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <br />
              <p>
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              color: "#99756E",
              float: "left",
              border: 1,
              borderRadius: 2,
              width: "50%",
              mt: "20px",
            }}
          >
            <Grid
              xs={4}
              sx={{ m: "5%", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src="/images/HomeImage.png"
                width="150px"
                height="150px"
              ></img>
            </Grid>
            <Grid xs={4} sx={{ m: 3 }}>
              {" "}
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <img src="/images/star.png" width="30px" height="30px" />
              <br />
              <p>
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
