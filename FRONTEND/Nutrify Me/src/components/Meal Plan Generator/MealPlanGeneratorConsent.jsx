import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MealPlanGeneratorConsent() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const proceed = () => {
    if (isChecked) {
      navigate("/test");
    } else {
      toast("Agree to Terms and Conditions");
    }
  };
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      {" "}
      <Box
        sx={{
          border: 1,
          borderColor: "#898246",
          borderRadius: 3,
          mx: "10%",
        }}
      >
        <Typography
          sx={{
            color: " #E66253",
            fontWeight: "bold",
            fontSize: "25px",
            mt: "1%",
          }}
        >
          CONSENT
        </Typography>
        <p style={{ color: "#000000" }}>
          The purpose of this consent form is to inform you about the meal plan
          generator and to obtain your consent to use the provided information
          to create personalized meal plans. The meal plan generator aims to
          provide users with customized meal plans based on their dietary
          preferences, health goals, and nutritional needs. To create an
          effective and personalized meal plan, the meal plan generator will
          collect the following information: Personal information (e.g., name,
          age, gender), Dietary preferences and restrictions (e.g., vegetarian,
          vegan, gluten-free), Health goals (e.g., weight loss, muscle gain,
          maintenance), Nutritional requirements (e.g., calorie intake,
          macronutrient ratios), Medical conditions or allergies (if any),
          Lifestyle and activity level, Usage of Information. The information
          collected will be used solely for the purpose of generating a
          personalized meal plan. Your data will be stored securely and will not
          be shared with any third parties without your explicit consent. The
          website will not be liable for any errors. <br />
          <br />
          There are no significant risks associated with using the meal plan
          generator. The benefits include receiving a customized meal plan that
          aligns with your dietary preferences and health goals, which can
          contribute to improved nutrition and overall well-being. Your privacy
          is important to us. All information provided will be kept confidential
          and will be used only for the purposes stated in this consent form.
          Access to your data will be restricted to authorized personnel only.
          By signing below, you acknowledge that you have read and understood
          the information provided in this consent form. You voluntarily agree
          to participate in the meal plan generator and consent to the
          collection and use of your information as described.
        </p>
        <br />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          style={{ color: "#000000" }}
        />
        I agree with terms and conditions.
        <br />
        <br />
        <Button
          variant="contained"
          onClick={proceed}
          sx={{
            mx: "auto",
            display: "block",
            //  float: "right",
            background: "#E66253",
            fontSize: "12px",
            "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
          }}
        >
          PROCEED
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default MealPlanGeneratorConsent;
