import React, { useState, useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import ColorContext from "./ColorContext"; // Import the context
import ImageContext from "./ImageContext";
import emailjs from "@emailjs/browser";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";

function ContactUs() {
  const [isHovered, setIsHovered] = useState(false);
  const [phone, setPhone] = useState("");
  const { logo, setLogo } = useContext(ImageContext);

  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);

  const schema = yup.object({
    name: yup.string().required("Name is a required field"),
  });

  const defaultValues = {
    name: "",
  };

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {};
  //! email stuff
  const form = useRef();
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
          toast.success("Message Sent!");
          setNames("");
          setEmail("");

          setMessage("");
          setPhone("");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
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
      <ToastContainer />
      <Box
        sx={{
          backgroundImage: "url('/images/contact us.png')",
          width: "100%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "450px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          mb: 1.5,
        }}
      ></Box>
      <Typography
        sx={{
          color: "#99756E",
          fontWeight: "bold",
          fontSize: {
            xs: "1.5em", // For extra small screens
            sm: "2em", // For small screens
            md: "2.0em", // For medium screens
            lg: "2.5em", // For large screens
          },
          border: 1,
          mx: {
            xs: "20%", // For extra small screens
            sm: "30%", // For small screens
            md: "40%", // For medium screens
            lg: "40%", // For large screens
          },
          borderRadius: 6,
        }}
      >
        CONTACT US{" "}
      </Typography>
      <br />
      <form ref={form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ mx: "23%" }}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid xs={12} md={4} display="flex" justifyContent="flex-start">
              <Typography
                sx={{
                  color: "#99756E",
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1em", // For extra small screens
                    sm: "1.5em", // For small screens
                    md: "2.0em", // For medium screens
                    lg: "2.0em", // For large screens
                  },
                }}
              >
                Name:{" "}
              </Typography>
            </Grid>
            <Grid xs={12} md={8}>
              {" "}
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                // value={value}
                // id="outlined-basic"
                // label={label}
                // variant="standard"
                size="small"
                id="outlined-basic"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                // label="Outlined"
                variant="outlined"
                name="from_name"
                // error={!!error}
                // helperText={error?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid xs={12} md={4} display="flex" justifyContent="flex-start">
              <Typography
                sx={{
                  color: "#99756E",
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1em", // For extra small screens
                    sm: "1.5em", // For small screens
                    md: "2.0em", // For medium screens
                    lg: "2.0em", // For large screens
                  },
                }}
              >
                E-mail:{" "}
              </Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {" "}
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                name="from_email"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid xs={12} md={4} display="flex" justifyContent="flex-start">
              <Typography
                sx={{
                  color: "#99756E",
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1em", // For extra small screens
                    sm: "1.5em", // For small screens
                    md: "2.0em", // For medium screens
                    lg: "2.0em", // For large screens
                  },
                }}
              >
                Mobile Number:{" "}
              </Typography>
            </Grid>
            <Grid xs={10} md={4}>
              {" "}
              <PhoneInput
                style={{ width: "80%" }}
                defaultCountry="ph"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                name="from_number"
              />
            </Grid>
          </Grid>

          <TextField
            id="outlined-multiline-flexible"
            sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
            multiline
            rows={4}
            placeholder="Type message here"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            sx={{
              background: "#ffffff",
              color: "#E66253",
              fontSize: {
                xs: "0.8em", // For extra small screens
                sm: "1.0em", // For small screens
                md: "1.2em", // For medium screens
                lg: "1.2em", // For large screens
              },
              fontWeight: "bold",
              borderRadius: 6,
              border: 1,
              borderColor: "#E66253",
              px: {
                xs: 2, // For extra small screens
                sm: "1.5em", // For small screens
                md: 8, // For medium screens
                lg: 8, // For large screens
              },
              mt: 3,
              "&:hover": {
                backgroundColor: "#E66253",
                color: "#ffffff",
                border: 1,
                borderColor: "#ffffff",
              },
            }}
            onClick={sendEmail}
          >
            SEND
            {isHovered ? (
              <>
                &nbsp; &nbsp;
                <img
                  src="/images/paperplane.png"
                  width="20px"
                  height="20px"
                  style={{ margin: 0, marginTop: 5 }}
                />
              </>
            ) : (
              <>
                &nbsp; &nbsp;
                <img
                  src="/images/paperplane.png"
                  width="20px"
                  height="20px"
                  style={{ margin: 0, marginTop: 5 }}
                />
              </>
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ContactUs;
