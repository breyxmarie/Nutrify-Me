import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

function MealPlanGeneratorQuestion() {
  //! parameters needed
  const [diet, setDiet] = useState();
  const [caloriesGoal, setCaloriesGoal] = useState("1500 - 2000");
  const [nutrients, setNutrients] = useState([]); // ! lagay ng choice here
  const [query, setQuery] = useState(["korean", "tofu", "chicken"]);
  const [goals, setGoals] = useState([]);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [cuisine, setCuisine] = useState();
  const [dish, setDish] = useState("main");
  const [meal, setMeal] = useState("lunch");
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const API_ID = "c4463c1b";
  const API_KEY = "271feabad8974932420da2460b71ae78";

  // TODO: sa q yun query stuff such as cuisine, chicken, meat, fish
  // TODO dishType kung main chuvanes
  // TODO mealType kugn breakfast, lunch, snack, dinner
  const URL = `https://api.edamam.com/search?q=${query}&from=0&to=5&app_id=${API_ID}&app_key=${API_KEY}&dishType=${dish}&mealType=${meal}&calories=${caloriesGoal}&fat=${fat}&carbs=${carbs}&protein=${protein}`; //! to get meals

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        // setBreakfast(res.data.hits);
        console.log(res.data.hits);
      })
      .catch(console.log);
  }, []);

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
    </div>
  );
}

export default MealPlanGeneratorQuestion;
