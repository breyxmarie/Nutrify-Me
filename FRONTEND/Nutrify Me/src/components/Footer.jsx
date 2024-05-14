import { useState } from "react";

function Footer() {
  return (
    <footer
      style={{
        color: "#ffffff",
        background: "#898246",
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
