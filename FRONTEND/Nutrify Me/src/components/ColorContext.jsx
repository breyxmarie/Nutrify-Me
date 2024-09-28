import React, { createContext, useState, useEffect } from "react";
import AxiosInstance from "./forms/AxiosInstance";

const ColorContext = createContext({
  primaryColor: "#E66253",
  secondaryColor: "#898246",
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
});

const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("#E66253");
  const [secondaryColor, setSecondaryColor] = useState("#898246");

  useEffect(() => {
    const fetchThemeColors = async () => {
      try {
        const response = await AxiosInstance.get('theme');
        const { primaryColor: prime, secondaryColor: second } = response.data[response.data.length - 1];
        setPrimaryColor(prime);
        setSecondaryColor(second);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
      }
    };

    fetchThemeColors();
  }, []); // Fetch only once when the component mounts

  const value = {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
export { ColorProvider };
