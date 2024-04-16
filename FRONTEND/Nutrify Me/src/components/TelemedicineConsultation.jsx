import MainUserNavbar from "./MainUserNavbar";
import TeleMedNavBar from "./TeleMedNavBar";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import UserFooter from "./UserFooter";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function TelemedidinceConsultation() {
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      {" "}
      {/* <MainUserNavbar />
      <TeleMedNavBar /> */}
      <Box sx={{ mx: 10 }}>
        <Grid
          container
          spacing={2}
          sx={{ textAlign: "none", pt: 1, border: 1 }}
        >
          <Grid xs={2}>
            <img
              src="/images/logoCircle.png"
              width="60px"
              height="60px"
              style={{}}
            />
          </Grid>
          <Grid xs={2} sx={{ textAlign: "left" }}>
            Name: <br />
            <Grid container spacing={2} sx={{ mt: "5px" }}>
              <Grid xs={2}>
                <CircleIcon sx={{ mt: 1, width: 10, color: "green" }} />
              </Grid>
              <Grid sx={{ mt: "9px" }}>Active Now</Grid>
            </Grid>
          </Grid>
          <Grid xs={8}>
            <Box sx={{ float: "right", mr: "150px" }}>
              11:11
              <Button
                sx={{ background: "#E66253", color: "#ffffff", px: 3, ml: 3 }}
              >
                <img
                  src="/images/end-call.png"
                  width="30px"
                  height="30px"
                  style={{ margin: 5 }}
                />
                Leave
              </Button>
            </Box>
          </Grid>
          <br />
          <hr />
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0, border: 1 }}>
          <Grid xs={8}>
            <Box
              sx={{
                backgroundImage: "url('/images/telemedPic.png')",
                width: "100%",
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                px: "0",
                justifyContent: "center",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                sx={{
                  background: "#E66253",
                  borderRadius: 5,
                  mx: "35%",
                  mt: "400px",
                  alignItems: "center",
                }}
              >
                <Grid xs={4}>
                  <Button>
                    <img
                      src="/images/microphone.png"
                      width="30px"
                      height="30px"
                      style={{ margin: 5 }}
                    />
                  </Button>
                </Grid>

                <Grid xs={4}>
                  <Button sx={{ background: "#ffffff" }}>
                    <img
                      src="/images/comment.png"
                      width="30px"
                      height="30px"
                      style={{ margin: 5 }}
                    />
                  </Button>
                </Grid>

                <Grid xs={4}>
                  <Button>
                    <img
                      src="/images/video.png"
                      width="30px"
                      height="30px"
                      style={{ margin: 5 }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid xs={4}>
            <Grid container spacing={2} sx={{ mt: "450px", ml: "0px" }}>
              <Grid xs={2}>
                {" "}
                <Button>
                  <img
                    src="/images/clip 1.png"
                    width="30px"
                    height="30px"
                    style={{ margin: 5 }}
                  />
                </Button>
              </Grid>
              <Grid xs={8}>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
                  multiline
                  rows={1}
                  placeholder="Type message here"
                />
              </Grid>
              <Grid xs={2}>
                {" "}
                <Button>
                  <img
                    src="/images/paper-plane (1) 1.png"
                    width="30px"
                    height="30px"
                    style={{ margin: 5 }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TelemedidinceConsultation;
