import { Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";
import ReactColorPicker from "@super-effective/react-color-picker";
import { HexColorPicker } from "react-colorful";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AxiosInstance from "../forms/AxiosInstance";

function Customization() {
  const { logo, setLogo } = useContext(ImageContext);
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);
  const [colorPrimary, setColorPrimary] = useState("#000000");
  const [colorSecondary, setColorSecondary] = useState("#000000");

  const onColorChangePrimary = (updatedColor) => {
    setColorPrimary(updatedColor);
  };

  const onColorChangeSecondary = (updatedColor) => {
    setColorSecondary(updatedColor);
    setPrimaryColor(updatedColor);
  };

  const changeColor = () => {
    setPrimaryColor(colorPrimary);
    setSecondaryColor(colorSecondary);
  };

  const [file, setFile] = useState();

  const changeLogo = async () => {
    if (!file) {
      return alert("Please select a file to upload");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await AxiosInstance.post("savefile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data); // Handle successful response
        setLogo(
          "https://nightxperson.pythonanywhere.com/Photos/" + response.data
        );
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }
    }
  };
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >
      <Typography>Customize the Websites Theme!</Typography>
      <br />
      <Grid container spacing={2} sx={{ mx: 0 }}>
        <Grid xs={6}>
          {" "}
          Primary Color:
          {colorPrimary}
          <center>
            <HexColorPicker
              color={colorPrimary}
              onChange={onColorChangePrimary}
            />
            <Box sx={{ background: colorPrimary, width: "55px" }}>&nbsp;</Box>
          </center>
        </Grid>
        <Grid xs={6}>
          {" "}
          Secondary Color:
          {colorSecondary}
          <center>
            <HexColorPicker
              color={colorSecondary}
              onChange={onColorChangeSecondary}
            />
            <Box sx={{ background: colorSecondary, width: "55px" }}>&nbsp;</Box>
          </center>
        </Grid>
      </Grid>
      <Button
        onClick={changeColor}
        sx={{
          background: secondaryColor,
          color: "#ffffff",
          px: 4,
          "&:hover": {
            backgroundColor: "#ffffff",
            color: secondaryColor,
            border: 0.5,
            borderColor: secondaryColor,
          },
        }}
      >
        Save
      </Button>
      <br />
      <input
        type="file"
        onChange={(evt) => setFile(evt.target.files[0])}
        //  onChange={handleFileUpload}
      />{" "}
      <br />
      <Button
        onClick={changeLogo}
        sx={{
          background: primaryColor,
          color: "#ffffff",
          px: 4,
          "&:hover": {
            backgroundColor: "#ffffff",
            color: primaryColor,
            border: 0.5,
            borderColor: primaryColor,
          },
        }}
      >
        Change Logo
      </Button>
    </div>
  );
}

export default Customization;
