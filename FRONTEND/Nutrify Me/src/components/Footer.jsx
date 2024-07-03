import { useState, useContext } from "react";
import ColorContext from "./ColorContext"; // Import the context
import ImageContext from "./ImageContext";

function Footer() {
  const { logo, setLogo } = useContext(ImageContext);

  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);
  return (
    <footer
      style={{
        color: "#ffffff",
        background: secondaryColor,
        width: "100vw",
        height: "70px",
      }}
    >
      {" "}
      <p
        className="copyright"
        style={{
          fontWeight: "bold",
          pl: 5,
          float: "left",
          marginLeft: "60px",
          marginTop: "25px",
        }}
      >
        Copyright {new Date().getFullYear()} NutrifyMe. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
