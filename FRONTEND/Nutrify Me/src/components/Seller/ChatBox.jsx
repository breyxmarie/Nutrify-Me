import React, { useState, useEffect } from "react";
import "./chatbox.css";
import Box from "@mui/material/Box";
import AxiosInstance from "../forms/AxiosInstance";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

function ChatBox({ forceUpdate }) {
  const [orders, setOrders] = useState([]);

  const getData = () => {
    try {
      AxiosInstance.get(`deployedorder/`).then((res) => {
        console.log(res, res.data);

        const foundOrder = res.data.filter((item) => item.status !== "Done");

        console.log(foundOrder);
        setOrders(foundOrder);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const [forceRender, setForceRender] = useState(0);  // Initialize a dummy state

  
  useEffect(() => {
    getData();
    setForceRender(forceRender => forceRender + 1);
  }, []);

  useEffect(() => {
    getData();
    setForceRender(forceRender => forceRender + 1);
  }, [forceUpdate]);


  let hide = {
    display: "none",
  };
  let show = {
    display: "block",
  };
  let textRef = React.createRef();
  // const { messages } = props;

  const [chatopen, setChatopen] = useState(false);
  const toggle = (e) => {
    setChatopen(!chatopen);
  };

  return (
    <div id="chatCon">
      <div class="chat-box" style={chatopen ? show : hide}>
        <div class="header">On Going Orders</div>
        <br />
        <div class="chat-box">
          {orders.map((item) => (
            <Box
              sx={{
                border: 1,
                textOverflow: "ellipsis",
                // width: "100px",
                overflow: "show",
              }}
            >
              Date: {item.date} <br /> Time:
              {dayjs(item.date + "" + item.time).format("hh:mm A")}
              <br />
              Customer:
              <br />
              <br />
              Link:
              <a href={item.order_details.data.data.shareLink} target="_blank">
                <Typography
                  sx={{
                    ml: "0%",
                    mr: "0%",
                    textOverflow: "ellipsis",
                    width: "100px",
                    overflow: "show",
                  }}
                >
                  {item.order_details.data.data.shareLink}
                </Typography>
              </a>
              <a>fdf</a>
            </Box>
          ))}
        </div>
        {/* <div class="header">Chat with me</div>
        <div class="msg-area">
          {messages.map((msg, i) =>
            i % 2 ? (
              <p class="right">
                <span>{msg}</span>
              </p>
            ) : (
              <p class="left">
                <span>{msg}</span>
              </p>
            )
          )}
        </div>
        <div class="footer">
          <input type="text" ref={textRef} />
          <button>
            <i class="fa fa-paper-plane"></i>
          </button>
        </div> */}
      </div>
      <div class="pop">
        <p>
          {/* <img
            onClick={toggle}
            src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
            alt=""
          /> */}

          <Box
            onClick={toggle}
            sx={{
              backgroundColor: "#fff345",
              ml: "70%",
              mr: "5%",
              py: 2,
              px: 3,
              borderRadius: 3,
            }}
          >
            Orders
          </Box>
        </p>
      </div>
    </div>
  );
}

export default ChatBox;
