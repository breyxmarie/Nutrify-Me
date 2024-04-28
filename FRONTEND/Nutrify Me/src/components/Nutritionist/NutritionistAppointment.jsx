import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation } from "react-router-dom";

function NutritionistAppointment() {
  const [joined, setJoined] = useState(false);
  const appointments = [
    {
      name: "Aubrey",
      kind: "New Patient",
      Date: "April 27, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "April 27, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "April 27, 2024",
      Time: "2:00 PM",
    },
    {
      name: "John",
      kind: "New Patient",
      Date: "April 27, 2024",
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
            <Typography>April 27, 2023</Typography>

            <Typography>Date of Appointment</Typography>
            <Typography>April 27, 2023</Typography>

            <Button>Call</Button> */}

            <h2>No Scheduled Consultation </h2>

            {!joined && (
              <Link
                to="/nutritionist-consultation"
                style={{
                  color: "#ffffff",
                }}
              >
                <button onClick={() => setJoined(true)}>Join Room</button>{" "}
              </Link>
            )}

            {joined && <VideoRoom />}
          </Box>
        </Grid>
        <Grid xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Box>
        Schedule of Appointments
        <br />
        <br />
        <Grid container spacing={2}>
          {appointments.map((item, index) => (
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
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid xs={6}>
                  <Box
                    sx={{
                      borderRadius: 5,
                      background: "#898246",
                      color: "#ffffff",
                    }}
                  >
                    {item.kind}
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid xs={6}>
                  Date <br /> {item.Date}
                </Grid>
                <Grid xs={6}>
                  Time <br /> {item.Time}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default NutritionistAppointment;
