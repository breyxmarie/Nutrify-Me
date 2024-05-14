import { Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation } from "react-router-dom";
import * as React from "react";
import Modal from "@mui/material/Modal";

function Dietician() {
  const dietician = [
    {
      dieticianId: "01",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "02",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "03",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "04",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "01",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "02",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "03",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "04",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "01",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "02",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "03",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "04",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "01",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "02",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
    {
      dieticianId: "03",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",

      age: 30,
    },
    {
      dieticianId: "04",
      username: "juandelacruz",
      name: "random",
      gender: "Female",
      birthday: "12/24/1990",
      license: "/images/snacks.png",
      age: 30,
    },
  ];

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

  // * modal content
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectDietician, setSelectDietician] = useState(null);

  const handleDietician = (dietician) => {
    setSelectDietician(dietician);
    console.log(selectDietician);
    handleOpen();
  };

  const modalContent = (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          {" "}
          <img src="/images/verification.png" />
        </Grid>
        <Grid xs={8}>Nutrionist Verification</Grid>
        <Grid xs={2}>
          <Button sx={{ float: "right" }} onClick={handleClose}>
            <img src="/images/close.png" height="10" weight="10" />
          </Button>
        </Grid>
      </Grid>
      <Typography>Name: {selectDietician?.name}</Typography>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2}>Age: {selectDietician?.age}</Grid>
        <Grid xs={4}>Gender: {selectDietician?.gender}</Grid>
        <Grid xs={6}>Birthday: {selectDietician?.birthday}</Grid>
      </Grid>
      License: <br />
      <img src={selectDietician?.license} />
      <br />
      <Button
        sx={{
          background: "#FFFFFF",

          color: "#E66253",
          px: 4,
          "&:hover": {
            backgroundColor: "#E66253",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
      >
        APPROVE
      </Button>
    </Box>
  );
  //*

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
      {" "}
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
                onClick={() => handleDietician(item)}
              >
                VERIFY
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>{modalContent}</Box>
              </Modal>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
}

export default Dietician;
