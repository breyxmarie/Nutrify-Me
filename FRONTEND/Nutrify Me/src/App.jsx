import { useState } from "react";
import Home from "./components/Home";
import AboutUs from "./components/User Not Log In/AboutUs";
import MainHome from "./components/User/MainHome";
import AboutUsUser from "./components/User/AboutUs";
import FoodJournalHome from "./components/User/FoodJournalHome";
import MealPlangeneratorHome from "./components/User/MealPlangeneratorHome";
import MealPlanShopHome from "./components/User/MealPlanShopHome";
import TelemedicineHome from "./components/User/TelemedicineHome";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/MainUserNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/telemedicine-home" element={<TelemedicineHome />} />
          <Route path="/meal-plan-shop-home" element={<MealPlanShopHome />} />
          <Route
            path="/meal-plan-generator-home"
            element={<MealPlangeneratorHome />}
          />
          <Route path="/food-journal-home" element={<FoodJournalHome />} />
          <Route path="/about-us-user" element={<AboutUsUser />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
