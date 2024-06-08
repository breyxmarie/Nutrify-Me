import { useState, useEffect } from "react";
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
import Calendar from "react-calendar";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import "./style.css";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import dayjs from "dayjs";

function FoodJournalHome() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  //! get data

  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [journalEntry, setJournalEntry] = useState([]);
  const [foodEntry, setFoodEntry] = useState([]);

  const getJournalData = async (day) => {
    await AxiosInstance.get(`journalentry`).then((res) => {
      setJournalEntry(
        res.data.filter(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )
      );
      console.log(
        res.data.filter(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )
      );

      try {
        getfoodEntryData(
          res.data.filter((item) => item.date == day)[0].journal_id
        );
      } catch {
        setFoodEntry([]);
      }
    });
  };

  const getfoodEntryData = (id) => {
    AxiosInstance.get(`foodentry`).then((res) => {
      setFoodEntry(res.data.filter((item) => item.journal_id == id));
      setCarbs(
        res.data
          .filter((item) => item.journal_id == id)
          .reduce((acc, item) => acc + item.carbs, 0)
      );
      setProtein(
        res.data
          .filter((item) => item.journal_id == id)
          .reduce((acc, item) => acc + item.protein, 0)
      );
      setFat(
        res.data
          .filter((item) => item.journal_id == id)
          .reduce((acc, item) => acc + item.fat, 0)
      );
      const temp = res.data
        .filter((item) => item.journal_id == id)
        .reduce((acc, item) => acc + item.calories, 0);
      console.log(temp);
      setCalories((temp / 1200) * 100);
    });
  };

  useEffect(() => {
    getJournalData(dayjs().format("YYYY-MM-DD"));
    console.log(journalEntry);
  }, []);

  useEffect(() => {
    //getfoodEntryData(journalEntry.journal_id);
    console.log(foodEntry);
  }, [journalEntry]);
  //!

  //! try
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [nums, setNums] = useState("test");

  const onChange = async (newDate) => {
    setIsLoading(true);
    // Fetch or update dates based on newDate
    // ...

    // Simulate loading delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

    setIsLoading(false);
    setDate(newDate);
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };
  //!

  //! weekly trial
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div> */}
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              // const day = format(cloneDay);
              const dayStr = format(cloneDay, "yyyy-MM-dd");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            prev week
          </div>
        </div>
        <div>{currentWeek}</div>
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
    );
  };

  const showDetailsHandle = (dayStr) => {
    // Your logic for handling date details
    console.log("Date details:", dayStr);
    // setJournalEntries();
    setNums("change");

    getJournalData(dayStr);
  };
  //!
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#898246" : "#308fe8",
    },
  }));

  // array for food

  const meals = [
    { type: "Breakfast", meal: "Egg Omelette1", calories: "375" },
    { type: "Lunch", meal: "Egg Omelette2", calories: "375" },
    { type: "Snack", meal: "Egg Omelette3", calories: "375" },
    { type: "Dinner", meal: "Egg Omelette4", calories: "375" },
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
      <Typography>{selectedMeal?.food}</Typography>
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

  const [details, setDetails] = useState();
  // <Box>
  //   <Box>Date</Box>
  //   <Box
  //     sx={{
  //       borderRadius: 0,
  //       background: "#898246",
  //       color: "#ffffff",
  //       display: "inline-block",
  //       justifyItems: "right",
  //       p: 5,
  //     }}
  //   >
  //     {" "}
  //     <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
  //       <img src="images/fire.png" /> Today's Food Intake
  //     </Typography>
  //     <br />
  //     <Box
  //       sx={{
  //         background: "#ffffff",
  //         color: "#898246",
  //         mx: "20px",
  //         borderRadius: 2,
  //       }}
  //     >
  //       Calories
  //       <BorderLinearProgress variant="determinate" value={70} />
  //     </Box>
  //     <br />
  //     <br />
  //     <Grid container spacing={2}>
  //       <Grid xs={4} sx={{ borderRadius: 5 }}>
  //         CARBS{" "}
  //         <Box
  //           sx={{
  //             background: "#ffffff",
  //             color: "#898246",
  //             borderRadius: 2,
  //             mx: 5,
  //           }}
  //         >
  //           31g
  //         </Box>
  //       </Grid>
  //       <Grid xs={4}>
  //         PROTEIN{" "}
  //         <Box
  //           sx={{
  //             background: "#ffffff",
  //             color: "#E66253",
  //             borderRadius: 2,
  //             mx: 5,
  //           }}
  //         >
  //           31g
  //         </Box>
  //       </Grid>
  //       <Grid xs={4}>
  //         FATS{" "}
  //         <Box
  //           sx={{
  //             background: "#ffffff",
  //             color: "#898246",
  //             borderRadius: 2,
  //             mx: 5,
  //           }}
  //         >
  //           31g
  //         </Box>
  //       </Grid>
  //     </Grid>
  //   </Box>

  //   <br />
  //   <br />
  //   <br />

  //   <br />

  //   <Grid container spacing={2}>
  //     <Grid xs={6}>Meal Plan: </Grid>
  //     <Grid xs={6}>
  //       <Button
  //         sx={{
  //           background: "#E66253",
  //           borderRadius: 3,
  //           color: "#ffffff",
  //           px: 5,
  //         }}
  //         onClick={handleOpen}
  //       >
  //         + NEW JOURNAL ENTRY
  //       </Button>

  //       <Modal
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="modal-modal-title"
  //         aria-describedby="modal-modal-description"
  //       >
  //         <Box sx={style}>
  //           <Grid container spacing={2}>
  //             <Grid xs={2}>
  //               {" "}
  //               <img src="/images/food journal icon.png" />
  //             </Grid>
  //             <Grid xs={8}>New Food Journal Entry</Grid>
  //             <Grid xs={2}>
  //               <Button sx={{ float: "right" }} onClick={handleClose}>
  //                 <img src="/images/close.png" height="10" weight="10" />
  //               </Button>
  //             </Grid>
  //           </Grid>
  //           <Grid container spacing={2}>
  //             <Grid xs={6}>
  //               Type of Meal
  //               <br />
  //               <Select
  //                 labelId="demo-simple-select-filled-label"
  //                 id="demo-simple-select-filled"
  //                 // value={value}
  //                 // onChange={onChange}
  //                 // error={!!error}
  //               >
  //                 {options.map((option) => (
  //                   <MenuItem value={option.id}>{option.name}</MenuItem>
  //                 ))}
  //               </Select>
  //             </Grid>
  //             <Grid xs={6}>
  //               {" "}
  //               Date ofEntry <br />
  //               <LocalizationProvider dateAdapter={AdapterDayjs}>
  //                 <DatePicker sx={{ background: "#ffffff" }} />
  //               </LocalizationProvider>
  //             </Grid>
  //           </Grid>
  //           Meal Plan: <br />
  //           <Select
  //             labelId="demo-simple-select-filled-label"
  //             id="demo-simple-select-filled"
  //             // value={value}
  //             // onChange={onChange}
  //             // error={!!error}
  //           >
  //             {options.map((option) => (
  //               <MenuItem value={option.id}>{option.name}</MenuItem>
  //             ))}
  //           </Select>
  //           <br />
  //           Food Eaten:
  //           <br />
  //           <Select
  //             labelId="demo-simple-select-filled-label"
  //             id="demo-simple-select-filled"
  //             // value={value}
  //             // onChange={onChange}
  //             // error={!!error}
  //           >
  //             {options.map((option) => (
  //               <MenuItem value={option.id}>{option.name}</MenuItem>
  //             ))}
  //           </Select>
  //           <br />
  //           <Button
  //             sx={{
  //               background: "#ffffff",
  //               color: "#E66253",
  //               backgroundRadius: 10,
  //             }}
  //           >
  //             SUBMIT
  //           </Button>
  //         </Box>
  //       </Modal>
  //     </Grid>
  //   </Grid>

  //   <br />
  //   <br />

  //   <br />

  //   <br />

  //   <br />

  //   {meals.map((meal, index) => (
  //     <Grid container spacing={2} sx={{ mb: "60px" }}>
  //       <Grid xs={4}>
  //         <img src={getMealPic(index)} height="100px" />
  //       </Grid>
  //       <Grid xs={6}>
  //         {meal.type}
  //         <br />
  //         <br />
  //         <br />
  //         <br />

  //         {meal.meal}
  //       </Grid>
  //       <Grid xs={2}>
  //         <Button
  //           sx={{ color: "#E66253", textDecoration: "underline" }}
  //           onClick={() => handleSelectMeal(meal)}
  //         >
  //           View Details{" "}
  //         </Button>

  //         <Modal
  //           open={opens}
  //           onClose={handleCloses}
  //           aria-labelledby="modal-modal-title"
  //           aria-describedby="modal-modal-description"
  //         >
  //           <Box sx={styles}>
  //             <Grid container spacing={2}>
  //               <Grid xs={2}>
  //                 {" "}
  //                 <img src="/images/food journal icon.png" />
  //               </Grid>
  //               <Grid xs={8}>[Date]</Grid>
  //               <Grid xs={2}>
  //                 <Button
  //                   key={index}
  //                   sx={{ float: "right" }}
  //                   onClick={() => handleClose()}
  //                 >
  //                   <img src="/images/close.png" height="10" weight="10" />
  //                 </Button>
  //               </Grid>
  //             </Grid>
  //             {modalContent}
  //           </Box>
  //         </Modal>
  //       </Grid>
  //     </Grid>
  //   ))}
  // </Box>

  const newJournalModal = () => {
    return (
      <Box>
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
    );
  };

  const setJournalEntries = () => {
    const nums = "test";
    setDetails(
      <Box>
        <Box>Date</Box>
        {nums}
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
            {/* {newJournalModal} */}
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
        {/* {newJournalModal} */}
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
    );
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "20px",
        color: "#000000",
      }}
    >
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
              Date of Entry <br />
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
      {/* //! modal for details */}
      {/* <Modal
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
      </Modal> */}
      {/*  //! */}
      <div className="calendar-app">
        <div className="day-labels">{/* Days of the week */}</div>
        <Calendar
          onChange={onChange}
          value={date}
          className={isLoading ? "loading" : ""}
        />
        {isPopupVisible && (
          <div className="popup">
            <h3>Date: {date.toLocaleDateString()}</h3>
            {/* Your specific popup content here */}
            <button onClick={handlePopupClose}>Close</button>
          </div>
        )}
      </div>
      //! weekly
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}
      </div>
      //!
      {details}
      <Box>Date</Box>
      {foodEntry.length > 0 ? (
        <Box
          sx={{
            borderRadius: 0,
            background: "#898246",
            color: "#ffffff",
            display: "inline-block",
            justifyItems: "right",
            p: 5,
            width: "100%",
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
              p: 4,
            }}
          >
            Calories
            <BorderLinearProgress variant="determinate" value={calories} />
          </Box>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid xs={4} sx={{ borderRadius: 5 }}>
              {nums}
              CARBS{" "}
              <Box
                sx={{
                  background: "#ffffff",
                  color: "#898246",
                  borderRadius: 2,
                  mx: 5,
                }}
              >
                {carbs}g
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
                {protein} g
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
                {fat} g
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>You haven't added any food entries yet.</div>
      )}
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid xs={6}> </Grid>
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
      {foodEntry.length > 0 ? (
        foodEntry.map((meal, index) => (
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

              {meal.food}
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
        ))
      ) : (
        <div>You haven't added any food entries yet.</div>
      )}
    </div>
  );
}

export default FoodJournalHome;
