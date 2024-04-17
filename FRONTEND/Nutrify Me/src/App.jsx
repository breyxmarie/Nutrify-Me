import { useState } from "react";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import UserNotLogInNavBar from "./components/UserNotLogInNavBar";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/FoodJournalHome";
import MealPlangeneratorHome from "./components/MealPlangeneratorHome";
import MealPlanShopHome from "./components/MealPlanShopHome";
import MealPlanShopMealPlans from "./components/MealPlanShopMealPlans";
import MealPlanShopMealPlanHistory from "./components/MealPlanShopMealPlanHistory";
import MealPlanShopTrackOrders from "./components/MealPlanShopTrackOrders";
import MealPlanShopCheckout from "./components/MealPlanShopCheckout";
import MealPlanShopCart from "./components/MealPlanShopCart";
import MealPlanShopCustomizeMeal from "./components/MealPlanShopCustomizeMeal";
import TelemedicineHome from "./components/TelemedicineHome";
import TelemedicineMeetUs from "./components/TelemedicineMeetUs";
import TelemedicineMessages from "./components/TelemedicineMessages";
import TelemedicineConsultation from "./components/TelemedicineConsultation";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/MainUserNavbar";
import TeleMedNavBar from "./components/TeleMedNavBar";
import MealPlanShopNavBar from "./components/MealPlanShopNavBar";
import LogIn from "./components/LogIn";
import Registration from "./components/Registration";
import UserFooter from "./components/UserFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <MainUserNavBar /> */}
      {/* User Not Log In */}
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <MainUserNavBar /> */}
                <UserNotLogInNavBar />
                <Home />
                <UserFooter />
              </>
            }
          />

          <Route
            path="/about-us"
            element={
              <>
                <UserNotLogInNavBar />
                <AboutUs />
                <UserFooter />
              </>
            }
          />
          {/* User Log In */}
          <Route
            path="/user-home"
            element={
              <>
                <MainUserNavBar />
                <MainHome /> <UserFooter />
              </>
            }
          />
          {/* Telemedicine  */}
          <Route
            path="/telemedicine-meet-us"
            element={
              <>
                <MainUserNavBar />
                <TeleMedNavBar />
                <TelemedicineMeetUs /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-home"
            element={
              <>
                <MainUserNavBar />
                <TeleMedNavBar />
                <TelemedicineHome /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-messages"
            element={
              <>
                <MainUserNavBar />
                <TeleMedNavBar />
                <TelemedicineMessages /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-consultation"
            element={
              <>
                <MainUserNavBar />
                <TeleMedNavBar />
                <TelemedicineConsultation /> <UserFooter />{" "}
              </>
            }
          />

          {/* meal plan shop*/}
          <Route
            path="/meal-plan-shop-home"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopHome /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-meal-plans"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopMealPlans /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-meal-plan-history"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopMealPlanHistory /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-customize-meal"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopCustomizeMeal /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-track-orders"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopTrackOrders /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-cart"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopCart /> <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-checkout"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopCheckout /> <UserFooter />
              </>
            }
          />
          {/* meal plan generator  */}

          <Route
            path="/meal-plan-generator-home"
            element={<MealPlangeneratorHome />}
          />
          <Route path="/food-journal-home" element={<FoodJournalHome />} />
          <Route path="/about-us-user" element={<AboutUsUser />} />

          <Route path="/Log-In" element={<LogIn />} />
          <Route path="/Register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
