import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ButtonGroup, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLoggedInUser } from "../LoggedInUserContext";
import AxiosInstance from "../forms/AxiosInstance";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@mui/material/Modal";


function UserProfile() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const [file, setFile] = useState();
  //console.log(loggedInUser);

  const [userData, setUserData] = useState();
  const GetData = async () => {
    await AxiosInstance.get(`user/`).then((res) => {
      // {
      //   res.data.map((item, index) =>
      //     console.log(item.username, item.password)
      //   );
      // }
      //console.log(res.data);
      setUserData(res.data);
    });
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    // .test("isAvailable", "Username already exists", (value) => {
    //   const updatedDiv = document.getElementById("error-message");
    //   updatedDiv.textContent = errors.username?.message;
    //   return !userData.some((user) => user.username === value); // Check if username exists in the array
    // }),
    password: yup.string().required("Password is really a requirement"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    // password: yup.string().min(8).max(32).required(),
    file: yup.mixed().optional(),
    // .test('fileSize', 'File is too large', (value) => {
    //   if (!value) return true; // Allow empty file
    //   return value.size <= 1024 * 1024; // Limit to 1 MB
    // })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    console.log(data);
    console.log(file);
    let fileName = "";
    if (data.file.length < 1) {
      console.log("no file");

      if (data.username === loggedInUser.username) {
        console.log("same");

        try {
          console.log(fileName);
          AxiosInstance.put(`user/`, {
            user_id: loggedInUser.user_id,
            username: data.username,
            password: data.password,
            first_name: data.firstname,
            last_name: data.lastname,
            privilege: "User",
            email: loggedInUser.email,
            image: loggedInUser.image,
            active: 1,
          }).then((res) => {
            console.log(res, res.data);
            // navigate("/Profiling", {
            //   state: { email: data.email, name: data.first_name },
            // });

            // navigate("/Log-In?success=newPassword");

            AxiosInstance.get(`user/`).then((res) => {
              // {
              //   res.data.map((item, index) =>
              //   //  console.log(item.username, item.password)
              //   );
              // }
              //  console.log(res.data);
              const newUser = res.data.find(
                (user) => user.user_id === loggedInUser.user_id
              );
              setLoggedInUser(newUser);

              setProfileDiv(
                <>
                  <Button
                    sx={{
                      color: "#539801",
                      border: 1,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#539801",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                    onClick={editProfile}
                  >
                    EDIT
                  </Button>
                  <Grid container spacing={2} sx={{ my: 3 }}>
                    <Grid xs={6} sx={{ ml: "30%" }}>
                      <Typography
                        sx={{
                          color: "#E66253",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Username
                      </Typography>

                      <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                        {loggedInUser.username}
                      </Typography>
                    </Grid>
                    <Grid xs={6}> </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ my: 3 }}>
                    <Grid xs={10} sx={{ ml: "30%" }}>
                      <Typography
                        sx={{
                          color: "#E66253",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Name:{" "}
                      </Typography>

                      <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                        {newUser.first_name} {""}
                        {newUser.last_name}
                      </Typography>
                    </Grid>
                    <Grid xs={6}> </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ my: 3 }}>
                    <Grid xs={2} sx={{ ml: "30%" }}>
                      <Typography
                        sx={{
                          color: "#E66253",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Passoword:{" "}
                      </Typography>

                      <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                        {newUser.password}
                      </Typography>
                    </Grid>
                    <Grid xs={6}></Grid>
                  </Grid>{" "}
                  <Grid container spacing={2} sx={{ my: 3 }}>
                    <Grid xs={2} sx={{ ml: "30%" }}>
                      <Typography
                        sx={{
                          color: "#E66253",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        E-mail:{" "}
                      </Typography>

                      <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                        {loggedInUser.email}
                      </Typography>
                    </Grid>
                    <Grid xs={6}></Grid>
                  </Grid>
                  <Box sx={{ ml: "21%", mt: "50px" }}>
                    <Typography
                      sx={{
                        color: "#99756E",
                        fontWeight: "bold",
                        fontSize: "25px",
                        float: "left",
                        ml: 20,
                      }}
                    >
                      Account Removal
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Button
                      sx={{
                        background: "#E66253",
                        color: "#ffffff",
                        float: "left",
                        ml: 20,
                        px: 3,
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: "#E66253",
                          border: 0.5,
                          borderColor: "#E66253",
                        },
                      }}
                    >
                      DEACTIVATE ACCOUNT
                    </Button>
                  </Box>
                  <br />
                  <br />
                  <br />
                  <Button
                  onClick = {logout}
                    sx={{
                      color: "#B3B3B3",
                      border: 1,
                      fontWeight: "bold",
                      px: 5,
                      "&:hover": {
                        backgroundColor: "#B3B3B3",
                        color: "#ffffff",
                        border: 0.5,
                        borderColor: "#ffffff",
                      },
                    }}
                  >
                    {" "}
                    LOG OUT
                  </Button>
                </>
              );
            });
          });
        } catch (error) {
          console.log(error.response);
        }
      } else {
        // console.log("not same");

        let check = false;
        AxiosInstance.get(`user/`).then((res) => {
          // {
          //   res.data.map((item, index) =>
          //     console.log(item.username, item.password)
          //   );
          // }
          // console.log(res.data);
          check = res.data.some((user) => user.username === data.username);
          // console.log(check);
          const updatedDiv = document.getElementById("error-message");
          if (check) {
            updatedDiv.textContent = "username taken";
            //  console.log("username taken");
          } else {
            updatedDiv.textContent = "username available";

            try {
              AxiosInstance.put(`user/`, {
                user_id: loggedInUser.user_id,
                username: data.username,
                password: data.password,
                first_name: data.firstname,
                last_name: data.lastname,
                privilege: "User",
                email: loggedInUser.email,
                image: loggedInUser.image,
                active: 1,
              }).then((res) => {
                //  console.log(res, res.data);
                // navigate("/Profiling", {
                //   state: { email: data.email, name: data.first_name },
                // });

                // navigate("/Log-In?success=newPassword");

                AxiosInstance.get(`user/`).then((res) => {
                  // {
                  //   res.data.map((item, index) =>
                  //     console.log(item.username, item.password)
                  //   );
                  // }
                  console.log(res.data);
                  const newUser = res.data.find(
                    (user) => user.user_id === loggedInUser.user_id
                  );
                  setLoggedInUser(newUser);

                  setProfileDiv(
                    <>
                      <Button
                        sx={{
                          color: "#539801",
                          border: 1,
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#539801",
                            color: "#ffffff",
                            border: 0.5,
                            borderColor: "#ffffff",
                          },
                        }}
                        onClick={editProfile}
                      >
                        EDIT
                      </Button>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={6} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Username
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {loggedInUser.username}
                          </Typography>
                        </Grid>
                        <Grid xs={6}> </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={10} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Name:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {newUser.first_name} {""}
                            {newUser.last_name}
                          </Typography>
                        </Grid>
                        <Grid xs={6}> </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={2} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Passoword:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {newUser.password}
                          </Typography>
                        </Grid>
                        <Grid xs={6}></Grid>
                      </Grid>{" "}
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={2} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            E-mail:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {loggedInUser.email}
                          </Typography>
                        </Grid>
                        <Grid xs={6}></Grid>
                      </Grid>
                      <Box sx={{ ml: "21%", mt: "50px" }}>
                        <Typography
                          sx={{
                            color: "#99756E",
                            fontWeight: "bold",
                            fontSize: "25px",
                            float: "left",
                            ml: 20,
                          }}
                        >
                          Account Removal
                        </Typography>
                        <br />
                        <br />
                        <br />
                        <Button
                          sx={{
                            background: "#E66253",
                            color: "#ffffff",
                            float: "left",
                            ml: 20,
                            px: 3,
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              color: "#E66253",
                              border: 0.5,
                              borderColor: "#E66253",
                            },
                          }}
                        >
                          DEACTIVATE ACCOUNT
                        </Button>
                      </Box>
                      <br />
                      <br />
                      <br />
                      <Button
                        sx={{
                          color: "#B3B3B3",
                          border: 1,
                          fontWeight: "bold",
                          px: 5,
                          "&:hover": {
                            backgroundColor: "#B3B3B3",
                            color: "#ffffff",
                            border: 0.5,
                            borderColor: "#ffffff",
                          },
                        }}
                      >
                        {" "}
                        LOG OUT
                      </Button>
                    </>
                  );
                });
              });
            } catch (error) {
              console.log(error.response);
            }
          }
        });
      }
    } else {
      console.log("there is  file");
      const formData = new FormData();
      formData.append("file", data.file[0]);

      try {
        //  const response =

        await AxiosInstance.post("shopmealplan/savefile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          fileName = res.data;
          console.log(fileName);

          if (data.username === loggedInUser.username) {
            console.log("same");

            try {
              console.log(fileName);
              AxiosInstance.put(`user/`, {
                user_id: loggedInUser.user_id,
                username: data.username,
                password: data.password,
                first_name: data.firstname,
                last_name: data.lastname,
                privilege: "User",
                email: loggedInUser.email,
                image:
                  "https://nightxperson.pythonanywhere.com/Photos/" + fileName,
                active: 1,
              }).then((res) => {
                //  console.log(res, res.data);
                // navigate("/Profiling", {
                //   state: { email: data.email, name: data.first_name },
                // });

                // navigate("/Log-In?success=newPassword");

                AxiosInstance.get(`user/`).then((res) => {
                  // {
                  //   res.data.map((item, index) =>
                  //   //  console.log(item.username, item.password)
                  //   );
                  // }
                  //  console.log(res.data);
                  const newUser = res.data.find(
                    (user) => user.user_id === loggedInUser.user_id
                  );
                  setLoggedInUser(newUser);

                  setProfileDiv(
                    <>
                      <Button
                        sx={{
                          color: "#539801",
                          border: 1,
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#539801",
                            color: "#ffffff",
                            border: 0.5,
                            borderColor: "#ffffff",
                          },
                        }}
                        onClick={editProfile}
                      >
                        EDIT
                      </Button>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={6} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Username
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {loggedInUser.username}
                          </Typography>
                        </Grid>
                        <Grid xs={6}> </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={10} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Name:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {newUser.first_name} {""}
                            {newUser.last_name}
                          </Typography>
                        </Grid>
                        <Grid xs={6}> </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={2} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            Passoword:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {newUser.password}
                          </Typography>
                        </Grid>
                        <Grid xs={6}></Grid>
                      </Grid>{" "}
                      <Grid container spacing={2} sx={{ my: 3 }}>
                        <Grid xs={2} sx={{ ml: "30%" }}>
                          <Typography
                            sx={{
                              color: "#E66253",
                              fontWeight: "bold",
                              textAlign: "left",
                            }}
                          >
                            E-mail:{" "}
                          </Typography>

                          <Typography
                            sx={{ color: "#99756E", textAlign: "left" }}
                          >
                            {loggedInUser.email}
                          </Typography>
                        </Grid>
                        <Grid xs={6}></Grid>
                      </Grid>
                      <Box sx={{ ml: "21%", mt: "50px" }}>
                        <Typography
                          sx={{
                            color: "#99756E",
                            fontWeight: "bold",
                            fontSize: "25px",
                            float: "left",
                            ml: 20,
                          }}
                        >
                          Account Removal
                        </Typography>
                        <br />
                        <br />
                        <br />
                        <Button
                        onClick = {deactivate}
                          sx={{
                            background: "#E66253",
                            color: "#ffffff",
                            float: "left",
                            ml: 20,
                            px: 3,
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              color: "#E66253",
                              border: 0.5,
                              borderColor: "#E66253",
                            },
                          }}
                        >
                          DEACTIVATE ACCOUNT
                        </Button>
                      </Box>
                      <br />
                      <br />
                      <br />
                      <Button
                        sx={{
                          color: "#B3B3B3",
                          border: 1,
                          fontWeight: "bold",
                          px: 5,
                          "&:hover": {
                            backgroundColor: "#B3B3B3",
                            color: "#ffffff",
                            border: 0.5,
                            borderColor: "#ffffff",
                          },
                        }}
                      >
                        {" "}
                        LOG OUT
                      </Button>
                    </>
                  );
                });
              });
            } catch (error) {
              console.log(error.response);
            }
          } else {
            // console.log("not same");

            let check = false;
            AxiosInstance.get(`user/`).then((res) => {
              // {
              //   res.data.map((item, index) =>
              //     console.log(item.username, item.password)
              //   );
              // }
              // console.log(res.data);
              check = res.data.some((user) => user.username === data.username);
              // console.log(check);
              const updatedDiv = document.getElementById("error-message");
              if (check) {
                updatedDiv.textContent = "username taken";
                //  console.log("username taken");
              } else {
                updatedDiv.textContent = "username available";

                try {
                  AxiosInstance.put(`user/`, {
                    user_id: loggedInUser.user_id,
                    username: data.username,
                    password: data.password,
                    first_name: data.firstname,
                    last_name: data.lastname,
                    privilege: "User",
                    email: loggedInUser.email,
                    image:
                      "https://nightxperson.pythonanywhere.com/Photos/" +
                      fileName,
                    active: 1,
                  }).then((res) => {
                    //  console.log(res, res.data);
                    // navigate("/Profiling", {
                    //   state: { email: data.email, name: data.first_name },
                    // });

                    // navigate("/Log-In?success=newPassword");

                    AxiosInstance.get(`user/`).then((res) => {
                      // {
                      //   res.data.map((item, index) =>
                      //     console.log(item.username, item.password)
                      //   );
                      // }
                      console.log(res.data);
                      const newUser = res.data.find(
                        (user) => user.user_id === loggedInUser.user_id
                      );
                      setLoggedInUser(newUser);

                      setProfileDiv(
                        <>
                          <Button
                            sx={{
                              color: "#539801",
                              border: 1,
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#539801",
                                color: "#ffffff",
                                border: 0.5,
                                borderColor: "#ffffff",
                              },
                            }}
                            onClick={editProfile}
                          >
                            EDIT
                          </Button>
                          <Grid container spacing={2} sx={{ my: 3 }}>
                            <Grid xs={6} sx={{ ml: "30%" }}>
                              <Typography
                                sx={{
                                  color: "#E66253",
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}
                              >
                                Username
                              </Typography>

                              <Typography
                                sx={{ color: "#99756E", textAlign: "left" }}
                              >
                                {loggedInUser.username}
                              </Typography>
                            </Grid>
                            <Grid xs={6}> </Grid>
                          </Grid>
                          <Grid container spacing={2} sx={{ my: 3 }}>
                            <Grid xs={10} sx={{ ml: "30%" }}>
                              <Typography
                                sx={{
                                  color: "#E66253",
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}
                              >
                                Name:{" "}
                              </Typography>

                              <Typography
                                sx={{ color: "#99756E", textAlign: "left" }}
                              >
                                {newUser.first_name} {""}
                                {newUser.last_name}
                              </Typography>
                            </Grid>
                            <Grid xs={6}> </Grid>
                          </Grid>
                          <Grid container spacing={2} sx={{ my: 3 }}>
                            <Grid xs={2} sx={{ ml: "30%" }}>
                              <Typography
                                sx={{
                                  color: "#E66253",
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}
                              >
                                Passoword:{" "}
                              </Typography>

                              <Typography
                                sx={{ color: "#99756E", textAlign: "left" }}
                              >
                                {newUser.password}
                              </Typography>
                            </Grid>
                            <Grid xs={6}></Grid>
                          </Grid>{" "}
                          <Grid container spacing={2} sx={{ my: 3 }}>
                            <Grid xs={2} sx={{ ml: "30%" }}>
                              <Typography
                                sx={{
                                  color: "#E66253",
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}
                              >
                                E-mail:{" "}
                              </Typography>

                              <Typography
                                sx={{ color: "#99756E", textAlign: "left" }}
                              >
                                {loggedInUser.email}
                              </Typography>
                            </Grid>
                            <Grid xs={6}></Grid>
                          </Grid>
                          <Box sx={{ ml: "21%", mt: "50px" }}>
                            <Typography
                              sx={{
                                color: "#99756E",
                                fontWeight: "bold",
                                fontSize: "25px",
                                float: "left",
                                ml: 20,
                              }}
                            >
                              Account Removal
                            </Typography>
                            <br />
                            <br />
                            <br />
                            <Button
                              sx={{
                                background: "#E66253",
                                color: "#ffffff",
                                float: "left",
                                ml: 20,
                                px: 3,
                                "&:hover": {
                                  backgroundColor: "#ffffff",
                                  color: "#E66253",
                                  border: 0.5,
                                  borderColor: "#E66253",
                                },
                              }}
                            >
                              DEACTIVATE ACCOUNT
                            </Button>
                          </Box>
                          <br />
                          <br />
                          <br />
                          <Button
                            sx={{
                              color: "#B3B3B3",
                              border: 1,
                              fontWeight: "bold",
                              px: 5,
                              "&:hover": {
                                backgroundColor: "#B3B3B3",
                                color: "#ffffff",
                                border: 0.5,
                                borderColor: "#ffffff",
                              },
                            }}
                          >
                            {" "}
                            LOG OUT
                          </Button>
                        </>
                      );
                    });
                  });
                } catch (error) {
                  console.log(error.response);
                }
              }
            });
          }
        });
      } catch (error) {
        console.error("Error uploading file:", error); // Handle errors
      }
    }

    let usernameFinal = data.username;

    // try {
    //   AxiosInstance.put(`user/`, {
    //     user_id: loggedInUser.user_id,
    //     username: data.username,
    //     password: data.password,
    //     first_name: data.firstname,
    //     last_name: data.lastname,
    //     privilege: "User",
    //     email: loggedInUser.email,
    //   }).then((res) => {
    //     console.log(res, res.data);
    //     // navigate("/Profiling", {
    //     //   state: { email: data.email, name: data.first_name },
    //     // });

    //     // navigate("/Log-In?success=newPassword");

    //     AxiosInstance.get(`user/`).then((res) => {
    //       {
    //         res.data.map((item, index) =>
    //           console.log(item.username, item.password)
    //         );
    //       }
    //       console.log(res.data);
    //       const newUser = res.data.find(
    //         (user) => user.user_id === loggedInUser.user_id
    //       );
    //       setLoggedInUser(newUser);

    //       setProfileDiv(
    //         <>
    //           <Button
    //             sx={{
    //               color: "#539801",
    //               border: 1,
    //               fontWeight: "bold",
    //               "&:hover": {
    //                 backgroundColor: "#539801",
    //                 color: "#ffffff",
    //                 border: 0.5,
    //                 borderColor: "#ffffff",
    //               },
    //             }}
    //             onClick={editProfile}
    //           >
    //             EDIT
    //           </Button>
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={10} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 Name:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {newUser.first_name} {""}
    //                 {newUser.last_name}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}> </Grid>
    //           </Grid>
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={2} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 Passoword:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {newUser.password}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}></Grid>
    //           </Grid>{" "}
    //           <Grid container spacing={2} sx={{ my: 3 }}>
    //             <Grid xs={2} sx={{ ml: "30%" }}>
    //               <Typography
    //                 sx={{
    //                   color: "#E66253",
    //                   fontWeight: "bold",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 E-mail:{" "}
    //               </Typography>

    //               <Typography sx={{ color: "#99756E", textAlign: "left" }}>
    //                 {loggedInUser.email}
    //               </Typography>
    //             </Grid>
    //             <Grid xs={6}></Grid>
    //           </Grid>
    //           <Box sx={{ ml: "21%", mt: "50px" }}>
    //             <Typography
    //               sx={{
    //                 color: "#99756E",
    //                 fontWeight: "bold",
    //                 fontSize: "25px",
    //                 float: "left",
    //                 ml: 20,
    //               }}
    //             >
    //               Account Removal
    //             </Typography>
    //             <br />
    //             <br />
    //             <br />
    //             <Button
    //               sx={{
    //                 background: "#E66253",
    //                 color: "#ffffff",
    //                 float: "left",
    //                 ml: 20,
    //                 px: 3,
    //                 "&:hover": {
    //                   backgroundColor: "#ffffff",
    //                   color: "#E66253",
    //                   border: 0.5,
    //                   borderColor: "#E66253",
    //                 },
    //               }}
    //             >
    //               DEACTIVATE ACCOUNT
    //             </Button>
    //           </Box>
    //           <br />
    //           <br />
    //           <br />
    //           <Button
    //             sx={{
    //               color: "#B3B3B3",
    //               border: 1,
    //               fontWeight: "bold",
    //               px: 5,
    //               "&:hover": {
    //                 backgroundColor: "#B3B3B3",
    //                 color: "#ffffff",
    //                 border: 0.5,
    //                 borderColor: "#ffffff",
    //               },
    //             }}
    //           >
    //             {" "}
    //             LOG OUT
    //           </Button>
    //         </>
    //       );
    //     });
    //   });
    // } catch (error) {
    //   console.log(error.response);
    // }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files[0];
    setFile(files);
    console.log(file);
    console.log(files);
    // Additional logic for preparing upload data (formData)
  };
  const click = () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);
  };

  const editProfile = () => {
    GetData();
    setProfileDiv(
      <>
        {/* <button onClick={click}>click</button> */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={10} sx={{ mx: "30%" }}>
              <Typography sx={{ color: "#000000" }}>
                Profile Picture: Upload Image:
              </Typography>

              {/* // * upload image */}
              <input
                type="file"
                {...register("file")}
                // onChange={(evt) => setFile(evt.target.files[0])}
                onChange={handleFileUpload}
              />
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Username:{" "}
              </Typography>
              <TextField
                id="username"
                name="username"
                label="Usernam,e"
                defaultValue={loggedInUser.username}
                fullWidth
                margin="dense"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                id="error-message"
              >
                {errors.username?.message}
              </Typography>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Name:{" "}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid xs={6}>
                  {" "}
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    defaultValue={loggedInUser.first_name}
                    fullWidth
                    margin="dense"
                    {...register("firstname")}
                    // error={errors.username ? true : false}
                  />
                </Grid>{" "}
                <Grid xs={6}>
                  {" "}
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    defaultValue={loggedInUser.last_name}
                    fullWidth
                    margin="dense"
                    sx={{ width: "100%" }}
                    {...register("lastname")}
                    // error={errors.username ? true : false}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={6}> </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={2} sx={{ ml: "30%" }}>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                Password:{" "}
              </Typography>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="text"
                defaultValue={loggedInUser.password}
                fullWidth
                margin="dense"
                sx={{ width: "100%" }}
                {...register("password")}
                // error={errors.username ? true : false}
              />
            </Grid>
            <Grid xs={6}></Grid>
          </Grid>{" "}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid xs={2} sx={{ ml: "30%" }}>
              <Typography
                sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
              >
                E-mail:{" "}
              </Typography>

              <Typography sx={{ color: "#99756E", textAlign: "left" }}>
                {loggedInUser.email}
              </Typography>
            </Grid>
            <Grid xs={6}></Grid>
          </Grid>
          <Box sx={{ ml: "21%", mt: "50px" }}>
            <Button
              sx={{
                background: "#E66253",
                color: "#ffffff",
                float: "left",
                ml: 20,
                px: 3,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#E66253",
                  border: 0.5,
                  borderColor: "#E66253",
                },
              }}
              type="submit"
            >
              SAVE
            </Button>
          </Box>
          <br />
          <br />
          <br />
        </form>
      </>
    );
  };

  const [profileDiv, setProfileDiv] = useState(
    <>
      <Button
        sx={{
          color: "#539801",
          border: 1,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#539801",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
        onClick={editProfile}
      >
        EDIT
      </Button>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Username
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.username}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={6} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Name:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.first_name} {"  "}
            {loggedInUser.last_name}
            {/* <Grid container spacing={2}>
              <Grid xs={6}>{loggedInUser.first_name} </Grid>
              <Grid xs={2}>{loggedInUser.last_name}</Grid>
            </Grid> */}
          </Typography>
        </Grid>
        <Grid xs={6}> </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            Password:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.password}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>{" "}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid xs={2} sx={{ ml: "30%" }}>
          <Typography
            sx={{ color: "#E66253", fontWeight: "bold", textAlign: "left" }}
          >
            E-mail:{" "}
          </Typography>

          <Typography sx={{ color: "#99756E", textAlign: "left" }}>
            {loggedInUser.email}
          </Typography>
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
      <Box sx={{ ml: "21%", mt: "50px" }}>
        <Typography
          sx={{
            color: "#99756E",
            fontWeight: "bold",
            fontSize: "25px",
            float: "left",
            ml: 20,
          }}
        >
          Account Removal
        </Typography>
        <br />
        <br />
        <br />
        <Button
          sx={{
            background: "#E66253",
            color: "#ffffff",
            float: "left",
            ml: 20,
            px: 3,
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 0.5,
              borderColor: "#E66253",
            },
          }}
        >
          DEACTIVATE ACCOUNT
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <Button
        sx={{
          color: "#B3B3B3",
          border: 1,
          fontWeight: "bold",
          px: 5,
          "&:hover": {
            backgroundColor: "#B3B3B3",
            color: "#ffffff",
            border: 0.5,
            borderColor: "#ffffff",
          },
        }}
      >
        {" "}
        LOG OUT
      </Button>
    </>
  );

  useEffect(() => {
    GetData();
    // console.log(userData);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
 
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 3,
    color: "#ffffff",
  };


  const deactivate = () => {
    try {
      AxiosInstance.put(`user/`, {
        user_id: loggedInUser.user_id,
        username: loggedInUser.username,
        password: loggedInUser.password,
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        privilege: loggedInUser.privilege,
        email: loggedInUser.email,
        active: 0,
        image: data.image,
      }).then((res) => {
        console.log(res, res.data);
        handleOpen()
      });
    } catch (error) {
      console.log(error.response);
    }
    
  }


  const leave = () => {
    navigate("/")
  }
  const logout = () => {
    
    setLoggedInUser(null);
    setNutritionists(null)
    navigate("/");
  }
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
      }}
    >

              <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={style}>
                  <Typography sx = {{color: "#000000"}}>
                    Your account has been deactivated please.
                    Please Log In to activate again
                  </Typography>

                  <Button onClick={leave}>
                    Okay</Button>

                  </Box>
                  </Modal>
      {" "}
      <center>
        {/* <img src="/images/profile pic.png" height="190" /> */}

        {/* <button onClick={console.log(file)}>click</button> */}
        <img src={loggedInUser.image} height="190" />

        <br />
        <br />
      </center>
      {profileDiv}
    </div>
  );
}

export default UserProfile;
