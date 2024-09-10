import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Dayjs from "dayjs";

import moment from "moment";

function NutritionistAppointment() {
  const [todayApp, setTodayApp] = useState();
  //! retrieving data.

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
  //  const te = appointmentData.filter(
  //   (item) => item.date === Dayjs(initialValue).format("YYYY-MM-DD")
  // );

  function formatTime12Hour(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${period}`;
  }
  const [todayAppointment, setTodayAppointment] = useState();
  const GetData = async () => {
    const user = await AxiosInstance.get(`user`);
    AxiosInstance.get(`appointment`).then((res) => {
      {
        res.data.map((item, index) =>
          console.log(item.username, item.password)
        );
      }
      console.log(res.data);

      const tempNutDataApp = res.data.filter(
        (data) => data.nutritionist_id === nutritionist.nutritionist_id
      );
      const condition = (item) => item.id > 1;
      // const filteredData = res.data.filter(
      //   (item) =>
      //     item.nutritionist_id === loggedInUser.user_id &&
      //     moment(item.date).isSameOrAfter(moment(), "day")
      // );

      const filteredData = res.data.filter(
        (data) =>
          data.nutritionist_id === nutritionist.nutritionist_id &&
          moment(data.date).isSameOrAfter(moment(), "day")
      );
      console.log("try try", filteredData);

      setTodayAppointment(
        filteredData.filter(
          (data) => data.date === dayjs().format("YYYY-MM-DD")
        )
      );
      console.log(
        filteredData.find((data) => data.date === dayjs().format("YYYY-MM-DD"))
      );
      setAppointmentData(filteredData);

      const te = filteredData.filter(
        (item) => item.date === Dayjs(initialValue).format("YYYY-MM-DD")
      );

      const formattedTime = filteredData.find(
        (data) => data.date === dayjs().format("YYYY-MM-DD")
      ).time;

      const formattedDay = filteredData.find(
        (data) => data.date === dayjs().format("YYYY-MM-DD")
      ).date;

      if (te) {
        console.log("console console", te);
        setTodayAppointment(
          <Box sx={{ mx: 10 }}>
            {" "}
            <Grid container spacing={2}>
              <Grid xs={4}>
                <img
                  width="100"
                  height="100"
                  src={
                    user.data.find(
                      (user) =>
                        user.user_id ===
                        filteredData.find(
                          (data) => data.date === dayjs().format("YYYY-MM-DD")
                        ).user_id
                    )?.image
                  }
                />
              </Grid>
              <Grid xs={6}>
                {" "}
                <p>
                  User: {console.log(user.data)}
                  {
                    user.data.find(
                      (user) =>
                        user.user_id ===
                        filteredData.find(
                          (data) => data.date === dayjs().format("YYYY-MM-DD")
                        ).user_id
                    )?.first_name
                  }
                </p>
              </Grid>
            </Grid>
            <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
              Date:{"     "}
              {dayjs(
                filteredData.find(
                  (data) => data.date === dayjs().format("YYYY-MM-DD")
                ).date
              ).format("MMMM DD, YYYY")}
            </Typography>
            <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
              Time:
              {console.log(
                // formatTime12Hour(formattedTime),
                formattedTime,
                dayjs(formattedDay + formattedTime).format("h:mm A")
              )}
              {dayjs(formattedDay + formattedTime).format("h:mm A")}
            </Typography>
            <center>
              {/* <Link
                to={{
                  pathname: "/nutritionist-consultation",
                  //  state: { data: myStateData },
                }}
                style={{
                  color: "#ffffff",
                }}
              > */}

              <Button
                sx={{ background: "#E66253", color: "#ffffff" }}
                onClick={() =>
                  navigate("/nutritionist-consultation", {
                    state: {
                      tempN: user.data.find(
                        (user) =>
                          user.user_id ===
                          filteredData.find(
                            (data) => data.date === dayjs().format("YYYY-MM-DD")
                          ).user_id
                      ),
                    },
                  })
                }
              >
                Call
              </Button>
              {/* </Link> */}
            </center>
            {/* <Link
              to="/nutritionist-consultation"
              style={{
                color: "#ffffff",
              }}
            >
              <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                Go to Consultation
              </Button>
            </Link>{" "} */}
          </Box>
        );
      } else {
        setTodayAppointment(<h2>No Scheduled Consultation </h2>);
      }

      setScheduledAppointments(
        <Grid container spacing={2}>
          {filteredData.map((item, index) => (
            <Grid
              item
              xs={3}
              sm={6}
              md={3.5}
              key={index}
              sx={{ border: 1, mx: "10px" }}
            >
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Typography>
                    {
                      users.find((user) => user.user_id === item.user_id)
                        ?.first_name
                    }
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Box
                    sx={{
                      borderRadius: 5,
                      background: "#898246",
                      color: "#ffffff",
                    }}
                  >
                    {/* {item.kind} */}
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid xs={6}>
                  Date <br /> {item.date}
                </Grid>
                <Grid xs={6}>
                  Time <br /> {item.time}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
    });

    AxiosInstance.get(`user`).then((res) => {
      setUsers(res.data);
    });
  };

  const [disusers, setDisusers] = useState();

  function getUserInfo({ id }) {
    const loggedInUser = users.find((user) => user.user_id === id);
    setDisusers(loggedInUser);
  }

  useEffect(() => {
    GetData();
  }, []);
  //!

  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const initialValue = dayjs();
  const [scheduledAppointments, setScheduledAppointments] = useState(
    <Grid container spacing={2}>
      {appointmentData.map((item, index) => (
        <Grid
          item
          xs={3}
          sm={6}
          md={3.5}
          key={index}
          sx={{ border: 1, mx: "10px" }}
        >
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography>
                {
                  users.find((user) => user.user_id === item.user_id)
                    ?.first_name
                }
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Box
                sx={{
                  borderRadius: 5,
                  background: "#898246",
                  color: "#ffffff",
                }}
              ></Box>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid xs={6}>
              Date <br /> {item.date}
            </Grid>
            <Grid xs={6}>
              Time <br /> {item.time}
            </Grid>
          </Grid>
        </Grid>
      ))}{" "}
    </Grid>
  );
  const [dataNeeded, setDataNeeded] = useState([
    {
      appointment_id: 1,
      date: "2024-05-25",
      time: "19:30:10",
      user_id: 4,
      nutritionist_id: 1,
    },
  ]);

  const [filtertext, setFiltertext] = useState("ALL");
  function filterData({ condition }) {
    switch (condition) {
      case "Daily":
        const te = appointmentData.filter(
          (item) => item.date === Dayjs(initialValue).format("YYYY-MM-DD")
        );
        setDataNeeded(te);
        console.log("te", te);
        setFiltertext("DAILY");
        setScheduledAppointments(
          <Grid container spacing={2}>
            {te.map((item, index) => (
              <Grid
                item
                xs={3}
                sm={6}
                md={3.5}
                key={index}
                sx={{ border: 2, mx: "50px", borderRadius: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Typography>
                      {
                        users.find((user) => user.user_id === item.user_id)
                          ?.first_name
                      }
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Box
                      sx={{
                        borderRadius: 5,
                        background: "#898246",
                        color: "#ffffff",
                      }}
                    >
                      {/* {item.kind} */}
                    </Box>
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    Date <br /> {item.date}
                  </Grid>
                  <Grid xs={6}>
                    Time <br /> {item.time}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        );
        break;
      case "Weekly":
        const currentWeekStart = dayjs().startOf("week").format("YYYY-MM-DD");
        const currentWeekEnd = dayjs().endOf("week").format("YYYY-MM-DD");
        const weeklyData = appointmentData.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return (
            appointmentDate.isAfter(currentWeekStart) &&
            appointmentDate.isBefore(currentWeekEnd)
          );
        });
        console.log(weeklyData);
        setFiltertext("WEEKLY");
        setScheduledAppointments(
          <Grid container spacing={2}>
            {weeklyData.map((item, index) => (
              <Grid
                item
                xs={3}
                sm={6}
                md={3.5}
                key={index}
                sx={{ border: 1, mx: "10px" }}
              >
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Typography>
                      {
                        users.find((user) => user.user_id === item.user_id)
                          ?.first_name
                      }
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Box
                      sx={{
                        borderRadius: 5,
                        background: "#898246",
                        color: "#ffffff",
                      }}
                    >
                      {/* {item.kind} */}
                    </Box>
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    Date <br /> {item.date}
                  </Grid>
                  <Grid xs={6}>
                    Time <br /> {item.time}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        );
        break;
      case "Monthly":
        const currentMonthStart = dayjs().startOf("month").format("YYYY-MM-DD");
        const currentMonthEnd = dayjs().endOf("month").format("YYYY-MM-DD");
        const monthlyData = appointmentData.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return (
            appointmentDate.isAfter(currentMonthStart) &&
            appointmentDate.isBefore(currentMonthEnd)
          );
        });
        console.log(monthlyData);
        setFiltertext("MONTHLY");
        setScheduledAppointments(
          <Box>
            <Grid container spacing={2} sx={{ mx: 5 }}>
              {monthlyData.map((item, index) => (
                <Grid
                  item
                  xs={3}
                  sm={6}
                  md={3.5}
                  key={index}
                  sx={{ border: 2, mx: "50px", borderRadius: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <Typography>
                        {
                          users.find((user) => user.user_id === item.user_id)
                            ?.first_name
                        }
                      </Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Box
                        sx={{
                          borderRadius: 5,
                          background: "#898246",
                          color: "#ffffff",
                        }}
                      >
                        {/* {item.kind} */}
                      </Box>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      Date <br /> {item.date}
                    </Grid>
                    <Grid xs={6}>
                      Time <br /> {item.time}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
        break;
      default:
        setFiltertext("ALL");
        setScheduledAppointments(
          <Grid container spacing={2}>
            {appointmentData.map((item, index) => (
              <Grid
                item
                xs={3}
                sm={6}
                md={3.5}
                key={index}
                sx={{ border: 1, mx: "10px" }}
              >
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Typography>
                      {
                        users.find((user) => user.user_id === item.user_id)
                          ?.first_name
                      }
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Box
                      sx={{
                        borderRadius: 5,
                        background: "#898246",
                        color: "#ffffff",
                      }}
                    >
                      {/* {item.kind} */}
                    </Box>
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    Date <br /> {item.date}
                  </Grid>
                  <Grid xs={6}>
                    Time <br /> {item.time}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        );
        break;
    }
  }

  const settings = ["All", "Daily", "Weekly", "Monthly"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    console.log(setting);
    switch (setting) {
      case "Daily":
        filterData({ condition: "Daily" });
        break;
      case "Weekly":
        filterData({ condition: "Weekly" });
        break;
      case "Monthly":
        filterData({ condition: "Monthly" });
        break;
      default:
        filterData({ condition: "All" });
        break;
    }
    setAnchorElUser(null);
  };

  const [joined, setJoined] = useState(false);
  const appointments = [
    {
      name: "Aubrey",
      kind: "New Patient",
      Date: "May 2, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "May 3, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "May 4, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "May, 2024",
      Time: "2:00 PM",
    },
  ];
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
        marginLeft: "60px",
        marginRight: "160px",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Box sx={{ border: 1 }}>
            <br />
            <br />

            {/* <Grid container spacing={2}>
              <Grid xs={4}>
                <img src="/images/profile.png" />
              </Grid>
              <Grid xs={4}>[breyxmarie] </Grid>
            </Grid>


            <Typography>Date of Appointment</Typography>
            <Typography>May 1, 2024</Typography>

         

      

            {!joined && (
              <Link
                to="/nutritionist-consultation"
                style={{
                  color: "#ffffff",
                }}
              >
                <button onClick={() => setJoined(true)}>Call</button>{" "}
              </Link>
            )}*/}

            {/* <h2>No Scheduled Consultation </h2> */}
            {todayAppointment}
            {joined && <VideoRoom />}
          </Box>
        </Grid>
        <Grid xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Box sx={{ border: 1 }}>
        <br />
        <br />
        {appointmentData.map(
          (item, index) => (console.log("hi"), console.log(item))
        )}
        <Grid container spacing={2} sx={{ mx: "10px" }}>
          <Grid xs={7} sx={{ textAlign: "left" }}>
            Schedule of Appointments Log
          </Grid>
          <Grid xs={2}>
            <Button
              sx={{
                background: "#E66253",
                borderRadius: 5,
                color: "#ffffff",
                px: 5,
              }}
            >
              EDIT
            </Button>
          </Grid>
          <Grid xs={2}>
            <Button
              sx={{
                background: "#E66253",
                borderRadius: 5,
                color: "#ffffff",
                px: 5,
              }}
            >
              FILTER BY
            </Button>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button
                  variant="contained"
                  className="userButton"
                  onMouseOver={(e) => (e.target.style.background = "#E66253")}
                  onMouseOut={(e) => (e.target.style.background = "#E66253")}
                  sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
                >
                  FILTER: {filtertext}
                </Button>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <Link to={navigate}></Link>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>

        <br />
        <br />
        {/* <Grid container spacing={2}> */}
        {scheduledAppointments}

        {/* {appointmentData.map((item, index) => (
            <Grid
              item
              xs={3}
              sm={6}
              md={3.5}
              key={index}
              sx={{ border: 1, mx: "10px" }}
            >
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Typography>
                    {
                      users.find((user) => user.user_id === item.user_id)
                        ?.first_name
                    }
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Box
                    sx={{
                      borderRadius: 5,
                      background: "#898246",
                      color: "#ffffff",
                    }}
                  >
                
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid xs={6}>
                  Date <br /> {item.date}
                </Grid>
                <Grid xs={6}>
                  Time <br /> {item.time}
                </Grid>
              </Grid>
            </Grid>
          ))} */}
        {/* </Grid> */}
      </Box>
    </div>
  );
}

export default NutritionistAppointment;
