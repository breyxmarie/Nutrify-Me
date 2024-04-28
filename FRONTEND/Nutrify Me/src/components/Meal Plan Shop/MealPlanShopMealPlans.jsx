import { useState } from "react";

import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";

function MealPlanShopMealPlans() {
  const mealPlan = [
    {
      name: "High Protein",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "Vegetarian",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
    {
      name: "Vegetarian",
      description: "lorem ipsum",
      image: "/images/plan food.png",
      price: 50,
      quantity: 1,
      subtotal: 6,

      product: "High Protein",
    },
  ];
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

      <Box>
        <Typography
          sx={{ color: "#99756E", fontWeight: "bold", fontSize: "50px", p: 5 }}
        >
          MEAL PLANS OFFERED
        </Typography>

        <Grid container spacing={2}>
          {mealPlan.map((plan, index) => (
            <Grid item xs={3} sm={4} md={6} key={index}>
              <img src={plan.image} width="350px" height="350px" />
              <Typography variant="body1">{plan.name}</Typography>
              <Typography variant="body1">{plan.description}</Typography>

              <Link
                to={"/meal-plan-shop-cart"}
                state={{
                  // product: plan.product,
                  // price: plan.price,
                  // quantity: plan.quantity,
                  // subtotal: plan.subtotal,
                  // image: plan.image,

                  addCart: plan,
                }}
              >
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
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default MealPlanShopMealPlans;
