// const LOCAL_SERVER_URL = "http://localhost:5173";
// export const getToken = async () => {
//   try {
//     const response = await fetch(`${LOCAL_SERVER_URL}/get-token`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });

//     const { token } = await response.json();
//     return token;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getMeetingId = async (token) => {
//   try {
//     const VIDEOSDK_API_ENDPOINT = `${LOCAL_SERVER_URL}/create-meeting`;
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     };
//     const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
//       .then(async (result) => {
//         const { meetingId } = await result.json();
//         return meetingId;
//       })
//       .catch((error) => console.log("error", error));
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
// };

//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxZWRlNjlmZC04MzQ4LTRlMmYtOGRiMi1kZTgzZjJhOGM5MDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjU0NzEzOCwiZXhwIjoxNzI0MzIzMTM4fQ.UQGa1Ai8XgTj_5eMxbKCLgzCvO1TM7S7ovclO19eipM";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
// const { leave, toggleMic, toggleWebcam } = useMeeting();
// <button onClick={() => toggleMic()}>toggleMic</button>
// <button onClick={() => toggleWebcam()}>toggleWebcam</button>

// return (
//   <Box sx={{ mx: 10 }}>
//     <Grid container spacing={2} sx={{ textAlign: "none", pt: 1, border: 1 }}>
//       <Grid xs={2}>
//         <img
//           src="/images/logoCircle.png"
//           width="60px"
//           height="60px"
//           style={{}}
//         />
//       </Grid>
//       <Grid xs={2} sx={{ textAlign: "left" }}>
//         Name: <br />
//         <Grid container spacing={2} sx={{ mt: "5px" }}>
//           <Grid xs={2}>
//             <CircleIcon sx={{ mt: 1, width: 10, color: "green" }} />
//           </Grid>
//           <Grid sx={{ mt: "9px" }}>Active Now</Grid>
//         </Grid>
//       </Grid>
//       <Grid xs={8}>
//         <Box sx={{ float: "right", mr: "150px" }}>
//           11:11
//           <Button
//             sx={{ background: "#E66253", color: "#ffffff", px: 3, ml: 3 }}
//           >
//             <img
//               src="/images/end-call.png"
//               width="30px"
//               height="30px"
//               style={{ margin: 5 }}
//             />
//             Leave
//           </Button>
//         </Box>
//       </Grid>
//       <br />

//       <hr />
//     </Grid>

//     <Grid container spacing={2} sx={{ mt: 0, border: 1 }}>
//       <Grid xs={8}>
//         <Box
//           sx={{
//             backgroundImage: "url('/images/telemedPic.png')",
//             width: "100%",
//             height: "500px",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             px: "0",
//             justifyContent: "center",
//             objectFit: "cover",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           //!
//           {authToken && meetingId ? (
//             <MeetingProvider
//               config={{
//                 meetingId,
//                 micEnabled: true,
//                 webcamEnabled: true,
//                 name: "C.V. Raman",
//               }}
//               token={authToken}
//             >
//               <MeetingView
//                 meetingId={meetingId}
//                 onMeetingLeave={onMeetingLeave}
//               />
//             </MeetingProvider>
//           ) : (
//             // <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//             <JoinScreen getMeetingAndToken={meetingId} />
//           )}
//           //! {/* <ParticipantView props={getMeetingAndToken} /> */}
//           {users.map((user) => (
//             <VideoPlayer key={user.uid} user={user} />
//           ))}
//           <Grid
//             container
//             spacing={2}
//             justify="center"
//             alignItems="center"
//             sx={{
//               background: "#E66253",
//               borderRadius: 5,
//               mx: "35%",
//               mt: "400px",
//               alignItems: "center",
//             }}
//           >
//             <Grid xs={4}>
//               <Button>
//                 <img
//                   src="/images/microphone.png"
//                   width="30px"
//                   height="30px"
//                   style={{ margin: 5 }}
//                 />
//               </Button>
//             </Grid>

//             <Grid xs={4}>
//               <Button sx={{ background: "#ffffff" }}>
//                 <img
//                   src="/images/comment.png"
//                   width="30px"
//                   height="30px"
//                   style={{ margin: 5 }}
//                 />
//               </Button>
//             </Grid>

//             <Grid xs={4}>
//               <Button>
//                 <img
//                   src="/images/video.png"
//                   width="30px"
//                   height="30px"
//                   style={{ margin: 5 }}
//                 />
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>

//       <Grid xs={4}>
//         <Grid container spacing={2} sx={{ mt: "450px", ml: "0px" }}>
//           <Grid xs={2}>
//             {" "}
//             <Button>
//               <img
//                 src="/images/clip 1.png"
//                 width="30px"
//                 height="30px"
//                 style={{ margin: 5 }}
//               />
//             </Button>
//           </Grid>
//           <Grid xs={8}>
//             <TextField
//               id="outlined-multiline-flexible"
//               sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
//               multiline
//               rows={1}
//               placeholder="Type message here"
//             />
//           </Grid>
//           <Grid xs={2}>
//             {" "}
//             <Button>
//               <img
//                 src="/images/paper-plane (1) 1.png"
//                 width="30px"
//                 height="35px"
//                 style={{ margin: 5 }}
//               />
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Box>
// );
