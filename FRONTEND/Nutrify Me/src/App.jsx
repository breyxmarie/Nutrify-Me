import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import UserNotLogInNavBar from "./components/NavBars/UserNotLogInNavBar";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/Food Journal/FoodJournalHome";
import MealPlangeneratorHome from "./components/Meal Plan Generator/MealPlangeneratorHome";
import MealPlanShopHome from "./components/Meal Plan Shop/MealPlanShopHome";
import MealPlanShopMealPlans from "./components/Meal Plan Shop/MealPlanShopMealPlans";
import MealPlanShopMealPlanHistory from "./components/Meal Plan Shop/MealPlanShopMealPlanHistory";
import MealPlanShopTrackOrders from "./components/Meal Plan Shop/MealPlanShopTrackOrders";
import MealPlanShopCheckout from "./components/Meal Plan Shop/MealPlanShopCheckout";
import MealPlanShopCart from "./components/Meal Plan Shop/MealPlanShopCart";
import MealPlanShopCustomizeMeal from "./components/Meal Plan Shop/MealPlanShopCustomizeMeal";
import MealPlanShopOrders from "./components/Meal Plan Shop/MealPlanShopOrders";
import TelemedicineHome from "./components/Telemedicine/TelemedicineHome";
import TelemedicineMeetUs from "./components/Telemedicine/TelemedicineMeetUs";
import TelemedicineMessages from "./components/Telemedicine/TelemedicineMessages";
import TelemedicineConsultation from "./components/Telemedicine/TelemedicineConsultation";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/NavBars/MainUserNavbar";
import TeleMedNavBar from "./components/NavBars/TeleMedNavBar";
import FoodJournalNavBar from "./components/NavBars/FoodJournalNavBar";
import MealPlanShopNavBar from "./components/NavBars/MealPlanShopNavBar";
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
            path="/meal-plan-shop-checkout/:cartId?"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopCheckout cartId={useParams().cartId} />{" "}
                <UserFooter />
              </>
            }
          />

          <Route
            path="/meal-plan-shop-order/:orderId?"
            element={
              <>
                <MainUserNavBar />
                <MealPlanShopNavBar />
                <MealPlanShopOrders orderId={useParams().orderId} />{" "}
                <UserFooter />
              </>
            }
          />

          {/* meal plan generator  */}

          <Route
            path="/meal-plan-generator-home"
            element={
              <>
                <MainUserNavBar />
                <MealPlangeneratorHome />{" "}
              </>
            }
          />
          <Route
            path="/food-journal-home"
            element={
              <>
                {" "}
                <MainUserNavBar /> <FoodJournalNavBar />
                <FoodJournalHome /> <UserFooter />
              </>
            }
          />
          <Route
            path="/about-us-user"
            element={
              <>
                <MainUserNavBar /> <AboutUsUser /> <UserFooter />
              </>
            }
          />

          <Route path="/Log-In" element={<LogIn />} />
          <Route path="/Register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
