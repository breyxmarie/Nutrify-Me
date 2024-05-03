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
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { NavLink, Link, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
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
  //codes for consultation pop up in selecting nutritionist

  const options = [
    { id: "", name: "None" },
    { id: "Open", name: "Beatriz" },
    { id: "In Progress", name: "Mary" },
    { id: "Completed", name: "Marie" },
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
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {/* ANother try */}
      {!joined && (
        <Link
          to="/telemedicine-consultation"
          style={{
            color: "#ffffff",
          }}
        >
          <button onClick={() => setJoined(true)}>Join Room</button>{" "}
        </Link>
      )}

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
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
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Book a Consultation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Nutritionist
                </Typography>
                <FormControl
                  variant="standard"
                  sx={{ width: "70%", background: "#ffffff" }}
                >
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={value}
                    // onChange={onChange}
                    // error={!!error}
                  >
                    {options.map((option) => (
                      <MenuItem value={option.id}>{option.name}</MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText sx={{ color: "#d32f2f" }}>
                    {error?.message}
                  </FormHelperText> */}
                </FormControl>
                <br />
                <br />

                <Grid container spacing={2}>
                  <Grid xs={6}>
                    {" "}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Date of Consultation <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ background: "#ffffff" }} />
                      </LocalizationProvider>
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    {" "}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Time of Consultation
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="With Time Clock"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          sx={{ background: "#ffffff" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Button onClick={handleClose}>Book</Button>
              </Box>
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
              <h2>No Scheduled Consultation </h2>
              {/* <p>Aubrey</p>
              <p>Time: 10:20 pm</p>
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
              </center> */}

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
            </Box>
            <center>
              <Link
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
                  }}
                >
                  <img src="/images/messages.png" width="30px" height="30px" />{" "}
                  &nbsp; Messages
                </Button>
              </Link>
            </center>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TelemedicineHome;
