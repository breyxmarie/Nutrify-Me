import { useState } from "react";
import Box from "@mui/material/Box";

function MealPlanGeneratorConsent() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundImage: "url('/images/telemedPic.png')",
          width: "90%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: "0",
          justifyContent: "center",
          objectFit: "cover",
          display: "flex",
          alignItems: "center",
          ml: 10,
        }}
      />
    </div>
  );
}

export default MealPlanGeneratorConsent;
