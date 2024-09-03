import { useEffect, useState } from "react";
import MainUserNavbar from "./NavBars/MainUserNavbar";
import UserNotLogInNavBar from "./NavBars/UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import AxiosInstance from "./forms/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";

function Home() {
  const navigate = useNavigate();
  //? toast
  const query = new URLSearchParams(window.location.search);
  const myParam = query.get("success");
  //const myParam = query.get("param");
  console.log(myParam);
  // if (myParam === "true") {
  //   toast.success("Registered Successfully");
  // }

  if (myParam === "registered") {
    toast.success(
      "Please wait for your account to be verified, a text/email will be sent to your registered email. Thank You!"
    );

    // return alert(
    //   "Please wait for your accoutn to be verified, a text/email will be sent to your registered email. Thank You!"
    // );
  }
  // if (myParam === "newPassword") {
  //   toast.success("Password Changed");
  // }
  //?
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // ! try retriving data from database

  const [data, setData] = useState();
  const GetData = () => {
    AxiosInstance.get(`user/`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);
  //!
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
                onClick={() => navigate("/log-in")}
              >
                BOOK AN APPOINTMENT
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#99756E",
            border: 1,
            fontSize: {
              xs: "1.0em", // For extra small screens
              sm: "2em", // For small screens
              md: "3em", // For medium screens
              lg: "4.0em", // For large screens
            },
            fontWeight: "bold",
            mx: "30%",
            my: "2%",
            borderRadius: 8,
          }}
        >
          The Process
        </Typography>

        <Box sx={{ mr: "2%", ml: "2%" }}>
          <Grid container spacing={2} sx={{ mb: 0 }}>
            <Grid item xs={6} sm={6} md={3} sx={{ mb: 5 }}>
              <img src="/images/diagnostic 1.png" width="50%" height="50%" />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  1
                </h2>
              </center>
              <Typography
                sx={{
                  justifyContent: "center",
                  fontSize: {
                    xs: "0.8em", // For extra small screens
                    sm: "1em", // For small screens
                    md: "1.5em", // For medium screens
                  },
                  mb: 0,
                  fontWeight: "bold",
                  color: "#898246",
                }}
              >
                Profiling
              </Typography>
              <Typography
                sx={{
                  mx: 0,
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.5em", // For small screens
                    md: "0.8em", // For medium screens
                    lg: "1em", // For large screens
                  },
                }}
              >
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} sx={{ mb: 5 }}>
              <img src="/images/diagnostic 2.png" width="50%" height="50%" />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                    color: "#ffffff",
                  }}
                >
                  2
                </h2>
              </center>
              <Typography
                sx={{
                  justifyContent: "center",
                  fontSize: {
                    xs: "0.8em", // For extra small screens
                    sm: "1em", // For small screens
                    md: "1.5em", // For medium screens
                  },
                  mb: 0,
                  fontWeight: "bold",
                  color: "#898246",
                }}
              >
                Appointment
              </Typography>
              <Typography
                sx={{
                  mx: 0,
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.5em", // For small screens
                    md: "0.8em", // For medium screens
                    lg: "1em", // For large screens
                  },
                }}
              >
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} sx={{ mb: 5 }}>
              <img src="/images/diagnostic 3.png" width="50%" height="50%" />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                    color: "#ffffff",
                  }}
                >
                  3
                </h2>
              </center>

              <Typography
                sx={{
                  justifyContent: "center",
                  fontSize: {
                    xs: "0.8em", // For extra small screens
                    sm: "1em", // For small screens
                    md: "1.5em", // For medium screens
                  },
                  mb: 0,
                  fontWeight: "bold",
                  color: "#898246",
                }}
              >
                Diet Recommendation
              </Typography>
              <Typography
                sx={{
                  mx: 0,
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.5em", // For small screens
                    md: "0.8em", // For medium screens
                    lg: "1em", // For large screens
                  },
                }}
              >
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} sx={{ mb: 10 }}>
              <img src="/images/diagnostic 4.png" width="50%" height="50%" />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: "12%",
                    color: "#ffffff",
                  }}
                >
                  4
                </h2>
              </center>

              <Typography
                sx={{
                  justifyContent: "center",
                  fontSize: {
                    xs: "0.8em", // For extra small screens
                    sm: "1em", // For small screens
                    md: "1.5em", // For medium screens
                  },
                  mb: 0,
                  fontWeight: "bold",
                  color: "#898246",
                }}
              >
                Meal Plan Ordering
              </Typography>
              <Typography
                sx={{
                  mx: 0,
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.5em", // For small screens
                    md: "0.8em", // For medium screens
                    lg: "1em", // For large screens
                  },
                }}
              >
                Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.{" "}
              </Typography>
            </Grid>
          </Grid>
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
              onClick={() => navigate("/log-in")}
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

export default Home;
