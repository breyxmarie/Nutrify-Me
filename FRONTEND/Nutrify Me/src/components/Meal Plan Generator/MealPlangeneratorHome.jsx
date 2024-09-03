import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function MealPlangeneratorHome() {
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

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
          ml: "6%",
          mr: "6%",
          width: "90%",
          borderRadius: 3,
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "450px", // For medium screens
          },

          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      />
      <Typography
        sx={{
          mt: 3,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: {
            xs: "0.8em", // For extra small screens
            sm: "1.0em", // For small screens
            md: "1.5em", // For medium screens
            lg: "2.0em", // For large screens
          },
        }}
      >
        MY PAST GENERATED MEAL PLANS
      </Typography>
      <br />
      {mealData.slice(8, 10).map(
        (item) => (
          //  item.meal.map((items) => (
          <Box>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                md={6}
                lg={7}
                sx={{
                  //display: "flex",
                  alignItems: "right",
                  justifyContent: "center",
                }}
              >
                {" "}
                {/* <Grid container spacing={0} sx={{ mx: 0 }}>
                  <Grid
                    xs={6}
                    md={12}
                    sx={
                      {
                        //  display: "flex",
                        // alignItems: "right",
                        // justifyContent: "center",
                      }
                    }
                  > */}
                <img
                  src={
                    item.meal[getRandomInRange(0, 4)].meals[
                      getRandomInRange(0, 3)
                    ].image
                  }
                  width="20%"
                  height="25%"
                />{" "}
                <img
                  src={
                    item.meal[getRandomInRange(0, 4)].meals[
                      getRandomInRange(0, 3)
                    ].image
                  }
                  width="20%"
                  height="25%"
                />
                <br />
                <img
                  src={
                    item.meal[getRandomInRange(0, 4)].meals[
                      getRandomInRange(0, 3)
                    ].image
                  }
                  width="20%"
                  height="25%"
                />
                <img
                  src={
                    item.meal[getRandomInRange(0, 4)].meals[
                      getRandomInRange(0, 3)
                    ].image
                  }
                  width="20%"
                  height="25%"
                />
                {/* </Grid>
                </Grid> */}
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={1}
                sx={
                  {
                    // display: "flex",
                    // alignItems: "left",
                    // justifyContent: "left",
                  }
                }
              >
                {" "}
                <Typography sx={{ color: "#000000" }}>
                  {item.name}
                </Typography>{" "}
                <Typography sx={{ color: "#000000" }}>{item.date}</Typography>
                {/* <Button>Request To Order</Button> */}
              </Grid>
            </Grid>
          </Box>
        )
        //  ))
      )}
      <Button
        variant="contained"
        sx={{
          mx: "auto",
          //  display: "block",
          // float: "center",

          background: "#E66253",
          fontSize: "10px",
          "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
        }}
      >
        VIEW MORE
      </Button>
      <br />
      <br />
      <Box
        component="section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/images/home gen.png')",
          width: "100%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "400px", // For medium screens
          },

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
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "1.0em", // For small screens
                  md: "2.0em", // For medium screens
                  lg: "2.5em", // For large screens
                },
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
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
                "&:hover": { backgroundColor: "#ffffff", color: "#E66253" },
              }}
            >
              GENERATE NEW
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ color: "#99756E" }}>
        <Typography
          sx={{
            fontSize: {
              xs: "1.5em", // For extra small screens
              sm: "2.0em", // For small screens
              md: "2.5em", // For medium screens
              lg: "3.0em", // For large screens
              xl: "3.5em", // For extra large screens
            },
          }}
        >
          FAQ
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "1.0em", // For extra small screens
              sm: "1.5em", // For small screens
              md: "2.0em", // For medium screens
              lg: "2.5em", // For large screens
              xl: "3.0em", // For extra large screens
            },
          }}
        >
          How It Works
        </Typography>

        <br />
        {faqs.map((f, index) => (
          <div key={index} style={{ marginLeft: "10%", marginRight: "10%" }}>
            <hr style={{ marginLeft: "0%", marginRight: "0%" }} />
            <br />
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fotnWeight: "bold",
                    fontSize: {
                      xs: "1.0em", // For extra small screens
                      sm: "1.5em", // For small screens
                      md: "2.0em", // For medium screens
                      lg: "2.5em", // For large screens
                      xl: "3.0em", // For extra large screens
                    },
                  }}
                >
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
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.5em", // For extra small screens
                      sm: "1.0em", // For small screens
                      md: "1.2em", // For medium screens

                      marginLeft: "18%",
                      marginRight: "25%",
                      textAlign: "left",
                    },
                  }}
                >
                  {f.answer}
                </Typography>
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

export default MealPlangeneratorHome;
