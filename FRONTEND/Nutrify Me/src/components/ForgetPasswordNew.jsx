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

function ForgetPasswordNew() {
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

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
  });

  const onSubmitPassword = (data) => {
    const foundUser = userData.find(
      (user) => user.email === location.state.email
    );
    console.log(foundUser);
    try {
      AxiosInstance.put(`user/`, {
        user_id: foundUser.user_id,
        username: foundUser.username,
        password: data.password,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        privilege: "User",
        email: foundUser.email,
      }).then((res) => {
        console.log(res, res.data);
        // navigate("/Profiling", {
        //   state: { email: data.email, name: data.first_name },
        // });

        navigate("/Log-In?success=newPassword");
      });
    } catch (error) {
      console.log(error.response);
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
    resolver: yupResolver(passwordSchema),
  });

  // TODO

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      <div>
        <Typography>
          Set the new password to your account to log-in and access all
          features.
        </Typography>
        <form onSubmit={handleSubmit1(onSubmitPassword)}>
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            fullWidth
            margin="dense"
            {...register1("password")}
            // error={errors1.email ? true : false}
          />

          {/* {validation}
          {console.log(errors1.email?.message)} */}
          <Typography
            variant="inherit"
            color="textSecondary"
            id="error-message"
          >
            {errors1.password?.message}
          </Typography>

          <button type="submit">CONTINUE</button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPasswordNew;
