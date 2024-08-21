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
import Button from "@mui/material/Button";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
    street: yup
      .string()
      .required("StreetName, Building, House No. are Required"),
    // region: yup.string().required("Region is required"),
    // province: yup.string().required("Province is required"),
    // city: yup.string().required("Cityarangay is required"),
    // barangay: yup.string().required("Barangay is required"),

    phone: yup.string().required("Phone Number is Required"),
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
        image: "http://127.0.0.1:8000/Photos/profile.png",
        active: true,
      }).then((res) => {
        console.log(res, res.data);
        try {
          AxiosInstance.post(`address/`, {
            user_id: res.data.id,
            phone: data.phone,
            address:
              data.street +
              " " +
              barangayAddr +
              " " +
              cityAddr +
              " " +
              provinceAddr +
              " " +
              regionAddr,
            name: data.first_name + " " + data.last_name,
            default: false,
            postalcode: data.postalCode,
            longi: 0,
            lang: 0,
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
  const registerNutritionist = () => {
    navigate("/RegisterNutritionist");
  };

  // ! address details
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    console.log(e);
    setRegionAddr(e.target.selectedOptions[0].text);
    console.log(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
    // const temp =
    //   addressValue +
    //   " " +
    //   regionAddr +
    //   " " +
    //   provinceAddr +
    //   " " +
    //   e.target.selectedOptions[0].text;
    //e.target.selectedOptions[0].text;

    // console.log(temp);
    // setValue(temp);
    // console.log(
    //   getGeocode({ address: temp }).then((results) => {
    //     const { lat, lng } = getLatLng(results[0]);
    //     console.log("Coordinate: ", lat, lng);
    //     setSearchOriginLatitude(lat);
    //     setSearchOriginLongtitude(lng);
    //   })
    // );
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
    console.log(
      regionAddr,
      " ",
      provinceAddr,
      " ",
      cityAddr,
      " ",
      barangayAddr
    );

    const temp =
      addressValue + " " + regionAddr + " " + provinceAddr + " " + cityAddr;
    //e.target.selectedOptions[0].text;

    console.log(temp);
    setValue(temp);
    console.log(
      getGeocode({ address: temp }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinate: ", lat, lng);
        setSearchOriginLatitude(lat);
        setSearchOriginLongtitude(lng);
      })
    );
  };

  useEffect(() => {
    region();
  }, []);
  //!
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "10px",
        color: "#99756E",
      }}
    >
      <img
        src="/images/transparentLogo.png"
        style={{ maxWidth: "15%", maxHeight: "10%" }}
      />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid xs={2}></Grid>
          <Grid xs={4}>
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Full Name
            </Typography>
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
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Last Name:
            </Typography>
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
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Street Name, Building, House No
            </Typography>
            <TextField
              id="streetName"
              name="streetName"
              label="Street Name, Building, House No"
              type="text"
              fullWidth
              margin="dense"
              {...register("street")}
              error={errors.street ? true : false}
            />
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Region
            </Typography>
            <select
              onChange={province}
              onSelect={region}
              style={{ width: "100%" }}
              sx={{ height: "5%" }}
              // {...register("region")}
              // error={errors.region ? true : false}
            >
              <option disabled>Select Region</option>
              {regionData &&
                regionData.length > 0 &&
                regionData.map((item) => (
                  <option key={item.region_code} value={item.region_code}>
                    {item.region_name}
                  </option>
                ))}
            </select>
            <br />
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Province
            </Typography>
            <select
              onChange={city}
              style={{ width: "100%" }}
              sx={{ height: "4%" }}
              // {...register("province")}
              // error={errors.province ? true : false}
            >
              <option disabled>Select Province</option>
              {provinceData &&
                provinceData.length > 0 &&
                provinceData.map((item) => (
                  <option key={item.province_code} value={item.province_code}>
                    {item.province_name}
                  </option>
                ))}
            </select>
            <br />
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              City
            </Typography>
            <select
              onChange={barangay}
              style={{ width: "100%" }}
              sx={{ height: "4%" }}
              // {...register("city")}
              // error={errors.city ? true : false}
            >
              <option disabled>Select City</option>
              {cityData &&
                cityData.length > 0 &&
                cityData.map((item) => (
                  <option key={item.city_code} value={item.city_code}>
                    {item.city_name}
                  </option>
                ))}
            </select>
            <br />
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Barangay
            </Typography>
            <select
              onChange={brgy}
              style={{ width: "100%", height: "4% " }}
              // {...register("barangay")}
              // error={errors.barangay ? true : false}
            >
              <option disabled>Select Barangay</option>
              {barangayData &&
                barangayData.length > 0 &&
                barangayData.map((item) => (
                  <option key={item.brgy_code} value={item.brgy_code}>
                    {item.brgy_name}
                  </option>
                ))}
            </select>
            {/* <TextField
              id="barangay"
              name="barangay"
              label="Barangay"
              type="text"
              fullWidth
              margin="dense"
              {...register("barangay")}
              error={errors.barangay ? true : false}
            />{" "}
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              City
            </Typography>
            <TextField
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
              margin="dense"
              {...register("city")}
              error={errors.city ? true : false}
            /> */}
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
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Phone Number
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
            <Typography textAlign="left" sx={{ color: "#000000" }}>
              Postal Code
            </Typography>
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
          <Grid xs={4}>
            <Box sx={{ mx: "5%" }}>
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Username:
              </Typography>
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
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Email:
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
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Password:
              </Typography>
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
              <Typography textAlign="left" sx={{ color: "#000000" }}>
                Confirm Password
              </Typography>
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

              <Grid container spacing={2} sx={{ my: "5%" }}>
                <Grid xs={2}></Grid>
                <Grid xs={6}>Already have an account?</Grid>
                <Grid xs={1.5}>
                  {" "}
                  <Link to="/Log-In">
                    <a style={{ textDecoration: "underline" }}>Log In</a>
                  </Link>
                </Grid>
              </Grid>
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
              <Grid container spacing={2} sx={{ my: "5%" }}>
                <Grid xs={2}></Grid>
                <Grid xs={4}>A Nutritionist?</Grid>
                <Grid xs={3}>
                  {" "}
                  <Link to="/RegisterNutritionist">
                    <a style={{ textDecoration: "underline" }}>Register Here</a>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid xs={2}></Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Registration;
