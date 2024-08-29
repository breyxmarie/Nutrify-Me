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

function ForgetPasswordOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
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
    // user_email: location.state.email,
    // otp: location.state.otp,
    // to_name: location.state.name,
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
      navigate("/Log-In?success=true");
    } else {
      // alert("Enter a valid OTP please");
    }
  };
  // sendEmail(forms);

  useEffect(() => {
    // sendEmail(forms);
  }, []);
  //!

  // TODO form handling

  const [userData, setUserData] = useState();
  const GetData = async () => {
    await AxiosInstance.get(`user/`).then((res) => {
      {
        res.data.map((item, index) =>
          console.log(item.username, item.password)
        );
      }
      console.log(res.data);
      setUserData(res.data);
    });
  };
  useEffect(() => {
    GetData();
  }, []);

  const [validation, setValidation] = useState();

  const pinSchema = yup.object().shape({
    otp: yup.string().required("pin is required"),
  });
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset2,
  } = useForm({
    resolver: yupResolver(pinSchema),
  });

  const passwordSchema = yup.object().shape({
    password: yup.string().required("email is required"),
  });
  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    reset3,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmitPin = (data) => {
    if (parseInt(data.otp) === parseInt(location.state.otp)) {
      console.log(true);
      navigate("/ForgetPasswordNew", {
        state: { email: location.state.email },
      });
    }
  };

  const emailSchema = yup.object().shape({
    // username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),
    email: yup
      .string()
      .required("email is required")
      .test("isAvailable", "Email not associated to any account", (value) => {
        console.log(errors1.email?.message);

        const updatedDiv = document.getElementById("error-message");
        updatedDiv.textContent = errors1.email?.message;
        return userData.some((user) => user.email === value); // Check if username exists in the array
      }),
  });
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmitEmail = (data) => {
    console.log(data);
    // if (parseInt(data.otp) === parseInt(location.state.otp)) {
    //   toast.success("hi");
    //   navigate("/Log-In?success=true");
    // } else {
    //   // alert("Enter a valid OTP please");
    // }
    reset1();
    setForgetDiv(
      <div>
        <Typography>
          We’ve sent a 4-digit code to your email - abcdefg@gmail.com
        </Typography>
        <form onSubmit={handleSubmit2(onSubmitPin)}>
          {/* <TextField
            id="otp"
            name="otp"
            label="Enter 4-digit code"
            type="otp"
            fullWidth
            margin="dense"
            {...register2("otp")}
            error={errors2.otp ? true : false}
          /> */}

          {/* {validation}
          {console.log(errors1.email?.message)} */}
          <Typography
            variant="inherit"
            color="textSecondary"
            id="error-message"
          ></Typography>

          <button type="submit">SEND PIN</button>
        </form>
      </div>
    );
  };

  // TODO
  //? div

  //?
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      {/* {forgetDiv} */}
      {/* <ToastContainer />
      hello
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

        <button onClick={() => sendEmail(forms)}>RESEND OTP</button>
        <button type="submit">SUBMIT</button>
      </form> */}

      <Box sx={{ mx: "30%" }}>
        <Typography>
          We’ve sent a 4-digit code to your email - {location.state.email}
        </Typography>
        <form onSubmit={handleSubmit2(onSubmitPin)}>
          <TextField
            id="otp"
            name="otp"
            label="Enter 4-digit code"
            type="otp"
            fullWidth
            margin="dense"
            {...register2("otp")}
            error={errors2.otp ? true : false}
          />

          {/* {validation}
          {console.log(errors1.email?.message)} */}
          <Typography
            variant="inherit"
            color="textSecondary"
            id="error-message"
          ></Typography>
          <center>
            <Button
              type="submit"
              sx={{
                display: "block",
                float: "center",
                background: "#E66253",
                fontSize: "13px",
                mt: 2,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                },
              }}
            >
              SEND PIN
            </Button>
          </center>
        </form>
      </Box>
    </div>
  );
}

export default ForgetPasswordOTP;
