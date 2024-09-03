import * as React from "react";
import { useState, useEffect, useContext } from "react";
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
import AxiosInstance from "../forms/AxiosInstance";
import { NavLink, Link, useLocation } from "react-router-dom";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";
import LogIn from "../LogIn";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const pages = [
  { names: "HOME", links: "/" },
  { names: "ABOUT US", links: "/about-us" },
];

const StyledLink = `
  color: #99756e; /* Default styles */
  display: block;
  text-decoration: none;
  padding-y: 10px;

  &.active {
    color: #5754a8;
    font-weight: bold; /* Active state styles */
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LinkPages = [
  "",
  "/telemedicine-home",
  "/meal-plan-shop-home",
  "/meal-plan-generator-home",
  "/food-journal-home",
  "/about-us-user",
];
const settings = ["Profile", "Logout"];

function userNotLogInNavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const activeLink = " bg-blue-100 text-black";
  const normalLink = "";
  const path = location.pathname;
  const { logo, setLogo } = useContext(ImageContext);
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);

  useEffect(() => {
    const res = AxiosInstance.get(`foodentry`);
    console.log(primaryColor);
  }, []);

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

  const openContact = () => {
    navigate("/contact-us");
  };
  return (
    <AppBar position="">
      {/* sx={{ zIndex: -1 }} */}
      <Container
        maxWidth="100%"
        sx={{
          background: "#ffffff",
          padding: 2,
          overflow: scroll,
          width: "100vw",
        }}
      >
        <Toolbar disableGutters>
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
          ></Typography>

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
              sx={{ color: "#E66253", border: 2 }}
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
                display: { xs: "block", md: "none", color: "#000000" },
              }}
            >
              {pages.map(
                (
                  page // ! hanapin yun color ng menu button kapag nag smol yun screen
                ) => (
                  <MenuItem
                    key={page.names}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.links}
                    selected={page.links === path}
                  >
                    <Typography textAlign="center">{page.names}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Grid container spacing={3} sx={{ mt: ".5px" }}>
            <Grid xs>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  ml: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img src={logo} alt="Logo" width="80" height="120" />
              </Typography>
            </Grid>
            <Grid xs={6} sx={{ mt: "20px" }}>
              <Box sx={{ alignItems: "center", mx: "20%" }}>
                <Box // * dito yun change ng style for main nav bar
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    background: "#FFFFFF",
                    border: 1,
                    borderColor: "#000000",
                    borderRadius: 4,
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 6,
                  }}
                >
                  {pages.map((page) => (
                    <NavLink
                      key={page.names}
                      onClick={handleCloseNavMenu}
                      sx={{
                        textcolor: "#99756E",
                        display: "block",
                      }}
                      style={{
                        color: "#99756E",
                        textDecoration: "none",
                        //height: "50px",
                        display: "block",
                        transition: "background-color 0.2s ease-in-out",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        "&:hover": {
                          // Target the element on hover
                          background: "#000000",
                          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                      // onMouseEnter={(e) =>
                      //   (e.target.style.background = "#b9a09b")
                      // }
                      // onMouseLeave={(e) =>
                      //   (e.target.style.background = "#FFFFFF")
                      // }
                      onMouseOver={(e) => (e.target.style.fontWeight = "bold")}
                      onMouseOut={(e) => (e.target.style.fontWeight = "")}
                      className="activeLink"
                      //activeClassName="StyledLink" // Define your active class in CSS
                      // className="normalLink"
                      component={Link}
                      to={page.links}
                      selected={page.links === path}
                    >
                      {/* <p className="border w-full h-full px-4 centered"> */}
                      {page.names}
                      {/* </p> */}
                    </NavLink>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid xs sx={{ mt: "25px" }}>
              {/* <Button
                variant="contained"
                //  className="userButton"
                onMouseEnter={(e) => (e.target.style.background = primaryColor)}
                onMouseLeave={(e) => (e.target.style.background = primaryColor)}
                sx={{
                  borderRadius: 4,
                  background: primaryColor,
                  mr: "15px ",
                }}
                onClick={openContact}
              >
                CONTACT US
              </Button> */}
              <Box sx={{ flexGrow: 0 }}>
                {/* <Tooltip title="Open settings"> */}
                <Box>
                  {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                  <Button
                    variant="contained"
                    //  className="userButton"
                    onMouseEnter={(e) =>
                      (e.target.style.background = primaryColor)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = primaryColor)
                    }
                    sx={{
                      borderRadius: 4,
                      background: primaryColor,
                      mr: "15px ",
                    }}
                    onClick={openContact}
                  >
                    CONTACT US
                  </Button>
                  {/* </IconButton> */}
                </Box>
                {/* </Tooltip> */}
                <Box sx={{ my: "5px" }}>
                  <Link
                    href=""
                    component={Link}
                    to={"/Log-In"}
                    style={{ color: "#898246", textDecoration: "underline" }}
                  >
                    Log In
                  </Link>{" "}
                  &nbsp; &nbsp;
                  <Link
                    href=""
                    component={Link}
                    to={"/Register"}
                    style={{ color: "#898246", textDecoration: "underline" }}
                  >
                    Sign Up
                  </Link>
                </Box>
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
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default userNotLogInNavBar;
