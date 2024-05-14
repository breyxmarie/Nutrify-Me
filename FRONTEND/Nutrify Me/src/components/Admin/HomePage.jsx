import { Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation } from "react-router-dom";

function HomePage() {
  const users = [
    { patientId: "01", username: "juandelacruz" },
    { patientId: "02", username: "juandelacruz" },
    { patientId: "03", username: "juandelacruz" },
    { patientId: "04", username: "juandelacruz" },
  ];

  const dietician = [
    { dieticianId: "01", username: "juandelacruz" },
    { dieticianId: "02", username: "juandelacruz" },
    { dieticianId: "03", username: "juandelacruz" },
    { dieticianId: "04", username: "juandelacruz" },
  ];
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#99756E",
      }}
    >
      <Box
        sx={{
          border: 2,
          borderRadius: 4,
          py: 5,
          mx: "7%",
          borderColor: "#898246",
        }}
      >
        <Grid container spacing={2} sx={{ color: "#99756E" }}>
          <Grid xs={6} sx={{ mx: 0 }}>
            <Typography
              sx={{
                color: "#99756E",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "30px",
                mx: "70px",
              }}
            >
              Good Morning, <br /> Admin!
            </Typography>
          </Grid>

          <Grid xs={6} sx={{ float: "right" }}>
            Date Today
          </Grid>
        </Grid>
      </Box>

      <Typography
        sx={{
          textAlign: "left",
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        MANAGE PATIENTS
      </Typography>

      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
        </Grid>
        <hr />

        {users.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.patientId}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: " #898246",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#898246",
                    border: 0.5,
                    borderColor: "#898246",
                  },
                }}
              >
                EDIT
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
              >
                DEACTIVATE
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Link to="/admin-patients" sx={{ mx: "30px" }}>
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            px: 4,
            my: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          VIEW MORE
        </Button>
      </Link>

      <Typography
        sx={{
          textAlign: "left",
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        DIETICIAN VERIFICATION
      </Typography>

      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
          <Grid xs={3}>License</Grid>
        </Grid>
        <hr />

        {dietician.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.dieticianId}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: "#616161",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#616161",
                    border: 0.5,
                    borderColor: "#616161",
                  },
                }}
              >
                VIEW
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: "#898246",

                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#898246",
                    border: 0.5,
                    borderColor: "#898246",
                  },
                }}
              >
                VERIFY
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Link to="/admin-dietician" sx={{ mx: "30px" }}>
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            px: 4,
            my: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          VIEW MORE
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
