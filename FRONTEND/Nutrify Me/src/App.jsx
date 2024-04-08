import { useState } from "react";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/FoodJournalHome";
import MealPlangeneratorHome from "./components/MealPlangeneratorHome";
import MealPlanShopHome from "./components/MealPlanShopHome";
import TelemedicineHome from "./components/TelemedicineHome";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/MainUserNavbar";
import LogIn from "./components/LogIn";
import Registration from "./components/Registration";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <MainUserNavBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/telemedicine-home" element={<TelemedicineHome />} />
          <Route path="/meal-plan-shop-home" element={<MealPlanShopHome />} />
          <Route
            path="/meal-plan-generator-home"
            element={<MealPlangeneratorHome />}
          />
          <Route path="/food-journal-home" element={<FoodJournalHome />} />
          <Route path="/about-us-user" element={<AboutUsUser />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/Log-In" element={<LogIn />} />
          <Route path="/Register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
