import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import AxiosInstance from "./forms/AxiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "./LoggedInUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function LogIn() {
  //? toast
  const query = new URLSearchParams(window.location.search);
  const myParam = query.get("success");
  //const myParam = query.get("param");

  // if (myParam === "true") {
  //   toast.success("Registered Successfully");
  // }

  if (myParam === "registered") {
    toast.success("Registered Successfully");
  }
  if (myParam === "newPassword") {
    toast.success("Password Changed");
  }
  //?
  //! retrieving data.

  const [userData, setUserData] = useState();
  const [nutritionistData, setNutritionistData] = useState();
  const GetData = () => {
    AxiosInstance.get(`user/`).then((res) => {
      setUserData(res.data);
    });

    AxiosInstance.get(`nutritionist/`).then((res) => {
      setNutritionistData(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);
  //!
  const schema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [logData, setLogData] = useState();
  let logIn = false;
  let privilege;
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  const onSubmitHandler = (data) => {
    // const userfound =
    //   userData.some((item) => item.username === data.username) &&
    //   ((item) => item.password === data.password);

    const userfound = userData.some(
      (item) =>
        item.username === data.username && item.password === data.password
    );

    if (userfound) {
      const loggedInUser = userData.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );

      // Import useHistory from react-router-dom
      //navigate("/user-home");
      setLoggedInUser(loggedInUser);

      switch (loggedInUser.privilege) {
        case "Nutritionist":
          setnNutritionist(
            nutritionistData.find(
              (data) => data.user_id === loggedInUser.user_id
            )
          );
          break;
      }
      navigate(
        loggedInUser.privilege === "User"
          ? "/user-home"
          : loggedInUser.privilege === "Admin"
          ? "/admin-home"
          : loggedInUser.privilege === "Nutritionist"
          ? "/nutritionist-home"
          : "/seller-home"
      );

      // logIn = true;
    } else {
      console.log("Username or Password Incorrect");
      toast.success("Username or Password Incorrect");
    }

    // reset();
  };
  return (
    // <>
    //   <Box
    //     component="form"
    //     sx={{
    //       "& > :not(style)": { m: 1, width: "25ch" },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //     <TextField id="filled-basic" label="Filled" variant="filled" />
    //     <TextField id="standard-basic" label="Standard" variant="standard" />
    //   </Box>
    // </>
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "0px",
        color: "#99756E",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={4}></Grid>
        <Grid xs={4}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <center>
              <img
                src="/images/transparentLogo.png"
                style={{ maxWidth: "40%", maxHeight: "10%" }}
              />

              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography sx={{ mt: "10%", ml: "30%" }}>
                    Username
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <TextField
                    size="small"
                    id="username"
                    name="username"
                    // label="Username"
                    fullWidth
                    margin="dense"
                    {...register("username")}
                    error={errors.username ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.username?.message}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid xs={4}>
                  <Typography sx={{ mt: "10%", ml: "30%" }}>
                    Password
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <TextField
                    size="small"
                    id="password"
                    name="password"
                    // label="Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    {...register("password")}
                    error={errors.password ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.password?.message}
                  </Typography>
                </Grid>
              </Grid>

              <br />
              <Grid container spacing={2}>
                <Grid xs={3.5}></Grid>
                <Grid xs={3}>
                  {" "}
                  <Link to="/ForgetPassword">
                    <a style={{ textDecoration: "underline" }}>
                      Forget Password
                    </a>
                  </Link>
                </Grid>
                <Grid xs={3}>
                  {" "}
                  <Link to="/Register">
                    <a style={{ textDecoration: "underline" }}>Register</a>
                  </Link>
                </Grid>
                <Grid xs={3}></Grid>
              </Grid>
              {logIn && <Link to={navigate}>Sign In Successful!</Link>}
              <br />
              <Button
                type="submit"
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  px: 10,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 1,
                    borderColor: "#E66253",
                  },
                }}
              >
                Log In
              </Button>
            </center>
          </form>
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>

      <center>
        <Box></Box>
      </center>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
