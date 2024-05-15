import { Typography } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

function SellerMenuItems() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  const buttons = ["HIGH PROTEIN", "VEGETARIAN", "PALEO", "HIGH BLOOD"];

  const meal = [
    {
      diet: "Paleo",
      meal: [
        {
          day: "Monday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries1",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Tuesday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries2",
              calories: 3600,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Wednesday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries3",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Thursday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries4",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Friday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries5",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Saturday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries1",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },

        {
          day: "Sunday", // Optional: Add a day property for reference
          meals: {
            Breakfast: {
              food: "oatmeal with berries1",
              calories: 300,
              carbs: 40,
              fat: 5,
              protein: 10,
              description: "A healthy and energizing start",
              image: "/images/food.png",
            },
            Lunch: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Snack: {
              food: "chicken salad sandwich",
              calories: 450,
              carbs: 40,
              fat: 25,
              protein: 30,
              description: "A light and flavorful lunch",
              image: "/images/food.png",
            },
            Dinner: {
              food: "salmon with roasted vegetables",
              calories: 500,
              carbs: 40,
              fat: 30,
              protein: 40,
              description: "A protein-rich and balanced dinner",
              image: "/images/food.png",
            },
          },
        },
      ],
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };

  // * modal content
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //*

  const handleClick = (index) => {
    setActiveButtonIndex(index);
    setDivContent(<b>Bold new content! {index}</b>);
  };

  const mealValueDiv = (calorie, fats, carbs, protein) => {
    // setMealvalueContent(

    return (
      <Box
        sx={{
          border: 2.5,
          borderRadius: 3,
          borderColor: "#898246",
          textAlign: "left",
          px: 5,
          mr: 5,
          py: 2,
        }}
      >
        <Typography sx={{ my: 1 }}>
          <img src="/images/calories.png" />
          {calorie} calories
        </Typography>

        <Typography sx={{ my: 1 }}>
          <img src="/images/fat.png" />
          {fats} fat
        </Typography>

        <Typography sx={{ my: 1 }}>
          <img src="/images/carbs.png" />
          {carbs} carbs
        </Typography>

        <Typography sx={{ my: 1 }}>
          <img src="/images/protein.png" />
          {protein} protein
        </Typography>
      </Box>
    );
  };

  const [divContent, setDivContent] = useState("Initial content");
  const [mealplanContent, setMealplanContent] = useState("Meal Details");
  const [mealvalueContent, setMealvalueContent] = useState(
    mealValueDiv(0, 0, 0, 0)
  );
  //mealValueDiv(0, 0, 0, 0)

  const changeContent = () => {
    setDivContent(<b>Bold new content!</b>);
  };

  const mealContent = (item, index) => {
    //const [calories, setCalories] = useState(0);
    console.log(item?.meals.Breakfast);

    const { breakfast, lunch, snack, dinner } = item?.meals;
    //console.log("try", meals[0]), console.log("tries", meals)

    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    {
      Object.entries(item.meals).map(
        (meals) => (
          (totalCalories += meals[1].calories),
          (totalFat += meals[1].fat),
          (totalCarbs += meals[1].carbs),
          (totalProtein += meals[1].protein)
        )
      );
    }
    setMealplanContent(
      <Box>
        {Object.entries(item.meals).map((meals) => (
          <Box>
            <Typography sx={{ color: "#E66253", fontWeight: "bold" }}>
              {meals[0]}
            </Typography>

            <Typography sx={{ ml: 3 }}>{meals[1].food}</Typography>
          </Box>
        ))}
      </Box>
    );

    setMealvalueContent(
      mealValueDiv(totalCalories, totalFat, totalCarbs, totalProtein)
    );

    //item.map((items, index) => console.log(items));

    console.log("test", item?.meals);
  };
  const changeDiv = (index) => {
    setActiveButtonIndex(index);

    // const breakfastItems = meal[index].meals.breakfast;
    // const lunchItems = meal[index].meals.lunch;
    // const snackItems = meal[index].meals.snack;
    // const dinnerItems = meal[index].meals.dinner;

    // const { breakfast, lunch, snack, dinner } = meal[index].meals;

    console.log(meal[index].meal);
    setDivContent(
      <div>
        {meal[index].meal.map((item, index) => (
          <div>
            {console.log(item.meals)}
            <Typography>{item.day}</Typography>
            <Box>
              <Box sx={{ my: 3, mx: 3, border: 2, borderRadius: 5, px: 3 }}>
                <Grid container spacing={2} sx={{ my: 2 }}>
                  <Grid xs={2}>
                    <img src="" height="150px" />{" "}
                  </Grid>
                  <Grid xs={8} sx={{ mx: 4, mt: 5 }}>
                    <Typography
                      sx={{
                        color: "#99756E",
                        fontWeight: "bold",
                        fontSize: "25px",
                        float: "left",
                      }}
                    >
                      {item.day}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid xs={3}>
                        <img src="/images/calories.png" />
                        {item.day} calories |
                      </Grid>
                      <Grid xs={3}>
                        <img src="/images/fat.png" />
                        {item.day}g fat |
                      </Grid>
                      <Grid xs={3}>
                        <img src="/images/carbs.png" />
                        {item.day}g carbs |
                      </Grid>
                      <Grid xs={3}>
                        <img src="/images/protein.png" />
                        {item.day}g protein
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={1}>
                    <Button
                      sx={{
                        background: "#898246",
                        color: "#ffffff",
                        mt: 8,
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: "#898246",
                          border: 0.5,
                          borderColor: "#898246",
                        },
                      }}
                      onClick={() => mealContent(item, index)}
                    >
                      VIEW
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        ))}
      </div>
    );
    // setDivContent(
    //   <Box sx={{ mx: 7 }}>
    //     {Object.keys(meal[index].meals).map((mealName) => (
    //       <Box>
    //         {" "}
    //         <Typography
    //           sx={{
    //             color: "#E66253",
    //             fontWeight: "bold",
    //             fontSize: "200%",
    //             textAlign: "left",
    //             ml: 5,
    //             mt: 3,
    //           }}
    //         >
    //           {mealName}
    //         </Typography>
    //         <Box sx={{ my: 3, mx: 3, border: 2, borderRadius: 5, px: 3 }}>
    //           <Grid container spacing={2} sx={{ my: 2 }}>
    //             <Grid xs={2}>
    //               <img src={meal[index].meals[mealName].image} height="150px" />{" "}
    //             </Grid>
    //             <Grid xs={8} sx={{ mx: 4, mt: 5 }}>
    //               <Typography
    //                 sx={{
    //                   color: "#99756E",
    //                   fontWeight: "bold",
    //                   fontSize: "25px",
    //                   float: "left",
    //                 }}
    //               >
    //                 {meal[index].meals[mealName].food}
    //               </Typography>

    //               <Grid container spacing={2}>
    //                 <Grid xs={3}>
    //                   <img src="/images/calories.png" />
    //                   {meal[index].meals[mealName].calories} calories |
    //                 </Grid>
    //                 <Grid xs={3}>
    //                   <img src="/images/fat.png" />
    //                   {meal[index].meals[mealName].fat}g fat |
    //                 </Grid>
    //                 <Grid xs={3}>
    //                   <img src="/images/carbs.png" />
    //                   {meal[index].meals[mealName].carbs}g carbs |
    //                 </Grid>
    //                 <Grid xs={3}>
    //                   <img src="/images/protein.png" />
    //                   {meal[index].meals[mealName].protein}g protein
    //                 </Grid>
    //               </Grid>
    //             </Grid>
    //             <Grid xs={1}>
    //               <Button
    //                 sx={{
    //                   background: "#E66253",
    //                   color: "#ffffff",
    //                   mt: 8,
    //                   "&:hover": {
    //                     backgroundColor: "#ffffff",
    //                     color: "#E66253",
    //                     border: 0.5,
    //                     borderColor: "#E66253",
    //                   },
    //                 }}
    //                 onClick={handleOpen}
    //               >
    //                 ADD
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Box>
    //     ))}
    //   </Box>
    // );
  };

  // const changeDiv = (meal) => [
  //   {

  //     title: meal?.day,
  //     content: (
  //       <div>
  //         {meal.map((item, index) => (
  //           <Box>
  //             <Typography>{item?.meals}</Typography>
  //             <Box>
  //               <Grid container spacing={2}>
  //                 <Grid xs={2}>{item?.meals}.image</Grid>
  //                 <Grid xs={8}></Grid>
  //                 <Grid xs={2}></Grid>
  //               </Grid>
  //             </Box>
  //           </Box>
  //         ))}
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid xs={2}>
              {" "}
              <img src="/images/food journal icon.png" />
            </Grid>
            <Grid xs={8}>Add Food Information</Grid>
            <Grid xs={2}>
              <Button sx={{ float: "right" }} onClick={handleClose}>
                <img src="/images/close.png" height="10" weight="10" />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={6}>Type of Meal: </Grid>
            <Grid xs={6}>Stocks</Grid>
          </Grid>
          Upload Image:
          {/* // * upload image */}
          <br />
          <br />
          <Box sx={{ mx: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}> Calories</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={5}>
                [Calories]
                <img
                  src="/images/arrow.png"
                  width="40px"
                  style={{ marginLeft: "35px", marginTop: "25px" }}
                />
              </Grid>
              <Grid xs={4}>
                <br />
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                  placeholder="Type message here"
                />
              </Grid>
              <Grid xs={1}>
                <br />
                <Button
                  sx={{
                    background: "#ffffff",
                    color: "#E66253",
                    ml: 5,
                    mt: 1,
                    "&:hover": {
                      backgroundColor: "#E66253",
                      color: "#ffffff",
                      border: 0.5,
                      borderColor: "#ffffff",
                    },
                  }}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </Box>
          <center>
            <Button
              sx={{
                background: "#ffffff",
                color: "#E66253",
                fontWeight: "bold",
                borderRadius: 5,

                ml: 5,
                mt: 1,
                px: 10,
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 0.5,
                  borderColor: "#ffffff",
                },
              }}
            >
              DONE
            </Button>
          </center>
        </Box>
      </Modal>
      <Typography sx={{ my: 7, fontSize: "200%", fontWeight: "bold" }}>
        EDIT MEAL PLAN
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={8}>
          {buttons.map((buttonLabel, index) => (
            <Button
              key={index}
              variant="contained" // Adjust variant as needed
              onClick={() => changeDiv(index)}
              sx={{
                borderColor: "#ffffff",
                fontWeight: "bold",
                boxShadow: 0,
                mx: 5,
                fontSize: "20px",
                background: "#ffffff",
                color: activeButtonIndex === index ? "#E66253" : "#E3ACA5", // Adjust colors as desired
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 0.5,
                  borderColor: "#ffffff",
                },
              }}
            >
              {buttonLabel}
            </Button>
          ))}

          <div>{divContent}</div>
        </Grid>
        <Grid xs={4} sx={{ color: "#99756E" }}>
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "30px",
              my: 2,
            }}
          >
            {" "}
            Meal Plan: [Name]
          </Typography>

          <Box
            sx={{
              border: 2,
              borderRadius: 3,
              borderColor: "#898246",
              textAlign: "left",
              px: 5,
              mr: 5,
              py: 2,
            }}
          >
            {mealplanContent}
          </Box>

          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "30px",
              my: 2,
            }}
          >
            Meal Value
          </Typography>
          {mealvalueContent}

          <Button
            sx={{
              border: 2.5,
              background: "#ffffff",
              borderColor: "#E66253",
              color: "#E66253",
              borderRadius: 10,
              fontWeight: "bold",
              px: 13,
              fontSize: "20px",
              my: 1.5,
              "&:hover": {
                backgroundColor: "#E66253",
                color: "#ffffff",
                border: 0.5,
                borderColor: "#ffffff",
              },
            }}
          >
            EDIT
          </Button>
          <br />
          <Button
            sx={{
              border: 2.5,
              background: "#E66253",
              borderColor: "#E66253",
              color: "#ffffff",
              borderRadius: 10,
              fontWeight: "bold",
              px: 11.5,
              fontSize: "20px",
              my: 1.5,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#E66253",
                border: 0.5,
                borderColor: "#E66253",
              },
            }}
          >
            DELETE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SellerMenuItems;
