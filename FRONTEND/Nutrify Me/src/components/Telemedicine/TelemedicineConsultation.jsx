import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import AxiosInstance from "../forms/AxiosInstance";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";

function TelemedicineConsultation() {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxZWRlNjlmZC04MzQ4LTRlMmYtOGRiMi1kZTgzZjJhOGM5MDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNDkwODc1NSwiZXhwIjoxNzQwNDYwNzU1fQ.LuxRhCUMEMKXuLkyYyOZ-wrTAQ01JxMcvgyBpTUD7hg";

  const createMeeting = async () => {
    try {
      const res = await AxiosInstance.post("https://api.videosdk.live/v2/rooms", {}, {
        headers: {
          authorization: `${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const { roomId } = res.data; // Extract roomId directly
      return roomId;
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [meetingId, setMeetingId] = useState(null);

  // Fetch or create meeting ID
  const getMeetingAndToken = async () => {
    const meetingId = await createMeeting();
    setMeetingId(meetingId);
    return meetingId;
  };

  useEffect(() => {
    if (!meetingId) {
      getMeetingAndToken(); // Get the meetingId when component mounts
    }
  }, [meetingId]);

  const JoinScreen = ({ getMeetingAndToken }) => {
    const [inputMeetingId, setInputMeetingId] = useState(null);
    const handleJoinClick = async () => {
      await getMeetingAndToken(inputMeetingId);
    };

    return (
      <div>
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => setInputMeetingId(e.target.value)}
        />
        <button onClick={handleJoinClick}>Join Meeting</button>
      </div>
    );
  };

  const ParticipantView = ({ participantId }) => {
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(participantId);
    const micRef = useRef(null);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
          micRef.current.srcObject = mediaStream;
          micRef.current.play().catch((error) =>
            console.error("audioElem.current.play() failed", error)
          );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

    return (
      <div>
        <p>Participant: {displayName}</p>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            url={videoStream}
            playing
            playsinline
            width="100%"
            height="100%"
          />
        )}
      </div>
    );
  };

  const MeetingView = ({ meetingId, onMeetingLeave }) => {
    const { join, participants } = useMeeting({
      onMeetingJoined: () => console.log("Meeting joined"),
      onMeetingLeft: () => onMeetingLeave(),
    });

    useEffect(() => {
      join();
    }, [join]);

    return (
      <div>
        <h3>Meeting Id: {meetingId}</h3>
        {Array.from(participants.keys()).map((participantId) => (
          <ParticipantView key={participantId} participantId={participantId} />
        ))}
      </div>
    );
  };

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
    return <JoinScreen getMeetingAndToken={getMeetingAndToken} />;
  }, [authToken, meetingId]);

  return (
    <div className="content" style={{ paddingBottom: "40px", marginTop: "80px", color: "#99756E" }}>
      {authToken && meetingId ? meetingView : <Typography>Loading....</Typography>}
    </div>
  );
}

export default TelemedicineConsultation;
