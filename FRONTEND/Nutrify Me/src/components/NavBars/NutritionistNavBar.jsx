import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../LoggedInUserContext";
import ColorContext from "../ColorContext"; // Import the context
import ImageContext from "../ImageContext";
import { useState, useRef, useContext, useEffect} from "react";
import AxiosInstance from "../forms/AxiosInstance";

const pages = [
  { names: "HOME", links: "/nutritionist-home" },
  { names: "APPOINTMENTS", links: "/nutritionist-appointment" },
  { names: "PATIENTS", links: "/nutritionist-patient" },
  { names: "APPROVE MEAL PLAN", links: "/nutritionist-approve-meal-plan" },

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

function NutritionistNavBar() {
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist }  = useLoggedInUser();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const activeLink = " bg-blue-100 text-black";
  const normalLink = "";
  const path = location.pathname;
  const navigate = useNavigate();
  const { logo, setLogo } = useContext(ImageContext);

  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useContext(ColorContext);

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
        navigate("/nutritionist-profile");
        break;
    }
    setAnchorElUser(null);
  };

  //? notifs stuff

  
   // ? anchorElNotif
   const [anchorElNotif, setAnchorElNotif] = useState(null);
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

  const handleCloseNotifMenu = (event, type) => {
    setAnchorElNotif(null);
    if(event != null){

      if (type === "DepOrder") {
        window.open(event, '_blank');
      }
      else {
        navigate(event);
      }

      
      console.log("true")
    }
    
    
  };

  const [notifsData, setNotifsData] = useState([])
  const getNotifData = () => {
    AxiosInstance.get(`notifications`).then((res) => {
      console.log(res);
      setNotifsData(
        res.data.reverse().filter((item) => item.user_id === nutritionist.nutritionist_id)
      );
    });


    AxiosInstance.get(`notifications`).then((respo) => {
      const tempNotif = respo.data.filter((item) => item.user_id === nutritionist.nutritionist_id 
                                      && item.date === dayjs().format("YYYY-MM-DD") && item.type === "MakeApoointment")
      console.log(tempNotif.length, "hi")
      if (tempNotif.length === 0) {
        try {
          AxiosInstance.post(`notifications/`, {
          'type': "MakeApoointment", 
          'id': loggedInUser.user_id, 
          'user_id': nutritionist.nutritionist_id, 
          'message': 
          `You have pending Appointments please Approve/Disapprove it`, 
          'link': '/nutritionist-patient', 
          'seen': 0, 
          'other_id': loggedInUser.user_id,
          'title': "Pending Appointments",
          'date': dayjs().format("YYYY-MM-DD"),
        }).then((res) => {
          console.log(res, res.data);
        });
        } catch (error) {
          console.log(error.response.data);
        }
      }
      // tempNotif.forEach((item1) => {
      //   if (temp.length > 0){
      //     if (item1.date === dayjs().format("YYYY-MM-DD")){

      //     }
      //   }
      // })
    })
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
      case "NewApp": 
      return "images/NewApp.png"
      break;
      case "MakeApoointment": 
      return "images/MakeApoointment.png"
      break;
    
     
 
    }
  }


  //?

  return (
    <AppBar position="" className="w-full" style={{ width: "100vw" }}>
      <Container maxWidth="100%" sx={{ background: "#ffffff", padding: 2 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            {/* <img src="/images/logo.png" alt="Logo" /> */}
            <img src="/images/logo.png" alt="Logo" width="80" height="120" />
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
              px: 7,
              mx: 9,
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
                }}
                style={{
                  color: "#99756E",
                  textDecoration: "none",
                  //height: "50px",
                  display: "block",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseOver={(e) => (e.target.style.fontWeight = "bold")}
                onMouseOut={(e) => (e.target.style.fontWeight = "")}
                className="activeLink"
                //activeClassName="StyledLink" // Define your active class in CSS
                // className="normalLink"
                component={Link}
                to={page.links}
                selected={page.links === path}
              >
                <p className="border w-full h-full px-4 centered">
                  {page.names}
                </p>
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
                    handleCloseNotifMenu(not.link, not.type);
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
                          wordWrap: 'break-word', // Ensures long words break into the next line
                          whiteSpace: 'normal',   // Ensures normal wrapping behavior
                       
                        }
                      }}>{not.title}</Typography>
                      <Typography variant="body2"
                      sx = {{fontSize: {xs: "0.5em",
                        sm: "0.7em",
                        wordWrap: 'break-word', // Ensures long words break into the next line
          whiteSpace: 'normal',   // Ensures normal wrapping behavior
                      }}}
                      >{not.message}</Typography>
                      <Typography sx = {{fontSize: "0.5em", mt: 0.5, color: "#898246", fontWeight: "bold"}}>{dayjs(not.date).format("MMMM DD, YYYY")}</Typography>
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
                  onMouseOver={(e) =>
                    (e.target.style.background = primaryColor)
                  }
                  onMouseOut={(e) => (e.target.style.background = primaryColor)}
                  sx={{
                    borderRadius: 4,
                    background: primaryColor,
                    mr: "15px ",
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
export default NutritionistNavBar;
