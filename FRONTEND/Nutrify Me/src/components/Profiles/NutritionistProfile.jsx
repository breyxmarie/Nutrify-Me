import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLoggedInUser } from "../LoggedInUserContext";
import AxiosInstance from "../forms/AxiosInstance";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function NutritionistProfile() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  const [userData, setUserData] = useState();
  const [nutritionists, setNutritionists] = useState();
  const [schedules, setSchedules] = useState([]);
  const [numSchedules, setNumSchedules] = useState(1); // Initial number of schedules
  const [edit, setEdit] = useState(false);

  const [file, setFile] = useState();
  const dayChoices = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const GetData = async () => {
    // await AxiosInstance.get(`user/` + loggedInUser.user_id)
    //   .then((res) => {
    //     setUserData(res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    //  await AxiosInstance.get(`nutritionistU/` + loggedInUser.user_id);
    // await AxiosInstance.get(`nutritionistU/` + loggedInUser.user_id)
    //   .then((res) => {
    //     setNutritionist(res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    console.log(nutritionist.schedule_day.length);
    const tempSchedule = [];

    for (let i = 0; i < nutritionist.schedule_day.length; i++) {
      const timeRange = nutritionist.schedule_time[i];
      const [startTime, endTime] = timeRange.split("-");
      console.log(
        dayjs("2024-08-17" + " " + startTime).format("h:mm A"),
        startTime
      );
      const temp = {
        day: nutritionist.schedule_day[i],
        start_time: dayjs("2024-08-17" + " " + startTime),
        end_time: dayjs("2024-08-10" + " " + endTime),
      };

      tempSchedule.push(temp);
    }

    // console.log(tempSchedule);
    // console.log(schedules);

    setSchedules(tempSchedule);
  };

  useEffect(() => {
    GetData();
  }, []);

  // useEffect(() => {
  //   // Do something after nutritionist updates
  // }, [nutritionist]);
  // console.log(loggedInUser);

  const handleFileUpload = (event) => {
    const files = event.target.files[0];
    setFile(files);
    console.log(file);
    console.log(files);
    // Additional logic for preparing upload data (formData)
  };
  const click = () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);
  };

  const editProfile = () => {
    GetData();
    console.log(nutritionist, loggedInUser)

    const tempSchedule = [];
    for (let i = 0; i < nutritionist.schedule_day.length; i++) {
      const timeRange = nutritionist.schedule_time[i];
      const [startTime, endTime] = timeRange.split("-");

      const temp = {
        day: nutritionist.schedule_day[i],
        start_time: dayjs("2024-08-17" + " " + startTime),
        end_time: dayjs("2024-08-10" + " " + endTime),
      };

      tempSchedule.push(temp);
    }

    console.log(tempSchedule);
    // console.log(tempSchedule);
    // console.log(schedules);

    setSchedules(tempSchedule);

    setEdit(true);

    setProfileDiv(
      <>
        {/* <button onClick={click}>click</button>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={10} sx={{ mx: "30%" }}>
              Profile Picture: Upload Image:
           
              <input
                type="file"
                {...register("file")}
                // onChange={(evt) => setFile(evt.target.files[0])}
                onChange={handleFileUpload}
              />
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Username:{" "}
              </Typography>
              <TextField
                id="username"
                name="username"
                label="Usernam,e"
                defaultValue={loggedInUser.username}
                fullWidth
                margin="dense"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                id="error-message"
              >
                {errors.username?.message}
              </Typography>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Name:{" "}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid xs={6}>
                  {" "}
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    defaultValue={loggedInUser.first_name}
                    fullWidth
                    margin="dense"
                    {...register("firstname")}
                    // error={errors.username ? true : false}
                  />
                </Grid>{" "}
                <Grid xs={6}>
                  {" "}
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    defaultValue={loggedInUser.last_name}
                    fullWidth
                    margin="dense"
                    sx={{ width: "100%" }}
                    {...register("lastname")}
                    // error={errors.username ? true : false}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={6}> </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={2} sx={{ ml: "30%" }}>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Password:{" "}
              </Typography>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="text"
                defaultValue={loggedInUser.password}
                fullWidth
                margin="dense"
                sx={{ width: "100%" }}
                {...register("password")}
                // error={errors.username ? true : false}
              />
            </Grid>
            <Grid xs={6}></Grid>
          </Grid>{" "}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={2} sx={{ ml: "30%" }}>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                E-mail:{" "}
              </Typography>

              <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                {loggedInUser.email}
              </Typography>
            </Grid>
            <Grid xs={6}></Grid>
          </Grid>
          <Box sx={{ ml: "21%", mt: "50px" }}>
            <Button
              sx={{
                background: "#E66253",
                color: "#ffffff",
                float: "left",
                ml: 20,
                px: 3,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}
              type="submit"
            >
              SAVE
            </Button>
          </Box>
          <br />
          <br />
          <br />
        </form> */}
      </>
    );
  };

  const [profileDiv, setProfileDiv] = useState(
    <>
      <Button
        sx={{
          color: "#539801",
          border: 1,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#539801",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
        onClick={editProfile}
      >
        EDIT
      </Button>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Username
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.username}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Name:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.first_name} {"  "}
            {loggedInUser.last_name}
            {/* <Grid container spacing={2}>
              <Grid xs={6}>{loggedInUser.first_name} </Grid>
              <Grid xs={2}>{loggedInUser.last_name}</Grid>
            </Grid> */}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Password:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.password}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            E-mail:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.email}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
      <Typography>Schedule:</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={6}>
          <Typography>Day</Typography>

          {/* {nutritionist.schedule_day  ((item) => (
            <Typography>item</Typography>
          ))} */}

          {/* <Typography>{nutritionist?.schedule_day}</Typography>
          {nutritionist?.schedule_day.map((item) => (
            <Typography sx={{ color: "#000000" }}>{item}</Typography>
          ))} */}

          {/* {nutritionist ? (
            //nutritionist?.schedule_day((item) => <Typography >item</Typography>)
            <>weh</>
          ) : (
            // nutritionist?.schedule_day.map((item) => (
            //   <Typography>{item}</Typography>
            // ))
            <>really ba</>
          )}
          {console.log(nutritionist?.username)} */}
        </Grid>
        <Grid xs={6}>
          <Typography>Time </Typography>

          {nutritionist && <Typography>{nutritionist.username} </Typography>}
          <Typography sx={{ color: "#000000" }}>
            {nutritionist?.username}{" "}
          </Typography>
          {nutritionist !== null ? (
            <>
              <Typography>Day</Typography>

              {/* {nutritionist}
              {nutritionist?.schedule_time.map((item, index) => (
                <Typography key={index}>
                  {nutritionist?.schedule_day[index] === item
                    ? item
                    : `${item} (updated)`}
                  {item}
                </Typography>
              ))} */}
              <Typography>Time </Typography>
              {/* ... Time rendering logic ... */}
            </>
          ) : (
            <Typography>No schedule information available.</Typography>
          )}
        </Grid>
      </Grid>
      <Box sx={{ ml: "21%", mt: "50px" }}>
        <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            fontSize: "25px",
            float: "left",
            ml: 20,
          }}
        >
          Account Removal
        </Typography>
        <br />
        <br />
        <br />
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            float: "left",
            ml: 20,
            px: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          DEACTIVATE ACCOUNT
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <Button
        sx={{
          color: "#B3B3B3",
          border: 1,
          fontWeight: "bold",
          px: 5,
          "&:hover": {
            backgroundColor: "#B3B3B3",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
      >
        {" "}
        LOG OUT
      </Button>
    </>
  );

  //! forms
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    // .test("isAvailable", "Username already exists", (value) => {
    //   const updatedDiv = document.getElementById("error-message");
    //   updatedDiv.textContent = errors.username?.message;
    //   return !userData.some((user) => user.username === value); // Check if username exists in the array
    // }),
    password: yup.string().required("Password is really a requirement"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    // password: yup.string().min(8).max(32).required(),
    file: yup.mixed().optional(),
    // .test('fileSize', 'File is too large', (value) => {
    //   if (!value) return true; // Allow empty file
    //   return value.size <= 1024 * 1024; // Limit to 1 MB
    // })
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
    //setEdit(false);
    console.log(schedules)
    console.log(data);
    console.log(file);
    let fileName = "";
   
    if (data.file.length < 1) {
      console.log("no file");
    
      if (data.username === loggedInUser.username) {
        //console.log("same");
    
        try {
          console.log(fileName);
          AxiosInstance.put(`user/`, {
            user_id: loggedInUser.user_id,
            username: data.username,
            password: data.password,
            first_name: data.firstname,
            last_name: data.lastname,
            privilege: "Nutritionist",
            email: loggedInUser.email,
            image: loggedInUser.image,
            active: 1,
          }).then((res) => {
            console.log(res, res.data);
    
            const tempDay = [];
            const tempTime = [];
            console.log(schedules);
            for (let i = 0; i < schedules.length; i++) {
              console.log(schedules.length, schedules[i].day);
              tempDay.push(schedules[i].day);
              tempTime.push(
                schedules[i].start_time.format("h:mm A") +
                  "-" +
                  schedules[i].end_time.format("h:mm A")
              );
            }
            console.log(nutritionist);
            console.log(fileName);
            try {
              AxiosInstance.put(`nutritionist/`, {
                nutritionist_id: nutritionist.nutritionist_id,
                username: data.username,
                password: nutritionist.password,
                first_name: nutritionist.first_name,
                last_name: nutritionist.last_name,
                license_id: nutritionist.license_id,
                schedule_day: tempDay,
                schedule_time: tempTime,
                image: nutritionist.image,
                license_pic: nutritionist.license_pic,
                user_id: nutritionist.user_id,
              }).then((res) => {
                console.log(res);
    
                AxiosInstance.get(`nutritionist/`).then((res) => {
                  const newNutritionist = res.data.find(
                    (user) => user.user_id === loggedInUser.user_id
                  );
                  setnNutritionist(newNutritionist);
                  console.log(newNutritionist);
                  const tempSchedule = [];
                  for (let i = 0; i < newNutritionist.schedule_day.length; i++) {
                    const timeRange = newNutritionist.schedule_time[i];
                    const [startTime, endTime] = timeRange.split("-");
    
                    const temp = {
                      day: newNutritionist.schedule_day[i],
                      start_time: dayjs("2024-08-17" + " " + startTime),
                      end_time: dayjs("2024-08-10" + " " + endTime),
                    };
    
                    tempSchedule.push(temp);
                  }
    
                  setSchedules(tempSchedule);
                });
    
                try {
                  AxiosInstance.get(`user/`).then((res) => {
                    const newUser = res.data.find(
                      (user) => user.user_id === loggedInUser.user_id
                    );
                    console.log(newUser);
                    setLoggedInUser(newUser);
                  });
                  setEdit(false);
                } catch (error) {
                  console.log(error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error.response);
        }
      } else {
        // This else block was missing a closing bracket at the end
        // console.log("not same");
        let usernameFinal = data.username;
        let check = false;
        AxiosInstance.get(`user/`).then((res) => {
          check = res.data.some((user) => user.username === data.username);
    
          const updatedDiv = document.getElementById("error-message");
          if (check) {
            updatedDiv.textContent = "username taken";
          } else {
            updatedDiv.textContent = "username available";
            try {
              AxiosInstance.put(`user/`, {
                user_id: loggedInUser.user_id,
                username: data.username,
                password: data.password,
                first_name: data.firstname,
                last_name: data.lastname,
                privilege: "Nutritionist",
                email: loggedInUser.email,
                image: loggedInUser.image,
                active: 1,
              }).then((res) => {
                console.log(res, res.data);
    
                const tempDay = [];
                const tempTime = [];
                console.log(schedules);
                for (let i = 0; i < schedules.length; i++) {
                  console.log(schedules.length, schedules[i].day);
                  tempDay.push(schedules[i].day);
                  tempTime.push(
                    schedules[i].start_time.format("h:mm A") +
                      "-" +
                      schedules[i].end_time.format("h:mm A")
                  );
                }
    
                try {
                  AxiosInstance.put(`nutritionist/`, {
                    nutritionist_id: nutritionist.nutritionist_id,
                    username: data.username,
                    password: nutritionist.password,
                    first_name: nutritionist.first_name,
                    last_name: nutritionist.last_name,
                    license_id: nutritionist.license_id,
                    schedule_day: tempDay,
                    schedule_time: tempTime,
                    image: nutritionist.image,
                    license_pic: nutritionist.license_pic,
                    user_id: nutritionist.user_id,
                  }).then((res) => {
                    console.log(res);
    
                    AxiosInstance.get(`nutritionist/`).then((res) => {
                      const newNutritionist = res.data.find(
                        (user) => user.user_id === loggedInUser.user_id
                      );
                      setnNutritionist(newNutritionist);
                      console.log(newNutritionist);
    
                      const tempSchedule = [];
                      for (let i = 0; i < newNutritionist.schedule_day.length; i++) {
                        const timeRange = newNutritionist.schedule_time[i];
                        const [startTime, endTime] = timeRange.split("-");
    
                        const temp = {
                          day: newNutritionist.schedule_day[i],
                          start_time: dayjs("2024-08-17" + " " + startTime),
                          end_time: dayjs("2024-08-10" + " " + endTime),
                        };
    
                        tempSchedule.push(temp);
                      }
    
                      setSchedules(tempSchedule);
                    });
    
                    try {
                      AxiosInstance.get(`user/`).then((res) => {
                        const newUser = res.data.find(
                          (user) => user.user_id === loggedInUser.user_id
                        );
                        console.log(newUser);
                        setLoggedInUser(newUser);
                      });
                      setEdit(false);
                    } catch (error) {
                      console.log(error);
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              });
            } catch (error) {
              console.log(error.response);
            }
          }
        });
      }
    }
    





          //! may profile image na inupload dito
            else {
      console.log("there is  file");
      const formData = new FormData();
      formData.append("file", data.file[0]);

      try {
        //  const response =

        await AxiosInstance.post("shopmealplan/savefile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          fileName = res.data;
          console.log(fileName);



          if (data.username === loggedInUser.username) {
            //console.log("same");
      
            try {
              console.log(fileName);
              AxiosInstance.put(`user/`, {
                user_id: loggedInUser.user_id,
                username: data.username,
                password: data.password,
                first_name: data.firstname,
                last_name: data.lastname,
                privilege: "Nutritionist",
                email: loggedInUser.email,
                image: "https://nightxperson.pythonanywhere.com/Photos/" + fileName,
                active: 1,
              }).then((res) => {
                console.log(res, res.data);
                // navigate("/Profiling", {
                //   state: { email: data.email, name: data.first_name },
                // });
      
                // navigate("/Log-In?success=newPassword");
                const tempDay = [];
                const tempTime = [];
                console.log(schedules);
                for (let i = 0; i < schedules.length; i++) {
                  console.log(schedules.length, schedules[i].day);
                  tempDay.push(schedules[i].day);
                  tempTime.push(
                    schedules[i].start_time.format("h:mm A") +
                      "-" +
                      schedules[i].end_time.format("h:mm A")
                  );
                }
                console.log(nutritionist);
                console.log(fileName);
                try {
                  AxiosInstance.put(`nutritionist/`, {
                    nutritionist_id: nutritionist.nutritionist_id,
                    username: data.username,
                    password: nutritionist.password,
                    first_name: nutritionist.first_name,
                    last_name: nutritionist.last_name,
                    license_id: nutritionist.license_id,
                    schedule_day: tempDay,
                    schedule_time: tempTime,
                    image:
                      "https://nightxperson.pythonanywhere.com/Photos/" + fileName,
                    license_pic: nutritionist.license_pic,
                    user_id: nutritionist.user_id,
                  }).then((res) => {
                    console.log(res);
      
                    const response = AxiosInstance.get(`nutritionist`);
      
                    AxiosInstance.get(`nutritionist/`).then((res) => {
                      const newNutritionist = res.data.find(
                        (user) => user.user_id === loggedInUser.user_id
                      );
                      setnNutritionist(newNutritionist);
                      console.log(newNutritionist);
                      const tempSchedule = [];
                      for (let i = 0; i < newNutritionist.schedule_day.length; i++) {
                        const timeRange = newNutritionist.schedule_time[i];
                        const [startTime, endTime] = timeRange.split("-");
      
                        const temp = {
                          day: newNutritionist.schedule_day[i],
                          start_time: dayjs("2024-08-17" + " " + startTime),
                          end_time: dayjs("2024-08-10" + " " + endTime),
                        };
      
                        tempSchedule.push(temp);
                      }
      
                      console.log(tempSchedule);
                      // console.log(tempSchedule);
                      // console.log(schedules);
      
                      setSchedules(tempSchedule);
                    });
      
                    try {
                      AxiosInstance.get(`user/`).then((res) => {
                        // {
                        //   res.data.map((item, index) =>
                        //   //  console.log(item.username, item.password)
                        //   );
                        // }
                        //  console.log(res.data);
      
                        const newUser = res.data.find(
                          (user) => user.user_id === loggedInUser.user_id
                        );
                        console.log(newUser);
                        setLoggedInUser(newUser);
      
                      //   setProfileDiv(
                      //     <>
                      //       <Button
                      //         sx={{
                      //           color: "#539801",
                      //           border: 1,
                      //           fontWeight: "bold",
                      //           "&:hover": {
                      //             backgroundColor: "#539801",
                      //             color: "#ffffff",
                      //             border: 0.5,
                      //             borderColor: "#ffffff",
                      //           },
                      //         }}
                      //         onClick={editProfile}
                      //       >
                      //         EDIT
                      //       </Button>
                      //       <Grid container spacing={2} sx={{ my: 3 }}>
                      //         <Grid xs={6} sx={{ ml: "30%" }}>
                      //           <Typography
                      //             sx={{
                      //               color: "#E66253",
                      //               fontWeight: "bold",
                      //               textAlign: "left",
                      //             }}
                      //           >
                      //             Username
                      //           </Typography>
      
                      //           <Typography
                      //             sx={{ color: "#99756E", textAlign: "left" }}
                      //           >
                      //             {loggedInUser.username}
                      //           </Typography>
                      //         </Grid>
                      //         <Grid xs={6}> </Grid>
                      //       </Grid>
                      //       <Grid container spacing={2} sx={{ my: 3 }}>
                      //         <Grid xs={10} sx={{ ml: "30%" }}>
                      //           <Typography
                      //             sx={{
                      //               color: "#E66253",
                      //               fontWeight: "bold",
                      //               textAlign: "left",
                      //             }}
                      //           >
                      //             Name:{" "}
                      //           </Typography>
      
                      //           <Typography
                      //             sx={{ color: "#99756E", textAlign: "left" }}
                      //           >
                      //             {newUser.first_name} {""}
                      //             {newUser.last_name}
                      //           </Typography>
                      //         </Grid>
                      //         <Grid xs={6}> </Grid>
                      //       </Grid>
                      //       <Grid container spacing={2} sx={{ my: 3 }}>
                      //         <Grid xs={2} sx={{ ml: "30%" }}>
                      //           <Typography
                      //             sx={{
                      //               color: "#E66253",
                      //               fontWeight: "bold",
                      //               textAlign: "left",
                      //             }}
                      //           >
                      //             Passoword:{" "}
                      //           </Typography>
      
                      //           <Typography
                      //             sx={{ color: "#99756E", textAlign: "left" }}
                      //           >
                      //             {newUser.password}
                      //           </Typography>
                      //         </Grid>
                      //         <Grid xs={6}></Grid>
                      //       </Grid>{" "}
                      //       <Grid container spacing={2} sx={{ my: 3 }}>
                      //         <Grid xs={2} sx={{ ml: "30%" }}>
                      //           <Typography
                      //             sx={{
                      //               color: "#E66253",
                      //               fontWeight: "bold",
                      //               textAlign: "left",
                      //             }}
                      //           >
                      //             E-mail:{" "}
                      //           </Typography>
      
                      //           <Typography
                      //             sx={{ color: "#99756E", textAlign: "left" }}
                      //           >
                      //             {loggedInUser.email}
                      //           </Typography>
                      //         </Grid>
                      //         <Grid xs={6}></Grid>
                      //       </Grid>
                      //       <Box sx={{ ml: "21%", mt: "50px" }}>
                      //         <Typography
                      //           sx={{
                      //             color: "#99756E",
                      //             fontWeight: "bold",
                      //             fontSize: "25px",
                      //             float: "left",
                      //             ml: 20,
                      //           }}
                      //         >
                      //           Account Removal
                      //         </Typography>
                      //         <br />
                      //         <br />
                      //         <br />
                      //         <Button
                      //           sx={{
                      //             background: "#E66253",
                      //             color: "#ffffff",
                      //             float: "left",
                      //             ml: 20,
                      //             px: 3,
                      //             "&:hover": {
                      //               backgroundColor: "#ffffff",
                      //               color: "#E66253",
                      //               border: 0.5,
                      //               borderColor: "#E66253",
                      //             },
                      //           }}
                      //         >
                      //           DEACTIVATE ACCOUNT
                      //         </Button>
                      //       </Box>
                      //       <br />
                      //       <br />
                      //       <br />
                      //       <Button
                      //         sx={{
                      //           color: "#B3B3B3",
                      //           border: 1,
                      //           fontWeight: "bold",
                      //           px: 5,
                      //           "&:hover": {
                      //             backgroundColor: "#B3B3B3",
                      //             color: "#ffffff",
                      //             border: 0.5,
                      //             borderColor: "#ffffff",
                      //           },
                      //         }}
                      //       >
                      //         {" "}
                      //         LOG OUT
                      //       </Button>
                      //     </>
                      //   );
                     });
                      setEdit(false);
                    } catch (error) {
                      console.log(error);
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              });
            } catch (error) {
              console.log(error.response);
            }
          }

          else {
            // console.log("not same");
            let usernameFinal = data.username;
            let check = false;
            AxiosInstance.get(`user/`).then((res) => {
              // {
              //   res.data.map((item, index) =>
              //     console.log(item.username, item.password)
              //   );
              // }
              // console.log(res.data);
              check = res.data.some((user) => user.username === data.username);
              // console.log(check);
              const updatedDiv = document.getElementById("error-message");
              if (check) {
                updatedDiv.textContent = "username taken";
                //  console.log("username taken");
              } else {
                updatedDiv.textContent = "username available";
      
                const formData = new FormData();
                formData.append("file", data.file[0]);

                try {
                  //  const response =
          
                 AxiosInstance.post("shopmealplan/savefile", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }).then((respo) => {

                try {
                  AxiosInstance.put(`user/`, {
                    user_id: loggedInUser.user_id,
                    username: data.username,
                    password: data.password,
                    first_name: data.firstname,
                    last_name: data.lastname,
                    privilege: "User",
                    email: loggedInUser.email,
                   image: "https://nightxperson.pythonanywhere.com/Photos/" + respo.data,
                  }).then((resp) => {
                     console.log(resp, resp.data);


                      



                      
                     try {
                      console.log(fileName);
                      AxiosInstance.put(`user/`, {
                        user_id: loggedInUser.user_id,
                        username: data.username,
                        password: data.password,
                        first_name: data.firstname,
                        last_name: data.lastname,
                        privilege: "Nutritionist",
                        email: loggedInUser.email,
                        image: "https://nightxperson.pythonanywhere.com/Photos/" + fileName,
                        active: 1,
                      }).then((res) => {
                        console.log(res, res.data);
                        // navigate("/Profiling", {
                        //   state: { email: data.email, name: data.first_name },
                        // });
              
                        // navigate("/Log-In?success=newPassword");
                        const tempDay = [];
                        const tempTime = [];
                        console.log(schedules);
                        for (let i = 0; i < schedules.length; i++) {
                          console.log(schedules.length, schedules[i].day);
                          tempDay.push(schedules[i].day);
                          tempTime.push(
                            schedules[i].start_time.format("h:mm A") +
                              "-" +
                              schedules[i].end_time.format("h:mm A")
                          );
                        }
                        console.log(nutritionist);
                        console.log(fileName);
                        try {
                          AxiosInstance.put(`nutritionist/`, {
                            nutritionist_id: nutritionist.nutritionist_id,
                            username: data.username,
                            password: nutritionist.password,
                            first_name: nutritionist.first_name,
                            last_name: nutritionist.last_name,
                            license_id: nutritionist.license_id,
                            schedule_day: tempDay,
                            schedule_time: tempTime,
                            image:
                              "https://nightxperson.pythonanywhere.com/Photos/" + fileName,
                            license_pic: nutritionist.license_pic,
                            user_id: nutritionist.user_id,
                          }).then((res) => {
                            console.log(res);
              
                            const response = AxiosInstance.get(`nutritionist`);
              
                            AxiosInstance.get(`nutritionist/`).then((res) => {
                              const newNutritionist = res.data.find(
                                (user) => user.user_id === loggedInUser.user_id
                              );
                              setnNutritionist(newNutritionist);
                              console.log(newNutritionist);
                              const tempSchedule = [];
                              for (let i = 0; i < newNutritionist.schedule_day.length; i++) {
                                const timeRange = newNutritionist.schedule_time[i];
                                const [startTime, endTime] = timeRange.split("-");
              
                                const temp = {
                                  day: newNutritionist.schedule_day[i],
                                  start_time: dayjs("2024-08-17" + " " + startTime),
                                  end_time: dayjs("2024-08-10" + " " + endTime),
                                };
              
                                tempSchedule.push(temp);
                              }
              
                              console.log(tempSchedule);
                              // console.log(tempSchedule);
                              // console.log(schedules);
              
                              setSchedules(tempSchedule);
                            });
              
                            try {
                              AxiosInstance.get(`user/`).then((res) => {
                                // {
                                //   res.data.map((item, index) =>
                                //   //  console.log(item.username, item.password)
                                //   );
                                // }
                                //  console.log(res.data);
              
                                const newUser = res.data.find(
                                  (user) => user.user_id === loggedInUser.user_id
                                );
                                console.log(newUser);
                                setLoggedInUser(newUser);
              
                              //   setProfileDiv(
                              //     <>
                              //       <Button
                              //         sx={{
                              //           color: "#539801",
                              //           border: 1,
                              //           fontWeight: "bold",
                              //           "&:hover": {
                              //             backgroundColor: "#539801",
                              //             color: "#ffffff",
                              //             border: 0.5,
                              //             borderColor: "#ffffff",
                              //           },
                              //         }}
                              //         onClick={editProfile}
                              //       >
                              //         EDIT
                              //       </Button>
                              //       <Grid container spacing={2} sx={{ my: 3 }}>
                              //         <Grid xs={6} sx={{ ml: "30%" }}>
                              //           <Typography
                              //             sx={{
                              //               color: "#E66253",
                              //               fontWeight: "bold",
                              //               textAlign: "left",
                              //             }}
                              //           >
                              //             Username
                              //           </Typography>
              
                              //           <Typography
                              //             sx={{ color: "#99756E", textAlign: "left" }}
                              //           >
                              //             {loggedInUser.username}
                              //           </Typography>
                              //         </Grid>
                              //         <Grid xs={6}> </Grid>
                              //       </Grid>
                              //       <Grid container spacing={2} sx={{ my: 3 }}>
                              //         <Grid xs={10} sx={{ ml: "30%" }}>
                              //           <Typography
                              //             sx={{
                              //               color: "#E66253",
                              //               fontWeight: "bold",
                              //               textAlign: "left",
                              //             }}
                              //           >
                              //             Name:{" "}
                              //           </Typography>
              
                              //           <Typography
                              //             sx={{ color: "#99756E", textAlign: "left" }}
                              //           >
                              //             {newUser.first_name} {""}
                              //             {newUser.last_name}
                              //           </Typography>
                              //         </Grid>
                              //         <Grid xs={6}> </Grid>
                              //       </Grid>
                              //       <Grid container spacing={2} sx={{ my: 3 }}>
                              //         <Grid xs={2} sx={{ ml: "30%" }}>
                              //           <Typography
                              //             sx={{
                              //               color: "#E66253",
                              //               fontWeight: "bold",
                              //               textAlign: "left",
                              //             }}
                              //           >
                              //             Passoword:{" "}
                              //           </Typography>
              
                              //           <Typography
                              //             sx={{ color: "#99756E", textAlign: "left" }}
                              //           >
                              //             {newUser.password}
                              //           </Typography>
                              //         </Grid>
                              //         <Grid xs={6}></Grid>
                              //       </Grid>{" "}
                              //       <Grid container spacing={2} sx={{ my: 3 }}>
                              //         <Grid xs={2} sx={{ ml: "30%" }}>
                              //           <Typography
                              //             sx={{
                              //               color: "#E66253",
                              //               fontWeight: "bold",
                              //               textAlign: "left",
                              //             }}
                              //           >
                              //             E-mail:{" "}
                              //           </Typography>
              
                              //           <Typography
                              //             sx={{ color: "#99756E", textAlign: "left" }}
                              //           >
                              //             {loggedInUser.email}
                              //           </Typography>
                              //         </Grid>
                              //         <Grid xs={6}></Grid>
                              //       </Grid>
                              //       <Box sx={{ ml: "21%", mt: "50px" }}>
                              //         <Typography
                              //           sx={{
                              //             color: "#99756E",
                              //             fontWeight: "bold",
                              //             fontSize: "25px",
                              //             float: "left",
                              //             ml: 20,
                              //           }}
                              //         >
                              //           Account Removal
                              //         </Typography>
                              //         <br />
                              //         <br />
                              //         <br />
                              //         <Button
                              //           sx={{
                              //             background: "#E66253",
                              //             color: "#ffffff",
                              //             float: "left",
                              //             ml: 20,
                              //             px: 3,
                              //             "&:hover": {
                              //               backgroundColor: "#ffffff",
                              //               color: "#E66253",
                              //               border: 0.5,
                              //               borderColor: "#E66253",
                              //             },
                              //           }}
                              //         >
                              //           DEACTIVATE ACCOUNT
                              //         </Button>
                              //       </Box>
                              //       <br />
                              //       <br />
                              //       <br />
                              //       <Button
                              //         sx={{
                              //           color: "#B3B3B3",
                              //           border: 1,
                              //           fontWeight: "bold",
                              //           px: 5,
                              //           "&:hover": {
                              //             backgroundColor: "#B3B3B3",
                              //             color: "#ffffff",
                              //             border: 0.5,
                              //             borderColor: "#ffffff",
                              //           },
                              //         }}
                              //       >
                              //         {" "}
                              //         LOG OUT
                              //       </Button>
                              //     </>
                              //   );
                             });
                              setEdit(false);
                            } catch (error) {
                              console.log(error);
                            }
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      });
                    } catch (error) {
                      console.log(error.response);
                    }








                    // navigate("/Profiling", {
                    //   state: { email: data.email, name: data.first_name },
                    // });
      
                    // navigate("/Log-In?success=newPassword");
      
                    AxiosInstance.get(`user/`).then((res) => {
                      // {
                      //   res.data.map((item, index) =>
                      //     console.log(item.username, item.password)
                      //   );
                      // }
                      console.log(res.data);
                      const newUser = res.data.find(
                        (user) => user.user_id === loggedInUser.user_id
                      );
                      setLoggedInUser(newUser);
      
                      // setProfileDiv(
                      //   <>
                      //     <Button
                      //       sx={{
                      //         color: "#539801",
                      //         border: 1,
                      //         fontWeight: "bold",
                      //         "&:hover": {
                      //           backgroundColor: "#539801",
                      //           color: "#ffffff",
                      //           border: 0.5,
                      //           borderColor: "#ffffff",
                      //         },
                      //       }}
                      //       onClick={editProfile}
                      //     >
                      //       EDIT
                      //     </Button>
                      //     <Grid container spacing={2} sx={{ my: 3 }}>
                      //       <Grid xs={6} sx={{ ml: "30%" }}>
                      //         <Typography
                      //           sx={{
                      //             color: "#E66253",
                      //             fontWeight: "bold",
                      //             textAlign: "left",
                      //           }}
                      //         >
                      //           Username
                      //         </Typography>
      
                      //         <Typography
                      //           sx={{ color: "#99756E", textAlign: "left" }}
                      //         >
                      //           {loggedInUser.username}
                      //         </Typography>
                      //       </Grid>
                      //       <Grid xs={6}> </Grid>
                      //     </Grid>
                      //     <Grid container spacing={2} sx={{ my: 3 }}>
                      //       <Grid xs={10} sx={{ ml: "30%" }}>
                      //         <Typography
                      //           sx={{
                      //             color: "#E66253",
                      //             fontWeight: "bold",
                      //             textAlign: "left",
                      //           }}
                      //         >
                      //           Name:{" "}
                      //         </Typography>
      
                      //         <Typography
                      //           sx={{ color: "#99756E", textAlign: "left" }}
                      //         >
                      //           {newUser.first_name} {""}
                      //           {newUser.last_name}
                      //         </Typography>
                      //       </Grid>
                      //       <Grid xs={6}> </Grid>
                      //     </Grid>
                      //     <Grid container spacing={2} sx={{ my: 3 }}>
                      //       <Grid xs={2} sx={{ ml: "30%" }}>
                      //         <Typography
                      //           sx={{
                      //             color: "#E66253",
                      //             fontWeight: "bold",
                      //             textAlign: "left",
                      //           }}
                      //         >
                      //           Passoword:{" "}
                      //         </Typography>
      
                      //         <Typography
                      //           sx={{ color: "#99756E", textAlign: "left" }}
                      //         >
                      //           {newUser.password}
                      //         </Typography>
                      //       </Grid>
                      //       <Grid xs={6}></Grid>
                      //     </Grid>{" "}
                      //     <Grid container spacing={2} sx={{ my: 3 }}>
                      //       <Grid xs={2} sx={{ ml: "30%" }}>
                      //         <Typography
                      //           sx={{
                      //             color: "#E66253",
                      //             fontWeight: "bold",
                      //             textAlign: "left",
                      //           }}
                      //         >
                      //           E-mail:{" "}
                      //         </Typography>
      
                      //         <Typography
                      //           sx={{ color: "#99756E", textAlign: "left" }}
                      //         >
                      //           {loggedInUser.email}
                      //         </Typography>
                      //       </Grid>
                      //       <Grid xs={6}></Grid>
                      //     </Grid>
                      //     <Box sx={{ ml: "21%", mt: "50px" }}>
                      //       <Typography
                      //         sx={{
                      //           color: "#99756E",
                      //           fontWeight: "bold",
                      //           fontSize: "25px",
                      //           float: "left",
                      //           ml: 20,
                      //         }}
                      //       >
                      //         Account Removal
                      //       </Typography>
                      //       <br />
                      //       <br />
                      //       <br />
                      //       <Button
                      //         sx={{
                      //           background: "#E66253",
                      //           color: "#ffffff",
                      //           float: "left",
                      //           ml: 20,
                      //           px: 3,
                      //           "&:hover": {
                      //             backgroundColor: "#ffffff",
                      //             color: "#E66253",
                      //             border: 0.5,
                      //             borderColor: "#E66253",
                      //           },
                      //         }}
                      //       >
                      //         DEACTIVATE ACCOUNT
                      //       </Button>
                      //     </Box>
                      //     <br />
                      //     <br />
                      //     <br />
                      //     <Button
                      //       sx={{
                      //         color: "#B3B3B3",
                      //         border: 1,
                      //         fontWeight: "bold",
                      //         px: 5,
                      //         "&:hover": {
                      //           backgroundColor: "#B3B3B3",
                      //           color: "#ffffff",
                      //           border: 0.5,
                      //           borderColor: "#ffffff",
                      //         },
                      //       }}
                      //     >
                      //       {" "}
                      //       LOG OUT
                      //     </Button>
                      //   </>
                      // );
                      setEdit(false)
                    });
                  });
                } catch (error) {
                  console.log(error.response);
                }
              })
            }

            catch (error) {
              console.log(error)
            }
              }
            });
          }
        });
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }
    }

    

  

    // try {
    //   AxiosInstance.put(`user/`, {
    //     user_id: loggedInUser.user_id,
    //     username: data.username,
    //     password: data.password,
    //     first_name: data.firstname,
    //     last_name: data.lastname,
    //     privilege: "User",
    //     email: loggedInUser.email,
    //   }).then((res) => {
    //     console.log(res, res.data);
    //     // navigate("/Profiling", {
    //     //   state: { email: data.email, name: data.first_name },
    //     // });

    //     // navigate("/Log-In?success=newPassword");

    //     AxiosInstance.get(`user/`).then((res) => {
    //       {
    //         res.data.map((item, index) =>
    //           console.log(item.username, item.password)
    //         );
    //       }
    //       console.log(res.data);
    //       const newUser = res.data.find(
    //         (user) => user.user_id === loggedInUser.user_id
    //       );
    //       setLoggedInUser(newUser);

    //       setProfileDiv(
    //         <>
    //           <Button
    //             sx={{
    //               color: "#539801",
    //               border: 1,
    //               fontWeight: "bold",
    //               "&:hover": {
    //                 backgroundColor: "#539801",
    //                 color: "#ffffff",
    //                 border: 0.5,
    //                 borderColor: "#ffffff",
    //               },
    //             }}
    //             onClick={editProfile}
    //           >
    //             EDIT
    //           </Button>
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={10} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 Name:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {newUser.first_name} {""}
    //                 {newUser.last_name}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}> </Grid>
    //           </Grid>
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={2} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 Passoword:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {newUser.password}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}></Grid>
    //           </Grid>{" "}
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={2} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 E-mail:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {loggedInUser.email}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}></Grid>
    //           </Grid>
    //           <Box sx={{ ml: "21%", mt: "50px" }}>
    //             <Typography
    //               sx={{
    //                 color: "#99756E",
    //                 fontWeight: "bold",
    //                 fontSize: "25px",
    //                 float: "left",
    //                 ml: 20,
    //               }}
    //             >
    //               Account Removal
    //             </Typography>
    //             <br />
    //             <br />
    //             <br />
    //             <Button
    //               sx={{
    //                 background: "#E66253",
    //                 color: "#ffffff",
    //                 float: "left",
    //                 ml: 20,
    //                 px: 3,
    //                 "&:hover": {
    //                   backgroundColor: "#ffffff",
    //                   color: "#E66253",
    //                   border: 0.5,
    //                   borderColor: "#E66253",
    //                 },
    //               }}
    //             >
    //               DEACTIVATE ACCOUNT
    //             </Button>
    //           </Box>
    //           <br />
    //           <br />
    //           <br />
    //           <Button
    //             sx={{
    //               color: "#B3B3B3",
    //               border: 1,
    //               fontWeight: "bold",
    //               px: 5,
    //               "&:hover": {
    //                 backgroundColor: "#B3B3B3",
    //                 color: "#ffffff",
    //                 border: 0.5,
    //                 borderColor: "#ffffff",
    //               },
    //             }}
    //           >
    //             {" "}
    //             LOG OUT
    //           </Button>
    //         </>
    //       );
    //     });
    //   });
    // } catch (error) {
    //   console.log(error.response);
    // }
  };

  //!

  //?

  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [day, setDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleChange = (event, index) => {
    console.log(event, index, schedules);
    // const { name, value } = event.target;
    // setSchedules((prevSchedules) =>
    //   prevSchedules.map((schedule, i) =>
    //     i === index ? { ...schedule, [name]: value } : schedule
    //   )
    // );

    const updatedData = [...schedules]; // Create a copy of the data array
    const updatedDay = { ...updatedData[index] }; // Create a copy of the object
    updatedDay.end_time = event; // Update the start_time property
    updatedData[index] = updatedDay; // Replace the original object with the updated one
    setSchedules(updatedData); // Update the state
  };

  const handleChangeEnd = (event, index) => {
    console.log(event, index, schedules);
    // const { name, value } = event.target;
    // setSchedules((prevSchedules) =>
    //   prevSchedules.map((schedule, i) =>
    //     i === index ? { ...schedule, [name]: value } : schedule
    //   )
    // );

    const updatedData = [...schedules]; // Create a copy of the data array
    const updatedDay = { ...updatedData[index] }; // Create a copy of the object
    updatedDay.start_time = event; // Update the start_time property
    updatedData[index] = updatedDay; // Replace the original object with the updated one
    setSchedules(updatedData); // Update the state
  };

  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      { day: day, start_time: startTime, end_time: endTime },
    ]);

    console.log(startTime, endTime);
    setNewTitle(""); // Clear new schedule input fields
    setNewDetails("");
    setDay(null);
    setStartTime(null);
    setEndTime(null);
  };

  const removeSchedule = (index) => {
    if (schedules.length > 1) {
      setSchedules((prevSchedules) => [
        ...prevSchedules.filter((_, i) => i !== index),
      ]);
    } else {
      alert("Cannot remove the last schedule.");
    }
  };

  const renderSchedules = () => {
    return schedules.map((schedule, index) => (
      <div key={index} className="schedule-item">
        <Grid container spacing={2}>
          <Grid xs={8}> Day:</Grid>
          <Grid xs={0}>
            {" "}
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={schedule.day}
              // onChange={onChange}
              // error={!!error}
              onChange={(event) => setDay(event.target.value)}
            >
              {dayChoices.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={2}>Start Time:</Grid>
          <Grid xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {console.log(schedules)}

              {console.log(schedule.start_time)}
              <DemoContainer components={["TimePicker"]} name="selectedDate">
                <TimePicker
                  label="With Time Clock"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  //    value={schedule?.start_time}
                  // value={dayjs("2024-08-10" + "10:00:00").format("h:mm A")}
                  defaultValue={schedule.start_time}
                  // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}

                  onChange={(event) => handleChangeEnd(event, index)}
                  // onChange={(e) => handleTimeChange(e)}
                  sx={{ background: "#ffffff" }}
                  name="selectedTime"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid xs={2}>End Time:</Grid>
          <Grid xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]} name="selectedDate">
                <TimePicker
                  label="With Time Clock"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  //  value={schedule?.end_time}
                  // defaultValue={time}
                  // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
                  defaultValue={schedule.end_time}
                  // onChange={(event) =>
                  //   setEndTime(dayjs(event["$d"]).format("HH:mm:ss"))
                  // }

                  onChange={(event) => handleChange(event, index)}
                  // onChange={(e) => handleTimeChange(e)}
                  sx={{ background: "#ffffff" }}
                  name="selectedTime"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid>
            {" "}
            <button
              className="delete-button"
              onClick={() => removeSchedule(index)}
            >
              <i className="fas fa-minus"></i> Delete
            </button>
          </Grid>
        </Grid>

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]} name="selectedDate">
            <TimePicker
              label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              // defaultValue={time}
              // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
              onChange={(event) =>
                setNewTitle(dayjs(event["$d"]).format("HH:mm:ss"))
              }
              // onChange={(e) => handleTimeChange(e)}
              sx={{ background: "#ffffff" }}
              name="selectedTime"
            />
          </DemoContainer>
        </LocalizationProvider> */}
        {/* <label htmlFor={`title-${index}`}>Title:</label>
        <input
          type="text"
          id={`title-${index}`}
          name="title"
          value={schedule.title} // Access value from state
          onChange={(event) => handleChange(event, index)}
        />
        <label htmlFor={`details-${index}`}>Details:</label>
        <textarea
          id={`details-${index}`}
          name="details"
          value={schedule.details} // Access value from state
          onChange={(event) => handleChange(event, index)}
        /> */}
      </div>
    ));
  };
  //?

  const logout = () => {
    
    setLoggedInUser(null);
    setNutritionists(null)
    navigate("/");
  }
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000"
      }}
    >
      {/* <div className="schedule-manager">
        <h2>Edit Schedule</h2>

        <div className="schedule-list">
          {renderSchedules()}

          <button
            onClick={() => console.log("Schedules submitted:", schedules)}
          >
            Submit (for demo purposes)
          </button>
        </div>
      </div> */}

      <center>
        {/* <img src="/images/profile pic.png" height="190" /> */}

        {/* <button onClick={console.log(file)}>click</button> */}
        <img src={loggedInUser.image} height="190" />

        <br />
        <br />
      </center>
      {/* {profileDiv} */}

      {edit ? (
        <>
          {/* <button onClick={click}>click</button> */}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid xs={10} sx={{ mx: "30%" }}>
                Profile Picture: Upload Image:
                {/* // * upload image */}
                <input
                  type="file"
                  {...register("file")}
                  // onChange={(evt) => setFile(evt.target.files[0])}
                  onChange={handleFileUpload}
                />
                <Typography
                  sx={{
                    color: "#E66253",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Username:{" "}
                </Typography>
                <TextField
                  id="username"
                  name="username"
                  label="Usernam,e"
                  defaultValue={loggedInUser.username}
                  fullWidth
                  margin="dense"
                  {...register("username")}
                  error={errors.username ? true : false}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  id="error-message"
                >
                  {errors.username?.message}
                </Typography>
                <Typography
                  sx={{
                    color: "#E66253",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Name:{" "}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid xs={6}>
                    {" "}
                    <TextField
                      id="firstname"
                      name="firstname"
                      label="First Name"
                      defaultValue={loggedInUser.first_name}
                      fullWidth
                      margin="dense"
                      {...register("firstname")}
                      // error={errors.username ? true : false}
                    />
                  </Grid>{" "}
                  <Grid xs={6}>
                    {" "}
                    <TextField
                      id="lastname"
                      name="lastname"
                      label="Last Name"
                      defaultValue={loggedInUser.last_name}
                      fullWidth
                      margin="dense"
                      sx={{ width: "100%" }}
                      {...register("lastname")}
                      // error={errors.username ? true : false}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={6}> </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid xs={2} sx={{ ml: "30%" }}>
                <Typography
                  sx={{
                    color: "#E66253",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Password:{" "}
                </Typography>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="text"
                  defaultValue={loggedInUser.password}
                  fullWidth
                  margin="dense"
                  sx={{ width: "100%" }}
                  {...register("password")}
                  // error={errors.username ? true : false}
                />
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>{" "}
            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid xs={2} sx={{ ml: "30%" }}>
                <Typography
                  sx={{
                    color: "#E66253",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  E-mail:{" "}
                </Typography>

                <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                  {loggedInUser.email}
                </Typography>
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>
            <Box sx={{ ml: "21%", mt: "50px" }}>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  float: "left",
                  ml: 20,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
                type="submit"
              >
                SAVE
              </Button>
            </Box>
            <br />
            <br />
            <br />
          </form>

          <div className="schedule-manager">
            Add New Schedule
            <div className="schedule-form">
              {/* <Grid container spacing={2}>
                <Grid xs={8}> Day:</Grid>
                <Grid xs={0}>
                  {" "}
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={day}
                    // onChange={onChange}
                    // error={!!error}
                    onChange={(event) => setDay(event.target.value)}
                  >
                    {dayChoices.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid> */}

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* <Grid xs={2}>Start Time:</Grid> */}
                <Grid xs = {3}>Day: <br/>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={day}
                    // onChange={onChange}
                    // error={!!error}
                    onChange={(event) => setDay(event.target.value)}
                  >
                    {dayChoices.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid xs={3}>
                Start Time:
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["TimePicker"]}
                      name="selectedDate"
                    >
                      <TimePicker
                        label="With Time Clock"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        value={startTime}
                        // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
                        // onChange={(event) =>
                        //   setStartTime(dayjs(event["$d"]).format("HH:mm:ss"))
                        // }

                        onChange={(newValue) => setStartTime(newValue)}
                        // onChange={(e) => handleTimeChange(e)}
                        sx={{ background: "#ffffff" }}
                        name="selectedTime"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                {/* <Grid xs={2}>End Time:</Grid> */}
                <Grid xs={3}>
                End Time:
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["TimePicker"]}
                      name="selectedDate"
                    >
                      <TimePicker
                        label="With Time Clock"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        // defaultValue={time}
                        // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
                        // onChange={(event) =>
                        //   setEndTime(dayjs(event["$d"]).format("HH:mm:ss"))
                        // }
                        value={endTime}
                        onChange={(newValue) => setEndTime(newValue)}
                        // onChange={(e) => handleTimeChange(e)}
                        sx={{ background: "#ffffff" }}
                        name="selectedTime"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid xs = {2}>
                <Button onClick={handleAddSchedule}   
              sx={{
                background: "#E66253",
                color: "#ffffff",
                float: "center",
                mt: 5,
                ml: 0,
                px: 3,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}>
                 Add Schedule
              </Button>
                </Grid>
              </Grid>
              {/* <input
            type="text"
            id="new-title"
            value={newTitle}
            //    onChange={(event) => setNewTitle(event.target.value)}
          />
          <label htmlFor="new-details">New Details:</label>
          <textarea
            id="new-details"
            value={newDetails}
            onChange={(event) => setNewDetails(event.target.value)}
          /> */}
          <br/>
             
            </div>
            <br/>
            {renderSchedules}
            Schedule
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-item">
                {/* <Grid container spacing={2} sx={{ mt: 2 }}>
                  <br/>
                  <Grid xs={2}> Day:</Grid>
                  <Grid xs={5}>
                    {" "}
                    Day:
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={schedule.day}
                      // onChange={onChange}
                      // error={!!error}
                      onChange={(event) => setDay(event.target.value)}
                    >
                      {dayChoices.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid> */}

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid xs = {3}>
                Day: <br/>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={schedule.day}
                      // onChange={onChange}
                      // error={!!error}
                      onChange={(event) => setDay(event.target.value)}
                    >
                      {dayChoices.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                    </Grid>
                  {/* <Grid xs={1}>Start Time:</Grid> */}
                  <Grid xs={3}>
                  Start Time:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <br/>
                      {/* {console.log(schedules)}

                      {console.log(schedule.start_time)} */}
                      <DemoContainer
                        components={["TimePicker"]}
                        name="selectedDate"
                      >
                        <TimePicker
                          label="With Time Clock"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          //    value={schedule?.start_time}
                          // value={dayjs("2024-08-10" + "10:00:00").format("h:mm A")}
                          defaultValue={schedule.start_time}
                          // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}

                          onChange={(event) => handleChangeEnd(event, index)}
                          // onChange={(e) => handleTimeChange(e)}
                          sx={{ background: "#ffffff" }}
                          name="selectedTime"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  {/* <Grid xs={1}>End Time:</Grid> */}
                  <Grid xs={3}>
                  End Time:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["TimePicker"]}
                        name="selectedDate"
                      >
                        <TimePicker
                          label="With Time Clock"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          //  value={schedule?.end_time}
                          // defaultValue={time}
                          // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
                          defaultValue={schedule.end_time}
                          // onChange={(event) =>
                          //   setEndTime(dayjs(event["$d"]).format("HH:mm:ss"))
                          // }

                          onChange={(event) => handleChange(event, index)}
                          // onChange={(e) => handleTimeChange(e)}
                          sx={{ background: "#ffffff" }}
                          name="selectedTime"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid xs = {2}>
                    {" "}
                    <Button
                      sx={{
                        background: "#E66253",
                        color: "#ffffff",
                        float: "center",
                        ml: 0,
                        mt: 5,
                        px: 3,
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: "#E66253",
                          border: 0.5,
                          borderColor: "#E66253",
                        },
                      }}
                      onClick={() => removeSchedule(index)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]} name="selectedDate">
            <TimePicker
              label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              // defaultValue={time}
              // onChange={(e) => setTime(dayjs(e["$d"]).format("HH:mm:ss"))}
              onChange={(event) =>
                setNewTitle(dayjs(event["$d"]).format("HH:mm:ss"))
              }
              // onChange={(e) => handleTimeChange(e)}
              sx={{ background: "#ffffff" }}
              name="selectedTime"
            />
          </DemoContainer>
        </LocalizationProvider> */}
                {/* <label htmlFor={`title-${index}`}>Title:</label>
        <input
          type="text"
          id={`title-${index}`}
          name="title"
          value={schedule.title} // Access value from state
          onChange={(event) => handleChange(event, index)}
        />
        <label htmlFor={`details-${index}`}>Details:</label>
        <textarea
          id={`details-${index}`}
          name="details"
          value={schedule.details} // Access value from state
          onChange={(event) => handleChange(event, index)}
        /> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
        {/* {profileDiv} */}
        <Button
        sx={{
          color: "#539801",
          border: 1,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#539801",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
        onClick={editProfile}
      >
        EDIT
      </Button>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Username
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.username}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Name:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.first_name} {"  "}
            {loggedInUser.last_name}
            {/* <Grid container spacing={2}>
              <Grid xs={6}>{loggedInUser.first_name} </Grid>
              <Grid xs={2}>{loggedInUser.last_name}</Grid>
            </Grid> */}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Password:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.password}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            E-mail:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.email}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
      <Typography   sx={{ color: "#E66253", fontWeight: "bold" }}
         >Schedule:</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={6}>
        <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "right", mr: 2 }}
          >
           Day:{" "}
          </Typography>

     
          {nutritionist?.schedule_day.map((item, index) => (
                
                  <Typography key={index}
            sx={{ color: "#99756E", fontWeight: "bold", textAlign: "right" }}
          >
                  {item}
                </Typography>
              ))} 

          {/* {nutritionist.schedule_day  ((item) => (
            <Typography>item</Typography>
          ))} */}

          {/* <Typography>{nutritionist?.schedule_day}</Typography>
          {nutritionist?.schedule_day.map((item) => (
            <Typography sx={{ color: "#000000" }}>{item}</Typography>
          ))} */}

          {/* {nutritionist ? (
            //nutritionist?.schedule_day((item) => <Typography >item</Typography>)
            <>weh</>
          ) : (
            // nutritionist?.schedule_day.map((item) => (
            //   <Typography>{item}</Typography>
            // ))
            <>really ba</>
          )}
          {console.log(nutritionist?.username)} */}
        </Grid>
        <Grid xs={4} sx = {{ml: 5}}>
         
        
          <Typography sx={{ color: "#000000" }}>
            {/* {nutritionist?.username}{" "} */}
          </Typography>
          {nutritionist !== null ? (
            <>
                <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left", ml: 5 }}
          >Time </Typography>
              {nutritionist?.schedule_time.map((item, index) => (
                <Typography key={index}  sx={{ color: "#99756E", fontWeight: "bold", textAlign: "left" }}>
                 
                  {item}
                </Typography>
              ))} 
              {/* {nutritionist}
              {nutritionist?.schedule_time.map((item, index) => (
                <Typography key={index}>
                  {nutritionist?.schedule_day[index] === item
                    ? item
                    : `${item} (updated)`}
                  {item}
                </Typography>
              ))} */}
             
              {/* ... Time rendering logic ... */}
            </>
          ) : (
            <Typography>No schedule information available.</Typography>
          )}
        </Grid>
      </Grid>
      {/* <Box sx={{ ml: "21%", mt: "50px" }}>
         <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            fontSize: "25px",
            float: "left",
            ml: 20,
          }}
        >
          Account Removal
        </Typography>
        <br />
        <br />
        <br />
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            float: "left",
            ml: 20,
            px: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          DEACTIVATE ACCOUNT
        </Button>
      </Box> */}
      <br />
      <br />
      <br />
      <Button
      onClick={logout}
        sx={{
          color: "#B3B3B3",
          border: 1,
          fontWeight: "bold",
          px: 5,
          "&:hover": {
            backgroundColor: "#B3B3B3",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
      >
        {" "}
        LOG OUT
      </Button>
        </>
      )}

      {/* {" "}
      <center>
        <img src="/images/profile pic.png" height="190" />
        <br />
        <br />

        <Button
          sx={{
            color: "#539801",
            border: 1,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#539801",
              color: "#ffffff",
              border: 0.5,
              borderColor: "#ffffff",
            },
          }}
        >
          EDIT
        </Button>
      </center>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Name:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            Mary See
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button
            sx={{
              color: "#539801",
              border: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#539801",
                color: "#ffffff",
                border: 0.5,
                borderColor: "#ffffff",
              },
            }}
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Address:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            145 Espana St., Manila, Philippines
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button
            sx={{
              color: "#539801",
              border: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#539801",
                color: "#ffffff",
                border: 0.5,
                borderColor: "#ffffff",
              },
            }}
          >
            EDIT
          </Button>
        </Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Password:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            ******
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button
            sx={{
              color: "#539801",
              border: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#539801",
                color: "#ffffff",
                border: 0.5,
                borderColor: "#ffffff",
              },
            }}
          >
            EDIT
          </Button>
        </Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            E-mail:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            ********@gmail.com
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button
            sx={{
              color: "#539801",
              border: 1,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#539801",
                color: "#ffffff",
                border: 0.5,
                borderColor: "#ffffff",
              },
            }}
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            License Number
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            *********
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Box sx={{ ml: "21%", mt: "50px" }}>
        <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            fontSize: "25px",
            float: "left",
            ml: 20,
          }}
        >
          Account Removal
        </Typography>
        <br />
        <br />
        <br />
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            float: "left",
            ml: 20,
            px: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          DEACTIVATE ACCOUNT
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <Button
        sx={{
          color: "#B3B3B3",
          border: 1,
          fontWeight: "bold",
          px: 5,
          "&:hover": {
            backgroundColor: "#B3B3B3",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
      >
        {" "}
        LOG OUT
      </Button> */}
    </div>
  );
}

export default NutritionistProfile;
