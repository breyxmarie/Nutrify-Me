import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
//import logo from "./images/logo.png";
import { NavLink, Link, useLocation } from "react-router-dom";
// const pages = [
//   "HOME",
//   "TELEMEDICINE",
//   "MEAL PLAN SHOP",
//   "MEAL PLAN GENERATOR",
//   "FOOD JOURNAL",
//   "ABOUT US",
// ];

const pages = [
  { names: "HOME", links: "" },
  { names: "TELEMEDICINE", links: "/telemedicine-home" },
  { names: "MEAL PLAN SHOP", links: "/meal-plan-shop-home" },
  { names: "MEAL PLAN GENERATOR", links: "/meal-plan-generator-home" },
  { names: "FOOD JOURNAL", links: "/food-journal-home" },
  { names: "ABOUT US", links: "/about-us-user" },
];
const LinkPages = [
  "",
  "/telemedicine-home",
  "/meal-plan-shop-home",
  "/meal-plan-generator-home",
  "/food-journal-home",
  "/about-us-user",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MainUserNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const path = location.pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl" sx={{ background: "#ffffff", padding: 2 }}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="/images/logo.png" alt="Logo" />
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.names}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.links}
                  selected={page.links === path}
                >
                  <Typography textAlign="center">{page.names}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box // * dito yun change ng style for main nav bar
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              background: "#FFFFFF",
              border: 2,
              borderColor: "#000000",
              borderRadius: 4,
              px: 6,
            }}
          >
            {pages.map((page) => (
              // <Button
              //   key={page.names}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: "#99756E", display: "block" }}
              //   component={Link}
              //   to={page.links}
              //   selected={page.links === path}
              // >
              //   {page.names}
              // </Button>
              <Box sx={{ m: 2 }}>
                <NavLink
                  key={page.names}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 6,
                    p: 6,
                    textcolor: "#99756E",
                    display: "block",
                  }}
                  style={{
                    color: "#99756E",
                    textDecoration: "none",
                    py: "10px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecorationLine = "underline")
                  }
                  onMouseLeave={(e) => (
                    (e.target.style.color = "#99756E"),
                    (e.target.style.background = "white")(
                      (e.target.style.textDecorationLine = "none")
                    )
                  )}
                  activeStyle={{ color: "#5754a8" }}
                  component={Link}
                  to={page.links}
                  selected={page.links === path}
                >
                  {page.names}
                </NavLink>
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainUserNavbar;
