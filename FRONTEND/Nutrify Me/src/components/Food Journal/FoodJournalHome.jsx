import { useState } from "react";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function FoodJournalHome() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  // array for food

  const meals = [
    { type: "Breakfast", meal: "Egg Omelette", calories: "375" },
    { type: "Lunch", meal: "Egg Omelette", calories: "375" },
    { type: "Snack", meal: "Egg Omelette", calories: "375" },
    { type: "Dinner", meal: "Egg Omelette", calories: "375" },
  ];
  //

  // * New Journal Entry
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

  //* open view details
  const [opens, setOpens] = React.useState(false);
  const handleOpens = (meals) => setOpens(true);
  const handleCloses = () => setOpens(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const modalContent = (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          {" "}
          <img src="/images/food journal icon.png" />
        </Grid>
        <Grid xs={8}>[Date]</Grid>
        <Grid xs={2}>
          <Button sx={{ float: "right" }} onClick={handleCloses}>
            <img src="/images/close.png" height="10" weight="10" />
          </Button>
        </Grid>
      </Grid>

      <Typography>Type of Meal</Typography>
      <Typography>{selectedMeal?.type}</Typography>
      <Typography>Meal Plan</Typography>
      <Typography>{selectedMeal?.meal}</Typography>
      <Typography>Calories</Typography>
      <Typography>{selectedMeal?.calories}</Typography>
    </Box>
  );
  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
    console.log(selectedMeal);
    handleOpens();
  };
  const styles = {
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

  const options = [
    { id: "Breakfast", name: "Breakfast" },
    { id: "Lunch", name: "Lunch" },
    { id: "Snacks", name: "Snacks" },
    { id: "Dinner", name: "Dinner" },
  ];

  function getMealPic(type) {
    switch (type) {
      case 0:
        return "/images/breakfast.png";
      case 1:
        return "/images/lunch.png";
      case 2:
        return "/images/snacks.png";
      case 3:
        return "/images/dinner.png";
    }
  }
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
      <Box>Date</Box>
      <Box>
        <Box
          sx={{
            borderRadius: 0,
            background: "#898246",
            color: "#ffffff",
            display: "inline-block",
            justifyItems: "right",
            p: 5,
          }}
        >
          {" "}
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            <img src="images/fire.png" /> Today's Food Intake
          </Typography>
          <br />
          <Box
            sx={{
              background: "#ffffff",
              color: "#898246",
              mx: "20px",
              borderRadius: 2,
            }}
          >
            Calories
            <BorderLinearProgress variant="determinate" value={70} />
          </Box>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid xs={4} sx={{ borderRadius: 5 }}>
              CARBS{" "}
              <Box
                sx={{
                  background: "#ffffff",
                  color: "#898246",
                  borderRadius: 2,
                  mx: 5,
                }}
              >
                31g
              </Box>
            </Grid>
            <Grid xs={4}>
              PROTEIN{" "}
              <Box
                sx={{
                  background: "#ffffff",
                  color: "#E66253",
                  borderRadius: 2,
                  mx: 5,
                }}
              >
                31g
              </Box>
            </Grid>
            <Grid xs={4}>
              FATS{" "}
              <Box
                sx={{
                  background: "#ffffff",
                  color: "#898246",
                  borderRadius: 2,
                  mx: 5,
                }}
              >
                31g
              </Box>
            </Grid>
          </Grid>
        </Box>

        <br />
        <br />
        <br />

        <br />

        <Grid container spacing={2}>
          <Grid xs={6}>Meal Plan: </Grid>
          <Grid xs={6}>
            <Button
              sx={{
                background: "#E66253",
                borderRadius: 3,
                color: "#ffffff",
                px: 5,
              }}
              onClick={handleOpen}
            >
              + NEW JOURNAL ENTRY
            </Button>

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
                  <Grid xs={8}>New Food Journal Entry</Grid>
                  <Grid xs={2}>
                    <Button sx={{ float: "right" }} onClick={handleClose}>
                      <img src="/images/close.png" height="10" weight="10" />
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    Type of Meal
                    <br />
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
                  </Grid>
                  <Grid xs={6}>
                    {" "}
                    Date ofEntry <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ background: "#ffffff" }} />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                Meal Plan: <br />
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
                <br />
                Food Eaten:
                <br />
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
                <br />
                <Button
                  sx={{
                    background: "#ffffff",
                    color: "#E66253",
                    backgroundRadius: 10,
                  }}
                >
                  SUBMIT
                </Button>
              </Box>
            </Modal>
          </Grid>
        </Grid>

        <br />
        <br />

        <br />

        <br />

        <br />

        {meals.map((meal, index) => (
          <Grid container spacing={2} sx={{ mb: "60px" }}>
            <Grid xs={4}>
              <img src={getMealPic(index)} height="100px" />
            </Grid>
            <Grid xs={6}>
              {meal.type}
              <br />
              <br />
              <br />
              <br />

              {meal.meal}
            </Grid>
            <Grid xs={2}>
              <Button
                sx={{ color: "#E66253", textDecoration: "underline" }}
                onClick={() => handleSelectMeal(meal)}
              >
                View Details{" "}
              </Button>

              <Modal
                open={opens}
                onClose={handleCloses}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styles}>
                  <Grid container spacing={2}>
                    <Grid xs={2}>
                      {" "}
                      <img src="/images/food journal icon.png" />
                    </Grid>
                    <Grid xs={8}>[Date]</Grid>
                    <Grid xs={2}>
                      <Button
                        key={index}
                        sx={{ float: "right" }}
                        onClick={() => handleClose()}
                      >
                        <img src="/images/close.png" height="10" weight="10" />
                      </Button>
                    </Grid>
                  </Grid>
                  {modalContent}
                </Box>
              </Modal>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
}

export default FoodJournalHome;
