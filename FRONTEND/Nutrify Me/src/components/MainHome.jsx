import { useState } from "react";
import MainUserNavBar from "./NavBars/MainUserNavbar";
import { styled } from "@mui/material/styles";
import "./MainUserNavbar.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserFooter from "./UserFooter";
import { useLoggedInUser } from "./LoggedInUserContext";
import { useNavigate } from "react-router-dom";

function MainHome() {
  const navigate = useNavigate();
  const { loggedInUser } = useLoggedInUser();

  console.log(loggedInUser);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="content" style={{ paddingBottom: "40px" }}>
      {/* <MainUserNavBar /> */}

      {/* Your navbar component sx={{ px: "200px", py: 4 }}*/}
      <Box sx={{ px: "0px", py: 0 }}>
        <Box
          component="section"
          sx={{
            // display: "flex",
            mt: 2,
            borderRadius: 3,
            mx: "4%",
            mr: "6%",
            width: "92.5%",
            justifyContent: "center",
            backgroundImage: "url('/images/HomeImage.png')",
            display: "flex",
            alignItems: "center",

            height: {
              xs: "100px", // For extra small screens
              sm: "200px", // For small screens
              md: "450px", // For medium screens
            },

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
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "1.0em", // For small screens
                    md: "2.5em", // For medium screens
                    lg: "3.0em", // For large screens
                    xl: "3.5em", // For extra large screens
                  },
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
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.8em", // For small screens
                    md: "1.0em", // For medium screens
                    lg: "1.5em", // For large screens
                    xl: "2.0em", // For extra large screens
                  },
                  "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
                }}
                onClick={() => navigate("/telemedicine-home")}
              >
                BOOK AN APPOINTMENT
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#99756E",
            border: 1,
            fontSize: "70px",
            fontWeight: "bold",
            mx: "30%",
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
        
          <Item>
            <img src="/images/diagnostic 1.png" width="50%" height="50%" />
            <center>
              <h2
                style={{
                  background: "#99756E",
                  borderRadius: 20,
                  width: "20%",
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
        </Box> */}
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/images/HomeImage2.png')",
          width: "100%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "450px", // For medium screens
          },
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
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "1.0em", // For small screens
                  md: "2.5em", // For medium screens
                  lg: "3.0em", // For large screens
                  xl: "3.5em", // For extra large screens
                },
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
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
                "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
              }}
              onClick={() => navigate("/meal-plan-shop-meal-plans")}
            >
              VIEW MEAL PLANS
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ color: "#99756E", ml: "1%", mr: "15%" }}>
        <Typography
          sx={{
            justifyContent: "center",
            fontSize: {
              xs: "1.5em", // For extra small screens
              sm: "2em", // For small screens
              md: "2.0em", // For medium screens
              lg: "2.5em", // For large screens
            },
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Patients Testimonials
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* <Item sx={{ border: 3, borderRadius: 4 }}> */}
            <Grid
              container
              spacing={2}
              sx={{
                color: "#99756E",
                mx: "50px",
                border: 3,
                borderRadius: 4,
              }}
            >
              <Grid
                xs={12}
                md={4}
                sx={{
                  // m: {
                  //   xs: "5%", // For extra small screens
                  //   sm: "0%", // For small screens
                  //   md: "5%", // For medium screens
                  // },
                  mt: "5%",
                  mr: "5%",
                  ml: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5%",
                }}
              >
                <img src="/images/HomeImage.png" width="100%" height="80%" />
              </Grid>
              <Grid
                xs={12}
                md={4}
                sx={{
                  m: {
                    xs: "0%", // For extra small screens
                    sm: "0%", // For small screens
                    md: "10%", // For medium screens
                  },
                }}
              >
                {" "}
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.5em", // For extra small screens
                      sm: "0.5em", // For small screens
                      md: "0.8em", // For medium screens
                      lg: "1em", // For large screens
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>
              </Grid>
            </Grid>
            {/* </Item> */}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            {/* <Item sx={{ border: 3, borderRadius: 4, mr: "10%" }}> */}
            <Grid
              container
              spacing={2}
              sx={{
                color: "#99756E",
                mx: "50px",
                border: 3,
                borderRadius: 4,
                mt: 1,
              }}
            >
              <Grid
                xs={12}
                md={4}
                sx={{
                  // m: {
                  //   xs: "5%", // For extra small screens
                  //   sm: "0%", // For small screens
                  //   md: "5%", // For medium screens
                  // },
                  mt: "5%",
                  mr: "5%",
                  ml: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5%",
                }}
              >
                <img
                  src="/images/HomeImage.png"
                  width="100%"
                  height="100%"
                ></img>
              </Grid>
              <Grid xs={12} md={4} sx={{ m: "10%" }}>
                {" "}
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.5em", // For extra small screens
                      sm: "0.5em", // For small screens
                      md: "0.8em", // For medium screens
                      lg: "1em", // For large screens
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>
              </Grid>
            </Grid>
            {/* </Item> */}
          </Grid>

          <Grid item xs={8}>
            {/* <Item sx={{ border: 3, borderRadius: 4 }}> */}
            <Grid
              container
              spacing={2}
              sx={{
                color: "#99756E",
                mx: "50px",
                border: 3,
                borderRadius: 4,
                mt: 1,
              }}
            >
              <Grid
                xs={12}
                md={4}
                sx={{
                  // m: {
                  //   xs: "5%", // For extra small screens
                  //   sm: "0%", // For small screens
                  //   md: "5%", // For medium screens
                  // },
                  mt: "5%",
                  mr: "5%",
                  ml: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5%",
                }}
              >
                <img
                  src="/images/HomeImage.png"
                  width="100%"
                  height="100%"
                ></img>
              </Grid>
              <Grid xs={12} md={4} sx={{ m: "10%" }}>
                {" "}
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.5em", // For extra small screens
                      sm: "0.5em", // For small screens
                      md: "0.8em", // For medium screens
                      lg: "1em", // For large screens
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>
              </Grid>
            </Grid>
            {/* </Item> */}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            {/* <Item sx={{ border: 3, borderRadius: 4, mr: "10%" }}> */}
            <Grid
              container
              spacing={2}
              sx={{
                color: "#99756E",
                mx: "50px",
                border: 3,
                borderRadius: 4,
                mt: 1,
              }}
            >
              <Grid
                xs={12}
                md={4}
                sx={{
                  // m: {
                  //   xs: "5%", // For extra small screens
                  //   sm: "0%", // For small screens
                  //   md: "5%", // For medium screens
                  // },
                  mt: "5%",
                  mr: "5%",
                  ml: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5%",
                }}
              >
                <img
                  src="/images/HomeImage.png"
                  width="100%"
                  height="100%"
                ></img>
              </Grid>
              <Grid xs={12} md={4} sx={{ m: "10%" }}>
                {" "}
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <img src="/images/star.png" width="15%" height="30%" />
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.5em", // For extra small screens
                      sm: "0.5em", // For small screens
                      md: "0.8em", // For medium screens
                      lg: "1em", // For large screens
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet, con adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Typography>
              </Grid>
            </Grid>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default MainHome;
