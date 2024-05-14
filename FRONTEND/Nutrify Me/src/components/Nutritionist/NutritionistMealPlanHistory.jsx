import { useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

function NutritionistMealPlanHistory() {
  // * edit meal plans modal

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
  //*

  // * modal content
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
    console.log(selectedMeal);
    handleOpen();
  };

  const mealType = [
    { id: "Breakfast", name: "Breakfast" },
    { id: "Lunch", name: "Lunch" },
    { id: "Snacks", name: "Snacks" },
    { id: "Dinner", name: "Dinner" },
  ];

  const modalContent = (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          {" "}
          <img src="/images/food journal icon.png" />
        </Grid>
        <Grid xs={8}>Edit Meal Plan</Grid>
        <Grid xs={2}>
          <Button sx={{ float: "right" }} onClick={handleClose}>
            <img src="/images/close.png" height="10" weight="10" />
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid xs={6}>
          Type of Meal: <br />
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
          >
            {mealType.map((option) => (
              <MenuItem value={option.id}>{option.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={6}>
          Date of Entry: {selectedMeal?.type} <br />
          Time: {selectedMeal?.time}
        </Grid>
      </Grid>
      <Typography>Meal Plan</Typography> <br />
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
      >
        {mealType.map((option) => (
          <MenuItem value={option.id}>{option.name}</MenuItem>
        ))}
      </Select>
      <Typography>
        Food
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid xs={2}> [Food]</Grid>
          <Grid xs={2}>
            <img src="/images/arrow.png" />
          </Grid>
          <Grid xs={5}>
            {" "}
            <TextField
              sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Type here"
              name="email"
            />
          </Grid>
          <Grid xs={3}>
            <Button>OK</Button>
          </Grid>
        </Grid>
      </Typography>
      <br />
      <Box sx={{ background: "#ffffff", color: "#E66253", py: "8px" }}>
        <center>
          <Typography sx={{ fontWeight: "bold" }}>[Meal Plan]</Typography>
        </center>
        <br />
        <Box sx={{ mx: 13, my: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ my: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>Breakfast</Typography>
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Type here"
                name="email"
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mx: 13, my: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ my: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>Lunch</Typography>
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Type here"
                name="email"
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mx: 13, my: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ my: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>Snack</Typography>
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Type here"
                name="email"
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mx: 13, my: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ my: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>Dinner</Typography>
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Type here"
                name="email"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <center>
        <Button
          sx={{
            background: "#ffffff",
            color: "#E66253",
            borderRadius: 5,
            fontSize: "20px",
            fontWeight: "bold",
            px: "60px",
          }}
        >
          DONE
        </Button>
      </center>
    </Box>
  );
  // *

  const meals = [
    {
      username: "name",
      mealPlan: "plan",
      date: "5/10/2024",
      time: "10:00 pm",
      image: "/images/food.png",
    },
    {
      username: "name",
      mealPlan: "plan1",
      date: "5/10/2024",
      time: "10:00 pm",
      image: "/images/food.png",
    },
    {
      username: "name",
      mealPlan: "plan2",
      date: "5/10/2024",
      time: "10:00 pm",
      image: "/images/food.png",
    },
    {
      username: "name",
      mealPlan: "plan3",
      date: "5/10/2024",
      time: "10:00 pm",
      image: "/images/food.png",
    },
    {
      username: "name",
      mealPlan: "plan4",
      date: "5/10/2024",
      time: "10:00 pm",
      image: "/images/food.png",
    },
  ];

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
        color: "#000000",
      }}
    >
      <Typography>User's Meal Plan History</Typography>

      {meals.map((item, index) => (
        <Box sx={{ mx: "10%", border: 1, borderRadius: 5, mb: "20px" }}>
          <Grid container spacing={0}>
            <Grid xs={4}>
              <img src={item.image} />
            </Grid>
            <Grid xs={8}>
              <Typography>
                {" "}
                {item.username} - {item.mealPlan} <br />
              </Typography>
              <Typography>
                {item.date}, {item.time} <br />
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                sx={{ background: "#E66253", color: "#ffffff" }}
                onClick={() => handleSelectMeal(item)}
              >
                EDIT
              </Button>

              {/* //* Modal for Edit Meal Details */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid container spacing={2}>
                    <Grid xs={2}>
                      {" "}
                      <img src="/images/food journal icon.png" />
                    </Grid>
                    <Grid xs={8}>Edit Meal Plan</Grid>
                    <Grid xs={2}>
                      <Button sx={{ float: "right" }} onClick={handleClose}>
                        <img src="/images/close.png" height="10" weight="10" />
                      </Button>
                    </Grid>
                  </Grid>
                  {modalContent}
                </Box>
              </Modal>
              {/*  */}
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

export default NutritionistMealPlanHistory;
