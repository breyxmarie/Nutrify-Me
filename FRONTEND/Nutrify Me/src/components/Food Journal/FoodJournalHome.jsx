import { useState, useEffect, useContext, useCallback } from "react";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
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
import axios from "axios";
import _ from "lodash";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

function FoodJournalHome() {
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  //? random number generator
  const generateRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  //?

  //? api infor
  const EDAMAM_APP_ID = "a91422a3";
  const EDAMAM_APP_KEY = "98019bc3768ed14abc6be04432e9d8e3";

  //?
  //? blood pressure range

  const [BPRange, setBPRange] = useState(["Normal Blood Pressure", "#4DDA5B"])
  const getBPRange = (sys, dia) => {
    let range; 
    let num = generateRandomNumber(5)
    console.log(sys, dia)
    let normal = ["Maintain a Balanced Diet", 
      "Stay Active",
      "Manage Stress",
      "Limit Alcohol",
      "Maintain a Healthy Weight",
    ]
    let elevate = [
      "Reduce Sodium Intake", 
      "Exercise Regularly",
      "Monitor Your Diet",
      "Monitor Your Diet",
      "Limit Caffeine",
    ]
    let stage1 = [
      "Cut Down on Salt", 
      "Adopt the DASH Diet",
      "Get Active",
      "Monitor Blood Pressure",
      "Limit Alcohol and Quit Smoking",
    ]
    let stage2 = [
      "Consult Your Healthcare Provider", 
      "Follow a Strict Low-Sodium Diet",
      "Follow Prescribed Treatment",
      "Focus on Heart-Healthy Activities",
      "Prioritize Stress Management",
      "Quit Smoking and Limit Alcohol:",
    ]
    if (sys < 120 && dia < 80) {
      setBPRange(["Normal Blood Pressure", "#4DDA5B", normal[num]]);
      return ["Normal Blood Pressure", "#4DDA5B", normal[num]];
    } 
    else if (sys >= 120 && sys <= 129 && dia < 80) {
      setBPRange(["Elevated Blood Pressure", "#F2CC01", elevate[num]]);
      return ["Elevated Blood Pressure", "#F2CC01", elevate[num]];
    } 
    else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      setBPRange(["Stage 1 Hypertension", "#ED7014", stage1[num]]);
      return ["Stage 1 Hypertension", "#ED7014", stage1[num]];
    } 
    else if (sys >= 140 || dia >= 90) {
      setBPRange(["Stage 2 Hypertension", "#FF0000", stage2[num]]); 
      return ["Stage 2 Hypertension", "#FF0000", stage2[num]];
    }
    

  }

  //?



  //? BP recommendation algorithm

  const getTips = () => {
    
    if (sys <= 120 && dia <= 80) {
      return ["Normal Blood Pressure", "#4DDA5B"]
     }
 
     else if (sys <= 129 || sys >= 120 && dia <= 80) {
       return  ["Elevated Blood Pressure", "#F2CC01"]
     }
 
     else if (sys <= 139 || sys >= 130 && dia <= 89 || dia >= 80) {
       return  ["Stage 1 Hypertension", "#ED7014"]
     }
 
     else if (sys >= 140 && dia >= 90) {
      return ["Stage 2 Hypertension", "#FF0000"]
     }
  }

  //?

// fetchMealSuggestionsBP

