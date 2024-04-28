import React, { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid: {user.uid}
      <div ref={ref} style={{ width: "500px", height: "500px" }}></div>
    </div>
  );
};

export default VideoPlayer;
