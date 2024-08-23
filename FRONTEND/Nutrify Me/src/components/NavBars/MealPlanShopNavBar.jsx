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
import { NavLink, Link, useLocation } from "react-router-dom";

const pages = [
  { names: "SHOP", links: "/meal-plan-shop-home" },
  { names: " MEAL PLANS", links: "/meal-plan-shop-meal-plans" },
  // { names: "MEAL PLAN HISTORY", links: "/meal-plan-shop-meal-plan-history" },
  { names: "REQUEST ORDERS", links: "/meal-plan-shop-request" },
  { names: "TRACK ORDERS", links: "/meal-plan-shop-track-orders" },
];

const settings = ["Profile", "Logout"];

function MealPlanShopNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const activeLink = " bg-blue-100 text-black";
  const normalLink = "";
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
    <AppBar
      onUpdate={() => window.scrollTo(0, 0)}
      position=""
      className="w-full"
      style={{ top: "125px", height: "0px", width: "100vw" }}
    >
      <Container maxWidth="100%" sx={{ background: "#ffffff", padding: 0 }}>
        <Toolbar disableGutters>
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
          ></Typography>
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
              px: 2,
              ml: "20%",
              mr: "10%",
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
                onMouseOver={(e) => (e.target.style.background = "#b9a09b")}
                onMouseOut={(e) => (e.target.style.background = "#FFFFFF")}
                className="activeLink"
                //activeClassName="StyledLink" // Define your active class in CSS
                // className="normalLink"
                component={Link}
                to={page.links}
                selected={page.links === path}
              >
                {page.names}
              </NavLink>
            ))}
          </Box>
          <Link to="/meal-plan-shop-cart" sX={{ mx: "30px" }}>
            <img
              src="/images/shopping cart.png"
              style={{ marginRight: "170px" }}
              width="45"
              height="45"
            />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MealPlanShopNavBar;
