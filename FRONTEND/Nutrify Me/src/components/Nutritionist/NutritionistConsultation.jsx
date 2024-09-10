import { useEffect, useRef, useState, useMemo } from "react";
import { NavLink, Link, useLocation, useParams } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { useLoggedInUser } from "../LoggedInUserContext";
//
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../api";
import ReactPlayer from "react-player";
import AxiosInstance from "../forms/AxiosInstance";

function NutritionistHome() {
  const location = useLocation();
  console.log(location);
  const { loggedInUser, setLoggedInUser, nutritionist, setnNutritionist } =
    useLoggedInUser();
  // const APP_ID = "da6708a41b464c7fb30a7bb85468663b";
  // const TOKEN =
  //   "007eJxTYNgo7/7gmKK17tGmvXNZXURTHti8Dvs+55Ts1bPfFZ3FDtkrMKQkmpkbWCSaGCaZmJkkm6clGRskmiclWZiamFmYmRkn/VcySmsIZGSIDZdgZmSAQBCfh8E5P6+4NKcksSQzP4+BAQAvoyGl";
  // const CHANNEL = "Consultation";

  // const clients = AgoraRTC.createClient({
  //   mode: "rtc",
  //   codec: "vp8",
  // });

  //! video conferencign ito na talaga
  const micRef = useRef(null);

  function Mute(props) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [isMuted, setIsMuted] = useState(false);
    const [micIcon, setMicIcon] = useState("/images/microphone.png");

    const handleClick = () => {
      toggleMic();
      setIsMuted(!isMuted);
      setMicIcon(isMuted ? "/images/microphone.png" : "/images/mute.png"); // Update icon based on muted state
    };

    return (
      <Button onClick={() => handleClick()}>
        <img src={micIcon} width="30px" height="30px" style={{ margin: 5 }} />
      </Button>
    );
  }

  function Webcam(props) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [isOn, setIsOn] = useState(false);
    const [webIcon, setWebIcon] = useState("/images/video.png");

    const handleClicks = () => {
      toggleWebcam();
      setIsOn(!isOn);
      setWebIcon(isOn ? "/images/video.png" : "/images/off.png"); // Update icon based on muted state
    };

    return (
      <Button onClick={() => handleClicks()}>
        <img src={webIcon} width="30px" height="30px" style={{ margin: 5 }} />
      </Button>
    );
  }

  //! my view
  function ParticipantView2(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);

    return (
      <>
        {/* <p>
            Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
            {micOn ? "ON" : "OFF"}
          </p> */}
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        )}
        {/* <Grid
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
              
                <Leave />
              </Box>
            </Grid>
          </Grid>
  
          <Grid container spacing={2} sx={{ mt: 0, border: 1 }}>
            <Grid xs={8}>
              <Box
                sx={{
                  // backgroundImage: "url('/images/telemedPic.png')",
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
                <p>
                  Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} |
                  Mic: {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} />
                {webcamOn && (
                  <ReactPlayer
                    //
                    playsinline // extremely crucial prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"300px"}
                    width={"700px"}
                    onError={(err) => {
                      console.log(err, "participant video error");
                    }}
                  />
                )}
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
        
                    <Mute />
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
            
                    <Webcam />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid> */}
      </>
    );
  }
  //?

  function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState("hykm-ec71-maf8");
    const onClick = async () => {
      await getMeetingAndToken(meetingId);
    };
    return (
      <div>
        Meeting Ended
        {/* <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <button onClick={onClick}>Join</button>
        {" or "}
        <button onClick={onClick}>Create Meeting</button> */}
      </div>
    );
  }

  function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);

    return (
      <>
        {/* <p>
          Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
          {micOn ? "ON" : "OFF"}
        </p> */}
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        )}
        {/* <Grid
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
            
              <Leave />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0, border: 1 }}>
          <Grid xs={8}>
            <Box
              sx={{
                // backgroundImage: "url('/images/telemedPic.png')",
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
              <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} |
                Mic: {micOn ? "ON" : "OFF"}
              </p>
              <audio ref={micRef} autoPlay playsInline muted={isLocal} />
              {webcamOn && (
                <ReactPlayer
                  //
                  playsinline // extremely crucial prop
                  pip={false}
                  light={false}
                  controls={false}
                  muted={true}
                  playing={true}
                  //
                  url={videoStream}
                  //
                  height={"300px"}
                  width={"700px"}
                  onError={(err) => {
                    console.log(err, "participant video error");
                  }}
                />
              )}
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
      
                  <Mute />
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
          
                  <Webcam />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid> */}
      </>
    );
  }

  function Controls(props) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div>
        {/* <Button
          sx={{ background: "#E66253", color: "#ffffff", px: 3, ml: 3 }}
          onClick={() => leave()}
        >
          <img
            src="/images/end-call.png"
            width="30px"
            height="30px"
            style={{ margin: 5 }}
          />
          Leave
        </Button> */}
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
    );
  }

  function Leave(props) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div>
        <Button
          sx={{ background: "#E66253", color: "#ffffff", px: 3, ml: 3 }}
          onClick={() => leave()}
        >
          <img
            src="/images/end-call.png"
            width="30px"
            height="30px"
            style={{ margin: 5 }}
          />
          Leave
        </Button>
      </div>
    );
  }

  function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      //callback for when meeting is left
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
    });
    console.log([...participants.entries()].length);
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    // //! participant view

    // const micRef = useRef(null);
    // const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    //   useParticipant(props.participantId);

    // const videoStream = useMemo(() => {
    //   if (webcamOn && webcamStream) {
    //     const mediaStream = new MediaStream();
    //     mediaStream.addTrack(webcamStream.track);
    //     return mediaStream;
    //   }
    // }, [webcamStream, webcamOn]);

    // useEffect(() => {
    //   if (micRef.current) {
    //     if (micOn && micStream) {
    //       const mediaStream = new MediaStream();
    //       mediaStream.addTrack(micStream.track);

    //       micRef.current.srcObject = mediaStream;
    //       micRef.current
    //         .play()
    //         .catch((error) =>
    //           console.error("videoElem.current.play() failed", error)
    //         );
    //     } else {
    //       micRef.current.srcObject = null;
    //     }
    //   }
    // }, [micStream, micOn]);

    // //!

    useEffect(() => {
      join();
    }, []);

    return (
      <div className="container">
        {/* <h3>Meeting Id: {props.meetingId}</h3> */}
        {joined && joined == "JOINED" ? (
          <div>
            {/* <Controls /> */}
            {/* //For rendering all the participants in the meeting */}
            {/* {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))} */}

            <Box sx={{ mx: 5 }}>
              <Grid
                container
                spacing={2}
                sx={{ textAlign: "none", pt: 1, border: 1 }}
              >
                <Grid xs={12} md={2}>
                  <img
                    src={location.state.tempN.image}
                    width="60px"
                    height="60px"
                    style={{}}
                  />
                </Grid>
                <Grid xs={12} md={3} sx={{ textAlign: "left" }}>
                  <Box sx={{ ml: 5, mr: 5 }}>
                    {console.log(location)}
                    Name: {location.state.tempN.first_name} {""}
                    {location.state.tempN.last_name}
                    <br />
                    <Grid container spacing={2} sx={{ mt: "5px" }}>
                      <Grid xs={2}>
                        <CircleIcon sx={{ mt: 1, width: 10, color: "green" }} />
                      </Grid>
                      <Grid sx={{ mt: "9px" }}>Active Now</Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid xs={12} md={7}>
                  <Box sx={{ float: "right", mr: "10%" }}>
                    {/* 11:11 */}
                    {/* <Button
                      sx={{
                        background: "#E66253",
                        color: "#ffffff",
                        px: 3,
                        ml: 3,
                      }}
                    >
                      <img
                        src="/images/end-call.png"
                        width="30px"
                        height="30px"
                        style={{ margin: 5 }}
                      />
                      Leave
                    </Button> */}

                    <Leave />
                  </Box>
                </Grid>

                <hr />
              </Grid>
              {/* {[...participants.keys()].map((participantId) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
              ))} */}
              <br />

              {[...participants.entries()].length === 1 ? (
                <>
                  {console.log(participants, "hi")}
                  <ParticipantView
                    participantId={[...participants.entries()][0][0]}
                    key={[...participants.entries()][0][0]}
                  />
                </>
              ) : [...participants.entries()].length > 1 ? (
                <Box>
                  {" "}
                  <Grid container spacing={2}>
                    <Grid md={8}>
                      {" "}
                      <Box>
                        <ParticipantView
                          participantId={[...participants.entries()][1][0]}
                          key={[...participants.entries()][1][0]}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} sx={{ mt: "15%" }}>
                      {" "}
                      <Box>
                        <ParticipantView2
                          height="300px"
                          width="100px"
                          participantId={[...participants.entries()][0][0]}
                          key={[...participants.entries()][0][0]}
                          style={{
                            maxWidth: "300px",
                            height: "10%",
                            mr: "50%",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  {console.log(participants, "hi23", [
                    ...participants.entries(),
                  ])}
                  <br />
                </Box>
              ) : (
                <div>hi</div>
              )}
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                sx={{
                  background: "#E66253",
                  borderRadius: 5,
                  // mx: "35%",
                  //mt: "600px",
                  alignItems: "center",
                }}
              >
                <Grid xs={4}>
                  {/* <Button onClick={() => toggleMic()}>
                          <img
                            src="/images/microphone.png"
                            width="30px"
                            height="30px"
                            style={{ margin: 5 }}
                          />
                        </Button> */}
                  <Mute />
                </Grid>

                <Grid xs={4}>
                  {/* <Button sx={{ background: "#ffffff" }}>
                    <img
                      src="/images/comment.png"
                      width="30px"
                      height="30px"
                      style={{ margin: 5 }}
                    />
                  </Button> */}
                </Grid>

                <Grid xs={4}>
                  {/* <Button onClick={() => toggleWebcam()}>
                          <img
                            src="/images/video.png"
                            width="30px"
                            height="30px"
                            style={{ margin: 5 }}
                          />
                        </Button> */}
                  <Webcam />
                </Grid>
              </Grid>
              {/* <Grid container spacing={2} sx={{ mt: 0, border: 1 }}>
                <Grid xs={8}>
                  <Box
                    sx={{
                      //  backgroundImage: "url('/images/telemedPic.png')",
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
                    <br />
                    <br />
                    <br />
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
                        sx={{
                          width: "100%",
                          background: "#ffffff",
                          borderRadius: 2,
                        }}
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
                          height="35px"
                          style={{ margin: 5 }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Box>
          </div>
        ) : joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          // <button onClick={joinMeeting}>Join</button>
          <div>hi</div>
        )}
      </div>
    );
  }

  const [meetingId, setMeetingId] = useState("hykm-ec71-maf8");

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);

    return meetingId;
  };

  const goToMeeting = async (id) => {
    const getMID = await AxiosInstance.get(`meeting`)
      .then(async (res) => {
        console.log("really meeting ba toh", res.data[0]);

        if (res.data.length !== 0) {
          console.log("wow may laman");
        } else {
          console.log("waleys");

          try {
            // Call getMeetingAndToken() to retrieve meeting ID and token
            //await getMeetingAndToken(); // Ensure meeting ID and token are available
            const tem = await getMeetingAndToken();
            // Make the Axios reqest with async/await
            //console.log(meetingId);

            const response = await AxiosInstance.post(`meeting/`, {
              meeting_id: tem,
            });

            // Handle successful response
            console.log("Meeting joined successfully:", response.data); // Or navigate as needed
          } catch (error) {
            console.error("Error joining meeting:", error.response.data);
          }
        }
        setMeetingId(res.data[0].meeting_id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    console.log(meetingId);
  };

  useEffect(() => {
    console.log("test");
    // getMeetingAndToken();
    // goToMeeting();
  }, []);

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  const meetingView = useMemo(() => {
    if (authToken && meetingId) {
      return (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "C.V. Raman",
          }}
          token={authToken}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      );
    }
    return <JoinScreen getMeetingAndToken={meetingId} />;
  }, [authToken, meetingId]);

  //!

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await clients.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  // useEffect(() => {
  //   clients.on("user-published", handleUserJoined);
  //   clients.on("user-left", handleUserLeft);

  //   clients
  //     .join(APP_ID, CHANNEL, TOKEN, null)
  //     .then((uid) =>
  //       Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
  //     )
  //     .then(([tracks, uid]) => {
  //       const [audioTrack, videoTrack] = tracks;
  //       setLocalTracks(tracks);
  //       setUsers((previousUsers) => [
  //         ...previousUsers,
  //         {
  //           uid,
  //           videoTrack,
  //           audioTrack,
  //         },
  //       ]);
  //       clients.publish(tracks);
  //     });

  //   return () => {
  //     for (let localTrack of localTracks) {
  //       localTrack.stop();
  //       localTrack.close();
  //     }
  //     clients.off("user-published", handleUserJoined);
  //     clients.off("user-left", handleUserLeft);
  //     clients.unpublish(localTracks).then(() => clients.leave());
  //   };
  // }, []);
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      {/* {meetingView} */}
      {authToken && meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "C.V. Raman",
          }}
          token={authToken}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      ) : (
        // <JoinScreen getMeetingAndToken={getMeetingAndToken} />
        <JoinScreen getMeetingAndToken={meetingId} />
      )}
      //! {/* <ParticipantView props={getMeetingAndToken} /> */}
    </div>
  );
}

export default NutritionistHome;
