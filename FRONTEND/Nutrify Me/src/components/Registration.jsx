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
import { PhoneInput } from "react-international-phone";
import Grid from "@mui/material/Grid";

function Registration() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
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

  //! form handling
  const schema = yup.object().shape({
    //  username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),

    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),
    // address: yup.string().required("Address is Required"),
    streetName: yup
      .string()
      .required("StreetName, Building, House No. are Required"),
    barangay: yup.string().required("Barangay is required"),
    city: yup.string().required("City is Required"),
    phone: yup.string().required("Phone Number is REquired"),
    postalCode: yup.string().required("Postal Code is Required"),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .test("isAvailable", "Username already exists", (value) => {
        return !userData.some((user) => user.username === value); // Check if username exists in the array
      }),
    // // Add custom validation for username existence in database
    // // .test(
    // //   "isAvailable",
    // //   "Username already exists",
    // //   async (value, context) => {
    // //     const response = await fetch(`/api/check-username?username=${value}`); // Replace with your API endpoint
    // //     if (!response.ok) {
    // //       throw new Error("Network error");
    // //     }
    // //     const data = await response.json();
    // //     return !data.exists; // Return true if username is available (not found)
    // //   }
    // // ),
    email: yup.string().required("Email is required"),
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
    console.log({ data });
    console.log("hi");

    try {
      AxiosInstance.post(`user/`, {
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        privilege: "User",
        email: data.email,
      }).then((res) => {
        console.log(res, res.data);
        try {
          AxiosInstance.post(`address/`, {
            user_id: res.data.id,
            phone: data.phone,
            address: data.street + " " + data.barangay + " " + data.city + " ",
            name: data.first_name + " " + data.last_name,
            default: false,
            postalcode: data.postalCode,
          }).then((res) => {
            console.log(res, res.data);
            navigate("/Profiling", {
              state: { email: data.email, name: data.first_name },
            });
          });
        } catch (error) {
          console.log(error.response);
        }
      });
    } catch (error) {
      console.log(error.response);
    }

    reset();
  };
  //!

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextField
              id="first_name"
              name="first_name"
              label="First Name"
              type="text"
              fullWidth
              margin="dense"
              {...register("first_name")}
              error={errors.first_name ? true : false}
            />
            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              type="text"
              fullWidth
              margin="dense"
              {...register("last_name")}
              error={errors.last_name ? true : false}
            />
            Address
            <TextField
              id="streetName"
              name="streetName"
              label="Street Name, Building, House No"
              type="text"
              fullWidth
              margin="dense"
              {...register("streetName")}
              error={errors.streetName ? true : false}
            />
            <TextField
              id="barangay"
              name="barangay"
              label="Barangay"
              type="text"
              fullWidth
              margin="dense"
              {...register("barangay")}
              error={errors.barangay ? true : false}
            />
            <TextField
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
              margin="dense"
              {...register("city")}
              error={errors.city ? true : false}
            />
            {/* <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              type="text"
              fullWidth
              margin="dense"
              {...register("phone")}
              error={errors.phone ? true : false}
            /> */}
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
            <TextField
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              type="text"
              fullWidth
              margin="dense"
              {...register("postalCode")}
              error={errors.postalCode ? true : false}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              margin="dense"
              {...register("username")}
              error={errors.username ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="dense"
              {...register("email")}
              error={errors.email ? true : false}
            />
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
            <TextField
              id="conpassword"
              name="conpassword"
              label="Confirm Password"
              type="text"
              fullWidth
              margin="dense"
              {...register("conpassword")}
              error={errors.conpassword ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.conpassword?.message}
            </Typography>
            <button type="submit">Register</button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Registration;
