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

function MealPlanTest() {
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

  const [activity, setActivity] = useState();
  const [selectedDiet, setSelectedDiet] = useState();
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [caloriesGoal, setCaloriesGoal] = useState(1000);
  const [minCalories, setMinCalories] = useState();
  const [maxCalories, setMaxCalories] = useState();
  const [fat, setFat] = useState(100);
  const [protein, setProtein] = useState(100);
  const [carbs, setCarbs] = useState(1000);
  const [generatedMeal, setGeneratedMeal] = useState([]);

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

  //? calculator
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
      console.log(retrieve);

      return retrieve;
    });
  };

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onSubmitHandlerGenerator = async (data) => {
    // try {
    //   const response = await axios.get(
    //     "https://api.spoonacular.com/recipes/complexSearch?apiKey=335f0832faf54f319c568f8c5a425d3f&minCalories=300&maxCalories=600&addRecipeInformation=true&fillIngredients=true&number=30&type=snack&maxFat=60&maxProtein=60&maxCarbs=100"
    //   ); // Use await to wait for the API call
    //   console.log(response.data.results);
    // } catch (error) {
    //   console.error("Error fetching recipes:", error);
    //   // Handle errors appropriately (e.g., return a default value or throw)
    // }

    console.log(caloriesGoal);
    const cal = distribute(minCalories, maxCalories);
    console.log(cal);
    console.log("click");

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

    if (selectedDiet !== null && selectedAllergen !== null) {
      if (selectedAllergen === "None") {
        if (selectedDiet === "High-Protein") {
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

          setGeneratedMeal(randomizeFood(cuisineFood));
          console.log("no allergen and high protein");
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
          console.log(cuisineFood);
          // setGeneratedMeal(randomizeFood(cuisineFood));
          console.log("no allergen and high blood friendly");
        } else {
          console.log("paleo vegetarian");
        }
      } else {
        if (selectedDiet === "High-Protein") {
          console.log("allergen high protein");
        } else if (selectedDiet === "High Blood Friendly") {
          console.log("allergen and high blood friendly");
        } else {
          console.log("paleo vegetarian");
        }
      }
    } else {
      toast("Please select a diet/allergens!");
    }
  };

  const retrieveCuisineFood = async (
    breakfastURL,
    lunchURL,
    snackURL,
    dinnerURL,
    cal
  ) => {
    let cuisineFood = [];
    for (const cuisine of selectedCuisine) {
      let meals = [];

      const breakfastdatas = await getRecipesApi(breakfastURL);
      const breakfasts = filterRecipe(
        breakfastdatas,
        cal.minbreakfast,
        cal.maxbreakfast,
        fat,
        carbs,
        protein
      );

      const lunchdatas = await getRecipesApi(lunchURL);
      const lunchs = filterRecipe(
        lunchdatas,
        cal.minlunch,
        cal.maxlunch,
        fat,
        carbs,
        protein
      );
      //console.log(lunch);
      const snackdatas = await getRecipesApi(snackURL);
      const snacks = filterRecipe(
        snackdatas,
        cal.minsnack,
        cal.maxsnack,
        fat,
        carbs,
        protein
      );
      // console.log(snack);

      const dinnerdatas = await getRecipesApi(dinnerURL);
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

    return cuisineFood;
  };

  const randomizeFood = (cuisineFood) => {
    let mealPlan = [];
    for (let i = 0; i < 5; i++) {
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
              getRandomInRange(0, cuisineFood[tempNum].meals[0].length - 1)
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
              getRandomInRange(0, cuisineFood[tempNum].meals[1].length - 1)
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
              getRandomInRange(0, cuisineFood[tempNum].meals[2].length - 1)
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
              getRandomInRange(0, cuisineFood[tempNum].meals[3].length - 1)
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
    setMinCalories(minCalories);
    setMaxCalories(maxCalories);

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
        (nutrient) =>
          nutrient.label === "Carbs" && nutrient.total >= 100000000000000000
      )
    );

    console.log(tempCarbs);
    if (tempCalories) {
      return tempCalories;
    } else {
      return [];
    }
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
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
      //?
      <div className="parent-div">
        <PopupTrigger>Hover me!</PopupTrigger>
      </div>
      //?
      {console.log(generatedMeal)}
      {generatedMeal?.map((item) => {
        <Typography> item.Day</Typography>;
        // console.log(item.Day);
      })}
      {generatedMeal.length === 0 ? (
        <div>tryee </div>
      ) : (
        // <Grid container spacing={2}>
        generatedMeal.map((item, index) => (
          // <Grid item xs={3} sm={4} md={6} key={index}>
          <Box>
            <Typography> {item.Day}</Typography> <br />
            <Box sx={{ mx: "5%" }}>
              <Grid container spacing={2}>
                {item.meals.map((items) => (
                  <>
                    <Grid item xs={3} sm={4} md={6} key={index}>
                      <div className="parent-div">
                        <PopupTrigger
                        // ref={triggerRef}
                        // onMouseEnter={handleMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                        >
                          <Grid container spacing={2}>
                            <Grid xs={6}>
                              <img
                                src={items.details.recipe.image}
                                width="150"
                                height="150"
                              />
                            </Grid>
                            <Grid xs={6}>
                              {" "}
                              <Typography>{items.Meal}</Typography>
                              {items.details.recipe.label} <br />
                              per serving
                              <br />
                              <br />
                              <Grid container spacing={2}>
                                <Grid xs={6}>
                                  Calories:{" "}
                                  {Math.floor(
                                    items.details.recipe.calories /
                                      items.details.recipe.yield
                                  )}{" "}
                                  <br />
                                  Protein:{" "}
                                  {Math.floor(
                                    items.details.recipe.digest[2].total
                                  )}{" "}
                                  <br />
                                </Grid>
                                <Grid xs={6}>
                                  {" "}
                                  Fat:{" "}
                                  {Math.floor(
                                    items.details.recipe.digest[0].total
                                  )}{" "}
                                  <br />
                                  Carbs:{" "}
                                  {Math.floor(
                                    items.details.recipe.digest[1].total
                                  )}{" "}
                                  <br />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </PopupTrigger>
                        {/* <Popup ref={popupRef}>
                          {isHovered && (
                            <div>
                              Ingredients
                              {Math.floor(items.recipe.digest[0].total)}
                              {items.recipe.ingredientLines.map((ing) => (
                                <Typography>{ing}</Typography>
                              ))}
                            </div>
                          )}
                        </Popup> */}
                        <Popup>
                          Ingredients
                          {Math.floor(items.details.recipe.digest[0].total)}
                          {items.details.recipe.ingredientLines.map((ing) => (
                            <Typography>{ing}</Typography>
                          ))}
                        </Popup>
                      </div>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </Box>
        ))
      )}
    </div>
  );
}

export default MealPlanTest;
