import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import UserNotLogInNavBar from "./components/NavBars/UserNotLogInNavBar";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/Food Journal/FoodJournalHome";
import FoodJournalProgressReport from "./components/Food Journal/FoodJournalProgressReport";
import MealPlangeneratorHome from "./components/Meal Plan Generator/MealPlangeneratorHome";
import MealPlanSelection from "./components/Meal Plan Generator/MealPlanSelection";
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
import NutritionistConsultation from "./components/Nutritionist/NutritionistConsultation";
import NutritionistAppointment from "./components/Nutritionist/NutritionistAppointment";
import NutritionistHome from "./components/Nutritionist/NutritionistHome";
import NutritionistPatient from "./components/Nutritionist/NutritionistPatient";
import NutritionistMealPlanHistory from "./components/Nutritionist/NutritionistMealPlanHistory";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/NavBars/MainUserNavbar";
import TeleMedNavBar from "./components/NavBars/TeleMedNavBar";
import FoodJournalNavBar from "./components/NavBars/FoodJournalNavBar";
import MealPlanShopNavBar from "./components/NavBars/MealPlanShopNavBar";
import NutritionistNavBar from "./components/NavBars/NutritionistNavBar";
import UserProfile from "./components/Profiles/UserProfile";
import NutritionistProfile from "./components/Profiles/NutritionistProfile";
import LogIn from "./components/LogIn";
import Registration from "./components/Registration";
import UserFooter from "./components/UserFooter";
import Footer from "./components/Footer";
import MealPlanTest from "./components/Meal Plan Generator/MealPlanTest";
import HomePage from "./components/Admin/HomePage";
import Verification from "./components/Admin/Verification";
import Patients from "./components/Admin/Patients";
import Dietician from "./components/Admin/Dietician";
import AdminNavbBar from "./components/NavBars/AdminNavBar";
import SellerNavBar from "./components/NavBars/SellerNavBar";
import SellerHome from "./components/Seller/SellerHome";
import SellerCreateMealPlan from "./components/Seller/SellerCreateMealPlan";
import SellerMenuItems from "./components/Seller/SellerMenuItems";

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
          {/* //* Profiles */}
          <Route
            path="/user-profile"
            element={
              <>
                <MainUserNavBar />
                <UserProfile /> <UserFooter />{" "}
              </>
            }
          />
          {/*  */}
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
                <TelemedicineConsultation /> <UserFooter />
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
            path="/test"
            element={
              <>
                <MainUserNavBar />
                <MealPlanTest />{" "}
              </>
            }
          />
          <Route
            path="/selection"
            element={
              <>
                <MainUserNavBar />
                <MealPlanSelection />{" "}
              </>
            }
          />
          {/* FOOD JOURNAL  */}
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
            path="/food-journal-progress-report"
            element={
              <>
                {" "}
                <MainUserNavBar /> <FoodJournalNavBar />
                <FoodJournalProgressReport /> <UserFooter />
              </>
            }
          />
          {/*  */}
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

          {/* // ! Nutritionist screen   */}
          <Route
            path="/nutritionist-profile"
            element={
              <>
                <NutritionistNavBar /> <NutritionistProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/nutritionist-home"
            element={
              <>
                <NutritionistNavBar /> <NutritionistHome />
                <Footer />
              </>
            }
          />
          <Route
            path="/nutritionist-consultation"
            element={
              <>
                <NutritionistNavBar /> <NutritionistConsultation />
                <Footer />
              </>
            }
          />
          <Route
            path="/nutritionist-appointment"
            element={
              <>
                <NutritionistNavBar /> <NutritionistAppointment />
                <Footer />
              </>
            }
          />

          <Route
            path="/nutritionist-patient"
            element={
              <>
                <NutritionistNavBar />
                <NutritionistPatient />
                <Footer />
              </>
            }
          />

          <Route
            path="/nutritionist-mealPlanHistory"
            element={
              <>
                <NutritionistNavBar />
                <NutritionistMealPlanHistory />
                <Footer />
              </>
            }
          />

          {/* //* Admin */}
          <Route
            path="/admin-home"
            element={
              <>
                <AdminNavbBar />
                <HomePage />
                <Footer />
              </>
            }
          />

          <Route
            path="/admin-verification"
            element={
              <>
                <AdminNavbBar />
                <Verification />
                <Footer />
              </>
            }
          />

          <Route
            path="/admin-patients"
            element={
              <>
                <AdminNavbBar />
                <Patients />
                <Footer />
              </>
            }
          />

          <Route
            path="/admin-dietician"
            element={
              <>
                <AdminNavbBar />
                <Dietician />
                <Footer />
              </>
            }
          />

          {/*  */}

          {/* //*Seller */}
          <Route
            path="/seller-home"
            element={
              <>
                <SellerNavBar />
                <SellerHome />
                <Footer />
              </>
            }
          />

          <Route
            path="/seller-menu-items"
            element={
              <>
                <SellerNavBar />
                <SellerMenuItems />
                <Footer />
              </>
            }
          />

          <Route
            path="/seller-createMealPlan"
            element={
              <>
                <SellerNavBar />
                <SellerCreateMealPlan />
                <Footer />
              </>
            }
          />
          {/*  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
