import React, { createContext, useState } from "react";

const ImageContext = createContext({
  // logo: "/images/logoCircle.png", // Initial logo image
  logo: "/images/logo.png", // Initial logo image

  setLogo: (newLogo) => {},
});

const ImageProvider = ({ children }) => {
  const [logo, setLogo] = useState("/images/logo.png");

  const value = { logo, setLogo };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

export default ImageContext;
export { ImageProvider }; // Export the provider separately
