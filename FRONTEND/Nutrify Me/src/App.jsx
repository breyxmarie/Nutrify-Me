import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import MainHome from "./components/MainHome";
import UserNotLogInNavBar from "./components/NavBars/UserNotLogInNavBar";
import AboutUsUser from "./components/AboutUsUser";
import FoodJournalHome from "./components/Food Journal/FoodJournalHome";
import FoodJournalProgressReport from "./components/Food Journal/FoodJournalProgressReport";
import MealPlangeneratorHome from "./components/Meal Plan Generator/MealPlangeneratorHome";
import MealPlanGeneratorQuestion from "./components/Meal Plan Generator/MealPlanGeneratorQuestion";
import MealPlanGeneratorConsent from "./components/Meal Plan Generator/MealPlanGeneratorConsent";
import MealPlanHistory from "./components/Meal Plan Generator/MealPlanHistory";
import MealPlanGeneratorGeneratedMeal from "./components/Meal Plan Generator/MealPlanGeneratorGeneratedMeal";
import MealPlanGeneratorHistory from "./components/Meal Plan Generator/MealPlanGeneratorHistory";
import MealPlanSelection from "./components/Meal Plan Generator/MealPlanSelection";
import MealPlanShopHome from "./components/Meal Plan Shop/MealPlanShopHome";
import Paypal from "./components/Meal Plan Shop/Paypal";
import PayPalRequest from "./components/Meal Plan Shop/PayPalRequest";
import MealPlanShopRequest from "./components/Meal Plan Shop/MealPlanShopRequest";
import MealPlanShopRequestCheckout from "./components/Meal Plan Shop/MealPlanShopRequestCheckout";
import MealPlanShopMealPlans from "./components/Meal Plan Shop/MealPlanShopMealPlans";
import MealPlanShopMealPlanHistory from "./components/Meal Plan Shop/MealPlanShopMealPlanHistory";
import MealPlanShopTrackOrders from "./components/Meal Plan Shop/MealPlanShopTrackOrders";
import MealPlanShopCheckout from "./components/Meal Plan Shop/MealPlanShopCheckout";
import MealPlanShopCart from "./components/Meal Plan Shop/MealPlanShopCart";
import MealPlanShopCustomizeMeal from "./components/Meal Plan Shop/MealPlanShopCustomizeMeal";
import MealPlanShopOrders from "./components/Meal Plan Shop/MealPlanShopOrders";
import MealPlanShopRecommendRequestCheckout from "./components/Meal Plan Shop/MealPlanShopRecommendRequestCheckout";
import PayPalRecommend from "./components/Meal Plan Shop/PayPalRecommend";
import TelemedicineHome from "./components/Telemedicine/TelemedicineHome";
import TelemedicineMeetUs from "./components/Telemedicine/TelemedicineMeetUs";
import TelemedicineMessages from "./components/Telemedicine/TelemedicineMessages";
import TelemedicineConsultation from "./components/Telemedicine/TelemedicineConsultation";
import TelemedicinePaypalPayment from "./components/Telemedicine/TelemedicinePaypalPayment";
import TelemedicineMealPlans from "./components/Telemedicine/TelemedicineMealPlans";
import NutritionistConsultation from "./components/Nutritionist/NutritionistConsultation";
import NutritionistAppointment from "./components/Nutritionist/NutritionistAppointment"; 
import NutritionistApproveMealPlan from "./components/Nutritionist/NutritionistApproveMealPlan"; 
import NutritionistHome from "./components/Nutritionist/NutritionistHome";
import NutritionistCreateMealPlan from "./components/Nutritionist/NutritionistCreateMealPlan";
import NutritionistPatient from "./components/Nutritionist/NutritionistPatient";
import NutritionistPatientRecords from "./components/Nutritionist/NutritionistPatientRecords";
import NutritionistProgress from "./components/Nutritionist/NutritionistProgress";
import NutritionistMealPlanHistory from "./components/Nutritionist/NutritionistMealPlanHistory";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainUserNavBar from "./components/NavBars/MainUserNavbar";
import TeleMedNavBar from "./components/NavBars/TeleMedNavBar";
import FoodJournalNavBar from "./components/NavBars/FoodJournalNavBar";
import MealPlanShopNavBar from "./components/NavBars/MealPlanShopNavBar";
import MealPlanGeneratorNavBar from "./components/NavBars/MealPlanGeneratorNavBar";
import NutritionistNavBar from "./components/NavBars/NutritionistNavBar";
import UserProfile from "./components/Profiles/UserProfile";
import NutritionistProfile from "./components/Profiles/NutritionistProfile";
import LogIn from "./components/LogIn";
import Profiling from "./components/Profiling";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordNew from "./components/ForgetPasswordNew";
import ForgetPasswordOTP from "./components/ForgetPasswordOTP";
import Registration from "./components/Registration";
import RegistrationNutritionist from "./components/RegistrationNutritionist";
import OTP from "./components/OTP";
import UserFooter from "./components/UserFooter";
import UserFooterNotLogIn from "./components/UserFooterNotLogIn";
import Footer from "./components/Footer";
import MealPlanTest from "./components/Meal Plan Generator/MealPlanTest";
import HomePage from "./components/Admin/HomePage";
import Customization from "./components/Admin/Customization";
import Verification from "./components/Admin/Verification";
import Patients from "./components/Admin/Patients";
import Dietician from "./components/Admin/Dietician";
import AdminNavbBar from "./components/NavBars/AdminNavBar";
import SellerNavBar from "./components/NavBars/SellerNavBar";
import SellerHome from "./components/Seller/SellerHome";
import SellerMealPlansList from "./components/Seller/SellerMealPlansList";
import SellerOrders from "./components/Seller/SellerOrders";
import SellerRequestOrders from "./components/Seller/SellerRequestOrders";
import SellerCreateMealPlan from "./components/Seller/SellerCreateMealPlan";
import SellerMenuItems from "./components/Seller/SellerMenuItems";
import { LoggedInUserProvider } from "./components/LoggedInUserContext";
import { ImageProvider } from "./components/ImageContext";
import { ColorProvider } from "./components/ColorContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <LoggedInUserProvider>
      <ImageProvider>
        <ColorProvider>
          <ToastContainer />
          <div>
            {/* <MainUserNavBar /> */}
            {/* User Not Log In */}

            <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
              <Routes>
                <Route path="/Log-In" element={<LogIn />} />
                <Route path="/Register" element={<Registration />} />
                <Route
                  path="/RegisterNutritionist"
                  element={<RegistrationNutritionist />}
                />
                <Route path="/Profiling" element={<Profiling />} />
                <Route path="/OTP" element={<OTP />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route
                  path="/ForgetPasswordOTP"
                  element={<ForgetPasswordOTP />}
                />
                <Route
                  path="/ForgetPasswordNew"
                  element={<ForgetPasswordNew />}
                />
                <Route
                  path="/"
                  element={
                    <>
                      {/* <MainUserNavBar /> */}
                      <UserNotLogInNavBar />
                      <Home />

                      <Footer />
                    </>
                  }
                />{" "}
                <Route
                  path="/contact-us"
                  element={
                    <>
                      {/* <MainUserNavBar /> */}
                      <UserNotLogInNavBar />
                      <ContactUs />

                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <>
                      <UserNotLogInNavBar />
                      <AboutUs />
                      <Footer />
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
                <Route
                  path="/telemedicine-payment"
                  element={
                    <>
                      <TelemedicinePaypalPayment />
                    </>
                  }
                />
                <Route
                  path="/telemedicine-meal-plans"
                  element={
                    <>
                      <MainUserNavBar />
                      <TeleMedNavBar />
                      <TelemedicineMealPlans />
                      <UserFooter />
                    </>
                  }
                />
                {/* meal plan shop    */}
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
                  path="/meal-plan-shop-request"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanShopNavBar />
                      <MealPlanShopRequest /> <UserFooter />
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
              //    path="/meal-plan-shop-checkout/:cartId?"
                  path="/meal-plan-shop-checkout"

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
                  path="/meal-plan-shop-request-checkout"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanShopNavBar />
                      <MealPlanShopRequestCheckout /> <UserFooter />
                    </>
                  }
                />
                   <Route
                  path="/meal-plan-shop-recommend-request-checkout"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanShopNavBar />
                      <MealPlanShopRecommendRequestCheckout /> <UserFooter />
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
               
                <Route
                  path="/paypal-payment"
                  element={
                    <>
                      <Paypal />
                    </>
                  }
                />
                <Route
                  path="/paypal-payment-request"
                  element={
                    <>
                      <PayPalRequest />
                    </>
                  }
                />
                    <Route
                  path="/paypal-payment-recommend-request"
                  element={
                    <>
                      <PayPalRecommend />
                    </>
                  }
                />
                 {/* meal plan generator  Paypal MealPlanHistory  */}
                <Route
                  path="/meal-plan-generator-home"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlangeneratorHome />
                      <UserFooter />
                    </>
                  }
                />
                <Route
                  path="/meal-plan-generator-history"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlanHistory />
                      <UserFooter />
                    </>
                  }
                />
                <Route
                  path="/meal-plan-generator-consent"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlanGeneratorConsent />
                      <UserFooter />
                    </>
                  }
                />
                <Route
                  path="/meal-plan-generator-questions"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlanGeneratorQuestion />
                      <UserFooter />
                    </>
                  }
                />
                <Route
                  path="/meal-plan-generator-generated"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlanGeneratorGeneratedMeal />
                      <UserFooter />
                    </>
                  }
                />
                <Route
                  path="/test"
                  element={
                    <>
                      <MainUserNavBar />
                      <MealPlanGeneratorNavBar />
                      <MealPlanTest />
                      <UserFooter />
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
                  path="/nutritionist-patient-records"
                  element={
                    <>
                      <NutritionistNavBar />
                      <NutritionistPatientRecords />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/nutritionist-patient-reports"
                  element={
                    <>
                      <NutritionistNavBar />
                      <NutritionistProgress />
                      <Footer />
                    </>
                  }
                /> 

<Route
                  path="/nutritionist-patient-create-meal-plan"
                  element={
                    <>
                      <NutritionistNavBar />
                      <NutritionistCreateMealPlan />
                      <Footer />
                    </>
                  }
                />
<Route
                  path="/nutritionist-approve-meal-plan"
                  element={
                    <>
                      <NutritionistNavBar />
                      <NutritionistApproveMealPlan />
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
                <Route
                  path="/admin-customization"
                  element={
                    <>
                      <AdminNavbBar />
                      <Customization />
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
                      <SellerMealPlansList />
                      <Footer />
                    </>
                  }
                />
                
                <Route
                  path="/seller-orders"
                  element={
                    <>
                      <SellerNavBar />
                      <SellerOrders />
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
                <Route
                  path="/seller-request-meals"
                  element={
                    <>
                      <SellerNavBar />
                      <SellerRequestOrders />
                      <Footer />
                    </>
                  }
                />
                {/*  */}
              </Routes>
            </BrowserRouter>
          </div>
        </ColorProvider>
      </ImageProvider>
    </LoggedInUserProvider>
  );
}

export default App;
