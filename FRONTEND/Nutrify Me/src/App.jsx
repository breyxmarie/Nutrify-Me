import { useState } from "react";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import UserNotLogInNavBar from "./components/UserNotLogInNavBar";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/FoodJournalHome";
import MealPlangeneratorHome from "./components/MealPlangeneratorHome";
import MealPlanShopHome from "./components/MealPlanShopHome";
import TelemedicineHome from "./components/TelemedicineHome";
import TelemedicineMeetUs from "./components/TelemedicineMeetUs";
import TelemedicineMessages from "./components/TelemedicineMessages";
import TelemedicineConsultation from "./components/TelemedicineConsultation";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/MainUserNavbar";
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
                <Home />
                <UserFooter />
              </>
            }
          />

          <Route
            path="/about-us"
            element={
              <>
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
                <MainHome /> <UserFooter />
              </>
            }
          />
          {/* Telemedicine  */}
          <Route
            path="/telemedicine-meet-us"
            element={
              <>
                <TelemedicineMeetUs /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-home"
            element={
              <>
                <TelemedicineHome /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-messages"
            element={
              <>
                <TelemedicineMessages /> <UserFooter />{" "}
              </>
            }
          />
          <Route
            path="/telemedicine-consultation"
            element={
              <>
                <TelemedicineConsultation /> <UserFooter />{" "}
              </>
            }
          />

          {/*  */}
          <Route
            path="/meal-plan-shop-home"
            element={
              <>
                <MealPlanShopHome /> <UserFooter />
              </>
            }
          />
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
