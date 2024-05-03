import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

function MealPlanTest() {
  //  const url = "https://jsonplaceholder.typicode.com/users";

  // const url =
  // "https://api.edamam.com/api/food-database/v2/parser?app_id=1b18b1dd&app_key=%20c3e3062bccb813d56ae4d31b97be79c1&nutrition-type=cooking";

  //const url = "https://api.edamam.com/api/meal-planner/v1/1b18b1dd/select";

  const url =
    "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7214c06e&app_key=e416de0a15a1c071de5c2493e20197d5";

  // const url =
  //   "https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=chicken&app_id=b1a43d35&app_key=%200db1c439c653bf8112df7491ee518f08";

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
    <div style={{ color: "#000000" }}>
      <h1 style={{ color: "green" }}>Meal Generated</h1>
      <center>
        {/* {data.hits.slice(0, 1).map((dataObj, index) => (
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
            {dataObj.recipe.dietLabels}
            {dataObj.recipe.ingredients.map((ingredient, index) => (
              <div key={index} style={{ fontSize: "20px" }}>
                {ingredient.text && ingredient.text}{" "}
              </div>
            ))}
          </div>
        ))} */}
      </center>

      <Box>
        <h3>Rotisserie Chicken Recipe</h3>
        <img src="https://edamam-product-images.s3.amazonaws.com/web-img/88e/88edb31264dc1e58b37c2fec3f99a244.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIAlSM1mgGcU0fzWiKNmJH3Zk4AKziueVutZp5WhC%2BPrXAiBqOyjeZGmj17aLIJ4S2O7J4jICz9z0EiQLnQIfhepxKiq4BQg%2BEAAaDDE4NzAxNzE1MDk4NiIMQRwCjrGPxa%2BVzE2IKpUFXEC6xmzJzm%2FDqNnwXqI%2BRfuidgt3T1L5hJJA%2FUavDoicYVKw0ituKxvAaZaQfsbN1zYWI%2B8tCA7FSqpWVlMYXvess98yztGwT8VcETtvl28xBPdW0z%2F6M%2F%2FlXCj%2F%2F4Okh3fic3Uv6pdayEJiyO55cJVzLgWRCCWYj5ViQxbHl%2Fc8mfrcofi%2FD%2BP6RJVUYjMMRu%2BDSyvBG947EEr9wGfdZB4RxTRrun8DJ%2B1rurS5HjNfdL1HxdW0oNKk%2Bmo97PGc9A0O0jEgm%2BSzhDfx%2B%2FfuS%2FGv9RCNbJmg5OxVKGVqTqcCeObeoBvoOigWBNlavti2GtQu8PYCJ6lsVl5jx%2FQjhj7WFjIfMcSYa1ni7ANeRhve5JHUN6tp9wJIOmxhTsLjsX2e4xOt7jBnFODvdlyb0bbYBRvkOt6iL8FzmImj4ZMbDKx%2FsSPayVcaJgl08VwSlhxAIPFdl0Q7uOfJC2IESItbV%2Btp7VAnUzCAE9Cr1jFKe8%2FDp3JFF5%2FpM4rCIdtBVorhNegheuNN6hc0FzhlW6tjo7rDHkl9B47zym4RkVi4PnHpVvcSnFXstO3Gejxf3zimQlHiNq2jWBRlf1fYIwEhxvEEsaxXZwfs33dPZcMVt%2FmTYN7j1Mo82eHu9%2B%2BCVT6Oj0%2FtRDJ%2FwF90sJVv6r8gcbUqHfbDZd4bjq%2B2Zz%2BzbbnkcSlMJzRNwyH%2BUq4Fh7u6QmnGef6M4zYh9jUA%2BtG4NblQUqsibwcUwwKP%2FehX3ZWOdBnXKKEr3wqzTPPW%2BJ11Kfp%2BQ7dxPxZ5adBt2JuBLehCCtoYmHGW52irreCQe9cAb1rKEJYY6gXfDyt1c518EuO%2BJy%2BZ%2BlITFOlqB%2BTm9QCdja4brS9lIUEgvQmYFxTu%2FzDuiMexBjqyAZo82bI%2F4TQ1zua7lvO75feEy1Vj5GQJFytmj5pXq0%2FQacaBex8DXUbyALwvfF0AiFVtcyLtNaieReOhPEMJcvbCTbTH2zf7qFKRf2W2LrMalQSyW6aZ23c8AXegChHjMonliKggFM7Al0qnz86eJbBEC8B5Wi3mmnuz2mRhM2iUOZhTxIbF0a%2FQ7H3Wfbpt4dpEZOi8NNQwaPwbdc0a%2B9V9lOvsPXz7MB5Y1OBeA1PRcTs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240501T050321Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFMYFQQRYZ%2F20240501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3f719ea3206be94e2aa9268c4cb1b2721b73893e2555b7168fea04357b9ca150" />
        <p>
          Ingredients: 1 whole chicken, about 4 pounds 2 tablespoons kosher salt
          2 tablespoons butter, melted
        </p>
        <p>Diet: Low-Carb</p>
      </Box>
    </div>
  );
}

export default MealPlanTest;
