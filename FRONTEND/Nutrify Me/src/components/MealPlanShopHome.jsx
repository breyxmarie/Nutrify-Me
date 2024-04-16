import MealPlanShopNavBar from "./MealPlanShopNavBar";
import { useState } from "react";
import * as React from "react";
import MainUserNavbar from "./MainUserNavbar";
import TeleMedNavBar from "./TeleMedNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";

import "pure-react-carousel/dist/react-carousel.es.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MealPlanShopHome() {
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
  const [buttonText, setButtonText] = useState("/images/triangle.png");

  // const [isShown, setIsShown] = useState(false);

  // const handleClick = (event) => {
  //   // 👇️ toggle shown state
  //   setIsShown((current) => !current);
  //   setButtonText(
  //     buttonText === "/images/triangle.png"
  //       ? "/images/upside down.png"
  //       : "/images/triangle.png"
  //   );
  //   // 👇️ or simply set it to true
  //   // setIsShown(true);
  // };

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
      }}
    >
      {/* <MainUserNavbar /> */}
      {/* <MealPlanShopNavBar /> */}

      <Box
        sx={{
          backgroundImage: "url('/images/shop.png')",
          width: "100%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>

      <Box>
        <Typography>MEAL PLANS</Typography>
        <Grid container spacing={2}>
          {mealPlan.slice(0, 2).map((plan, index) => (
            <Grid item xs={3} sm={4} md={6} key={index}>
              <img src={plan.image} width="350px" height="350px" />
              <Typography variant="body1">{plan.name}</Typography>
              <Typography variant="body1">{plan.description}</Typography>
              <Button
                sx={{
                  borderRadius: 4,
                  background: "#D9D9D9",
                  color: "#000000",
                  px: 4,
                  py: 1,
                }}
              >
                ORDER NOW
              </Button>
            </Grid>
          ))}
        </Grid>
        <Button sx={{ background: "#E66253", color: "#ffffff", px: 5, py: 1 }}>
          VIEW MORE
        </Button>
      </Box>
      <br />
      <Box
        sx={{
          backgroundImage: "url('/images/shop home customize.png')",
          width: "100%",
          height: "500px",
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
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            WANT TO PERSONALIZE THE <br />
            MEAL PLAN FOR YOUR <br />
            DIETARY NEEDS?
          </Typography>
          <Button
            sx={{
              background: "#E66253",
              color: "#ffffff",
              px: 5,
              py: 1,
              mt: "10px",
              fontSize: 20,
              ml: "40%",
            }}
          >
            CUSTOMIZE
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography>Patient’s Testimonials</Typography>

        <Box sx={{ mx: "120px" }}>
          <Carousel>
            <div style={{ border: 1 }}>
              <img
                src="/images/telemedPic.png"
                width="10"
                height="120"
                style={{ m: "120px" }}
              />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="/images/telemedPic.png" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="/images/telemedPic.png" />
              <p className="legend">Legend 3</p>
            </div>
            <Box sx={{ mx: 35, border: 1, my: 10 }}>
              {" "}
              <img
                src="/images/telemedPic.png"
                width="20"
                height="70"
                style={{ margin: 55 }}
              />
            </Box>
          </Carousel>
        </Box>

        <Box sx={{ background: "#898246", color: "#ffffff", py: 4 }}>
          <Typography sx={{ fontSize: "40px" }}>
            Need to consult with a dietician about the meals <br />
            you should eat?
          </Typography>
          <Link
            to="/telemedicine-consultation"
            style={{
              color: "#ffffff",
              textDecoration: "underline",
              fontSize: "20px",
            }}
          >
            CLICK HERE
          </Link>
        </Box>
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
                {/* Your custom component for spacing/styling (optional) */}
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

export default MealPlanShopHome;
