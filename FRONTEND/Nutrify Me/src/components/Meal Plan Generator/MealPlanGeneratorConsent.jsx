import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";


function MealPlanGeneratorConsent() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  //! profiling details
  const [profDetails, setProfDetails] = useState();
  const getData = () => {
    AxiosInstance.get(`profiling`).then((res) => {
      setProfDetails(res.data.find((item) => item.user_id === loggedInUser.user_id))
     });
  }
  useEffect(() => {
    getData()
  }, [])
  //!


  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const proceed = () => {
    if (isChecked) {
      navigate("/test",  {state : {profDetails}});
    } else {
      toast("Agree to Terms and Conditions");
    }
  };
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "5%",
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
        <Typography
          sx={{
            color: "#000000",
            fontSize: {
              xs: "0.5em", // For extra small screens
              sm: "0.8em", // For small screens
              md: "1m", // For medium screens
              lg: "1.0em", // For large screens
            },
            ml: "10%",
            mr: "10%",
          }}
        >
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
        </Typography>
        <br />
        <Box sx={{ mr: "20%", ml: "0%", mt: "2%" }}>
          <Grid container spacing={2}>
            <Grid
              xs={6}
              sx={{
                display: "flex",
                alignItems: "right",
                justifyContent: "right",
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                style={{ color: "#000000" }}
              />
            </Grid>
            <Grid
              xs={6}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: {
                    xs: "0.5em", // For extra small screens
                    sm: "0.8em", // For small screens
                    md: "1m", // For medium screens
                    lg: "1.0em", // For large screens
                  },
                }}
              >
                I agree with terms and conditions.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Button
          variant="contained"
          onClick={proceed}
          sx={{
            mx: "auto",
            display: "block",
            //  float: "right",
            mt: 2,
            mb: 3,
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
