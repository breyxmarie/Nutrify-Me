import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dayjs from "dayjs";

function Profiling() {
  const [dates, setDates] = useState();
  const navigate = useNavigate();
  const otpnum = Math.floor(Math.random() * 10000000);
  const location = useLocation();
  const [haveHypertension, setHaveHypertension] = useState(null);
  const yesno = ["Yes", "No"];
  const gender = ["Male", "Female"];
  const sysChoices = ["< 120", "120 - 129", "130 - 139", "> 140"]
  const diaChoices = ["< 80", "80 - 89", "> 90"]



  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
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

  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    overflowY: "auto", // Enable vertical scrolling
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };

  //! form handling

  const schema = yup.object().shape({
    age: yup.string().required("Age is Required"),
    gender: yup.string().required("Gender is Required"),
    common_sys: yup.string().required("Systolic is Required"),
    common_dia: yup.string().required("Diastolic is Required"),
    // hypertension: yup.string().required("Do you have hypertension is Required"),
    //dateofBP: yup.string().required("Date is Required"),
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
    handleOpenLoading();
    console.log(location.state);
    let meds;
    let sys;
    let dia;
    switch (data.takingMeds) {
      case "Yes":
        meds = 1;
        break;
      case "No":
        meds = 0;
        break;
    }


    switch (data.common_sys) {
      case "< 120":
        sys = 120;
        break;
      case "120 - 129":
        sys = 125;
        break;
      case "130 - 139":
        sys = 135;
        break;
      case "> 140":
        sys = 140;
        break;
    }

    switch (data.common_dia) {
      case "< 80":
        dia = 80;
        break;
      case "80 - 89":
        dia = 85;
        break;
      case "> 90":
        dia = 90;
        break;
    
    }
    console.log(dates);
    try {
      AxiosInstance.post(`profiling/`, {
        user_id: location.state.userId,
        age: data.age,
        gender: data.gender,
        targetCalories: data.targetCalories,
        common_sys: sys,
        common_dia: dia,
        hypertension: 1,
        dateofBP: dates,
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
        handleCloseLoading();
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
    handleOpenLoading();
    try {
      AxiosInstance.post(`profiling/`, {
        user_id: location.state.userId,
        age: data.age,
        gender: data.gender,
        targetCalories: data.targetCalories,
        common_sys: 0,
        common_dia: 0,
        hypertension: 0,
        dateofBP: "2000-10-10",
        takingMeds: 0,
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
        handleCloseLoading();
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

  //?
  const [openLoading, setOpenLoading] = useState(false);
  const handleOpenLoading = () => {
    setOpenLoading(true), console.log("open");
  };
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };

  const [openTerms, setOpenTerms] = useState(true);
  const handleOpenTerms = () => {
    setOpenTerms(true), console.log("open");
  };
  const handleCloseTerms = () => {
    if (isChecked) {
      setOpenTerms(false);
    } else {
      alert("Please Agree to the Terms and Conditions");
    }
  };
  //?

  //? handle agree
  const [isChecked, setIsChecked] = useState(false);
  const handleChangeCheck = () => {
    setIsChecked(!isChecked);
  };
  //?

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "10px",
        fontFamily: "Poppins",
      }}
    >


      <Modal
        open={openTerms}
        //onClose={handleCloseLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <Typography sx={{ fontWeight: "bold" }}>
              Terms and Conditions
            </Typography>
          </center>
          <p>
            <b>Welcome to NutrifyMe</b>
            <br />
            These Terms and Conditions govern your use of our meal planning
            services. By accessing or using our Site, you agree to these terms.
            We are committed to promoting health and well-being in accordance
            with the Universal Health Care Act. Our services are designed to
            support:
            <br />
            -Nutritional education and meal planning that considers diverse
            dietary needs. <br />
            -Access to resources that promote healthy eating habits for all
            users. <br />
            -Collaboration with health professionals to provide accurate dietary
            information.
            <br />
            Our meal planning services are available to individuals who are
            eligible under relevant health care guidelines. Users are encouraged
            to consult with a healthcare professional before making significant
            dietary changes. We prioritize your privacy and data protection in
            compliance with the Data Privacy Act. We will: <br />
            <ul>
              <li>
                Collect only the personal data necessary for providing meal
                planning services, including dietary preferences, allergies, and
                health goals.{" "}
              </li>
              <li>
                Use your data solely for the purpose of enhancing your
                experience on our Site and providing personalized meal plans.{" "}
              </li>
              <li>
                Implement robust security measures to protect your personal
                information from unauthorized access or disclosure.{" "}
              </li>
            </ul>
            By using our Site, you agree to: <br />
            <ul>
              <li>
                Provide accurate and complete information about your dietary
                needs and preferences. <br />{" "}
              </li>
              <li>
                Regularly update your information to reflect any changes. <br />{" "}
              </li>
              <li>
                Respect the privacy of other users and refrain from sharing
                their personal information. <br />{" "}
              </li>
            </ul>
            You have the right to: <br />
            <ul>
              <li>Access the personal data we hold about you. </li>
              <li>Request corrections to your information. </li>
              <li>
                Withdraw consent for data processing, subject to our need to
                retain some data for legal compliance.{" "}
              </li>
            </ul>
            While we strive to provide accurate meal planning resources, we
            cannot guarantee that all meal plans will meet your specific health
            needs. We shall not be liable for any adverse health outcomes
            resulting from the use of our meal planning services.
          </p>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChangeCheck}
            style={{ color: "#ffffff" }}
          />
          I Agree to the Terms and Conditions
          <br />
          <center>
            <Button
              onClick={handleCloseTerms}
              sx={{
                borderRadius: 4,
                background: "#ffffff",
                color: "#E66253",
                ml: 2,
                height: "100%",
                px: 4,
                py: 1,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 1,
                },
              }}
            >
              Submit
            </Button>
          </center>
        </Box>
      </Modal>
      <Modal
        open={openLoading}
        onClose={handleCloseLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            {" "}
            <img src="/images/pacman.gif" width="13%" />
            <Typography>Capturing Data please wait...</Typography>
          </center>
        </Box>
      </Modal>

      <img
        src="/images/transparentLogo.png"
        style={{ maxWidth: "15%", maxHeight: "10%" }}
      />
      {}
      {haveHypertension === null ? (
        <>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.5em", color: "#000000" }}
          >
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


                
                <br/>
<Grid container spacing = {2}>
  <Grid md = {10}><Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={selectedNutritionist}
              // onChange={handleChange}
              fullWidth
              size="small"
              name="goal"
              width="100%"
              {...register1("common_sys")}
              error={errors.common_sys ? true : false}
            >
              {sysChoices.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select></Grid>
  <Grid md = {2}> <div   
 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
 style = {{border: '1px solid black', borderRadius: 15, marginRight: "50%"
  , marginLeft: "30%",  marginTop: "5%"
 }}>   

      ?
      {isHovered && <div className="tooltip"  style={{
        zIndex: 1,
            position: 'absolute',
            left: '50%', // Adjust this value as needed
            top: '80%',
            transform: 'translateY(-50%)',
            //backgroundColor: 'lightgray',
            padding: '10px',
          //  border: '1px solid black',
            borderRadius: '5px',
          }}><img src = "images/sys.png" /></div>}
    </div></Grid>

</Grid>
                
           
                {/* <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register("common_sys")}
                  error={errors.common_sys ? true : false}
                /> */}
                <Typography variant="inherit" color="textSecondary">
                  {errors.common_sys?.message}
                </Typography>
              </Grid>
              <Grid xs={5} sx={{ mx: "3%" }}>
                <Typography textAlign="left" sx={{ color: "#000000" }}>
                  Common Diastolic
                </Typography>
                <Grid container spacing = {2} sx = {{mt: 1}}>
                <Grid md = {10}>
                <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={selectedNutritionist}
              // onChange={handleChange}
              fullWidth
              size="small"
              name="goal"
              width="100%"
              {...register1("common_dia")}
              error={errors.common_dia ? true : false}
            >
              {diaChoices.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
                </Grid>
  <Grid md = {2}>
     <div   
 onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1} 
 style = {{border: '1px solid black', borderRadius: 15, marginRight: "50%"
  , marginLeft: "30%",  marginTop: "5%"
 }}>   

      ?
      {isHovered1 && <div className="tooltip"  style={{
        zIndex: 1,
            position: 'absolute',
            left: '50%', // Adjust this value as needed
            top: '60%',
            transform: 'translateY(-50%)',
            //backgroundColor: 'lightgray',
            padding: '10px',
          //  border: '1px solid black',
            borderRadius: '5px',
          }}><img src = "images/dia.png" /></div>}
    </div>
    </Grid>
    </Grid>
              
                {/* <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register("common_dia")}
                  error={errors.common_dia ? true : false}
                /> */}
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
                {/* <TextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  size="small"
                  fullWidth
                  margin="dense"
                  {...register("dateofBP")}
                  error={errors.dateofBP ? true : false}
                /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ background: "#ffffff", width: "100%" }}
                    onChange={(e) =>
                      setDates(Dayjs(e["$d"]).format("YYYY-MM-DD"))
                    }
                    // name="date_entry"
                    // {...register("date_entry")}
                    // error={errors.date_entry ? true : false}
                  />
                </LocalizationProvider>
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
