import { useState, useEffect } from "react";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import AxiosInstance from "../forms/AxiosInstance";
import dayjs from "dayjs";
import { useLoggedInUser } from "../LoggedInUserContext";

function FoodJournalProgressReport() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user

  const [filterCondition, setFilterCondition] = useState("Weekly");

  const settings = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case "Daily":
        console.log(setting);
        break;
      case "Weekly":
        console.log(setting);
        break;
      case "Monthly":
        console.log(setting);
        break;
      case "Yearly":
        console.log(setting);
        break;
    }
    setBarGraphDiv(setting);
    setAnchorElUser(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const [anchorElNavBP, setAnchorElNavBP] = React.useState(null);
  const [anchorElUserBP, setAnchorElUserBP] = React.useState(null);
  const settingsBP = ["Daily", "Weekly", "Monthly", "Yearly"];

  const handleOpenUserMenuBP = (event) => {
    setAnchorElUserBP(event.currentTarget);
  };

  const handleCloseUserMenuBP = (setting) => {
    switch (setting) {
      case "Daily":
        console.log(setting);
        break;
      case "Weekly":
        console.log(setting);
        break;
      case "Monthly":
        console.log(setting);
        break;
      case "Yearly":
        console.log(setting);
        break;
    }
    // setBarGraphDiv(setting);
    setAnchorElUserBP(null);
  };

  // ! meal view
  const [anchorElNavMeal, setAnchorElNavMeal] = React.useState(null);
  const [anchorElUserMeal, setAnchorElUserMeal] = React.useState(null);
  const settingsMeal = ["Daily", "Weekly", "Monthly", "Yearly"];

  const handleOpenUserMenuMeal = (event) => {
    setAnchorElUserMeal(event.currentTarget);
  };

  const handleCloseUserMenuMeal = (setting) => {
    switch (setting) {
      case "Daily":
        console.log(setting);
        break;
      case "Weekly":
        console.log(setting);
        console.log(getMealWeeklyInfo());
        break;
      case "Monthly":
        console.log(setting);
        console.log(getMealMonthlyInfo());
        break;
      case "Yearly":
        console.log(setting);
        break;
    }
    //  setBarGraphDiv(setting);
    setAnchorElUserMeal(null);
  };
  //!

  // ! get needed data
  const [journalEntry, setJournalEntry] = useState([]);
  const [foodEntry, setFoodEntry] = useState([]);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  const currentWeekStart = dayjs().startOf("week").format("YYYY-MM-DD");
  const currentWeekEnd = dayjs().endOf("week").format("YYYY-MM-DD");
  const currentMonthStart = dayjs().startOf("month").format("YYYY-MM-DD");
  const currentMonthEnd = dayjs().endOf("month").format("YYYY-MM-DD");
  const currentYear = dayjs().format("YYYY");
  const currentYearStart = dayjs(`${currentYear}-01-01`).format("YYYY-MM-DD"); // Jan 1st
  const currentYearEnd = dayjs(`${currentYear}-12-31`).format("YYYY-MM-DD"); // Dec 31st
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  const calculateData = () => {
    {
      foodEntry.map((item) => console.log(item));
    }

    setCarbs(foodEntry.reduce((acc, item) => acc + item.carbs, 0));
    setProtein(foodEntry.reduce((acc, item) => acc + item.protein, 0));
    setFat(foodEntry.reduce((acc, item) => acc + item.fat, 0));
    const temp = foodEntry.reduce((acc, item) => acc + item.calories, 0);
    console.log(temp);
    setCalories((temp / 1200) * 100);

    console.log(carbs, " ", protein, " ", fat, " ", calories);
  };

  const getfoodEntryData = async (id) => {
    let temp = [];
    console.log(id);

    for (const itemID of id) {
      const res = await AxiosInstance.get(`foodentry`); // Use await here
      const filteredEntries = res.data.filter(
        (item) => item.journal_id === itemID.journal_id
      );
      temp.push(...filteredEntries);
    }

    setFoodEntry(temp);

    calculateData();
  };

  const [mealPlanDiv, setMealPlanDiv] = useState(
    <Box sx={{ color: "#99756E", mx: 30, width: "70%" }}>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img src="/images/breakfast.png" height="80" />
          </Grid>
          <Grid xs={6}>[BREAKFAST]</Grid>
          <Grid xs={3}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <img src="/images/calories.png" /> 0 calories <br />
                <img src="/images/carbs.png" /> 0 g carbs
              </Grid>
              <Grid xs={6}>
                {" "}
                <img src="/images/fat.png" /> 0 g fat <br />
                <img src="/images/protein.png" /> 0 g protein
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <hr />
      <br />
      <Box>
        {" "}
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img src="/images/lunch.png" height="80" />
          </Grid>
          <Grid xs={6}>[LUNCH]</Grid>
          <Grid xs={3}>
            {" "}
            <Grid container spacing={2}>
              <Grid xs={6}>
                <img src="/images/calories.png" /> 0 calories <br />
                <img src="/images/carbs.png" /> 0 g carbs
              </Grid>
              <Grid xs={6}>
                {" "}
                <img src="/images/fat.png" /> 0 g fat <br />
                <img src="/images/protein.png" /> 0 g protein
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <br />
      <Box>
        {" "}
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img src="/images/snacks.png" height="80" />
          </Grid>
          <Grid xs={6}>[SNACK]</Grid>
          <Grid xs={3}>
            {" "}
            <Grid container spacing={2}>
              <Grid xs={6}>
                <img src="/images/calories.png" /> 0 calories <br />
                <img src="/images/carbs.png" /> 0 g carbs
              </Grid>
              <Grid xs={6}>
                {" "}
                <img src="/images/fat.png" /> 0 g fat <br />
                <img src="/images/protein.png" /> 0 g protein
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <br />
      <Box>
        {" "}
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img src="/images/dinner.png" height="80" />
          </Grid>
          <Grid xs={6}>[DINNER]</Grid>
          <Grid xs={3}>
            {" "}
            <Grid container spacing={2}>
              <Grid xs={6}>
                <img src="/images/calories.png" /> 0 calories <br />
                <img src="/images/carbs.png" /> 0 g carbs
              </Grid>
              <Grid xs={6}>
                {" "}
                <img src="/images/fat.png" /> 0 g fat <br />
                <img src="/images/protein.png" /> 0 g protein
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  // ! fresh start
  const [overallJournal, setOverallJournal] = useState([]);
  const [overallFood, setOverallFood] = useState([]);
  const getJournal = async () => {
    const res = await AxiosInstance.get(`journalentry`);
    setOverallJournal(res.data);
  };

  const getMeal = async () => {
    const res = await AxiosInstance.get(`foodentry`);
    setOverallFood(res.data);
  };

  useEffect(() => {
    getJournal();
  }, []);

  useEffect(() => {
    getMeal();
  }, [overallJournal]);

  useEffect(() => {
    forWeek();
    getMealWeeklyInfo();
    //console.log(getMealWeeklyInfo());
  }, [overallFood]);

  const forMonth = () => {
    let months = [];
    for (let month = 0; month < 12; month++) {
      const monthStart = dayjs()
        .startOf("year")
        .add(month, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const monthEnd = dayjs()
        .startOf("year")
        .add(month, "month")
        .endOf("month")
        .format("YYYY-MM-DD");

      let filteredEntries = overallJournal.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      if (monthStart && monthEnd) {
        filteredEntries = filteredEntries.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return (
            appointmentDate.isAfter(monthStart) &&
            appointmentDate.isBefore(monthEnd)
          );
        });
      }

      let temp = [];
      console.log(filteredEntries);

      for (const itemID of filteredEntries) {
        const filteredEntries = overallFood.filter(
          (item) => item.journal_id === itemID.journal_id
        );
        temp.push(...filteredEntries);
      }

      setCarbs(temp.reduce((acc, item) => acc + item.carbs, 0));
      const carbss = temp.reduce((acc, item) => acc + item.carbs, 0);
      setProtein(temp.reduce((acc, item) => acc + item.protein, 0));
      const proteins = temp.reduce((acc, item) => acc + item.protein, 0);
      setFat(temp.reduce((acc, item) => acc + item.fat, 0));
      const fats = temp.reduce((acc, item) => acc + item.fat, 0);
      const temps = temp.reduce((acc, item) => acc + item.calories, 0);
      console.log(temps);
      setCalories((temps / 1200) * 100);
      // ! add sort dito para sorted n ayun dates kapag ni call sa bar graph
      console.log(carbss, " ", protein, " ", fat, " ", calories);
      const newData = {
        month: dayjs(monthStart).format("MM"),
        carbs: carbss,
        protein: proteins,
        fat: fats,
        calorie: (temps / 1200) * 100,
      };

      console.log(newData);
      months.push(newData);
      // if (monthlyData <= 12) {
      //   setMonth((prevState) => {
      //     const sortedData = [...prevState, newData].sort((a, b) => {
      //       // Sorting logic based on month (assuming month property)
      //       const monthA = new Date(a.month).getMonth();
      //       const monthB = new Date(b.month).getMonth();
      //       return monthA - monthB;
      //     });
      //     return sortedData;
      //   });
      // }
    }

    setBarGraph(
      <div style={{ width: "100%" }}>
        {months.length === 0 ? ( // Check for loading and empty data
          <div>Loading data...</div>
        ) : (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                colorMap: {
                  type: "piecewise",
                  thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                  colors: ["#E66253"],
                },
              },
            ]}
            series={[{ data: months.map((item) => [item.calorie]) }]}
            height={300}
            slotProps={{
              bar: {
                clipPath: `inset(0px round 10px 10px 0px 0px)`,
              },
            }}
          />
        )}
      </div>
    );
    return months;
  };

  const forWeek = () => {
    let weeks = [];
    for (let day = 0; day < 7; day++) {
      const date = dayjs().startOf("week").add(day, "day").format("YYYY-MM-DD");

      let filteredEntries = overallJournal.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      if (date) {
        const targetDate = dayjs(date);
        filteredEntries = filteredEntries.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return appointmentDate.isSame(targetDate, "day"); // Check for the same day
        });
      }

      let temp = [];

      for (const itemID of filteredEntries) {
        const filteredEntries = overallFood.filter(
          (item) => item.journal_id === itemID.journal_id
        );
        temp.push(...filteredEntries);
      }

      setCarbs(temp.reduce((acc, item) => acc + item.carbs, 0));
      const carbss = temp.reduce((acc, item) => acc + item.carbs, 0);
      setProtein(temp.reduce((acc, item) => acc + item.protein, 0));
      const proteins = temp.reduce((acc, item) => acc + item.protein, 0);
      setFat(temp.reduce((acc, item) => acc + item.fat, 0));
      const fats = temp.reduce((acc, item) => acc + item.fat, 0);
      const temps = temp.reduce((acc, item) => acc + item.calories, 0);
      console.log(temps);
      setCalories((temps / 1200) * 100);

      console.log(carbss, " ", protein, " ", fat, " ", calories);
      const newData = {
        carbs: carbss,
        protein: proteins,
        fat: fats,
        calorie: (temps / 1200) * 100,
      };

      weeks.push(newData);
    }
    setBarGraph(
      <div style={{ width: "100%" }}>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              colorMap: {
                type: "piecewise",
                thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                colors: ["#E66253"],
              },
            },
          ]}
          // series={[{ data: [4, 3, 5, 11] }]}
          series={[{ data: weeks.map((item) => [item.calorie]) }]}
          height={300}
          slotProps={{
            bar: {
              clipPath: `inset(0px round 10px 10px 0px 0px)`,
            },
          }}
        />
      </div>
    );
    return weeks;
  };

  const [thisText, setThisText] = useState("Weekly");
  const getMealWeeklyInfo = () => {
    setThisText("Weekly");
    let carbB = 0;
    let proteinB = 0;
    let calorieB = 0;
    let fatB = 0;

    let carbL = 0;
    let proteinL = 0;
    let calorieL = 0;
    let fatL = 0;

    let carbS = 0;
    let proteinS = 0;
    let calorieS = 0;
    let fatS = 0;

    let carbD = 0;
    let proteinD = 0;
    let calorieD = 0;
    let fatD = 0;

    let mealInfo = [];
    for (let day = 0; day < 7; day++) {
      const date = dayjs().startOf("week").add(day, "day").format("YYYY-MM-DD");

      let filteredEntries = overallJournal;
      if (date) {
        const targetDate = dayjs(date);
        filteredEntries = overallJournal.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return appointmentDate.isSame(targetDate, "day"); // Check for the same day
        });
      }

      let tempBreakfast = [];

      for (const itemID of filteredEntries) {
        const filteredEntries = overallFood.filter(
          (item) => item.journal_id === itemID.journal_id
        );
        tempBreakfast.push(...filteredEntries);
      }

      const carbssBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.carbs, 0);

      const proteinsBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.protein, 0);

      const fatsBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.fat, 0);
      const caloriesBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.calories, 0);

      carbL =
        carbL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinL =
        proteinL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.protein, 0);

      fatL =
        fatL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieL =
        calorieL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.calories, 0);

      carbS =
        carbS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinS =
        proteinS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.protein, 0);

      fatS =
        fatS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieS =
        calorieS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.calories, 0);

      carbD =
        carbD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinD =
        proteinD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.protein, 0);

      fatD =
        fatD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieD =
        calorieD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.calories, 0);

      //  const caloriesBreakfast =((temps / 1200) * 100)

      //console.log(carbss, " ", protein, " ", fat, " ", calories);
      carbB = carbB + carbssBreakfast;
      fatB = fatB + fatsBreakfast;
      proteinB = proteinB + proteinsBreakfast;
      calorieB = calorieB + caloriesBreakfast;

      const newData = [
        {
          type: "Breakfast",
          carbs: carbssBreakfast,
          protein: proteinsBreakfast,
          fat: fatsBreakfast,
          calorie: caloriesBreakfast,
        },
        {
          type: "Lunch",
          carbs: carbssBreakfast,
          protein: proteinsBreakfast,
          fat: fatsBreakfast,
          calorie: (caloriesBreakfast / 1200) * 100,
        },
      ];
      mealInfo.push(newData);
    }

    setMealPlanDiv(
      <Box sx={{ color: "#99756E", mx: 30, width: "70%" }}>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/breakfast.png" height="80" />
            </Grid>
            <Grid xs={6}>[BREAKFAST]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieB} calories <br />
                  <img src="/images/carbs.png" /> {carbB} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatB} g fat <br />
                  <img src="/images/protein.png" /> {proteinB} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/lunch.png" height="80" />
            </Grid>
            <Grid xs={6}>[LUNCH]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieL} calories <br />
                  <img src="/images/carbs.png" /> {carbL} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatL} g fat <br />
                  <img src="/images/protein.png" /> {proteinL} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/snacks.png" height="80" />
            </Grid>
            <Grid xs={6}>[SNACK]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieS} calories <br />
                  <img src="/images/carbs.png" /> {carbS} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatS} g fat <br />
                  <img src="/images/protein.png" /> {proteinS} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/dinner.png" height="80" />
            </Grid>
            <Grid xs={6}>[DINNER]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieD} calories <br />
                  <img src="/images/carbs.png" /> {carbD} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatD} g fat <br />
                  <img src="/images/protein.png" /> {proteinD} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );

    return mealInfo;
  };

  const getMealMonthlyInfo = () => {
    setThisText("Monthly");
    let carbB = 0;
    let proteinB = 0;
    let calorieB = 0;
    let fatB = 0;

    let carbL = 0;
    let proteinL = 0;
    let calorieL = 0;
    let fatL = 0;

    let carbS = 0;
    let proteinS = 0;
    let calorieS = 0;
    let fatS = 0;

    let carbD = 0;
    let proteinD = 0;
    let calorieD = 0;
    let fatD = 0;

    let mealInfo = [];
    for (let month = 0; month < 12; month++) {
      const monthStart = dayjs()
        .startOf("year")
        .add(month, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const monthEnd = dayjs()
        .startOf("year")
        .add(month, "month")
        .endOf("month")
        .format("YYYY-MM-DD");

      let filteredEntries = overallJournal;

      if (monthStart && monthEnd) {
        filteredEntries = filteredEntries.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return (
            appointmentDate.isAfter(monthStart) &&
            appointmentDate.isBefore(monthEnd)
          );
        });
      }

      let tempBreakfast = [];

      for (const itemID of filteredEntries) {
        const filteredEntries = overallFood.filter(
          (item) => item.journal_id === itemID.journal_id
        );
        tempBreakfast.push(...filteredEntries);
      }

      const carbssBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.carbs, 0);

      const proteinsBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.protein, 0);

      const fatsBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.fat, 0);
      const caloriesBreakfast = tempBreakfast
        .filter((item) => item.type === "Breakfast")
        .reduce((acc, item) => acc + item.calories, 0);

      carbL =
        carbL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinL =
        proteinL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.protein, 0);

      fatL =
        fatL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieL =
        calorieL +
        tempBreakfast
          .filter((item) => item.type === "Lunch")
          .reduce((acc, item) => acc + item.calories, 0);

      carbS =
        carbS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinS =
        proteinS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.protein, 0);

      fatS =
        fatS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieS =
        calorieS +
        tempBreakfast
          .filter((item) => item.type === "Snack")
          .reduce((acc, item) => acc + item.calories, 0);

      carbD =
        carbD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.carbs, 0);

      proteinD =
        proteinD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.protein, 0);

      fatD =
        fatD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.fat, 0);
      calorieD =
        calorieD +
        tempBreakfast
          .filter((item) => item.type === "Dinner")
          .reduce((acc, item) => acc + item.calories, 0);

      carbB = carbB + carbssBreakfast;
      fatB = fatB + fatsBreakfast;
      proteinB = proteinB + proteinsBreakfast;
      calorieB = calorieB + caloriesBreakfast;

      const newData = [
        {
          type: "Breakfast",
          carbs: carbssBreakfast,
          protein: proteinsBreakfast,
          fat: fatsBreakfast,
          calorie: caloriesBreakfast,
        },
        {
          type: "Lunch",
          carbs: carbssBreakfast,
          protein: proteinsBreakfast,
          fat: fatsBreakfast,
          calorie: (caloriesBreakfast / 1200) * 100,
        },
      ];
      mealInfo.push(newData);
    }

    setMealPlanDiv(
      <Box sx={{ color: "#99756E", mx: 30, width: "70%" }}>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/breakfast.png" height="80" />
            </Grid>
            <Grid xs={6}>[BREAKFAST]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieB} calories <br />
                  <img src="/images/carbs.png" /> {carbB} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatB} g fat <br />
                  <img src="/images/protein.png" /> {proteinB} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/lunch.png" height="80" />
            </Grid>
            <Grid xs={6}>[LUNCH]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieL} calories <br />
                  <img src="/images/carbs.png" /> {carbL} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatL} g fat <br />
                  <img src="/images/protein.png" /> {proteinL} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/snacks.png" height="80" />
            </Grid>
            <Grid xs={6}>[SNACK]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieS} calories <br />
                  <img src="/images/carbs.png" /> {carbS} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatS} g fat <br />
                  <img src="/images/protein.png" /> {proteinS} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/dinner.png" height="80" />
            </Grid>
            <Grid xs={6}>[DINNER]</Grid>
            <Grid xs={3}>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" /> {calorieD} calories <br />
                  <img src="/images/carbs.png" /> {carbD} g carbs
                </Grid>
                <Grid xs={6}>
                  {" "}
                  <img src="/images/fat.png" /> {fatD} g fat <br />
                  <img src="/images/protein.png" /> {proteinD} g protein
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );

    return mealInfo;
  };

  const [pressureLineDiv, setPressureLineDiv] = useState(
    <LineChart
      xAxis={[
        {
          data: [1, 2, 3, 5, 8, 10],

          colorMap: {
            type: "piecewise",
            thresholds: [0, 10],
            colors: ["#898246", "#898246"],
          },
        },
      ]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={1000}
      height={300}
      sx={{ border: 1 }}
    />
  );
  //!

  const getJournalData = async (startDate, endDate) => {
    try {
      const res = await AxiosInstance.get(`journalentry`);

      // Filter entries by user ID (if applicable)
      let filteredEntries = res.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      // Apply date range filter if both date and endDate are provided
      if (startDate && endDate) {
        filteredEntries = filteredEntries.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return (
            appointmentDate.isAfter(startDate) &&
            appointmentDate.isBefore(endDate)
          );
        });
      }

      setJournalEntry(filteredEntries);

      getfoodEntryData(filteredEntries); // Pass filtered entries directly
    } catch (error) {
      console.error("Error fetching journal data:", error);
      // Handle errors appropriately (e.g., display an error message)
    }

    // let temp;
    // await AxiosInstance.get(`journalentry`).then((res) => {
    //   setJournalEntry(
    //     res.data.filter((item) => item.user_id == loggedInUser.user_id)
    //   );
    //   temp = res.data.filter((item) => item.user_id == loggedInUser.user_id);
    //   // getfoodEntryData(
    //   //   res.data.filter((item) => item.user_id == loggedInUser.user_id)
    //   // );
    //   // {
    //   //   res.data
    //   //     .filter((item) => item.user_id == loggedInUser.user_id)
    //   //     .map((items, index) => {
    //   //       try {
    //   //         getfoodEntryData(items.journal_id);
    //   //         // console.log(items.journal_id);
    //   //       } catch {
    //   //         // setFoodEntry([]);
    //   //       }
    //   //     });
    //   // }
    // });

    // getfoodEntryData(temp);
  };

  const getDailyJournalData = async (date) => {
    try {
      const res = await AxiosInstance.get(`journalentry`);

      // Filter entries by user ID (if applicable)
      let filteredEntries = res.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );

      // Apply date range filter if a date is provided
      if (date) {
        const targetDate = dayjs(date);
        filteredEntries = filteredEntries.filter((item) => {
          const appointmentDate = dayjs(item.date);
          return appointmentDate.isSame(targetDate, "day"); // Check for the same day
        });
      }

      // setWeeklyData(...weeklyData, filteredEntries);
      // setJournalEntry(filteredEntries);
      // getfoodEntryData(filteredEntries); // Pass filtered entries directly
      let temp = [];

      for (const itemID of filteredEntries) {
        const res = await AxiosInstance.get(`foodentry`); // Use await here
        const filteredEntries = res.data.filter(
          (item) => item.journal_id === itemID.journal_id
        );
        temp.push(...filteredEntries);
      }

      setFoodEntry(temp);

      setCarbs(temp.reduce((acc, item) => acc + item.carbs, 0));
      const carbss = temp.reduce((acc, item) => acc + item.carbs, 0);
      setProtein(temp.reduce((acc, item) => acc + item.protein, 0));
      const proteins = temp.reduce((acc, item) => acc + item.protein, 0);
      setFat(temp.reduce((acc, item) => acc + item.fat, 0));
      const fats = temp.reduce((acc, item) => acc + item.fat, 0);
      const temps = temp.reduce((acc, item) => acc + item.calories, 0);

      setCalories((temps / 1200) * 100);

      const newData = {
        carbs: carbss,
        protein: proteins,
        fat: fats,
        calorie: (temps / 1200) * 100,
      };
      setWeeklyData((prevState) => [...prevState, newData]);
    } catch (error) {
      console.error("Error fetching journal data:", error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  for (let month = 0; month < 12; month++) {
    const monthStart = dayjs()
      .startOf("year")
      .add(month, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    const monthEnd = dayjs()
      .startOf("year")
      .add(month, "month")
      .endOf("month")
      .format("YYYY-MM-DD");

    if (monthlyData <= 12) {
      // getMonthlyJournalData(monthStart, monthEnd);
    }
  }

  // const getMonthlyJournalData = async (startDate, endDate) => {
  async function getMonthlyJournalData() {
    let months = [];
    for (let month = 0; month < 12; month++) {
      const monthStart = dayjs()
        .startOf("year")
        .add(month, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const monthEnd = dayjs()
        .startOf("year")
        .add(month, "month")
        .endOf("month")
        .format("YYYY-MM-DD");

      try {
        const res = await AxiosInstance.get(`journalentry`);

        // Filter entries by user ID (if applicable)
        let filteredEntries = res.data.filter(
          (item) => item.user_id === loggedInUser.user_id
        );

        // Apply date range filter if a date is provided
        if (monthStart && monthEnd) {
          filteredEntries = filteredEntries.filter((item) => {
            const appointmentDate = dayjs(item.date);
            return (
              appointmentDate.isAfter(monthStart) &&
              appointmentDate.isBefore(monthEnd)
            );
          });
        }

        let temp = [];

        for (const itemID of filteredEntries) {
          const res = await AxiosInstance.get(`foodentry`); // Use await here
          const filteredEntries = res.data.filter(
            (item) => item.journal_id === itemID.journal_id
          );
          temp.push(...filteredEntries);
        }

        setFoodEntry(temp);

        setCarbs(temp.reduce((acc, item) => acc + item.carbs, 0));
        const carbss = temp.reduce((acc, item) => acc + item.carbs, 0);
        setProtein(temp.reduce((acc, item) => acc + item.protein, 0));
        const proteins = temp.reduce((acc, item) => acc + item.protein, 0);
        setFat(temp.reduce((acc, item) => acc + item.fat, 0));
        const fats = temp.reduce((acc, item) => acc + item.fat, 0);
        const temps = temp.reduce((acc, item) => acc + item.calories, 0);

        setCalories((temps / 1200) * 100);
        // ! add sort dito para sorted n ayun dates kapag ni call sa bar graph

        const newData = {
          month: dayjs(monthStart).format("MM"),
          carbs: carbss,
          protein: proteins,
          fat: fats,
          calorie: (temps / 1200) * 100,
        };

        months.push(newData);
      } catch (error) {
        console.error("Error fetching journal data:", error);
        // Handle errors appropriately (e.g., display an error message)
      }
    }

    return months;
  }

  //! Bar graph

  const [barGraph, setBarGraph] = useState(
    <div style={{ width: "100%" }}>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            colorMap: {
              type: "piecewise",
              thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
              colors: ["#E66253"],
            },
          },
        ]}
        series={[{ data: [0, 0, 0, 0, 0, 0, 0] }]}
        height={300}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 10px 10px 0px 0px)`,
          },
        }}
      />
    </div>
  );

  const getYearlyData = async () => {
    try {
      for (let month = 0; month < 12; month++) {
        // Loop through all 12 months
        const currentMonthStart = dayjs()
          .startOf("month") // Get the start of the current month
          .add(month, "month") // Add the desired number of months
          .format("YYYY-MM-DD");
        const currentMonthEnd = dayjs()
          .endOf("month") // Get the end of the current month
          .add(month, "month") // Add the desired number of months
          .format("YYYY-MM-DD");

        await getJournalData(currentMonthStart, currentMonthEnd); // Call for each month
      }
    } catch (error) {
      console.error("Error fetching journal data:", error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  const setBarGraphDiv = async (condition) => {
    switch (condition) {
      case "Weekly":
        setFilterCondition("Weekly");
        console.log(forWeek());
        break;

      case "Monthly":
        console.log(forMonth());
        setFilterCondition("Monthly");

        break;

      case "Yearly":
        getJournalData(currentYearStart, currentYearEnd);
        setFilterCondition("Monthly");
        setBarGraph(
          <div style={{ width: "100%" }}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["2024"],
                  colorMap: {
                    type: "piecewise",
                    thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                    colors: ["#E66253"],
                  },
                },
              ]}
              series={[{ data: [4, 3, 5, 11] }]}
              height={300}
              slotProps={{
                bar: {
                  clipPath: `inset(0px round 10px 10px 0px 0px)`,
                },
              }}
            />
          </div>
        );
        break;
    }
  };
  //!
  const valueFormatter = (value) => `${value}mm`;

  // * documentation: https://mui.com/x/react-charts/bars/
  const chartSetting = {
    series: [{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid xs={6}>MY CALORIE INTAKE</Grid>
        <Grid xs={6}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                FILTER BY: {filterCondition}
              </Button>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu(setting);
                }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      {barGraph}
      <Grid container spacing={2}>
        <Grid xs={6}>
          {" "}
          <Typography
            sx={{ color: "#99756E", fontSize: "30px", fontWeight: "bold" }}
          >
            WHAT I ATE?{" "}
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenuMeal} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                THIS {thisText}
              </Button>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUserMeal}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUserMeal)}
            onClose={handleCloseUserMenuMeal}
          >
            {settingsMeal.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenuMeal(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />

      {mealPlanDiv}
      <br />
      <br />
      <br />

      <br />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography
            sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
          >
            HIGH BLOOD PRESSURE REPORT
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Tooltip title="Open settings BP">
            <IconButton onClick={handleOpenUserMenuBP} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                FILTER BY: WEEK
              </Button>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUserBP}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUserBP)}
            onClose={handleCloseUserMenuBP}
          >
            {settingsBP.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenuBP(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      <center>{pressureLineDiv}</center>
    </div>
  );
}

export default FoodJournalProgressReport;
