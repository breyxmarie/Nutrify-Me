import React, { createContext, useState, useContext, useEffect } from "react";
import AxiosInstance from "./forms/AxiosInstance";

const ColorContext = createContext({
  primaryColor: "#000000",
  secondaryColor: "#000000",
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
});

const ColorProvider = ({ children }) => {
  let tempP;
  let tempS;

  AxiosInstance.get(`theme`).then((res) => {
    console.log(res.data[0].primaryColor);
    console.log(res.data);

    tempP = res.data.primaryColor;
    tempS = res.data.secondaryColor;
  });

  const [primaryColor, setPrimaryColor] = useState("#E66253");
  const [secondaryColor, setSecondaryColor] = useState("#898246");
  // useEffect(() => {
  //   const res = AxiosInstance.get(`theme`);
  //   AxiosInstance.get(`theme`).then((res) => {
  //     console.log(res.data[0].primaryColor);
  //     console.log(res.data);

  //     setPrimaryColor(res.data.primaryColor);
  //     setSecondaryColor(res.data.secondaryColor);
  //   });
  // }, []);
  // const [primaryColor, setPrimaryColor] = useState(
  //   () => JSON.parse(localStorage.getItem("primaryColor")) || "#E66253"
  // ); // Read from local storage on initial render

  // const [secondaryColor, setSecondaryColor] = useState(
  //   () => JSON.parse(localStorage.getItem("secondaryColor")) || " #898246"
  // ); // Read from local storage on initial render

  // useEffect(() => {
  //   localStorage.setItem("primaryColor", JSON.stringify(primaryColor));
  //   localStorage.setItem("secondaryColor", JSON.stringify(secondaryColor));
  // }, [primaryColor, secondaryColor]); // Update local storage when state changes

  const value = {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export default ColorContext;
export { ColorProvider }; // Export the provider separately
