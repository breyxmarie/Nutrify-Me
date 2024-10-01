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
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Dayjs from "dayjs";
import { Tab, Tabs } from "@mui/material";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

function NutritionistAppointment() {
  const [todayApp, setTodayApp] = useState();

  //! tabs
  const [appointmentList, setAppointmentList] = useState([]);
  const [pendingAppointmentList, setPendingAppointmentList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newActiveTab) => {
    console.log(newActiveTab);
    setActiveTab(newActiveTab);
  };

  const tabContent = [
    {
      title: "Approved",
      content: <Box></Box>,
    },
    {
      title: "Pending",
      content: <Box></Box>,
    },
    {
      title: "Declined",
      content: <Box></Box>,
    },
  ];

  //!

  //! approve and declien appointment
  const approveAppointment = (data) => {
    console.log(data);
    try {
      AxiosInstance.put(`pendingappointment/`, {
        pending_id: data.pending_id,
        date: data.date,
        status: "Approved",
        kind: data.kind,
        nutritionist_id: data.nutritionist_id,
        user_id: data.user_id,
        time: data.time,
      }).then((res) => {
        console.log(res.data);
        toast.success("Appointment Approved");
        GetData();
      });
    } catch (error) {
      console.log(error);
    }

    try {
      AxiosInstance.post(`appointment/`, {
        date: data.date,
        time: data.time,
        user_id: data.user_id,
        nutritionist_id: data.nutritionist_id,
        kind: "Follow-Up"
      }).then((res) => {
        console.log(res);
        // navigate(`/`);
        //  handleClose();
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const declineAppointment = (data) => {
    try {
      AxiosInstance.put(`pendingappointment/`, {
        pending_id: data.pending_id,
        date: data.date,
        status: "Declined",
        kind: data.kind,
        nutritionist_id: data.nutritionist_id,
        user_id: data.user_id,
        time: data.time,
      }).then((res) => {
        console.log(res.data);
        toast.success("Appointment Declined");
        GetData();
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //!
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
  dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

  function formatTime12Hour(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${period}`;
  }
  const [todayAppointment, setTodayAppointment] = useState();
  const [user, setUser] = useState();
  const GetData = async () => {
    const user = await AxiosInstance.get(`user`);

    AxiosInstance.get(`user`).then((res) => {
      setUser(res.data);
    });

    AxiosInstance.get(`pendingappointment`).then((res) => {
      setPendingAppointmentList(
        res.data.filter(
          (data) => data.nutritionist_id === nutritionist.nutritionist_id
        )
      );
    });

    AxiosInstance.get(`appointment`).then((res) => {
      setAppointmentList(
        res.data.filter(
          (data) => data.nutritionist_id === nutritionist.nutritionist_id
        )
      );
      console.log(
        res.data,
        nutritionist,
        res.data.filter(
          (data) => data.nutritionist_id === nutritionist.nutritionist_id
        )
      );
    });

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

      dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
      setTodayAppointment(
        filteredData.filter(
          (data) => data.date === dayjs().format("YYYY-MM-DD")
        )
      );


  //     const appointmentStart = dayjs(`${data.date} ${data.time}`, "YYYY-MM-DD HH:mm:ss"); // Appointment start time
  // const appointmentEnd = appointmentStart.add(30, 'minute'); // Appointment lasts for 30 minutes
  // const currentTime = dayjs(); // Current time


      console.log(filteredData, dayjs().format("hh:mm:ss"))
      console.log(filteredData.map((item) => (
        console.log(item.time, dayjs(item.date + "" + item.time).format("hh:mm A"))
      )))
  //     console.log( filteredData?.find((data) => 
  //      // data.date === dayjs().format("YYYY-MM-DD") && 
  //     dayjs().format("hh:mm A") <= dayjs(data.date + "" + data.time).format("hh:mm A")
  //   ).time)
  //  // console.log(dayjs().isSameOrBefore(dayjs(data.date + "" + data.time)))
  //     console.log(
  //       filteredData?.find((data) => data.date === dayjs().format("YYYY-MM-DD") 
  //       &&   dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`, "YYYY-MM-DD HH:mm:ss")) === true
  //                dayjs(`${data.date} ${data.time}`).add(30, 'minute')     
  //                        //dayjs().format("hh:mm A") >= dayjs(data.date + "" + data.time).format("hh:mm A")
  //                       )
  //     );
console.log(filteredData?.find((data) => 
  data.date === dayjs().format("YYYY-MM-DD")   
       && 
       dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`))
      && dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`).add(30, 'minute'))
      ))
      


      setAppointmentData(filteredData);

    //   const te = filteredData?.find((data) => data.date === dayjs().format("YYYY-MM-DD") 
    //   && dayjs().format("hh:mm A") <= dayjs(data.date + "" + data.time).format("hh:mm A")
    //  );

let tempCheck = filteredData?.find((data) => 
  data.date === dayjs().format("YYYY-MM-DD")   
       && 
       dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`))
      && dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`).add(30, 'minute'))
      )

      let te;
    if (tempCheck) {
      te = filteredData?.find((data) => 
        data.date === dayjs().format("YYYY-MM-DD")   
             && 
             dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`))
            && dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`).add(30, 'minute'))
            )
    }
    else {
      te =  filteredData?.find((data) => 
        data.date === dayjs().format("YYYY-MM-DD")   
             && 
             dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`))
            )
    }

    //let te;
    
    // const te = filteredData?.find((data) => 
    //   data.date === dayjs().format("YYYY-MM-DD")   
    //        && 
    //        dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`))
    //       && dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`).add(30, 'minute'))
    //       )
      console.log(te);

      const formattedTime = filteredData?.find(
        (data) => data.date === dayjs().format("YYYY-MM-DD")
      )?.time;

      const formattedDay = filteredData?.find(
        (data) => data.date === dayjs().format("YYYY-MM-DD")
      )?.date;

      
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
                    user?.data.find(
                      (user) => user.user_id === te.user_id
                    
                    )?.image
                  }
                />
              </Grid>
              <Grid xs={6}>
                {" "}
                <p>
                  User: {console.log(user.data)}
                  {
                    user?.data.find(
                      (user) => user.user_id === te.user_id
                    )?.first_name
                  }
                </p>
              </Grid>
            </Grid>
            <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
              Date:{"     "}
              {dayjs(
                te?.date
              ).format("MMMM DD, YYYY")}
            </Typography>
            <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
              Time:
              {dayjs(te.date + "" + te.time).format("hh:mm A")}
              {/* {console.log(
                // formatTime12Hour(formattedTime),
                formattedTime,
                dayjs(formattedDay + formattedTime).format("h:mm A")
              )}
              {dayjs(formattedDay + formattedTime).format("h:mm A")} */}
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

              {console.log(user?.data.find(
                        (user) => user.user_id === te.user_id
                      ).user_id)}


              {tempCheck ? (<><Button
                sx={{ background: "#E66253", color: "#ffffff" }}
                onClick={() =>
                  navigate("/nutritionist-consultation", {
                    state: {
                      tempN:  user?.data.find(
                        (user) => user.user_id === te.user_id
                      )
                      
                    },
                  })
                }
              >
                Call
              </Button></>)
            : (<></>)  
            }
              
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
        setTodayAppointment(
          <Box sx = {{pb: "30%"}}>
            <Typography sx={{color: "#99756E", fontWeight: "bold", fontSize: "30px"}}>
              No Scheduled Consultation{" "}
            </Typography>
          </Box>
        );
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
                      users?.find((user) => user.user_id === item.user_id)
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
      ))}{" "} */}
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
                        users?.find((user) => user.user_id === item.user_id)
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
                        users?.find((user) => user.user_id === item.user_id)
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
                          users?.find((user) => user.user_id === item.user_id)
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
                        users?.find((user) => user.user_id === item.user_id)
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
      <ToastContainer />
      
      <Grid container spacing={2}>
        <Grid xs={6}>
        <Typography>Today's Appointment</Typography>
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

      <Box sx={{ border: 1, ml: "10px", mr: "10%" }}>
        <br />
        <br />
      
        <Grid container spacing={2} sx={{ ml: "10px", mr: "10%" }}>
          <Grid xs={12} sx={{ textAlign: "left" }}>
            <center>
          <Typography
                            sx={{
                              // display: "flex",
                              // justifyContent: "flex-start",
                              // alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1.5em",
                            }}
                          > 
            Schedule of Appointments Log
            </Typography>
            </center>
          </Grid>
          <Grid xs={0}>
            {/* <Button
              sx={{
                background: "#E66253",
                borderRadius: 5,
                color: "#ffffff",
                px: 5,
              }}
            >
              EDIT
            </Button> */}
          </Grid>
          <Grid xs={2}>
            {/* <Button
              sx={{
                background: "#E66253",
                borderRadius: 5,
                color: "#ffffff",
                px: 5,
              }}
            >
              FILTER BY
            </Button> */}

            {/* <Tooltip title="Open settings">
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
            </Tooltip> */}

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
        {/* {scheduledAppointments} */}

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

        <Tabs
          value={activeTab}
          // sx={{
          //   color: "#f00", // Change text color to red
          //   fontSize: "18px", // Increase font size
          //   fontWeight: "bold", // Make text bold
          // }}
          aria-label="basic tabs example"
          onChange={handleTabChange}
          // indicatorColor="primary"
          centered
        >
          {tabContent.map((tab, index) => (
            <Tab
              key={index}
              label={tab.title}
              sx={{
                color: activeTab === index ? "#ffffff" : "#E66253", // Change text color to red
                backgroundColor: activeTab === index ? "#ffffff" : "#ffffff",
                fontSize: "14px", // Increase font size
                border: 3,
                fontWeight: "bold",
                borderColor: "#E66253",
                borderRadius: 2,
                mr: 4,
                //fontWeight: "bold", // Make text bold
              }}
            />
          ))}
        </Tabs>
        {tabContent.map((tab, index) => (
          <Box key={index} hidden={activeTab !== index}>
            {tab.content}
          </Box>
        ))}

        {activeTab === 0 ? (
          <Box>
            <Typography
              sx={{
                color: "#99756E",
                fontWeight: "bold",
                fontSize: "1.4em",
                mt: 1.5,
                mb: 3,
              }}
            >
              Approve Appointments
            </Typography>
            {pendingAppointmentList.filter((item) => item.status === "Approved" && dayjs().isSameOrBefore(dayjs(item.date)))
              .length > 0 ? (
              <>
                {pendingAppointmentList
                 .sort((a, b) => {
                  const dateA = dayjs(a.date);
                  const dateB = dayjs(b.date);
                  return dateB.isAfter(dateA) ? -1 : 1; // Reverse order for descending sort
                })
                  .filter((item) => item.status === "Approved" && dayjs().isSameOrBefore(dayjs(item.date)))
                  ?.map((items) => (
                    <Box sx={{ justifyContent: "flex-start", mb: 0.8, ml: 10 , mt: 3}}>
                      <Grid container spacing={2}>
                        <Grid xs={3}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            {dayjs(items.date).format("MMMM DD, YYYY")}
                          </Typography>
                        </Grid>
                        <Grid xs={4}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            User:{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).first_name
                            }{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).last_name
                            }
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography></Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          color: "#99756E",
                          fontSize: "1em",
                        }}
                      >
                        {dayjs(items.date + " " + items.time).format("hh:mm A")}
                      </Typography>
                      <hr />
                    </Box>
                  ))}{" "}
              </>
            ) : (
              <>
                <br />
                No Appointments
              </>
            )}
          </Box>
        ) : activeTab === 1 ? (
          <Box>
            <Typography
              sx={{
                color: "#99756E",
                fontWeight: "bold",
                fontSize: "1.4em",
                mt: 1.5,
                mb: 3,
              }}
            >
              Pending Appointments
            </Typography>
            {pendingAppointmentList.filter((item) => item.status === "pending" && dayjs().isSameOrBefore(dayjs(item.date)))
              .length > 0 ? (
              <>
                {pendingAppointmentList
                .sort((a, b) => {
                  const dateA = dayjs(a.date);
                  const dateB = dayjs(b.date);
                  return dateB.isAfter(dateA) ? -1 : 1; // Reverse order for descending sort
                })
                  .filter((item) => item.status === "pending" && dayjs().isSameOrBefore(dayjs(item.date)))
                  ?.map((items) => (
                    <Box sx={{ justifyContent: "flex-start", mb: 0.8, ml: 10, mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid xs={3}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            {dayjs(items.date).format("MMMM DD, YYYY")}
                          </Typography>
                        </Grid>
                        <Grid xs={4}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            User:{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).first_name
                            }{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).last_name
                            }
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography></Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          color: "#99756E",
                          fontSize: "1em",
                        }}
                      >
                        {dayjs(items.date + " " + items.time).format("hh:mm A")}
                      </Typography>
                  
                      <Button
                        Button
                        sx={{
                          background: "#E66253",
                          color: "#ffffff",
                          my: 5,
                          px: 5,
                          py: 1,
                          fontSize: "0.9em",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            color: "#E66253",
                            border: 1,
                            borderColor: "#E66253",
                          },
                        }}
                        onClick={() => approveAppointment(items)}
                      >
                        Approve
                      </Button>
                      {"  "}

                      <Button
                        sx={{
                          background: "#898246",
                          color: "#ffffff",
                          my: 5,
                          mx: 3,
                          px: 5,
                          py: 1,
                          fontSize: "0.9em",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            color: "#898246",
                            border: 1,
                            borderColor: "#898246",
                          },
                        }}
                        onClick={() => declineAppointment(items)}
                      >
                        {" "}
                        Decline
                      </Button>
                      <hr />
                    </Box>
                  ))}{" "}
              </>
            ) : (
              <>
                <br />
                No Appointments
              </>
            )}
          </Box>
        ) : (
          <Box>
            <Typography
              sx={{
                color: "#99756E",
                fontWeight: "bold",
                fontSize: "1.4em",
                mt: 1.5,
                mb: 3,
              }}
            >
              Declined Appointments
            </Typography>
            {pendingAppointmentList.filter((item) => item.status === "Declined")
              .length > 0 ? (
              <>
                {pendingAppointmentList
                  .filter((item) => item.status === "Declined")
                  ?.map((items) => (
                    <Box sx={{ justifyContent: "flex-start", mb: 0.8, ml: 10, mt: 3}}>
                      <Grid container spacing={2}>
                        <Grid xs={3}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            {dayjs(items.date).format("MMMM DD, YYYY")}
                          </Typography>
                        </Grid>
                        <Grid xs={4}>
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              color: "#99756E",
                              fontWeight: "bold",
                              fontSize: "1em",
                            }}
                          >
                            User:{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).first_name
                            }{" "}
                            {
                              user?.find(
                                (item) => item.user_id === items.user_id
                              ).last_name
                            }
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography></Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          color: "#99756E",
                          fontSize: "1em",
                        }}
                      >
                        {dayjs(items.date + " " + items.time).format("hh:mm A")}
                      </Typography>

                      <hr />
                    </Box>
                  ))}{" "}
              </>
            ) : (
              <>
                <br />
                No Appointments
              </>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default NutritionistAppointment;
