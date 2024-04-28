import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import UserFooter from "../UserFooter";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";

import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

function TelemedicineConsultation() {
  // const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQXNhampfVmVudHJlc3MiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0FzYWpqX1ZlbnRyZXNzIiwiaWF0IjoxNzE0MTkyMjA3LCJleHAiOjE3MTQ3OTcwMTJ9.vKJ4B-RyN3BH2sK5uuIrNB18JhwuCyiaTH07pBvVM3g"; // the token can be found in the "Credentials" section
  // const userId = "Asajj_Ventress"; // the user id can be found in the "Credentials" section
  // const callId = "LHdErGRL8BZf"; // the call id can be found in the "Credentials" section

  // const user = {
  //   id: userId,
  //   name: "Aubrey",
  //   image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
  // };

  // const client = new StreamVideoClient({ apiKey, user, token });
  // const call = client.call("default", callId);
  // call.join({ create: true });

  // const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  // const callingState = useCallCallingState();
  // const participantCount = useParticipantCount();

  // if (callingState !== CallingState.JOINED) {
  //   return <div>Loading...</div>;
  // }

  //another try
  const APP_ID = "da6708a41b464c7fb30a7bb85468663b";
  const TOKEN =
    "007eJxTYGCZk6/x3Kb/l63VW5f0w/8kOxV/P+OXmlj3r1ufZ53S26UKDCmJZuYGFokmhkkmZibJ5mlJxgaJ5klJFqYmZhZmZsZJ4cp6aQ2BjAy2QoksjAwQCOLzMDjn5xWX5pQklmTm5zEwAAAcESEA";
  const CHANNEL = "Consultation";

  const clients = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

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

  useEffect(() => {
    clients.on("user-published", handleUserJoined);
    clients.on("user-left", handleUserLeft);

    clients
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        clients.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      clients.off("user-published", handleUserJoined);
      clients.off("user-left", handleUserLeft);
      clients.unpublish(localTracks).then(() => clients.leave());
    };
  }, []);
  //

  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#99756E",
      }}
    >
      {/* another try gumana na plsss */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 700px)",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} style={{ padding: "20px" }} />
        ))}
      </div>
      {/*  */}
      {/* <StreamVideo client={client}>
        <StreamCall call={call}>try</StreamCall>
        <MyUILayout />
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamVideo> */}
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
              {users.map((user) => (
                <VideoPlayer key={user.uid} user={user} />
              ))}
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
                    height="35px"
                    style={{ margin: 5 }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Video conferencing */}
      {/*  */}{" "}
    </div>
  );
}

export default TelemedicineConsultation;
