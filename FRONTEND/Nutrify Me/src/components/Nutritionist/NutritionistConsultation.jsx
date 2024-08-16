import { useEffect, useRef, useState, useMemo } from "react";

import { VideoPlayer } from "./VideoPlayer";
import { useLoggedInUser } from "../LoggedInUserContext";
//
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

  function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState("hykm-ec71-maf8");
    const onClick = async () => {
      await getMeetingAndToken(meetingId);
    };
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <button onClick={onClick}>Join</button>
        {" or "}
        <button onClick={onClick}>Create Meeting</button>
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
      <div>
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
          {micOn ? "ON" : "OFF"}
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
      </div>
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
    const [joined, setJoined] = useState("JOINED");
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
    // const firstElement = [...participants.entries()][0];
    // // const [key, value] = firstElement;
    // console.log(firstElement[0]);
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    useEffect(() => {
      join();
    }, []);

    useEffect(() => {
      // const firstElement = [...participants.entries()][0];
      // // const [key, value] = firstElement;
      // console.log(firstElement[0]);
    }, [participants]);

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {console.log([...participants.entries()].length)}
        {joined && joined == "JOINED" ? (
          <div>
            <Controls />
            //For rendering all the participants in the meeting
            {[...participants.entries()].length === 1 ? (
              <>
                {console.log(participants, "hi")}
                <ParticipantView
                  participantId={[...participants.entries()][0][0]}
                  key={[...participants.entries()][0][0]}
                />
              </>
            ) : [...participants.entries()].length > 1 ? (
              <>
                {" "}
                <ParticipantView
                  participantId={[...participants.entries()][0][0]}
                  key={[...participants.entries()][0][0]}
                />
                <br />
                <ParticipantView
                  participantId={[...participants.entries()][1][1]}
                  key={[...participants.entries()][1][1]}
                />
              </>
            ) : (
              <div>hi</div>
            )}
            {/* // {[...participants.keys()].map((participantId) => (
            //   <ParticipantView
            //     participantId={participantId}
            //     key={participantId}
            //   />
            // ))} */}
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
    <div>
      {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(41, 200px)",
        }}
      >
        {/* {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))} */}
        //!
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
            <MeetingView
              meetingId={meetingId}
              onMeetingLeave={onMeetingLeave}
            />
          </MeetingProvider>
        ) : (
          // <JoinScreen getMeetingAndToken={getMeetingAndToken} />
          // <JoinScreen getMeetingAndToken={meetingId} />

          <div>hi</div>
        )}
        //! {/* <ParticipantView props={getMeetingAndToken} /> */}
      </div>
    </div>
  );
}

export default NutritionistHome;
