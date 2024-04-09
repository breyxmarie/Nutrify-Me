import { useState } from "react";
import MainUserNavBar from "./MainUserNavbar";
import { styled } from "@mui/material/styles";
import "./MainUserNavbar.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserFooter from "./UserFooter";
import UserNotLogInNavBar from "./UserNotLogInNavBar";

function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="content" style={{ paddingBottom: "40px" }}>
      <UserNotLogInNavBar />

      {/* Your navbar component sx={{ px: "200px", py: 4 }}*/}
      <Box sx={{ px: "0px", py: 0 }}>
        <Box
          component="section"
          sx={{
            // display: "flex",
            justifyContent: "center",
            backgroundImage: "url('/images/HomeImage.png')",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "700px" /* Adjust height as per your requirement */,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={4}>
              <p></p>
            </Grid>
            <Grid
              xs={8}
              sx={{
                color: "#99756E",
                fontWeight: "bold",
                marginLeft: "auto",
                float: "right",
                mr: "60px",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "#99756E",
                  fontWeight: "bold",
                  textAlign: "right",
                  fontSize: "40px",
                }}
              >
                DIETICIANS AVAILABLE 24/7 <br />
                TO REGULATE YOUR BLOOD <br />
                PRESSURE!
              </Typography>

              <br />

              <Button
                variant="contained"
                sx={{
                  float: "right",
                  mx: "auto",
                  display: "block",
                  background: "#E66253",
                  fontSize: "20px",
                }}
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
          sx={{
            color: "#99756E",
            border: 1,
            fontSize: "70px",
            fontWeight: "bold",
            mx: 70,
            borderRadius: 8,
          }}
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
            <img src="/images/diagnostic 1.png" width="170px" height="170px" />
            <center>
              <h2
                style={{
                  background: "#99756E",
                  borderRadius: 20,
                  width: 30,
                  fontWeight: "bold",
                }}
              >
                1
              </h2>
            </center>
            <h2 style={{ fontWeight: "bold" }}>Profiling</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </Item>
          <Item>
            <img src="/images/diagnostic 2.png" width="170px" height="170px" />
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
            <h2>Appointment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </Item>
          <Item>
            {" "}
            <img src="/images/diagnostic 3.png" width="170px" height="170px" />
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
            <h2>Diet Recommendation</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </Item>
          <Item>
            {" "}
            <img src="/images/diagnostic 4.png" width="170px" height="170px" />
            <center>
              <h2
                style={{
                  background: "#99756E",
                  borderRadius: 20,
                  width: 30,
                }}
              >
                4
              </h2>
            </center>
            <h2>Meal Plan Ordering</h2>
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
          <Grid xs={8} sx={{ ml: "40px" }}>
            <br />
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#99756E",
                fontWeight: "bold",
                textAlign: "left",
                fontSize: "40px",
              }}
            >
              LOOKING FOR MEAL PLANS CATERED TO LESSEN HYPERTENSION?
            </Typography>

            <br />

            <Button
              variant="contained"
              sx={{
                mx: "auto",
                display: "block",
                float: "left",

                background: "#E66253",
                fontSize: "20px",
              }}
            >
              VIEW MEAL PLANS
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ color: "#99756E" }}>
        <h2 style={{ justifyContent: "center" }}> Patients Testimonials</h2>
        <Grid container spacing={2} sx={{ mx: 0 }}>
          <Grid item xs={8}>
            <Item sx={{ border: 3, borderRadius: 4 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  color: "#99756E",
                  mx: "50px",
                }}
              >
                <Grid
                  xs={4}
                  sx={{
                    m: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/HomeImage.png"
                    width="250px"
                    height="250px"
                  ></img>
                </Grid>
                <Grid xs={4} sx={{ m: "10%" }}>
                  {" "}
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <p>
                    Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                  </p>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <Item sx={{ border: 3, borderRadius: 4, mr: "10%" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  color: "#99756E",
                  mx: "50px",
                }}
              >
                <Grid
                  xs={4}
                  sx={{
                    m: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/HomeImage.png"
                    width="250px"
                    height="250px"
                  ></img>
                </Grid>
                <Grid xs={4} sx={{ m: "10%" }}>
                  {" "}
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <p>
                    Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                  </p>
                </Grid>
              </Grid>
            </Item>
          </Grid>

          <Grid item xs={8}>
            <Item sx={{ border: 3, borderRadius: 4 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  color: "#99756E",
                  mx: "50px",
                }}
              >
                <Grid
                  xs={4}
                  sx={{
                    m: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/HomeImage.png"
                    width="250px"
                    height="250px"
                  ></img>
                </Grid>
                <Grid xs={4} sx={{ m: "10%" }}>
                  {" "}
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <p>
                    Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                  </p>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <Item sx={{ border: 3, borderRadius: 4, mr: "10%" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  color: "#99756E",
                  mx: "50px",
                }}
              >
                <Grid
                  xs={4}
                  sx={{
                    m: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/HomeImage.png"
                    width="250px"
                    height="250px"
                  ></img>
                </Grid>
                <Grid xs={4} sx={{ m: "10%" }}>
                  {" "}
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <img src="/images/star.png" width="30px" height="30px" />
                  <p>
                    Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                  </p>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
