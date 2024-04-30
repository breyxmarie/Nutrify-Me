import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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

  const handleClick = (clickedIndex) => {
    setSelectedRecipeIndex(clickedIndex); // Update selected index on click
    setRecipe(recipeChoices[clickedIndex].text);
    console.log(recipeChoices[clickedIndex].text);
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
                  selectedRecipeIndex === index ? "#456789" : "#ffffff", // Update background color directly
                opacity: selectedRecipeIndex === index ? 0.5 : 1, // Opacity for visual feedback
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
          {/* {choiceDiet.map((item, index) => (
            <Grid
              xs={3}
              onClick={() => handleClicks()}
              sx={{
                backgroundColor: isActive ? "salmon" : "",
                color: isActive ? "#567890" : "",
              }}
            >
              <h3>{item}</h3>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </div>
  );
}

export default MealPlanSelection;
