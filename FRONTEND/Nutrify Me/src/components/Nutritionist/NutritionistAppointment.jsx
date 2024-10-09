import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import Calendar from "react-calendar";
import Modal from "@mui/material/Modal";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Dayjs from "dayjs";
import { Tab, Tabs } from "@mui/material";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

function NutritionistAppointment() {
  
  const [todayApp, setTodayApp] = useState();
  const [activeButton, setActiveButton] = useState(0);
  const buttons = ["Approved", "Pending", "Disapproved"];
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

  //? calendar pop up

  const getAppointmentData = () => {
    console.log(nutritionist, loggedInUser);
    AxiosInstance.get(`nutritionist/`)
      .then((res) => {
        //  setNutritionists(res.data);
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

  const [isLoading, setIsLoading] = useState(false);
  const [appointData, setAppointdata] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [date, setDate] = useState();
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

  //?

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

        AxiosInstance.post(`notifications/`, {
          'type': "PAppointment", 
          'id': data.nutritionist_id, 
          'user_id': data.user_id, 
          'message': "Your appointment has been approved!", 
          'link': "/telemedicine-home", 
          'seen': 0, 
          'other_id': data.nutritionist_id,
        }).then((res) => {
          console.log(res, res.data);
      
        });
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
        kind: "Follow-Up",
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

      console.log(filteredData, dayjs().format("hh:mm:ss"));
      console.log(
        filteredData.map((item) =>
          console.log(
            item.time,
            dayjs(item.date + "" + item.time).format("hh:mm A")
          )
        )
      );
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
      console.log(
        filteredData?.find(
          (data) =>
            data.date === dayjs().format("YYYY-MM-DD") &&
            dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`)) &&
            dayjs().isSameOrBefore(
              dayjs(`${data.date} ${data.time}`).add(30, "minute")
            )
        )
      );

      setAppointmentData(filteredData);

      //   const te = filteredData?.find((data) => data.date === dayjs().format("YYYY-MM-DD")
      //   && dayjs().format("hh:mm A") <= dayjs(data.date + "" + data.time).format("hh:mm A")
      //  );

      let tempCheck = filteredData?.find(
        (data) =>
          data.date === dayjs().format("YYYY-MM-DD") &&
          dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`)) &&
          dayjs().isSameOrBefore(
            dayjs(`${data.date} ${data.time}`).add(30, "minute")
          )
      );

      let te;
      if (tempCheck) {
        te = filteredData?.find(
          (data) =>
            data.date === dayjs().format("YYYY-MM-DD") &&
            dayjs().isSameOrAfter(dayjs(`${data.date} ${data.time}`)) &&
            dayjs().isSameOrBefore(
              dayjs(`${data.date} ${data.time}`).add(30, "minute")
            )
        );
      } else {
        te = filteredData?.find(
          (data) =>
            data.date === dayjs().format("YYYY-MM-DD") &&
            dayjs().isSameOrBefore(dayjs(`${data.date} ${data.time}`))
        );
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
          <Box sx={{ mx: "10%" }}>
            {" "}
            <Grid container spacing={2}>
              <Grid xs={12} md={4}>
                <img
                  width="80%"
                  height="90%"
                  src={
                    user?.data.find((user) => user.user_id === te.user_id)
                      ?.image
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                {" "}
                <p>
                  User: {console.log(user.data)}
                  {
                    user?.data.find((user) => user.user_id === te.user_id)
                      ?.first_name
                  }
                </p>
              </Grid>
            </Grid>
            <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>
              Date:{"     "}
              {dayjs(te?.date).format("MMMM DD, YYYY")}
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

              {console.log(
                user?.data.find((user) => user.user_id === te.user_id).user_id
              )}

              {tempCheck ? (
                <>
                  <Button
                    sx={{ background: "#E66253", color: "#ffffff" }}
                    onClick={() =>
                      navigate("/nutritionist-consultation", {
                        state: {
                          tempN: user?.data.find(
                            (user) => user.user_id === te.user_id
                          ),
                        },
                      })
                    }
                  >
                    Call
                  </Button>
                </>
              ) : (
                <></>
              )}

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
          <Box sx={{ pb: "30%" }}>
            <Typography
              sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
            >
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
    getAppointmentData();
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

      <Box
        sx={{
          mt: 3,
          mr: {
            xs: "30%", // For extra small screens
            sm: "20%", // For small screens
            md: "10%", // For medium screens
            lg: "10%", // For large screens
          },
          ml: {
            xs: "1%", // For extra small screens
            sm: "20%", // For small screens
            md: "15%", // For medium screens
            lg: "2%", // For large screens
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Typography>Today's Appointment</Typography>
            <Box sx={{ border: 1, borderRadius: 2, mr: "0%" }}>
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
          <Grid xs={12} md={6}>
          <Box sx = {{ml: "10%"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DateCalendar /> */}
              <Calendar
                onChange={onChange}
                value={date}
                className={isLoading ? "loading" : ""}
                style={{
                  border: "1px solid #898246",
                  backgroundColor: "#f5f5f5",
                }}
              />
            </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        
        sx={{
          mt: 3, 
          border: 1,
          mr: {
            xs: "30%", // For extra small screens
            sm: "20%", // For small screens
            md: "5%", // For medium screens
            lg: "15%", // For large screens
          },
          ml: {
            xs: "1%", // For extra small screens
            sm: "20%", // For small screens
            md: "5%", // For medium screens
            lg: "2%", // For large screens
          },
        }}
      >
        <br />
        <br />

        {/* <Box sx = {{mr: {
                        xs: "30%", // For extra small screens
                        sm: "20%", // For small screens
                        md: "5%", // For medium screens
                        lg: "15%", // For large screens
                      }, ml: {
                        xs: "1%", // For extra small screens
                        sm: "20%", // For small screens
                        md: "5%", // For medium screens
                        lg: "2%", // For large screens
                      }}}> */}
        <Grid container spacing={2} sx={{ ml: "0px", mr: "0%" }}>
          <Grid xs={12} sx={{ textAlign: "left" }}>
            <center>
              <Typography
                sx={{
                  // display: "flex",
                  // justifyContent: "flex-start",
                  // alignItems: "flex-start",
                  color: "#99756E",
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1em", // For extra small screens
                    sm: "1em", // For small screens
                    md: "1em", // For medium screens
                    lg: "1em", // For large screens
                  },
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
          <Grid xs={12}>
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

            <Grid container spacing={2} sx={{ mt: 5 }}>
              {" "}
              {buttons.map((buttonLabel, index) => (
                <Grid xs={12} sm={4} md={4} key={index}>
                  <Button
                    key={index}
                    variant="contained" // Adjust variant as needed
                    onClick={() => setActiveButton(index)}
                    sx={{
                      borderColor: "#ffffff",
                      fontWeight: "bold",
                      boxShadow: 1,
                      mt: 2,
                      mx: 5,
                      fontSize: {
                        xs: "1em", // For extra small screens
                        sm: "1em", // For small screens
                        md: "1em", // For medium screens
                        lg: "1em", // For large screens
                      },
                      background: "#ffffff",
                      color: activeButton === index ? "#E66253" : "#E3ACA5", // Adjust colors as desired
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    {buttonLabel}
                  </Button>{" "}
                </Grid>
              ))}
            </Grid>
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
        {/* </Box> */}

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

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center tabs
            flexWrap: "wrap", // Allow tabs to wrap on small screens
            gap: 2, // Space between tabs
          }}
        >
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
        </Box>

        {tabContent.map((tab, index) => (
          <Box key={index} hidden={activeTab !== index}>
            {tab.content}
          </Box>
        ))} */}

        {/* {activeTab === 0 ? ( */}
        {activeButton === 0 ? (
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
            {pendingAppointmentList.filter(
              (item) =>
                item.status === "Approved" &&
                dayjs()
                  .startOf("day")
                  .isSameOrBefore(dayjs(item.date).startOf("day"))
            ).length > 0 ? (
              <>
                {pendingAppointmentList
                  .sort((a, b) => {
                    const dateA = dayjs(a.date);
                    const dateB = dayjs(b.date);
                    return dateB.isAfter(dateA) ? -1 : 1; // Reverse order for descending sort
                  })
                  .filter(
                    (item) =>
                      item.status === "Approved" &&
                      dayjs()
                        .startOf("day")
                        .isSameOrBefore(dayjs(item.date).startOf("day"))
                  )
                  ?.map((items) => (
                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        mb: 0.8,
                        ml: 10,
                        mt: 3,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid xs={12} md={3}>
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
                        <Grid xs={12} md={4}>
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
        ) : activeButton === 1 ? (
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
            {pendingAppointmentList.filter(
              (item) =>
                item.status === "pending" &&
                dayjs()
                  .startOf("day")
                  .isSameOrBefore(dayjs(item.date).startOf("day"))
            ).length > 0 ? (
              <>
                {pendingAppointmentList
                  .sort((a, b) => {
                    const dateA = dayjs(a.date);
                    const dateB = dayjs(b.date);
                    return dateB.isAfter(dateA) ? -1 : 1; // Reverse order for descending sort
                  })
                  .filter(
                    (item) =>
                      item.status === "pending" &&
                      dayjs()
                        .startOf("day")
                        .isSameOrBefore(dayjs(item.date).startOf("day"))
                  )
                  ?.map((items) => (
                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        mb: 0.8,
                        ml: 10,
                        mt: 3,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid xs={12} md={3}>
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
                        <Grid xs={12} md={4}>
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
                          my: 0,
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
                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        mb: 0.8,
                        ml: 10,
                        mt: 3,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid xs={12} md={3}>
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
                        <Grid xs={12} md={4}>
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
