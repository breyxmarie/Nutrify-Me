import { useState, useEffect } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Calendar from "react-calendar";
import Grid from "@mui/material/Grid";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import moment from "moment";

function NutritionistHome() {
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  const [date, setDate] = useState();
  const [appointData, setAppointdata] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [appToday, setAppToday] = useState(0);
  //! retrieving data.

  const onChange = async (newDate) => {
    setIsLoading(true);
    // Fetch or update dates based on newDate
    // ...

    // Simulate loading delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

    setIsLoading(false);
    setDate(newDate);
    handleOpenDay();
    setIsPopupVisible(true);
    console.log(appointData);
    const temp = appointData.find(
      (data) => data.date === dayjs(newDate).format("YYYY-MM-DD")
    );
    console.log(temp);
    if (temp) {
      console.log(nutritionist);
      // const nutrition = nutritionist.find(
      //   (data) => data.nutritionist_id === temp.nutritionist_id
      // );

      const user = userData.find((data) => data.user_id === temp.user_id);

      setModalDayContent(
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <center>
                <br />
                <br />

                <Typography>
                  Date: {dayjs(newDate).format("MMMM DD YYYY")}
                </Typography>
                <Typography>Time: {temp.time}</Typography>
              </center>
            </Grid>
            <Grid xs={6}>
              {" "}
              <center>
                <img src={user.image} width="100" />

                <br />
                <Typography>
                  <b>User:</b> {user.first_name} {user.last_name}
                </Typography>
              </center>{" "}
            </Grid>
          </Grid>

          <br />

          <br />
        </Box>
      );
    } else {
      console.log("No Appointment");
      setModalDayContent(
        <Box sx={{ m: 4 }}>
          <center>
            {dayjs(newDate).format("MMMM DD YYYY")} <br />
            <b>No Appointment</b>
          </center>
        </Box>
      );
    }
  };

  const [openDay, setOpenDay] = useState(false);

  const handleOpenDay = (selectedDate) => {
    // Optional: Do something with the selected date before opening the modal
    setOpenDay(true);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };
  const [modalDayContent, setModalDayContent] = useState(<div>try</div>);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };

  const [appointmentData, setAppointmentData] = useState([
    {
      appointment_id: 1,
      date: "2024-05-25",
      time: "19:30:10",
      user_id: 4,
      nutritionist_id: 1,
    },
  ]);

  const [users, setUsers] = useState([
    {
      user_id: 4,
      username: "user3",
      password: "123",
      first_name: "random",
      last_name: "randoms",
      privilege: "User",
    },
    {
      user_id: 4,
      username: "user3",
      password: "123",
      first_name: "random",
      last_name: "randoms",
      privilege: "User",
    },
  ]);
  const GetData = () => {
    console.log(nutritionist, loggedInUser);
    AxiosInstance.get(`nutritionist/`)
      .then((res) => {
        setNutritionists(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });

    AxiosInstance.get(`user/`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });

    AxiosInstance.get(`appointment`)
      .then((res) => {
        //  setNutritionist(res.data);

        console.log(
          res.data.filter((data) => data.user_id === loggedInUser.user_id)
        );
        setAppointdata(
          res.data.filter(
            (data) => data.nutritionist_id === nutritionist.nutritionist_id
          )
        );

        console.log(
          res.data.filter(
            (data) =>
              data.nutritionist_id === nutritionist.nutritionist_id &&
              data.date === dayjs().format("YYYY-MM-DD")
          )
        );
        setAppToday(
          res.data.filter(
            (data) =>
              data.nutritionist_id === nutritionist.nutritionist_id &&
              data.date === dayjs().format("YYYY-MM-DD")
          ).length
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });
    // AxiosInstance.get(`appointment`).then((res) => {
    //   {
    //     res.data.map((item, index) =>
    //       console.log(item.username, item.password)
    //     );
    //   }
    //   console.log(res.data);

    //   const condition = (item) => item.id > 1;
    //   const filteredData = res.data.filter(
    //     (item) =>
    //       item.nutritionist_id === loggedInUser.user_id &&
    //       //  moment(item.date).isSameOrAfter(moment(), "day")
    //       moment(item.date).isSame(moment(), "day")

    //     //new Date(item.date) >= new Date()
    //   );

    //   console.log("try try", filteredData, loggedInUser.user_id);
    //   setAppointmentData(filteredData);
    // });

    // AxiosInstance.get(`user`).then((res) => {
    //   setUsers(res.data);
    // });
  };

  const [disusers, setDisusers] = useState();

  function getUserInfo({ id }) {
    const loggedInUser = users.find((user) => user.user_id === id);
    setDisusers(loggedInUser);
  }

  useEffect(() => {
    GetData();
    console.log(nutritionist);
  }, []);
  //!
  const appointments = [
    {
      username: "user",
      type: "New Patient",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
    {
      username: "user",
      type: "New Patient",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
    {
      username: "user",
      type: "Follow Up",
      date: "May 6, 2024",
      time: " 2:00 pm",
      image: "/images/profile pic.png",
    },
  ];

  // * progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  // *

  // * codes for calendar
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  const initialValue = dayjs();

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3].map(() =>
          getRandomNumber(1, daysInMonth)
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🌚" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }
  //*

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
      <Grid container spacing={2} sx={{ mx: 5 }}>
        <Grid
          xs={6}
          sx={{ color: "#99756E", border: 1, borderColor: "#898246" }}
        >
          <Box sx={{ m: 5 }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "30px", float: "left" }}
            >
              Good morning, Nutritionist!
            </Typography>
            <br />
            <br />
            <Typography sx={{ float: "left" }}>
              You have {appToday} appointments for today.
            </Typography>
            <br />
            <br />
            <BorderLinearProgress
              sx={{ barColorPrimary: "red" }}
              variant="determinate"
              value={70}
            />
          </Box>
        </Grid>
        <Grid xs={6}>
          <h2>My Scheduled Appointments</h2>

          {/* //! Calendar */}
          <div className="calendar-app" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="day-labels" style={{ color: "#333" }}>
              {/* Days of the week */}
            </div>
            <Calendar
              onChange={onChange}
              value={date}
              className={isLoading ? "loading" : ""}
              style={{
                border: "1px solid #898246",
                backgroundColor: "#f5f5f5",
              }}
            />
            {/* {isPopupVisible && (
                <div className="popup">
                  <h3>Date: {date.toLocaleDateString()}</h3>
               
                  <button onClick={handlePopupClose}>Close</button>
                </div>
              )} */}
          </div>

          <Modal
            open={openDay}
            onClose={handleCloseDay}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container spacing={2}>
                <Grid xs={2}>
                  {" "}
                  <img
                    src="/images/consultation icon.png"
                    height="25"
                    weight="25"
                  />
                </Grid>
                <Grid xs={8}>Consultation Schedule]</Grid>
                <Grid xs={2}>
                  <Button
                    //key={index}
                    sx={{ float: "right" }}
                    onClick={handleCloseDay}
                  >
                    <img src="/images/close.png" height="10" weight="10" />
                  </Button>
                </Grid>
              </Grid>
              {modalDayContent}
            </Box>
          </Modal>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={initialValue}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
              sx={{
                border: 1,
                borderColor: "#E66253",
                "& .MuiPickersCalendar-week": {
                  backgroundColor: "lightgray",
                }, // Style weeks
                "& .MuiPickersDay-day": { backgroundColor: "#000000" },
              }}
            />
          </LocalizationProvider>{" "} */}
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, mx: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={5} sx={{ mx: 6 }}>
            <Box
              sx={{
                backgroundImage: "url('/images/nutritionist home page.png')",

                width: "100%",
                height: "250px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                px: "0",
                justifyContent: "center",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={6} sx={{ justifyContent: "flex-end", ml: "30px" }}>
                  <Box display="flex" justifyContent="flex-start">
                    <Typography
                      sx={{
                        color: "#898246",
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      READY TO TALK TO YOUR PATIENTS?
                      <br />
                      <Button
                        sx={{
                          background: "#E66253",
                          borderRadius: 3,
                          color: "#ffffff",
                          px: 4,
                        }}
                      >
                        GO TO TELEMEDICINE
                      </Button>
                    </Typography>
                    <br />
                  </Box>
                </Grid>
                <Grid xs={6}></Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                backgroundImage: "url('/images/nutritionist home page 2.png')",
                width: "100%",
                height: "250px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                px: "0",
                justifyContent: "center",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
                mt: 3,
                borderRadius: 5,
                border: 0,
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={6} sx={{ justifyContent: "flex-end", ml: "30px" }}>
                  <Box display="flex" justifyContent="flex-start">
                    <Typography
                      sx={{
                        color: "#898246",
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      {/* RECAP & EDIT YOUR PATIENT’S MEAL PLAN!
                      <br />
                      <Button
                        sx={{
                          background: "#E66253",
                          borderRadius: 3,
                          color: "#ffffff",
                          px: 4,
                        }}
                      >
                        VIEW HISTORY
                      </Button>
                      <br />
                      <Button
                        sx={{
                          background: "#E66253",
                          borderRadius: 3,
                          color: "#ffffff",
                          px: 4,
                        }}
                      >
                        EDIT MEAL PLAN
                      </Button> */}
                    </Typography>
                    <br />
                  </Box>
                </Grid>
                <Grid xs={6}></Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={5} sx={{ mx: 5 }}>
            {" "}
            <Box sx={{ border: 2, borderRadius: 5, borderColor: "#898246" }}>
              <Typography>
                Upcoming Appointments
                <Button sx={{ color: "#B3B3B3", textDecoration: "underline" }}>
                  View More
                </Button>
              </Typography>
              <br />
              {appointmentData.length >= 0 ? (
                appointmentData
                  .slice(1)
                  .map((item, index) => (
                    <Box key={index}>{/* Your box content here */}</Box>
                  ))
              ) : (
                <p>No upcoming appointments.</p>
              )}

              {appointmentData.map((item, index) => (
                <Box
                  sx={{
                    border: 2,
                    ml: 2,
                    mr: 2,
                    my: 1,
                    borderRadius: 5,
                    borderColor: "#898246",
                  }}
                >
                  {/* {getUserInfo(item.user_id)}
                  {console.log(loggedInUser)} */}
                  {console.log(
                    users.find((user) => user.user_id === item.user_id)
                      ?.first_name
                  )}

                  <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid xs={1} sx={{ ml: 3 }}>
                      <img src={item.image} height="80px" />
                    </Grid>
                    <Grid xs={6}>
                      <Typography>
                        {
                          users.find((user) => user.user_id === item.user_id)
                            ?.first_name
                        }
                      </Typography>
                      <Typography
                        sx={{
                          color: "#898246",
                          textDecoration: "underline",
                          mt: "30px",
                        }}
                      >
                        {item.type}
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography>
                        {item.date} <br /> {item.time}
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default NutritionistHome;
