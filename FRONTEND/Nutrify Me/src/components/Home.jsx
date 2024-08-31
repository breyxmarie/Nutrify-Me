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
    <div
      className="content"
      style={{ paddingBottom: "40px", color: "#000000" }}
    >
      {/* <MainUserNavBar /> */}

      {/* Your navbar component sx={{ px: "200px", py: 4 }}*/}

      {/* //! Try Muna database  */}
      {/* <MaterialReactTable data={data} /> */}

      {/* {data.map((item, index) => (
        <h3>{item.privilege}</h3>
      ))} */}

      {/* // !  */}

      <Box sx={{ px: "0px", py: 0 }}>
        <Box
          component="section"
          sx={{
            // display: "flex",
            mt: 2,
            borderRadius: 3,
            mx: "4%",
            mr: "6%",
            justifyContent: "center",
            backgroundImage: "url('/images/HomeImage.png')",
            display: "flex",
            alignItems: "center",
            width: "92%",
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
                  fontSize: {
                    xs: "1.5em", // For extra small screens
                    sm: "2.0em", // For small screens
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
                    xs: "0.8em", // For extra small screens
                    sm: "0.8em", // For small screens
                    md: "1.0em", // For medium screens
                    lg: "1.5em", // For large screens
                    xl: "2.0em", // For extra large screens
                  },
                  "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
                }}
                onClick={() => navigate("/Log-In")}
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
            fontSize: {
              xs: "2.0em", // For extra small screens
              sm: "4.0em", // For small screens
              md: "4.5em", // For medium screens
              lg: "5.0em", // For large screens
              xl: "3.5em", // For extra large screens
            },
            fontWeight: "bold",
            mx: "30%",
            my: "1%",
            borderRadius: 8,
          }}
        >
          The Process
        </Typography>

        <Box sx={{ mr: "2%", ml: "2%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}>
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
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  1
                </h2>
              </center>
              <h2 style={{ fontWeight: "bold", color: "#898246" }}>
                Profiling
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
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
                    color: "#ffffff",
                  }}
                >
                  2
                </h2>
              </center>
              <h2 style={{ fontWeight: "bold", color: "#898246" }}>
                Appointment
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
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
                    color: "#ffffff",
                  }}
                >
                  3
                </h2>
              </center>
              <h2 style={{ fontWeight: "bold", color: "#898246" }}>
                Diet Recommendation
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <img
                src="/images/diagnostic 4.png"
                width="170px"
                height="170px"
              />
              <center>
                <h2
                  style={{
                    background: "#99756E",
                    borderRadius: 20,
                    width: 30,
                    color: "#ffffff",
                  }}
                >
                  4
                </h2>
              </center>
              <h2 style={{ fontWeight: "bold", color: "#898246" }}>
                Meal Plan Ordering
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </Grid>
          </Grid>
        </Box>
        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
         
          <Item>
            <img src="/images/diagnostic 1.png" width="170px" height="170px" />
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
                  color: "#ffffff",
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
                  color: "#ffffff",
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
           
            <img src="/images/diagnostic 4.png" width="170px" height="170px" />
            <center>
              <h2
                style={{
                  background: "#99756E",
                  borderRadius: 20,
                  width: 30,
                  color: "#ffffff",
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
                fontSize: {
                  xs: "1.5em", // For extra small screens
                  sm: "2.0em", // For small screens
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
                  xs: "0.8em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
              }}
              onClick={() => navigate("/Log-In")}
            >
              VIEW MEAL PLANS
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#99756E", ml: "1%", mr: "15%" }}>
        <h2 style={{ justifyContent: "center", fontSize: "2.2em" }}>
          Patients Testimonials
        </h2>
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
                xs={4}
                sx={{
                  m: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5%",
                }}
              >
                <img src="/images/HomeImage.png" width="100%" height="80%" />
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
                  width="100%"
                  height="100%"
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
                  width="100%"
                  height="100%"
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
                  width="100%"
                  height="100%"
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
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
