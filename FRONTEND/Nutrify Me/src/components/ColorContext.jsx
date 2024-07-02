import React, { createContext, useState } from "react";

const ColorContext = createContext({
  primaryColor: "#E66253",
  secondaryColor: "#898246",
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
});

const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("#E66253");
  const [secondaryColor, setSecondaryColor] = useState("#898246");

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
