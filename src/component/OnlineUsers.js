import { Avatar, AvatarGroup, Box, Typography, Badge } from "@mui/material";
import React from "react";

const OnlineUsers = ({ list }) => {
  // Mapping from usernames to colors
  const userColorMap = [
    "red",
    "grey",
    "blue",
    // Add more usernames and colors as needed
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: "4rem",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h5" component={"h5"}>
        Online Users:
      </Typography>

      <AvatarGroup max={4}>
        {list.map((username, index) => (
          <Badge
            key={index}
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={
              <div
                style={{
                  backgroundColor: "green",
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                }}
              />
            }
          >
            <Avatar
              alt={username[0].toUpperCase()}
              src="/"
              sx={{ backgroundColor: userColorMap[index] || "yellow" }}
            >
              {username.length > 7 ? `${username.slice(0, 7)}..` : username}
            </Avatar>
          </Badge>
        ))}
      </AvatarGroup>
    </Box>
  );
};

export default OnlineUsers;
