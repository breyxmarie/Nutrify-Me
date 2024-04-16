import MealPlanShopNavBar from "./MealPlanShopNavBar";
import { useState, useRef } from "react";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainUserNavbar.css";

import ReactDOM from "react-dom";

function MealPlanShopCustomizeMeal() {
  // const breakPoints = [   // *notes for breakpoints for references
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2 },
  //   { width: 768, itemsToShow: 2 },
  //   { width: 1200, itemsToShow: 2 },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const sliderRef = useRef(null); //*kapag magaadd ng customize meal
  const sliderRefC = useRef(null);
  const sliderRefL = useRef(null);

  const protein = [
    // * data for customize food
    { name: " lorem1", image: "/images/logoCircle.png" },
    { name: " lorem2", image: "/images/logoCircle.png" },
  ];

  const carbohydrate = [
    { name: " protein1", image: "/images/logoCircle.png" },
    { name: " lorem2", image: "/images/logoCircle.png" },
  ];

  const settings = {
    dots: true, // Enable pagination dots
    infinite: true, // Enable infinite looping
    slidesToShow: 2, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
  };

  const handleNextC = () => {
    //* add sa carousel to handle prev and next buttons
    sliderRefC.current.slickNext(); // Trigger next slide transition
  };

  const handlePrevC = () => {
    sliderRefC.current.slickPrev(); // Trigger previous slide transition
  };

  const handleNext = () => {
    sliderRef.current.slickNext(); // Trigger next slide transition
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev(); // Trigger previous slide transition
  };

  const handleNextL = () => {
    sliderRefL.current.slickNext(); // Trigger next slide transition
  };

  const handlePrevL = () => {
    sliderRefL.current.slickPrev(); // Trigger previous slide transition
  };

  const handleSlideClick = (item) => {
    // Handle click event for each slide item
    // Replace this with your desired logic (e.g., navigate, open modal)
    console.log("Clicked item:", item);
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

      <Typography
        sx={{ color: "#99756E", fontSize: "50px", fontWeight: "bold", m: 5 }}
      >
        CUSTOMIZE MEAL PLAN: [NAME]
      </Typography>

      <div className="App">
        <Typography
          sx={{
            textAlign: "left",
            color: "#99756E",
            fontSize: "30px",
            fontWeight: "bold",
            ml: 10,
          }}
        >
          Protein
        </Typography>
        <Grid container spacing={2}>
          {" "}
          {/* Container with spacing */}
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handlePrev} style={{ marginTop: "80%" }}>
              <img src="/images/left arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
          <Grid item xs={10}>
            {" "}
            {/* Carousel container */}
            <Slider {...settings} ref={sliderRef}>
              {protein.map((item, index) => (
                <div key={index} onClick={() => handleSlideClick(item)}>
                  <center>
                    <img src={item.image} width="40%" height="40%" />
                  </center>
                  {item.name}
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handleNext} style={{ marginTop: "70%" }}>
              <img src="/images/right arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
      <br />
      <div className="App">
        <Typography
          sx={{
            textAlign: "left",
            color: "#99756E",
            fontSize: "30px",
            fontWeight: "bold",
            ml: 10,
          }}
        >
          Carbohydrates
        </Typography>
        <Grid container spacing={2}>
          {" "}
          {/* Container with spacing */}
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handlePrevC} style={{ marginTop: "80%" }}>
              <img src="/images/left arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
          <Grid item xs={10}>
            {" "}
            {/* Carousel container */}
            <Slider {...settings} ref={sliderRefC}>
              {carbohydrate.map((item, index) => (
                <div key={index} onClick={() => handleSlideClick(item)}>
                  <center>
                    <img src={item.image} width="40%" height="40%" />
                  </center>
                  {item.name}
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handleNextC} style={{ marginTop: "70%" }}>
              <img src="/images/right arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
        </Grid>
      </div>

      <br />
      <br />
      <br />
      <div className="App">
        <Typography
          sx={{
            textAlign: "left",
            color: "#99756E",
            fontSize: "30px",
            fontWeight: "bold",
            ml: 10,
          }}
        >
          Liquids
        </Typography>
        <Grid container spacing={2}>
          {" "}
          {/* Container with spacing */}
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handlePrevL} style={{ marginTop: "80%" }}>
              <img src="/images/left arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
          <Grid item xs={10}>
            {" "}
            {/* Carousel container */}
            <Slider {...settings} ref={sliderRefL}>
              {carbohydrate.map((item, index) => (
                <div key={index} onClick={() => handleSlideClick(item)}>
                  <center>
                    <img src={item.image} width="40%" height="40%" />
                  </center>
                  {item.name}
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={1}>
            {" "}
            {/* Button container (adjust width as needed) */}
            <button onClick={handleNextL} style={{ marginTop: "70%" }}>
              <img src="/images/right arrow.png" width="30px" height="30px" />
            </button>
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
      <br />
      <Button
        sx={{
          background: "#E66253",
          color: "#ffffff",
          px: 4,
          py: 2,
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#E66253",
            border: 1,
          }, // * to change the hover button
        }}
      >
        {" "}
        Customize
      </Button>
    </div>
  );
}

export default MealPlanShopCustomizeMeal;
