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
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Lets sign you in.</h2>
        <br />

        <TextField
          id="username"
          name="username"
          label="Username"
          fullWidth
          margin="dense"
          {...register("username")}
          error={errors.username ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.username?.message}
        </Typography>
        <br />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="dense"
          {...register("password")}
          error={errors.password ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.password?.message}
        </Typography>
        <br />
        {logIn && <Link to={navigate}>Sign In Successful!</Link>}
        <button type="submit">Sign in</button>
      </form>
      <Link to="/ForgetPassword">
        <button>Forget Password</button>
      </Link>
    </div>
  );
}

export default LogIn;
