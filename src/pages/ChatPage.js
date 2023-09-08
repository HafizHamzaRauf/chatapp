import { Box } from "@mui/material";
import React, { useState } from "react";
import Navigation from "../component/Navigation";
import Chatbox from "../component/Chatbox";
import OnlineUsers from "../component/OnlineUsers";

const ChatPage = () => {
  const [userList, setUserList] = useState([]);
  const changeUserList = (list) => setUserList((prev) => [...list]);
  return (
    <Box>
      <Navigation></Navigation>
      <OnlineUsers list={userList}></OnlineUsers>
      <Chatbox changeUserList={changeUserList}></Chatbox>
    </Box>
  );
};

export default ChatPage;
