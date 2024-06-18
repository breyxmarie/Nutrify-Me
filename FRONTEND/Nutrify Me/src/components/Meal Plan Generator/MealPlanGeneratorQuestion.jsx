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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";

function MealPlanGeneratorQuestion() {
  //! parameters needed
  const [diet, setDiet] = useState("balanced");
  const [health, setHealth] = useState("DASH");
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
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [protein, setProtein] = useState(100);
  const [carbs, setCarbs] = useState(1000);
  const [retrievedData, setRetrievedData] = useState([]);
  const [BMR, setBMR] = useState();
  const [TDEE, setTDEE] = useState();
  const [activity, setActivity] = useState();
  const [generatedMeal, setGeneratedMeal] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedAllergen, setSelectedAllergen] = useState(null);

  //! choices
  const allergens = [
    { label: "None", image: "/images/calories.png" },
    { label: "Tree-Nut-Free", image: "/images/tree-nut-free.png" },
    { label: "Peanut-Free", image: "/images/peanut-free.png" },
    { label: "Soy-Free", image: "/images/soy-free.png" },
    { label: "No-oil-added", image: "/images/no oil added.png" },
    { label: "Dairy-Free", image: "/images/dairy-free.png" },
    { label: "Pork-Free", image: "/images/pork-free.png" },
    { label: "Red-Meat-Free", image: "/images/red-meat-free.png" },
    { label: "Fish-Free", image: "/images/fish-free.png" },
    { label: "Sugar-Conscious", image: "/images/sugar-conscious.png" },
    { label: "Immuno-Supportive", image: "/images/immuno-supportive.png" },
    { label: "Egg-Free", image: "/images/egg-free.png" },
    { label: "Gluten-Free", image: "/images/gluten-free.png" },
  ];

  const dietChoices = [
    { label: "Vegetarian", image: "/images/vegetarian.png" },
    { label: "Paleo", image: "/images/paleo.png" },
    { label: "High-Protein", image: "/images/high protein.png" },
    { label: "High Blood Friendly", image: "/images/high blood friendly.png" },
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
    { label: "American", image: "/images/american.png" },
    { label: "Asian", image: "/images/asian.png" },
    { label: "British", image: "/images/british.png" },
    { label: "Chinese", image: "/images/chinese.png" },
    { label: "French", image: "/images/french.png" },
    { label: "Greek", image: "/images/greek.png" },
    { label: "Indian", image: "/images/indian.png" },
    { label: "Italian", image: "/images/italian.png" },
    { label: "Japanese", image: "/images/japanese.png" },
    { label: "Korean", image: "/images/korean.png" },
    { label: "Middle eastern", image: "/images/middle eastern.png" },
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
    cuisine,
    diet
  ) {
    let tempCalories;
    let tempProtein;
    let tempFat;
    let tempCarbs;

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=breakfast&cuisineType=${cuisine}&health=${diet}`
        )
        .then((res) => {
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
  }
  // const getLunchMeal = () => {};

  // const getSnackMeal = () => {};

  // const getDinnerMeal = () => {};

  async function getMealsWithoutAllergens(
    dish,
    type,
    cuisine,
    health,
    diet,
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&health=${health}&diet=${diet}&`
        )
        .then((res) => {
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
  }

  async function getHighBloodFriendlyMealsWithoutAllergens(
    dish,
    type,
    cuisine,

    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&health=DASH&diet=low-sodium`
        )
        .then((res) => {
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
  }

  async function getHighBloodFriendlyMealsWithAllergens(
    dish,
    type,
    cuisine,
    health,
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&health=DASH&health=${health}&diet=low-sodium`
        )
        .then((res) => {
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
  }

  async function getProteinMealsWithoutAllergens(
    dish,
    type,
    cuisine,
    diet,
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&diet=${diet}&`
        )
        .then((res) => {
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
  }

  async function getMealsWithAllergens(
    dish,
    type,
    cuisine,
    health,
    diet,
    allergens,
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&health=${health}&health=${allergens}&diet=${diet}&`
        )
        .then((res) => {
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
  }

  async function getProteinMealsWithAllergens(
    dish,
    type,
    cuisine,
    diet,
    allergens,
    caloriesGoal,
    // minCalories,
    fat,
    protein,
    carbs
  ) {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];

    try {
      await axios
        .get(
          URL +
            `q=&dishType=${dish}&mealType=${type}&cuisineType=${cuisine}&diet=${diet}&health=${allergens}`
        )
        .then((res) => {
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
  }

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
    const bmr = calculateBMR(data.weight, data.height, data.age, data.gender);
    //const calories = TotalTER(bmr, data.activity);
    const [minCalories, maxCalories] = calculateTDEE(bmr, data.activity);

    const calories = (minCalories + maxCalories) / 2;

    const [carbs, fat, protein] = calculateFPC(calories, data.goal);
    setCaloriesGoal(calories);
    setFat(fat);
    setProtein(protein);
    setCarbs(carbs);
  };
  //!

  //! error handling for meal plan generator
  const generatorSchema = yup.object().shape({
    // cuisine: yup.string().required("Cuisine is required"),
    // diet: yup.string().required("Diet is required"),
    // allergens: yup.string().required("Allergens is required"),
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

  const handleCuisineClick = (item) => {
    // Handle click event for each slide item
    // Replace this with your desired logic (e.g., navigate, open modal)
    console.log("Clicked item:", item);
    const newSelectedCuisine = [...selectedCuisine]; // Create a copy

    if (newSelectedCuisine.includes(item)) {
      // Cuisine already selected, remove it
      const cuisineIndex = newSelectedCuisine.indexOf(item);
      newSelectedCuisine.splice(cuisineIndex, 1);
    } else {
      // Cuisine not selected, add it
      newSelectedCuisine.push(item);
    }

    setSelectedCuisine(newSelectedCuisine);
  };

  const handleDietClick = (item) => {
    setSelectedDiet(item);
    console.log(item);
  };

  const handleAllergensClick = (item) => {
    setSelectedAllergen(item);
    console.log(item);
  };

  const generate = async () => {
    console.log("click");
    //? distribute calories to meals
    //? 25-30% of daily calories for breakfast 27.5
    //? 35-40% of daily calories for lunch  37.5
    // ?5-10% of daily calories for snack  7.5
    //? 25-30% of daily calories for dinner 27.5

    const breakfastCalories = caloriesGoal * 0.275;
    const lunchCalories = caloriesGoal * 0.275;
    const snackCalories = caloriesGoal * 0.075;
    const dinnerCalories = caloriesGoal * 0.375;

    // for (let i = 0; i < 7; i++) {
    if (selectedDiet !== null && selectedAllergen !== null) {
      if (selectedAllergen === "None") {
        if (selectedDiet === "High-Protein") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else if (selectedDiet === "High Blood Friendly") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "breakfast",
                cuisine,
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "lunch",
                cuisine,
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "snack",
                cuisine,
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "dinner",
                cuisine,
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        }
      } else {
        if (selectedDiet === "High-Protein") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else if (selectedDiet === "High Blood Friendly") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        }
      }
    } else {
      toast("Wow so easy!");
    }
  };

  const onSubmitHandlerGenerator = async (data) => {
    console.log("click");
    //? distribute calories to meals
    //? 25-30% of daily calories for breakfast 27.5
    //? 35-40% of daily calories for lunch  37.5
    // ?5-10% of daily calories for snack  7.5
    //? 25-30% of daily calories for dinner 27.5

    const breakfastCalories = caloriesGoal * 0.275;
    const lunchCalories = caloriesGoal * 0.275;
    const snackCalories = caloriesGoal * 0.075;
    const dinnerCalories = caloriesGoal * 0.375;

    // for (let i = 0; i < 7; i++) {
    if (selectedDiet !== null && selectedAllergen !== null) {
      if (selectedAllergen === "None") {
        if (selectedDiet === "High-Protein") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithoutAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else if (selectedDiet === "High Blood Friendly") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "breakfast",
                cuisine,
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "lunch",
                cuisine,
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "snack",
                cuisine,
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithoutAllergens(
                dish,
                "dinner",
                cuisine,
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        }
      } else {
        if (selectedDiet === "High-Protein") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getProteinMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else if (selectedDiet === "High Blood Friendly") {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getHighBloodFriendlyMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        } else {
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];
            meals.push(
              await getMealsWithAllergens(
                dish,
                "breakfast",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                breakfastCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "lunch",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                lunchCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "snack",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                snackCalories,
                fat,
                protein,
                carbs
              )
            );

            meals.push(
              await getMealsWithAllergens(
                dish,
                "dinner",
                cuisine,
                selectedDiet.toLowerCase(),
                `balanced`,
                selectedAllergen.toLowerCase(),
                dinnerCalories,
                fat,
                protein,
                carbs
              )
            );

            console.log(meals);

            cuisineFood.push({ cuisine, meals });
          }

          console.log(cuisineFood);

          let mealPlan = [];
          for (let i = 0; i < 7; i++) {
            let meals = [];
            let tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let BtempMeal =
              cuisineFood[tempNum].meals[0][
                getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
              ];
            if (BtempMeal) {
              meals.push({ Meal: "Breakfast", details: BtempMeal });
            } else {
              while (BtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                BtempMeal =
                  cuisineFood[tempNum].meals[0][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[0].length - 1
                    )
                  ];

                if (BtempMeal) {
                  meals.push({ Meal: "Breakfast", details: BtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let LtempMeal =
              cuisineFood[tempNum].meals[1][
                getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
              ];
            if (LtempMeal) {
              meals.push({ Meal: "Lunch", details: LtempMeal });
            } else {
              while (LtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                LtempMeal =
                  cuisineFood[tempNum].meals[1][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[1].length - 1
                    )
                  ];

                if (LtempMeal) {
                  meals.push({ Meal: " Lunch", details: LtempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let StempMeal =
              cuisineFood[tempNum].meals[2][
                getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
              ];
            if (StempMeal) {
              meals.push({ Meal: "Snack", details: StempMeal });
            } else {
              while (StempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                StempMeal =
                  cuisineFood[tempNum].meals[2][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[2].length - 1
                    )
                  ];

                if (StempMeal) {
                  meals.push({ Meal: "Snack", details: StempMeal });
                }
              }
            }

            tempNum = getRandomInRange(0, cuisineFood.length - 1);

            let DtempMeal =
              cuisineFood[tempNum].meals[3][
                getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
              ];
            if (DtempMeal) {
              meals.push({ Meal: "Dinner", details: DtempMeal });
            } else {
              while (DtempMeal === undefined) {
                tempNum = getRandomInRange(0, cuisineFood.length - 1);
                DtempMeal =
                  cuisineFood[tempNum].meals[3][
                    getRandomInRange(
                      0,
                      cuisineFood[tempNum].meals[3].length - 1
                    )
                  ];

                if (DtempMeal) {
                  meals.push({ Meal: "Dinner", details: DtempMeal });
                }
              }
            }

            //console.log(meals);
            let Day = "Day " + (i + 1);
            mealPlan.push({ Day, meals });
          }

          console.log(mealPlan);

          setGeneratedMeal(mealPlan);
        }
      }
    } else {
      toast("Please select a diet/allergens!");
    }

    // console.log(data);
    // //? distribute calories to meals
    // //? 25-30% of daily calories for breakfast 27.5

    // //? 35-40% of daily calories for lunch  37.5
    // // ?5-10% of daily calories for snack  7.5
    // //? 25-30% of daily calories for dinner 27.5
    // const breakfastCalories = caloriesGoal * 0.275;
    // const lunchCalories = caloriesGoal * 0.275;
    // const snackCalories = caloriesGoal * 0.075;
    // const dinnerCalories = caloriesGoal * 0.375;

    // // for (let i = 0; i < 7; i++) {
    // if (data.allergens === "None") {
    //   if (data.diet === "High-Protein") {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getProteinMealsWithoutAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithoutAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithoutAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithoutAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   } else if (data.diet === "High Blood Friendly") {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getHighBloodFriendlyMealsWithoutAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,

    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithoutAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithoutAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithoutAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   } else {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   }
    // } else {
    //   if (data.diet === "High-Protein") {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getProteinMealsWithAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           data.allergens.toLowerCase(),
    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           data.allergens.toLowerCase(),
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           data.allergens.toLowerCase(),
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getProteinMealsWithAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           data.allergens.toLowerCase(),
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   } else if (data.diet === "High Blood Friendly") {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getHighBloodFriendlyMealsWithAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,
    //           data.allergens.toLowerCase(),
    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           data.allergens.toLowerCase(),
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           data.allergens.toLowerCase(),
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getHighBloodFriendlyMealsWithAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           data.allergens.toLowerCase(),
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   } else {
    //     let cuisineFood = [];
    //     for (const cuisine of selectedCuisine) {
    //       let meals = [];
    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "breakfast",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           breakfastCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "lunch",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           lunchCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "snack",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           snackCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       meals.push(
    //         await getMealsWithAllergens(
    //           dish,
    //           "dinner",
    //           cuisine,
    //           data.diet.toLowerCase(),
    //           `balanced`,
    //           data.allergens.toLowerCase(),
    //           dinnerCalories,
    //           fat,
    //           protein,
    //           carbs
    //         )
    //       );

    //       console.log(meals);

    //       cuisineFood.push({ cuisine, meals });
    //     }

    //     console.log(cuisineFood);

    //     let mealPlan = [];
    //     for (let i = 0; i < 7; i++) {
    //       let meals = [];
    //       let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let BtempMeal =
    //         cuisineFood[tempNum].meals[0][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //         ];
    //       if (BtempMeal) {
    //         meals.push({ Meal: "Breakfast", details: BtempMeal });
    //       } else {
    //         while (BtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           BtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //             ];

    //           if (BtempMeal) {
    //             meals.push({ Meal: "Breakfast", details: BtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let LtempMeal =
    //         cuisineFood[tempNum].meals[1][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //         ];
    //       if (LtempMeal) {
    //         meals.push({ Meal: "Lunch", details: LtempMeal });
    //       } else {
    //         while (LtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           LtempMeal =
    //             cuisineFood[tempNum].meals[0][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //             ];

    //           if (LtempMeal) {
    //             meals.push({ Meal: " Lunch", details: LtempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let StempMeal =
    //         cuisineFood[tempNum].meals[2][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //         ];
    //       if (StempMeal) {
    //         meals.push({ Meal: "Snack", details: StempMeal });
    //       } else {
    //         while (StempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           StempMeal =
    //             cuisineFood[tempNum].meals[2][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //             ];

    //           if (StempMeal) {
    //             meals.push({ Meal: "Snack", details: StempMeal });
    //           }
    //         }
    //       }

    //       tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //       let DtempMeal =
    //         cuisineFood[tempNum].meals[3][
    //           getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //         ];
    //       if (DtempMeal) {
    //         meals.push({ Meal: "Dinner", details: DtempMeal });
    //       } else {
    //         while (DtempMeal === undefined) {
    //           tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //           DtempMeal =
    //             cuisineFood[tempNum].meals[3][
    //               getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //             ];

    //           if (DtempMeal) {
    //             meals.push({ Meal: "Dinner", details: DtempMeal });
    //           }
    //         }
    //       }

    //       //console.log(meals);
    //       let Day = "Day " + (i + 1);
    //       mealPlan.push({ Day, meals });
    //     }

    //     console.log(mealPlan);

    //     setGeneratedMeal(mealPlan);
    //   }
    // }
  };

  //!

  // ?
  const isSelectedCuisine = (cuisineName) => {
    return selectedCuisine.includes(cuisineName);
  };

  const isSelectedDiet = (item) => {
    // Your logic to check if item is selected (e.g., checks selectedDiet)
    return selectedDiet === item;
  };

  const isSelectedAllergen = (item) => {
    // Your logic to check if item is selected (e.g., checks selectedDiet)
    return selectedAllergen === item;
  };
  //?

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
          Cuisine
          <Grid container spacing={2}>
            {cuisineChoice.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <div
                  key={index}
                  onClick={() => handleCuisineClick(item.label)}
                  style={{
                    background: isSelectedCuisine(item.label)
                      ? "#D4CE98"
                      : "white",
                  }}
                >
                  <center>
                    {/* <img src={item.image} width="40%" height="40%" /> */}
                  </center>
                  <Typography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    <img src={item.image} height="50" weight="50" />
                    <br />
                    {item.label}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          Cuisine:{" "}
          {/* <Select
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
          </Typography> */}
          Diet{" "}
          <Grid container spacing={2}>
            {dietChoices.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <div
                  key={item}
                  item={item}
                  onClick={() => handleDietClick(item.label)}
                  isSelectedDiet={() => selectedDiet === item.label}
                  style={{
                    background: isSelectedDiet(item.label)
                      ? "lightblue"
                      : "white",
                  }}
                >
                  <center>
                    {/* <img src={item.image} width="40%" height="40%" /> */}
                  </center>
                  <Typography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    <img src={item.image} height="50" weight="50" />
                    <br />
                    {item.label}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          {/* <Select
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
          </Typography> */}
          <br />
          Allergens
          <Grid container spacing={2}>
            {allergens.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <div
                  key={item}
                  item={item}
                  onClick={() => handleAllergensClick(item.label)}
                  isSelectedDiet={() => selectedDiet === item.label}
                  style={{
                    background: isSelectedAllergen(item.label)
                      ? "pink"
                      : "white",
                  }}
                >
                  <center>
                    {/* <img src={item.image} width="40%" height="40%" /> */}
                  </center>
                  <Typography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    <img src={item.image} height="50" weight="50" />
                    <br />
                    {item.label}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          {/* <Select
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
          </Typography> */}
          <button type="submit">Generate</button>
          {/* <button onClick={generate}>Generate</button> */}
          <ToastContainer />
        </form>
      </Box>

      <Box>For High Blood Diet Plans</Box>

      {generatedMeal.length === 0 ? (
        <Typography>Loading...</Typography>
      ) : (
        generatedMeal.map((item) => (
          <Box>
            <Typography>{item.Day}</Typography>
            {item.meals.map((items) => (
              <>
                <br />
                <Grid container spacing={2}>
                  <Grid xs={3}>
                    {" "}
                    <img src={items.details.recipe.image} />
                  </Grid>
                  <Grid xs={6}>
                    {items.Meal} <br /> {items.details.recipe.label}
                  </Grid>

                  <Grid xs={3}>
                    <Grid container spacing={2}>
                      <Grid xs={6}>
                        <img
                          src="/images/calories.png"
                          width="20px"
                          height="20px"
                        />{" "}
                        {Math.floor(items.details.recipe.calories)}
                        &nbsp; calories
                        <br />
                        <img
                          src="/images/carbs.png"
                          width="20px"
                          height="20px"
                        />{" "}
                        {Math.floor(items.details.recipe.digest[1].total)}g
                        carbs
                      </Grid>
                      <Grid xs={6}>
                        {" "}
                        <img src="/images/fat.png" width="20px" height="20px" />
                        {Math.floor(items.details.recipe.digest[0].total)}g fat
                        <br />
                        <img
                          src="/images/protein.png"
                          width="20px"
                          height="20px"
                        />
                        {Math.floor(items.details.recipe.digest[2].total)}g
                        protein
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Box>
        ))
      )}

      {/* {Object.keys(generatedMeal.meals).forEach((meal) => {
        console.log(meal);
      })} */}
    </div>
  );
}

export default MealPlanGeneratorQuestion;
