import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../theme";
import { css } from "@mui/system"; // Import the css prop

const styles = {
  message: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  messageBox: {
    display: "flex",
    flexDirection: "column",
    p: "2px",
    m: "1rem",
  },
};
const Message = ({ user, msg, sender }) => {
  return (
    <Box
      sx={{
        alignSelf: sender ? "flex-end" : "flex-start",
        ...styles.messageBox,
      }}
    >
      {!sender && (
        <>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              alignSelf: sender ? "flex-end" : "flex-start",
              color: theme.palette.text.tertiary,
            }}
          >
            {user.username}
          </Typography>
          <Box
            sx={{
              ...styles.message,
            }}
          >
            <Typography
              sx={{
                backgroundColor: sender ? "red" : "yellow",
                p: "4px 8px",
                borderRadius: "50%",
              }}
              variant="h5"
              component={"h5"}
            >
              {user.username[0]?.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                ...css({
                  wordWrap: "break-word",
                  backgroundColor: theme.palette.background.disabled,

                  padding: "5px 2rem",
                  borderRadius: "5px",
                }),
              }}
              variant="h5"
              component={"h5"}
            >
              {msg}
            </Typography>
          </Box>
        </>
      )}

      {sender && (
        <>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              alignSelf: sender ? "flex-end" : "flex-start",
              color: theme.palette.text.tertiary,
            }}
          >
            {user.username}
          </Typography>
          <Box
            sx={{
              ...styles.message,
            }}
          >
            <Typography
              sx={{
                backgroundColor: sender
                  ? "#D5E8F5"
                  : theme.palette.text.disabled,
                p: "5px 2rem",
                borderRadius: "5px",
              }}
              variant="h5"
              component={"h5"}
            >
              {msg}
            </Typography>
            <Typography
              sx={{
                backgroundColor: sender ? "red" : "yelalow",
                p: "4px 8px",
                borderRadius: "50%",
              }}
              variant="h5"
              component={"h5"}
            >
              {user.username[0].toUpperCase()}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Message;
