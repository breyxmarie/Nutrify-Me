import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink, Link, useLocation } from "react-router-dom";
import AxiosInstance from "../forms/AxiosInstance";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function HomePage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [verifyNutritonist, setVerifyNutritonist] = useState([]);
  const [nutritionist, setNutritionist] = useState([]);
  const [selectedNutritionist, setSelectedNutritionist] = useState(null);

  // ? email

  const sendEmail = (forms) => {
    //  e.preventDefault();

    // .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
    //   publicKey: "YOUR_PUBLIC_KEY",
    // })

    console.log(forms);
    emailjs
      .send("service_wg6c081", "template_e9zxk26", forms, {
        publicKey: "Edy32nqIcGC7RcJ0z",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  //!
  // ? modal

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 5,
    color: "#ffffff",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (nutritionistData, index) => {
    setSelectedNutritionist(nutritionistData); // Store selected data
    setOpen(true); // Open the modal
  };
  const handleClose = () => setOpen(false);

  const [selectedVerifyNutritionist, setSelectedVerifyNutritionist] =
    useState(null);

  const [openVerify, setOpenVerify] = useState(false);
  const handleOpenVerify = (nutritionistData, index) => {
    setSelectedVerifyNutritionist(nutritionistData); // Store selected data
    setOpenVerify(true); // Open the modal
  };
  const handleCloseVerify = () => setOpenVerify(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [openUser, setOpenUser] = useState(false);
  const handleOpenUser = (User, index) => {
    setSelectedUser(User); // Store selected data
    setOpenUser(true); // Open the modal
  };
  const handleCloseUser = () => setOpenUser(false);

  //?

  // TODO Reactivate and Deactivate

  const activateAccounts = (data) => {
    try {
      AxiosInstance.put(`user/`, {
        user_id: data.user_id,
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        privilege: "User",
        email: data.email,
        active: 1,
        image: data.image,
      }).then((res) => {
        console.log(res, res.data);
        navigate("/admin-home");
        GetData();
        // navigate("/Profiling", {
        //   state: { email: data.email, name: data.first_name },
        // });

        //navigate("/Log-In?success=newPassword");
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const deactivateAccounts = (data) => {
    try {
      AxiosInstance.put(`user/`, {
        user_id: data.user_id,
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        privilege: data.privilege,
        email: data.email,
        active: 0,
        image: data.image,
      }).then((res) => {
        console.log(res, res.data);
        GetData();
        navigate("/admin-home");
        // navigate("/Profiling", {
        //   state: { email: data.email, name: data.first_name },
        // });

        // navigate("/Log-In?success=newPassword");
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const verifyNutritionistClick = (data) => {
    console.log(data);

    try {
      AxiosInstance.post(`user/`, {
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        privilege: "Nutritionist",
        email: data.email,
        image: "http://127.0.0.1:8000/Photos/profile.png",
        active: 1,
      }).then((res) => {
        console.log(res);

        try {
          AxiosInstance.post(`nutritionist/`, {
            user_id: res.data.id,
            username: data.username,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            license_id: data.license_id,
            schedule_day: [],
            schedule_time: [],
            image: "http://127.0.0.1:8000/Photos/profile.png",
            license_pic: data.license_pic,
          }).then((res) => {
            console.log(res);
            alert("Nutritionist Verified");

            // navigate("/?success=registered");
          });
        } catch (error) {
          console.log(error.response.data);
        }
      });
    } catch (error) {
      console.log(error.response);
    }

    try {
      AxiosInstance.delete(`verifynutritionist/` + data.verify_id, {}).then(
        (res) => {
          console.log(res);
        }
      );
    } catch (error) {
      console.log(error.response);
    }

    const forms = {
      email: data.email,
      name: data.first_name,
    };

    sendEmail(forms);
    GetData();
    handleCloseVerify();
  };

  // TODO

  const GetData = async () => {
    await AxiosInstance.get(`user/`)
      .then((res) => {
        setUserData(res.data.filter((item) => item.privilege == "User"));
        // setNutritionist(
        //   res.data.filter((item) => item.privilege == "Nutritionist")
        // );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });

    await AxiosInstance.get(`nutritionist/`)
      .then((res) => {
        //  setUserData(res.data.filter((item) => item.privilege == "User"));
        setNutritionist(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });

    await AxiosInstance.get(`verifynutritionist/`)
      .then((res) => {
        setVerifyNutritonist(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally display an error message to the user
        //setNutritionist(options);
        // console.log("test", nutritionist);
      });
  };

  useEffect(() => {
    GetData();
    console.log(userData);
  }, []);
  const users = [
    { patientId: "01", username: "juandelacruz" },
    { patientId: "02", username: "juandelacruz" },
    { patientId: "03", username: "juandelacruz" },
    { patientId: "04", username: "juandelacruz" },
  ];

  const dietician = [
    { dieticianId: "01", username: "juandelacruz" },
    { dieticianId: "02", username: "juandelacruz" },
    { dieticianId: "03", username: "juandelacruz" },
    { dieticianId: "04", username: "juandelacruz" },
  ];
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#99756E",
      }}
    >
      <Box
        sx={{
          border: 2,
          borderRadius: 4,
          py: 5,
          mx: "7%",
          borderColor: "#898246",
        }}
      >
        <Grid container spacing={2} sx={{ color: "#99756E" }}>
          <Grid xs={6} sx={{ mx: 0 }}>
            <Typography
              sx={{
                color: "#99756E",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "30px",
                mx: "70px",
              }}
            >
              Good Morning, <br /> Admin!
            </Typography>
          </Grid>

          <Grid xs={6} sx={{ float: "right" }}>
            Date Today
          </Grid>
        </Grid>
      </Box>

      <Typography
        sx={{
          textAlign: "left",
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        MANAGE PATIENTS
      </Typography>

      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
        </Grid>
        <hr />

        {userData.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.user_id}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                onClick={() => handleOpenUser(item, index)}
                sx={{
                  background: " #898246",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#898246",
                    border: 0.5,
                    borderColor: "#898246",
                  },
                }}
              >
                EDIT
              </Button>
            </Grid>

            <Modal
              open={openUser}
              onClose={handleCloseUser}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid xs={2}>
                    {" "}
                    <img src="/images/food journal icon.png" />
                  </Grid>
                  <Grid xs={8}>Manage User</Grid>
                  <Grid xs={2}>
                    <Button
                      //  key={index}
                      sx={{ float: "right" }}
                      onClick={() => handleCloseUser()}
                    >
                      <img src="/images/close.png" height="10" weight="10" />
                    </Button>
                  </Grid>
                </Grid>
                <img src={selectedUser?.image} width="300" height="150" />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid>
                    <Typography>Username: </Typography>
                    <Typography>First Name: </Typography>
                    <Typography>Last Name: </Typography>
                    <Typography>Email: </Typography>
                    <Typography>Phone Number: </Typography>
                  </Grid>
                  <Grid>
                    {selectedUser?.username} <br />
                    {selectedUser?.first_name} <br />
                    {selectedUser?.last_name} <br />
                    {selectedUser?.email} <br />
                    {selectedUser?.phone} <br />
                  </Grid>
                </Grid>
              </Box>
            </Modal>

            <Grid xs={3}>
              {/* <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
              >
                DEACTIVATE
              </Button> */}

              {item.active ? (
                <Button
                  onClick={() => deactivateAccounts(item)}
                  sx={{
                    background: "#E66253",
                    color: "#ffffff",
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#E66253",
                      border: 0.5,
                      borderColor: "#E66253",
                    },
                  }}
                >
                  DEACTIVATE
                </Button>
              ) : (
                <Button
                  onClick={() => activateAccounts(item)}
                  sx={{
                    background: "#E66253",
                    color: "#ffffff",
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#E66253",
                      border: 0.5,
                      borderColor: "#E66253",
                    },
                  }}
                >
                  ACTIVATE
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
      {/* <Link to="/admin-patients" sx={{ mx: "30px" }}>
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            px: 4,
            my: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          VIEW MORE
        </Button>
      </Link> */}

      <Typography
        sx={{
          textAlign: "left",
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        MANAGE NUTRITIONIST
      </Typography>

      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
          <Grid xs={3}>License</Grid>
        </Grid>
        <hr />

        {nutritionist.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.nutritionist_id}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                onClick={() => handleOpen(item, index)}
                sx={{
                  background: "#616161",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#616161",
                    border: 0.5,
                    borderColor: "#616161",
                  },
                }}
              >
                VIEW
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button
                sx={{
                  background: "#E66253",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#E66253",
                    border: 0.5,
                    borderColor: "#E66253",
                  },
                }}
              >
                DEACTIVATE
              </Button>
            </Grid>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid xs={2}>
                    {" "}
                    <img src="/images/food journal icon.png" />
                  </Grid>
                  <Grid xs={8}>Nutritionist</Grid>
                  <Grid xs={2}>
                    <Button
                      //  key={index}
                      sx={{ float: "right" }}
                      onClick={() => handleClose()}
                    >
                      <img src="/images/close.png" height="10" weight="10" />
                    </Button>
                  </Grid>
                </Grid>
                <img
                  src={selectedNutritionist?.image}
                  style={{ marginBottom: 2 }}
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid>
                    <Typography>Username: </Typography>
                    <Typography>First Name: </Typography>
                    <Typography>Last Name: </Typography>
                  </Grid>
                  <Grid>
                    {selectedNutritionist?.username} <br />
                    {selectedNutritionist?.first_name} <br />
                    {selectedNutritionist?.last_name} <br />
                  </Grid>
                </Grid>
                <Typography>Schedule</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid xs={6}>
                    {" "}
                    Day
                    {selectedNutritionist?.schedule_day.map((items) => (
                      <Typography>{items}</Typography>
                    ))}
                  </Grid>
                  <Grid xs={6}>
                    {" "}
                    Time
                    {selectedNutritionist?.schedule_time.map((items) => (
                      <Typography>{items}</Typography>
                    ))}
                  </Grid>
                </Grid>
                License: <br />
                <img
                  src={selectedNutritionist?.license_pic}
                  style={{ marginBottom: 2 }}
                  width="300"
                  height="100"
                />
              </Box>
            </Modal>
          </Grid>
        ))}
      </Box>

      <Typography
        sx={{
          textAlign: "left",
          mx: 10,
          my: 5,
          color: "#99756E",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        DIETICIAN VERIFICATION
      </Typography>

      <Box sx={{ border: 1, py: 3, mx: 10, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>Patient ID</Grid>
          <Grid xs={3}>Username</Grid>
          <Grid xs={3}>License</Grid>
        </Grid>
        <hr />

        {verifyNutritonist.map((item, index) => (
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid xs={3} sx={{ float: "left" }}>
              {item.verify_id}
            </Grid>
            <Grid xs={3}>{item.username}</Grid>
            <Grid xs={3}>
              <Button
                onClick={() => handleOpenVerify(item, index)}
                sx={{
                  background: "#616161",
                  color: "#ffffff",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#616161",
                    border: 0.5,
                    borderColor: "#616161",
                  },
                }}
              >
                VIEW
              </Button>
            </Grid>

            <Modal
              open={openVerify}
              onClose={handleCloseVerify}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid xs={2}>
                    {" "}
                    <img src="/images/food journal icon.png" />
                  </Grid>
                  <Grid xs={8}>Verify Nutritionist</Grid>
                  <Grid xs={2}>
                    <Button
                      //  key={index}
                      sx={{ float: "right" }}
                      onClick={() => handleCloseVerify()}
                    >
                      <img src="/images/close.png" height="10" weight="10" />
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid>
                    <Typography>Username: </Typography>
                    <Typography>First Name: </Typography>
                    <Typography>Last Name: </Typography>
                    <Typography>Email: </Typography>
                    <Typography>Phone Number: </Typography>
                  </Grid>
                  <Grid>
                    {selectedVerifyNutritionist?.username} <br />
                    {selectedVerifyNutritionist?.first_name} <br />
                    {selectedVerifyNutritionist?.last_name} <br />
                    {selectedVerifyNutritionist?.email} <br />
                    {selectedVerifyNutritionist?.phone} <br />
                  </Grid>
                </Grid>

                <Typography>License</Typography>
                <img
                  src={selectedVerifyNutritionist?.license_pic}
                  width="300"
                  height="150"
                />
                <br />
                <Button
                  onClick={() =>
                    verifyNutritionistClick(selectedVerifyNutritionist)
                  }
                  sx={{
                    background: "#898246",

                    color: "#ffffff",
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#898246",
                      border: 0.5,
                      borderColor: "#898246",
                    },
                  }}
                >
                  VERIFY
                </Button>
              </Box>
            </Modal>
            <Grid xs={3}></Grid>
          </Grid>
        ))}
      </Box>

      {/* <Link to="/admin-dietician" sx={{ mx: "30px" }}>
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            px: 4,
            my: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          VIEW MORE
        </Button>
      </Link> */}
    </div>
  );
}

export default HomePage;
