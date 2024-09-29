import { useState, useEffect, useContext } from "react";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Tab, Tabs } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Calendar from "react-calendar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
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
//import styles from "./style.css";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import dayjs from "dayjs";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";

function FoodJournalHome() {
  //! tabs
  const [forceRender, setForceRender] = useState(0);  // Initialize a dummy state
  const [selectedMealPlan, setSelectedMealPlan] = useState();
  const [finalMealPlan, setFinalMealPlan] = useState(); //!
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newActiveTab) => {
    console.log(newActiveTab);
    setActiveTab(newActiveTab);
  };

  //! loading
  const [loading1, setLoading1] = useState(false);
  //!
  const tabContent = [
    {
      title: "No Meal Plan",
      content: <Box></Box>,
    },
    {
      title: "Choose Meal Plan",
      content: <Box>{/* <Typography>Choose Meal Plan </Typography> */}</Box>,
    },
  ];

  const planChoices = [
    "Meal Plans by Nutritionist",
    "Generated Meal Plans",
    "Meal Plan Ordered",
  ];
  //!
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  const { logo, setLogo } = useContext(ImageContext);
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);

  //! get data

  const [generatedMealPlans, setGeneratedMealPlans] = useState([]);
  const [orderedMealPlans, setOrderedMealPlans] = useState([]);
  const [shopMeal, setShopMeal] = useState([]);
  const [recommendMeal, setRecommendMeal] = useState([]);
  const [recommendedMealPlans, setRecommendedMealPlans] = useState([]);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [journalEntry, setJournalEntry] = useState([]);
  const [foodEntry, setFoodEntry] = useState([]);

  const getData = async () => {
    await AxiosInstance.get(`generatedmeal`).then((res) => {
      setGeneratedMealPlans(
        res.data?.filter((item) => item.user_id == loggedInUser.user_id)
      );
    });

    await AxiosInstance.get(`order`).then((res) => {
      let temp = res.data?.filter(
        (item) => item.user_id == loggedInUser.user_id
      );

      try {
        AxiosInstance.get(`shopmealplan`).then((resp) => {
          console.log(temp[0].orders);

          let tempOrder = [];
          let tempSet = [];

          temp.map((item) =>
            item.orders.map(
              (items) => (
                tempOrder.push(items),
                tempSet.push(
                  resp.data.find((items1) => items1.shop_mealplan_id === items)
                )
              )
            )
          );
          console.log(tempSet);
          setOrderedMealPlans(tempSet);
          try {
            AxiosInstance.get(`shopmeal`).then((respo) => {
              let tempMealstalaga = [];
              console.log(respo);
              tempOrder.map((item) =>
                // tempMealstalaga.push(
                respo.data
                  ?.filter((items) => items.mealplan_id === item)
                  .map((item1) => tempMealstalaga.push(item1))
                //)
              );
              console.log(tempMealstalaga);
              setShopMeal(tempMealstalaga);
            });
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    await AxiosInstance.get(`recommendmealplan`).then((res) => {
      setRecommendedMealPlans(
        res.data?.filter((item) => item.user_id == loggedInUser.user_id)
      );

      try {
        AxiosInstance.get(`recommendmeal`).then((respo) => {
          let tempMealstalaga = [];
          console.log(res.data);
          res.data.map(
            (item1) => (
              console.log(
                respo.data?.filter(
                  (items) =>
                    items.recommend_mealplan_id === item1.recommend_mealplan_id
                )
              ),
              //   tempMealstalaga.push(
              respo.data
                ?.filter(
                  (items) =>
                    items.recommend_mealplan_id === item1.recommend_mealplan_id
                )
                .map((item1) => tempMealstalaga.push(item1))
              // )
            )
          );
          console.log(tempMealstalaga);
          //setRecommendMeal(tempMealstalaga);
          setRecommendMeal(tempMealstalaga);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  console.log(shopMeal);

  const getJournalData = async (day) => {
    await AxiosInstance.get(`journalentry`).then((res) => {
      setJournalEntry(
        res.data?.filter(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )
      );

      // console.log(
      //   res.data.filter(
      //     (items) => items.date == day && items.user_id == loggedInUser.user_id
      //   )
      //   //[0].journal_id
      // );
      // console.log( setTimeDiv
      //   res.data.filter(
      //     (item) => item.date == day && item.user_id == loggedInUser.user_id
      //   )
      // );

      try {
        getfoodEntryData(
          res.data?.filter(
            (item) => item.date == day && item.user_id == loggedInUser.user_id
          )[0].journal_id
        );
      } catch {
        setFoodEntry([]);
      }
    });
  };

  const getfoodEntryData = (id) => {
    AxiosInstance.get(`foodentry`).then((res) => {
      setFoodEntry(res.data?.filter((item) => item.journal_id == id));
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
      // console.log(temp);
      setCalories((temp / 1200) * 100);
    });
  };

  useEffect(() => {
    getJournalData(dayjs().format("YYYY-MM-DD"));
    //  console.log(journalEntry);
    getData();
  }, []);

  useEffect(() => {
    //getfoodEntryData(journalEntry.journal_id);
    // console.log(foodEntry);
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

  //selectedDate

  //dayjs(selectedDate).format("YYYY-MM-DD")
  const onDateClickHandle = async (day, dayStr) => {
    setSelectedDate(day);
    getJournalData(dayjs(day).format("YYYY-MM-DD"));

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
          <span>
            <Typography sx={{ color: "#895858" }}>
              {format(currentMonth, dateFormat)}{" "}
            </Typography>
          </span>
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
          {/* {format(addDays(startDate, i), dateFormat)} */}
          <Box
            sx={{
              border: 0.8,
              borderColor: "#898246",
            }}
          >
            {format(addDays(startDate, i), dateFormat)}
          </Box>
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
                ? "selecteds"
                : ""
            }`}
            key={day}
            onClick={() => {
              // const day = format(cloneDay);
              const dayStr = format(cloneDay, "yyyy-MM-dd");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            {/* { () :
()} */}

            <span
              className={`numbers ${
                isSameDay(day, new Date())
                  ? "today"
                  : isSameDay(day, selectedDate)
                  ? "selecteds"
                  : ""
              }`}
            >
              {formattedDate}
            </span>
            {/* <span className="bg">{formattedDate}</span> */}
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
      <div className="header row flex-middle" style={{ marginBottom: "2%" }}>
        <div className="col col-start">
          {/* <div className="icon" onClick={() => changeWeekHandle("prev")}>
            prev week
          </div> */}
          <div onClick={() => changeWeekHandle("prev")}>
            <Button
              sx={{
                background: "#E66253",
                color: "#ffffff",
                mt: 1,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}
            >
              prev week
            </Button>
          </div>
        </div>
        {/* <div>{currentWeek}</div> */}
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <Button
            sx={{
              background: "#E66253",
              color: "#ffffff",
              mx: "7%",
              mt: 1,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#E66253",
                border: 0.5,
                borderColor: "#E66253",
              },
            }}
          >
            next week
          </Button>
        </div>
      </div>
    );
  };

  const showDetailsHandle = (dayStr) => {
    // Your logic for handling date details
    //console.log("Date details:", dayStr);
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
      backgroundColor:
        theme.palette.mode === "light" ? secondaryColor : "#308fe8",
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
  const handleOpen = () => {
    //dayjs(selectedDate).format("YYYY-MM-DD")
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // * uodate

  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    display: "flex",
    flexDirection: "column",
    overflowY: "auto", // Enable vertical scrolling
    position: "absolute",
    top: "50%",
    color: "#ffffff",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "90%", // Adjust minimum width as needed
    //bgcolor: "background.paper",
    background: primaryColor,
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: 400,
    // bgcolor: "background.paper",
    // border: "0",
    // boxShadow: 24,
    // p: 4,
    // background: "#E66253",
    // borderRadius: 5,
    // color: "#ffffff",
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
    // console.log(selectedMeal);
    handleOpens();
  };
  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "70%", // Adjust minimum width as needed
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,

    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // height: "50%",
    // width: "40%",
    // bgcolor: "background.paper",
    // border: "0",
    // boxShadow: 24,
    // p: 4,
    // background: "#E66253",
    // borderRadius: 5,
    // color: "#ffffff",
  };
  //

  const options = [
    "None",
    "Paleo",
    "High Protein",
    "Vegetarian",
    "High Blood Friendly Meal",
  ];

  const planOptions = [
    "None",
    "Paleo",
    "High Protein",
    "Vegetarian",
    "High Blood Friendly Meal",
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
                sx={{ color: primaryColor, textDecoration: "underline" }}
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
            background: secondaryColor,
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
              color: secondaryColor,
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
            <Grid xs={2} md={4} sx={{ borderRadius: 5 }}>
              CARBS{" "}
              <Box
                sx={{
                  background: "#ffffff",
                  color: secondaryColor,
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
                  color: primaryColor,
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
                  color: secondaryColor,
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
                background: primaryColor,
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
                  <Grid xs={6}></Grid>
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
                    color: primaryColor,
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
                sx={{ color: primaryColor, textDecoration: "underline" }}
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

  const groupByDay = (data) => {
    const groupedData = {};
    for (const item of data) {
      const day = item.day; // Assuming you have a "day" property in each item
      if (!groupedData[day]) {
        groupedData[day] = [];
      }
      groupedData[day].push(item);
    }

    console.log(data);

    return groupedData;
  };

  // TODO slider

  const [dinnerFood, setDinnerFood] = useState(null);
  const Input = styled(MuiInput)`
    width: 42px;
  `;

  const [value, setValue] = React.useState(0);

  const [caloriesBvalue, setCaloriesBvalue] = React.useState(0);
  const [fatBvalue, setFatBvalue] = React.useState(0);
  const [proteinBvalue, setProteinBvalue] = React.useState(0);
  const [carbsBvalue, setCarbsBvalue] = React.useState(0);

  const [caloriesLvalue, setCaloriesLvalue] = React.useState(0);
  const [fatLvalue, setFatLvalue] = React.useState(0);
  const [proteinLvalue, setProteinLvalue] = React.useState(0);
  const [carbsLvalue, setCarbsLvalue] = React.useState(0);

  const [caloriesSvalue, setCaloriesSvalue] = React.useState(0);
  const [fatSvalue, setFatSvalue] = React.useState(0);
  const [proteinSvalue, setProteinSvalue] = React.useState(0);
  const [carbsSvalue, setCarbsSvalue] = React.useState(0);

  const [caloriesDvalue, setCaloriesDvalue] = React.useState(0);
  const [fatDvalue, setFatDvalue] = React.useState(0);
  const [proteinDvalue, setProteinDvalue] = React.useState(0);
  const [carbsDvalue, setCarbsDvalue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setCaloriesBvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  //? Breakfast values
  const handleCaloriesBSliderChange = (event, newValue) => {
    setCaloriesBvalue(newValue);
  };
  const handleCaloriesBInputChange = (event) => {
    setCaloriesBvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleFatBSliderChange = (event, newValue) => {
    setFatBvalue(newValue);
  };
  const handleFatBInputChange = (event) => {
    setFatBvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleProteinBSliderChange = (event, newValue) => {
    setProteinBvalue(newValue);
  };
  const handleProteinBInputChange = (event) => {
    setProteinBvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleCarbsBSliderChange = (event, newValue) => {
    setCarbsBvalue(newValue);
  };
  const handleCarbsBInputChange = (event) => {
    setCarbsBvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleCaloriesBBlur = () => {
    if (caloriesBvalue < 0) {
      setCaloriesBvalue(0);
    } else if (caloriesBvalue > 1000) {
      setCaloriesBvalue(1000);
    }
  };

  const handleFatBBlur = () => {
    if (fatBvalue < 0) {
      setFatBvalue(0);
    } else if (fatBvalue > 1000) {
      setFatBvalue(1000);
    }
  };

  const handleProteinBBlur = () => {
    if (proteinBvalue < 0) {
      setProteinBvalue(0);
    } else if (proteinBvalue > 1000) {
      setProteinBvalue(1000);
    }
  };

  const handleCarbsBBlur = () => {
    if (carbsBvalue < 0) {
      setCarbsBvalue(0);
    } else if (carbsBvalue > 1000) {
      setCarbsBvalue(1000);
    }
  };

  //? Lunch

  const handleCaloriesLSliderChange = (event, newValue) => {
    setCaloriesLvalue(newValue);
  };
  const handleCaloriesLInputChange = (event) => {
    setCaloriesLvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleFatLSliderChange = (event, newValue) => {
    setFatLvalue(newValue);
  };
  const handleFatLInputChange = (event) => {
    setFatLvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleProteinLSliderChange = (event, newValue) => {
    setProteinLvalue(newValue);
  };
  const handleProteinLInputChange = (event) => {
    setProteinLvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleCarbsLSliderChange = (event, newValue) => {
    setCarbsLvalue(newValue);
  };
  const handleCarbsLInputChange = (event) => {
    setCarbsLvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  const handleCaloriesLBlur = () => {
    if (caloriesLvalue < 0) {
      setCaloriesLvalue(0);
    } else if (caloriesLvalue > 1000) {
      setCaloriesLvalue(1000);
    }
  };

  const handleFatLBlur = () => {
    if (fatLvalue < 0) {
      setFatLvalue(0);
    } else if (fatLvalue > 1000) {
      setFatLvalue(1000);
    }
  };

  const handleProteinLBlur = () => {
    if (proteinLvalue < 0) {
      setProteinLvalue(0);
    } else if (proteinLvalue > 1000) {
      setProteinLvalue(1000);
    }
  };

  const handleCarbsLBlur = () => {
    if (carbsLvalue < 0) {
      setCarbsLvalue(0);
    } else if (carbsLvalue > 1000) {
      setCarbsLvalue(1000);
    }
  };

  //?Snack

  const handleCaloriesSSliderChange = (event, newValue) => {
    setCaloriesSvalue(newValue);
  };
  const handleCaloriesSInputChange = (event) => {
    setCaloriesSvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleFatSSliderChange = (event, newValue) => {
    setFatSvalue(newValue);
  };
  const handleFatSInputChange = (event) => {
    setFatSvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleProteinSSliderChange = (event, newValue) => {
    setProteinSvalue(newValue);
  };
  const handleProteinSInputChange = (event) => {
    setProteinSvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleCarbsSSliderChange = (event, newValue) => {
    setCarbsSvalue(newValue);
  };
  const handleCarbsSInputChange = (event) => {
    setCarbsSvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleCaloriesSBlur = () => {
    if (caloriesSvalue < 0) {
      setCaloriesSvalue(0);
    } else if (caloriesSvalue > 1000) {
      setCaloriesSvalue(1000);
    }
  };

  const handleFatSBlur = () => {
    if (fatSvalue < 0) {
      setFatSvalue(0);
    } else if (fatSvalue > 1000) {
      setFatSvalue(1000);
    }
  };

  const handleProteinSBlur = () => {
    if (proteinSvalue < 0) {
      setProteinSvalue(0);
    } else if (proteinSvalue > 1000) {
      setProteinSvalue(1000);
    }
  };

  const handleCarbsSBlur = () => {
    if (carbsSvalue < 0) {
      setCarbsSvalue(0);
    } else if (carbsSvalue > 1000) {
      setCarbsSvalue(1000);
    }
  };

  //?Dinner

  const handleCaloriesDSliderChange = (event, newValue) => {
    setCaloriesDvalue(newValue);
  };
  const handleCaloriesDInputChange = (event) => {
    setCaloriesDvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleFatDSliderChange = (event, newValue) => {
    setFatDvalue(newValue);
  };
  const handleFatDInputChange = (event) => {
    setFatDvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleProteinDSliderChange = (event, newValue) => {
    setProteinDvalue(newValue);
  };
  const handleProteinDInputChange = (event) => {
    setProteinDvalue(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };
  const handleCarbsDSliderChange = (event, newValue) => {
    setCarbsDvalue(newValue);
  };
  const handleCarbsDInputChange = (event) => {
    setCarbsDvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleCaloriesDBlur = () => {
    if (caloriesDvalue < 0) {
      setCaloriesDvalue(0);
    } else if (caloriesDvalue > 1000) {
      setCaloriesDvalue(1000);
    }
  };

  const handleFatDBlur = () => {
    if (fatDvalue < 0) {
      setFatDvalue(0);
    } else if (fatDvalue > 1000) {
      setFatDvalue(1000);
    }
  };

  const handleProteinDBlur = () => {
    if (proteinDvalue < 0) {
      setProteinDvalue(0);
    } else if (proteinDvalue > 1000) {
      setProteinDvalue(100);
    }
  };

  const handleCarbsDBlur = () => {
    if (carbsDvalue < 0) {
      setCarbsDvalue(0);
    } else if (carbsDvalue > 1000) {
      setCarbsDvalue(1000);
    }
  };
  //?

  // TODO

  //? form handling
  const schema = yup.object().shape({
    // username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),

    title: yup.string(),
    // date_entry: yup
    //   .date()
    //   .required("date is a required field")
    //   .min(
    //     yup.ref(Dayjs(new Date()).format("YYYY-MM-DD")),
    //     "date cannot be in the past"
    //   ),
    journal_entry: yup.string(),
    systolic: yup.string(),
    diastolic: yup.string(),
    meal_plan: yup.string(),

    breakfast_food: yup.string(),
    breakfast_calories: yup.string(),
    breakfast_fat: yup.string(),
    breakfast_protein: yup.string(),
    breakfast_carbs: yup.string(),

    lunch_food: yup.string(),
    lunch_calories: yup.string(),
    lunch_fat: yup.string(),
    lunch_protein: yup.string(),
    lunch_carbs: yup.string(),

    snack_food: yup.string(),
    snack_calories: yup.string(),
    snack_fat: yup.string(),
    snack_protein: yup.string(),
    snack_carbs: yup.string(),

    dinner_food: yup.string(),
    dinner_calories: yup.string(),
    dinner_fat: yup.string(),
    dinner_protein: yup.string(),
    dinner_carbs: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log(data);
    console.log(dates);
    console.log(activeTab, selectedMealPlan);

    setLoading1(true);

    if (activeTab === 1) {
      console.log("try1", selectedMealPlan);
      // try {
      // AxiosInstance.post(`journalentry/`, {
      //   date: dayjs(selectedDate).format("YYYY-MM-DD"),
      //   title: data.title,
      //   entry: data.journal_entry,
      //   systolic: data.systolic,
      //   diastolic: data.diastolic,
      //   user_id: loggedInUser.user_id,
      //   meal_plan: finalMealPlan.name,
      // }).then((res) => {
      //   console.log(res.data.id);

      if (selectedMealPlan === "Meal Plans by Nutritionist") {
        let dayNum = dayjs(selectedDate).day();
        console.log(dayNum, "try");
        console.log(finalMealPlan);
        // let tempList = shopMeal[0].filter((item) => (
        //   item.mealplan_id === finalMealPlan.shop_mealplan_id
        // ))

        for (let i = 1; i < 6; i++) {
          const startWeek = dayjs(selectedDate).subtract(
            dayjs(selectedDate).day() - i,
            "day"
          );
          const endWeek = startWeek.add(5, "day");
          console.log(startWeek, endWeek, "hi");

          const meals = [];
          const tempU = recommendMeal?.filter(
            (item) =>
              item.recommend_mealplan_id === finalMealPlan.recommend_mealplan_id
          );
          console.log(
            tempU.filter((item) => parseInt(item.day) === i),
            i
          );

          const sortedTemp = tempU
            ?.filter((item) => parseInt(item.day) === i)
            .sort((a, b) => {
              const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
              return order.indexOf(a.type) - order.indexOf(b.type);
            })
            .map((item, index) => meals.push(item));

          console.log(meals);
          if (i === dayNum) {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: dayjs(selectedDate).format("YYYY-MM-DD"),
                title: data.title,
                entry: data.journal_entry,
                systolic: data.systolic,
                diastolic: data.diastolic,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: meals[0].food,
                    calories: meals[0].calories,
                    fat: meals[0].fat,
                    protein: meals[0].protein,
                    carbs: meals[0].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: meals[1].food,
                    calories: meals[1].calories,
                    fat: meals[1].fat,
                    protein: meals[1].protein,
                    carbs: meals[1].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: meals[2].food,
                    calories: meals[2].calories,
                    fat: meals[2].fat,
                    protein: meals[2].protein,
                    carbs: meals[2].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: meals[3].food,
                    calories: meals[3].calories,
                    fat: meals[3].fat,
                    protein: meals[3].protein,
                    carbs: meals[3].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: startWeek.format("YYYY-MM-DD"), //!
                title: "meal plan",
                entry: "have meal plan",
                systolic: 0,
                diastolic: 0,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: meals[0].food,
                    calories: meals[0].calories,
                    fat: meals[0].fat,
                    protein: meals[0].protein,
                    carbs: meals[0].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: meals[1].food,
                    calories: meals[1].calories,
                    fat: meals[1].fat,
                    protein: meals[1].protein,
                    carbs: meals[1].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: meals[2].food,
                    calories: meals[2].calories,
                    fat: meals[2].fat,
                    protein: meals[2].protein,
                    carbs: meals[2].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: meals[3].food,
                    calories: meals[3].calories,
                    fat: meals[3].fat,
                    protein: meals[3].protein,
                    carbs: meals[3].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                    if (i === 5) {
                      getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
                      setSelectedMealPlan()
                      setFinalMealPlan()
                      handleClose();
                      // setForceRender(forceRender => forceRender + 1);
                      toast.success("Entry Added");
                      setLoading1(false);
                      setActiveTab(0);
                      reset();
                    }
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        }

        // AxiosInstance.post(`journalentry/`, {
        //   date: dayjs(selectedDate).format("YYYY-MM-DD"),
        //   title: data.title,
        //   entry: data.journal_entry,
        //   systolic: data.systolic,
        //   diastolic: data.diastolic,
        //   user_id: loggedInUser.user_id,
        //   meal_plan: finalMealPlan.name,
        // }).then((res) => {})

        // dayjs(selectedDate).format("YYYY-MM-DD")
        // shopMeal[0].filter((item) => (
        //   item.mealplan_id === finalMealPlan.shop_mealplan_id
        // ))
        // // .sort((a, b) => {
        // //   if (a.day !== b.day) {
        // //     return a.day - b.day;
        // //   } else {
        // //     return a.type.localeCompare(b.type);
        // //   }
        // // })
        // .map((meal) => (
        // console.log(meal)
        // ))
        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Breakfast",
        //     food: data.breakfast_food,
        //     calories: data.breakfast_calories,
        //     fat: data.breakfast_fat,
        //     protein: data.breakfast_protein,
        //     carbs: data.breakfast_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response, error);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Lunch",
        //     food: data.lunch_food,
        //     calories: data.lunch_calories,
        //     fat: data.lunch_fat,
        //     protein: data.lunch_protein,
        //     carbs: data.lunch_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Snack",
        //     food: data.snack_food,
        //     calories: data.snack_calories,
        //     fat: data.snack_fat,
        //     protein: data.snack_protein,
        //     carbs: data.snack_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Dinner",
        //     food: data.dinner_food,
        //     calories: data.dinner_calories,
        //     fat: data.dinner_fat,
        //     protein: data.dinner_protein,
        //     carbs: data.dinner_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //     getJournalData(dayjs().format("YYYY-MM-DD"));

        //     reset();
        //     handleClose();
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }
      } else if (selectedMealPlan === "Generated Meal Plans") {
        console.log(finalMealPlan);
        let dayNum = dayjs(selectedDate).day();
        console.log(dayNum, "try");
        // let tempList = shopMeal[0].filter((item) => (
        //   item.mealplan_id === finalMealPlan.shop_mealplan_id
        // ))

        // console.log(shopMeal[0].filter((item) => (
        //      item.mealplan_id === finalMealPlan.shop_mealplan_id
        //    )))
        for (let i = 1; i < 6; i++) {
          const startWeek = dayjs(selectedDate).subtract(
            dayjs(selectedDate).day() - i,
            "day"
          );
          const endWeek = startWeek.add(5, "day");
          console.log(startWeek, endWeek, "hi");

          //   const meals = [];
          //   const tempU = shopMeal[0].filter((item) => (
          //     item.mealplan_id === finalMealPlan.shop_mealplan_id
          //   ))
          //   console.log(tempU.filter((item) => (
          //     parseInt(item.day) === i
          //   )), i)

          //  const sortedTemp = tempU.filter((item) => (
          //     parseInt(item.day) === i
          //   )).sort((a, b) => {
          //     const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
          //     return order.indexOf(a.type) - order.indexOf(b.type);
          //   })
          //   .map((item, index) => meals.push(item));

          //   console.log(meals)
          if (i === dayNum) {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: dayjs(selectedDate).format("YYYY-MM-DD"),
                title: data.title,
                entry: data.journal_entry,
                systolic: data.systolic,
                diastolic: data.diastolic,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: finalMealPlan.meal[i - 1].meals[0].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[0].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: finalMealPlan.meal[i - 1].meals[1].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[1].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: finalMealPlan.meal[i - 1].meals[2].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[2].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: finalMealPlan.meal[i - 1].meals[3].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[3].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                    if (i === 5) {
                      getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
                      setSelectedMealPlan()
                      setFinalMealPlan()
                      handleClose();
                      // setForceRender(forceRender => forceRender + 1);
                      toast.success("Entry Added");
                      setLoading1(false);
                      setActiveTab(0);
                      reset();
                    }
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: startWeek.format("YYYY-MM-DD"), //!
                title: "meal plan",
                entry: "have meal plan",
                systolic: 0,
                diastolic: 0,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: finalMealPlan.meal[i - 1].meals[0].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[0].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[0].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: finalMealPlan.meal[i - 1].meals[1].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[1].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[1].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: finalMealPlan.meal[i - 1].meals[2].details.recipe
                      .label,

                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[2].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[2].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: finalMealPlan.meal[i - 1].meals[3].details.recipe
                      .label,
                    calories: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .calories /
                        finalMealPlan.meal[i - 1].meals[3].details.recipe.yield
                    ),
                    fat: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[0].total
                    ),
                    protein: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[2].total
                    ),
                    carbs: Math.round(
                      finalMealPlan.meal[i - 1].meals[3].details.recipe
                        .digest[1].total
                    ),
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);

                    if (i === 5) {
                      getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
                      handleClose();

                      toast.success("Entry Added");
                      setLoading1(false);
                      setActiveTab(0);
                      reset();
                    }
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      } else if (selectedMealPlan === "Meal Plan Ordered") {
        //! ordered meal plan so from shopmealplan table and shop meal

        let dayNum = dayjs(selectedDate).day();
        console.log(dayNum, "try");
        // let tempList = shopMeal[0].filter((item) => (
        //   item.mealplan_id === finalMealPlan.shop_mealplan_id
        // ))

        for (let i = 1; i < 6; i++) {
          const startWeek = dayjs(selectedDate).subtract(
            dayjs(selectedDate).day() - i,
            "day"
          );
          const endWeek = startWeek.add(5, "day");
          console.log(startWeek, endWeek, "hi");

          const meals = [];
          const tempU = shopMeal?.filter(
            (item) => item.mealplan_id === finalMealPlan.shop_mealplan_id
          );
          console.log(
            tempU.filter((item) => parseInt(item.day) === i),
            i
          );

          const sortedTemp = tempU
            ?.filter((item) => parseInt(item.day) === i)
            .sort((a, b) => {
              const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
              return order.indexOf(a.type) - order.indexOf(b.type);
            })
            .map((item, index) => meals.push(item));

          console.log(meals);
          if (i === dayNum) {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: dayjs(selectedDate).format("YYYY-MM-DD"),
                title: data.title,
                entry: data.journal_entry,
                systolic: data.systolic,
                diastolic: data.diastolic,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: meals[0].food,
                    calories: meals[0].calories,
                    fat: meals[0].fat,
                    protein: meals[0].protein,
                    carbs: meals[0].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: meals[1].food,
                    calories: meals[1].calories,
                    fat: meals[1].fat,
                    protein: meals[1].protein,
                    carbs: meals[1].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: meals[2].food,
                    calories: meals[2].calories,
                    fat: meals[2].fat,
                    protein: meals[2].protein,
                    carbs: meals[2].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: meals[3].food,
                    calories: meals[3].calories,
                    fat: meals[3].fat,
                    protein: meals[3].protein,
                    carbs: meals[3].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              AxiosInstance.post(`journalentry/`, {
                date: startWeek.format("YYYY-MM-DD"), //!
                title: "meal plan",
                entry: "have meal plan",
                systolic: 0,
                diastolic: 0,
                user_id: loggedInUser.user_id,
                meal_plan: finalMealPlan.name,
              }).then((res) => {
                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Breakfast",
                    food: meals[0].food,
                    calories: meals[0].calories,
                    fat: meals[0].fat,
                    protein: meals[0].protein,
                    carbs: meals[0].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Lunch",
                    food: meals[1].food,
                    calories: meals[1].calories,
                    fat: meals[1].fat,
                    protein: meals[1].protein,
                    carbs: meals[1].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Snack",
                    food: meals[2].food,
                    calories: meals[2].calories,
                    fat: meals[2].fat,
                    protein: meals[2].protein,
                    carbs: meals[2].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response, error);
                }

                try {
                  AxiosInstance.post(`foodentry/`, {
                    type: "Dinner",
                    food: meals[3].food,
                    calories: meals[3].calories,
                    fat: meals[3].fat,
                    protein: meals[3].protein,
                    carbs: meals[3].carbs,
                    journal_id: res.data.id,
                  }).then((res) => {
                    console.log(res, res.data);
                    if (i === 5) {
                      getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
                      setSelectedMealPlan()
                      setFinalMealPlan()
                      handleClose();
                      // setForceRender(forceRender => forceRender + 1);
                      toast.success("Entry Added");
                      setLoading1(false);
                      setActiveTab(0);
                      reset();
                    }
                  });
                } catch (error) {
                  console.log(error.response, error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        }

        // AxiosInstance.post(`journalentry/`, {
        //   date: dayjs(selectedDate).format("YYYY-MM-DD"),
        //   title: data.title,
        //   entry: data.journal_entry,
        //   systolic: data.systolic,
        //   diastolic: data.diastolic,
        //   user_id: loggedInUser.user_id,
        //   meal_plan: finalMealPlan.name,
        // }).then((res) => {})

        // dayjs(selectedDate).format("YYYY-MM-DD")
        // shopMeal[0].filter((item) => (
        //   item.mealplan_id === finalMealPlan.shop_mealplan_id
        // ))
        // .sort((a, b) => {
        //   if (a.day !== b.day) {
        //     return a.day - b.day;
        //   } else {
        //     return a.type.localeCompare(b.type);
        //   }
        // })
        // .map((meal) => (
        // console.log(meal)
        // ))
        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Breakfast",
        //     food: data.breakfast_food,
        //     calories: data.breakfast_calories,
        //     fat: data.breakfast_fat,
        //     protein: data.breakfast_protein,
        //     carbs: data.breakfast_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response, error);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Lunch",
        //     food: data.lunch_food,
        //     calories: data.lunch_calories,
        //     fat: data.lunch_fat,
        //     protein: data.lunch_protein,
        //     carbs: data.lunch_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Snack",
        //     food: data.snack_food,
        //     calories: data.snack_calories,
        //     fat: data.snack_fat,
        //     protein: data.snack_protein,
        //     carbs: data.snack_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }

        // try {
        //   AxiosInstance.post(`foodentry/`, {
        //     type: "Dinner",
        //     food: data.dinner_food,
        //     calories: data.dinner_calories,
        //     fat: data.dinner_fat,
        //     protein: data.dinner_protein,
        //     carbs: data.dinner_carbs,
        //     journal_id: res.data.id,
        //   }).then((res) => {
        //     console.log(res, res.data);
        //     getJournalData(dayjs().format("YYYY-MM-DD"));

        //     reset();
        //     handleClose();
        //   });
        // } catch (error) {
        //   console.log(error.response);
        // }
        // }

        // });
        //  }
        //  catch (error) {
        //   console.log(error.response);
        // }
      }
    } else {
      try {
        AxiosInstance.post(`journalentry/`, {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
          title: data.title,
          entry: data.journal_entry,
          systolic: data.systolic,
          diastolic: data.diastolic,
          user_id: loggedInUser.user_id,
        }).then((res) => {
          console.log(res.data.id);

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Breakfast",
              food: data.breakfast_food,
              calories: data.breakfast_calories,
              fat: data.breakfast_fat,
              protein: data.breakfast_protein,
              carbs: data.breakfast_carbs,
              journal_id: res.data.id,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response, error);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Lunch",
              food: data.lunch_food,
              calories: data.lunch_calories,
              fat: data.lunch_fat,
              protein: data.lunch_protein,
              carbs: data.lunch_carbs,
              journal_id: res.data.id,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Snack",
              food: data.snack_food,
              calories: data.snack_calories,
              fat: data.snack_fat,
              protein: data.snack_protein,
              carbs: data.snack_carbs,
              journal_id: res.data.id,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Dinner",
              food: data.dinner_food,
              calories: data.dinner_calories,
              fat: data.dinner_fat,
              protein: data.dinner_protein,
              carbs: data.dinner_carbs,
              journal_id: res.data.id,
            }).then((res) => {
              console.log(res, res.data);
              getJournalData(dayjs().format("YYYY-MM-DD"));
              setCaloriesBvalue(0);
              setFatBvalue(0);
              setProteinBvalue(0);
              setCarbsBvalue(0);
              setCaloriesLvalue(0);
              setFatLvalue(0);
              setProteinLvalue(0);
              setCarbsLvalue(0);
              setCaloriesSvalue(0);
              setFatSvalue(0);
              setProteinSvalue(0);
              setCarbsSvalue(0);
              setCaloriesDvalue(0);
              setFatDvalue(0);
              setProteinDvalue(0);
              setCarbsDvalue(0);
              reset();
              handleClose();
            });
          } catch (error) {
            console.log(error.response);
          }
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const [dates, setDates] = useState();
  //?

  //? update handling
  const updateSchema = yup.object().shape({
    // username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),

    title: yup.string(),
    // date_entry: yup
    //   .date()
    //   .required("date is a required field")
    //   .min(
    //     yup.ref(Dayjs(new Date()).format("YYYY-MM-DD")),
    //     "date cannot be in the past"
    //   ),
    journal_entry: yup.string(),
    systolic: yup.string(),
    diastolic: yup.string(),
    meal_plan: yup.string(),

    breakfast_food: yup.string(),
    breakfast_calories: yup.string(),
    breakfast_fat: yup.string(),
    breakfast_protein: yup.string(),
    breakfast_carbs: yup.string(),

    lunch_food: yup.string(),
    lunch_calories: yup.string(),
    lunch_fat: yup.string(),
    lunch_protein: yup.string(),
    lunch_carbs: yup.string(),

    snack_food: yup.string(),
    snack_calories: yup.string(),
    snack_fat: yup.string(),
    snack_protein: yup.string(),
    snack_carbs: yup.string(),

    dinner_food: yup.string(),
    dinner_calories: yup.string(),
    dinner_fat: yup.string(),
    dinner_protein: yup.string(),
    dinner_carbs: yup.string(),
  });

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset: reset1,
    // control,
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  const [journalId, setJournalId] = useState();
  const [foodEntries, setFoodEntries] = useState([]);
  const [mealPlan, setMealPlan] = useState()
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = (id, date, entry, meal) => {
    setFoodEntries(entry);
    setDates(date);
    setJournalId(id);
    setOpen1(true);
    setMealPlan(meal)
  };
  const handleClose1 = () => {
    handleReset();
    setOpen1(false);
  };

  const handleReset = () => {
    reset1(); // Call reset function to clear form state and errors
  };

  const onSubmitUpdateHandler = (data) => {
    console.log(data);
    console.log(dates);
    console.log(mealPlan)
    try {
      AxiosInstance.put(`journalentry/`, {
        journal_id: journalId,
        date: dates,
        title: data.title,
        entry: data.journal_entry,
        systolic: data.systolic,
        diastolic: data.diastolic,
        user_id: loggedInUser.user_id,
        meal_plan: mealPlan, 
      }).then((res) => {
        console.log(res);

        try {
          AxiosInstance.put(`foodentry/`, {
            foodentry_id: foodEntries[0].foodentry_id,
            type: "Breakfast",
            food: data.breakfast_food,
            calories: data.breakfast_calories,
            fat: data.breakfast_fat,
            protein: data.breakfast_protein,
            carbs: data.breakfast_carbs,
            journal_id: journalId,
          }).then((res) => {
            console.log(res, res.data);
          });
        } catch (error) {
          console.log(error.response, error);
        }

        try {
          AxiosInstance.put(`foodentry/`, {
            foodentry_id: foodEntries[1].foodentry_id,
            type: "Lunch",
            food: data.lunch_food,
            calories: data.lunch_calories,
            fat: data.lunch_fat,
            protein: data.lunch_protein,
            carbs: data.lunch_carbs,
            journal_id: journalId,
          }).then((res) => {
            console.log(res, res.data);
          });
        } catch (error) {
          console.log(error.response);
        }

        try {
          AxiosInstance.put(`foodentry/`, {
            foodentry_id: foodEntries[2].foodentry_id,
            type: "Snack",
            food: data.snack_food,
            calories: data.snack_calories,
            fat: data.snack_fat,
            protein: data.snack_protein,
            carbs: data.snack_carbs,
            journal_id: journalId,
          }).then((res) => {
            console.log(res, res.data);
          });
        } catch (error) {
          console.log(error.response);
        }

        try {
          AxiosInstance.put(`foodentry/`, {
            foodentry_id: foodEntries[3].foodentry_id,
            type: "Dinner",
            food: data.dinner_food,
            calories: data.dinner_calories,
            fat: data.dinner_fat,
            protein: data.dinner_protein,
            carbs: data.dinner_carbs,
            journal_id: journalId,
          }).then((res) => {
            console.log(res, res.data);
          });
        } catch (error) {
          console.log(error.response);
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  //?

  //! set choices
  const setChoice = (e) => {
    console.log(e);
    setSelectedMealPlan(e.target.value);
    setFinalMealPlan();
  };
  //?
  return (
    <div
      className="content"
      style={{
        paddingBottom: "0px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "20px",
        color: "#000000",
      }}
    >
      {/* //! weekly */}
      {/* <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}
      </div> */}

      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}

      {/* //! //! */}
      {/* <Modal
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
            <Grid xs={8}>New Food Journal Entry try</Grid>
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
              color: primaryColor,
              backgroundRadius: 10,
            }}
            type="submit"
          >
            SUBMIT
          </Button>
        </Box>
      </Modal> */}
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
      {/* <div className="calendar-app">
        <div className="day-labels"></div>
        <Calendar
          onChange={onChange}
          value={date}
          className={isLoading ? "loading" : ""}
        />
        {isPopupVisible && (
          <div className="popup">
            <h3>Date: {date.toLocaleDateString()}</h3>

            <button onClick={handlePopupClose}>Close</button>
          </div>
        )}
      </div> */}

      {journalEntry.length > 0 && foodEntry.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 3, mb: 1 }}>
          <Grid xs={4} md={6}>
            {" "}
          </Grid>
          <Grid xs={8} md={6}>
            {/* {selectedDate } */}

            <Button
              sx={{
                background: primaryColor,
                borderRadius: 3,
                color: "#ffffff",
                px: {
                  xs: 5, // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1em", // For large screens
                },
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
              onClick={() =>
                handleOpen1(
                  journalEntry[0].journal_id,
                  journalEntry[0].date,
                  foodEntry,
                  journalEntry[0].meal_plan,
                )
              }
            >
              View Journal Details
            </Button>
            {/* selectedDate*/}
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {" "}
                <form onSubmit={handleSubmit1(onSubmitUpdateHandler)}>
                  <Grid container spacing={2}>
                    <Grid xs={2}>
                      <img src="/images/food journal icon.png" />
                    </Grid>
                    <Grid xs={8} display="flex" justifyContent="flex-start">
                      Journal Entry
                    </Grid>
                    <Grid xs={2}>
                      <Button sx={{ float: "right" }} onClick={handleClose1}>
                        <img src="/images/close.png" height="10" weight="10" />
                      </Button>
                    </Grid>
                  </Grid>{" "}
                  <center>
                    <Grid container spacing={2} sx={{ my: 2, mx: 0 }}>
                      <Grid xs={6}>
                        <Grid container spacing={2}>
                          <Grid xs={2} sx={{ mt: 2 }}>
                            {" "}
                            Title:{" "}
                          </Grid>
                          <Grid xs={6}>
                            {" "}
                            <TextField
                              id="title"
                              name="title"
                              defaultValue={journalEntry[0].title}
                              label=""
                              fullWidth
                              margin="dense"
                              sx={{
                                mr: 2,
                                background: "#ffffff",
                                color: "#000000",
                              }}
                              {...register1("title")}
                              // error={errors.title ? true : false}
                              // id="filled-basic"
                              // label="Title"
                              // variant="filled"
                              // sx={{ mr: 2 }}
                              // value={idToCall}
                              // onChange={(e) => setIdToCall(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid xs={6}>
                        {" "}
                        <Grid container spacing={2}>
                          <Grid xs={2}>
                            {" "}
                            <Typography sx={{ mt: 2 }}>
                              Date of Entry
                            </Typography>
                          </Grid>
                          <Grid xs={2}>
                            {" "}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ background: "#ffffff", width: "400%" }}
                                // onChange={(e) =>
                                //   setDates(Dayjs(e["$d"]).format("YYYY-MM-DD"))
                                // }
                                // value={Dayjs(journalEntry[0].date).format(
                                //   "YYYY-MM-DD"
                                // )}

                                defaultValue={dayjs(
                                  new Date(journalEntry[0].date)
                                )}
                                disabled={true}

                                // name="date_entry"
                                // {...register("date_entry")}
                                // error={errors.date_entry ? true : false}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>{" "}
                  </center>
                  <Grid container spacing={2} sx={{ m: 0 }}>
                    <Grid xs={3.8} sx={{ mx: 1 }}>
                      <center> Journal Entry</center>
                      Journal Entry
                      <br />
                      <TextField
                        id="journal_entry"
                        name="journal_entry"
                        label=""
                        defaultValue={journalEntry[0].entry}
                        fullWidth
                        margin="dense"
                        {...register1("journal_entry")}
                        // error={errors.journal_entry ? true : false}
                        multiline
                        rows={4}
                        sx={{
                          width: "100%",
                          mr: 2,
                          background: "#ffffff",
                          color: "#000000",
                        }}
                        // value={idToCall}
                        // onChange={(e) => setIdToCall(e.target.value)}
                      />
                      <Typography
                        sx={{ mt: 2 }}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        Blood Pressure
                      </Typography>
                      <Grid container spacing={4} sx={{ mx: 3, my: 1.5 }}>
                        <Grid xs={4} sx={{ mx: 2 }}>
                          {" "}
                          <TextField
                            id="systolic"
                            name="systolic"
                            fullWidth
                            margin="dense"
                            defaultValue={journalEntry[0].systolic}
                            {...register1("systolic")}
                            // error={errors.systolic ? true : false}
                            label="Systolic"
                            variant="filled"
                            sx={{
                              mr: 4,
                              background: "#ffffff",
                              color: "#000000",
                            }}

                            // value={idToCall}
                            // onChange={(e) => setIdToCall(e.target.value)}
                          />
                        </Grid>
                        <Grid xs={4} sx={{ mx: 2 }}>
                          {" "}
                          <TextField
                            id="diastolic"
                            name="diastolic"
                            fullWidth
                            margin="dense"
                            defaultValue={journalEntry[0].diastolic}
                            {...register1("diastolic")}
                            // error={errors.diastolic ? true : false}
                            label="Diastolic"
                            variant="filled"
                            sx={{
                              mr: 2,
                              background: "#ffffff",
                              color: "#000000",
                            }}
                            // value={idToCall}
                            // onChange={(e) => setIdToCall(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                      <center>
                        <button
                          style={{
                            background: "#ffffff",
                            color: primaryColor,
                            backgroundRadius: 10,
                          }}
                          type="submit"
                        >
                          SAVE
                        </button>
                      </center>
                      {/* Meal Plan: <br />
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        // value={value}
                        // onChange={onChange}
                        // error={!!error}
                      >
                        {planOptions.map((option) => (
                          <MenuItem value={option}>{option}</MenuItem>
                        ))}
                      </Select> */}
                    </Grid>

                    {foodEntry !== 0 ? (
                      <Grid xs={7} sx={{ ml: 10 }}>
                        Meals
                        {console.log(foodEntry[0])}
                        <Box>
                          <Typography>Breakfast</Typography>
                          <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid xs={6}>
                              <TextField
                                id="breakfast_food"
                                name="breakfast_food"
                                fullWidth
                                margin="dense"
                                defaultValue={foodEntry[0].food}
                                {...register1("breakfast_food")}
                                error={errors.breakfast_food ? true : false}
                                label="Food Eaten:"
                                variant="filled"
                                size="small"
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  mr: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              {/* <TextField
                                id="filled-basic"
                                label="Meal Plan:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  ml: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              /> */}
                            </Grid>{" "}
                            <Grid container spacing={2}>
                              <Grid xs={6}>
                                {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                <br />
                                <center>
                                  <Typography> Calories</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/calorieswhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="breakfast_calories"
                                      name="breakfast_calories"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      fullWidth
                                      margin="dense"
                                      {...register1("breakfast_calories")}
                                      // error={
                                      //   errors.breakfast_calorie ? true : false
                                      // }
                                      value={
                                        caloriesBvalue != 0
                                          ? caloriesBvalue
                                          : foodEntry[0]?.calories
                                      }
                                      onChange={handleCaloriesBSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    {console.log(foodEntry)}
                                    <Input
                                      // value={caloriesBvalue}

                                      value={
                                        caloriesBvalue != 0
                                          ? caloriesBvalue
                                          : foodEntry[0]?.calories
                                      }
                                      size="small"
                                      onChange={handleCaloriesBInputChange}
                                      onBlur={handleCaloriesBBlur}
                                      inputProps={{
                                        step: 0,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                <center>
                                  <Typography> Fat</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/fatwhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="breakfast_fat"
                                      name="breakfast_fat"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      fullWidth
                                      margin="dense"
                                      {...register1("breakfast_fat")}
                                      value={
                                        fatBvalue != 0
                                          ? fatBvalue
                                          : foodEntry[0]?.fat
                                      }
                                      onChange={handleFatBSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        fatBvalue != 0
                                          ? fatBvalue
                                          : foodEntry[0]?.fat
                                      }
                                      size="small"
                                      onChange={handleFatBInputChange}
                                      onBlur={handleFatBBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                              </Grid>
                              <Grid xs={6}>
                                <br />{" "}
                                <center>
                                  <Typography> Protein</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/proteinwhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="breakfast_protein"
                                      name="breakfast_protein"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("breakfast_protein")}
                                      value={
                                        proteinBvalue != 0
                                          ? proteinBvalue
                                          : foodEntry[0]?.protein

                                        //foodEntry[0]?.protein
                                      }
                                      onChange={handleProteinBSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        proteinBvalue != 0
                                          ? proteinBvalue
                                          : foodEntry[0]?.protein
                                      }
                                      size="small"
                                      onChange={handleProteinBInputChange}
                                      onBlur={handleProteinBBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>{" "}
                                <center>
                                  <Typography> Carbs</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/carbswhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="breakfast_carbs"
                                      name="breakfast_carbs"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("breakfast_carbs")}
                                      value={
                                        carbsBvalue != 0
                                          ? carbsBvalue
                                          : foodEntry[0]?.carbs
                                      }
                                      onChange={handleCarbsBSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        carbsBvalue != 0
                                          ? carbsBvalue
                                          : foodEntry[0]?.carbs
                                      }
                                      size="small"
                                      onChange={handleCarbsBInputChange}
                                      onBlur={handleCarbsBBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          Lunch
                          <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid xs={6}>
                              <TextField
                                id="lunch_food"
                                name="lunch_food"
                                margin="dense"
                                defaultValue={foodEntry[1].food}
                                {...register1("lunch_food")}
                                error={errors.lunch_food ? true : false}
                                label="Food Eaten:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  mr: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              {/* <TextField
                                id="filled-basic"
                                label="Meal Plan:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  ml: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              /> */}
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid xs={6}>
                                {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                <br />
                                <center>
                                  <Typography> Calories</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/calorieswhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="lunch_calories"
                                      name="lunch_calories"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("lunch_calories")}
                                      value={
                                        caloriesLvalue != 0
                                          ? caloriesLvalue
                                          : foodEntry[1]?.calories
                                      }
                                      onChange={handleCaloriesLSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        caloriesLvalue != 0
                                          ? caloriesLvalue
                                          : foodEntry[0]?.calories
                                      }
                                      size="small"
                                      onChange={handleCaloriesLInputChange}
                                      onBlur={handleCaloriesLBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                <center>
                                  <Typography> Fat</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/fatwhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="lunch_fat"
                                      name="lunch_fat"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("lunch_fat")}
                                      value={
                                        fatLvalue != 0
                                          ? fatLvalue
                                          : foodEntry[1]?.fat
                                      }
                                      onChange={handleFatLSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        fatLvalue != 0
                                          ? fatLvalue
                                          : foodEntry[1]?.fat
                                      }
                                      size="small"
                                      onChange={handleFatLInputChange}
                                      onBlur={handleFatLBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                              </Grid>
                              <Grid xs={6}>
                                <br />{" "}
                                <center>
                                  <Typography> Protein</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/proteinwhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="lunch_protein"
                                      name="lunch_protein"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("lunch_protein")}
                                      value={
                                        proteinLvalue != 0
                                          ? proteinLvalue
                                          : foodEntry[1]?.protein
                                      }
                                      onChange={handleProteinLSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        proteinLvalue != 0
                                          ? proteinLvalue
                                          : foodEntry[1]?.protein
                                      }
                                      size="small"
                                      onChange={handleProteinLInputChange}
                                      onBlur={handleProteinLBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>{" "}
                                <center>
                                  <Typography> Carbs</Typography>
                                </center>
                                <Grid container spacing={2} alignItems="center">
                                  <br />
                                  <br />
                                  <Grid item>
                                    <img
                                      src="/images/carbswhite.png"
                                      height="25"
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Slider
                                      id="lunch_carbs"
                                      name="lunch_carbs"
                                      min={0}
                                      step={1}
                                      max={1000}
                                      label=""
                                      {...register1("lunch_carbs")}
                                      value={
                                        carbsLvalue != 0
                                          ? carbsLvalue
                                          : foodEntry[1]?.carbs
                                      }
                                      onChange={handleCarbsLSliderChange}
                                      aria-labelledby="input-slider"
                                      sx={{ color: secondaryColor }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Input
                                      value={
                                        carbsLvalue != 0
                                          ? carbsLvalue
                                          : foodEntry[1]?.carbs
                                      }
                                      size="small"
                                      onChange={handleCarbsLInputChange}
                                      onBlur={handleCarbsLBlur}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        Meals
                        <Box>
                          Snack
                          <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid xs={6}>
                              <TextField
                                id="snack_food"
                                name="title"
                                fullWidth
                                margin="dense"
                                defaultValue={foodEntry[2].food}
                                // {...register("snack_food")}
                                error={errors.snack_food ? true : false}
                                label="Food Eaten:"
                                variant="filled"
                                size="small"
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  mr: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              {/* <TextField
                                id="filled-basic"
                                label="Meal Plan:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  ml: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              /> */}
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid xs={6}>
                              {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                              <br />
                              <center>
                                <Typography> Calories</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/calorieswhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="snack_calories"
                                    name="snack_calories"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("snack_calories")}
                                    value={
                                      caloriesSvalue != 0
                                        ? caloriesSvalue
                                        : foodEntry[2]?.calories
                                    }
                                    onChange={handleCaloriesSSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      caloriesSvalue != 0
                                        ? caloriesSvalue
                                        : foodEntry[2]?.calories
                                    }
                                    size="small"
                                    onChange={handleCaloriesSInputChange}
                                    onBlur={handleCaloriesSBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              <center>
                                <Typography> Fat</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img src="/images/fatwhite.png" height="25" />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="snack_fat"
                                    name="snack_fat"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("snack_fat")}
                                    value={
                                      fatSvalue != 0
                                        ? fatSvalue
                                        : foodEntry[2]?.fat
                                    }
                                    onChange={handleFatSSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      fatSvalue != 0
                                        ? fatSvalue
                                        : foodEntry[2]?.fat
                                    }
                                    size="small"
                                    onChange={handleFatSInputChange}
                                    onBlur={handleFatSBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                            </Grid>
                            <Grid xs={6}>
                              <br />{" "}
                              <center>
                                <Typography> Protein</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/proteinwhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="snack_protein"
                                    name="snack_protein"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("snack_protein")}
                                    value={
                                      proteinSvalue != 0
                                        ? proteinSvalue
                                        : foodEntry[2]?.protein
                                    }
                                    onChange={handleProteinSSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      proteinSvalue != 0
                                        ? proteinSvalue
                                        : foodEntry[2]?.protein
                                    }
                                    size="small"
                                    onChange={handleProteinSInputChange}
                                    onBlur={handleProteinSBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>{" "}
                              <center>
                                <Typography> Carbs</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/carbswhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="snack_carbs"
                                    name="snack_carbs"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("snack_carbs")}
                                    value={
                                      carbsSvalue != 0
                                        ? carbsSvalue
                                        : foodEntry[2]?.carbs
                                    }
                                    onChange={handleCarbsSSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      carbsSvalue != 0
                                        ? carbsSvalue
                                        : foodEntry[2]?.carbs
                                    }
                                    size="small"
                                    onChange={handleCarbsSInputChange}
                                    onBlur={handleCarbsSBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          Dinner
                          <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid xs={6}>
                              <TextField
                                id="dinner_food"
                                name="dinner_food"
                                defaultValue={foodEntry[3]?.food}
                                fullWidth
                                label="Food Eaten:"
                                //    {...register("dinner_food")}
                                //  {...register1("title")}
                                // error={errors.title ? true : false}
                                // id="filled-basic"
                                // label="Title"
                                // variant="filled"
                                // sx={{ mr: 2 }}
                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />

                              <TextField
                                id="dinner_food"
                                name="dinner_food"
                                defaultValue={foodEntry[3]?.food}
                                // value={
                                //   dinnerFood === null
                                //     ? foodEntry[3]?.food
                                //     : "dinnerFood"
                                // }
                                //  onChange={(e) => setDinnerFood(e.target.value)}
                                margin="dense"
                                {...register1("dinner_food")}
                                error={errors.title ? true : false}
                                label="Food Eaten:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  mr: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              {/* <TextField
                                id="filled-basic"
                                label="Meal Plan:"
                                variant="filled"
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "#000000" },
                                }}
                                sx={{
                                  ml: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}

                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              /> */}
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid xs={6}>
                              {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                              <br />
                              <center>
                                <Typography> Calories</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/calorieswhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="dinner_calories"
                                    name="dinner_calories"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("dinner_calories")}
                                    value={
                                      caloriesDvalue != 0
                                        ? caloriesDvalue
                                        : foodEntry[3]?.calories
                                    }
                                    onChange={handleCaloriesDSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      caloriesDvalue != 0
                                        ? caloriesDvalue
                                        : foodEntry[3]?.calories
                                    }
                                    size="small"
                                    onChange={handleCaloriesDInputChange}
                                    onBlur={handleCaloriesDBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              <center>
                                <Typography> Fat</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img src="/images/fatwhite.png" height="25" />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="dinner_fat"
                                    name="dinner_fat"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("dinner_fat")}
                                    value={
                                      fatDvalue != 0
                                        ? fatDvalue
                                        : foodEntry[3]?.fat
                                    }
                                    onChange={handleFatDSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      fatDvalue != 0
                                        ? fatDvalue
                                        : foodEntry[3]?.fat
                                    }
                                    size="small"
                                    onChange={handleFatDInputChange}
                                    onBlur={handleFatDBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                            </Grid>
                            <Grid xs={6}>
                              <br />{" "}
                              <center>
                                <Typography> Protein</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/proteinwhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="dinner_protein"
                                    name="dinner_protein"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("dinner_protein")}
                                    value={
                                      proteinDvalue != 0
                                        ? proteinDvalue
                                        : foodEntry[3]?.protein
                                    }
                                    onChange={handleProteinDSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      proteinDvalue != 0
                                        ? proteinDvalue
                                        : foodEntry[3]?.protein
                                    }
                                    size="small"
                                    onChange={handleProteinDInputChange}
                                    onBlur={handleProteinDBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>{" "}
                              <center>
                                <Typography> Carbs</Typography>
                              </center>
                              <Grid container spacing={2} alignItems="center">
                                <br />
                                <br />
                                <Grid item>
                                  <img
                                    src="/images/carbswhite.png"
                                    height="25"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Slider
                                    id="dinner_carbs"
                                    name="dinner_carbs"
                                    min={0}
                                    step={1}
                                    max={1000}
                                    label=""
                                    {...register1("dinner_carbs")}
                                    value={
                                      carbsDvalue != 0
                                        ? carbsDvalue
                                        : foodEntry[3]?.carbs
                                    }
                                    onChange={handleCarbsDSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{ color: secondaryColor }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Input
                                    value={
                                      carbsDvalue != 0
                                        ? carbsDvalue
                                        : foodEntry[3]?.carbs
                                    }
                                    size="small"
                                    onChange={handleCarbsDInputChange}
                                    onBlur={handleCarbsDBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </form>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid xs={6}> </Grid>
          <Grid xs={6} sx={{ mt: 3 }}>
            {/* {selectedDate } */}

            <Button
              sx={{
                background: primaryColor,
                borderRadius: 3,
                color: "#ffffff",
                px: {
                  xs: 5, // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1em", // For large screens
                },
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
              onClick={handleOpen}
            >
              + NEW JOURNAL ENTRY
            </Button>
            {/* selectedDate*/}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {loading1 ? (
                  <>
                    <center>
                      {" "}
                      <img src="/images/pacman.gif" width="13%" />
                      <Typography>Saving your entry please wait...</Typography>
                    </center>
                  </>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid container spacing={2}>
                      <Grid xs={2}>
                        {" "}
                        <img src="/images/food journal icon.png" />
                      </Grid>
                      <Grid xs={8}>New Food Journal Entry</Grid>
                      <Grid xs={2}>
                        <Button sx={{ float: "right" }} onClick={handleClose}>
                          <img
                            src="/images/close.png"
                            height="10"
                            weight="10"
                          />
                        </Button>
                      </Grid>
                    </Grid>{" "}
                    <center>
                      <Grid container spacing={2} sx={{ my: 2, mx: 0 }}>
                        <Grid xs={6}>
                          <Grid container spacing={2}>
                            <Grid xs={2} sx={{ mt: 2 }}>
                              {" "}
                              Title:{" "}
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              <TextField
                                size="small"
                                id="title"
                                name="title"
                                label=""
                                fullWidth
                                margin="dense"
                                sx={{
                                  mr: 2,
                                  background: "#ffffff",
                                  color: "#000000",
                                }}
                                {...register("title")}
                                // error={errors.title ? true : false}
                                // id="filled-basic"
                                // label="Title"
                                // variant="filled"
                                // sx={{ mr: 2 }}
                                // value={idToCall}
                                // onChange={(e) => setIdToCall(e.target.value)}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.title?.message}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid xs={6}>
                          {" "}
                          <Grid container spacing={2}>
                            <Grid xs={2}>
                              {" "}
                              <Typography sx={{ mt: 2 }}>
                                Date of Entry
                              </Typography>
                            </Grid>
                            <Grid xs={2}>
                              {" "}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  sx={{ background: "#ffffff", width: "400%" }}
                                  onChange={(e) =>
                                    setDates(
                                      Dayjs(e["$d"]).format("YYYY-MM-DD")
                                    )
                                  }
                                  defaultValue={dayjs(selectedDate)}
                                  disabled={true}
                                  // name="date_entry"
                                  // {...register("date_entry")}
                                  // error={errors.date_entry ? true : false}
                                />
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>{" "}
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          my: 2,
                          ml: "5%",
                        }}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        Blood Pressure
                      </Typography>
                      <Grid container spacing={2} sx={{ mx: "5%", mr: "10%" }}>
                        <Grid xs={4}>
                          {" "}
                          <TextField
                            id="systolic"
                            name="systolic"
                            fullWidth
                            margin="dense"
                            {...register("systolic")}
                            // error={errors.systolic ? true : false}
                            label="Systolic"
                            variant="filled"
                            sx={{
                              width: "100%",
                              mr: 4,
                              background: "#ffffff",
                              color: "#000000",
                            }}
                            // value={idToCall}
                            // onChange={(e) => setIdToCall(e.target.value)}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.systolic?.message}
                          </Typography>
                        </Grid>
                        <Grid xs={4}>
                          {" "}
                          <TextField
                            id="diastolic"
                            name="diastolic"
                            fullWidth
                            margin="dense"
                            {...register("diastolic")}
                            // error={errors.diastolic ? true : false}
                            label="Diastolic"
                            variant="filled"
                            sx={{
                              width: "100%",
                              mr: 2,
                              mx: 2,
                              background: "#ffffff",
                              color: "#000000",
                            }}
                            // value={idToCall}
                            // onChange={(e) => setIdToCall(e.target.value)}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.diastolic?.message}
                          </Typography>
                        </Grid>
                      </Grid>
                    </center>
                    <Grid container spacing={2} sx={{ m: 0 }}>
                      <Grid
                        xs={6}
                        sx={{ mx: 0, mt: 1 }}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Box sx={{ width: "80%" }}>
                          <center> Journal Entry</center>

                          <TextField
                            id="journal_entry"
                            name="journal_entry"
                            label=""
                            fullWidth
                            margin="dense"
                            {...register("journal_entry")}
                            // error={errors.journal_entry ? true : false}
                            multiline
                            rows={6}
                            sx={{
                              //  width: "150%",
                              mr: 2,
                              background: "#ffffff",
                              color: "#000000",
                            }}
                            // value={idToCall}
                            // onChange={(e) => setIdToCall(e.target.value)}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.journal_entry?.message}
                          </Typography>
                          <br />
                          <center>
                            <Button
                              type="submit"
                              sx={{
                                fontWeight: "bold",
                                background: "#ffffff",
                                color: primaryColor,
                                backgroundRadius: 10,
                                "&:hover": {
                                  backgroundColor: " #E66253",
                                  color: "#ffffff",
                                  border: 1,
                                  borderColor: "#ffffff",
                                },
                              }}
                            >
                              SUBMIT
                            </Button>
                          </center>
                        </Box>
                        <br />
                        <br />

                        <br />

                        <br />
                        <br />
                        <br />

                        {/* Meal Plan: <br />
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        // value={value}
                        // onChange={onChange}
                        // error={!!error}
                      >
                        {planOptions.map((option) => (
                          <MenuItem value={option}>{option}</MenuItem>
                        ))}
                      </Select> */}
                      </Grid>
                      <Grid xs={6} sx={{ ml: 0 }}>
                        <center>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "1.5em",
                              mt: 1,
                            }}
                          >
                            {" "}
                            Meals{" "}
                          </Typography>
                        </center>
                        <Tabs
                          value={activeTab}
                          style={{
                            color: "#f00", // Change text color to red
                            fontSize: "18px", // Increase font size
                            fontWeight: "bold", // Make text bold
                          }}
                          onChange={handleTabChange}
                          indicatorColor="primary"
                          centered
                        >
                          {tabContent.map((tab, index) => (
                            <Tab
                              key={index}
                              label={tab.title}
                              style={{
                                color: "#ffffff", // Change text color to red
                                fontSize: "14px", // Increase font size
                                //fontWeight: "bold", // Make text bold
                              }}
                            />
                          ))}
                        </Tabs>
                        {tabContent.map((tab, index) => (
                          <Box key={index} hidden={activeTab !== index}>
                            {tab.content}
                          </Box>
                        ))}
                        {activeTab === 0 ? (
                          <Box>
                            <Box>
                              <Typography>Breakfast</Typography>
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={6}>
                                  <TextField
                                    id="breakfast_food"
                                    name="breakfast_food"
                                    fullWidth
                                    margin="dense"
                                    {...register("breakfast_food")}
                                    error={errors.breakfast_food ? true : false}
                                    label="Food Eaten:"
                                    variant="filled"
                                    size="small"
                                    InputLabelProps={{
                                      style: { color: "#000000" },
                                    }}
                                    sx={{
                                      mr: 2,
                                      background: "#ffffff",
                                      color: "#000000",
                                    }}

                                    // value={idToCall}
                                    // onChange={(e) => setIdToCall(e.target.value)}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  {" "}
                                  {/* <TextField
                              id="filled-basic"
                              label="Meal Plan:"
                              variant="filled"
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#000000" },
                              }}
                              sx={{
                                ml: 2,
                                background: "#ffffff",
                                color: "#000000",
                              }}

                              // value={idToCall}
                              // onChange={(e) => setIdToCall(e.target.value)}
                            /> */}
                                </Grid>{" "}
                                <Grid container spacing={2}>
                                  <Grid xs={6}>
                                    {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                    <br />
                                    <center>
                                      <Typography> Calories</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/calorieswhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="breakfast_calories"
                                          name="breakfast_calories"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          fullWidth
                                          margin="dense"
                                          {...register("breakfast_calories")}
                                          // error={
                                          //   errors.breakfast_calorie ? true : false
                                          // }
                                          // value={
                                          //   typeof caloriesBvalue === "number"
                                          //     ? caloriesBvalue
                                          //     : 800
                                          // }

                                          value={
                                            typeof caloriesBvalue === "number"
                                              ? caloriesBvalue
                                              : 0
                                          }
                                          onChange={handleCaloriesBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={caloriesBvalue}
                                          size="small"
                                          onChange={handleCaloriesBInputChange}
                                          onBlur={handleCaloriesBBlur}
                                          inputProps={{
                                            step: 0,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    <center>
                                      <Typography> Fat</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/fatwhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="breakfast_fat"
                                          name="breakfast_fat"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("breakfast_fat")}
                                          value={
                                            typeof fatBvalue === "number"
                                              ? fatBvalue
                                              : 0
                                          }
                                          onChange={handleFatBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={fatBvalue}
                                          size="small"
                                          onChange={handleFatBInputChange}
                                          onBlur={handleFatBBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                                  </Grid>
                                  <Grid xs={6}>
                                    <br />{" "}
                                    <center>
                                      <Typography> Protein</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/proteinwhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="breakfast_protein"
                                          name="breakfast_protein"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("breakfast_protein")}
                                          value={
                                            typeof proteinBvalue === "number"
                                              ? proteinBvalue
                                              : 0
                                          }
                                          onChange={handleProteinBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={proteinBvalue}
                                          size="small"
                                          onChange={handleProteinBInputChange}
                                          onBlur={handleProteinBBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>{" "}
                                    <center>
                                      <Typography> Carbs</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/carbswhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="breakfast_carbs"
                                          name="breakfast_carbs"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("breakfast_carbs")}
                                          value={
                                            typeof carbsBvalue === "number"
                                              ? carbsBvalue
                                              : 0
                                          }
                                          onChange={handleCarbsBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={carbsBvalue}
                                          size="small"
                                          onChange={handleCarbsBInputChange}
                                          onBlur={handleCarbsBBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              Lunch
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={6}>
                                  <TextField
                                    id="lunch_food"
                                    name="lunch_food"
                                    margin="dense"
                                    {...register("lunch_food")}
                                    error={errors.lunch_food ? true : false}
                                    label="Food Eaten:"
                                    variant="filled"
                                    size="small"
                                    fullWidth
                                    InputLabelProps={{
                                      style: { color: "#000000" },
                                    }}
                                    sx={{
                                      mr: 2,
                                      background: "#ffffff",
                                      color: "#000000",
                                    }}

                                    // value={idToCall}
                                    // onChange={(e) => setIdToCall(e.target.value)}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  {" "}
                                  {/* <TextField
                              id="filled-basic"
                              label="Meal Plan:"
                              variant="filled"
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#000000" },
                              }}
                              sx={{
                                ml: 2,
                                background: "#ffffff",
                                color: "#000000",
                              }}

                              // value={idToCall}
                              // onChange={(e) => setIdToCall(e.target.value)}
                            /> */}
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid xs={6}>
                                    {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                    <br />
                                    <center>
                                      <Typography> Calories</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/calorieswhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_calories"
                                          name="lunch_calories"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("lunch_calories")}
                                          value={
                                            typeof caloriesLvalue === "number"
                                              ? caloriesLvalue
                                              : 0
                                          }
                                          onChange={handleCaloriesLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={caloriesLvalue}
                                          size="small"
                                          onChange={handleCaloriesLInputChange}
                                          onBlur={handleCaloriesLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    <center>
                                      <Typography> Fat</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/fatwhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_fat"
                                          name="lunch_fat"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("lunch_fat")}
                                          value={
                                            typeof fatLvalue === "number"
                                              ? fatLvalue
                                              : 0
                                          }
                                          onChange={handleFatLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={fatLvalue}
                                          size="small"
                                          onChange={handleFatLInputChange}
                                          onBlur={handleFatLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                                  </Grid>
                                  <Grid xs={6}>
                                    <br />{" "}
                                    <center>
                                      <Typography> Protein</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/proteinwhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_protein"
                                          name="lunch_protein"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("lunch_protein")}
                                          value={
                                            typeof proteinLvalue === "number"
                                              ? proteinLvalue
                                              : 0
                                          }
                                          onChange={handleProteinLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={proteinLvalue}
                                          size="small"
                                          onChange={handleProteinLInputChange}
                                          onBlur={handleProteinLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>{" "}
                                    <center>
                                      <Typography> Carbs</Typography>
                                    </center>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <br />
                                      <br />
                                      <Grid item>
                                        <img
                                          src="/images/carbswhite.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_carbs"
                                          name="lunch_carbs"
                                          min={0}
                                          step={1}
                                          max={1000}
                                          label=""
                                          {...register("lunch_carbs")}
                                          value={
                                            typeof carbsLvalue === "number"
                                              ? carbsLvalue
                                              : 0
                                          }
                                          onChange={handleCarbsLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={carbsLvalue}
                                          size="small"
                                          onChange={handleCarbsLInputChange}
                                          onBlur={handleCarbsLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 1000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                            Meals
                            <Box>
                              Snack
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={6}>
                                  <TextField
                                    id="snack_food"
                                    name="title"
                                    fullWidth
                                    margin="dense"
                                    {...register("snack_food")}
                                    error={errors.snack_food ? true : false}
                                    label="Food Eaten:"
                                    variant="filled"
                                    size="small"
                                    InputLabelProps={{
                                      style: { color: "#000000" },
                                    }}
                                    sx={{
                                      mr: 2,
                                      background: "#ffffff",
                                      color: "#000000",
                                    }}

                                    // value={idToCall}
                                    // onChange={(e) => setIdToCall(e.target.value)}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  {" "}
                                  {/* <TextField
                              id="filled-basic"
                              label="Meal Plan:"
                              variant="filled"
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#000000" },
                              }}
                              sx={{
                                ml: 2,
                                background: "#ffffff",
                                color: "#000000",
                              }}

                              // value={idToCall}
                              // onChange={(e) => setIdToCall(e.target.value)}
                            /> */}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid xs={6}>
                                  {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                  <br />
                                  <center>
                                    <Typography> Calories</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/calorieswhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="snack_calories"
                                        name="snack_calories"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("snack_calories")}
                                        value={
                                          typeof caloriesSvalue === "number"
                                            ? caloriesSvalue
                                            : 0
                                        }
                                        onChange={handleCaloriesSSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={caloriesSvalue}
                                        size="small"
                                        onChange={handleCaloriesSInputChange}
                                        onBlur={handleCaloriesSBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <center>
                                    <Typography> Fat</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/fatwhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="snack_fat"
                                        name="snack_fat"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("snack_fat")}
                                        value={
                                          typeof fatSvalue === "number"
                                            ? fatSvalue
                                            : 0
                                        }
                                        onChange={handleFatSSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={fatSvalue}
                                        size="small"
                                        onChange={handleFatSInputChange}
                                        onBlur={handleFatSBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                                </Grid>
                                <Grid xs={6}>
                                  <br />{" "}
                                  <center>
                                    <Typography> Protein</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/proteinwhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="snack_protein"
                                        name="snack_protein"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("snack_protein")}
                                        value={
                                          typeof proteinSvalue === "number"
                                            ? proteinSvalue
                                            : 0
                                        }
                                        onChange={handleProteinSSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={proteinSvalue}
                                        size="small"
                                        onChange={handleProteinSInputChange}
                                        onBlur={handleProteinSBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>{" "}
                                  <center>
                                    <Typography> Carbs</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/carbswhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="snack_carbs"
                                        name="snack_carbs"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("snack_carbs")}
                                        value={
                                          typeof carbsSvalue === "number"
                                            ? carbsSvalue
                                            : 0
                                        }
                                        onChange={handleCarbsSSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={carbsSvalue}
                                        size="small"
                                        onChange={handleCarbsSInputChange}
                                        onBlur={handleCarbsSBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box>
                              Dinner
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={6}>
                                  <TextField
                                    id="dinner_food"
                                    name="dinner_food"
                                    margin="dense"
                                    {...register("dinner_food")}
                                    error={errors.title ? true : false}
                                    label="Food Eaten:"
                                    variant="filled"
                                    size="small"
                                    fullWidth
                                    InputLabelProps={{
                                      style: { color: "#000000" },
                                    }}
                                    sx={{
                                      mr: 2,
                                      background: "#ffffff",
                                      color: "#000000",
                                    }}

                                    // value={idToCall}
                                    // onChange={(e) => setIdToCall(e.target.value)}
                                  />
                                </Grid>
                                <Grid xs={6}>
                                  {" "}
                                  {/* <TextField
                              id="filled-basic"
                              label="Meal Plan:"
                              variant="filled"
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#000000" },
                              }}
                              sx={{
                                ml: 2,
                                background: "#ffffff",
                                color: "#000000",
                              }}

                              // value={idToCall}
                              // onChange={(e) => setIdToCall(e.target.value)}
                            /> */}
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid xs={6}>
                                  {/* <Typography sx={{ ml: 2 }}>Calories</Typography> */}
                                  <br />
                                  <center>
                                    <Typography> Calories</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/calorieswhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="dinner_calories"
                                        name="dinner_calories"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("dinner_calories")}
                                        value={
                                          typeof caloriesDvalue === "number"
                                            ? caloriesDvalue
                                            : 0
                                        }
                                        onChange={handleCaloriesDSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={caloriesDvalue}
                                        size="small"
                                        onChange={handleCaloriesDInputChange}
                                        onBlur={handleCaloriesDBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <center>
                                    <Typography> Fat</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/fatwhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="dinner_fat"
                                        name="dinner_fat"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("dinner_fat")}
                                        value={
                                          typeof fatDvalue === "number"
                                            ? fatDvalue
                                            : 0
                                        }
                                        onChange={handleFatDSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={fatDvalue}
                                        size="small"
                                        onChange={handleFatDInputChange}
                                        onBlur={handleFatDBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  {/* <Typography sx={{ ml: 2 }}>Fat</Typography> */}
                                </Grid>
                                <Grid xs={6}>
                                  <br />{" "}
                                  <center>
                                    <Typography> Protein</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/proteinwhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="dinner_protein"
                                        name="dinner_protein"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("dinner_protein")}
                                        value={
                                          typeof proteinDvalue === "number"
                                            ? proteinDvalue
                                            : 0
                                        }
                                        onChange={handleProteinDSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={proteinDvalue}
                                        size="small"
                                        onChange={handleProteinDInputChange}
                                        onBlur={handleProteinDBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>{" "}
                                  <center>
                                    <Typography> Carbs</Typography>
                                  </center>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <br />
                                    <br />
                                    <Grid item>
                                      <img
                                        src="/images/carbswhite.png"
                                        height="25"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Slider
                                        id="dinner_carbs"
                                        name="dinner_carbs"
                                        min={0}
                                        step={1}
                                        max={1000}
                                        label=""
                                        {...register("dinner_carbs")}
                                        value={
                                          typeof carbsDvalue === "number"
                                            ? carbsDvalue
                                            : 0
                                        }
                                        onChange={handleCarbsDSliderChange}
                                        aria-labelledby="input-slider"
                                        sx={{ color: secondaryColor }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Input
                                        value={carbsDvalue}
                                        size="small"
                                        onChange={handleCarbsDInputChange}
                                        onBlur={handleCarbsDBlur}
                                        inputProps={{
                                          step: 1,
                                          min: 0,
                                          max: 1000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>{" "}
                          </Box>
                        ) : (
                          <Box>
                            <Typography>
                              Choose your Meal Plan for this Week!
                            </Typography>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              // value={selectedNutritionist}
                              onChange={(e) => setChoice(e)}
                              name="type"
                              width="full"
                              size="small"
                              //  {...register("type")}
                              //  error={errors.type ? true : false}
                            >
                              {planChoices?.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>

                            {selectedMealPlan ===
                            "Meal Plans by Nutritionist" ? (
                              <Box>
                                {" "}
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  // value={selectedNutritionist}
                                  onChange={(e) =>
                                    setFinalMealPlan(e.target.value)
                                  }
                                  name="type"
                                  width="full"
                                  size="small"
                                  //  {...register("type")}
                                  //  error={errors.type ? true : false}
                                >
                                  {recommendedMealPlans?.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {console.log(
                                  finalMealPlan,
                                  recommendMeal?.filter(
                                    (item) =>
                                      item?.recommend_mealplan_id_id ===
                                      finalMealPlan?.recommend_mealplan_id
                                  )
                                )}
                                {console.log(recommendMeal)}
                                {recommendedMealPlans && finalMealPlan ? (
                                  <Box>
                                    {console.log(
                                      finalMealPlan,
                                      recommendMeal?.filter(
                                        (item) =>
                                          item?.recommend_mealplan_id ===
                                          finalMealPlan?.recommend_mealplan_id
                                      )
                                    )}
                                    <Typography>
                                      {finalMealPlan?.name}
                                    </Typography>
                                    {recommendMeal
                                      ?.filter(
                                        (item) =>
                                          item?.recommend_mealplan_id ===
                                          finalMealPlan?.recommend_mealplan_id
                                      )
                                      .sort((a, b) => {
                                        const order = [
                                          "Breakfast",
                                          "Lunch",
                                          "Snack",
                                          "Dinner",
                                        ];
                                        return (
                                          order.indexOf(a.type) -
                                          order.indexOf(b.type)
                                        );
                                      })
                                      .sort((a, b) => {
                                        const order = ["1", "2", "3", "4", "5"];
                                        return (
                                          order.indexOf(a.day) -
                                          order.indexOf(b.day)
                                        );
                                      })

                                      .map((meal) => (
                                        <tr key={meal?.shop_meal_id}>
                                          <td>{meal?.type}</td>
                                          <td>{meal?.food}</td>
                                        </tr>
                                      ))}
                                  </Box>
                                ) : (
                                  <>{console.log(finalMealPlan)}</>
                                )}
                              </Box>
                            ) : selectedMealPlan === "Generated Meal Plans" ? (
                              <Box>
                                {" "}
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  // value={selectedNutritionist}
                                  onChange={(e) =>
                                    setFinalMealPlan(e.target.value)
                                  }
                                  name="type"
                                  width="full"
                                  size="small"
                                  //  {...register("type")}
                                  //  error={errors.type ? true : false}
                                >
                                  {generatedMealPlans?.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {finalMealPlan ? (
                                  <Box>
                                    {console.log(finalMealPlan)}
                                    <Typography>
                                      {finalMealPlan?.name}
                                    </Typography>
                                    <Box>
                                      {finalMealPlan?.meal?.map((item) => (
                                        <Box>
                                          {item?.Day}
                                          {item?.meals.map((items) => (
                                            <Box>
                                              {items?.Meal} :{" "}
                                              {items?.details.recipe.label}
                                            </Box>
                                          ))}
                                        </Box>
                                      ))}
                                    </Box>
                                  </Box>
                                ) : (
                                  <>{console.log(finalMealPlan)}</>
                                )}
                              </Box>
                            ) : selectedMealPlan === "Meal Plan Ordered" ? (
                              <Box>
                                {" "}
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  // value={selectedNutritionist}
                                  onChange={(e) =>
                                    setFinalMealPlan(e.target.value)
                                  }
                                  name="type"
                                  width="full"
                                  size="small"
                                  //  {...register("type")}
                                  //  error={errors.type ? true : false}
                                >
                                  {orderedMealPlans?.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {finalMealPlan ? (
                                  <Box>
                                    {console.log(finalMealPlan)}
                                    <Typography>
                                      {finalMealPlan?.name}
                                    </Typography>
                                    {shopMeal
                                      ?.filter(
                                        (item) =>
                                          item?.mealplan_id ===
                                          finalMealPlan?.shop_mealplan_id
                                      )
                                      // .sort((a, b) => {
                                      //   if (a.day !== b.day) {
                                      //     return a.day - b.day;
                                      //   } else {
                                      //     return a.type.localeCompare(b.type);
                                      //   }
                                      // })
                                      .sort((a, b) => {
                                        const order = [
                                          "Breakfast",
                                          "Lunch",
                                          "Snack",
                                          "Dinner",
                                        ];
                                        return (
                                          order.indexOf(a.type) -
                                          order.indexOf(b.type)
                                        );
                                      })
                                      .sort((a, b) => {
                                        const order = ["1", "2", "3", "4", "5"];
                                        return (
                                          order.indexOf(a.day) -
                                          order.indexOf(b.day)
                                        );
                                      })
                                      .map((meal) => (
                                        <tr key={meal?.shop_meal_id}>
                                          <td>{meal?.type}</td>
                                          <td>{meal?.food}</td>

                                          {/* ... other table cells ... */}
                                        </tr>
                                      ))}
                                  </Box>
                                ) : (
                                  <>{console.log(finalMealPlan)}</>
                                )}
                              </Box>
                            ) : (
                              <Box></Box>
                            )}
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    {/* <button
                    style={{
                      background: "#ffffff",
                      color: primaryColor,
                      backgroundRadius: 10,
                    }}
                    type="submit"
                  >
                    SUBMIT
                  </button> */}
                  </form>
                )}
              </Box>
            </Modal>
          </Grid>
        </Grid>
      )}

      {/* // !{details} */}
      {/* <Box>Date</Box> */}
      {foodEntry.length > 0 ? (
        <>
          <Box
            sx={{
              borderRadius: 0,
              background: secondaryColor,
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
                color: secondaryColor,
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
              <Grid xs={4} md={4} sx={{ borderRadius: 5 }}>
                {/* {nums} */}
                CARBS{" "}
                <Box
                  sx={{
                    background: "#ffffff",
                    color: secondaryColor,
                    borderRadius: 2,
                    mx: {
                      sm: 1,
                      md: 5,
                    },
                  }}
                >
                  {carbs}g
                </Box>
              </Grid>
              <Grid xs={4} md={4}>
                PROTEIN{" "}
                <Box
                  sx={{
                    background: "#ffffff",
                    color: primaryColor,
                    borderRadius: 2,
                    mx: {
                      sm: 1,
                      md: 5,
                    },
                  }}
                >
                  {protein} g
                </Box>
              </Grid>
              <Grid xs={4} md={4}>
                FATS{" "}
                <Box
                  sx={{
                    background: "#ffffff",
                    color: secondaryColor,
                    borderRadius: 2,
                    mx: {
                      sm: 1,
                      md: 5,
                    },
                  }}
                >
                  {fat} g
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <Typography>{journalEntry[0]?.title}</Typography>
          <Typography>{journalEntry[0]?.entry}</Typography>
          <Typography>{journalEntry[0]?.date}</Typography> */}

          <br />
          {/* <Grid container spacing={2}>
            <Grid xs={6}>
              {" "}
              <Typography sx={{ fontSize: "30px" }}>
                {journalEntry[0]?.title}
              </Typography>{" "}
              <br />
              <Typography>{journalEntry[0]?.entry}</Typography>
            </Grid>
            <Grid xs={6}>
              {" "}
              <Typography>{journalEntry[0]?.date}</Typography>
              {dayjs(journalEntry[0]?.date).format("dddd, MMMM D, YYYY")};
            </Grid>
          </Grid> */}
        </>
      ) : (
        <div>You haven't added any food entries yet.</div>
      )}
      <br />
      <br />

      {/* {console.log(journalEntry)} */}
      {/* {journalEntry[0].title} */}
      {foodEntry.length > 0 ? (
        foodEntry
          .sort((a, b) => {
            const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
            return order.indexOf(a.type) - order.indexOf(b.type);
          })
          .map((meal, index) => (
            <Grid container spacing={2} sx={{ mb: "1px" }}>
              <Grid xs={4}>
                <img src={getMealPic(index)} height="30%" />
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    color: "#99756E",
                    fontSize: {
                      xs: "1em", // For extra small screens
                      sm: "1.3em", // For small screens
                      md: "1.5em", // For medium screens
                      lg: "2em", // For large screens
                    },
                    textAlign: "left",
                  }}
                >
                  {meal.type}:{meal.food}
                </Typography>
                <br />
                <Grid
                  container
                  justify="flex-end"
                  alignItems="left"
                  spacing={2}
                  sx={{ mt: 0 }}
                >
                  <Grid xs={6} md={3}>
                    <img src="/images/calories.png" />
                    {meal.calories} calories
                  </Grid>
                  <Grid xs={6} md={3}>
                    {" "}
                    <img src="/images/fat.png" /> {meal.fat}g fat
                  </Grid>
                  <Grid xs={6} md={3}>
                    {" "}
                    <img src="/images/carbs.png" /> {meal.carbs}g carbs
                  </Grid>
                  <Grid xs={6} md={3}>
                    {" "}
                    <img src="/images/protein.png" /> {meal.protein}g protein
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={2}>
                {/* <Button
                sx={{ color: "#E66253", textDecoration: "underline" }}
                onClick={() => handleSelectMeal(meal)}
              >
                View Details{" "}
              </Button> */}

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
                          <img
                            src="/images/close.png"
                            height="10"
                            weight="10"
                          />
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
        <div></div>
      )}
    </div>
  );
}

export default FoodJournalHome;
