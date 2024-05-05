import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

function UserProfile() {
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

        <Button sx={{ color: "#539801", border: 1, fontWeight: "bold" }}>
          EDIT
        </Button>
      </center>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{}}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", alignText: "left" }}
          >
            Name:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E" }}>Mary See</Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button sx={{ color: "#539801", border: 1, fontWeight: "bold" }}>
            EDIT
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{}}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", alignText: "left" }}
          >
            Address:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E" }}>
            145 Espana St., Manila, Philippines
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button sx={{ color: "#539801", border: 1, fontWeight: "bold" }}>
            EDIT
          </Button>
        </Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ alignText: "left" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", alignText: "left" }}
          >
            Passowrd:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E" }}>******</Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button sx={{ color: "#539801", border: 1, fontWeight: "bold" }}>
            EDIT
          </Button>
        </Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{}}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", alignText: "left" }}
          >
            E-mail:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E" }}>********@gmail.com</Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Button sx={{ color: "#539801", border: 1, fontWeight: "bold" }}>
            EDIT
          </Button>
        </Grid>
      </Grid>
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
        }}
      >
        DEACTIVATE ACCOUNT
      </Button>
      <br />
      <br />
      <br />
      <Button sx={{ color: "#B3B3B3", border: 1, fontWeight: "bold", px: 5 }}>
        {" "}
        LOG OUT
      </Button>
    </div>
  );
}

export default UserProfile;
