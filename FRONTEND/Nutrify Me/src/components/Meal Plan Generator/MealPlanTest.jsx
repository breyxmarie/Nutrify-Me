import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ClickAwayListener } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { useLoggedInUser } from "../LoggedInUserContext";
import AxiosInstance from "../forms/AxiosInstance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, Link, useLocation } from "react-router-dom";

function MealPlanTest() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const [foodChoices, setFoodChoices] = useState();
  const [mealName, setMealName] = useState();
  const [divPhase, setDivPhase] = useState("calculator"); // calculator, choices, loading, meals
  const [loading1, setLoading1] = useState(false);
  //? Modal
  const [opens, setOpens] = React.useState(false);
  const handleOpens = () => setOpens(true);
  const handleCloses = () => {
    setOpens(false);
  };

  //?
  //! pop up
  const PopupTrigger = styled.span`
    /* Styles for the trigger element */
    cursor: pointer; /* Indicate hoverability */
    // position: relative;
    width: 20%;
  `;

  const Popup = styled.div`
    position: absolute;
    right: 20%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    ${PopupTrigger}:hover + & {
      /* Show popup on hover of the trigger element */
      opacity: 1;
      visibility: visible;
      bottom: 600;
    }
  `;

  const popupRef = useRef(null);
  const triggerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered && popupRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      popupRef.current.style.left = `${triggerRect.left}px`;
      popupRef.current.style.top = `${triggerRect.bottom}px`;
    }
  }, [isHovered, popupRef, triggerRef]);
  //!
  //? edamam api
  const API_ID = "a91422a3";
  const API_KEY = "98019bc3768ed14abc6be04432e9d8e3	";
  const URL = `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&from=1&to=100&`; //! to get meals
  //?

  const [saving, setSaving] = useState(false);
  const [activity, setActivity] = useState();
  const [selectedDiet, setSelectedDiet] = useState();
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [caloriesGoal, setCaloriesGoal] = useState(1000);
  const [minCalories, setMinCalories] = useState();
  const [maxCalories, setMaxCalories] = useState();
  const [fat, setFat] = useState();
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [generatedMeal, setGeneratedMeal] = useState([]);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("none");
  const [goal, setGoal] = useState("none");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cuisineMeals, setCuisineMeals] = useState([]);

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

  const handleCuisineClick = (item) => {
    // Handle click event for each slide item
    // Replace this with your desired logic (e.g., navigate, open modal)
    // console.log("Clicked item:", item);
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
    // console.log(item);
  };

  const handleAllergensClick = (item) => {
    setSelectedAllergen(item);
    //  console.log(item);
  };

  //? calculator
  const calculateFPC = (calories, goal) => {
    // 1. First, you need to know how many calories you eat (or want to eat) each day. I eat roughly 2,300 calories per day.
    // 2. Next, determine your ideal ratio. I like to eat about 50% carbs, 25% fat and 25% protein.
    // 3. Then, multiply your total daily calories by your percentages.
    // 4. Finally, divide your calorie amounts by their calorie-per-gram number.

    // Carbs: 45%–65% of total calories
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
    // For men, the formula is: BMR = 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age).
    // For women, it's: BMR = 66.5 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age).

    // ! Harris-Benedict equation
    //Basal Metabolic Rate (BMR): This is the number of calories your body burns
    //at rest to maintain basic functions like breathing, circulation, and cell growth.
    let BMR;
    switch (gender) {
      case "Male":
        //  BMR = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
        BMR = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;

        break;
      case "Female":
        BMR = 66.5 + 9.563 * weight + 1.85 * height - 4.676 * age;
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
        minCalories = BMR * 1.4;
        maxCalories = BMR * 1.69;
        break;
      case "Moderately active":
        minCalories = BMR * 1.7;
        maxCalories = BMR * 1.99;

        break;

      case "Very active":
        minCalories = BMR * 2;
        maxCalories = BMR * 2.4;

        break;
    }

    return [minCalories, maxCalories];
  };
  //?
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

  const activityChoices = ["Sedentary", "Moderately active", "Very active"];

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

  const convertPromiseintoArray = (datas) => {
    datas.then((array) => {
      const retrieve = array; // This will print the resolved array
      // console.log(retrieve);

      return retrieve;
    });
  };

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onSubmitHandlerGenerator = async (data) => {
    setDivPhase("meal");
    // try {
    //   const response = await axios.get(
    //     "https://api.spoonacular.com/recipes/complexSearch?apiKey=335f0832faf54f319c568f8c5a425d3f&minCalories=300&maxCalories=600&addRecipeInformation=true&fillIngredients=true&number=30&type=snack&maxFat=60&maxProtein=60&maxCarbs=100"
    //   ); // Use await to wait for the API call
    //   console.log(response.data.results);
    // } catch (error) {
    //   console.error("Error fetching recipes:", error);
    //   // Handle errors appropriately (e.g., return a default value or throw)
    // }

    // console.log(caloriesGoal);
    const cal = distribute(minCalories, maxCalories);
    // console.log(cal);
    // console.log("click");

    // const datas = await getRecipesApi(
    //   `q=&dishType=main&mealType=dinner&calories=${cal.mindinner}-${cal.maxdinner}`
    // );

    let retrieve;

    // datas.then((array) => {
    //   retrieve = array; // This will print the resolved array
    //   console.log(retrieve);
    // });

    //const retrieve = datas.then(array);

    //console.log(datas);
    // console.log(
    //   filterRecipe(datas, cal.mindinner, cal.maxdinner, fat, carbs, protein)
    // );

    //! meals
    // const breakfastdatas = await getRecipesApi(
    //   `q=&dishType=main&mealType=breakfast&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
    // );

    // const breakfastdatas = await getRecipesApi(
    //   `q=&dishType=main&mealType=breakfast`
    // );
    // const breakfast = filterRecipe(
    //   breakfastdatas,
    //   cal.minbreakfast,
    //   cal.maxbreakfast,
    //   fat,
    //   carbs,
    //   protein
    // );

    // const lunchdatas = await getRecipesApi(
    //   `q=&dishType=main&mealType=lunch&calories=${cal.minlunch}-${cal.maxlunch}`
    // );
    // const lunch = filterRecipe(
    //   lunchdatas,
    //   cal.minlunch,
    //   cal.maxlunch,
    //   fat,
    //   carbs,
    //   protein
    // );
    // console.log(lunch);
    // const snackdatas = await getRecipesApi(
    //   `q=snack&mealType=snack&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
    // );
    // const snack = filterRecipe(
    //   snackdatas,
    //   cal.minsnack,
    //   cal.maxsnack,
    //   fat,
    //   carbs,
    //   protein
    // );
    // console.log(snack);

    // const dinnerdatas = await getRecipesApi(
    //   `q=&dishType=main&mealType=lunch&calories=${cal.mindinner}-${cal.maxdinner}`
    // );
    // const dinner = filterRecipe(
    //   dinnerdatas,
    //   cal.mindinner,
    //   cal.maxdinner,
    //   fat,
    //   carbs,
    //   protein
    // );
    // console.log(dinner);
    // //!
    // let mealPlan = [];
    // for (let i = 0; i < 5; i++) {
    //   let meals = [];
    //   //   let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //   let BtempMeal = breakfast[getRandomInRange(0, breakfast.length - 1)];
    //   meals.push(BtempMeal);
    //   let LtempMeal = lunch[getRandomInRange(0, lunch.length - 1)];
    //   meals.push(LtempMeal);
    //   let StempMeal = snack[getRandomInRange(0, snack.length - 1)];
    //   meals.push(StempMeal);
    //   let DtempMeal = dinner[getRandomInRange(0, dinner.length - 1)];
    //   meals.push(DtempMeal);

    //   let Day = "Day " + (i + 1);
    //   mealPlan.push({ Day, meals });
    // }

    // console.log(mealPlan);

    // setGeneratedMeal(mealPlan);

    // //? working
    // const diet = selectedDiet.toLowerCase();
    // console.log(diet);
    // let cuisineFood = [];
    // for (const cuisine of selectedCuisine) {
    //   let meals = [];

    //   const breakfastdatas = await getRecipesApi(
    //     `q=&health=${selectedAllergen.toLowerCase()}&health=DASH&mealType=breakfast&cuisineType=${cuisine}&calories=${
    //       cal.minbreakfast
    //     }-${cal.maxbreakfast}`
    //   );
    //   const breakfasts = filterRecipe(
    //     breakfastdatas,
    //     cal.minbreakfast,
    //     cal.maxbreakfast,
    //     fat,
    //     carbs,
    //     protein
    //   );

    //   const lunchdatas = await getRecipesApi(
    //     `q=&health=${selectedAllergen.toLowerCase()}&health=DASH&mealType=lunch&cuisineType=${cuisine}&calories=${
    //       cal.minlunch
    //     }-${cal.maxlunch}`
    //   );
    //   const lunchs = filterRecipe(
    //     lunchdatas,
    //     cal.minlunch,
    //     cal.maxlunch,
    //     fat,
    //     carbs,
    //     protein
    //   );
    //   //console.log(lunch);
    //   const snackdatas = await getRecipesApi(
    //     `q=snack&health=${selectedAllergen.toLowerCase()}&health=DASH&mealType=snack&calories=${
    //       cal.minsnack
    //     }-${cal.maxsnack}&foodCategory!=Condiments and sauces`
    //   );
    //   const snacks = filterRecipe(
    //     snackdatas,
    //     cal.minsnack,
    //     cal.maxsnack,
    //     fat,
    //     carbs,
    //     protein
    //   );
    //   // console.log(snack);

    //   const dinnerdatas = await getRecipesApi(
    //     `q=&health=${selectedAllergen.toLowerCase()}&health=DASH&mealType=dinner&cuisineType=${cuisine}&calories=${
    //       cal.mindinner
    //     }-${cal.maxdinner}`
    //   );
    //   const dinners = filterRecipe(
    //     dinnerdatas,
    //     cal.mindinner,
    //     cal.maxdinner,
    //     fat,
    //     carbs,
    //     protein
    //   );
    //   //  console.log(dinner);

    //   meals.push(breakfasts);
    //   meals.push(lunchs);
    //   meals.push(snacks);
    //   meals.push(dinners);

    //   cuisineFood.push({ cuisine, meals });
    // }

    // console.log(cuisineFood);

    // try {
    //   let mealPlan = [];
    //   for (let i = 0; i < 5; i++) {
    //     let meals = [];

    //     let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //     let BtempMeal =
    //       cuisineFood[tempNum].meals[0][
    //         getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //       ];
    //     if (BtempMeal) {
    //       meals.push({ Meal: "Breakfast", details: BtempMeal });
    //     } else {
    //       while (BtempMeal === undefined) {
    //         tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //         BtempMeal =
    //           cuisineFood[tempNum].meals[0][
    //             getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
    //           ];

    //         if (BtempMeal) {
    //           meals.push({ Meal: "Breakfast", details: BtempMeal });
    //         }
    //       }
    //     }

    //     tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //     let LtempMeal =
    //       cuisineFood[tempNum].meals[1][
    //         getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //       ];
    //     if (LtempMeal) {
    //       meals.push({ Meal: "Lunch", details: LtempMeal });
    //     } else {
    //       while (LtempMeal === undefined) {
    //         tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //         LtempMeal =
    //           cuisineFood[tempNum].meals[1][
    //             getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
    //           ];

    //         if (LtempMeal) {
    //           meals.push({ Meal: " Lunch", details: LtempMeal });
    //         }
    //       }
    //     }

    //     tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //     let StempMeal =
    //       cuisineFood[tempNum].meals[2][
    //         getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //       ];
    //     if (StempMeal) {
    //       meals.push({ Meal: "Snack", details: StempMeal });
    //     } else {
    //       while (StempMeal === undefined) {
    //         tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //         StempMeal =
    //           cuisineFood[tempNum].meals[2][
    //             getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
    //           ];

    //         if (StempMeal) {
    //           meals.push({ Meal: "Snack", details: StempMeal });
    //         }
    //       }
    //     }

    //     tempNum = getRandomInRange(0, cuisineFood.length - 1);

    //     let DtempMeal =
    //       cuisineFood[tempNum].meals[3][
    //         getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //       ];
    //     if (DtempMeal) {
    //       meals.push({ Meal: "Dinner", details: DtempMeal });
    //     } else {
    //       while (DtempMeal === undefined) {
    //         tempNum = getRandomInRange(0, cuisineFood.length - 1);
    //         DtempMeal =
    //           cuisineFood[tempNum].meals[3][
    //             getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
    //           ];

    //         if (DtempMeal) {
    //           meals.push({ Meal: "Dinner", details: DtempMeal });
    //         }
    //       }
    //     }

    //     //console.log(meals);
    //     let Day = "Day " + (i + 1);
    //     mealPlan.push({ Day, meals });
    //   }
    //   setGeneratedMeal(mealPlan);
    // } catch (error) {
    //   console.log(error);
    // }

    // for (let i = 0; i < 7; i++) {

    if (
      selectedDiet !== null &&
      selectedAllergen !== null &&
      selectedCuisine.length >= 1
    ) {
      if (selectedAllergen === "None") {
        if (selectedDiet === "High-Protein") {
          // console.log("no allergen and high protein");

          const diet = selectedDiet.toLowerCase();

          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&diet=${diet}&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&diet=${diet}&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&diet=${diet}&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&diet=${diet}&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          // console.log(cuisineFood);

          const tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          const tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          const tempS = await getRecipesApi(
            `q=snack&mealType=snack&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          const tempD = await getRecipesApi(
            `q=&dishType=main&mealType=dinner&calories=${cal.mindinner}-${cal.maxdinner}`
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //    console.log("has content");
                } else {
                  //   console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }

          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
        } else if (selectedDiet === "High Blood Friendly") {
          const diet = selectedDiet.toLowerCase();

          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&health=DASH&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=DASH&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&health=DASH&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=DASH&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          //  console.log(cuisineFood);

          const tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          const tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          const tempS = await getRecipesApi(
            `q=snack&mealType=snack&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          const tempD = await getRecipesApi(
            `q=&dishType=main&mealType=dinner&calories=${cal.mindinner}-${cal.maxdinner}`
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //    console.log("has content");
                } else {
                  //    console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }
          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
          // console.log("no allergen and high blood friendly");
        } else {
          //  console.log("paleo vegetarian");

          const diet = selectedDiet.toLowerCase();

          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&health=${diet}&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=${diet}&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&health=${diet}&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=${diet}&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          //  console.log(cuisineFood);

          const tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          const tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          const tempS = await getRecipesApi(
            `q=snack&mealType=snack&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          const tempD = await getRecipesApi(
            `q=&dishType=main&mealType=dinner&calories=${cal.mindinner}-${cal.maxdinner}`
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //    console.log("has content");
                } else {
                  //  console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }
          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
        }
      } else {
        if (selectedDiet === "High-Protein") {
          //  console.log("allergen high protein");

          const diet = selectedDiet.toLowerCase();
          const allergen = selectedAllergen.toLowerCase();
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&diet=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&diet=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&diet=${diet}&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&diet=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          //   console.log(cuisineFood);

          const tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&health=${allergen}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          const tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&health=${allergen}&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          const tempS = await getRecipesApi(
            `q=snack&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          const tempD = await getRecipesApi(
            `q=&dishType=main&mealType=dinner&health=${allergen}&calories=${cal.mindinner}-${cal.maxdinner}`
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //     console.log("has content");
                } else {
                  //   console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }
          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
        } else if (selectedDiet === "High Blood Friendly") {
          //   console.log("allergen and high blood friendly");

          const diet = selectedDiet.toLowerCase();
          const allergen = selectedAllergen.toLowerCase();
          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&health=DASH&diet=low-sodium&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=DASH&diet=low-sodium&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&health=DASH&diet=low-sodium&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=DASH&diet=low-sodium&health=${allergen}&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          // console.log(cuisineFood);

          const tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&health=${allergen}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          const tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&health=${allergen}&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          const tempS = await getRecipesApi(
            `q=snack&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          const tempD = await getRecipesApi(
            `q=&dishType=main&mealType=dinner&health=${allergen}&calories=${cal.mindinner}-${cal.maxdinner}`
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //   console.log("has content");
                } else {
                  //     console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }

          //  console.log(cuisineFood);
          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
        } else {
          //   console.log("paleo vegetarian");

          const diet = selectedDiet.toLowerCase();
          const allergen = selectedAllergen.toLowerCase();

          let cuisineFood = [];
          for (const cuisine of selectedCuisine) {
            let meals = [];

            const breakfastdatas = await getRecipesApi(
              `q=&dishType=main&mealType=breakfast&health=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
            );
            const breakfasts = filterRecipe(
              breakfastdatas,
              cal.minbreakfast,
              cal.maxbreakfast,
              fat,
              carbs,
              protein
            );

            const lunchdatas = await getRecipesApi(
              `q=&dishType=main&mealType=lunch&health=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.minlunch}-${cal.maxlunch}`
            );
            const lunchs = filterRecipe(
              lunchdatas,
              cal.minlunch,
              cal.maxlunch,
              fat,
              carbs,
              protein
            );
            //console.log(lunch);
            const snackdatas = await getRecipesApi(
              `q=snack&mealType=snack&health=${diet}&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}&foodCategory!=Condiments and sauces`
            );
            const snacks = filterRecipe(
              snackdatas,
              cal.minsnack,
              cal.maxsnack,
              fat,
              carbs,
              protein
            );
            // console.log(snack);

            const dinnerdatas = await getRecipesApi(
              `q=&dishType=main&mealType=dinner&health=${diet}&health=${allergen}&cuisineType=${cuisine}&calories=${cal.mindinner}-${cal.maxdinner}`
            );
            const dinners = filterRecipe(
              dinnerdatas,
              cal.mindinner,
              cal.maxdinner,
              fat,
              carbs,
              protein
            );
            //  console.log(dinner);

            meals.push(breakfasts);
            meals.push(lunchs);
            meals.push(snacks);
            meals.push(dinners);

            cuisineFood.push({ cuisine, meals });
          }
          console.log(cuisineFood);

          let tempB = await getRecipesApi(
            `q=&dishType=main&mealType=breakfast&health=${diet}&health=${allergen}&calories=${cal.minbreakfast}-${cal.maxbreakfast}`
          );
          let tempL = await getRecipesApi(
            `q=&dishType=main&mealType=lunch&health=${diet}&health=${allergen}&calories=${cal.minlunch}-${cal.maxlunch}`
          );
          let tempS = await getRecipesApi(
            `q=snack&health=${allergen}&calories=${cal.minsnack}-${cal.maxsnack}`
          );
          // let tempD = await getRecipesApi(
          //   `q=&dishType=main&mealType=dinner&health=${diet}&chealth=${allergen}&alories=${cal.mindinner}-${cal.maxdinner}`
          // );

          let tempD = filterRecipe(
            await getRecipesApi(
              `q=&dishType=main&mealType=dinner&health=${diet}&chealth=${allergen}&alories=${cal.mindinner}-${cal.maxdinner}`
            ),
            cal.mindinner,
            cal.maxdinner,
            fat,
            carbs,
            protein
          );

          {
            cuisineFood.map((item) =>
              item.meals.map((items, index) => {
                if (items.length > 10) {
                  //    console.log("has content");
                } else {
                  //    console.log("no content");

                  switch (index) {
                    case 0:
                      {
                        tempB.map((item) => items.push(item));
                      }
                      break;
                    case 1:
                      {
                        tempL.map((item) => items.push(item));
                      }
                      break;
                    case 2:
                      {
                        tempS.map((item) => items.push(item));
                      }
                      break;
                    case 3:
                      {
                        tempD.map((item) => items.push(item));
                      }
                      break;
                  }

                  //   const temp = getRecipesApi()
                }
              })
            );
          }
          setCuisineMeals(cuisineFood);
          setGeneratedMeal(randomizeFood(cuisineFood));
        }
      }
    } else {
      toast("Please select a diet/allergens/cuisine!");
    }
  };

  const getBlob = async (imageLink) => {
    try {
      const response = await axios.get(
        `https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
          // mode: 'no-cors' // Uncomment if necessary for CORS issues
        }
      );

      if (response.status === 200) {
        const imageBlob = response.data;
        //   console.log(imageBlob);
        return imageBlob; // Return the image blob for further processing
      } else {
        throw new Error(`Error fetching image: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error; // Re-throw the error for potential handling elsewhere
    }
    // fetch(`https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // mode: "no-cors",
    // })
    //   .then((response) => response.blob())
    //   .then((imageBlob) => {
    //     // Handle the image blob
    //     console.log(imageBlob);
    //     return imageBlob;
    //   });
  };

  function processResponseData(data) {
    //    console.log(data);
    const fileName = data;
    //   console.log(fileName);
  }

  async function getImage(imageLink) {
    //  console.log(imageLink);
    // const response = await axios.get(
    //   //`https://cors-anywhere.herokuapp.com/${BtempMeal.recipe.image}`,
    //   BtempMeal.recipe.image,

    //   {
    //     responseType: "blob",
    //   }
    // );
    // console.log(response);

    // fetch(`https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // mode: "no-cors",
    // })
    //   .then((response) => response.blob())
    //   .then((imageBlob) => {
    // Handle the image blob
    // const blob = getBlob(imageLink);
    // console.log(blob);
    // const formData = new FormData();
    // blob.then((result) => {
    //   let imageFile = new File([result], "image.jpg", {
    //     type: "image/jpeg",
    //   });
    //   console.log(imageFile);

    //   formData.append("file", imageFile);

    // });

    // try {
    //   AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res.data);
    //     // filename = res.data;
    //     return res.data;
    //     // console.log(filename, "hi");
    //     //  meals.push({ Meal: "Breakfast", details: BtempMeal });
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(formData);

    try {
      const response = await axios.get(
        `https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`,
        { responseType: "blob" }
      );
      const imageBlob = response.data;

      const formData = new FormData();
      const imageFile = new File([imageBlob], "image.jpg", {
        type: "image/jpeg",
      });
      formData.append("file", imageFile);

      const res = await AxiosInstance.post("shopmealplan/savefile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //  console.log(res.data);
      return res.data; // Return the response data if needed
    } catch (error) {
      console.error(error);
    }

    // console.log(imageBlob);

    // })
    // .catch((error) => {
    //   console.error("Error fetching image:", error);
    // });

    // console.log(response);
    // const imageFile = new File([response], "image.jpg", {
    //   type: "image/jpeg",
    // });

    // const formData = new FormData();
    // formData.append("file", imageFile);
    // try {
    //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // fetch(`https://cors-anywhere.herokuapp.com/${imageLink}`, {
    // fetch(`https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // mode: "no-cors",
    // })
    //   .then((response) => response.blob())
    //   .then((imageBlob) => {
    //     // Handle the image blob
    //     console.log(imageBlob);
    //     //  const imageBlob = getBlob(imageLink);
    //     //   console.log(imageBlob);
    //     let imageFile = new File([imageBlob], "image.jpg", {
    //       type: "image/jpeg",
    //     });
    //     console.log(imageFile);

    //     const formData = new FormData();
    //     formData.append("file", imageFile);
    //     // try {
    //     //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     //     headers: {
    //     //       "Content-Type": "multipart/form-data",
    //     //     },
    //     //   }).then((res) => {
    //     //     return processResponseData(res.data);
    //     //     // console.log(res.data);
    //     //     // const fileName = res.data;
    //     //     // console.log(fileName);
    //     //     // return fileName;
    //     //   });
    //     // } catch (error) {
    //     //   console.log(error);
    //     // }
    //   });

    // const res = await AxiosInstance.post("shopmealplan/savefile", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // const fileName = res.data;
    // return fileName;

    // // })
    // .catch((error) => {
    //   console.error("Error fetching image:", error);
    // });

    //console.log(response);
    // const imageFile = new File([response], "image.jpg", {
    //   type: "image/jpeg",
    // });

    // const formData = new FormData();
    // formData.append("file", imageFile);
    // try {
    //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const randomizeFood = (cuisineFood) => {
    let mealPlan = [];

    let tempNum = getRandomInRange(0, cuisineFood.length - 1);

    for (let i = 0; i < 5; i++) {
      let meals = [];

      let tempNum = getRandomInRange(0, cuisineFood.length - 1);

      let BtempMeal =
        cuisineFood[tempNum].meals[0][
          getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
        ];
      if (BtempMeal) {
        // let image = getImage(BtempMeal.recipe.image);
        // console.log(getImage(BtempMeal.recipe.image));
        // let fileName;

        // console.log(fileName);

        // try {
        //   image.then((result) => {
        //     console.log(result); // Output: "image_wnJ8DkF.jpg"
        //     fileName = result;
        //     meals.push({
        //       Meal: "Breakfast",
        //       details: BtempMeal,
        //       image: "http://127.0.0.1:8000/Photos/" + result,
        //     });
        //   });
        // } catch (error) {
        //   meals.push({
        //     Meal: "Breakfast",
        //     details: BtempMeal,
        //     image: "http://127.0.0.1:8000/Photos/image_Wfh8v0g.jpg",
        //   });
        // }

        meals.push({
          Meal: "Breakfast",
          details: BtempMeal,
          image: null,
        });
      } else {
        // while (BtempMeal === undefined) {
        //   tempNum = getRandomInRange(0, cuisineFood.length - 1);
        //   BtempMeal =
        //     cuisineFood[tempNum].meals[0][
        //       getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
        //     ];
        //   if (BtempMeal) {
        //     meals.push({ Meal: "Breakfast", details: BtempMeal });
        //   }
        // }
      }

      tempNum = getRandomInRange(0, cuisineFood.length - 1);

      let LtempMeal =
        cuisineFood[tempNum].meals[1][
          getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
        ];
      if (LtempMeal) {
        meals.push({ Meal: "Lunch", details: LtempMeal, image: null });
      } else {
        // while (LtempMeal === undefined) {
        //   tempNum = getRandomInRange(0, cuisineFood.length - 1);
        //   LtempMeal =
        //     cuisineFood[tempNum].meals[1][
        //       getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
        //     ];
        //   if (LtempMeal) {
        //     meals.push({ Meal: " Lunch", details: LtempMeal });
        //   }
        // }
      }

      tempNum = getRandomInRange(0, cuisineFood.length - 1);

      let StempMeal =
        cuisineFood[tempNum].meals[2][
          getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
        ];
      if (StempMeal) {
        meals.push({ Meal: "Snack", details: StempMeal, image: null });
      } else {
        // while (StempMeal === undefined) {
        //   tempNum = getRandomInRange(0, cuisineFood.length - 1);
        //   StempMeal =
        //     cuisineFood[tempNum].meals[2][
        //       getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
        //     ];
        //   if (StempMeal) {
        //     meals.push({ Meal: "Snack", details: StempMeal });
        //   }
        // }
      }

      tempNum = getRandomInRange(0, cuisineFood.length - 1);

      let DtempMeal =
        cuisineFood[tempNum].meals[3][
          getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
        ];
      if (DtempMeal) {
        meals.push({ Meal: "Dinner", details: DtempMeal, image: null });
      } else {
        // while (DtempMeal === undefined) {
        //   tempNum = getRandomInRange(0, cuisineFood.length - 1);
        //   DtempMeal =
        //     cuisineFood[tempNum].meals[3][
        //       getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
        //     ];
        //   if (DtempMeal) {
        //     meals.push({ Meal: "Dinner", details: DtempMeal });
        //   }
        // }
      }

      //console.log(meals);
      let Day = "Day " + (i + 1);
      mealPlan.push({ Day, meals });
    }

    return mealPlan;
  };

  const distribute = (minCal, maxCal) => {
    const minbreakfastCalories = minCal * 0.275;
    const minlunchCalories = minCal * 0.275;
    const minsnackCalories = minCal * 0.075;
    const mindinnerCalories = minCal * 0.375;

    const maxbreakfastCalories = maxCal * 0.275;
    const maxlunchCalories = maxCal * 0.275;
    const maxsnackCalories = maxCal * 0.075;
    const maxdinnerCalories = maxCal * 0.375;

    // console.log(
    //   breakfastCalories,
    //   " ",
    //   lunchCalories,
    //   " ",
    //   snackCalories,
    //   " ",
    //   dinnerCalories
    // );

    const mealCalories = {
      minbreakfast: minbreakfastCalories,
      maxbreakfast: maxbreakfastCalories,
      minlunch: minlunchCalories,
      maxlunch: maxlunchCalories,
      minsnack: minsnackCalories,
      maxsnack: maxsnackCalories,
      mindinner: mindinnerCalories,
      maxdinner: maxdinnerCalories,
    };

    return mealCalories;
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
    setDivPhase("choices");
    setAge(data.age);
    setGender(data.gender);
    setActivity(data.activity);
    setGoal(data.goal);
    setHeight(data.height);
    setWeight(data.weight);

    const bmr = calculateBMR(data.weight, data.height, data.age, data.gender);
    //const calories = TotalTER(bmr, data.activity);
    const [minCalories, maxCalories] = calculateTDEE(bmr, data.activity);

    //  const calories = (minCalories + maxCalories) / 2;
    console.log(maxCalories);
    const calories = maxCalories;

    const [carbs, fat, protein] = calculateFPC(maxCalories, data.goal);
    setCaloriesGoal(calories);
    setFat(fat);
    setProtein(protein);
    setCarbs(carbs);
    setMinCalories(Math.round(minCalories));
    setMaxCalories(Math.round(maxCalories));

    console.log(
      minCalories,
      " ",
      maxCalories,
      " ",
      fat,
      " ",
      protein,
      " ",
      carbs
    );
  };
  //!
  //!

  const getRecipesApi = async (data) => {
    try {
      const response = await axios.get(URL + data); // Use await to wait for the API call
      return response.data.hits; // Implicit return (no need for explicit statement)
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast(
        "Too Many request. Please wait a Few Minutes before generating again"
      );
      // Handle errors appropriately (e.g., return a default value or throw)
    }
  };

  const filterRecipe = (
    data,
    mincalories,
    maxcalories,
    fat,
    carbs,
    protein
  ) => {
    let tempCalories = [];
    let tempProtein = [];
    let tempFat = [];
    let tempCarbs = [];
    // console.log(data.recipe);

    //   const calorieCheck = data.recipe.calories / data.recipe.yield;

    //data.map((item) => console.log(item.recipe.calories / item.recipe.yield));
    //console.log(calorieCheck);
    tempCalories = data.filter(
      (item) =>
        // item.recipe.calories <= caloriesGoal &&
        // item.recipe.calories >= minCalories

        item.recipe.calories / item.recipe.yield <= maxcalories &&
        item.recipe.calories / item.recipe.yield >= mincalories
    );

    tempFat = tempCalories.filter((item) =>
      item.recipe.digest.find(
        (nutrient) => nutrient.label === "Fat" && nutrient.total <= fat
      )
    );

    tempProtein = tempFat.filter((item) =>
      item.recipe.digest.find(
        (nutrient) => nutrient.label === "Protein" && nutrient.total <= protein
      )
    );

    tempCarbs = tempProtein.filter((item) =>
      item.recipe.digest.find(
        (nutrient) => nutrient.label === "Carbs" && nutrient.total <= carbs
      )
    );

    console.log(tempCarbs);
    if (tempCarbs) {
      return tempCarbs;
    } else {
      return [];
    }
  };

  //? modal

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
    borderRadius: 3,
    color: "#ffffff",
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    setMealName(e.target.value);
  };
  const handleClose = () => {
    setIsOpen(false);
    setMealName();
  };

  const saveMeal = async () => {
    setSaving(true);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < generatedMeal[i].meals.length; j++) {
        const meal = generatedMeal[i].meals[j];
        const imageUrl = meal.details.recipe.image;
        // console.log(imageUrl);
        try {
          const imageData = await getImage(imageUrl);
          // console.log(imageData);
          // console.log(imageData);
          // imageData.then((result) => {
          //   console.log(imageData);

          // });
          meal.image =
            `https://nightxperson.pythonanywhere.com/Photos/` + imageData;
          // Directly modify the 'image' property
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    try {
      AxiosInstance.post(`generatedmeal/`, {
        date: dayjs().format("YYYY-MM-DD"),
        user_id: loggedInUser.user_id,
        meal: generatedMeal,
        name: mealName,
        age: parseInt(age),
        gender: gender,
        activity: activity,
        goal: goal,
        weight: parseInt(weight),
        height: parseInt(height),
        cuisine: selectedCuisine,
        diet: selectedDiet,
        allergen: selectedAllergen,
      }).then((res) => {
        // navigate(`/`);

        handleClose();

        setSaving(false);
        toast.success("Meal Plan Saved!");
        // console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //?

  const regenerate = async () => {
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < generatedMeal[i].meals.length; j++) {
    //     const meal = generatedMeal[i].meals[j];
    //     const imageUrl = meal.details.recipe.image;
    //     console.log(imageUrl);
    //     try {
    //       const imageData = await getImage(
    //         `http://127.0.0.1:8000/Photos/` + imageUrl
    //       );
    //       // console.log(imageData);
    //       // console.log(imageData);
    //       // imageData.then((result) => {
    //       //   console.log(imageData);

    //       // });
    //       meal.image = imageData;
    //       // Directly modify the 'image' property
    //     } catch (error) {
    //       console.error("Error fetching image:", error);
    //     }
    //   }

    // generatedMeal[i].meals.map(
    //   (item, index) => (
    //     console.log(item.details.recipe.image),
    //     getImage(item.details.recipe.image).then((result) => {
    //       generatedMeal[i].meals[index].images = result;
    //     })
    //   )
    // );
    // }
    // console.log(generatedMeal);
    setGeneratedMeal(randomizeFood(cuisineMeals));
  };

  //? Slider
  const handleNextC = () => {
    //* add sa carousel to handle prev and next buttons
    sliderRefC.current.slickNext(); // Trigger next slide transition
  };

  const handlePrevC = () => {
    sliderRefC.current.slickPrev(); // Trigger previous slide transition
  };
  const sliderRefC = useRef(null);
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };
  //?

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "90px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      {divPhase === "calculator" ? (
        <>
          <Box
            sx={{
              border: 1,
              borderRadius: 3,
              borderColor: "#99756E",
              ml: {
                xs: "5%", // Extra small devices (less than 600px)
                sm: "5%", // Small devices (600px and up)
                md: "10%", // Medium devices (900px and up)
                lg: "10%", // Large devices (1200px and up)
              },
              mr: {
                xs: "5%", // Extra small devices (less than 600px)
                sm: "5%", // Small devices (600px and up)
                md: "10%", // Medium devices (900px and up)
                lg: "10%", // Large devices (1200px and up)
              },
              pb: "3%",
              pt: "1%",
            }}
          >
            <Typography
              sx={{ color: "#E66253", fontWeight: "bold", fontSize: "150%" }}
            >
              NUTRITION CALCULATOR
              <Box
                sx={{
                  border: 1,
                  borderRadius: 3,
                  borderColor: "#99756E",
                  background: "#EAE9DE",
                  //opacity: 0.4,
                  mx: "5%",
                  px: "5%",
                  py: "1.5%",
                  mb: "50px",
                }}
              >
                <Typography sx={{ color: "#898246" }}>
                  This calculator uses a standard{" "}
                  <b>Harris-Benedict equation </b>to estimate your Calorie
                  needs. The Total Daily Energy Expenditure is based on your
                  goal and activity level to determine the needed calories and
                  macro nutrients per day. We also make some rough macronutrient
                  suggestions.
                </Typography>
              </Box>
            </Typography>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  <Typography sx={{ mt: 1.2 }}> I want to....</Typography>
                </Grid>{" "}
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={selectedNutritionist}
                    // onChange={handleChange}
                    fullWidth
                    size="small"
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
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  <Typography sx={{ mt: 1.2 }}>Gender</Typography>
                </Grid>
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={selectedNutritionist}
                    // onChange={handleChange}
                    size="small"
                    name="gender"
                    width="50%"
                    fullWidth
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
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  <Typography sx={{ mt: "15%" }}>Height (in cm)</Typography>
                </Grid>
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  {" "}
                  <TextField
                    id="height"
                    name="height"
                    size="small"
                    fullWidth
                    margin="dense"
                    {...register("height")}
                    error={errors.height ? true : false}
                    type="number"
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.height?.message}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  <Typography sx={{ mt: 2 }}> Weight (in kg)</Typography>
                </Grid>
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  {" "}
                  <TextField
                    id="weight"
                    name="weight"
                    size="small"
                    fullWidth
                    margin="dense"
                    {...register("weight")}
                    error={errors.weight ? true : false}
                    type="number"
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.weight?.message}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  {" "}
                  <Typography sx={{ mt: 2 }}> Age</Typography>
                </Grid>
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  {" "}
                  <TextField
                    id="age"
                    name="age"
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register("age")}
                    error={errors.age ? true : false}
                    type="number"
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.age?.message}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  xs={2}
                  lg={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: "8%" }}
                >
                  {" "}
                  <Typography sx={{ mt: 1 }}> Activity Level</Typography>
                </Grid>
                <Grid
                  xs={7}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ ml: 4 }}
                >
                  {" "}
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    // value={selectedNutritionist}
                    // onChange={handleChange}
                    size="small"
                    name="activity"
                    fullWidth
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderRadius: 3,
                  mt: 3,
                  px: 10,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 1,
                    borderColor: "#E66253",
                  },
                }}
              >
                Calculate
              </Button>
            </form>
          </Box>
        </>
      ) : (
        <></>
      )}
      {/* {divPhase === "calculator" ? ( */}
      {divPhase === "choices" ? (
        <Box>
          <form onSubmit={handleSubmit1(onSubmitHandlerGenerator)}>
            <Typography
              sx={{ color: "#E66253", fontWeight: "bold", fontSize: "150%" }}
            >
              MEAL PLAN GENERATOR QUESTIONNAIRE
            </Typography>
            <Grid container spacing={1} sx={{ mx: "0", mt: "1%" }}>
              <Grid xs={12} md={4} sx={{}}>
                <Box
                  sx={{
                    mx: "5%",
                    color: "#99756E",
                    border: 1.8,
                    pb: "16%",
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#99756E",
                      border: 3,
                      borderColor: "##99756E",
                      fontWeight: "bold",
                      borderRadius: 4,
                      mx: "35%",

                      fontSize: {
                        xs: "0.8em", // For extra small screens
                        sm: "0.8em", // For small screens
                        md: "1.0em", // For medium screens
                        lg: "1.5em", // For large screens
                        xl: "2.0em", // For extra large screens
                      },
                      mt: 1.5,
                    }}
                  >
                    CUISINE
                  </Typography>

                  <p>You may choose more than 1</p>

                  <Grid container spacing={2}>
                    {cuisineChoice.map((item, index) => (
                      <Grid item xs={6} sm={4} md={4} key={index}>
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
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    ml: "5%",
                    mr: "5%",
                    mt: {
                      xs: 3, // For extra small screens
                      sm: 3, // For small screens
                      md: 0, // For medium screens
                    },
                    color: "#99756E",
                    border: 1.8,

                    pb: {
                      xs: 3, // For extra small screens
                      sm: 3, // For small screens
                      md: "64%", // For medium screens
                    },
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#99756E",
                      border: 3,

                      borderColor: "##99756E",
                      fontWeight: "bold",
                      borderRadius: 4,
                      mx: "35%",

                      fontSize: {
                        xs: "0.8em", // For extra small screens
                        sm: "0.8em", // For small screens
                        md: "1.0em", // For medium screens
                        lg: "1.5em", // For large screens
                        xl: "2.0em", // For extra large screens
                      },
                      mt: 1.5,
                    }}
                  >
                    DIET
                  </Typography>

                  <Grid container spacing={2}>
                    {dietChoices.map((item, index) => (
                      <Grid item xs={6} sm={4} md={6} key={index}>
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
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    mx: "5%",
                    mt: {
                      xs: 3, // For extra small screens
                      sm: 3, // For small screens
                      md: 0, // For medium screens
                    },
                    color: "#99756E",
                    border: 1.8,
                    pb: "5%",
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#99756E",
                      border: 3,
                      borderColor: "##99756E",
                      fontWeight: "bold",
                      borderRadius: 4,
                      mx: "30%",
                      mb: "3%",
                      fontSize: {
                        xs: "0.8em", // For extra small screens
                        sm: "0.8em", // For small screens
                        md: "1.0em", // For medium screens
                        lg: "1.5em", // For large screens
                        xl: "2.0em", // For extra large screens
                      },

                      mt: 1.5,
                    }}
                  >
                    ALLERGEN
                  </Typography>

                  <Grid container spacing={2}>
                    {allergens.map((item, index) => (
                      <Grid item xs={6} sm={4} md={4} key={index}>
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
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mx: "22%", mt: 2 }}>
              <Grid container spacing={2} sx={{ mt: "1%" }}>
                <Grid xs={12} md={3}>
                  <img src="/images/calories.png" />
                  {minCalories} - {maxCalories} Calories
                </Grid>
                <Grid xs={12} md={3}>
                  <img src="/images/carbs.png" /> {carbs} Carbs
                </Grid>
                <Grid xs={12} md={3}>
                  {" "}
                  <img src="/images/fat.png" /> {fat} Fat
                </Grid>
                <Grid xs={12} md={3}>
                  <img src="/images/protein.png" /> {protein} Protein
                </Grid>
              </Grid>
            </Box>
            <Button
              sx={{
                mt: 3,
                background: "#E66253",
                color: "#ffffff",
                fontSize: {
                  xs: "0.9em", // For extra small screens
                  sm: "0.9em", // For small screens
                  md: "1.2em", // For medium screens
                },

                borderRadius: 3,
                px: 10,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                  borderColor: "#E66253",
                },
              }}
              type="submit"
            >
              GENERATE
            </Button>
          </form>
        </Box>
      ) : (
        <></>
      )}
      {divPhase === "loading" ? <>calculator</> : <></>}

      {/* {generatedMeal.length === 0 && divPhase === "calculator" ? ( */}
      {generatedMeal.length === 0 && divPhase === "meal" ? (
        <div>
          <img src="/images/generator loading.gif" width="35%" height="35%" />
        </div>
      ) : generatedMeal.length > 0 ? (
        <Box>
          {generatedMeal.map((item, index) => (
            // <Grid item xs={3} sm={4} md={6} key={index}>
            <Box>
              <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={style}>
                  {saving ? (
                    <>
                      <center>
                        {" "}
                        <img src="/images/pacman.gif" width="43%" />
                        <Typography>Saving please wait...</Typography>
                      </center>
                    </>
                  ) : (
                    <center>
                      Save
                      <br />
                      <TextField
                        name="mealname"
                        label="mealname"
                        variant="outlined"
                        value={mealName}
                        onChange={handleChange}
                        required={true}
                      />
                      <Button
                        onClick={saveMeal}
                        sx={{
                          mx: 5,
                          mt: 3,
                          display: "block",
                          background: "#ffffff",
                          color: "#E66253",
                          fontSize: "20px",
                          borderRadius: 5,

                          "&:hover": {
                            backgroundColor: "#E66253",
                            color: "#ffffff",
                            border: 1,
                            borderColor: "#ffffff",
                          },
                        }}
                      >
                        Save Meal Plan
                      </Button>
                    </center>
                  )}
                </Box>
              </Modal>
            </Box>
          ))}

          <Typography
            sx={{
              color: "#99756E",
              fontSize: {
                xs: "1em", // For extra small screens
                sm: "1.5em", // For small screens
                md: "2em", // For medium screens
                lg: "2.0em", // For large screens
              },
              fontWeight: "bold",
            }}
          >
            The Generated Meal Plan for You Is....
          </Typography>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid xs={6} display="flex" justifyContent="flex-end">
              <img
                src={
                  generatedMeal[getRandomInRange(0, 4)].meals[
                    getRandomInRange(0, 3)
                  ].details.recipe.image
                }
                width="30%"
                height="70%"
              />{" "}
              <img
                src={
                  generatedMeal[getRandomInRange(0, 4)].meals[
                    getRandomInRange(0, 3)
                  ].details.recipe.image
                }
                width="30%"
                height="70%"
              />
            </Grid>
            <Grid xs={6} display="flex" justifyContent="flex-start">
              {" "}
              <img
                src={
                  generatedMeal[getRandomInRange(0, 4)].meals[
                    getRandomInRange(0, 3)
                  ].details.recipe.image
                }
                width="30%"
                height="70%"
              />
              <img
                src={
                  generatedMeal[getRandomInRange(0, 4)].meals[
                    getRandomInRange(0, 3)
                  ].details.recipe.image
                }
                width="30%"
                height="70%"
              />
            </Grid>
          </Grid>

          {/* <Typography display="flex" justifyContent="center"> */}
          <Typography
            display="flex"
            justifyContent="center"
            sx={{ fontWeight: "bold", color: "#99756E", fontSize: "1.45em" }}
          >
            Cuisine:{" "}
            {selectedCuisine.map((item, index) => (
              <>
                {item}

                {index + 1 != selectedCuisine.length ? <>{","}</> : <></>}
              </>
            ))}{" "}
          </Typography>

          <Typography
            display="flex"
            justifyContent="center"
            sx={{ fontWeight: "bold", color: "#99756E", fontSize: "1.45em" }}
          >
            Diet Info: {selectedDiet} <br />{" "}
          </Typography>
          <Typography
            display="flex"
            justifyContent="center"
            sx={{ fontWeight: "bold", color: "#99756E", fontSize: "1.45em" }}
          >
            Allergen: {selectedAllergen}
          </Typography>
          {/* </Typography> */}

          <Grid container spacing={2}>
            <Grid
              item
              xs={0}
              sm={1}
              md={1}
              lg={1}
              sx={{
                display: {
                  xs: "none", // Hide on extra small screens
                  sm: "block",
                  md: "block", // Display on small screens and up
                },
              }}
            >
              <Button
                onClick={handlePrevC}
                sx={{ marginTop: "450%", background: "#ffffff" }}
              >
                <img src="/images/left arrow.png" width="30px" height="30px" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={9} md={10} lg={10}>
              <Slider
                {...settings}
                ref={sliderRefC}
                style={{
                  color: "#000000",
                  border: 1,
                  borderColor: "#000000",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                {generatedMeal.map((item, index) => (
                  <Box key={index} onClick={() => handleSlideClick(item)}>
                    <Box
                      sx={{
                        color: "#000000",
                        border: 3,
                        borderColor: "#898246",
                        borderRadius: 3,
                        ml: "0%",
                        mr: "0px",
                        py: "2%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#99756E",
                          fontWeight: "bold",
                          fontSize: "200%",
                        }}
                      >
                        {item.Day}
                      </Typography>
                      {item.meals.map((items) => (
                        <Box sx={{ mt: "5%", ml: "5%" }}>
                          <Grid container spacing={2}>
                            <Grid xs={12} md={3}>
                              {" "}
                              <div
                                className="parent-div"
                                style={{ marginLeft: "20%" }}
                              >
                                <PopupTrigger
                                // ref={triggerRef}
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                                >
                                  <img
                                    src={items.details.recipe.image}
                                    width="80%"
                                    height="70%"
                                  />
                                  <Popup>
                                    hi Ingredients
                                    {Math.floor(
                                      items.details.recipe.digest[0].total
                                    )}
                                    {items.details.recipe.ingredientLines.map(
                                      (ing) => (
                                        <Typography>{ing}</Typography>
                                      )
                                    )}
                                  </Popup>
                                </PopupTrigger>
                              </div>
                            </Grid>
                            <Grid xs={12} sm={12} md={4}>
                              {" "}
                              <Box
                                sx={{
                                  mx: "0%",
                                  mt: {
                                    xs: 0, // For extra small screens
                                    sm: 0, // For small screens
                                    md: 5, // For medium screens
                                  },
                                }}
                              >
                                <Typography
                                  display="flex"
                                  justifyContent="center"
                                >
                                  {items.Meal}
                                </Typography>
                                <Typography
                                  display="flex"
                                  justifyContent="center"
                                >
                                  {items.details.recipe.label}
                                </Typography>
                                <Typography
                                  display="flex"
                                  justifyContent="center"
                                >
                                  per serving{" "}
                                </Typography>
                                <br />
                              </Box>
                            </Grid>
                            <Grid xs={6} md={4}>
                              <Grid
                                container
                                spacing={2}
                                sx={{
                                  mt: {
                                    xs: 2, // For extra small screens
                                    sm: 2, // For small screens
                                    md: 8, // For medium screens
                                  },
                                  ml: 5,
                                }}
                              >
                                <Grid xs={12} md={6}>
                                  {" "}
                                  <Grid container spacing={2}>
                                    <Grid xs={1.8}>
                                      {" "}
                                      <img src="/images/calories.png" />
                                    </Grid>
                                    <Grid
                                      xs={8}
                                      md={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      {Math.floor(
                                        items.details.recipe.calories /
                                          items.details.recipe.yield
                                      )}{" "}
                                      calories
                                    </Grid>
                                  </Grid>
                                  <br />
                                  <Grid container spacing={2}>
                                    <Grid xs={2}>
                                      {" "}
                                      <img src="/images/carbs.png" />
                                    </Grid>
                                    <Grid
                                      xs={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      {Math.floor(
                                        items.details.recipe.digest[1].total
                                      )}{" "}
                                      carbs
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={6}
                                  sx={{
                                    mt: {
                                      xs: 3,
                                      sm: 3,
                                      md: 0,
                                    },
                                  }}
                                >
                                  {" "}
                                  <Grid container spacing={2}>
                                    <Grid xs={2}>
                                      {" "}
                                      <img src="/images/fat.png" />
                                    </Grid>
                                    <Grid
                                      xs={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      {Math.floor(
                                        items.details.recipe.digest[0].total
                                      )}{" "}
                                      fats
                                    </Grid>
                                  </Grid>
                                  <br />
                                  <Grid container spacing={2}>
                                    <Grid xs={2}>
                                      {" "}
                                      <img src="/images/protein.png" />
                                    </Grid>

                                    <Grid
                                      xs={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      {Math.floor(
                                        items.details.recipe.digest[2].total
                                      )}{" "}
                                      protein
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Link to={items.details.recipe.url} target="_blank">
                            <Button
                              sx={{
                                background: "#E66253",
                                color: "#ffffff",
                                fontSize: 16,
                                mt: 2,
                                mb: {
                                  xs: 4, // For extra small screens
                                  sm: 2, // For small screens
                                  md: 0, // For medium screens
                                },
                                borderRadius: 3,
                                px: 5,
                                "&:hover": {
                                  backgroundColor: "#ffffff",
                                  color: "#E66253",
                                  border: 1,
                                  borderColor: "#E66253",
                                },
                              }}
                            >
                              Recipe
                            </Button>
                          </Link>
                        </Box>
                      ))}

                      {/* <Grid>
                        <img
                          src={item.image}
                          width="140"
                          height="140"
                          style={{ marginLeft: 10 }}
                        />
                      </Grid>

                      <Grid>
                        <img
                          src="/images/star.png"
                          width="10"
                          height="10"
                          style={{ marginLeft: 10 }}
                        />
                        <Typography sx={{ color: "#000000" }}>
                          {item.comment}
                        </Typography>
                      </Grid> */}
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Grid>
            <Grid
              item
              xs={0}
              sm={1}
              md={1}
              lg={1}
              sx={{
                display: {
                  xs: "none", // Hide on extra small screens
                  sm: "block",
                  md: "block", // Display on small screens and up
                },
              }}
            >
              {" "}
              {/* Button container (adjust width as needed) */}
              <Button
                onClick={handleNextC}
                sx={{ marginTop: "450%", background: "#ffffff" }}
              >
                <img src="/images/right arrow.png" width="30px" height="30px" />
              </Button>
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: "#000000",
              display: {
                xs: "block", // Hide on extra small screens
                sm: "none",
              },
              fontWeight: "bold",
              mt: 4,
            }}
          >
            Swipe to See More
          </Typography>
          <Button
            onClick={regenerate}
            sx={{
              mt: "5%",
              background: "#E66253",
              color: "#ffffff",
              fontSize: 16,
              mx: 2,
              borderRadius: 3,
              px: 5,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#E66253",
                border: 1,
                borderColor: "#E66253",
              },
            }}
          >
            Regenerate
          </Button>
          <Button
            onClick={handleOpen}
            sx={{
              mt: "5%",
              background: "#E66253",
              color: "#ffffff",
              fontSize: 16,
              mx: 2,
              borderRadius: 3,
              px: 5,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#E66253",
                border: 1,
                borderColor: "#E66253",
              },
            }}
          >
            Save Meal Plan
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MealPlanTest;
