import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Message from "./Message";
import { Context, URI } from "../context";
import openSocket from "socket.io-client";
const styles = {
  chatbox: {
    position: "relative",
    maxWidth: "50rem",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "black", // Hide the thumb
    },
    overflowY: "auto",
    height: "50rem",
    border: "2px solid aliceblue",
    margin: {
      md: "10rem auto",
      xs: "3rem",
    },
  },

  chatHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    p: "1.5rem 4rem",
    backgroundColor: "aliceblue",
  },
  chatForm: {
    display: "flex",
  },
};
const Chatbox = ({ changeUserList }) => {
  const [message, setMessage] = useState("");
  const ctx = useContext(Context);
  useEffect(() => {
    const s = openSocket(
      `${URI}?userId=${ctx.user._id}&username=${ctx.user.username}`
    );
    s.on("message", (data) => {
      const msg = data.newMessage;
      const newMessage = {
        sender: ctx.user._id === msg.user._id ? true : false,
        user: { username: msg.user.username, id: msg.user._id },
        message: msg.text,
      };
      ctx.addChatMessage(newMessage);
    });
    s.on("userList", (data) => {
      changeUserList(data);
    });
    return () => s.disconnect();
  }, []);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    const newMessage = {
      text: message, // Send the message text to the backend
      user: ctx.user._id, // Send the user ID to the backend
    };

    try {
      // Make a POST request to your backend API to post the message
      const response = await fetch(`${URI}message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(""); // Clear the input field
      } else {
        console.error("Failed to post message");
      }
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <Box sx={styles.chatbox}>
      <Stack
        direction={"row"}
        sx={{ ...styles.chatHeader, position: "sticky", top: 0, zIndex: 1 }}
      >
        <Typography
          // color={theme.palette.background.default}
          variant="h4"
          component={"h3"}
        >
          ChatBox
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar alt="" src="/static/images/avatar/1.jpg" />

          <Typography variant="h6" component={"p"}>
            {ctx?.user?.username || "Username"}
          </Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "0.1em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "black", // Hide the thumb
          },
          overflowY: "auto",
        }}
      >
        {ctx?.chatMessages?.map((a) => (
          <Message
            sender={a.sender}
            user={{ username: a.user.username, id: a.user.id }}
            msg={a.message}
          ></Message>
        ))}
      </Box>
      <form
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          borderTop: "1px solid #ccc",
        }}
        onSubmit={handleSendMessage}
      >
        <Box sx={styles.chatForm}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type a message..."
            value={message}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit" // This is important to trigger form submission
            sx={{ borderRadius: "0" }}
          >
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Chatbox;
