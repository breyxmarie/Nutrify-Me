import React, { createContext, useState, useEffect } from "react";
import AxiosInstance from "./forms/AxiosInstance";

const ImageContext = createContext({
  // logo: "/images/logoCircle.png", // Initial logo image
  logo: "/images/logo.png", // Initial logo image

  setLogo: (newLogo) => {},
});

const ImageProvider = ({ children }) => {
  // const [logo, setLogo] = useState("/images/logo.png");
  const [logo, setLogo] = useState();

  const value = { logo, setLogo };

  useEffect(() => {
    const res = AxiosInstance.get(`theme`);
    AxiosInstance.get(`theme`).then((res) => {
      console.log(res.data[0].primaryColor);
      console.log(res.data);

      const logo = res.data[res.data.length - 1].logo;

      setLogo(logo);
    });
  }, []);

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

export default ImageContext;
export { ImageProvider }; // Export the provider separately
