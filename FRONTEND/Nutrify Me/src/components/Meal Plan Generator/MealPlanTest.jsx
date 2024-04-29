import React, { useState, useEffect } from "react";
import axios from "axios";

function MealPlanTest() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    const res = await axios.get(url);
    // Update state using a function that receives the fetched data
    setData((prevData) => [...prevData, ...res.data]);

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
        {data.map((dataObj, index) => {
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#CD8FFD",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: "#ffffff" }}>{dataObj.name}</p>
            </div>
          );
        })}
      </center>
    </div>
  );
}

export default MealPlanTest;
