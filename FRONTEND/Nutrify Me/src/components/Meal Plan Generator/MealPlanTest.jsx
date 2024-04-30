import React, { useState, useEffect } from "react";
import axios from "axios";

function MealPlanTest() {
  //  const url = "https://jsonplaceholder.typicode.com/users";

  // const url =
  // "https://api.edamam.com/api/food-database/v2/parser?app_id=1b18b1dd&app_key=%20c3e3062bccb813d56ae4d31b97be79c1&nutrition-type=cooking";

  //const url = "https://api.edamam.com/api/meal-planner/v1/1b18b1dd/select";

  const url =
    "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7214c06e&app_key=e416de0a15a1c071de5c2493e20197d5";
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(url);
      console.log("Response:", response); // Log the response object

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Parsed Data:", data); // Log the parsed data

      setData(data);
      // Log the filtered data
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    console.log("test", data);
    // const res = await axios.get(url);
    // // Update state using a function that receives the fetched data
    // setData((prevData) => [...prevData, ...res.data]);

    // const options = {
    //   method: "GET",
    //   url: "https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser",
    //   params: {
    //     "nutrition-type": "cooking",
    //     "category[0]": "generic-foods",
    //     "health[0]": "alcohol-free",
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": "e318be12b5msh467baf927477049p1d1ab6jsn0e3c6fca3476",
    //     "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
    //   },
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <h1 style={{ color: "green" }}>using Axios Library to Fetch Data</h1>
      <center>
        {data.hits.slice(0, 1).map((dataObj, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#CD8FFD",
              padding: 2,
              borderRadius: 10,
              marginBlock: 10,
            }}
          >
            {dataObj.recipe.label}
            {dataObj.recipe.ingredients.map((ingredient, index) => (
              <div key={index} style={{ fontSize: "20px" }}>
                {ingredient.text && ingredient.text}{" "}
              </div>
            ))}
          </div>
        ))}
      </center>
    </div>
  );
}

export default MealPlanTest;
