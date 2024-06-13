import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function MealPlanGeneratorQuestion() {
  //! parameters needed
  const [diet, setDiet] = useState();
  const [gender, setGender] = useState("Female");
  const [caloriesGoal, setCaloriesGoal] = useState(1000);
  const [minCalories, setMinCalories] = useState(500);
  const [nutrients, setNutrients] = useState([]); // ! lagay ng choice here
  const [query, setQuery] = useState([]);
  const [goals, setGoals] = useState([]);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [cuisine, setCuisine] = useState("korean");
  const [dish, setDish] = useState("main");
  const [meal, setMeal] = useState("lunch");
  const [fat, setFat] = useState(100);
  const [protein, setProtein] = useState(100);
  const [carbs, setCarbs] = useState(1000);
  const [retrievedData, setRetrievedData] = useState([]);
  const [BMR, setBMR] = useState();
  const [TDEE, setTDEE] = useState();
  const [activity, setActivity] = useState();

  //! choices
  const allergens = [
    "Tree-Nut-Free",
    "Peanut-Free",
    "Soy-Free",
    "No oil added",
    "Dairy-Free",
    "Pork-Free",
    "Red-Meat-Free",
    "Fish-Free",
    "Sugar-Conscious",
    "Immuno-Supportive",
    "Egg-Free",
    "Gluten-Free",
  ];

  const dietChoices = [
    "Vegetarian",
    "Paleo",
    "High Protein",
    "High Blood Friendly",
  ];

  const activityChoices = [
    "Sedentary",
    "Lightly active",
    "Moderately active",
    "Very active",
  ];

  const genderChoice = ["Male", "Female"];

  const goalChoice = ["Weight Loss", "Muscle Gain", "None"];

  const cuisineChoice = [
    "American",
    "Asian",
    "British",
    "Chinese",
    "French",
    "Greek",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Middle eastern",
  ];

  //!
  const API_ID = "c4463c1b";
  const API_KEY = "271feabad8974932420da2460b71ae78";

  // TODO: sa q yun query stuff such as cuisine, chicken, meat, fish
  // TODO dishType kung main chuvanes
  // TODO mealType kugn breakfast, lunch, snack, dinner
  // TODO not sure pa kung mag add ng filter
  const sampleURL = `https://api.edamam.com/search?q=&dishType=${dish}&mealType=${meal}&cuisineType=${cuisine}&from=1&to=100&app_id=${API_ID}&app_key=${API_KEY}`; //! to get meals
  const URL = `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&from=1&to=100&`; //! to get meals
  const URLNext = `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&from=1&to=100&`;

  // ! ^ old version for recipe fetching
  const newURL = `https://api.edamam.com/api/recipes/v2?type=public&q=&dishType=main Course&cuisineType=${cuisine}&mealType=lunch&calories=${caloriesGoal}&protein=100&health=DASH&app_id=c4463c1b&app_key=271feabad8974932420da2460b71ae78&type=public&from=5&to=10`;
  const [selectedMeals, setSelectedMeals] = useState();
  const [selectedBreakfastMeals, setSelectedBreakfastMeals] = useState();
  const [selectedLunchMeals, setSelectedLunchMeals] = useState();
  const [selectedDinnerMeals, setSelectedDinnerMeals] = useState();

  async function getBreakfastMeal(
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs,
    dish,
    cuisine
  ) {
    let tempCalories;
    let tempProtein;
    let tempFat;
    let tempCarbs;

    try {
      await axios
        .get(
          URL + `q=&dishType=${dish}&mealType=breakfast&cuisineType=${cuisine}&`
        )
        .then((res) => {
          console.log(res.data.hits);

          tempCalories = res.data.hits.filter(
            (item) =>
              // item.recipe.calories <= caloriesGoal &&
              // item.recipe.calories >= minCalories

              item.recipe.calories <= caloriesGoal
          );

          tempFat = tempCalories.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Fat" && nutrient.total < fat
            )
          );

          tempProtein = tempFat.filter((item) =>
            item.recipe.digest.find(
              (nutrient) =>
                nutrient.label === "Protein" && nutrient.total < protein
            )
          );

          tempCarbs = tempProtein.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Carbs" && nutrient.total < carbs
            )
          );

          setSelectedBreakfastMeals(tempCarbs);
        })
        .catch(console.log);
      return tempCarbs;
    } catch {}

    console.log(tempCarbs);
  }

  async function getLunchMeal(
    caloriesGoal,
    //  minCalories,
    fat,
    protein,
    carbs,
    dish,
    cuisine
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(URL + `q=&dishType=${dish}&mealType=lunch&cuisineType=${cuisine}&`)
        .then((res) => {
          console.log(res.data.hits);

          tempCalories = res.data.hits.filter(
            (item) =>
              // item.recipe.calories <= caloriesGoal &&
              // item.recipe.calories >= minCalories

              item.recipe.calories <= caloriesGoal
          );

          tempFat = tempCalories.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Fat" && nutrient.total < fat
            )
          );

          tempProtein = tempFat.filter((item) =>
            item.recipe.digest.find(
              (nutrient) =>
                nutrient.label === "Protein" && nutrient.total < protein
            )
          );

          tempCarbs = tempProtein.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Carbs" && nutrient.total < carbs
            )
          );

          console.log(tempCarbs);
          setSelectedBreakfastMeals(tempCarbs);
        })

        .catch(console.log);
      return tempCarbs;
    } catch {}
  }

  async function getSnackMeal(
    caloriesGoal,
    //minCalories,
    fat,
    protein,
    carbs,
    dish,
    cuisine
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(URL + `q=&dishType=${dish}&mealType=snack&cuisineType=${cuisine}&`)
        .then((res) => {
          console.log(res.data.hits);

          tempCalories = res.data.hits.filter(
            (item) =>
              // item.recipe.calories <= caloriesGoal &&
              // item.recipe.calories >= minCalories
              item.recipe.calories <= caloriesGoal
          );

          tempFat = tempCalories.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Fat" && nutrient.total < fat
            )
          );

          tempProtein = tempFat.filter((item) =>
            item.recipe.digest.find(
              (nutrient) =>
                nutrient.label === "Protein" && nutrient.total < protein
            )
          );

          tempCarbs = tempProtein.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Carbs" && nutrient.total < carbs
            )
          );

          console.log(tempCarbs);
          setSelectedBreakfastMeals(tempCarbs);
        })
        .catch(console.log);
      return tempCarbs;
    } catch {}
  }

  async function getDinnerMeal(
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs,
    dish,
    cuisine
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];
    try {
      await axios
        .get(
          URL + `q=&dishType=${dish}&mealType=dinner&cuisineType=${cuisine}&`
        )
        .then((res) => {
          console.log(res.data.hits);

          tempCalories = res.data.hits.filter(
            (item) =>
              // item.recipe.calories <= caloriesGoal &&
              // item.recipe.calories >= minCalories

              item.recipe.calories <= caloriesGoal
          );

          tempFat = tempCalories.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Fat" && nutrient.total < fat
            )
          );

          tempProtein = tempFat.filter((item) =>
            item.recipe.digest.find(
              (nutrient) =>
                nutrient.label === "Protein" && nutrient.total < protein
            )
          );

          tempCarbs = tempProtein.filter((item) =>
            item.recipe.digest.find(
              (nutrient) => nutrient.label === "Carbs" && nutrient.total < carbs
            )
          );

          console.log(tempCarbs);
          setSelectedBreakfastMeals(tempCarbs);
        })
        .catch(console.log);

      return tempCarbs;
    } catch {}
  }
  // const getLunchMeal = () => {};

  // const getSnackMeal = () => {};

  // const getDinnerMeal = () => {};

  useEffect(() => {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];
    getBreakfastMeal();
    axios
      .get(
        "https://api.edamam.com/search?q=&dishType=main&mealType=breakfast&calories=100&fat=100&carbs=2&protein=20&from=1&to=100&app_id=c4463c1b&app_key=271feabad8974932420da2460b71ae78"
        // "https://api.edamam.com/api/recipes/v2?q=&dishType=main Course&cuisineType=korean&mealType=lunch&calories=100.10-500.02&protein=100&fat=40&health=DASH&app_id=c4463c1b&app_key=271feabad8974932420da2460b71ae78&type=public&from=5&to=10"
      )
      .then((res) => {
        // setBreakfast(res.data.hits);
        //  console.log(res.data.hits);

        setRetrievedData(res.data.hits);
        // setRetrievedData(res.data.hits);

        // // {
        // //   res.data.hits.map((item) => console.log(item.recipe.calories));
        // // }

        // tempCalories = res.data.hits.filter(
        //   (item) =>
        //     item.recipe.calories <= caloriesGoal &&
        //     item.recipe.calories >= minCalories
        // );

        // tempFat = tempCalories.filter((item) =>
        //   item.recipe.digest.find(
        //     (nutrient) => nutrient.label === "Fat" && nutrient.total < fat
        //   )
        // );

        // tempProtein = tempFat.filter((item) =>
        //   item.recipe.digest.find(
        //     (nutrient) =>
        //       nutrient.label === "Protein" && nutrient.total < protein
        //   )
        // );

        // tempCarbs = tempProtein.filter((item) =>
        //   item.recipe.digest.find(
        //     (nutrient) => nutrient.label === "Carbs" && nutrient.total < carbs
        //   )
        // );

        // setSelectedMeals(tempCarbs);
      })
      .catch(console.log);

    // console.log(selectedMeals);
  }, []);

  //!

  //! calculate functions
  const calculateFPC = (calories, goal) => {
    // 1. First, you need to know how many calories you eat (or want to eat) each day. I eat roughly 2,300 calories per day.
    // 2. Next, determine your ideal ratio. I like to eat about 50% carbs, 25% fat and 25% protein.
    // 3. Then, multiply your total daily calories by your percentages.
    // 4. Finally, divide your calorie amounts by their calorie-per-gram number.

    //     Carbs: 45%–65% of total calories
    // Fats: 20%–35% of total calories
    // Proteins: 10%–35% of total calories

    const baseRanges = {
      carbs: [0.4, 0.6],
      fat: [0.2, 0.3],
      protein: [0.15, 0.25],
    };

    const adjustments = {
      "Weight Loss": { carbs: { upperBound: -0.05 } },
      "Muscle Gain": { protein: { lowerBound: +0.05 } },
    };

    const caloriesPerGram = { carbs: 4, fat: 9, protein: 4 }; // Example values
    const macros = {};

    for (const macro in baseRanges) {
      const range = baseRanges[macro].slice(); // Copy the base range
      const adjustment = adjustments[goal]?.[macro]; // Optional adjustment

      if (adjustment) {
        range[0] += adjustment.lowerBound || 0; // Adjust lower bound (if applicable)
        range[1] -= adjustment.upperBound || 0; // Adjust upper bound (if applicable)
      }

      const lowerBoundGrams = Math.floor(calories * range[0]);
      const upperBoundGrams = Math.floor(calories * range[1]);
      macros[macro] = Math.min(lowerBoundGrams, upperBoundGrams);
    }
    console.log(macros);
    //return macros;
    // const carbs = calories * 0.5;
    // const fat = calories * 0.25;
    // const protein = calories * 0.25;

    const carbs = macros.carbs;
    const fat = macros.fat;
    const protein = macros.protein;

    return [carbs, fat, protein];
  };

  const calculateBMR = (weight, height, age, gender) => {
    // For women, it's: BMR = 655.1 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age).
    // For men, the formula is: BMR = 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age).
    // ! Harris-Benedict equation
    //Basal Metabolic Rate (BMR): This is the number of calories your body burns
    //at rest to maintain basic functions like breathing, circulation, and cell growth.
    let BMR;
    switch (gender) {
      case "Male":
        //  BMR = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
        BMR = 655.1 + 9.563(weight) + 1.85(height) - 4.676(age);

        break;
      case "Female":
        BMR = 66.5 + 13.75 * weight + 1.85 * height - 6.75 * age;
        // BMR = 66.5 + 13.75(weight) + 1.85(height) - 6.75(age);

        break;
    }
    //const BMR =
    return BMR;
  };

  const calculateTDEE = (BMR, activity) => {
    // TDEE stands for Total Daily Energy Expenditure. It's an estimate of how many Calories your body burns in a day,
    // including your Basal Metabolic Rate, any exercise you do, and even the energy your body uses to digest food
    // (called the Thermic Effect of Food).
    // To determine your TDEE (Total Daily Energy Expenditure), multiply your BMR by the appropriate activity factor, as follows:
    // Sedentary (little or no exercise): calories = BMR × 1.2;
    // Lightly active (light exercise/sports 1-3 days/week): calories = BMR × 1.375;
    // Moderately active (moderate exercise/sports 3-5 days/week): calories = BMR × 1.55;
    // Very active (hard exercise/sports 6-7 days a week): calories = BMR × 1.725; and
    // If you are extra active (very hard exercise/sports & a physical job): calories = BMR × 1.9.
    //TDEE = BMR x Activity Factor

    let minCalories;
    let maxCalories;
    switch (
      activity //! add info here
    ) {
      case "Sedentary":
        minCalories = BMR * 1.1;
        maxCalories = BMR * 1.3;
        break;
      case "Lightly active":
        minCalories = BMR * 1.3;
        maxCalories = BMR * 1.4;

        break;

      case "Moderately active":
        minCalories = BMR * 1.5;
        maxCalories = BMR * 1.6;

        break;
      case "Very active":
        minCalories = BMR * 1.7;
        maxCalories = BMR * 1.9;

        break;
    }
    console.log(minCalories, maxCalories);

    return [minCalories, maxCalories];
  };

  const TotalTER = (BMR, activity) => {
    let calories;
    switch (
      activity // physical activity level
    ) {
      case "Sedentary":
        calories = BMR * 1.2;
        break;
      case "Lightly active":
        calories = BMR * 1.375;
        break;
      case "Moderately active":
        calories = BMR * 1.55;
        break;
      case "Very active":
        calories = BMR * 1.725;
        break;
    }

    return calories;
  };

  const TotalDailyCalorieCount = () => {
    // To determine your TDEE (Total Daily Energy Expenditure), multiply your BMR by the appropriate activity factor, as follows:
    // Sedentary (little or no exercise): calories = BMR × 1.2;
    // Lightly active (light exercise/sports 1-3 days/week): calories = BMR × 1.375;
    // Moderately active (moderate exercise/sports 3-5 days/week): calories = BMR × 1.55;
    // Very active (hard exercise/sports 6-7 days a week): calories = BMR × 1.725; and
    // If you are extra active (very hard exercise/sports & a physical job): calories = BMR × 1.9.
  };
  //!
  // TODO gawa ng sperate function per diet siguro tas seperate yun for high blood
  const calculator = () => {
    const bmr = calculateBMR(weight, height, age, gender);
    const calories = TotalTER(bmr, activity);
    const carbsRatio = calories * 0.5;
    const fatRatio = calories * 0.25;
    const proteinRatio = calories * 0.25;
  };

  const getMeal = () => {
    //calculateBMR = (weight, height, age, gender);

    const bmr = calculateBMR(weight, height, age, gender);
    const calories = TotalTER(bmr, activity);
    const carbsRatio = calories * 0.5;
    const fatRatio = calories * 0.25;
    const proteinRatio = calories * 0.25;

    getBreakfastMeal();
  };

  // ! from handling for calculator
  const calculatorSchema = yup.object().shape({
    // username: yup.string().required("username is required"),
    // password: yup.string().required("Password is really a requirement"),
    // password: yup.string().min(8).max(32).required(),
    gender: yup.string().required("gender is required"),
    weight: yup.string().required("weight is required"),
    height: yup.string().required("height is required"),
    age: yup.string().required("age is required"),
    activity: yup.string().required("activity is required"),
    goal: yup.string().required("Goal is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(calculatorSchema),
  });
  const onSubmitHandler = (data) => {
    console.log(data);
    const bmr = calculateBMR(data.weight, data.height, data.age, data.gender);
    //const calories = TotalTER(bmr, data.activity);
    const [minCalories, maxCalories] = calculateTDEE(bmr, data.activity);

    const calories = (minCalories + maxCalories) / 2;
    console.log(minCalories, maxCalories, calories);
    const [carbs, fat, protein] = calculateFPC(calories, data.goal);
    setCaloriesGoal(calories);
    setFat(fat);
    setProtein(protein);
    setCarbs(carbs);
  };
  //!

  //! error handling for meal plan generator
  const generatorSchema = yup.object().shape({
    cuisine: yup.string().required("Cuisine is required"),
    diet: yup.string().required("Diet is required"),
    allergens: yup.string().required("Allergens is required"),
  });
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset1,
  } = useForm({
    resolver: yupResolver(generatorSchema),
  });

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onSubmitHandlerGenerator = async (data) => {
    console.log(data);

    //? distribute calories to meals
    //? 25-30% of daily calories for breakfast 27.5

    //? 35-40% of daily calories for lunch  37.5
    // ?5-10% of daily calories for snack  7.5
    //? 25-30% of daily calories for dinner 27.5
    const breakfastCalories = caloriesGoal * 0.275;
    const lunchCalories = caloriesGoal * 0.275;
    const snackCalories = caloriesGoal * 0.075;
    const dinnerCalories = caloriesGoal * 0.375;

    console.log(caloriesGoal + " : " + breakfastCalories);

    let breakfast = await getBreakfastMeal(
      breakfastCalories,
      fat,
      protein,
      carbs,
      dish,
      data.cuisine
    );

    console.log(
      await getBreakfastMeal(
        breakfastCalories,
        fat,
        protein,
        carbs,
        dish,
        data.cuisine
      )
    );

    let lunch = await getLunchMeal(
      lunchCalories,
      fat,
      protein,
      carbs,
      dish,
      data.cuisine
    );

    let snack = await getSnackMeal(
      snackCalories,
      fat,
      protein,
      carbs,
      dish,
      data.cuisine
    );

    let dinner = await getDinnerMeal(
      dinnerCalories,
      fat,
      protein,
      carbs,
      dish,
      data.cuisine
    );

    console.log(breakfast[getRandomInRange(0, breakfast.length - 1)]);

    let meals = [];

    meals.push(breakfast[getRandomInRange(0, breakfast.length - 1)]);
    meals.push(lunch[getRandomInRange(0, lunch.length - 1)]);
    meals.push(snack[getRandomInRange(0, snack.length - 1)]);
    meals.push(dinner[getRandomInRange(0, dinner.length - 1)]);

    console.log(meals);
  };

  //!
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "90%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
          ml: 10,
        }}
      />

      <Box sx={{ border: 1 }}>
        Calculator
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          Gender
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="gender"
            width="100%"
            {...register("gender")}
            error={errors.gender ? true : false}
          >
            {genderChoice.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.gender?.message}
          </Typography>
          <TextField
            id="weight"
            name="weight"
            label="Weight"
            fullWidth
            margin="dense"
            {...register("weight")}
            error={errors.weight ? true : false}
            type="number"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.weight?.message}
          </Typography>
          <TextField
            id="height"
            name="height"
            label="Height"
            fullWidth
            margin="dense"
            {...register("height")}
            error={errors.height ? true : false}
            type="number"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.height?.message}
          </Typography>
          <TextField
            id="age"
            name="age"
            label="Age"
            fullWidth
            margin="dense"
            {...register("age")}
            error={errors.age ? true : false}
            type="number"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.age?.message}
          </Typography>
          Activity
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="activity"
            width="100%"
            {...register("activity")}
            error={errors.activity ? true : false}
          >
            {activityChoices.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.activity?.message}
          </Typography>
          Goal
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="goal"
            width="100%"
            {...register("goal")}
            error={errors.goal ? true : false}
          >
            {goalChoice.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors.goal?.message}
          </Typography>
          <button type="submit">Calculate</button>
        </form>
      </Box>

      <Box sx={{ border: 1 }}>
        {" "}
        <form onSubmit={handleSubmit1(onSubmitHandlerGenerator)}>
          Meal Plan Generator Questionnaire
          <br />
          Cuisine:{" "}
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="cuisine"
            width="100%"
            {...register1("cuisine")}
            error={errors1.cuisine ? true : false}
          >
            {cuisineChoice.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors1.cuisine?.message}
          </Typography>
          Diet{" "}
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="diet"
            width="100%"
            {...register1("diet")}
            error={errors1.diet ? true : false}
          >
            {dietChoices.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors1.diet?.message}
          </Typography>
          <br />
          Allergens
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={selectedNutritionist}
            // onChange={handleChange}
            name="allergens"
            width="100%"
            {...register1("allergens")}
            error={errors1.allergens ? true : false}
          >
            {allergens.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="inherit" color="textSecondary">
            {errors1.allergens?.message}
          </Typography>
          <button type="submit">Generate</button>
        </form>
      </Box>
    </div>
  );
}

export default MealPlanGeneratorQuestion;
