import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import AxiosInstance from "../forms/AxiosInstance";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
//data: [2, 5.5, 2, 8.5, 1.5, 5],
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useLoggedInUser } from "../LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext , useEffect} from "react";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";

const pages = [
  { names: "HOME", links: "/user-home" },
  { names: "TELEMEDICINE", links: "/telemedicine-home" },
  { names: "MEAL PLAN SHOP", links: "/meal-plan-shop-home" },
  { names: "MEAL PLAN GENERATOR", links: "/meal-plan-generator-home" },
  { names: "FOOD JOURNAL", links: "/food-journal-home" },
  { names: "ABOUT US", links: "/about-us-user" },
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

const settings = ["Profile", "Logout"];

function MainUserNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const activeLink = " bg-blue-100 text-black";
  const normalLink = "";
  const path = location.pathname;
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();
  const { logo, setLogo } = useContext(ImageContext);
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);


    // ? anchorElNotif

    const handleOpenNotifMenu = (event) => {
      setAnchorElNotif(event.currentTarget);


      notifsData.forEach((item) => {
        if(item.seen == false){
          console.log(item)

          AxiosInstance.put(`notifications/`, {
            notif_id: item.notif_id, 
            'type': item.type, 
            'id': item.id, 
            'user_id': item.user_id, 
            'message': item.message, 
            'link': item.link, 
            'seen': 1, 
            'other_id': item.other_id,
            'title': item.title,
            'date': item.date,
          }).then((res) => {
            console.log(res, res.data);
            getNotifData()
          });
        }
    })
    };

    const handleCloseNotifMenu = (event) => {
      setAnchorElNotif(null);
      if(event != null){
        navigate(event);
        console.log("true")
      }
      
      
    };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    console.log(setting);
    switch (setting) {
      case "Logout":
        setLoggedInUser(null);
        navigate("/");
        break;
      case "Profile":
        navigate("/user-profile");
        break;
    }
    setAnchorElUser(null);
  };

  const [notifsData, setNotifsData] = useState([])
  const getNotifData = () => {
    AxiosInstance.get(`notifications`).then((res) => {
      console.log(res);
      setNotifsData(
        res.data.reverse()
      );
    });
  }

  useEffect(() => {
    getNotifData();
  }, []);

  const getNotifsNumber = () => {

    const count = notifsData.filter((item) => item.seen === false);
    console.log(count.length, notifsData)
    switch (count.length) {
      case 0: 
      return "images/notification.png"
      break;
      case 1: 
      return "images/notif1.png"
      break;
      case 2: 
      return "images/notif2.png"
      break;
      case 3: 
       return "images/notif3.png"
      break;
      case 4: 
       return "images/notif4.png"
      break;
      case 5: 
       return "images/notif5.png"
      break;
      default: 
       return "images/notif5+.png"
      break;
    }
  }

  const getNotifsImage = (type) => {

    switch (type) {
      case "PAppointment": 
      return "images/appointmentApprove.png"
      break;
      case "GReqOrder": 
      return "images/genApprove.png"
      break;
      case "RReqOrder": 
      return "images/recApprove.png"
      break;
      case "DepOrder": 
      return "images/appointmentApprove.png"
      break;
 
    }
  }
 

  return (
    <AppBar position="" className="w-full" style={{ width: "100vw" }}>
      <Container maxWidth="100%" sx={{ background: "#ffffff", paddingTop: 1 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user-home"
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* <img src="/images/logo.png" alt="Logo" /> */}
            <img src={logo} alt="Logo" width="80" height="120" />
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
              //! dito yun changes ng style
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  color: "#000000",
                  border: 2,
                },
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
                    //! changes per notif style
                    sx={{ color: "#000000" }}
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
            href="/user-home"
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
              px: 5,
              ml: "2%",
              fontSize: {
                         xs: "0.5em", 
                         sm: "1em",
                        },
            }}
          >
            {pages.map((page) => (
              // <Box
              //   sx={{
              //     borderBottom: 2,
              //     display: "flex",
              //     flexGrow: 1,
              //     justifyContent: "space-between",
              //     alignItems: "center",
              //     p: 2,
              //   }}
              //   onMouseEnter={(e) => (e.target.style.background = "#000000")}
              //   onMouseLeave={(e) => (e.target.style.background = "none")}
              //   style={{
              //     color: "#99756E",
              //     textDecoration: "none",
              //     py: "10px",
              //   }}
              // >
              <NavLink
                key={page.names}
                onClick={handleCloseNavMenu}
                sx={{
               
                  textcolor: "#99756E",
                  display: "block",
                  transition: "box-shadow 0.3s background ease-in-out", // Add transition for smooth effect

                  "&:hover": {
                    // Target the element on hover
                    background: "#d3d3d3d3",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add box-shadow property
                  },
                }}
                style={{
                  color: "#99756E",
                  textDecoration: "none",
                  //  fontWeight: "bold",
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
                //  onMouseOver={(e) => (e.target.style.background = "#e3aca5")}
                onMouseOver={(e) => (e.target.style.fontWeight = "bold")}
                //   onMouseOut={(e) => (e.target.style.background = "#FFFFFF")}
                onMouseOut={(e) => (e.target.style.fontWeight = "")}
                className="activeLink border w-full h-full px-4 centered"
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




<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Notifications">
              <IconButton onClick={handleOpenNotifMenu} sx={{ p: 0 }}>
                <Button
                  // variant="contained"
                  // className="userButton"
                  onMouseEnter={(e) =>
                    (e.target.style.background = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "#ffffff")
                  }
                  sx={{
                    borderRadius: 0,
                    background: "#ffffff",
                    mr: "0px ",
                  }}
                >
                 <img 
                 src = {getNotifsNumber()}
                 
                 width = "70%" height = "70%"/>
                </Button>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", height:"auto", width: "auto", pt: 10, color: "#ffffff"}}
              id="menu-appbar"
              anchorEl={anchorElNotif}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  width: {
                    xs: "40%",
                    sm: "60%",
                    md: "33%",
                  }, // Ensure the width of the menu is set here
                  maxWidth: "100%", // Ensure responsiveness
                  padding: "0px", // Optional: padding inside the menu
                },
              }}
              open={Boolean(anchorElNotif)}
              onClose={handleCloseNotifMenu}
            >
              <Box sx = {{py: 2, background: primaryColor, height:"auto", width: "auto", color: "#ffffff"}}>
                
                <Typography sx = {{ml: "5%", fontWeight: "bold",  fontSize: "1.2em",}}>Notifications </Typography>
                </Box>
              <Box sx = {{pb:5, mt: 0}}>
                
              {notifsData.map((not) => (
              <MenuItem
              sx = {{color: "#E66253", background: not.seen === false ? "#E7E7E7" : "#ffffff"}}
                  key={not.link}
                  onClick={() => {
                    handleCloseNotifMenu(not.link);
                  }}
                >
                  <Grid container spacing = {0} sx = {{mt: 1}}>
                    <Grid xs = {3}>
                    
                    <img 
                    src = {getNotifsImage(not.type)}
                    width = "60%" height = "90%"/></Grid>
                    <Grid xs = {8}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: 
                        {xs: "0.5em",
                          sm: "1em",
                        }
                      }}>{not.title}</Typography>
                      <Typography variant="body2"
                      sx = {{fontSize: {xs: "0.5em",
                        sm: "0.7em",
                        wordWrap: 'break-word', // Ensures long words break into the next line
          whiteSpace: 'normal',   // Ensures normal wrapping behavior
                      }}}
                      >{not.message}</Typography>
                      <Typography sx = {{fontSize: "0.7em"}}>{dayjs(not.date).format("MMMM DD, YYYY")}</Typography>
                    </Grid>
                    <Grid xs = {1} sx = {{mt: "3%"}}><img src = "/images/rightNotif.png"  width = "60%" height = "40%"/></Grid>
                  </Grid>

                  {/* <Link to={navigate}></Link> */}
                </MenuItem>
                ))}
              </Box>
              
              {/* {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNotifMenu(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <Link to={navigate}></Link>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>



          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button
                  variant="contained"
                  className="userButton"
                  onMouseEnter={(e) =>
                    (e.target.style.background = primaryColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = primaryColor)
                  }
                  sx={{
                    borderRadius: 4,
                    background: primaryColor,
                    mr: "5px ",
                    fontSize: {
                      xs: "0.4em",
                      sm: "0.5em",
                    }
                  }}
                >
                  WELCOME {loggedInUser.first_name}!
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
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <Link to={navigate}></Link>
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
