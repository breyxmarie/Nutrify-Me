import MealPlanShopNavBar from "../NavBars/MealPlanShopNavBar";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosInstance from "../forms/AxiosInstance";
import "pure-react-carousel/dist/react-carousel.es.css";
import dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MealPlanShopHome() {
  //! get meal data
  const [shopMealPlan, setShopMealPlan] = useState(null);

  const getMealPlanData = () => {
    AxiosInstance.get(`shopmealplan`).then((res) => {
      console.log(res);
      setShopMealPlan(
        res.data.filter(
          (item) =>
            item.start_week == dayjs().startOf("week").format("YYYY-MM-DD")
        )
      );
    });
  };

  useEffect(() => {
    getMealPlanData();
  }, []);

  //!
  const handleNextC = () => {
    //* add sa carousel to handle prev and next buttons
    sliderRefC.current.slickNext(); // Trigger next slide transition
  };

  const handlePrevC = () => {
    sliderRefC.current.slickPrev(); // Trigger previous slide transition
  };
  const sliderRefC = useRef(null);
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };
  const mealPlan = [
    {
      name: "High Protein",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
    },
  ];

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

  const testimonial = [
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
    {
      image: "/images/logo.png",
      star: 3,
      comment: "lorem ipsum random words comments",
    },
  ];
  const [buttonText, setButtonText] = useState("/images/triangle.png");

  const [isShown, setIsShown] = useState(Array(faqs.length).fill(false)); // State array for each FAQ

  const handleClick = (index) => {
    const updatedIsShown = [...isShown];
    updatedIsShown[index] = !updatedIsShown[index];
    setIsShown(updatedIsShown);
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
      {/* <Box
        sx={{
          backgroundImage: "url('/images/shop.png')",
          mt: 2,
          borderRadius: 3,
          ml: "4%",
          mr: "4%",
          width: "92.5%",
          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "500px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box> */}

      <Box>
        <Typography
          sx={{
            color: "#99756E",
            fontSize: {
              xs: "1em", // For extra small screens
              sm: "1.5em", // For small screens
              md: "2.0em", // For medium screens
              lg: "2.5em", // For large screens
            },
            fontWeight: "bold",
            mt: 2,
            mb: 0,
          }}
        >
          MEAL PLANS
        </Typography>
        <Grid container spacing={2} sx={{ mb: 8 }}>
          {console.log(shopMealPlan)}
          {shopMealPlan === null ? (
            <>
              <Typography>No Meal Plans Available</Typography>
            </>
          ) : (
            <>
              <Grid container={2} sx={{ mx: "5%" }}>
                {shopMealPlan.slice(0, 2).map((plan, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    key={index}
                    sx={{ mt: 5, mb: 5 }}
                  >
                    <img src={plan.image} width="20%" height="50%" />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#99756E",
                        fontSize: {
                          xs: "1em", // For extra small screens
                          sm: "1.0em", // For small screens
                          md: "1.0em", // For medium screens
                          lg: "1.5em", // For large screens
                        },
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography
                      sx={{
                        mx: "20%",
                        fontSize: {
                          xs: "0.8em", // For extra small screens
                          sm: "1.0em", // For small screens
                          md: "1.0em", // For medium screens
                          lg: "1.0em", // For large screens
                        },
                      }}
                    >
                      {plan.description}
                    </Typography>
                    <Link
                      to="/meal-plan-shop-meal-plans"
                      style={{
                        color: "#ffffff",
                        textDecoration: "underline",
                        fontSize: "20px",
                      }}
                    >
                      <Button
                        sx={{
                          borderRadius: 4,
                          background: "#D9D9D9",
                          color: "#000000",
                          px: 4,
                          py: 1,
                          fontSize: {
                            xs: "0.5em", // For extra small screens
                            sm: "0.5em", // For small screens
                            md: "0.8em", // For medium screens
                            lg: "0.8em", // For large screens
                          },
                        }}
                      >
                        ORDER NOW
                      </Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
        <Link
          to="/meal-plan-shop-meal-plans"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
            fontSize: "20px",
          }}
        >
          <Button
            sx={{
              background: "#E66253",
              color: "#ffffff",
              ml: 0,
              height: "100%",
              px: 4,
              py: 1,
              fontSize: "15px",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#E66253",
                border: 1,
              },
            }}
          >
            VIEW MORE
          </Button>
        </Link>
      </Box>
      <br />
      <Box
        sx={{
          backgroundImage: "url('/images/shop home customize.png')",
          width: "100%",

          height: {
            xs: "100px", // For extra small screens
            sm: "200px", // For small screens
            md: "500px", // For medium screens
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "5",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ alignContent: "right", ml: "30%" }}>
          <Typography
            sx={{
              color: "#898246",

              textAlign: "right",
              fontSize: {
                xs: "0.5em", // For extra small screens
                sm: "1.0em", // For small screens
                md: "2.5em", // For medium screens
                lg: "3.0em", // For large screens
                xl: "3.5em", // For extra large screens
              },
              fontWeight: "bold",
            }}
          >
            WANT TO GENERATE A <br />
            MEAL PLAN FOR <br />
            YOUR DIETARY NEEDS?
          </Typography>
          <Link to={"/meal-plan-generator-consent"}>
            <Button
              sx={{
                background: "#E66253",
                color: "#ffffff",
                px: "10%",
                py: 1,
                mt: "10px",
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
                ml: "40%",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 1,
                },
              }}
            >
              GENERATE
            </Button>
          </Link>
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{ color: "#99756E", fontSize: "35px", fontWeight: "bold" }}
        >
          Patient’s Testimonials
        </Typography>
        <Box sx={{ ml: 5, mr: 5 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={0}
              sm={0.5}
              md={0.5}
              lg={0.5}
              sx={{
                display: {
                  xs: "none", // Hide on extra small screens
                  sm: "block",
                  md: "block", // Display on small screens and up
                },
              }}
            >
              <Button
                onClick={handlePrevC}
                style={{ marginTop: "100%", backgroundColor: "#ffffff" }}
              >
                <img src="/images/left arrow.png" width="70%" height="70%" />
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Slider
                {...settings}
                ref={sliderRefC}
                sx={{
                  color: "#000000",
                  border: 1,
                  borderColor: "#000000",
                  ml: "30px",
                  mr: "30px",
                }}
              >
                {testimonial.map((item, index) => (
                  <Box key={index} onClick={() => handleSlideClick(item)}>
                    <Box
                      sx={{
                        color: "#000000",
                        border: 3,
                        borderColor: "#898246",
                        borderRadius: 3,
                        ml: "10%",
                        mr: "10%",
                      }}
                    >
                      <Grid>
                        <img
                          src={item.image}
                          width="10%"
                          height="10%"
                          style={{ marginLeft: 10 }}
                        />
                      </Grid>

                      <Grid>
                        <img
                          src="/images/star.png"
                          width="10"
                          height="10"
                          style={{ marginLeft: 10 }}
                        />
                        <Typography sx={{ color: "#000000" }}>
                          {item.comment}
                        </Typography>
                      </Grid>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Grid>
            <Grid
              item
              xs={0}
              sm={0.5}
              md={0.5}
              lg={0.5}
              sx={{
                display: {
                  xs: "none", // Hide on extra small screens
                  sm: "block",
                  md: "block", // Display on small screens and up
                },
              }}
            >
              {" "}
              {/* Button container (adjust width as needed) */}
              <Button
                onClick={handleNextC}
                sx={{ marginTop: "60%", background: "#ffffff" }}
              >
                <img src="/images/right arrow.png" width="70%" height="70%" />
              </Button>
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: "#99756E",
              display: {
                xs: "block", // Hide on extra small screens
                sm: "none",
              },
              fontWeight: "bold",
              mt: 4,
            }}
          >
            Swipe to See More
          </Typography>
        </Box>

        <Box
          sx={{
            background: "#898246",
            color: "#ffffff",
            py: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "0.5em", // For extra small screens
                sm: "0.8em", // For small screens
                md: "1.0em", // For medium screens
                lg: "1.5em", // For large screens
                xl: "2.0em", // For extra large screens
              },
            }}
          >
            Need to consult with a dietician about the meals <br />
            you should eat?
          </Typography>
          <Link
            to="/telemedicine-home"
            style={{
              color: "#ffffff",
              textDecoration: "underline",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.5em", // For extra small screens
                  sm: "0.8em", // For small screens
                  md: "1.0em", // For medium screens
                  lg: "1.5em", // For large screens
                  xl: "2.0em", // For extra large screens
                },
              }}
            >
              CLICK HERE
            </Typography>
          </Link>
        </Box>
      </Box>

      <Box sx={{ color: "#99756E" }}>
        <Typography>FAQ</Typography>
        <Typography>How It Works</Typography>

        <br />
        {faqs.map((f, index) => (
          <div key={index} style={{ marginLeft: "10%", marginRight: "10%" }}>
            <hr style={{ marginLeft: "0%", marginRight: "0%" }} />
            <br />
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography
                  sx={{
                    textDecoration: "bold",
                    fontWeight: "bold",
                    fontSize: {
                      xs: "1em", // For extra small screens
                      sm: "1.5em", // For small screens
                      md: "1.5em", // For medium screens
                      lg: "2em", // For large screens
                      xl: "2.0em", // For extra large screens
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
              <Box sx={{ ml: "5%" }}>
                <Typography
                  sx={{
                    marginLeft: "10%",
                    marginRight: "15%",
                    textAlign: "left",
                    fontSize: {
                      xs: "1em", // For extra small screens
                      sm: "1.0em", // For small screens
                      md: "1.3em", // For medium screens
                      lg: "1.3em", // For large screens
                    },
                  }}
                >
                  {f.answer}
                </Typography>
              </Box>
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

export default MealPlanShopHome;
