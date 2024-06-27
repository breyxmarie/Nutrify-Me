import React, { useState, useRef } from "react";
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

function UserFooterNotLogIn() {
  //! email stuff
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
    <footer className="footer" style={{ width: "100vw" }}>
      <div
        className="container"
        style={{ background: "#E66253", color: "#ffffff", padding: 20 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src="/images/logoCircle.png"
              width="170px"
              height="170px"
            ></img>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              textAlign: "left",
            }}
          ></Grid>
          <Grid item xs={3} sx={{ textAlign: "left" }}>
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
              <PhoneInput
                sx={{ width: "100%" }}
                defaultCountry="ph"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                name="from_number"
              />
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
                  color: "#E66253",
                  fontWeight: "bold",
                  borderRadius: 6,
                  mt: 2,
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
        sx={{ color: "#ffffff", background: "#898246" }}
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

export default UserFooterNotLogIn;
