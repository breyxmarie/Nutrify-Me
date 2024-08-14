import { useState } from "react";
import { useLoggedInUser } from "../LoggedInUserContext";

function NutritionistEditMealPlan() {
  const mealPlans = [{}, {}];
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        marginLeft: "10px",
        marginRight: "10px",
        color: "#000000",
      }}
    ></div>
  );
}

export default NutritionistEditMealPlan;
