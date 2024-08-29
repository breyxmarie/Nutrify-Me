import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function MealPlanGeneratorHistory() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  // ? get Data
  const [mealData, setMealData] = useState([]);

  const getMealData = () => {
    AxiosInstance.get(`generatedmeal`).then((res) => {
      setMealData(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );
      console.log(
        res.data.filter((items) => items.user_id == loggedInUser.user_id)
      );
    });
  };

  useEffect(() => {
    getMealData();
  }, []);
  //?

  //? faqs
  const faqs = [
    {
      question: "lorem ipsum eme",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant",
    },
    {
      question: "lorem ipsum eme",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant",
    },
  ];

  const [isShown, setIsShown] = useState(Array(faqs.length).fill(false)); // State array for each FAQ

  const handleClick = (index) => {
    const updatedIsShown = [...isShown];
    updatedIsShown[index] = !updatedIsShown[index];
    setIsShown(updatedIsShown);
  };
  //?

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundImage: "url('/images/meal plan gen.png')",
          width: "90%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
          ml: 10,
        }}
      />
      <Typography>MY PAST GENERATED MEAL PLANS</Typography>
      <br />
      <br />
      {mealData.slice(0).map(
        (item) => (
          //  item.meal.map((items) => (
          <>
            <Grid container spacing={2} sx={{ mx: "30%" }}>
              <Grid xs={2}>
                {" "}
                <Grid container spacing={2} sx={{ mx: 0 }}>
                  <Grid xs={6}>
                    {" "}
                    <img
                      src={item.meal[0].meals[0].image}
                      width="100"
                      height="100"
                    />{" "}
                    console.log(item.meal[0].meals[0].image)
                    <br />
                    <img
                      src={item.meal[0].meals[0].image}
                      width="100"
                      height="100"
                    />
                  </Grid>
                  <Grid xs={1}>
                    {" "}
                    <img
                      src={item.meal[0].meals[0].image}
                      width="100"
                      height="100"
                    />
                    <br />
                    <img
                      src={item.meal[0].meals[0].image}
                      width="100"
                      height="100"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={2}>
                {" "}
                <Typography>{item.name}</Typography>
                <Typography>{item.date}</Typography>
                <Button>Request To Order</Button>
              </Grid>
            </Grid>
          </>
        )
        //  ))
      )}
      <Button
        variant="contained"
        sx={{
          mx: "auto",
          display: "block",
          float: "center",

          background: "#E66253",
          fontSize: "10px",
          "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
        }}
      >
        VIEW MORE
      </Button>
      <Box
        component="section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/images/home gen.png')",
          width: "100%",
          height: "400px" /* Adjust height as per your requirement */,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={6}>
            <p></p>
          </Grid>
          <Grid xs={4} sx={{ ml: "40px" }}>
            <br />
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#898246",
                fontWeight: "bold",
                textAlign: "right",
                fontSize: "40px",
              }}
            >
              WANT TO GENERATE A NEW PERSONALIZED MEAL PLAN AGAIN?
            </Typography>

            <br />

            <Button
              variant="contained"
              sx={{
                mx: "auto",
                display: "block",
                float: "right",

                background: "#E66253",
                fontSize: "20px",
                "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
              }}
            >
              GENERATE NEW
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#99756E" }}>
        <Typography>FAQ</Typography>
        <Typography>How It Works</Typography>

        <br />
        {faqs.map((f, index) => (
          <div key={index}>
            <hr style={{ marginLeft: "10%", marginRight: "10%" }} />
            <br />
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography sx={{ textDecoration: "bold", fontSize: "30px" }}>
                  {f.question}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <button
                  onClick={() => handleClick(index)}
                  style={{
                    transform: isShown[index] ? "rotate(180deg)" : "none",
                  }}
                >
                  <img src="/images/triangle.png" />
                </button>
              </Grid>
            </Grid>
            {/* 👇️ show elements on click */}
            {isShown[index] && (
              <>
                <h3
                  style={{
                    marginLeft: "18%",
                    marginRight: "25%",
                    textAlign: "left",
                  }}
                >
                  {f.answer}
                </h3>
                <Box />{" "}
              </>
            )}
            {/* 👇️ show component on click */}
            {isShown ? <Box /> : null}
          </div>
        ))}
        <hr style={{ marginLeft: "10%", marginRight: "10%" }} />
      </Box>
    </div>
  );
}

export default MealPlanGeneratorHistory;
