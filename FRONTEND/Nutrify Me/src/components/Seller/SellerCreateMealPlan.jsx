import { Typography } from "@mui/material";
import { useState, useCallback  } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import Button from "@mui/material/Button";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AxiosInstance from "../forms/AxiosInstance";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { ToastContainer, toast } from "react-toastify";

function SellerCreateMealPlan() {

  //! meal suggestions
   //? meal suggestion
   const EDAMAM_APP_ID = "857354ae";
   const EDAMAM_APP_KEY = "018c3d97c58bc4bee7559bc5755c01a8";
 
   const [inputValue, setInputValue] = useState("");
   const [notFound, setNotFound] = useState(false)
   const [suggestions, setSuggestions] = useState([]);
   const [loading, setLoading] = useState(false);
   const [tempData, setTempData] = useState([]);
   const [breakfastFood, setBreakfastFood] = useState()
   const [caloriesBvalue, setCaloriesBvalue] = React.useState(0);
   const [fatBvalue, setFatBvalue] = React.useState(0);
   const [proteinBvalue, setProteinBvalue] = React.useState(0);
   const [carbsBvalue, setCarbsBvalue] = React.useState(0);
   const [sodiumBvalue, setSodiumBvalue] = React.useState(0);
   const [potassiumBvalue, setPotassiumBvalue] = React.useState(0);
   const [breakfastFoodImage, setBreakfastFoodImage] =
   useState("/images/food.png");
 
 
 
   // Edamam API credentials (Replace with your actual credentials)
 
   // Debounced function to fetch meal suggestions from Edamam API
   const fetchMealSuggestions = useCallback(
     _.debounce(async (query) => {
       if (!query) {
         setSuggestions([]);
         return;
       }
 
       setLoading(true);
       try {
         // API request to Edamam to search for recipes
         const response = await axios.get(
           `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
         );
 
         // Update the suggestions list with fetched data
         setTempData(response.data.hits.map((hit) => hit.recipe));
         setSuggestions(response.data.hits.map((hit) => hit.recipe.label));
         if(response.data.length === undefined) {
          setNotFound(true)
        }
        } catch (error) {
         console.error("Error fetching meal suggestions:", error);
       } finally {
         setLoading(false);
       }
     }, 500), // Debounce delay (500 ms)
     []
   );
 
   // Handle input changes and trigger API request
   const handleInputChanges = (e, type) => {
    setNotFound(false)
     const value = e.target.value;
     //   setInputValue(value);
     fetchMealSuggestions(value);
 
     if (type === "breakfast") {
       setBreakfastFood(value);
     }
     if (type === "lunch") {
       setLunchFood(value);
     }
   };
 
   const [foods, setFoods] = useState();
   // Handle selecting a suggestion
   const handleSuggestionClick = (suggestion, index, type) => {
    setNotFound(false)
     // if (type === "breakfast") {
       setBreakfastFood(suggestion);
       setBreakfastFoodImage(tempData[index].image);
       setCaloriesBvalue(
         parseInt(tempData[index].calories / tempData[index].yield)
       );
       setProteinBvalue(parseInt(tempData[index].digest[2].total));
       setCarbsBvalue(parseInt(tempData[index].digest[1].total));
       setFatBvalue(parseInt(tempData[index].digest[0].total));
       setPotassiumBvalue(parseInt(tempData[index].digest[7].total));
       setSodiumBvalue(parseInt(tempData[index].digest[4].total));
     // } else if (type === "lunch") {
     //   setLunchFood(suggestion);
     // }
 
     // // setInputValue(suggestion);
     // console.log(suggestion, tempData[index]);
     setSuggestions([]);
     setTempData([]);
   };
 
 
 
 
   //?

  //!
  //? save image
  async function getImage(imageLink) {
    //  console.log(imageLink);
    // const response = await axios.get(
    //   //`https://cors-anywhere.herokuapp.com/${BtempMeal.recipe.image}`,
    //   BtempMeal.recipe.image,

    //   {
    //     responseType: "blob",
    //   }
    // );
    // console.log(response);

    // fetch(`https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // mode: "no-cors",
    // })
    //   .then((response) => response.blob())
    //   .then((imageBlob) => {
    // Handle the image blob
    // const blob = getBlob(imageLink);
    // console.log(blob);
    // const formData = new FormData();
    // blob.then((result) => {
    //   let imageFile = new File([result], "image.jpg", {
    //     type: "image/jpeg",
    //   });
    //   console.log(imageFile);

    //   formData.append("file", imageFile);

    // });

    // try {
    //   AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res.data);
    //     // filename = res.data;
    //     return res.data;
    //     // console.log(filename, "hi");
    //     //  meals.push({ Meal: "Breakfast", details: BtempMeal });
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(formData);

    try {
      const response = await axios.get(
        `https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`,
        { responseType: "blob" }
      );
      const imageBlob = response.data;

      const formData = new FormData();
      const imageFile = new File([imageBlob], "image.jpg", {
        type: "image/jpeg",
      });
      formData.append("file", imageFile);

      const res = await AxiosInstance.post("shopmealplan/savefile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //  console.log(res.data);
      return res.data; // Return the response data if needed
    } catch (error) {
      console.error(error);
    }

    // console.log(imageBlob);

    // })
    // .catch((error) => {
    //   console.error("Error fetching image:", error);
    // });

    // console.log(response);
    // const imageFile = new File([response], "image.jpg", {
    //   type: "image/jpeg",
    // });

    // const formData = new FormData();
    // formData.append("file", imageFile);
    // try {
    //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // fetch(`https://cors-anywhere.herokuapp.com/${imageLink}`, {
    // fetch(`https://proxynutrifyme-4a3d23e2f725.herokuapp.com/${imageLink}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // mode: "no-cors",
    // })
    //   .then((response) => response.blob())
    //   .then((imageBlob) => {
    //     // Handle the image blob
    //     console.log(imageBlob);
    //     //  const imageBlob = getBlob(imageLink);
    //     //   console.log(imageBlob);
    //     let imageFile = new File([imageBlob], "image.jpg", {
    //       type: "image/jpeg",
    //     });
    //     console.log(imageFile);

    //     const formData = new FormData();
    //     formData.append("file", imageFile);
    //     // try {
    //     //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     //     headers: {
    //     //       "Content-Type": "multipart/form-data",
    //     //     },
    //     //   }).then((res) => {
    //     //     return processResponseData(res.data);
    //     //     // console.log(res.data);
    //     //     // const fileName = res.data;
    //     //     // console.log(fileName);
    //     //     // return fileName;
    //     //   });
    //     // } catch (error) {
    //     //   console.log(error);
    //     // }
    //   });

    // const res = await AxiosInstance.post("shopmealplan/savefile", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // const fileName = res.data;
    // return fileName;

    // // })
    // .catch((error) => {
    //   console.error("Error fetching image:", error);
    // });

    //console.log(response);
    // const imageFile = new File([response], "image.jpg", {
    //   type: "image/jpeg",
    // });

    // const formData = new FormData();
    // formData.append("file", imageFile);
    // try {
    //   await AxiosInstance.post("shopmealplan/savefile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  //?
  const [loading1, setLoading1] = useState(false)
  const [indexmeal, setIndexmeal] = useState();
  const [tempMeal, setTempMeal] = useState([
    {
      day: "Day 1", // Optional: Add a day property for reference
      meals: {
        Breakfast: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          description: "",
          sodium: 0,
          potassium: 0,
          image: "",
        },
        Lunch: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Snack: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Dinner: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
      },
    },
    {
      day: "Day 2", // Optional: Add a day property for reference
      meals: {
        Breakfast: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Lunch: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Snack: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Dinner: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
      },
    },
    {
      day: "Day 3", // Optional: Add a day property for reference
      meals: {
        Breakfast: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Lunch: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Snack: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Dinner: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
      },
    },

    {
      day: "Day 4", // Optional: Add a day property for reference
      meals: {
        Breakfast: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Lunch: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Snack: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Dinner: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
      },
    },

    {
      day: "Day 5",
      meals: {
        Breakfast: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Lunch: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Snack: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
        Dinner: {
          food: "",
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
          sodium: 0,
          potassium: 0,
          description: "",
          image: "",
        },
      },
    },
  ]);
  const [day, setDay] = useState();
  const schema = yup.object().shape({
    name: yup.string().required("Food is required"),
    // type: yup.string().required("Please Select a type"),
    // calories: yup.number().required("Calories is required"),
    // //.integer("Please enter an integer value"),
    // fat: yup.number().required("Fat is required"),
    // //  .integer("Please enter an integer value"),
    // carbs: yup.number().required("Carbs is required"),
    // // .integer("Please enter an integer value"),
    // protein: yup.number().required("Protein is required"),

    //  .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),
  });
  const mealPlanschema = yup.object().shape({
    mealtype: yup.string().required("Meal Type is required"),

    description: yup.string().required("Description is required"),
    price: yup.string().required("Price is required"),
    // .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),
  });

  const form1 = useForm({ resolver: yupResolver(schema) }); // For form 1 with schema1
  const form2 = useForm({ resolver: yupResolver(mealPlanschema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm({
    resolver: yupResolver(mealPlanschema),
  });

  //! save meal plan

  const [mealfile, setMealfile] = useState();

  const handleResetMealPlan = () => {
    reset1(); // Call reset function to clear form state and errors
    setTempMeal([
      {
        day: "Day 1", // Optional: Add a day property for reference
        meals: {
          Breakfast: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Lunch: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Snack: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Dinner: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
        },
      },
      {
        day: "Day 2", // Optional: Add a day property for reference
        meals: {
          Breakfast: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Lunch: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Snack: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Dinner: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
        },
      },
      {
        day: "Day 3", // Optional: Add a day property for reference
        meals: {
          Breakfast: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Lunch: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Snack: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Dinner: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
        },
      },
  
      {
        day: "Day 4", // Optional: Add a day property for reference
        meals: {
          Breakfast: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Lunch: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Snack: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Dinner: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
        },
      },
  
      {
        day: "Day 5",
        meals: {
          Breakfast: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Lunch: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Snack: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
          Dinner: {
            food: "",
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sodium: 0,
            potassium: 0,
            description: "",
            image: "",
          },
        },
      },
    ]);
  };

  const saveMealPlan = async (data) => {
    handleOpenLoading()
    //! dito na to upload tempMealPlan

    tempMeal.forEach((dayObject) => {
      console.log("Day:", dayObject.day);

      // dayObject.meals.forEach((meal) => {
      //   // Access both day and meal data within the loop
      //   console.log("Meal details:", { day: dayObject.day, ...meal });
      // });

      Object.keys(dayObject.meals).forEach((mealName) => {
        const mealDetails = dayObject.meals[mealName];
        console.log("Day (Meal Name):", mealName);
        console.log("Meal details:", mealDetails);
      });
    });

    const currentWeekStart = dayjs(value).startOf("week").format("YYYY-MM-DD");
    const currentWeekEnd = dayjs(value).endOf("week").format("YYYY-MM-DD");
    console.log(value, currentWeekStart, currentWeekEnd);
    // const [mealplanId, setMealplanId] = useState();
    // try {
    //   AxiosInstance.post(`shopmealplan/`, {
    //     name: tempType,
    //     image: "https://nightxperson.pythonanywhere.com/Photos/food.png",
    //     description: "random",
    //     start_week: currentWeekStart,
    //     end_week: currentWeekEnd,
    //   }).then((res) => {
    //     console.log(res.data.id);
    //   });
    // } catch (error) {
    //   console.log(error.response.data);
    // }

    if (!mealfile) {
      return alert("Please select an image");
    } else {
      console.log({ data }, data.name);
      // console.log(mealfile.name);

      const formData = new FormData();
      formData.append("file", mealfile);

      // const csrftoken = document.querySelector(
      //   '[name="csrfmiddlewaretoken"]'
      // ).value;
      // axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

      try {
        const response = await AxiosInstance.post(
          "shopmealplan/savefile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data); // Handle successful response

        try {
          const currentWeekStart = dayjs(value)
            .startOf("week")
            .format("YYYY-MM-DD");
          const currentWeekEnd = dayjs(value)
            .endOf("week")
            .format("YYYY-MM-DD");
          // console.log(value, currentWeekStart, currentWeekEnd);
          AxiosInstance.post(`shopmealplan/`, {
            approve: 0,
            name: data.mealtype,
            image:
              "https://nightxperson.pythonanywhere.com/Photos/" + response.data,
            description: data.description,
            start_week: currentWeekStart,
            end_week: currentWeekEnd,
            price: data.price,
            active: false,
            //  price: ,
          }).then((res) => {
            toast.success("Meal Plan Created");
            console.log(res.data.id);
            tempMeal.forEach((dayObject, index) => {
              console.log("Day:", dayObject.day);

              // dayObject.meals.forEach((meal) => {
              //   // Access both day and meal data within the loop
              //   console.log("Meal details:", { day: dayObject.day, ...meal });
              // });

              Object.keys(dayObject.meals).forEach((mealName) => {
                const mealDetails = dayObject.meals[mealName];
                console.log("Day (Meal Name):", mealName);
                console.log("Meal details:", mealDetails);
                const data = dayObject.day;
                const extractedNumber = data.match(/\d+/)[0];
                try {
                  AxiosInstance.post(`shopmeal/`, {
                    mealplan_id: res.data.id,
                    type: mealName,
                    calories: mealDetails.calories,
                    fat: mealDetails.fat,
                    protein: mealDetails.protein,
                    carbs: mealDetails.carbs,
                    food: mealDetails.food,
                    sodium: mealDetails.sodium ,
                    potassium: mealDetails.potassium,
                    image: mealDetails.image,
                    day: extractedNumber,
                    //image: data.type,
                  }).then((res) => {
                    console.log(res, res.data);
                  });
                } catch (error) {
                  console.log(error.response);
                }
                if (index + 1  === tempMeal.length) {
                  handleCloseLoading()
                }
              });
            });
          });
        } catch (error) {
          console.log(error.response.data);
        }
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }
    }
  };
  //!
  const mealType = [
    "High Protein",
    "Vegetarian",
    "Paleo",
    "High Blood Friendly",
  ];
  // * modal content.
  const [tempTypeForMeal, setTempTypeForMeal] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (type) => {
    console.log(type);

    switch (type) {
      case "Breakfast":
        setIndexmeal(0);
        break;
      case "Lunch":
        setIndexmeal(1);
        break;
      case "Snack":
        setIndexmeal(2);
        break;
      case "Dinner":
        setIndexmeal(3);
        break;
    }

    setTempTypeForMeal(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //*
  //! blank field error handling

  const [file, setFile] = useState();

  const handleFileUpload = async (event) => {
    console.log(file);
    event.preventDefault(); // Prevent default form submission behavior

    if (!file) {
      return alert("Please select a file to upload");
    }

    const formData = new FormData();
    formData.append("file", file);

    // const csrftoken = document.querySelector(
    //   '[name="csrfmiddlewaretoken"]'
    // ).value;
    // axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

    try {
      const response = await AxiosInstance.post(
        "shopmealplan/savefile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error("Error uploading file:", error); // Handle errors
    }
  };

  const type = ["Breakfast", "Lunch", "Snack", "Dinner"];

  // const handleChange = (event) => {
  //   const newValue = event.target.value;
  //   Optionally trim leading/trailing whitespaces
  //   const trimmedValue = newValue.trim();
  //   setValue(trimmedValue);
  // };

  const handleReset = () => {
    reset(); // Call reset function to clear form state and errors
  };

  function updateMeal(day, mealName, newMealDetails) {
    console.log(day, mealName, newMealDetails);
    return tempMeal.map((mealObj) => {
      console.log(mealObj, day);
      if (mealObj.day === day) {
        // Create a new object with updated meal details
        const updatedMeal = {
          ...mealObj,
          meals: {
            ...mealObj.meals,
            [mealName]: {
              ...mealObj.meals[mealName],
              ...newMealDetails,
            },
          },
        };
        // Return a new array with the updated object
        return updatedMeal;
      } else {
        // Return the original object for other days

        console.log(tempMeal);
        return mealObj;
      }
    });
  }

  const [updatedMealInfo, setUpdatedMealInfo] = useState([]);
  const onSubmitHandler = async (data) => {
    // event.preventDefault(); // Prevent default form submission behavior
    // if (!file) {
    //   return alert("Please select an image");
    // } else {
      setLoading1(true)
      // console.log({ data }, data.name);
      // console.log(file.name);
      // const formData = new FormData();
      // formData.append("file", file);

      try {
        // const response = await AxiosInstance.post(
        //   "shopmealplan/savefile",
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );

        const imageData = await getImage(breakfastFoodImage);
   
        const updatedMealInfo = {
          calories: caloriesBvalue,
          fat: fatBvalue,
          protein: proteinBvalue,
          carbs: carbsBvalue,
          sodium: sodiumBvalue,
          potassium: potassiumBvalue,
          food: breakfastFood,
     
          image:
            "https://nightxperson.pythonanywhere.com/Photos/" + imageData,
        };

        setTempMeal(updateMeal(day, tempTypeForMeal, updatedMealInfo));
        changeDiv(activeButtonIndex, day)
        handleReset();
        setBreakfastFood("")
        setCaloriesBvalue(0);
        setFatBvalue(0);
        setProteinBvalue(0);
        setCarbsBvalue(0);
        setSodiumBvalue(0)
        setPotassiumBvalue(0)
        setBreakfastFoodImage("/images/food.png")
        console.log(activeButtonIndex, `Day ${activeButtonIndex + 1}`)
        changeDiv(activeButtonIndex, `Day ${activeButtonIndex + 1}`)
        setLoading1(false)
        setFile()
        // setDivContent(
        //   <Box sx={{ mx: 7 }}>
        //     {Object.keys(tempMeal[indexmeal].meals).map((mealName) => (
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
        //             <Grid xs={4}>
        //               <img
        //                 src={tempMeal[indexmeal].meals[mealName].image}
        //                 height="150px"
        //               />{" "}
        //             </Grid>
        //             <Grid xs={6} sx={{ mx: 4, mt: 5 }}>
        //               <Typography
        //                 sx={{
        //                   color: "#99756E",
        //                   fontWeight: "bold",
        //                   fontSize: "25px",
        //                   float: "left",
        //                 }}
        //               >
        //                 {tempMeal[indexmeal].meals[mealName].food}
        //               </Typography>

        //               <Grid container spacing={2}>
        //                 <Grid xs={3}>
        //                   <img src="/images/calories.png" />
        //                   {tempMeal[indexmeal].meals[mealName].calories}{" "}
        //                   calories |
        //                 </Grid>
        //                 <Grid xs={3}>
        //                   <img src="/images/fat.png" />
        //                   {tempMeal[indexmeal].meals[mealName].fat}g fat |
        //                 </Grid>
        //                 <Grid xs={3}>
        //                   <img src="/images/carbs.png" />
        //                   {tempMeal[indexmeal].meals[mealName].carbs}g carbs |
        //                 </Grid>
        //                 <Grid xs={3}>
        //                   <img src="/images/protein.png" />
        //                   {tempMeal[indexmeal].meals[mealName].protein}g protein
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
        //                 onClick={() => handleOpen(mealName)}
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
        handleClose();
        return;
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }
    // }

    //   // const csrftoken = document.querySelector(
    //   //   '[name="csrfmiddlewaretoken"]'
    //   // ).value;
    //   // axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
    //   try {
    //     const response = await AxiosInstance.post(
    //       "shopmealplan/savefile",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     console.log(response.data); // Handle successful response
    //     try {
    //       AxiosInstance.post(`shopmeal/`, {
    //         mealplan_id: 1,
    //         type: data.type,
    //         calories: data.calories,
    //         fat: data.fat,
    //         protein: data.protein,
    //         carbs: data.carbs,
    //         food: data.name,
    //         image: "https://nightxperson.pythonanywhere.com/Photos/" + response.data,
    //         day: "Monday",
    //         //image: data.type,
    //       }).then((res) => {
    //         console.log(res, res.data);
    //         handleClose();
    //       });
    //     } catch (error) {
    //       console.log(error.response.data);
    //     }
    // } catch (error) {
    //   console.error("Error uploading file:", error); // Handle errors
    // }
    // }
  };

  //!
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  //const buttons = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const buttons = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

  const meal = [
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
  ];

  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    overflowY: "auto", // Enable vertical scrolling
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

  const [error, setError] = useState(false);

  const handleClick = (index) => {
    setActiveButtonIndex(index);
    setDivContent(<b>Bold new content! {index}</b>);
  };

  const [divContent, setDivContent] = useState(<Box sx={{ mx: "5%" }}>
    {Object.keys(tempMeal[activeButtonIndex].meals).map((mealName) => (
      <Box>
        {" "}
        <Typography
          sx={{
            color: "#E66253",
            fontWeight: "bold",
            fontSize: "200%",
            textAlign: "left",
            ml: 0,
            mt: 3,
          }}
        >
          {mealName}
        </Typography>
        <Box sx={{ my: 3, mx: 0, border: 2, borderRadius: 5, px: 3 }}>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid xs={12} sm={3}>
              <img
                src={
                  tempMeal[activeButtonIndex]?.meals?.[mealName]?.image ||
                  "/images/food.png"
                }
                height="80%"
                width="80%"
                alt="Meal Image" // Add an alt attribute for accessibility
              />
            </Grid>
            <Grid xs={12} sm={7} sx={{ mx: 0, mt: 5 }}>
              <Typography
                sx={{
                  color: "#99756E",
                  fontWeight: "bold",
                  fontSize: "25px",
                  float: "left",
                }}
              >
                {tempMeal[activeButtonIndex].meals[mealName].food}
              </Typography>

              <Grid container spacing={2}>
                <Grid xs={6}>
                  <img src="/images/calories.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].calories} calories |
                </Grid>
                <Grid xs={6}>
                  <img src="/images/fat.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].fat}g fat |
                </Grid>
                <Grid xs={6}>
                  <img src="/images/carbs.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].carbs}g carbs |
                </Grid>
                <Grid xs={6}>
                  <img src="/images/protein.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].protein}g protein
                </Grid>
                <Grid xs={6}>
                  <img width = "10%" height= "60%" src="/images/sodiumorange.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].sodium}g sodium
                </Grid>
                <Grid xs={6}>
                  <img width = "10%" height= "60%" src="/images/potassiumorange.png" />
                  {tempMeal[activeButtonIndex].meals[mealName].potassium}g potassium
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={2}>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  mt: 8,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
                onClick={() => handleOpen(mealName)}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
       ))}
  </Box>);

  const changeContent = () => {
    setDivContent(<b>Bold new content!</b>);
  };

  const [chosenTab, setChosenTab] = useState()

  const changeDiv = (index, day) => {
    switch (day) {
      case "Day 1":
        setDay("Day 1");
        break;
      case "Day 2":
        setDay("Day 2");
        break;
      case "Day 3":
        setDay("Day 3");
        break;
      case "Day 4":
        setDay("Day 4");
        break;
      case "Day 5":
        setDay("Day 5");
        break;

      // case "SUN":
      //   setDay("Sunday");
      //   break;
      // case "MON":
      //   setDay("Monday");
      //   break;
      // case "TUES":
      //   setDay("Tuesday");
      //   break;
      // case "WED":
      //   setDay("Wednesday");
      //   break;
      // case "THURS":
      //   setDay("Thursday");
      //   break;
      // case "FRI":
      //   setDay("Friday");
      //   break;
      // case "SAT":
      //   setDay("Saturday");
      //   break;
    }

    setActiveButtonIndex(index);

    setDivContent(
      <Box sx={{ mx: "5%" }}>
        {Object.keys(tempMeal[index].meals).map((mealName) => (
          <Box>
            {" "}
            <Typography
              sx={{
                color: "#E66253",
                fontWeight: "bold",
                fontSize: "200%",
                textAlign: "left",
                ml: 0,
                mt: 3,
              }}
            >
              {mealName}
            </Typography>
            <Box sx={{ my: 3, mx: 0, border: 2, borderRadius: 5, px: 3 }}>
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid xs={12} sm={3}>
                  <img
                    src={
                      tempMeal[index]?.meals?.[mealName]?.image ||
                      "/images/food.png"
                    }
                    height="80%"
                    width="80%"
                    alt="Meal Image" // Add an alt attribute for accessibility
                  />
                </Grid>
                <Grid xs={12} sm={7} sx={{ mx: 0, mt: 5 }}>
                  <Typography
                    sx={{
                      color: "#99756E",
                      fontWeight: "bold",
                      fontSize: "25px",
                      float: "left",
                    }}
                  >
                    {tempMeal[index].meals[mealName].food}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <img src="/images/calories.png" />
                      {tempMeal[index].meals[mealName].calories} calories 
                    </Grid>
                    <Grid xs={6}>
                      <img src="/images/fat.png" />
                      {tempMeal[index].meals[mealName].fat}g fat 
                    </Grid>
                    <Grid xs={6}>
                      <img src="/images/carbs.png" />
                      {tempMeal[index].meals[mealName].carbs}g carbs 
                    </Grid>
                    <Grid xs={6}>
                      <img src="/images/protein.png" />
                      {tempMeal[index].meals[mealName].protein}g protein
                    </Grid>
                    <Grid xs={6}>
                      <img width = "10%" height= "60%" src="/images/sodiumorange.png" />
                      {tempMeal[index].meals[mealName].sodium}g sodium
                    </Grid>
                    <Grid xs={6}>
                      <img width = "10%" height= "60%" src="/images/potassiumorange.png" />
                      {tempMeal[index].meals[mealName].potassium}g potassium
                    </Grid>
                    
                  </Grid>
                </Grid>
                <Grid xs={12} sm={2}>
                  <Button
                    sx={{
                      background: "#E66253",
                      color: "#ffffff",
                      mt: 5,
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#E66253",
                        border: 0.5,
                        borderColor: "#E66253",
                      },
                    }}
                    onClick={() => handleOpen(mealName)}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    );
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

  //* modal

  // *

  // ! weekly calendar
  dayjs.extend(isBetweenPlugin);

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
  })(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main,
      },
    }),
    ...(isHovered && {
      backgroundColor: theme.palette.primary[theme.palette.mode],
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary[theme.palette.mode],
      },
    }),
    ...(day.day() === 0 && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(day.day() === 6 && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  }));

  const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
      return false;
    }

    return dayA.isSame(dayB, "week");
  };

  function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
      <CustomPickersDay
        {...other}
        day={day}
        sx={{ px: 2.5 }}
        disableMargin
        selected={false}
        isSelected={isInSameWeek(day, selectedDay)}
        isHovered={isInSameWeek(day, hoveredDay)}
      />
    );
  }

  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs().startOf("week").add(14, "day"));

  // !
  const [tempType, setTempType] = useState();
  const [openLoading, setOpenLoading] = useState(false);
  const handleOpenLoading = () => {
    setOpenLoading(true)}
  const handleCloseLoading = () => {setOpenLoading(false)}


  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      <ToastContainer />
      <Modal
        open={openLoading}
        onClose={handleCloseLoading} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <center>  <img src="/images/pacman.gif" width="23%" />
        <Typography>Saving your meal plan please wait...</Typography></center>
          </Box>

          </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {loading1 ? (<><center>  <img src="/images/pacman.gif" width="13%" />
          <Typography>Saving your meal please wait...</Typography></center></>)
: ( <>
          <Grid container spacing={2}>
            <Grid xs={2}>
              {" "}
              <img src="/images/food journal icon.png" />
            </Grid>
            <Grid xs={8}>Add Meal</Grid>
            <Grid xs={2}>
              <Button sx={{ float: "right" }} onClick={() => handleClose()}>
                <img src="/images/close.png" height="10" weight="10" />
              </Button>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid xs={6}>
                Type of Meal: <br />
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value={selectedNutritionist}
                  // onChange={handleChange}
                  name="type"
                  width="100%"
                  {...register("type")}
                  error={errors.type ? true : false}
                >
                  {type.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="inherit" color="textSecondary">
                  {errors.type?.message}
                </Typography>
              </Grid>
              <Grid xs={6}>Stocks</Grid>
            </Grid> */}
            Name: <br />
            {/* <TextField
              id="name"
              name="name"
              label="Food Name"
              fullWidth
              margin="dense"
              {...register("name")}
              error={errors.name ? true : false}
            /> */}
            <div
            className="meal-suggestion-input"
            style={{
              position: "relative",
              width: "80%",
              color: "#000000",
            }}
          >
            <TextField
              //fullWidth
              id="name"
              name="name"
             
              fullWidth
              margin="dense"
              {...register("name")}
              error={
                errors.name ? true : false
              }
             
              variant="filled"
              size="small"
              // label="Search for meals"
              value={breakfastFood}
              onChange={(e) =>
                handleInputChanges(e, "breakfast")
              }
              placeholder="Type to search for meals..."
              sx={{
                //  mr: 2,
                background: "#ffffff",
                color: "#000000",
                width: "120%",
              }}
            />
              <Typography variant="inherit" color="textSecondary">
{errors.name?.message}
</Typography>
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  marginTop: "-12px",
                }}
              />
            )}
            {suggestions.length > 0 && notFound ? (
              <List
                style={{
                  position: "absolute",
                  top: "60px",
                  width: "100%",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map(
                  (suggestion, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          index,
                          "breakfast"
                        )
                      }
                    >
                      <ListItemText
                        primary={suggestion}
                      />
                    </ListItem>
                  )
                )}
              </List>
            )  : suggestions.length <= 0 && notFound ? (
              <>
               <List
                style={{
                  position: "absolute",
                  top: "60px",
                  width: "100%",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                 <ListItem
                 
                    >
                      <ListItemText>    Nothing found </ListItemText>
                    </ListItem>
                </List>
          
              </>
            ) : (<>
                                    
              </>) }
          </div>
            <Typography variant="inherit" color="textSecondary">
              {errors.name?.message}
            </Typography>
            <br />
            {/* Upload Image:
          
            <input
              type="file"
              onChange={(evt) => setFile(evt.target.files[0])}
            /> */}
            {/* <br />
            <br /> */}
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
                    id="calories"
                    name="calories"
                  
                    value={caloriesBvalue}
                    fullWidth
                    margin="dense"
                    type="number"
                    {...register("calories")}
                    error={errors.calories ? true : false}
                  />

                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.calories?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
                </Grid>
              </Grid>

              <Typography sx={{ fontWeight: "bold" }}> Fat</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={5}>
                  [Fat]
                  <img
                    src="/images/arrow.png"
                    width="40px"
                    style={{ marginLeft: "35px", marginTop: "25px" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <br />
                  <TextField
                    id="fat"
                    name="fat"
                    value={fatBvalue}
                    fullWidth
                    margin="dense"
                    type="number"
                    {...register("fat")}
                    error={errors.fat ? true : false}
                  />
                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.fat?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
                </Grid>
              </Grid>

              <Typography sx={{ fontWeight: "bold" }}> Carbs</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={5}>
                  [Carbs]
                  <img
                    src="/images/arrow.png"
                    width="40px"
                    style={{ marginLeft: "35px", marginTop: "25px" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <br />
                  <TextField
                    id="carbs"
                    name="carbs"
                    value={carbsBvalue}
                    type="number"
                    fullWidth
                    margin="dense"
                    {...register("carbs")}
                    error={errors.carbs ? true : false}
                  />
                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.carbs?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
                </Grid>
              </Grid>

              <Typography sx={{ fontWeight: "bold" }}> Protein</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={5}>
                  [Protein]
                  <img
                    src="/images/arrow.png"
                    width="40px"
                    style={{ marginLeft: "35px", marginTop: "25px" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <br />
                  <TextField
                    id="protein"
                    name="protein"
                    value={proteinBvalue}
                    type="number"
                    fullWidth
                    margin="dense"
                    {...register("protein")}
                    error={errors.protein ? true : false}
                  />
                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.calories?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
                </Grid>
              </Grid>

              <Typography sx={{ fontWeight: "bold" }}> Potassium</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={5}>
                  [Potassium]
                  <img
                    src="/images/arrow.png"
                    width="40px"
                    style={{ marginLeft: "35px", marginTop: "25px" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <br />
                  <TextField
                    id="potassium"
                    name="potassium"
                 
                    fullWidth
                    value={potassiumBvalue}
                    margin="dense"
                    type="number"
                    {...register("potassium")}
                    error={errors.potassium ? true : false}
                  />
                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.fat?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
                </Grid>
              </Grid>

              <Typography sx={{ fontWeight: "bold" }}> Sodium</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={5}>
                  [Sodium]
                  <img
                    src="/images/arrow.png"
                    width="40px"
                    style={{ marginLeft: "35px", marginTop: "25px" }}
                  />
                </Grid>
                <Grid xs={4}>
                  <br />
                  <TextField
                    id="sodium"
                    name="sodium"
                 
                    fullWidth
                    value={sodiumBvalue}
                    margin="dense"
                    type="number"
                    {...register("sodium")}
                    error={errors.sodium ? true : false}
                  />
                  {/* <Typography variant="inherit" color="textSecondary">
                    {errors.fat?.message}
                  </Typography> */}
                </Grid>
                <Grid xs={1}>
                  <br />
                  {/* <Button
                    sx={{
                      background: "#ffffff",
                      color: "#E66253",
                      ml: 5,
                      mt: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E66253",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    OK
                  </Button> */}
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
                type="submit"
                // onClick={handleFileUpload}
              >
                DONE
              </Button>

              <Button
                onClick={handleReset}
                sx={{
                  //   background: "#ffffff",
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderRadius: 5,
                  textDecoration: "underline",
                  ml: 5,
                  mt: 1,
                  px: 10,
                  //   "&:hover": {
                  //     backgroundColor: "#E66253",
                  //     color: "#ffffff",
                  //     border: 0.5,
                  //     borderColor: "#ffffff",
                  //   },
                }}

                // onClick={handleFileUpload}
              >
                RESET
              </Button>
            </center>
          </form>
          </> ) }
        </Box>
      </Modal>
      <Typography sx={{ my: 7, fontSize: "200%", fontWeight: "bold" }}>
        CREATE MEAL PLAN
      </Typography>

      <Box sx = {{ml: "5%", mr: "10%"}}>
      <Grid container spacing={2}>
        <Grid xs={12} md={7}>
          <Grid container spacing={2}>
            {buttons.map((buttonLabel, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <Button
                  key={index}
                  variant="contained" // Adjust variant as needed
                  onClick={() => changeDiv(index, buttonLabel)}
                  sx={{
                    borderColor: "#ffffff",
                    fontWeight: "bold",
                    boxShadow: 1,
                    mx: 1,
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
              </Grid>
            ))}
          </Grid>

          <div>{divContent}</div>
        </Grid>
        <Grid xs={12} md={5} sx={{ color: "#99756E" }}>
        <Box sx = {{ml: "10%"}}>
          <form onSubmit={handleSubmit1(saveMealPlan)}>
          
            <Grid container spacing={2}>
              <Grid xs={12} sm={4}>
                
                <Typography
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "30px",
                    my: 2,
                  }}
                >
                  Meal Plan:{" "}
                </Typography>
              </Grid>
              <Grid xs={12} sm={8}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value={selectedNutritionist}
                  // onChange={handleChange}
                  name="mealtype"
                  width="100%"
                  {...register1("mealtype")}
                  error={errors1.mealtype ? true : false}
                  sx={{ width: "80%" }}
                >
                  {mealType.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="inherit" color="textSecondary">
                  {errors1.mealtype?.message}
                </Typography>
             
              </Grid>
             
            </Grid>
           

            <Grid container spacing={2}>
              <Grid xs={12} sm={3}>
                <Typography
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "30px",
                    my: 2,
                  }}
                >
                  Week:
                </Typography>
              </Grid>
              <Grid xs={12} sm={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                  minDate={dayjs().startOf("week").add(14, "day")}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    showDaysOutsideCurrentMonth
                    displayWeekNumber
                    slots={{ day: Day }}
                    slotProps={{
                      day: (ownerState) => ({
                        selectedDay: value,
                        hoveredDay,
                        onPointerEnter: () => setHoveredDay(ownerState.day),
                        onPointerLeave: () => setHoveredDay(null),
                      }),
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* <Box
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
              <Typography sx={{ color: "#E66253", fontWeight: "bold" }}>
                Breakfast
              </Typography>

              <Typography sx={{ ml: 3 }}>
                [FOOD] <br />
                [FOOD] <br />
                [FOOD] <br />
                [FOOD]
              </Typography>

              <Typography sx={{ color: "#E66253", fontWeight: "bold", mt: 1 }}>
                Lunch
              </Typography>

              <Typography sx={{ ml: 3 }}>
                [FOOD] <br />
                [FOOD] <br />
                [FOOD] <br />
                [FOOD]
              </Typography>

              <Typography sx={{ color: "#E66253", fontWeight: "bold", mt: 1 }}>
                Snack
              </Typography>

              <Typography sx={{ ml: 3 }}>
                [FOOD] <br />
                [FOOD] <br />
                [FOOD] <br />
                [FOOD]
              </Typography>

              <Typography sx={{ color: "#E66253", fontWeight: "bold", mt: 1 }}>
                Dinner
              </Typography>

              <Typography sx={{ ml: 3 }}>
                [FOOD] <br />
                [FOOD] <br />
                [FOOD] <br />
                [FOOD]
              </Typography>
            </Box> */}

            <Box sx={{ mr: 5 }}>
              Description <br />
              <TextField
                sx={{ width: "100%" }}
                id="description"
                name="description"
                label="Description"
                multiline
                minRows={4}
                margin="dense"
                {...register1("description")}
                error={errors1.description ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.description?.message}
              </Typography>
              Price
              <br />
              <TextField
                sx={{ width: "100%" }}
                id="price"
                name="price"
                label="Price"
                size="small"
                margin="dense"
                {...register1("price")}
                error={errors1.price ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.price?.message}
              </Typography>
              Image:
              <input
                type="file"
                onChange={(evt) => setMealfile(evt.target.files[0])}
              />
            </Box>
{console.log(tempMeal[activeButtonIndex])}
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
                {tempMeal[activeButtonIndex].meals.Breakfast.calories +
                tempMeal[activeButtonIndex].meals.Lunch.calories + 
                tempMeal[activeButtonIndex].meals.Snack.calories  +
                tempMeal[activeButtonIndex].meals.Dinner.calories
                } {" "} calories
             
              </Typography>

              <Typography sx={{ my: 1 }}>
                <img src="/images/fat.png" />
                {tempMeal[activeButtonIndex].meals.Breakfast.fat +
                tempMeal[activeButtonIndex].meals.Lunch.fat + 
                tempMeal[activeButtonIndex].meals.Snack.fat  +
                tempMeal[activeButtonIndex].meals.Dinner.fat
                } {" "} fat
              </Typography>

              <Typography sx={{ my: 1 }}>
                <img src="/images/carbs.png" />
                {tempMeal[activeButtonIndex].meals.Breakfast.carbs +
                tempMeal[activeButtonIndex].meals.Lunch.carbs + 
                tempMeal[activeButtonIndex].meals.Snack.carbs  +
                tempMeal[activeButtonIndex].meals.Dinner.carbs
                } {" "} carbs
              </Typography>

              <Typography sx={{ my: 1 }}>
                <img src="/images/protein.png" />
                {tempMeal[activeButtonIndex].meals.Breakfast.protein +
                tempMeal[activeButtonIndex].meals.Lunch.protein + 
                tempMeal[activeButtonIndex].meals.Snack.protein  +
                tempMeal[activeButtonIndex].meals.Dinner.protein
                } {" "} protein
              </Typography>
              <Typography sx={{ my: 1 }}>
                <img width="5%" height="10%" src="/images/sodiumorange.png" />
                {tempMeal[activeButtonIndex]?.meals.Breakfast.sodium +
                tempMeal[activeButtonIndex]?.meals.Lunch.sodium + 
                tempMeal[activeButtonIndex]?.meals.Snack.sodium  +
                tempMeal[activeButtonIndex]?.meals.Dinner.sodium
                } {" "}sodium
              </Typography>

              <Typography sx={{ my: 1 }}>
                <img width="5%" height="10%" src="/images/potassiumorange.png" />
                {tempMeal[activeButtonIndex]?.meals.Breakfast.potassium +
                tempMeal[activeButtonIndex]?.meals.Lunch.potassium + 
                tempMeal[activeButtonIndex]?.meals.Snack.potassium  +
                tempMeal[activeButtonIndex]?.meals.Dinner.potassium
                } {" "}potassium
              </Typography>
            </Box>

          
            <br />
            <Button
              sx={{
                border: 2.5,
                background: "#E66253",
                borderColor: "#E66253",
                color: "#ffffff",
                borderRadius: 10,
                fontWeight: "bold",
                px: 10,
                fontSize:{
                  xs: "0.8em",
                  sm: "1em",
                },
                my: 0,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}
              // onClick={saveMealPlan}

              type="submit"
            >
              SAVE MEAL PLAN
            </Button>
            <br/>
            <Button
              sx={{
                border: 2.5,
                background: "#ffffff",
                borderColor: "#E66253",
                color: "#E66253",
                borderRadius: 10,
                fontWeight: "bold",
                px: 13,
                fontSize:{
                  xs: "0.8em",
                  sm: "1em",
                },
                my: 1.5,
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 0.5,
                  borderColor: "#ffffff",
                },
              }}
              onClick = {handleResetMealPlan}
            >
              START OVER
            </Button>
          </form>
          </Box>
        </Grid>
       
      </Grid>
      </Box>
    </div>
  );
}

export default SellerCreateMealPlan;
