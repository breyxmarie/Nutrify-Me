import { useState, useEffect } from "react";
import AxiosInstance from "./forms/AxiosInstance";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function RegistrationNutritionist() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [file, setFile] = useState();

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

  const schema = yup.object().shape({
    //  username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .test("isAvailable", "Username already exists", (value) => {
        return !userData.some((user) => user.username === value); // Check if username exists in the array
      }),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    conpassword: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    file: yup.mixed().required(),
    phone: yup.string().required("Phone Number is Required"),
    license_id: yup.string().required("License ID is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    console.log({ data });
    console.log("hi");
    let uploadedPhoto;
    if (!file) {
      return alert("Please select a file to upload");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await AxiosInstance.post("savefilelicense", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data); // Handle successful response
        uploadedPhoto = response.data;
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }

      console.log("try");

      try {
        AxiosInstance.post(`verifynutritionist/`, {
          username: data.username,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          license_pic: "http://127.0.0.1:8000/Photos/license/" + uploadedPhoto,
          email: data.email,
          phone: data.phone,
          license_id: data.license_id,
        }).then((res) => {
          console.log(res.data);

          navigate("/?success=registered");
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "0px",
        color: "#99756E",
      }}
    >
      {" "}
      <img
        src="/images/transparentLogo.png"
        style={{ maxWidth: "20%", maxHeight: "8%" }}
      />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid xs={3}></Grid>
          <Grid xs={3}>
            <Box sx={{ mr: "10%" }}>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Username
              </Typography>
              <TextField
                id="username"
                name="username"
                size="small"
                type="text"
                fullWidth
                margin="dense"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Email:
              </Typography>
              <TextField
                id="email"
                name="email"
                type="email"
                size="small"
                fullWidth
                margin="dense"
                {...register("email")}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Password
              </Typography>
              <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                size="small"
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Confirm Password:
              </Typography>
              <TextField
                id="conpassword"
                name="conpassword"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                {...register("conpassword")}
                error={errors.conpassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.conpassword?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box sx={{ ml: "10%" }}>
              {" "}
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Phone Number:
              </Typography>
              <PhoneInput
                sx={{ width: "100%" }}
                defaultCountry="ph"
                // value={phone}
                // onChange={(phone) => setPhone(phone)}
                id="phone"
                name="phone"
                label="Phone Number"
                {...register("phone")}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.phone?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                First Name:
              </Typography>
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                {...register("first_name")}
                error={errors.first_name ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.first_name?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Last Name:
              </Typography>
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                {...register("last_name")}
                error={errors.last_name ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.last_name?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                License ID Number
              </Typography>
              <TextField
                id="license_id"
                name="license_id"
                label="License Id"
                type="text"
                fullWidth
                margin="dense"
                size="small"
                {...register("license_id")}
                error={errors.license_id ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.license_id?.message}
              </Typography>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                License ID
              </Typography>
              <input
                type="file"
                {...register("file")}
                onChange={(evt) => setFile(evt.target.files[0])}
                //  onChange={handleFileUpload}
              />
              <br />
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
                Register
              </Button>
            </Box>
          </Grid>
          <Grid xs={3}></Grid>
        </Grid>
      </form>
    </div>
  );
}

export default RegistrationNutritionist;
