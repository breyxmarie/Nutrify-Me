import { useEffect, useRef, useState } from "react";
import * as React from "react";
import MainUserNavbar from "../NavBars/MainUserNavbar";
import TeleMedNavBar from "../NavBars/TeleMedNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { Day } from "@mui/x-date-pickers/components";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { NavLink, Link, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import DatePicker from "react-date-picker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import AxiosInstance from "../forms/AxiosInstance";
import MySelectField from "../forms/MySelectField";
import MyDatePicker from "../forms/MyDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import { useLoggedInUser } from "../LoggedInUserContext";
import Calendar from "react-calendar";
import duration from "dayjs/plugin/duration";
import "./calendar.css";
//import AssignmentIcon from "@material-ui/icons/Assignment";
//import PhoneIcon from "@material-ui/icons/Phone";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

// * functions for calendar
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
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

const initialValue = dayjs();

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
// *

function TelemedicineHome() {
  //! initialize variables
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  //!

  //! functions for calendar

  const [modalDayContent, setModalDayContent] = useState(<div>try</div>);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const [timeDiv, setTimeDiv] = useState(<div>hi</div>);

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

    if (temp) {
      console.log(nutritionist);
      const nutrition = nutritionist.find(
        (data) => data.nutritionist_id === temp.nutritionist_id
      );
      setModalDayContent(
        <div>
          Scheduled Appointment: <br />
          Date: {dayjs(newDate).format("MMMM DD YYYY")} <br />
          Nutritionist: {nutrition.first_name} {nutrition.last_name}
          <br />
          Time: {temp.time}
        </div>
      );
    } else {
      console.log("No Appointment");
      setModalDayContent(
        <div>
          {dayjs(newDate).format("MMMM DD YYYY")} <br />
          No Appointment
        </div>
      );
    }
  };

  //!
  //codes for consultation pop up in selecting nutritionist
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  //! date modal
  const [dates, setDates] = useState(null); // Existing date state
  const [openDate, setOpenDate] = useState(false); // Modal open state

  const handleDateChange = (newDate) => {
    setDates(newDate); // Update your date state here
    console.log("open sesame seeds", newDate);
  };

  const handleOpenModal = (selectedDate) => {
    // Optional: Do something with the selected date before opening the modal
    setOpenDate(true);
  };

  const handleCloseModal = () => {
    setOpenDate(false);
  };

  const [openDay, setOpenDay] = useState(false);

  const handleOpenDay = (selectedDate) => {
    // Optional: Do something with the selected date before opening the modal
    setOpenDay(true);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  const handleDayClick = (date) => {
    console.log("open sesame", date);
    handleDateChange(date); // Update date state
    handleOpenModal(date); // Open the modal after selecting a date
  };

  const anchorElRef = useRef(null);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const DateModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Selected Date
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {dates ? dates.format("DD/MM/YYYY") : "No date selected"}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>
    );
  };

  //!

  const options = [
    {
      nutritionist_id: 1,
      username: "randomname",
      password: "123",
      first_name: "fdassd",
      last_name: "asdfasdf",
      license_id: "324334",
      schedule_day: "monday, wednesday",
      schedule_time: "3:00 am - 4:00 am",
    },
  ];

  // * codes for calendar

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

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

  //*

  // * Book Consultation modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedNutritionist(null);
    setOpen(false);
    setSelectedDates(null);
    setTempNut(null);
  };

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
  //

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //! creating an appointment

  // const [date, setDate] = useState(initialValue);
  const [date, setDate] = useState();

  // const [time, setTime] = useState(Dayjs(initialValue).format("HH:mm:ss"));
  const [time, setTime] = useState();

  // console.log(time);
  const handleTime = () => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })
      );
    }, 1000); // Update time every second

    return () => clearInterval(intervalId);
  };

  // ? again
  // const [date1, setDate1] = useState(dayjs());
  // const availableWeekdays = ["Tuesday", "Thursday", "Saturday"];

  // const isWeekdayAvailable = (date) => {
  //   console.log(dayjs(date));
  //   const dayjsDate = dayjs(date); // Convert to dayjs object
  //   const weekday = dayjsDate.day(); // Use dayjs.day() for weekday index (0-6)
  //   return availableWeekdays.includes(dayjs.WEEKDAYS[weekday]); // Use dayjs.WEEKDAYS for weekday names
  // };

  // const handleDateChanges = (newDate) => {
  //   if (isWeekdayAvailable(newDate)) {
  //     setDate1(newDate);
  //   } else {
  //     // Optional: Show an error message or notification
  //   }
  // };

  // Define your list of available days (e.g., "Tuesday", "Friday", "Saturday")
  const [availableDays, setAvailableDays] = useState(["Wednesday"]);

  // const handleDateChanges = async (date) => {
  //   // Get the day of the week (e.g., "Tuesday")

  //   console.log(date);
  //   const year = date.$y;
  //   const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
  //   const day = date.$d.getDate();

  //   const convertedDate = new Date(date);
  //   console.log(convertedDate);
  //   const selectedDay = convertedDate.toLocaleDateString("en-US", {
  //     weekday: "long",
  //   });
  //   console.log(selectedDay);
  //   if (availableDays.includes(selectedDay)) {
  //     console.log(date, "is it working ba");
  //     setSelectedDates(date);
  //     // Handle the selected date (e.g., update state, trigger an action, etc.)
  //   } else {
  //     // Display an error message or prevent selection
  //     console.log("Please select a valid day.");
  //     await setSelectedDates(null);
  //   }
  // };

  // function disableUnavailableDates(date) {
  //   // Get the day of the week (e.g., "Tuesday")
  //   const year = date.$y;
  //   const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
  //   const day = date.$d.getDate();

  //   const convertedDate = new Date(date);
  //   const selectedDay = convertedDate.toLocaleDateString("en-US", {
  //     weekday: "long",
  //   });

  //   // Check if the selected day is in the unavailable list
  //   return !availableDays.includes(selectedDay);
  // }
  //?

  const [selectedNutritionist, setSelectedNutritionist] = useState("");
  const [appointData, setAppointdata] = useState();
  const [nutritionistInformation, setNutritionistInformation] = useState();

  function Time(hours, minutes, seconds = 0, milliseconds = 0) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;

    // Optional method to get total time in milliseconds
    this.getTotalMilliseconds = function () {
      return (
        this.hours * 3600 * 1000 +
        this.minutes * 60 * 1000 +
        this.seconds * 1000 +
        this.milliseconds
      );
    };
  }

  function calculateTotalHours(startTime, endTime) {
    // Calculate difference in milliseconds using custom Time objects
    const diffInMs =
      endTime.getTotalMilliseconds() - startTime.getTotalMilliseconds();

    // Convert milliseconds to hours (divide by 1000 for seconds, 3600 for hours)
    const totalHours = diffInMs / (1000 * 3600);

    return totalHours.toFixed(2); // Format to two decimal places
  }

  function parseTimeString(timeString) {
    //const timeRegex = /^(\d{1,2}):(\d{2})(AM|PM)?$/;
    const timeRegex = /^(\d{1,2}):(\d{2}) ?(AM|PM)$/;
    const match = timeString.trim().match(timeRegex);
    console.log(match);
    if (!match) {
      throw new Error("Invalid time format. Please use HH:MM (AM/PM) format.");
    }

    const hours = parseInt(match[1], 10); // Convert hours string to number
    const minutes = parseInt(match[2], 10); // Convert minutes string to number
    const amPm = match[3] || "AM"; // Default to AM if not provided
    console.log(hours, minutes, amPm);
    return { hours, minutes, amPm };
  }

  function divideHoursIntoIntervals(dayjsObject, totalHours) {
    // Validate input
    if (!dayjsObject.isValid() || totalHours <= 0) {
      throw new Error(
        "Invalid Day.js object or total hours (must be positive)"
      );
    }

    const intervals = [];
    const startTime = dayjsObject; // Starting time is the Day.js object passed

    // Loop through each 30-minute interval
    for (let i = 0; i < totalHours * 2; i++) {
      const currentInterval = startTime.add(i * 30, "minute"); // Add 30 minutes for each interval

      // Format the time string (optional)
      const formattedTime = currentInterval.format("h:mm A"); // Adjust format as needed (e.g., HH:mm)

      intervals.push(formattedTime);
    }

    return intervals;
  }

  function convertTimeFormat(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":");

    // Parse the hours, minutes, and seconds into integers
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    // Convert the time to a 12-hour format with AM/PM indicator
    let formattedHours = parsedHours % 12; // Get hours in 12-hour format

    // Omit leading zero for hours 10-12 (optional)
    if (formattedHours >= 10 && formattedHours <= 12) {
      formattedHours = formattedHours.toString(); // Remove leading zero
    } else {
      //  formattedHours = formattedHours.toString().padStart(2, "0"); // Add leading zero for others
      formattedHours = formattedHours.toString(); // Add leading zero for others
    }

    const amPm = parsedHours >= 12 ? "PM" : "AM";

    // Format the final time string
    const formattedTime = `${formattedHours}:${parsedMinutes
      .toString()
      .padStart(2, "0")} ${amPm}`;

    return formattedTime;
  }

  const handleDateChanges = async (date) => {
    // Get the day of the week (e.g., "Tuesday")
    setTimeDiv(<div>nagbago na ba </div>);
    setSelectedDates(date);
    console.log(date);

    const year = date.$y;
    const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
    const day = date.$d.getDate();

    const convertedDate = new Date(date);
    console.log(convertedDate);
    const selectedDay = convertedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    console.log(selectedDay);
    let index = tempNut.schedule_day.findIndex((item) => item === selectedDay);
    let time = tempNut.schedule_time[index];

    const timeParts = time.split("-");
    console.log(timeParts);
    const startTime = Math.floor(timeParts[0].substring(0, 2));
    const endTime = Math.floor(timeParts[1].substring(3, 5));

    console.log(timeParts[0], " ", timeParts[1]);
    getAvailableTime(timeParts[0], timeParts[1], date);
    // const selectedDay = convertedDate.toLocaleDateString("en-US", {
    //   weekday: "long",
    // });
    // console.log(selectedDay);
    // if (tempNut.schedule_day.includes(selectedDay)) {
    //   console.log(date, "is it working ba");
    //   setSelectedDates(date);
    //   // Handle the selected date (e.g., update state, trigger an action, etc.)
    // } else {
    //   // Display an error message or prevent selection
    //   console.log("Please select a valid day.");
    //   setSelectedDates(null);
    // }
    // console.log(selectedTheDay);
  };

  // ?
  function disableUnavailableDates(date) {
    // Get the day of the week (e.g., "Tuesday")
    const year = date.$y;
    const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
    const day = date.$d.getDate();

    const convertedDate = new Date(date);
    const selectedDay = convertedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Check if the selected day is in the unavailable list
    // return !availableDays.includes(selectedDay);

    return !tempNut.schedule_day.includes(selectedDay);
  }

  //?
  function getTotalHours(startTimeString, endTimeString) {
    console.log(startTimeString, endTimeString);
    let totalHours = 0;
    try {
      const startTimeParsed = parseTimeString(startTimeString);
      const endTimeParsed = parseTimeString(endTimeString);

      const startTime = new Time(
        startTimeParsed.hours === 12 && startTimeParsed.amPm === "AM"
          ? 0 // Convert 12:00AM to 0 hours
          : startTimeParsed.hours === 12 && startTimeParsed.amPm === "PM"
          ? 12 // Keep 12:00PM as 12 hours
          : startTimeParsed.amPm === "PM"
          ? startTimeParsed.hours + 12 // Add 12 for PM hours
          : startTimeParsed.hours, // Keep hours for AM
        startTimeParsed.minutes
      );

      const endTime = new Time(
        endTimeParsed.hours === 12 && endTimeParsed.amPm === "AM"
          ? 0 // Convert 12:00AM to 0 hours
          : endTimeParsed.hours === 12 && endTimeParsed.amPm === "PM"
          ? 12 // Keep 12:00PM as 12 hours
          : endTimeParsed.amPm === "PM"
          ? endTimeParsed.hours + 12 // Add 12 for PM hours
          : endTimeParsed.hours, // Keep hours for AM
        endTimeParsed.minutes
      );
      console.log(startTimeParsed + " " + endTime);
      totalHours = calculateTotalHours(startTime, endTime);
      console.log("Total hours:", totalHours, startTimeString);

      return totalHours;
    } catch (error) {
      console.error("Error parsing time:", error.message);
    }
  }

  const [freeTime, setFreeTime] = useState();

  const getAvailableTime = (startTimeString, endTimeString, date) => {
    console.log(startTimeString, endTimeString);
    // try {
    //   const startTimeParsed = parseTimeString(startTimeString);
    //   const endTimeParsed = parseTimeString(endTimeString);
    //   const startTime = new Time(
    //     startTimeParsed.hours === 12 && startTimeParsed.amPm === "AM"
    //       ? 0 // Convert 12:00AM to 0 hours
    //       : startTimeParsed.hours === 12 && startTimeParsed.amPm === "PM"
    //       ? 12 // Keep 12:00PM as 12 hours
    //       : startTimeParsed.amPm === "PM"
    //       ? startTimeParsed.hours + 12 // Add 12 for PM hours
    //       : startTimeParsed.hours, // Keep hours for AM
    //     startTimeParsed.minutes
    //   );
    //   const endTime = new Time(
    //     endTimeParsed.hours === 12 && endTimeParsed.amPm === "AM"
    //       ? 0 // Convert 12:00AM to 0 hours
    //       : endTimeParsed.hours === 12 && endTimeParsed.amPm === "PM"
    //       ? 12 // Keep 12:00PM as 12 hours
    //       : endTimeParsed.amPm === "PM"
    //       ? endTimeParsed.hours + 12 // Add 12 for PM hours
    //       : endTimeParsed.hours, // Keep hours for AM
    //     endTimeParsed.minutes
    //   );
    //   console.log(startTimeParsed + " " + endTime);
    //   totalHours = calculateTotalHours(startTime, endTime);
    //   console.log("Total hours:", totalHours, startTimeString);
    // } catch (error) {
    //   console.error("Error parsing time:", error.message);
    // }

    // const startTimeString = "08:00AM"; // Replace with user-provided start time
    // const endTimeString = "12:00PM";
    // console.log(dayjs(selectedTheDay));
    let totalHours = getTotalHours(startTimeString, endTimeString);
    let availableTime = [];
    // const s = dayjs("08:00 PM", "HH:mm A/P");
    const s = dayjs(startTimeString, "HH:mm A/P");

    try {
      const timeIntervals = divideHoursIntoIntervals(s, totalHours);
      console.log("Time intervals for", totalHours, "hours:");
      console.log(timeIntervals.join(", ")); // Join intervals with commas and space

      const filteredAvailableTime = divideHoursIntoIntervals(s, totalHours);
      AxiosInstance.get(`scheduledeck`).then((res) => {
        // setJournalEntry(
        //   res.data.filter(
        //     (item) => item.date == day && item.user_id == loggedInUser.user_id
        //   )
        //  );

        console.log(filteredAvailableTime);
        console.log(timeIntervals);
        console.log(date.format("YYYY-MM-DD"));
        let checkDate = date.format("YYYY-MM-DD");
        //  availableTime.map((item) => console.log(item));
        let tempTime;

        let checkNut = res.data.filter(
          (interval) => interval.nutritionist_id === tempNut.nutritionist_id
        );

        let schedules = checkNut.filter(
          //  availableTime = availableTime.filter(
          (interval) => interval.date === checkDate
        );

        console.log(filteredAvailableTime);
        filteredAvailableTime.map((filter) => {
          // checkNut.forEach((item) => {
          //   if (item.date === checkDate) {
          //     if (filter !== formattedTime) {
          //       availableTime.push(filter);
          //     }
          //   } else {
          //     availableTime.push(filter);
          //   }
          // });
          availableTime.push(filter);
        });

        console.log(schedules);
        schedules.map((scheds) => {
          let temp = convertTimeFormat(scheds.time);
          availableTime = availableTime.filter((interval) => interval !== temp);
        });

        console.log(availableTime);
        res.data.forEach((item) => {
          // Format the time
          const formattedTime = convertTimeFormat(item.time);
          console.log(item);

          // Assuming availableTime contains time intervals

          // availableTime = filteredAvailableTime.filter(
          //   //  availableTime = availableTime.filter(
          //   (interval) => interval !== formattedTime
          //   //&& item.date === checkDate
          // );

          // availableTime = filteredAvailableTime.filter(
          //   //  availableTime = availableTime.filter(
          //   (interval) => interval !== formattedTime
          //   //&& item.date === checkDate
          // );

          // filteredAvailableTime.map((filter) => {
          //   if (item.date === checkDate) {
          //     if (filter !== formattedTime) {
          //       availableTime.push(filter);
          //     }
          //   } else {
          //     availableTime.push(filter);
          //   }
          // });

          // availableTime = filteredAvailableTime;

          // Use filteredAvailableTime for further processing
          console.log(availableTime);
          setFreeTime(availableTime);
        });
        console.log(freeTime);
        //  setSelectedDates(dayjs());
        // setNutritionistInformation(
        //   <Box>
        //     <img src={tempNut.image} />
        //     {tempNut.first_name} {tempNut.last_name}
        //     <br />
        //     {tempNut.schedule_day}
        //     <br />
        //     {tempNut.schedule_time}
        //     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //       <DatePicker
        //         label="Select a date"
        //         defaultValue={dayjs()}
        //         value={selectedDates}
        //         onChange={handleDateChanges}
        //         renderInput={(params) => <TextField {...params} />}
        //         shouldDisableDate={disableUnavailableDates}
        //         minDate={dayjs()}
        //         //  open // Keep the calendar open
        //       />
        //     </LocalizationProvider>
        //     Time:
        //     <Select
        //       labelId="demo-simple-select-filled-label"
        //       id="demo-simple-select-filled"
        //       // value={selectedNutritionist}
        //       onChange={handleChangeTime}
        //       name="type"
        //       width="100%"
        //       //  {...register("type")}
        //       //  error={errors.type ? true : false}
        //     >
        //       {availableTime.map((option) => (
        //         <MenuItem key={option} value={option}>
        //           {option}
        //         </MenuItem>
        //       ))}
        //     </Select>
        //   </Box>
        // );
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const [tempNut, setTempNut] = useState();
  const handleChange = (event) => {
    setSelectedNutritionist(event.target.value);
    const tempNut = nutritionist.find(
      (nut) => nut.nutritionist_id === event.target.value
    );
    setTempNut(tempNut);
    setSelectedDates(dayjs());
    console.log(tempNut);
    setNutritionistInformation(
      <Box>
        <img src={tempNut?.image} />
        {tempNut.first_name} {tempNut.last_name}
        <br />
        {tempNut.schedule_day}
        <br />
        {tempNut.schedule_time}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select a date"
            defaultValues={null}
            value={selectedDates}
            onChange={handleDateChanges}
            renderInput={(params) => <TextField {...params} />}
            // shouldDisableDate={disableUnavailableDates}
            minDate={dayjs()}
            //  open // Keep the calendar open
          />
        </LocalizationProvider>
        {timeDiv}
      </Box>
    );
  };

  // const [setTimeDiv, setSetTimeDiv] = useState(<></>);
  // const handleChange = (event) => {
  //   setSelectedNutritionist(event.target.value);
  //   let selectedTheDay;
  //   let availableTime = [];
  //   const tempNut = nutritionist.find(
  //     (nut) => nut.nutritionist_id === event.target.value
  //   );
  //   console.log(tempNut.schedule_day);
  //   // Replace with user-provided end time
  //   let totalHours = 0;

  //   // !
  //   const handleDateChanges = async (date) => {
  //     // Get the day of the week (e.g., "Tuesday")
  //     setTimeDiv(<div>nagbago na ba</div>);
  //     selectedTheDay = date;
  //     console.log(date);
  //     const year = date.$y;
  //     const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
  //     const day = date.$d.getDate();

  //     const convertedDate = new Date(date);
  //     console.log(convertedDate);
  //     const selectedDay = convertedDate.toLocaleDateString("en-US", {
  //       weekday: "long",
  //     });
  //     console.log(selectedDay);
  //     if (tempNut.schedule_day.includes(selectedDay)) {
  //       console.log(date, "is it working ba");
  //       setSelectedDates(date);
  //       // Handle the selected date (e.g., update state, trigger an action, etc.)
  //     } else {
  //       // Display an error message or prevent selection
  //       console.log("Please select a valid day.");
  //       setSelectedDates(null);
  //     }
  //     console.log(selectedTheDay);
  //   };
  //   //!

  //   // ?
  //   function disableUnavailableDates(date) {
  //     // Get the day of the week (e.g., "Tuesday")
  //     const year = date.$y;
  //     const month = date.$M - 1; // Months in JavaScript are zero-indexed (January is 0)
  //     const day = date.$d.getDate();

  //     const convertedDate = new Date(date);
  //     const selectedDay = convertedDate.toLocaleDateString("en-US", {
  //       weekday: "long",
  //     });

  //     // Check if the selected day is in the unavailable list
  //     // return !availableDays.includes(selectedDay);

  //     return !tempNut.schedule_day.includes(selectedDay);
  //   }

  //   //?

  //   // try {
  //   //   const startTimeParsed = parseTimeString(startTimeString);
  //   //   const endTimeParsed = parseTimeString(endTimeString);

  //   //   const startTime = new Time(
  //   //     startTimeParsed.hours === 12 && startTimeParsed.amPm === "AM"
  //   //       ? 0 // Convert 12:00AM to 0 hours
  //   //       : startTimeParsed.hours === 12 && startTimeParsed.amPm === "PM"
  //   //       ? 12 // Keep 12:00PM as 12 hours
  //   //       : startTimeParsed.amPm === "PM"
  //   //       ? startTimeParsed.hours + 12 // Add 12 for PM hours
  //   //       : startTimeParsed.hours, // Keep hours for AM
  //   //     startTimeParsed.minutes
  //   //   );

  //   //   const endTime = new Time(
  //   //     endTimeParsed.hours === 12 && endTimeParsed.amPm === "AM"
  //   //       ? 0 // Convert 12:00AM to 0 hours
  //   //       : endTimeParsed.hours === 12 && endTimeParsed.amPm === "PM"
  //   //       ? 12 // Keep 12:00PM as 12 hours
  //   //       : endTimeParsed.amPm === "PM"
  //   //       ? endTimeParsed.hours + 12 // Add 12 for PM hours
  //   //       : endTimeParsed.hours, // Keep hours for AM
  //   //     endTimeParsed.minutes
  //   //   );
  //   //   console.log(startTimeParsed + " " + endTime);
  //   //   totalHours = calculateTotalHours(startTime, endTime);
  //   //   console.log("Total hours:", totalHours, startTimeString);
  //   // } catch (error) {
  //   //   console.error("Error parsing time:", error.message);
  //   // }

  //   function getTotalHours(startTimeString, endTimeString) {
  //     try {
  //       const startTimeParsed = parseTimeString(startTimeString);
  //       const endTimeParsed = parseTimeString(endTimeString);

  //       const startTime = new Time(
  //         startTimeParsed.hours === 12 && startTimeParsed.amPm === "AM"
  //           ? 0 // Convert 12:00AM to 0 hours
  //           : startTimeParsed.hours === 12 && startTimeParsed.amPm === "PM"
  //           ? 12 // Keep 12:00PM as 12 hours
  //           : startTimeParsed.amPm === "PM"
  //           ? startTimeParsed.hours + 12 // Add 12 for PM hours
  //           : startTimeParsed.hours, // Keep hours for AM
  //         startTimeParsed.minutes
  //       );

  //       const endTime = new Time(
  //         endTimeParsed.hours === 12 && endTimeParsed.amPm === "AM"
  //           ? 0 // Convert 12:00AM to 0 hours
  //           : endTimeParsed.hours === 12 && endTimeParsed.amPm === "PM"
  //           ? 12 // Keep 12:00PM as 12 hours
  //           : endTimeParsed.amPm === "PM"
  //           ? endTimeParsed.hours + 12 // Add 12 for PM hours
  //           : endTimeParsed.hours, // Keep hours for AM
  //         endTimeParsed.minutes
  //       );
  //       console.log(startTimeParsed + " " + endTime);
  //       totalHours = calculateTotalHours(startTime, endTime);
  //       console.log("Total hours:", totalHours, startTimeString);

  //       return totalHours;
  //     } catch (error) {
  //       console.error("Error parsing time:", error.message);
  //     }
  //   }

  //   const startTimeString = "08:00AM"; // Replace with user-provided start time
  //   const endTimeString = "12:00PM";
  //   console.log(dayjs(selectedTheDay));
  //   totalHours = getTotalHours(startTimeString, endTimeString);

  //   // const s = dayjs("08:00 PM", "HH:mm A/P");
  //   const s = dayjs("08:00 PM", "HH:mm A/P");

  //   try {
  //     const timeIntervals = divideHoursIntoIntervals(s, totalHours);
  //     console.log("Time intervals for", totalHours, "hours:");
  //     console.log(timeIntervals.join(", ")); // Join intervals with commas and space

  //     const filteredAvailableTime = divideHoursIntoIntervals(s, totalHours);
  //     AxiosInstance.get(`scheduledeck`).then((res) => {
  //       // setJournalEntry(
  //       //   res.data.filter(
  //       //     (item) => item.date == day && item.user_id == loggedInUser.user_id
  //       //   )
  //       //  );

  //       console.log(res.data);
  //       console.log(timeIntervals);

  //       console.log(selectedTheDay);

  //       //  availableTime.map((item) => console.log(item));
  //       let tempTime;
  //       res.data.forEach((item) => {
  //         // Format the time
  //         const formattedTime = convertTimeFormat(item.time);
  //         console.log(formattedTime);
  //         // Assuming availableTime contains time intervals
  //         availableTime = filteredAvailableTime.filter(
  //           //  availableTime = availableTime.filter(
  //           (interval) => interval !== formattedTime
  //         );

  //         // availableTime = filteredAvailableTime;

  //         // Use filteredAvailableTime for further processing
  //       });
  //       console.log(availableTime);
  //       setSelectedDates(dayjs());
  //       // setNutritionistInformation(
  //       //   <Box>
  //       //     <img src={tempNut.image} />
  //       //     {tempNut.first_name} {tempNut.last_name}
  //       //     <br />
  //       //     {tempNut.schedule_day}
  //       //     <br />
  //       //     {tempNut.schedule_time}
  //       //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       //       <DatePicker
  //       //         label="Select a date"
  //       //         defaultValue={dayjs()}
  //       //         value={selectedDates}
  //       //         onChange={handleDateChanges}
  //       //         renderInput={(params) => <TextField {...params} />}
  //       //         shouldDisableDate={disableUnavailableDates}
  //       //         minDate={dayjs()}
  //       //         //  open // Keep the calendar open
  //       //       />
  //       //     </LocalizationProvider>
  //       //     Time:
  //       //     <Select
  //       //       labelId="demo-simple-select-filled-label"
  //       //       id="demo-simple-select-filled"
  //       //       // value={selectedNutritionist}
  //       //       onChange={handleChangeTime}
  //       //       name="type"
  //       //       width="100%"
  //       //       //  {...register("type")}
  //       //       //  error={errors.type ? true : false}
  //       //     >
  //       //       {availableTime.map((option) => (
  //       //         <MenuItem key={option} value={option}>
  //       //           {option}
  //       //         </MenuItem>
  //       //       ))}
  //       //     </Select>
  //       //   </Box>
  //       // );
  //     });

  //     function getAvailableTimes(s, totalHours) {
  //       try {
  //         const timeIntervals = divideHoursIntoIntervals(s, totalHours);
  //         console.log("Time intervals for", totalHours, "hours:");
  //         console.log(timeIntervals.join(", ")); // Join intervals with commas and space

  //         const filteredAvailableTime = divideHoursIntoIntervals(s, totalHours);
  //         AxiosInstance.get(`scheduledeck`).then((res) => {
  //           // setJournalEntry(
  //           //   res.data.filter(
  //           //     (item) => item.date == day && item.user_id == loggedInUser.user_id
  //           //   )
  //           //  );

  //           console.log(res.data);
  //           console.log(timeIntervals);

  //           console.log(selectedTheDay);

  //           //  availableTime.map((item) => console.log(item));
  //           let tempTime;
  //           res.data.forEach((item) => {
  //             // Format the time
  //             const formattedTime = convertTimeFormat(item.time);
  //             console.log(formattedTime);
  //             // Assuming availableTime contains time intervals
  //             availableTime = filteredAvailableTime.filter(
  //               //  availableTime = availableTime.filter(
  //               (interval) => interval !== formattedTime
  //             );

  //             // availableTime = filteredAvailableTime;

  //             // Use filteredAvailableTime for further processing
  //           });
  //           console.log(availableTime);
  //         });
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //     }
  //     availableTime = [];
  //     //  availableTime = getAvailableTimes(s, totalHours);
  //     console.log(getAvailableTimes(s, totalHours));
  //     setNutritionistInformation(
  //       <Box>
  //         <img src={tempNut.image} />
  //         {tempNut.first_name} {tempNut.last_name}
  //         <br />
  //         {tempNut.schedule_day}
  //         <br />
  //         {tempNut.schedule_time}
  //         <LocalizationProvider dateAdapter={AdapterDayjs}>
  //           <DatePicker
  //             label="Select a date"
  //             defaultValues={null}
  //             value={selectedDates}
  //             onChange={handleDateChanges}
  //             renderInput={(params) => <TextField {...params} />}
  //             shouldDisableDate={disableUnavailableDates}
  //             minDate={dayjs()}
  //             //  open // Keep the calendar open
  //           />
  //         </LocalizationProvider>
  //         Time:
  //         {timeDiv}
  //         {availableTime.length > 0 && ( // Check if array is not empty
  //           <Select
  //             labelId="demo-simple-select-filled-label"
  //             id="demo-simple-select-filled"
  //             // value={selectedNutritionist}
  //             //  onChange={handleChangeTime}
  //             name="type"
  //             width="100%"
  //             //  {...register("type")}
  //             //  error={errors.type ? true : false}
  //           >
  //             {availableTime.map((option) => (
  //               <MenuItem key={option} value={option}>
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </Select>
  //         )}
  //       </Box>
  //     );
  //     //  availableTime = divideHoursIntoIntervals(s, totalHours);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  //   console.log(availableTime);
  //   const handleChangeTime = () => {};
  //   setAvailableDays(tempNut.schedule_day);
  // };

  const schema = yup
    .object({
      nutritionist: yup
        .string()
        .required("Project Manager is a required field"),

      selectedDate: yup
        .date()
        .required("date is a required field")
        .min(
          yup.ref(Dayjs(new Date()).format("YYYY-MM-DD")),
          "date cannot be in the past"
        ),
    })
    .required();

  // const submission = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  // };

  const { handleSubmit, control } = useForm({
    // defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      AxiosInstance.post(`appointment`, {
        date: date,
        time: time,
        user_id: loggedInUser.user_id,
        nutritionist_id: selectedNutritionist,
      }).then((res) => {
        // navigate(`/`);
        handleClose();
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const defaultValues = {
    name: "",
    comments: "",
    status: "",
    // start_date: "",
    // end_date: "",
  };
  // const { handleSubmit, control } = useForm({
  //   defaultValues: defaultValues,
  //   resolver: yupResolver(schema),
  // });
  const [nutritionist, setNutritionist] = useState([
    {
      nutritionist_id: 1,
      username: "randomname",
      password: "123",
      first_name: "fdassd",
      last_name: "asdfasdf",
      license_id: "324334",
      schedule_day: "monday, wednesday",
      schedule_time: "3:00 am - 4:00 am",
    },
  ]);

  const [appointment, setAppointment] = useState([
    {
      date: "2024-05-25",
      time: "19:30:10",
      nutritionist_id: 2,
      user_id: 4,
    },
  ]);

  const handleTimeChange = (newValue) => {
    const formattedTime = Dayjs(newValue["$d"]).format("HH:mm:ss"); // Format before passing
    setTime(formattedTime);
  };

  const GetData = () => {
    AxiosInstance.get(`nutritionist/`)
      .then((res) => {
        setNutritionist(res.data);
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
          res.data.filter((data) => data.user_id === loggedInUser.user_id)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });
  };
  const [todayAppointment, setTodayAppointment] = useState();
  // <h2>No Scheduled Consultation </h2>
  const GetAppointmentData = () => {
    AxiosInstance.get(`appointment`)
      .then((res) => {
        // setAppointment(res.data);

        const temp = res.data.find(
          (appoint) =>
            loggedInUser.user_id === appoint.user_id &&
            Dayjs(initialValue).format("YYYY-MM-DD") === appoint.date
        );

        if (temp) {
          setTodayAppointment(
            <Box>
              {" "}
              <p>Aubrey</p>
              <p>Time: {temp.time}</p>
              <p>Dietitian: Bea</p>
              <center>
                <Link
                  to={{
                    pathname: "/telemedicine-consultation",

                    //  state: { data: myStateData },
                  }}
                  style={{
                    color: "#ffffff",
                  }}
                >
                  <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                    Go to Consultation
                  </Button>
                </Link>
              </center>
              <Link
                to="/telemedicine-consultation"
                style={{
                  color: "#ffffff",
                }}
              >
                <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                  Go to Consultation
                </Button>
              </Link>{" "}
            </Box>
          );
        } else {
          setTodayAppointment(<h2>No Scheduled Consultation </h2>);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", appointment);
      });
  };

  // const GetTodaysAgenda = () => {
  //   const tempAppoint = appointment.find(
  //     (appoint) =>
  //       loggedInUser.user_id === appoint.user_id &&
  //       Dayjs(initialValue).format("YYYY-MM-DD") === appoint.date
  //   );
  //   // setTodayAppointment(tempAppoint);
  //   console.log(tempAppoint);

  //   if (tempAppoint) {
  //     setTodayAppointment(
  //       <Box>
  //         {" "}
  //         <p>Aubrey</p>
  //         <p>Time: {tempAppoint.time}</p>
  //         <p>Dietitian: Bea</p>
  //         <center>
  //           <Link
  //             to="/telemedicine-consultation"
  //             style={{
  //               color: "#ffffff",
  //             }}
  //           >
  //             <Button sx={{ background: "#E66253", color: "#ffffff" }}>
  //               Go to Consultation
  //             </Button>
  //           </Link>
  //         </center>
  //         <Link
  //           to="/telemedicine-consultation"
  //           style={{
  //             color: "#ffffff",
  //           }}
  //         >
  //           <Button sx={{ background: "#E66253", color: "#ffffff" }}>
  //             Go to Consultation
  //           </Button>
  //         </Link>{" "}
  //       </Box>
  //     );
  //   } else {
  //     setTodayAppointment(<h2>No Scheduled Consultation </h2>);
  //   }
  // };
  useEffect(() => {
    GetAppointmentData();

    GetData();
  }, []);
  //!

  const socket = io.connect("http://localhost:5173");
  // * for video conferencing
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream);
  //       myVideo.current.srcObject = stream;
  //     });

  //   socket.on("me", (id) => {
  //     setMe(id);
  //     console.log("me nom", id);
  //   });

  //   socket.on("callUser", (data) => {
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     setName(data.name);
  //     setCallerSignal(data.signal);
  //   });
  // }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  //
  const [joined, setJoined] = useState(false);
  //

  const submitAppointment = () => {
    console.log(
      selectedDates.format("YYYY-MM-DD"),
      " ",
      selectedTime,
      " ",
      selectedNutritionist,
      " ",
      loggedInUser.user_id
    );
    try {
      AxiosInstance.post(`appointment/`, {
        date: selectedDates.format("YYYY-MM-DD"),
        time: selectedTime,
        user_id: loggedInUser.user_id,
        nutritionist_id: selectedNutritionist,
      }).then((res) => {
        console.log(res.data);
        handleClose();
        // navigate("/?success=registered");
      });
    } catch (error) {
      console.log(error.response.data);
    }

    try {
      AxiosInstance.post(`scheduledeck/`, {
        nutritionist_id: selectedNutritionist,
        time: selectedTime,
        date: selectedDates.format("YYYY-MM-DD"),
        type: "follow up",
      }).then((res) => {
        console.log(res.data);
        handleClose();
        // navigate("/?success=registered");
      });
    } catch (error) {
      console.log(error.response.data);
    }
    setTempNut(null);
    setSelectedDates(null);
    GetData();
  };

  const handleChangeTime = (e) => {
    console.log(e.target.value);

    const inputTime = dayjs(e.target.value, "h:mm A"); // Parse input time with format "h:mm A"
    const formattedTime = inputTime.format("HH:mm:ss"); // Format in 24-hour format with seconds

    // Add desired seconds (optional)
    // if (!formattedTime.includes(":10")) {
    //   formattedTime += ":10";
    // }

    console.log(formattedTime);
    setSelectedTime(formattedTime);
  };
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select a date"
          value={selectedDates}
          onChange={handleDateChanges}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableDate={disableUnavailableDates}
          minDate={dayjs()}
          //  open // Keep the calendar open
        />
      </LocalizationProvider> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Telemedicine Appointment"
          value={date1}
          onChange={handleDateChanges}
          renderInput={(params) => <TextField {...params} />} // Customize input (optional)
          renderDay={(date, value, callback) => (
            <button
              type="button"
              disabled={!isWeekdayAvailable(date)}
              onClick={() => (isDisabled ? null : callback(date))}
              style={{
                backgroundColor: isWeekdayAvailable(date) ? "inherit" : "#ddd",
              }}
            >
              {date.getDate()}
            </button>
          )}
        />
      </LocalizationProvider> */}
      {/* ANother try */}
      {/* {!joined && (
        <Link
          to="/telemedicine-consultation"
          style={{
            color: "#ffffff",
          }}
        >
          <button onClick={() => setJoined(true)}>Join Room</button>{" "}
        </Link>
      )} */}
      {joined && <VideoRoom />}
      {/*  */}
      {/* Video conferencing */}
      {/* <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button variant="contained" color="primary" startIcon={"copy"}>
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                {/* <PhoneIcon fontSize="large" /> 
                Call
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div> */}
      {/*  */}
      {/* <MainUserNavbar />
      <TeleMedNavBar /> */}
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "100%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <Box sx={{ flexGrow: 1, my: 3, color: "#99756E", mx: 5 }}>
        {" "}
        {/* // ! modify pa dito like what if walang appointment si user */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>My Scheduled Appointments</h2>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={date}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                onDayClick={() => handleDayClick()}
                renderDay={(day, value) => (
                  <Day
                    value={value}
                    onClick={() => {
                      handleDateChange(value);
                      //  handleOpenPopup(); // Open popup on date click
                    }}
                  />
                )}
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
            </LocalizationProvider> */}
            {/* {DateModal} */}

            {/* //! Calendar */}
            <div
              className="calendar-app"
              style={{ backgroundColor: "#f5f5f5" }}
            >
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
                hii
                {modalDayContent}
              </Box>
            </Modal>

            {/* // ! add calendar */}
            <Button
              onClick={handleOpen}
              sx={{
                background: "#E66253",
                color: "#ffffff",
                mx: 10,

                my: 5,
                px: 5,
                py: 1,
                fontSize: 20,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
            >
              Book a Consultation
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={style}>
                  <Grid container spacing={2}>
                    <Grid xs={7}>
                      <center>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          sx={{ mt: 3 }}
                        >
                          Book a Consultation with a Nutritionist
                        </Typography>
                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Nutritionist
                        </Typography> */}
                      </center>
                      {/* <MySelectField
                    label="Nutritionist"
                    name="nutritionist"
                    control={control}
                    width={"30%"}
                    options={nutritionist}
                  /> */}

                      <br />
                      <br />

                      <Grid container spacing={2}>
                        <Grid xs={0}>
                          {" "}
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ background: "#ffffff" }}
                                // defaultValue={initialValue}
                                onChange={(e) =>
                                  setDate(Dayjs(e["$d"]).format("YYYY-MM-DD"))
                                }
                                name="selectedDate"
                              />
                            </LocalizationProvider> */}
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Select a date"
                                value={selectedDates}
                                onChange={handleDateChanges}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                shouldDisableDate={disableUnavailableDates}
                                minDate={dayjs()}
                                //  open // Keep the calendar open
                              />
                            </LocalizationProvider> */}
                          </Typography>
                        </Grid>
                        <Typography sx={{ ml: 9 }}> Nutritionist</Typography>
                        <Grid xs={12}>
                          <center>
                            <FormControl
                              variant="standard"
                              sx={{ width: "70%", background: "#ffffff" }}
                            >
                              <InputLabel id="demo-simple-select-filled-label">
                                Nutritionist
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={selectedNutritionist}
                                onChange={handleChange}
                                name="nutritionist"
                              >
                                {nutritionist.map((option) => (
                                  <MenuItem
                                    key={option.nutritionist_id}
                                    value={option.nutritionist_id}
                                  >
                                    {option.first_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </center>
                          {/* <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            Time of Consultation
                          </Typography>
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
                                onChange={(e) =>
                                  setTime(Dayjs(e["$d"]).format("HH:mm:ss"))
                                }
                                // onChange={(e) => handleTimeChange(e)}
                                sx={{ background: "#ffffff" }}
                                name="selectedTime"
                              />
                            </DemoContainer>
                          </LocalizationProvider> */}
                        </Grid>
                        <Button
                          variant="contained"
                          sx={{
                            float: "right",
                            mx: "auto",
                            display: "block",
                            background: "#ffffff",
                            color: "#E66253",
                            fontSize: "20px",
                            borderRadius: 5,
                            mt: 10,
                            "&:hover": {
                              backgroundColor: "#E66253",
                              color: "#ffffff",
                              border: 1,
                              borderColor: "#ffffff",
                            },
                          }}
                          onClick={submitAppointment}
                        >
                          Submit
                        </Button>{" "}
                      </Grid>

                      {/* <Button onClick={submission}>Book</Button> */}
                    </Grid>
                    <Grid xs={5}>
                      {/* {nutritionistInformation} */}{" "}
                      <center>
                        <img
                          src={tempNut?.image || "/images/Rectangle 355.png"}
                          style={{ background: "#ffffff" }}
                        />{" "}
                        <br />
                        Name: {tempNut?.first_name} {tempNut?.last_name}
                      </center>
                      <br />
                      <br />
                      <Grid container spacing={2}>
                        <Grid xs={6}>
                          Days:{" "}
                          {tempNut?.schedule_day.map((item) => (
                            <div>{item}</div>
                          ))}
                        </Grid>
                        <Grid xs={6}>
                          {" "}
                          Time{" "}
                          {tempNut?.schedule_time.map((item) => (
                            <div>{item}</div>
                          ))}
                        </Grid>
                      </Grid>
                      <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {selectedDates ? (
                          <>
                            <Typography sx={{ mb: 1 }}>
                              Select a Date
                            </Typography>
                            <DatePicker
                              label="Select a date"
                              defaultValues={null}
                              value={selectedDates}
                              onChange={handleDateChanges}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              shouldDisableDate={disableUnavailableDates}
                              minDate={dayjs()}
                              //  open // Keep the calendar open
                            />
                            <Typography sx={{ mb: 1 }}>Select Time</Typography>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              // value={selectedNutritionist}
                              onChange={handleChangeTime}
                              name="type"
                              width="full"
                              //  {...register("type")}
                              //  error={errors.type ? true : false}
                            >
                              {freeTime?.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Modal>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <h2>Today's Agenda</h2>
            <Box
              sx={{
                border: 1,
                borderColor: "#E66253",
                px: 5,
                borderRadius: 4,
                py: "30px",
                mr: "150px",
              }}
            >
              {todayAppointment}
              {/* <h2>No Scheduled Consultation </h2>
              <p>Aubrey</p>
              <p>Time: {todayAppointment.time}</p>
              <p>Dietitian: Bea</p>

              <center>
                <Link
                  to="/telemedicine-consultation"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                    Go to Consultation
                  </Button>
                </Link>
              </center>

              <Link
                to="/telemedicine-consultation"
                style={{
                  color: "#ffffff",
                }}
              >
                <Button sx={{ background: "#E66253", color: "#ffffff" }}>
                  Go to Consultation
                </Button>
              </Link> */}
            </Box>
            <center>
              {/* <Link
                to="/telemedicine-messages"
                style={{
                  color: "#ffffff",
                }}
              >
                <Button
                  sx={{
                    background: "#E66253",
                    color: "#ffffff",
                    my: 5,
                    px: 5,
                    py: 1,
                    fontSize: 20,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#E66253",
                      border: 1,
                      borderColor: "#E66253",
                    },
                  }}
                >
                  <img src="/images/messages.png" width="30px" height="30px" />{" "}
                  &nbsp; Messages
                </Button>
              </Link> */}
            </center>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TelemedicineHome;
