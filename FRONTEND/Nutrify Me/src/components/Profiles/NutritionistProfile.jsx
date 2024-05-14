import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function NutritionistProfile() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {" "}
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
      </Button>
    </div>
  );
}

export default NutritionistProfile;
