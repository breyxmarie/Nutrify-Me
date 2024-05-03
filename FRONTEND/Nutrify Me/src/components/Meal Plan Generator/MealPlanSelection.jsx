import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation } from "react-router-dom";

function MealPlanSelection() {
  const [recipe, setRecipe] = useState();
  const [calories, setCalories] = useState(0);
  const [diet, setDiet] = useState();
  const [cuisine, setCuisine] = useState();
  const [type, setType] = useState();

  const recipeChoices = [
    { text: "Chicken", background: "#123456" },
    { text: "Pork", background: "#456789" },
    { text: "Beef", background: "white" },
    { text: "Fish", background: "white" },
  ];
  const choiceDiet = ["Low Carb", "Low Sodium", "Protein"];
  const choiceCuisine = ["French", "Filipino", "French", "Mexican"];
  const choiceMealType = ["Breakfast", "Lunch", "Snack", "Dinner"];

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null); // Track selected recipe index
  const [selectedDietIndex, setSelectedDietIndex] = useState(null);
  const [selectedCuisineIndex, setSelectedCuisineIndex] = useState(null);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);

  const handleClick = (clickedIndex) => {
    setSelectedRecipeIndex(clickedIndex); // Update selected index on click
    setRecipe(recipeChoices[clickedIndex].text);
    console.log(recipeChoices[clickedIndex].text);
  };

  const handleClickDiet = (clickedIndex) => {
    setSelectedDietIndex(clickedIndex); // Update selected index on click
    setDiet(choiceDiet[clickedIndex]);
    console.log(choiceDiet[clickedIndex]);
  };

  const handleClickCuisine = (clickedIndex) => {
    setSelectedCuisineIndex(clickedIndex); // Update selected index on click
    setCuisine(choiceCuisine[clickedIndex]);
    console.log(choiceCuisine[clickedIndex]);
  };

  const handleClickType = (clickedIndex) => {
    setSelectedTypeIndex(clickedIndex); // Update selected index on click
    setType(choiceMealType[clickedIndex]);
    console.log(choiceMealType[clickedIndex]);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClicks = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
  return (
    <div style={{ color: "#000000" }}>
      <Box>
        Recipe
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {recipeChoices.map((item, index) => (
            <Grid
              xs={3}
              onClick={() => handleClick(index)}
              sx={{
                background:
                  selectedRecipeIndex === index ? "#a9a9a9a9" : "#ffffff", // Update background color directly
                opacity: selectedRecipeIndex === index ? 0.5 : 1, // Opacity for visual feedback
                transition: "box-shadow 0.3s background ease-in-out", // Add transition for smooth effect
                "&:hover": {
                  // Target the element on hover
                  background: "#d3d3d3d3",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add box-shadow property
                },
              }}
            >
              <h3>{item.text}</h3>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        Diet
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {choiceDiet.map((item, index) => (
            <Grid
              xs={3}
              onClick={() => handleClickDiet(index)}
              sx={{
                background:
                  selectedDietIndex === index ? "#a9a9a9a9" : "#ffffff", // Update background color directly
                opacity: selectedDietIndex === index ? 0.5 : 1, // Opacity for visual feedback
                transition: "box-shadow 0.3s background ease-in-out", // Add transition for smooth effect
                "&:hover": {
                  // Target the element on hover
                  background: "#d3d3d3d3",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add box-shadow property
                },
              }}
            >
              <h3>{item}</h3>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        Cuisine
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {choiceCuisine.map((item, index) => (
            <Grid
              xs={3}
              onClick={() => handleClickCuisine(index)}
              sx={{
                background:
                  selectedCuisineIndex === index ? "#a9a9a9a9" : "#ffffff", // Update background color directly
                opacity: selectedCuisineIndex === index ? 0.5 : 1, // Opacity for visual feedback
                transition: "box-shadow 0.3s background ease-in-out", // Add transition for smooth effect
                "&:hover": {
                  // Target the element on hover
                  background: "#d3d3d3d3",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add box-shadow property
                },
              }}
            >
              <h3>{item}</h3>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        Type
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {choiceMealType.map((item, index) => (
            <Grid
              xs={3}
              onClick={() => handleClickType(index)}
              sx={{
                background:
                  selectedTypeIndex === index ? "#a9a9a9a9" : "#ffffff", // Update background color directly
                opacity: selectedTypeIndex === index ? 0.5 : 1, // Opacity for visual feedback
                transition: "box-shadow 0.3s background ease-in-out", // Add transition for smooth effect
                "&:hover": {
                  // Target the element on hover
                  background: "#d3d3d3d3",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add box-shadow property
                },
              }}
            >
              <h3>{item}</h3>
            </Grid>
          ))}
        </Grid>
      </Box>

      <br />
      <br />
      <Link to={"/test"}>
        <Button>Generate Meal</Button>
      </Link>
    </div>
  );
}

export default MealPlanSelection;