//getBPRange(parseInt(journalEntry[0]?.systolic), parseInt(journalEntry[0]?.diastolic))[0]
  //? meal recommendation for with BP

  const [caloriesConsidered, setCaloriesConsidered] = useState(1600)
  const [BPMealsLoading, setBPMealsLoading] = useState(false)
  const [mealBPRecommendations, setMealBPRecommendations] = useState([])
  let type = "breakfast"
  let arrayType = ["breakfast", "lunch", "snack", "dinner"]
  const fetchMealSuggestionsBP = useCallback(
    _.debounce(async (category) => {
      // if (!query) {
      //  // setSuggestionsHypertension([]);
      //   return;
      // }

      setBPMealsLoading(true);
      try {

        //q=&dishType=main&mealType=${type}&health=DASH&diet=low-sodium&calories=${caloriesConsidered}
        //q=&dishType=main&mealType=${type}&diet=low-sodium&calories=${caloriesConsidered}
        //q=&dishType=main&mealType=${type}&calories=${caloriesConsidered}
        // API request to Edamam to search for recipes
        let link;

        switch (category) {
          case "Normal Blood Pressure":
            link = `q=&dishType=main&calories=${caloriesConsidered}&` 
            break;
          case "Elevated Blood Pressure":
            link = `q=&dishType=main&diet=low-sodium&calories=${caloriesConsidered}&`
            break;
          case "Stage 1 Hypertension":
            link = `q=&dishType=main&health=DASH&diet=low-sodium&calories=${caloriesConsidered}&`
            break;
          case "Stage 2 Hypertension":
             link = `q=&dishType=main&health=DASH&diet=low-sodium&calories=${caloriesConsidered}&`
            break;
          }

        let tempArr = []

        // arrayType.map((item) => (
        //   axios.get(`https://api.edamam.com/search?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=1&to=100&` + link + `&mealType=${item}`).then((res) => {
            
        //     tempArray.push({type: item, meals: res.data.hits.map((hit) => hit.recipe)})
        //     console.log({type: item, meals: res.data.hits.map((hit) => hit.recipe)})
        //   })

        // ))

        const requests = arrayType.map((item) =>
          axios.get(
            `https://api.edamam.com/search?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=1&to=100&` +
            link +
            `mealType=${item}`
          )
        );

         // Wait for all promises to resolve
         const responses = await Promise.all(requests);

         // Process the responses and set state
         const tempArray = responses.map((res, index) => ({
           type: arrayType[index],
           meals: res.data.hits.map((hit) => hit.recipe),
         }));
 
         setMealBPRecommendations(tempArray);

      
        
        // const response = await axios.get(
        //   `https://api.edamam.com/search?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=1&to=100&` + link
          
        // );


        // Update the suggestions list with fetched data
        //setTempDataHypertension(response.data.hits.map((hit) => hit.recipe))
      //setMealBPRecommendations(response.data.hits.map((hit) => hit.recipe));
      } catch (error) {
        console.error("Error fetching meal suggestions:", error);
      } finally {
        setBPMealsLoading(false);
      }
    }, 500), // Debounce delay (500 ms)
    []
  );
  //?



  //? meal recommendation base on calories 

  //?
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
  //const { logo, setLogo } = useContext(ImageContext);
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
              // console.log(tempMealstalaga);
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
     
          res.data.map(
            (item1) => (
              // console.log(
              //   respo.data?.filter(
              //     (items) =>
              //       items.recommend_mealplan_id === item1.recommend_mealplan_id
              //   )
              // ),
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
         
          //setRecommendMeal(tempMealstalaga);
          setRecommendMeal(tempMealstalaga);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
 

  const [currentJournalData, setCurrentJournalData] = useState()
  const [currentFoodData, setCurrentFoodData] = useState([])
  const [profilingData, setProfilingData] = useState()
  const getCurrentData = async (day) => {
    AxiosInstance.get(`profiling`).then((respon) => {
      setProfilingData(respon.data.find((item) => item.user_id_id === loggedInUser.user_id))

    }) 
   
    await AxiosInstance.get(`journalentry`).then((res) => {

      let journalData = res.data?.filter(
        (item) => item.user_id == loggedInUser.user_id
      )
      let currentDate = res.data?.find(
        (item) => item.date == day && item.user_id == loggedInUser.user_id
      )
      
      if(currentDate){
        setCurrentJournalData(currentDate)

        AxiosInstance.get(`foodentry`).then((respo) => {
          setCurrentFoodData(respo.data?.filter((item) => item.journal_id == currentDate.journal_id)); 

          try {
            AxiosInstance.get(`foodentry`).then((res) => {

              setCurrentFoodData(res.data.filter((item) => item.journal_id_id === currentDate.journal_id))
            })
          } catch (error){
           // setFoodEntry([]);
           console.log(error)
          }
        })
      }

      else {
        let entries = journalData.filter((item) => item.user_id === loggedInUser.user_id).sort((a, b) => new Date(b.date))
        


        if (entries) {
          setCurrentJournalData(entries[0])
          try {
            AxiosInstance.get(`foodentry`).then((res) => {

              setCurrentFoodData(res.data.filter((item) => item.journal_id_id === entries[0].journal_id))
            })
          } catch {
           // setFoodEntry([]); 
          }
        }
        else {
          AxiosInstance.get(`profiling`).then((respon) => {
            setCurrentJournalData(respon.data.find((item) => item.user_id_id === loggedInUser.user_id))
      
          })
         

        }
      }


     
    })
  }
const [selectedDates, setSelectedDates] = useState()
  const getJournalData = async (day) => {
    setSelectedDates(day)
    getCurrentData(day)
    await AxiosInstance.get(`journalentry`).then((res) => {

      
      setJournalEntry(
        res.data?.filter(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )
      );

      // console.log(res.data, res.data?.find(
      //   (item) => item.date == day && item.user_id == loggedInUser.user_id
      // ), getBPRange(parseInt(res.data?.find(
      //   (item) => item.date == day && item.user_id == loggedInUser.user_id
      // )?.systolic), parseInt(res.data?.find(
      //   (item) => item.date == day && item.user_id == loggedInUser.user_id
      // )?.diastolic)))

      getBPRange(parseInt(res.data?.find(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )?.systolic), parseInt(res.data?.find(
          (item) => item.date == day && item.user_id == loggedInUser.user_id
        )?.diastolic))
      // fetchMealSuggestionsBP(getBPRange(parseInt(res.data?.find(
      //   (item) => item.date == day && item.user_id == loggedInUser.user_id
      // )?.systolic), parseInt(res.data?.find(
      //   (item) => item.date == day && item.user_id == loggedInUser.user_id
      // )?.diastolic))[0])
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
      setCalories((temp / 2000) * 100);
    });
  };

  useEffect(() => {
    getJournalData(dayjs().format("YYYY-MM-DD"));
   // fetchMealSuggestionsBP(BPRange[0])
    //  console.log(journalEntry);
    getData();
    getCurrentData()
    getDietRecommendations(true)
    generateWeeklyReport()
  }, []);

  const [randomNumberbreakfast, setRandomNumberbreakfast] = useState(0)
  const [randomNumberlunch, setRandomNumberlunch] = useState(0)
  const [randomNumbersnack, setRandomNumbersnack] = useState(0)
  const [randomNumberdinner, setRandomNumberdinner] = useState(0)
  useEffect(() => {
    //getfoodEntryData(journalEntry.journal_id);
    console.log("slay");
  //fetchMealSuggestionsBP(BPRange[0])
  generateWeeklyReport(selectedDates)
  setRandomNumberbreakfast(generateRandomNumber(30))
  setRandomNumberlunch(generateRandomNumber(30))
  setRandomNumbersnack(generateRandomNumber(30))
  setRandomNumberdinner(generateRandomNumber(30))
  getDietRecommendations(true)
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
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
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
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
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

  //const [dinnerFood, setDinnerFood] = useState(null);
  const Input = styled(MuiInput)`
    width: 42px;
  `;

  const [value, setValue] = React.useState(0);

  const [breakfastFood, setBreakfastFood] = useState("")
  const [lunchFood, setLunchFood] = useState("")
  const [snackFood, setSnackFood] = useState("")
  const [dinnerFood, setDinnerFood] = useState("")

  const [breakfastFoodImage, setBreakfastFoodImage] = useState("/images/food.png")
  const [lunchFoodImage, setLunchFoodImage] = useState("/images/food.png")
  const [snackFoodImage, setSnackFoodImage] = useState("/images/food.png")
  const [dinnerFoodImage, setDinnerFoodImage] = useState("/images/food.png")


  const [caloriesBvalue, setCaloriesBvalue] = React.useState(0);
  const [fatBvalue, setFatBvalue] = React.useState(0);
  const [proteinBvalue, setProteinBvalue] = React.useState(0);
  const [carbsBvalue, setCarbsBvalue] = React.useState(0);
  const [sodiumBvalue, setSodiumBvalue] = React.useState(0);
  const [potassiumBvalue, setPotassiumBvalue] = React.useState(0);

  const [caloriesLvalue, setCaloriesLvalue] = React.useState(0);
  const [fatLvalue, setFatLvalue] = React.useState(0);
  const [proteinLvalue, setProteinLvalue] = React.useState(0);
  const [carbsLvalue, setCarbsLvalue] = React.useState(0);
  const [sodiumLvalue, setSodiumLvalue] = React.useState(0);
  const [potassiumLvalue, setPotassiumLvalue] = React.useState(0);

  const [caloriesSvalue, setCaloriesSvalue] = React.useState(0);
  const [fatSvalue, setFatSvalue] = React.useState(0);
  const [proteinSvalue, setProteinSvalue] = React.useState(0);
  const [carbsSvalue, setCarbsSvalue] = React.useState(0);
  const [sodiumSvalue, setSodiumSvalue] = React.useState(0);
  const [potassiumSvalue, setPotassiumSvalue] = React.useState(0);

  const [caloriesDvalue, setCaloriesDvalue] = React.useState(0);
  const [fatDvalue, setFatDvalue] = React.useState(0);
  const [proteinDvalue, setProteinDvalue] = React.useState(0);
  const [carbsDvalue, setCarbsDvalue] = React.useState(0);
  const [sodiumDvalue, setSodiumDvalue] = React.useState(0);
  const [potassiumDvalue, setPotassiumDvalue] = React.useState(0);

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
  const handleSodiumBSliderChange = (event, newValue) => {
    setSodiumBvalue(newValue);
  };
  const handleSodiumBInputChange = (event) => {
    setSodiumBvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const handlePotassiumBSliderChange = (event, newValue) => {
    setPotassiumBvalue(newValue);
  };
  const handlePotassiumBInputChange = (event) => {
    setPotassiumBvalue(event.target.value === "" ? 0 : Number(event.target.value));
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
    } else if (caloriesBvalue > 10000) {
      setCaloriesBvalue(10000);
    }
  };

  const handleFatBBlur = () => {
    if (fatBvalue < 0) {
      setFatBvalue(0);
    } else if (fatBvalue > 10000) {
      setFatBvalue(10000);
    }
  };

  const handleProteinBBlur = () => {
    if (proteinBvalue < 0) {
      setProteinBvalue(0);
    } else if (proteinBvalue > 10000) {
      setProteinBvalue(10000);
    }
  };

  const handleCarbsBBlur = () => {
    if (carbsBvalue < 0) {
      setCarbsBvalue(0);
    } else if (carbsBvalue > 10000) {
      setCarbsBvalue(10000);
    }
  };

  const handleSodiumBBlur = () => {
    if (sodiumBvalue < 0) {
      setSodiumBvalue(0);
    } else if (sodiumBvalue > 10000) {
      setSodiumBvalue(10000);
    }
  };

  const handlePotassiumBBlur = () => {
    if (potassiumBvalue < 0) {
      setPotassiumBvalue(0);
    } else if (potassiumBvalue > 10000) {
      setPotassiumBvalue(10000);
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

  const handleSodiumLSliderChange = (event, newValue) => {
    setSodiumLvalue(newValue);
  };
  const handleSodiumLInputChange = (event) => {
    setSodiumLvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const handlePotassiumLSliderChange = (event, newValue) => {
    setPotassiumLvalue(newValue);
  };
  const handlePotassiumLInputChange = (event) => {
    setPotassiumLvalue(event.target.value === "" ? 0 : Number(event.target.value));
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
    } else if (caloriesLvalue > 10000) {
      setCaloriesLvalue(10000);
    }
  };

  const handleFatLBlur = () => {
    if (fatLvalue < 0) {
      setFatLvalue(0);
    } else if (fatLvalue > 10000) {
      setFatLvalue(10000);
    }
  };

  const handleProteinLBlur = () => {
    if (proteinLvalue < 0) {
      setProteinLvalue(0);
    } else if (proteinLvalue > 10000) {
      setProteinLvalue(10000);
    }
  };

  const handleCarbsLBlur = () => {
    if (carbsLvalue < 0) {
      setCarbsLvalue(0);
    } else if (carbsLvalue > 10000) {
      setCarbsLvalue(10000);
    }
  };


  const handleSodiumLBlur = () => {
    if (sodiumLvalue < 0) {
      setSodiumLvalue(0);
    } else if (sodiumLvalue > 10000) {
      setSodiumLvalue(10000);
    }
  };

  const handlePotassiumLBlur = () => {
    if (potassiumLvalue < 0) {
      setPotassiumLvalue(0);
    } else if (potassiumLvalue > 10000) {
      setPotassiumLvalue(10000);
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


  const handleSodiumSSliderChange = (event, newValue) => {
    setSodiumSvalue(newValue);
  };
  const handleSodiumSInputChange = (event) => {
    setSodiumSvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const handlePotassiumSSliderChange = (event, newValue) => {
    setPotassiumSvalue(newValue);
  };
  const handlePotassiumSInputChange = (event) => {
    setPotassiumSvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleCaloriesSBlur = () => {
    if (caloriesSvalue < 0) {
      setCaloriesSvalue(0);
    } else if (caloriesSvalue > 10000) {
      setCaloriesSvalue(10000);
    }
  };

  const handleFatSBlur = () => {
    if (fatSvalue < 0) {
      setFatSvalue(0);
    } else if (fatSvalue > 10000) {
      setFatSvalue(10000);
    }
  };

  const handleProteinSBlur = () => {
    if (proteinSvalue < 0) {
      setProteinSvalue(0);
    } else if (proteinSvalue > 10000) {
      setProteinSvalue(10000);
    }
  };

  const handleCarbsSBlur = () => {
    if (carbsSvalue < 0) {
      setCarbsSvalue(0);
    } else if (carbsSvalue > 10000) {
      setCarbsSvalue(10000);
    }
  };

  const handleSodiumSBlur = () => {
    if (sodiumSvalue < 0) {
      setSodiumSvalue(0);
    } else if (sodiumSvalue > 10000) {
      setSodiumSvalue(10000);
    }
  };

  const handlePotassiumSBlur = () => {
    if (potassiumSvalue < 0) {
      setPotassiumSvalue(0);
    } else if (potassiumSvalue > 10000) {
      setPotassiumSvalue(10000);
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


  const handleSodiumDSliderChange = (event, newValue) => {
    setSodiumDvalue(newValue);
  };
  const handleSodiumDInputChange = (event) => {
    setSodiumDvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const handlePotassiumDSliderChange = (event, newValue) => {
    setPotassiumDvalue(newValue);
  };
  const handlePotassiumDInputChange = (event) => {
    setPotassiumDvalue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleCaloriesDBlur = () => {
    if (caloriesDvalue < 0) {
      setCaloriesDvalue(0);
    } else if (caloriesDvalue > 10000) {
      setCaloriesDvalue(10000);
    }
  };

  const handleFatDBlur = () => {
    if (fatDvalue < 0) {
      setFatDvalue(0);
    } else if (fatDvalue > 10000) {
      setFatDvalue(10000);
    }
  };

  const handleProteinDBlur = () => {
    if (proteinDvalue < 0) {
      setProteinDvalue(0);
    } else if (proteinDvalue > 10000) {
      setProteinDvalue(10000);
    }
  };

  const handleCarbsDBlur = () => {
    if (carbsDvalue < 0) {
      setCarbsDvalue(0);
    } else if (carbsDvalue > 10000) {
      setCarbsDvalue(10000);
    }
  };

  const handleSodiumDBlur = () => {
    if (sodiumDvalue < 0) {
      setSodiumDvalue(0);
    } else if (sodiumDvalue > 10000) {
      setSodiumDvalue(10000);
    }
  };

  const handlePotassiumDBlur = () => {
    if (potassiumDvalue < 0) {
      setPotassiumDvalue(0);
    } else if (potassiumDvalue > 10000) {
      setPotassiumDvalue(10000);
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

    // breakfast_food: yup.string(),
    // breakfast_calories: yup.string(),
    // breakfast_fat: yup.string(),
    // breakfast_protein: yup.string(),
    // breakfast_carbs: yup.string(),
    // breakfast_sodium: yup.string(),
    // breakfast_potassium: yup.string(),

    // lunch_food: yup.string(),
    // lunch_calories: yup.string(),
    // lunch_fat: yup.string(),
    // lunch_protein: yup.string(),
    // lunch_carbs: yup.string(),
    // lunch_sodium: yup.string(),
    // lunch_potassium: yup.string(),

    // snack_food: yup.string(),
    // snack_calories: yup.string(),
    // snack_fat: yup.string(),
    // snack_protein: yup.string(),
    // snack_carbs: yup.string(),
    // snack_sodium: yup.string(),
    // snack_potassium: yup.string(),

    // dinner_food: yup.string(),
    // dinner_calories: yup.string(),
    // dinner_fat: yup.string(),
    // dinner_protein: yup.string(),
    // dinner_carbs: yup.string(),
    // dinner_sodium: yup.string(),
    // dinner_potassium: yup.string(),
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
                    sodium: 0,
                    potassium: 0,
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
          meal_plan: "No Meal Plan",
        }).then((res) => {
          console.log(res.data.id);

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Breakfast",
              food: breakfastFood,
              calories: caloriesBvalue,
              fat: fatBvalue,
              protein: proteinBvalue,
              carbs: carbsBvalue,
              journal_id: res.data.id,
              sodium: sodiumBvalue,
              potassium: potassiumBvalue,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response, error);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Lunch",
              food: lunchFood,
              calories: caloriesLvalue,
              fat: fatLvalue,
              protein: proteinLvalue,
              carbs: carbsLvalue,
              journal_id: res.data.id,
              sodium: sodiumLvalue,
              potassium: potassiumLvalue,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Snack",
              food: snackFood,
              calories: caloriesSvalue,
              fat: fatSvalue,
              protein: proteinSvalue,
              carbs: carbsSvalue,
              journal_id: res.data.id,
              sodium: sodiumSvalue,
              potassium: potassiumSvalue,
            }).then((res) => {
              console.log(res, res.data);
            });
          } catch (error) {
            console.log(error.response);
          }

          try {
            AxiosInstance.post(`foodentry/`, {
              type: "Dinner",
              food: dinnerFood,
              calories: caloriesDvalue,
              fat: fatDvalue,
              protein: proteinDvalue,
              carbs: carbsDvalue,
              journal_id: res.data.id,
              sodium: sodiumDvalue,
              potassium: potassiumDvalue,
            }).then((res) => {
              console.log(res, res.data);





             
              // setForceRender(forceRender => forceRender + 1);
              toast.success("Entry Added");
              setLoading1(false);
              setActiveTab(0);
             








              getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
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
    setLoading1(true)
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
            toast.success("Entry Updated");
            setLoading1(false);
            getJournalData(dayjs(selectedDate).format("YYYY-MM-DD"));
            handleClose1()
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


  //? food recommendations breakfast
  // State to hold the user input and suggestions
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempData , setTempData] = useState([])

  // Edamam API credentials (Replace with your actual credentials)
 

  // Debounced function to fetch meal suggestions from Edamam API
  const fetchMealSuggestions = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // API request to Edamam to search for recipes
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );

        // Update the suggestions list with fetched data
        setTempData(response.data.hits.map((hit) => hit.recipe))
        setSuggestions(response.data.hits.map((hit) => hit.recipe.label));
      } catch (error) {
        console.error("Error fetching meal suggestions:", error);
      } finally {
        setLoading(false);
      }
    }, 500), // Debounce delay (500 ms)
    []
  );

  // Handle input changes and trigger API request
  const handleInputChanges = (e, type) => {
    const value = e.target.value;
 //   setInputValue(value);
    fetchMealSuggestions(value);

    if (type === "breakfast") {
      setBreakfastFood(value)
    }
    if (type === "lunch") {
      setLunchFood(value)
    }
    
  };

  const [ foods, setFoods] = useState()
  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion, index, type) => {


    if (type === "breakfast") {
      setBreakfastFood(suggestion)
      setBreakfastFoodImage(tempData[index].image)
      setCaloriesBvalue(parseInt(tempData[index].calories / tempData[index].yield))
      setProteinBvalue(parseInt(tempData[index].digest[2].total))
      setCarbsBvalue(parseInt(tempData[index].digest[1].total))
      setFatBvalue(parseInt(tempData[index].digest[0].total))
      setPotassiumBvalue(parseInt(tempData[index].digest[7].total))
      setSodiumBvalue(parseInt(tempData[index].digest[4].total))
    }
    else if ( type === "lunch") {
      setLunchFood(suggestion)
    }


   // setInputValue(suggestion);
    console.log(suggestion, tempData[index])
    setSuggestions([]);
    setTempData([])
    
  };
  //?

//? food recommendations lunch Lunch
  // State to hold the user input and suggestions
  const [inputValueLunch, setInputValueLunch] = useState("");
  const [suggestionsLunch, setSuggestionsLunch] = useState([]);
  const [loadingLunch, setLoadingLunch] = useState(false);
  const [tempDataLunch , setTempDataLunch] = useState([])

  // Edamam API credentials (Replace with your actual credentials)
 

  // Debounced function to fetch meal suggestions from Edamam API
  const fetchMealSuggestionsLunch = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setSuggestionsLunch([]);
        return;
      }

      setLoadingLunch(true);
      try {
        // API request to Edamam to search for recipes
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );

        // Update the suggestions list with fetched data
        setTempDataLunch(response.data.hits.map((hit) => hit.recipe))
        setSuggestionsLunch(response.data.hits.map((hit) => hit.recipe.label));
      } catch (error) {
        console.error("Error fetching meal suggestions:", error);
      } finally {
        setLoadingLunch(false);
      }
    }, 500), // Debounce delay (500 ms)
    []
  );

  // Handle input changes and trigger API request
  const handleInputChangesLunch = (e, type) => {
    const value = e.target.value;
 //   setInputValue(value);
    fetchMealSuggestionsLunch(value);
    setLunchFood(value)
    // if (type === "breakfast") {
    //   setBreakfastFood(value)
    // }
    // else if (type === "lunch") {
    //   setLunchFood(value)
    // }
    
  };

 // const [ foods, setFoods] = useState()
  // Handle selecting a suggestion
  const handleSuggestionClickLunch = (suggestion, index, type) => {


    // if (type === "breakfast") {
    //   setBreakfastFood(suggestion)
    //   setCaloriesBvalue(tempData[index].calories / tempData[index].yield)
    //   setProteinBvalue(parseInt(tempData[index].digest[2].total))
    //   setCarbsBvalue(parseInt(tempData[index].digest[1].total))
    //   setFatBvalue(parseInt(tempData[index].digest[0].total))
    //   setPotassiumBvalue(parseInt(tempData[index].digest[7].total))
    //   setSodiumBvalue(parseInt(tempData[index].digest[4].total))
    // }
    if ( type === "lunch") {
      setLunchFood(suggestion)
    }


   // setInputValue(suggestion);

      setLunchFood(suggestion)
      setLunchFoodImage(tempDataLunch[index].image)
      setCaloriesLvalue(parseInt(tempDataLunch[index].calories / tempDataLunch[index].yield))
      setProteinLvalue(parseInt(tempDataLunch[index].digest[2].total))
      setCarbsLvalue(parseInt(tempDataLunch[index].digest[1].total))
      setFatLvalue(parseInt(tempDataLunch[index].digest[0].total))
      setPotassiumLvalue(parseInt(tempDataLunch[index].digest[7].total))
      setSodiumLvalue(parseInt(tempDataLunch[index].digest[4].total))
    console.log(suggestion, tempDataLunch[index])
    setSuggestionsLunch([]);
    setTempDataLunch([])
    
  };
  //?

  //? food recommendations Snack
  // State to hold the user input and suggestions
  const [inputValueSnack, setInputValueSnack] = useState("");
  const [suggestionsSnack, setSuggestionsSnack] = useState([]);
  const [loadingSnack, setLoadingSnack] = useState(false);
  const [tempDataSnack , setTempDataSnack] = useState([])

  // Edamam API credentials (Replace with your actual credentials)
 

  // Debounced function to fetch meal suggestions from Edamam API
  const fetchMealSuggestionsSnack = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setSuggestionsSnack([]);
        return;
      }

      setLoadingSnack(true);
      try {
        // API request to Edamam to search for recipes
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );

        // Update the suggestions list with fetched data
        setTempDataSnack(response.data.hits.map((hit) => hit.recipe))
        setSuggestionsSnack(response.data.hits.map((hit) => hit.recipe.label));
      } catch (error) {
        console.error("Error fetching meal suggestions:", error);
      } finally {
        setLoadingSnack(false);
      }
    }, 500), // Debounce delay (500 ms)
    []
  );

  // Handle input changes and trigger API request
  const handleInputChangesSnack = (e, type) => {
    const value = e.target.value;
 //   setInputValue(value);
    fetchMealSuggestionsSnack(value);
    setSnackFood(value)
    // if (type === "breakfast") {
    //   setBreakfastFood(value)
    // }
    // else if (type === "lunch") {
    //   setLunchFood(value)
    // }
    
  };

 // const [ foods, setFoods] = useState()
  // Handle selecting a suggestion
  const handleSuggestionClickSnack = (suggestion, index, type) => {


    // if (type === "breakfast") {
    //   setBreakfastFood(suggestion)
    //   setCaloriesBvalue(tempData[index].calories / tempData[index].yield)
    //   setProteinBvalue(parseInt(tempData[index].digest[2].total))
    //   setCarbsBvalue(parseInt(tempData[index].digest[1].total))
    //   setFatBvalue(parseInt(tempData[index].digest[0].total))
    //   setPotassiumBvalue(parseInt(tempData[index].digest[7].total))
    //   setSodiumBvalue(parseInt(tempData[index].digest[4].total))
    // }
 
      setSnackFood(suggestion)
      setSnackFood(suggestion)
      setSnackFoodImage(tempDataSnack[index].image)
      setCaloriesSvalue(parseInt(tempDataSnack[index].calories / tempDataSnack[index].yield))
      setProteinSvalue(parseInt(tempDataSnack[index].digest[2].total))
      setCarbsSvalue(parseInt(tempDataSnack[index].digest[1].total))
      setFatSvalue(parseInt(tempDataSnack[index].digest[0].total))
      setPotassiumSvalue(parseInt(tempDataSnack[index].digest[7].total))
      setSodiumSvalue(parseInt(tempDataSnack[index].digest[4].total))


   // setInputValue(suggestion);
    console.log(suggestion, tempDataSnack[index])
    setSuggestionsSnack([]);
    setTempDataSnack([])
    
  };
  //?

    //? food recommendations Dinner
  // State to hold the user input and suggestions
  const [inputValueDinner, setInputValueDinner] = useState("");
  const [suggestionsDinner, setSuggestionsDinner] = useState([]);
  const [loadingDinner, setLoadingDinner] = useState(false);
  const [tempDataDinner , setTempDataDinner] = useState([])

  // Edamam API credentials (Replace with your actual credentials)
 

  // Debounced function to fetch meal suggestions from Edamam API
  const fetchMealSuggestionsDinner = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setSuggestionsDinner([]);
        return;
      }

      setLoadingDinner(true);
      try {
        // API request to Edamam to search for recipes
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );

        // Update the suggestions list with fetched data
        setTempDataDinner(response.data.hits.map((hit) => hit.recipe))
        setSuggestionsDinner(response.data.hits.map((hit) => hit.recipe.label));
      } catch (error) {
        console.error("Error fetching meal suggestions:", error);
      } finally {
        setLoadingDinner(false);
      }
    }, 500), // Debounce delay (500 ms)
    []
  );

  // Handle input changes and trigger API request
  const handleInputChangesDinner = (e, type) => {
    const value = e.target.value;
 //   setInputValue(value);
    fetchMealSuggestionsDinner(value);
    setDinnerFood(value)
    // if (type === "breakfast") {
    //   setBreakfastFood(value)
    // }
    // else if (type === "lunch") {
    //   setLunchFood(value)
    // }
    
  };

 // const [ foods, setFoods] = useState()
  // Handle selecting a suggestion
  const handleSuggestionClickDinner = (suggestion, index, type) => {


    // if (type === "breakfast") {
    //   setBreakfastFood(suggestion)
    //   setCaloriesBvalue(tempData[index].calories / tempData[index].yield)
    //   setProteinBvalue(parseInt(tempData[index].digest[2].total))
    //   setCarbsBvalue(parseInt(tempData[index].digest[1].total))
    //   setFatBvalue(parseInt(tempData[index].digest[0].total))
    //   setPotassiumBvalue(parseInt(tempData[index].digest[7].total))
    //   setSodiumBvalue(parseInt(tempData[index].digest[4].total))
    // }
 
      setDinnerFood(suggestion)
   
      setDinnerFoodImage(tempDataDinner[index].image)
      setCaloriesDvalue(parseInt(tempDataDinner[index].calories / tempDataDinner[index].yield))
      setProteinDvalue(parseInt(tempDataDinner[index].digest[2].total))
      setCarbsDvalue(parseInt(tempDataDinner[index].digest[1].total))
      setFatDvalue(parseInt(tempDataDinner[index].digest[0].total))
      setPotassiumDvalue(parseInt(tempDataDinner[index].digest[7].total))
      setSodiumDvalue(parseInt(tempDataDinner[index].digest[4].total))


   // setInputValue(suggestion);
    console.log(suggestion, tempDataDinner[index])
    setSuggestionsDinner([]);
    setTempDataDinner([])
    
  };
  //?

  // ? with hypertension sugestion meals

    // State to hold the user input and suggestions
    const [inputHypertensionValue, setInputHypertensionValue] = useState("");
    const [suggestionsHypertension, setSuggestionsHypertension] = useState([]);
    const [loadingHypertension, setLoadingHypertension] = useState(false);
    const [tempDataHypertension , setTempDataHypertension] = useState([])
  
    // Edamam API credentials (Replace with your actual credentials)
   
    // Debounced function to fetch meal suggestions from Edamam API
    const fetchMealSuggestionsHypertension = useCallback(
      _.debounce(async (query) => {
        if (!query) {
          setSuggestionsHypertension([]);
          return;
        }
  
        setLoadingHypertension(true);
        try {
          // API request to Edamam to search for recipes
          const response = await axios.get(
            `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
          );
  
          // Update the suggestions list with fetched data
          setTempDataHypertension(response.data.hits.map((hit) => hit.recipe))
          setSuggestionsHypertension(response.data.hits.map((hit) => hit.recipe.label));
        } catch (error) {
          console.error("Error fetching meal suggestions:", error);
        } finally {
          setLoadingHypertension(false);
        }
      }, 500), // Debounce delay (500 ms)
      []
    );
  
    // Handle input changes and trigger API request
    const handleInputChangesHypertension = (e) => {
      const value = e.target.value;
      setInputHypertensionValue(value);
      fetchMealSuggestionsHypertension(value);
      
    };
  
    // Handle selecting a suggestion
    const handleSuggestionClickHypertension = (suggestion, index) => {
      setInputHypertensionValue(suggestion);
      console.log(suggestion, tempDataHypertension[index])
      setSuggestionsHypertension([]);
      setTempDataHypertension([])
      
    };

    const [BPRecommendations, setBPRecommendations] = useState([])
  //? BP algorithms
    const getBPRecommendations = () => {
      //! from previous entries

      //! kapag walang previous entries dapat yun base sa profiling
      
      if (BPRange[0] === "Normal Blood Pressure") {
        setBPRecommendations(["Maintain a Balanced Diet", 
                              "Stay Active",
                              "Manage Stress",
                              "Limit Alcohol",
                              "Maintain a Healthy Weight",
                            ])
        return ["Maintain a Balanced Diet", 
          "Stay Active",
          "Manage Stress",
          "Limit Alcohol",
          "Maintain a Healthy Weight",
        ]
      }
      else if (BPRange[0] === "Elevated Blood Pressure") {
        setBPRecommendations([
          "Reduce Sodium Intake", 
          "Exercise Regularly",
          "Monitor Your Diet",
          "Monitor Your Diet",
          "Limit Caffeine",
        ])

        return [
          "Reduce Sodium Intake", 
          "Exercise Regularly",
          "Monitor Your Diet",
          "Monitor Your Diet",
          "Limit Caffeine",
        ]
      }
      else if (BPRange[0] === "Stage 1 Hypertension") {
        setBPRecommendations([
          "Cut Down on Salt", 
          "Adopt the DASH Diet",
          "Get Active",
          "Monitor Blood Pressure",
          "Limit Alcohol and Quit Smoking",
        ])

        return [
          "Cut Down on Salt", 
          "Adopt the DASH Diet",
          "Get Active",
          "Monitor Blood Pressure",
          "Limit Alcohol and Quit Smoking",
        ]
      }
      else if (BPRange[0] === "Stage 2 Hypertension") {
        setBPRecommendations([
          "Consult Your Healthcare Provider", 
          "Strict Low-Sodium Diet",
          "Follow Prescribed Treatment",
          "Focus on Heart-Healthy Activities",
          "Prioritize Stress Management",
          "Quit Smoking and Limit Alcohol:",
        ])

        return [
          "Consult Your Healthcare Provider", 
          "Strict Low-Sodium Diet",
          "Follow Prescribed Treatment",
          "Focus on Heart-Healthy Activities",
          "Prioritize Stress Management",
          "Quit Smoking and Limit Alcohol:",
        ]
      }
    }
  //?

  const [dayRecommendationDiv, setDayRecommendationDiv] = useState(<></>)
  const [dietRecommendation, setDietRecommendation] = useState([])

  //? 0 = bp tips, 1 = recommendation tips, 
  // ? diet algorithms
    const getDietRecommendations = (Hyper) => {
      //? Hyper is boolean here 0 false 1 true
      let pushData = []
      if (Hyper) {
       // getBPRecommendations() // may return na dito
       console.log(BPRange, journalEntry)
        pushData.push(BPRange)
        fetchMealSuggestionsBP(BPRange[0])

        let totalSodium = 0;
        let totalPotassium = 0;
        let totalCalories = 0;
        let totalFat = 0;
        let totalProtein = 0;
        let totalCarbs = 0;

        foodEntry.forEach((food) => {
          totalSodium += food.sodium;
          totalPotassium += food.potassium;
          totalCalories += food.calories;
          totalFat += food.fat;
          totalProtein += food.protein;
          totalCarbs += food.carbs;
        });

        if (BPRange[0] === "Stage 1 Hypertension" || BPRange[0] === "Stage 2 Hypertension" ) {
          // User with Hypertension
          if (totalSodium > 1500) {
            pushData.push('Your sodium intake is too high. Consider reducing foods high in salt to help lower your blood pressure. ')
            //dietMessage += 'Your sodium intake is too high. Consider reducing foods high in salt to help lower your blood pressure. ';
          }
          if (totalPotassium < 3500) {
            pushData.push('Your potassium intake is low. Consider adding potassium-rich foods like bananas, leafy greens, and avocados to your diet. ')
            //dietMessage += 'Your potassium intake is low. Consider adding potassium-rich foods like bananas, leafy greens, and avocados to your diet. ';
          }
        } else {
          // User without Hypertension
          pushData.push('Keep focusing on a balanced diet. Make sure to include enough protein, healthy fats, and complex carbs for overall well-being. ')
          //dietMessage += 'Keep focusing on a balanced diet. Make sure to include enough protein, healthy fats, and complex carbs for overall well-being. ';
        }
      }

      else {
        fetchMealSuggestionsBP(BPRange[0])
      }

      setDietRecommendation(pushData)
    }
  //? 

  //? get data kung from latest journal entry or kapag wala pa fresh
    // ! journalEntry


  //? weekly report
    
  const [weeklyReport, setWeeklyReport] = useState()
    const generateWeeklyReport = async (day) => {
      
     
   
      console.log(journalEntry)
        try {
          const startDate = dayjs(day).subtract(7, 'day').format('YYYY-MM-DD');
          const endDate = dayjs(day).format('YYYY-MM-DD');
          console.log(day[0].date, startDate, endDate)
          // Fetching journal data for the week
          const journalResponse = await AxiosInstance.get(
            `journalentry`
          );
          const journalData = journalResponse.data.filter(
            (item) =>
              dayjs(item.date).isAfter(startDate) &&
              dayjs(item.date).isSameOrBefore(endDate) &&
              item.user_id === loggedInUser.user_id
          );

          console.log(journalData)
  
          // Fetching food entry data for the week
          const foodResponse = await AxiosInstance.get(
            `foodentry`
          );
          let foodData = [];
          journalData.forEach((journal) => {
            const relatedFoodEntries = foodResponse.data.filter(
              (food) => food.journal_id === journal.journal_id
            );
            console.log(relatedFoodEntries)
            relatedFoodEntries.map((item) => (
              foodData.push(item)
            ))
            //foodData = [...foodData, ...relatedFoodEntries];
          });
          
          let avgSystolic = 0;
          let avgDiastolic = 0;
          let totalSodium = 0;
          let totalPotassium = 0;
          let totalCalories = 0;
          let totalFat = 0;
          let totalProtein = 0;
          let totalCarbs = 0;
      
          // Aggregate blood pressure readings
          journalData.forEach((entry) => {
            avgSystolic += entry.systolic;
            avgDiastolic += entry.diastolic;
          });
      
          avgSystolic = avgSystolic / journalData.length;
          avgDiastolic = avgDiastolic / journalData.length;
          console.log(foodData)
          // Aggregate macronutrients from food entries
          foodData.forEach((food) => {
            totalSodium += food.sodium;
            totalPotassium += food.potassium;
            totalCalories += food.calories;
            totalFat += food.fat;
            totalProtein += food.protein;
            totalCarbs += food.carbs;
          });
      
          // Generate the report message
          let reportMessage = `**Weekly Report**: \n\n**Average Blood Pressure**: ${avgSystolic}/${avgDiastolic} mmHg\n`;
      
          if (avgSystolic >= 130 || avgDiastolic >= 80) {
            reportMessage += 'Your average blood pressure this week is above normal. Please consider reducing sodium intake and consulting your healthcare provider. ';
          } else {
            reportMessage += 'Your average blood pressure is within normal range. Keep maintaining a healthy diet and staying active. ';
          }
      
          reportMessage += `\n\n**Dietary Summary**:\n- Total Sodium: ${totalSodium} mg\n- Total Potassium: ${totalPotassium} mg\n- Total Calories: ${totalCalories} kcal\n- Total Fat: ${totalFat} g\n- Total Protein: ${totalProtein} g\n- Total Carbs: ${totalCarbs} g\n`;
      
          if (totalSodium > 10500) {
            reportMessage += 'Your sodium intake this week has been high. Consider reducing the intake of processed and salty foods. ';
          }
      
          if (totalPotassium < 24500) {
            reportMessage += 'Consider adding more potassium-rich foods like bananas, spinach, and avocados to help maintain a healthy sodium-potassium balance. ';
          }
      
          setWeeklyReport(reportMessage);
      
          console.log(reportMessage)
          // Aggregate the weekly data
        //  generateWeeklyReport(journalData, foodData);
        } catch (error) {
          console.error('Error fetching weekly data:', error);
        }


       
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

    {/* //? test */}


    <div className="meal-suggestion-input" style={{ position: "relative", width: "300px" }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search for meals"
        value={inputValue}
        onChange={handleInputChanges}
        placeholder="Type to search for meals..."
      />
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            marginTop: "-12px",
          }}
        />
      )}
      {suggestions.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClick(suggestion, index)}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
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
                  {loading1 ? (
                  <>
                    <center>
                      {" "}
                      <img src="/images/pacman.gif" width="13%" />
                      <Typography>Saving your entry please wait...</Typography>
                    </center>
                  </>
                ) : (
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                      max={10000}
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
                                        max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
                                    max={10000}
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
                                      max: 10000,
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
              )}
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
                      <Grid container spacing={2} sx={{ mx: "0%", mr: "0%" }}>
                        <Grid xs={3}>
                          {" "}
                          <TextField
                            id="systolic"
                            name="systolic"
                            //fullWidth
                            margin="dense"
                            {...register("systolic")}
                            // error={errors.systolic ? true : false}
                            label="Systolic"
                            variant="filled"
                            sx={{
                              width: "60%",
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
                        <Grid xs={3}>
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
                              width: "60%",
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
                        <Grid xs = {6}> <center> Journal Entry</center>

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
</Typography></Grid>
                      </Grid>
                    </center>
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
                    <Grid container spacing={2} sx={{ m: 0 }}>
                      <Grid
                        xs={6}
                        sx={{ mx: 0, mt:0 }}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Box sx={{ width: "80%" }}>
                          {/* <center> Journal Entry</center>

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
                          </Typography> */}
                          <br />
                          {/* <center>
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
                          </center> */}
                        </Box>
                    

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
                      <Grid xs={12} sx={{ ml: "5%" }}>
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
                                <Grid xs={4}>
                                  <Box> 

                                  <img src = {breakfastFoodImage} width="70%" height = "70%"/>
                                  </Box>
                                  <div className="meal-suggestion-input" style={{ position: "relative", width: "80%", color: "#000000" }}>
      <TextField
        //fullWidth
        id="breakfast_food"
        name="breakfast_food"
        //fullWidth
        margin="dense"
        {...register("breakfast_food")}
        error={errors.breakfast_food ? true : false}
        label="Food Eaten:"
        variant="filled"
        size="small"
       // label="Search for meals"
        value={breakfastFood}
        onChange={(e) => handleInputChanges(e, "breakfast")}
        placeholder="Type to search for meals..."
        sx={{
        //  mr: 2,
          background: "#ffffff",
          color: "#000000",
          width: "80%"
        }}
      />
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            marginTop: "-12px",
          }}
        />
      )}
      {suggestions.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClick(suggestion, index, "breakfast")}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
                                  {/* <TextField
                                    id="breakfast_food"
                                    name="breakfast_food"
                                    //fullWidth
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
                                      width: "80%"
                                    }}

                                     value={foods}
                                    // onChange={(e) => setIdToCall(e.target.value)}
                                  /> */}
                                </Grid>
                                {/* <Grid xs={6}> */}
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
                                {/* </Grid>{" "} */}
                                <Grid xs={8}> 
                                
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
                                      <Grid item >
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
                                          max={10000}
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
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>

                                    <center>
                                      <Typography> Sodium</Typography>
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
                                          id="breakfast_sodium"
                                          name="breakfast_sodium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("breakfast_sodium")}
                                          value={
                                            typeof sodiumBvalue === "number"
                                              ? sodiumBvalue
                                              : 0
                                          }
                                          onChange={handleSodiumBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={sodiumBvalue}
                                          size="small"
                                          onChange={handleSodiumBInputChange}
                                          onBlur={handleSodiumBBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    <center>
                                      <Typography>Potassium</Typography>
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
                                          id="breakfast_potassium"
                                          name="breakfast_potassium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("breakfast_potassium")}
                                          value={
                                            typeof potassiumBvalue === "number"
                                              ? potassiumBvalue
                                              : 0
                                          }
                                          onChange={handlePotassiumBSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={potassiumBvalue}
                                          size="small"
                                          onChange={handlePotassiumBInputChange}
                                          onBlur={handlePotassiumBBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                
                                  </Grid>
                                </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              Lunch
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={4}>
                                  <img src = {lunchFoodImage} width="70%" height = "70%"/>
                                <div className="meal-suggestion-input" style={{ position: "relative", width: "80%", color: "#000000" }}>
      <TextField
        //fullWidth
        id="lunch_food"
        name="lunch_food"
        //fullWidth
        margin="dense"
        {...register("lunch_food")}
        error={errors.lunch_food ? true : false}
        label="Food Eaten:"
        variant="filled"
        size="small" 
       // label="Search for meals"
        value={lunchFood}
        onChange={(e) => handleInputChangesLunch(e, "lunch")}
        placeholder="Type to search for meals..."
        sx={{
        //  mr: 2,
          background: "#ffffff",
          color: "#000000",
          width: "80%"
        }}
      />
      {loadingLunch && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            marginTop: "-12px",
          }}
        />
      )}
      {suggestionsLunch.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestionsLunch.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClickLunch(suggestion, index, "lunch")}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
                                  {/* <TextField
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
                                  /> */}
                                </Grid>
                                <Grid xs={8}>
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
                                          max={10000}
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
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid> 
                                    <center>
                                      <Typography> Sodium</Typography>
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
                                          src="/images/sodium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_sodium"
                                          name="lunch_sodium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("lunch_sodium")}
                                          value={
                                            typeof sodiumLvalue === "number"
                                              ? sodiumLvalue
                                              : 0
                                          }
                                          onChange={handleSodiumLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={sodiumLvalue}
                                          size="small"
                                          onChange={handleSodiumLInputChange}
                                          onBlur={handleSodiumLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
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
                                          max={10000}
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
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    <center>
                                      <Typography>Potassium</Typography>
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
                                          src="/images/potassium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="lunch_potassium"
                                          name="lunch_potassium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("lunch_potassium")}
                                          value={
                                            typeof potassiumLvalue === "number"
                                              ? potassiumLvalue
                                              : 0
                                          }
                                          onChange={handlePotassiumLSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={potassiumLvalue}
                                          size="small"
                                          onChange={handlePotassiumLInputChange}
                                          onBlur={handlePotassiumLBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
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
                                <Grid xs={4}>

                                <img src = {snackFoodImage} width="70%" height = "70%"/>
                                <div className="meal-suggestion-input" style={{ position: "relative", width: "80%", color: "#000000" }}>
      <TextField
        //fullWidth
        id="snack_food"
        name="snack_food"
        //fullWidth
        margin="dense"
        {...register("snack_food")}
        error={errors.snack_food ? true : false}
        label="Food Eaten:"
        variant="filled"
        size="small" 
       // label="Search for meals"
        value={snackFood}
        onChange={(e) => handleInputChangesSnack(e, "lunch")}
        placeholder="Type to search for meals..."
        sx={{
        //  mr: 2,
          background: "#ffffff",
          color: "#000000",
          width: "80%"
        }}
      />
      {loadingSnack && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            marginTop: "-12px",
          }}
        />
      )}
      {suggestionsSnack.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestionsSnack.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClickSnack(suggestion, index, "lunch")}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
                                  {/* <TextField
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
                                  /> */}
                                </Grid>
                                <Grid xs={8}>
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
                                        max={10000}
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
                                          max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <center>
                                      <Typography> Sodium</Typography>
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
                                          src="/images/sodium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="snack_sodium"
                                          name="snack_sodium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("snack_sodium")}
                                          value={
                                            typeof sodiumSvalue === "number"
                                              ? sodiumSvalue
                                              : 0
                                          }
                                          onChange={handleSodiumSSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={sodiumSvalue}
                                          size="small"
                                          onChange={handleSodiumSInputChange}
                                          onBlur={handleSodiumSBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <center>
                                      <Typography>Potassium</Typography>
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
                                          src="/images/potassium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="snack_potassium"
                                          name="snack_potassium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("snack_potassium")}
                                          value={
                                            typeof potassiumSvalue === "number"
                                              ? potassiumSvalue
                                              : 0
                                          }
                                          onChange={handlePotassiumSSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={potassiumSvalue}
                                          size="small"
                                          onChange={handlePotassiumSInputChange}
                                          onBlur={handlePotassiumSBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  </Grid>
                                  </Grid>
                              
                              </Grid>
                            </Box>
                            <Box>
                              Dinner
                              <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid xs={4}>
                                <img src = {dinnerFoodImage} width="70%" height = "70%"/>
                                <div className="meal-suggestion-input" style={{ position: "relative", width: "80%", color: "#000000" }}>
      <TextField
        //fullWidth
        id="dinner_food"
        name="dinner_food"
        //fullWidth
        margin="dense"
        {...register("dinner_food")}
        error={errors.dinner_food ? true : false}
        label="Food Eaten:"
        variant="filled"
        size="small" 
       // label="Search for meals"
        value={dinnerFood}
        onChange={(e) => handleInputChangesDinner(e, "lunch")}
        placeholder="Type to search for meals..."
        sx={{
        //  mr: 2,
          background: "#ffffff",
          color: "#000000",
          width: "80%"
        }}
      />
      {loadingDinner && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            marginTop: "-12px",
          }}
        />
      )}
      {suggestionsDinner.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestionsDinner.map((suggestion, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSuggestionClickDinner(suggestion, index, "lunch")}
            >
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
                                  {/* <TextField
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
                                  /> */}
                                </Grid>
                                <Grid xs={8}>
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
                                        max={10000}
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
                                          max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>

                                  <center>
                                      <Typography> Sodium</Typography>
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
                                          src="/images/sodium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="dinner_sodium"
                                          name="dinner_sodium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("dinner_sodium")}
                                          value={
                                            typeof sodiumDvalue === "number"
                                              ? sodiumDvalue
                                              : 0
                                          }
                                          onChange={handleSodiumDSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={sodiumDvalue}
                                          size="small"
                                          onChange={handleSodiumDInputChange}
                                          onBlur={handleSodiumDBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
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
                                        max={10000}
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
                                          max: 10000,
                                          type: "number",
                                          "aria-labelledby": "input-slider",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  
                                  <center>
                                      <Typography>Potassium</Typography>
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
                                          src="/images/potassium white.png"
                                          height="25"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        <Slider
                                          id="dinner_potassium"
                                          name="dinner_potassium"
                                          min={0}
                                          step={1}
                                          max={10000}
                                          label=""
                                          {...register("dinner_potassium")}
                                          value={
                                            typeof potassiumDvalue === "number"
                                              ? potassiumDvalue
                                              : 0
                                          }
                                          onChange={handlePotassiumDSliderChange}
                                          aria-labelledby="input-slider"
                                          sx={{ color: secondaryColor }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Input
                                          value={potassiumDvalue}
                                          size="small"
                                          onChange={handlePotassiumDInputChange}
                                          onBlur={handlePotassiumDBlur}
                                          inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 10000,
                                            type: "number",
                                            "aria-labelledby": "input-slider",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
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

                                      .map((meal, index) => (

                                        <>
                                      
                                         
                                          {(index + 1) % 4 === 1 ?  (<Box>
                                          <center>
                                          Day: {" "}{(index + 4) / 4 }
                                          </center>
                                          </Box>)
                                        : (<></>)  
                                        }
                                        <tr key={meal?.shop_meal_id}>
                                          <td>{meal?.type}: {" "}</td>
                                          <td>{meal?.food}</td>
                                        </tr>
                                        </>
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
                                      .map((meal, index) => (
                                        <>
                                          {(index + 1) % 4 === 1 ?  (<Box>
                                          <center>
                                          Day: {" "}{(index + 4) / 4 }
                                          </center>
                                          </Box>)
                                        : (<></>)  
                                        }
                                        <tr key={meal?.shop_meal_id}>
                                          <td>{meal?.type}: {" "}</td>
                                          <td>{meal?.food}</td>

                                          {/* ... other table cells ... */}
                                        </tr>
                                        </>
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
             // justifyItems: "right",
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
            <Grid container spacing = {2}>
            <Grid xs = {10}> <Typography sx = {{fontWeight: "bold"}}>
              Calories </Typography></Grid>
            <Grid xs = {2}> {calories * 20} g</Grid>
            </Grid>
            
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

            <Typography sx = {{fontWeight: "bold"}} > BLOOD PRESSURE </Typography>
            
            <Box sx = {{mt: 2, ml: "30%", mr: "30%"}}>
            <Grid container spacing = {0}>
            <Grid xs = {4}>
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
                  {journalEntry[0]?.systolic}
                </Box>
                Systolic
            </Grid>
            <Grid xs = {4}>
             <Box
                  sx={{
                   
                    color: "#ffffff",
                    borderRadius: 2,
                    mx: {
                      sm: 1,
                      md: 5,
                    },
                  }}
                >
                  /
                </Box>
                </Grid>
            <Grid xs = {4}>
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
                 {journalEntry[0]?.diastolic}
                </Box>
                Diastolic
            </Grid>
            </Grid>
            <br/>
             <Box
                  sx={{
                   // background: getBPRange(parseInt(journalEntry[0]?.systolic), parseInt(journalEntry[0]?.diastolic))[1],
                    background: BPRange[1],
                    color: secondaryColor,
                    borderRadius: 2,
                    mx: {
                      sm: 1,
                      md: 5,
                    },
                  }}
                >
                  {BPRange[0]}
                 {/* {getBPRange(parseInt(journalEntry[0]?.systolic), parseInt(journalEntry[0]?.diastolic))[0]} */}
                </Box>
            </Box>
             
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


      <Box sx = {{ml: "3%",mr: "6%"}}>
      <Accordion sx={{  border: 3 , borderColor: "#898246"}}>
      <AccordionSummary   expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                         <img
                          src="/images/day.png"
                          width="40px"
                          height="40px"
                        />
                      <Typography sx = {{mt: "1%" , ml: "5%", fontWeight: "bold", color: "#99756E"}}>Meal Recommendation of the Day</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <center>
                    <Typography sx = {{ color: "#99756E", fontWeight: "bold"}}>
                      Report: <br/>
                    </Typography>
                    <Typography sx = {{ml: "20%", mr:"20%"}}>{dietRecommendation[1]}</Typography>
                    </center>
                     <hr/>
                    <Box sx = {{background: "#898246", borderRadius: 5, ml: "30%", mr:"30%",pt: 3, pb: 1, color: "#ffffff"}}>
                      <Grid container spacing = {2} sx = {{ml: "0%", mr: "0%"}}>
                      <Grid xs = {3.5}><Typography sx = {{fontWeight:"bold", ml: 5}}>HEALTH TIP: </Typography></Grid>
                      <Grid xs = {8}>{BPRange[2]}</Grid>
                      </Grid>
                       
                      </Box>
                        <Button onClick={() => fetchMealSuggestionsBP(BPRange[0])}>test</Button>
                      
                   
                        <Box sx = {{border: 3, borderRadius: 4, borderColor:"#898246"}}>
                          <Typography sx = {{fontWeight: "bold", color: "#99756E"}}>Recommended Meals</Typography>

                        <Box sx = {{ml: 1, mr: 0}}>
                        <Grid container spacing = {2} sx = {{mt: "2%"}}>
                        
                        <Grid xs = {3}>
                            <img src = {mealBPRecommendations[0]?.meals[randomNumberbreakfast].image} width = "60%" height = "60%" />
                            <br/>
                          {mealBPRecommendations[0]?.type}: 
                          <Typography sx = {{ wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            whiteSpace: 'normal', }}
                            >
                          {mealBPRecommendations[0]?.meals[randomNumberbreakfast].label}
                          </Typography>
                           <br/>
                          </Grid>

                          <Grid xs = {3}>
                            <img src = {mealBPRecommendations[1]?.meals[randomNumberlunch].image} width = "60%" height = "60%" />
                            <br/>
                          {mealBPRecommendations[1]?.type}:  <br/>
                          {mealBPRecommendations[1]?.meals[randomNumberlunch].label} <br/>
                          </Grid>

                          <Grid xs = {3}>
                            <img src = {mealBPRecommendations[2]?.meals[randomNumbersnack].image} width = "60%" height = "60%" />
                            <br/>
                          {mealBPRecommendations[2]?.type}:  <br/>
                          {mealBPRecommendations[2]?.meals[randomNumbersnack].label} <br/>
                          </Grid>

                          <Grid xs = {3}>
                            <img src = {mealBPRecommendations[3]?.meals[randomNumberdinner].image} width = "60%" height = "60%" />
                          <br/>
                          {mealBPRecommendations[3]?.type}: <br/>
                          {mealBPRecommendations[3]?.meals[randomNumberdinner].label} <br/>
                          </Grid>
                        
                        {/* {mealBPRecommendations?.map((item,index) => (
                          <>
                          
                          <Grid xs = {3}>
                            <img src = {item.meals[randomNumber].image} width = "20%" height = "30%" />
                          {item.type}: 
                          {item.meals[randomNumber].label} <br/>
                          </Grid>
                          </>
                        ))} */}
                        
                        </Grid>
                        </Box>
                        </Box>
                      </AccordionDetails>
               
      </Accordion>
      </Box>


    </div>
  );
}

export default FoodJournalHome;
