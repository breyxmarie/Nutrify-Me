import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import AxiosInstance from "./forms/AxiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import Grid from "@mui/material/Grid";
import emailjs from "@emailjs/browser";
import OTP from "./OTP";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

function Profiling() {
  const navigate = useNavigate();
  const otpnum = Math.floor(Math.random() * 10000000);
  const location = useLocation();
  const [haveHypertension, setHaveHypertension] = useState(null);
  const yesno = ["Yes", "No"];
  const gender = ["Male", "Female"];
  // //! otp email
  const forms = {
    user_email: location.state.email,
    otp: otpnum,
    to_name: location.state.name,
  };

  const form = useRef();

  const sendEmail = (forms) => {
    //  e.preventDefault();

    // .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
    //   publicKey: "YOUR_PUBLIC_KEY",
    // })

    console.log(forms);
    emailjs
      .send("service_noi5des", "template_7z5u07k", forms, {
        publicKey: "0EeKPcuAJ_JJUjZ4w",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  // //!

  //! form handling

  const schema = yup.object().shape({
    age: yup.string().required("Age is Required"),
    gender: yup.string().required("Gender is Required"),
    common_sys: yup.string().required("Systolic is Required"),
    common_dia: yup.string().required("Diastolic is Required"),
    // hypertension: yup.string().required("Do you have hypertension is Required"),
    dateofBP: yup.string().required("Date is Required"),
    takingMeds: yup.string().required("Taking any meds is Required"),
    targetCalories: yup.string().required("Target Calories is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log(location.state);
    let meds;
    switch (data.takingMeds) {
      case "Yes":
        meds = 1;
        break;
      case "No":
        meds = 0;
        break;
    }
    try {
      AxiosInstance.post(`profiling/`, {
        user_id: location.state.userId,
        age: data.age,
        gender: data.gender,
        targetCalories: data.targetCalories,
        common_sys: data.common_sys,
        common_dia: data.common_dia,
        hypertension: 1,
        dateofBP: data.dateofBP,
        takingMeds: meds,
      }).then((res) => {
        // navigate(`/`);
        console.log(res);
        console.log({ data });
        sendEmail(forms);
        navigate("/OTP", {
          state: {
            email: location.state.email,
            otp: otpnum,
            name: location.state.name,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //? no hypertension

  const nohyperschema = yup.object().shape({
    age: yup.string().required("Age is Required"),
    gender: yup.string().required("Gender is Required"),

    targetCalories: yup.string().required("Target Calories is Required"),
  });

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset1,
  } = useForm({
    resolver: yupResolver(nohyperschema),
  });

  const onSubmitHandlerNoHypertension = (data) => {
    try {
      AxiosInstance.post(`profiling/`, {
        user_id: location.state.userId,
        age: data.age,
        gender: data.gender,
        targetCalories: data.targetCalories,
        common_sys: 0,
        common_dia: 0,
        hypertension: 0,
        dateofBP: "2000-10-0",
        takingMeds: false,
      }).then((res) => {
        // navigate(`/`);
        console.log(res);
        console.log({ data });
        sendEmail(forms);
        navigate("/OTP", {
          state: {
            email: location.state.email,
            otp: otpnum,
            name: location.state.name,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //!

  //! choices
  const hypertensionChoices = ["Yes", "No"];
  const [selectedHypertension, setSelectedHypertension] = useState([]);

  const handleHypertensionClick = (item) => {
    switch (item) {
      case "Yes":
        setHaveHypertension(true);
        break;
      case "No":
        setHaveHypertension(false);
        break;
    }
    setSelectedHypertension(item);
  };

  const isSelectedHypertension = (hypertensionName) => {
    return selectedHypertension.includes(hypertensionName);
  };
  //!

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "10px",
        fontFamily: "Poppins",
      }}
    >
      <img
        src="/images/transparentLogo.png"
        style={{ maxWidth: "15%", maxHeight: "10%" }}
      />
      {}
      {haveHypertension === null ? (
        <>
          <Typography sx={{ fotnWeight: "bold", fontSize: "1.5em" }}>
            Do you Have Hypertension?
          </Typography>

          <Grid container spacing={2} sx={{ mx: "35%", mr: "16%", mt: "2%" }}>
            {hypertensionChoices.map((item, index) => (
              <Grid item xs={1.5} key={index}>
                <div
                  key={index}
                  onClick={() => handleHypertensionClick(item)}
                  style={{
                    background: isSelectedHypertension(item)
                      ? "#D4CE98"
                      : "white",
                  }}
                >
                  <center>
                    {/* <img src={item.image} width="40%" height="40%" /> */}
                  </center>

                  <Button
                    onClick={() => handleHypertensionClick(item)}
                    sx={{
                      borderRadius: 4,
                      background: "#E66253",
                      color: "#ffffff",
                      ml: 2,
                      height: "100%",
                      px: 4,
                      py: 1,
                      fontSize: "15px",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#E66253",
                        border: 1,
                      },
                    }}
                  >
                    {" "}
                    {item}{" "}
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <></>
      )}

      {haveHypertension === null ? (
        <></>
      ) : haveHypertension ? (
        <>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2} sx={{ mx: "3%", mr: "2%" }}>
              <Grid xs={5} sx={{ mr: "3%", ml: "1%" }}>
                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Age
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  size="small"
                  fullWidth
                  margin="dense"
                  {...register("age")}
                  error={errors.age ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.age?.message}
                </Typography>

                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Gender
                </Typography>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value={selectedNutritionist}
                  // onChange={handleChange}
                  fullWidth
                  size="small"
                  name="goal"
                  width="100%"
                  {...register("gender")}
                  error={errors.gender ? true : false}
                >
                  {gender.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="inherit" color="textSecondary">
                  {errors.gender?.message}
                </Typography>

                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Target Calories
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register("targetCalories")}
                  error={errors.targetCalories ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.targetCalories?.message}
                </Typography>

                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Common Systolic
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register("common_sys")}
                  error={errors.common_sys ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.common_sys?.message}
                </Typography>
              </Grid>
              <Grid xs={5} sx={{ mx: "3%" }}>
                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Common Diastoic
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register("common_dia")}
                  error={errors.common_dia ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.common_dia?.message}
                </Typography>

                {/* <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Do You Have Hypertension?
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  size="small"
                  fullWidth
                  margin="dense"
                  {...register("hypertension")}
                  error={errors.hypertension ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.hypertension?.message}
                </Typography> */}

                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  When were you diagnose with Hypertension?
                </Typography>
                <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  size="small"
                  fullWidth
                  margin="dense"
                  {...register("dateofBP")}
                  error={errors.dateofBP ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.dateofBP?.message}
                </Typography>

                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Are you taking any medicine for hypertension?
                </Typography>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value={selectedNutritionist}
                  // onChange={handleChange}
                  fullWidth
                  size="small"
                  name="goal"
                  width="100%"
                  {...register("takingMeds")}
                  error={errors.takingMeds ? true : false}
                >
                  {yesno.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="inherit" color="textSecondary">
                  {errors.takingMeds?.message}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              sx={{
                mt: 5,
                background: "#E66253",
                color: "#ffffff",
                fontSize: 16,
                mx: 2,
                borderRadius: 3,
                px: 5,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
            >
              Submit
            </Button>
          </form>
        </>
      ) : (
        <Box sx={{ mx: "25%" }}>
          <form onSubmit={handleSubmit1(onSubmitHandlerNoHypertension)}>
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Age
            </Typography>
            <TextField
              id="first_name"
              name="first_name"
              type="text"
              size="small"
              fullWidth
              margin="dense"
              {...register1("age")}
              error={errors1.age ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors1.age?.message}
            </Typography>
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Gender
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={selectedNutritionist}
              // onChange={handleChange}
              fullWidth
              size="small"
              name="goal"
              width="100%"
              {...register1("gender")}
              error={errors1.gender ? true : false}
            >
              {gender.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="inherit" color="textSecondary">
              {errors1.gender?.message}
            </Typography>
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Target Calories
            </Typography>
            <TextField
              id="first_name"
              name="first_name"
              type="text"
              size="small"
              fullWidth
              margin="dense"
              {...register1("targetCalories")}
              error={errors1.targetCalories ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors1.targetCalories?.message}
            </Typography>{" "}
            <Button
              type="submit"
              sx={{
                mt: 5,
                background: "#E66253",
                color: "#ffffff",
                fontSize: 16,
                mx: 2,
                borderRadius: 3,
                px: 5,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
}

export default Profiling;
