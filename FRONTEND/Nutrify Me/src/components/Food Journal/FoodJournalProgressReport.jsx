import { useState } from "react";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";

function FoodJournalProgressReport() {
  const settings = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dataset = [
    [330, 57, 386, 321, "Jan"],
    [50, 52, 78, 28, "Fev"],
    [47, 53, 106, 41, "Mar"],
    [54, 56, 92, 73, "Apr"],
    [57, 69, 92, 99, "May"],
    [60, 63, 103, 144, "June"],
    [59, 60, 105, 319, "July"],
    [65, 60, 106, 249, "Aug"],
    [51, 51, 95, 131, "Sept"],
    [60, 65, 97, 55, "Oct"],
    [67, 64, 76, 48, "Nov"],
    [61, 70, 103, 25, "Dec"],
  ].map(([london, paris, newYork, seoul, month]) => ({
    london,
    paris,
    newYork,
    seoul,
    month,
  }));

  const valueFormatter = (value) => `${value}mm`;

  // * documentation: https://mui.com/x/react-charts/bars/
  const chartSetting = {
    series: [{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid xs={6}>MY CALORIE INTAKE</Grid>
        <Grid xs={6}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                FILTER BY: WEEK
              </Button>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      <div style={{ width: "100%" }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          {...chartSetting}
          slotProps={{
            bar: {
              clipPath: `inset(0px round 10px 10px 0px 0px)`,
            },
          }}
        />
      </div>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["group A", "group B", "group C"],
            colorMap: {
              type: "piecewise",
              thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
              colors: ["#E66253"],
            },
          },
        ]}
        series={[{ data: [4, 3, 5] }]}
        width={500}
        height={300}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 10px 10px 0px 0px)`,
          },
        }}
      />

      <Grid container spacing={2}>
        <Grid xs={6}>
          {" "}
          <Typography
            sx={{ color: "#99756E", fontSize: "30px", fontWeight: "bold" }}
          >
            WHAT I ATE?{" "}
          </Typography>
        </Grid>
        <Grid xs={6}>
          {" "}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                FILTER BY: WEEK
              </Button>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <Box sx={{ color: "#99756E", mx: 30 }}>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/breakfast.png" height="80" />
            </Grid>
            <Grid xs={6}>[BREAKFAST]</Grid>
            <Grid xs={3}>375 kcal</Grid>
          </Grid>
        </Box>

        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/lunch.png" height="80" />
            </Grid>
            <Grid xs={6}>[LUNCH]</Grid>
            <Grid xs={3}>375 kcal</Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/snacks.png" height="80" />
            </Grid>
            <Grid xs={6}>[SNACK]</Grid>
            <Grid xs={3}>375 kcal</Grid>
          </Grid>
        </Box>
        <hr />
        <br />
        <Box>
          {" "}
          <Grid container spacing={2}>
            <Grid xs={3}>
              <img src="/images/dinner.png" height="80" />
            </Grid>
            <Grid xs={6}>[DINNER]</Grid>
            <Grid xs={3}>375 kcal</Grid>
          </Grid>
        </Box>
      </Box>
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography
            sx={{ color: "#99756E", fontWeight: "bold", fontSize: "30px" }}
          >
            FOOD PROGRESS REPORT{" "}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Button
                variant="contained"
                className="userButton"
                onMouseEnter={(e) => (e.target.style.background = "#E66253")}
                onMouseLeave={(e) => (e.target.style.background = "#E66253")}
                sx={{ borderRadius: 4, background: "#E66253", mr: "15px " }}
              >
                <img src="/images/filter.png" height="20px" />
                FILTER BY: WEEK
              </Button>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      <center>
        <LineChart
          xAxis={[
            {
              data: [1, 2, 3, 5, 8, 10],
              colorMap: {
                type: "piecewise",
                thresholds: [0, 10],
                colors: ["#898246", "#898246"],
              },
            },
          ]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={1000}
          height={300}
          sx={{ border: 1 }}
        />
      </center>
    </div>
  );
}

export default FoodJournalProgressReport;
