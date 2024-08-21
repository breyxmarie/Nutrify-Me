import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import AxiosInstance from "./forms/AxiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import Grid from "@mui/material/Grid";
import emailjs from "@emailjs/browser";
import { formatISO } from "date-fns";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";

function OTP() {
  const location = useLocation();
  // console.log(location.state.otp);
  const navigate = useNavigate();
  //! form handling

  // console.log(Math.floor(Math.random() * 10000000));

  const otpnum = Math.floor(Math.random() * 10000000);
  const schema = yup.object().shape({
    //  username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),

    otp: yup.string().required("otp is required"),
  });
  const form = useRef();
  const forms = {
    user_email: location.state.email,
    otp: location.state.otp,
    to_name: location.state.name,
  };
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const notify = () => toast("Wow so easy!");
  const onSubmitHandler = (data) => {
    if (parseInt(data.otp) === parseInt(location.state.otp)) {
      toast.success("hi");
      // navigate("/Log-In?success=true");
      navigate("/Log-In?success=registered");
    } else {
      toast.success("Enter a valid OTP please");
    }
  };
  // sendEmail(forms);

  useEffect(() => {
    // sendEmail(forms);
  }, []);
  //!
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "0px",
        fontFamily: "Poppins",
      }}
    >
      <ToastContainer />

      <Grid container spacing={2}>
        <Grid xs={4.5}></Grid>
        <Grid xs={3}>
          <img
            src="/images/transparentLogo.png"
            style={{ maxWidth: "50%", maxHeight: "50%" }}
          />{" "}
          <Box sx={{ background: "#DEEBD6", py: 3, px: 2, mb: 2 }}>
            We’ve sent a verification code to your email -{" "}
            {location.state.email}
          </Box>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              id="otp"
              name="otp"
              label="OTP"
              type="text"
              fullWidth
              margin="dense"
              {...register("otp")}
              error={errors.otp ? true : false}
            />

            <Typography variant="inherit" color="textSecondary">
              {errors.otp?.message}
            </Typography>
            <br />

            <Button
              sx={{
                background: "#898246",
                color: "#ffffff",
                fontSize: 16,
                width: "100%",
                fontWeight: "bold",
                px: 10,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#898246",
                  border: 1,
                  borderColor: "#898246",
                },
              }}
              onClick={() => sendEmail(forms)}
            >
              RESEND OTP
            </Button>
            <br />
            <br />

            <Button
              type="submit"
              sx={{
                background: "#E66253",
                color: "#ffffff",
                fontSize: 16,
                width: "100%",
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
              SUBMIT
            </Button>
          </form>
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default OTP;
