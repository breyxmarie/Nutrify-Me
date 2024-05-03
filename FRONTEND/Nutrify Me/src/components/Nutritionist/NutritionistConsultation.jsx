import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

function NutritionistHome() {
  const APP_ID = "da6708a41b464c7fb30a7bb85468663b";
  const TOKEN =
    "007eJxTYNgo7/7gmKK17tGmvXNZXURTHti8Dvs+55Ts1bPfFZ3FDtkrMKQkmpkbWCSaGCaZmJkkm6clGRskmiclWZiamFmYmRkn/VcySmsIZGSIDZdgZmSAQBCfh8E5P6+4NKcksSQzP4+BAQAvoyGl";
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
  return (
    <div>
      {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(41, 200px)",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
}

export default NutritionistHome;
