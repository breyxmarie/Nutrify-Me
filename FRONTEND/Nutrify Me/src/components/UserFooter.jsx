import React, { useState, useRef, useContext } from "react";
import MainUserNavbar from "./NavBars/MainUserNavbar";
import UserNotLogInNavBar from "./NavBars/UserNotLogInNavBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import MyTextField from "./forms/MyTextField";
import MyMultiSelectField from "./forms/MyMultiSelectField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
//import PhoneInput from "react-phone-input-2";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import emailjs from "@emailjs/browser";
import ColorContext from "./ColorContext"; // Import the context
import ImageContext from "./ImageContext";
import { ToastContainer, toast } from "react-toastify";

function UserFooter() {
  const { logo, setLogo } = useContext(ImageContext);

  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);

  //! email stuff
  const form = useRef();

  const sendEmail = (e) => {
    //e.preventDefault();
    // const newLogo = "/images/snacks.png"; // Replace with actual new logo path
    // setLogo(newLogo);
    // // setLogo("/images/snacks.png");
    // console.log(logo);
    // setPrimaryColor("blue");
    // console.log(primaryColor);
    // .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
    //   publicKey: "YOUR_PUBLIC_KEY",
    // })
    emailjs
      .sendForm("service_no78pjt", "template_zzwa4di", form.current, {
        publicKey: "0EeKPcuAJ_JJUjZ4w",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast("Message Sent!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  //!

  const [phone, setPhone] = useState("");
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();
  const defaultValues = {
    name: "",
  };

  const schema = yup.object({
    name: yup.string().required("Name is a required field"),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {};

  return (
    <footer className="footer" style={{ width: "100vw", marginTop: "5%" }}>
      <div
        className="container"
        style={{ background: primaryColor, color: "#ffffff", padding: 20 }}
      >
        <ToastContainer />
        <Grid container spacing={2} sx={{ mr: "20%" }}>
          <Grid item xs={6} sm={4} md={3}>
            <Box
              sx={{
                borderRadius: 50,
                border: 10,
                borderColor: secondaryColor,
                background: "#ffffff",
                width: {
                  xs: "50px", // Extra small devices (less than 600px)
                  sm: "80px", // Small devices (600px and up)
                  md: "100px", // Medium devices (900px and up)
                  lg: "200px", // Large devices (1200px and up)
                  xl: "35%", // Extra large devices (1536px and up)
                },
                height: {
                  xs: "50px",
                  sm: "80px",
                  md: "100px",
                  lg: "200px",
                  xl: "60%",
                },
                ml: { xs: "35%", md: "25%", lg: "25%" }, // Adjust margin for different screen sizes
              }}
            >
              <img
                // style={{
                //   width: {
                //     xs: "50px", // Extra small devices (less than 600px)
                //     sm: "80px", // Small devices (600px and up)
                //     md: "80px", // Medium devices (900px and up)
                //     lg: "230px", // Large devices (1200px and up)
                //     xl: "35%", // Extra large devices (1536px and up)
                //   },
                //   height: {
                //     xs: "50px",
                //     sm: "80px",
                //     md: "80px",
                //     lg: "180px",
                //     xl: "60%",
                //   },
                //   marginTop: 20,
                // }}
                src={logo}
                width="50%" // Use 100% width for better responsiveness on smaller screens
                height="57%"
                style={{ marginTop: "18%" }}
              />
            </Box>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            style={{
              textAlign: "left",
            }}
          >
            TELEMEDICINE <br />
            <Link
              to="/telemedicine-home"
              style={{
                color: "#ffffff",
              }}
            >
              Home
            </Link>
            <br />
            <Link
              to="/telemedicine-home"
              style={{
                color: "#ffffff",
              }}
            >
              Appointments
            </Link>
            <br />
            <Link
              to="/telemedicine-meet-us"
              style={{
                color: "#ffffff",
              }}
            >
              Meet Us
            </Link>
            <br />
            <br />
            E-COMMERCE <br />
            <Link
              to="/meal-plan-shop-home"
              style={{
                color: "#ffffff",
              }}
            >
              Shops
            </Link>
            <br />
            <Link
              to="/meal-plan-shop-meal-plans"
              style={{
                color: "#ffffff",
              }}
            >
              Meal Plans
            </Link>
            <br />
            <Link
              to="/meal-plan-shop-request"
              style={{
                color: "#ffffff",
              }}
            >
              Request Orders
            </Link>
            <br />
            <Link
              to="/meal-plan-shop-track-orders"
              style={{
                color: "#ffffff",
              }}
            >
              Track Orders
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={3} style={{ textAlign: "left" }}>
            MEAL PLAN GENERATOR <br />
            <Link
              to="/meal-plan-generator-consent"
              style={{
                color: "#ffffff",
              }}
            >
              Meal Plan Generator
            </Link>
            <br />
            <Link
              to="/meal-plan-generator-history"
              style={{
                color: "#ffffff",
              }}
            >
              Meal Plan History
            </Link>
            <br />
            <br />
            FOOD JOURNAL
            <br />
            <br />
            <Link
              to="/food-journal-home"
              style={{
                color: "#ffffff",
              }}
            >
              Journal
            </Link>
            <br />
            <Link
              to="/food-journal-progress-report"
              style={{
                color: "#ffffff",
              }}
            >
              Progress Report
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={3} sx={{ textAlign: "left" }}>
            CONTACT US
            <br />
            <form ref={form} onSubmit={handleSubmit(onSubmitHandler)}>
              {" "}
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                // value={value}
                // id="outlined-basic"
                // label={label}
                // variant="standard"

                id="outlined-basic"
                // label="Outlined"
                variant="outlined"
                placeholder="name"
                name="from_name"
                // error={!!error}
                // helperText={error?.message}
              />
              <br />
              <br />
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Email"
                name="from_email"
              />
              <br />
              <br />
              <Box sx={{ width: "20px", ml: "0%" }}>
                {/* <PhoneInput
                  // style={{ width: "80%" }}
                  style={{ width: "1000px" }} // Adjust the width as needed
                  //width="50%"
                  defaultCountry="ph"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  name="from_number"
                /> */}
              </Box>
              <br />
              <TextField
                id="outlined-multiline-flexible"
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                multiline
                rows={4}
                placeholder="Type message here"
                name="message"
              />
              {/* <MyTextField
                label="Name"
                name={"name"}
                control={control}
                placeholder="Provide a project name"
                width={"100%"}
              /> */}
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "30%",
                  background: "#ffffff",
                  color: primaryColor,
                  fontWeight: "bold",
                  borderRadius: 6,
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#E66253 ",
                    color: "#ffffff",
                    border: 1,
                  },
                }}
                onClick={sendEmail}
              >
                SEND
                <img
                  src="/images/paperplane.png"
                  width="20px"
                  height="20px"
                  style={{ margin: 0, marginTop: 5 }}
                ></img>
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={2}
        sx={{ color: "#ffffff", background: secondaryColor }}
      >
        <Grid xs={4}>
          <p className="copyright" style={{ pl: 5 }}>
            {new Date().getFullYear()} NutrifyMe. All rights reserved.
          </p>
        </Grid>

        <Grid xs={4} style={{ alignText: "right" }}>
          <p className="copyright" style={{ alignText: "right" }}>
            Follow NutrifyMe!
            <a href="" style={{ margin: 10, marginTop: 2 }}>
              <img
                src="/images/facebook.png"
                width="20px"
                height="20px"
                style={{ margin: 0, marginTop: 5 }}
              ></img>
            </a>
            <a href="" style={{ margin: 10 }}>
              <img src="/images/instagram.png" width="20px" height="20px"></img>
            </a>
          </p>
        </Grid>
      </Grid>

      {/* <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="from_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form> */}
    </footer>
  );
}

export default UserFooter;
