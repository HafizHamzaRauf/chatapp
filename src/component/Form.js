import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context, URI, updateLocalStorage } from "../context";

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const isSignUp = location.pathname === "/signup";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    usernameError: "",
    passwordError: "",
  });

  const [loading, setLoading] = useState(false); // Added loading state

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check for empty fields
      if (!formData.username.trim() || !formData.password.trim()) {
        setFormErrors({
          usernameError: formData.username.trim() ? "" : "Username is required",
          passwordError: formData.password.trim() ? "" : "Password is required",
        });
        return;
      }

      // Reset errors
      setFormErrors({
        usernameError: "",
        passwordError: "",
      });

      // Start loading
      setLoading(true);

      // Add logic for signup or login here
      const response = await fetch(`${URI}${isSignUp ? "signup" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle errors, e.g., duplicate username, validation errors, etc.
        const responseData = await response.json();
        if (responseData.message === "Wrong password") {
          setFormErrors({
            usernameError: "",
            passwordError: responseData.message,
          });
        } else {
          setFormErrors({
            usernameError: responseData.message,
            passwordError: "",
          });
        }
        return;
      }

      const responseData = await response.json();

      ctx.changeToken(responseData.token);
      ctx.changeUser(responseData.user);
      updateLocalStorage(
        ctx.chatMessages,
        responseData.user,
        responseData.token
      );
      navigate("/chatbox");
    } catch (error) {
      console.error(isSignUp ? "Signup error:" : "Login error:", error);
      // Handle error in your frontend, e.g., display an error message.
    } finally {
      setFormData({
        username: "",
        password: "",
      });
      // Stop loading
      setLoading(false);
    }
  };

  const handleSwitchForm = () => {
    // Toggle between signup and login forms
    if (isSignUp) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "10rem auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">{isSignUp ? "Sign Up" : "Login"}</Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          error={!!formErrors.usernameError}
          helperText={formErrors.usernameError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={!!formErrors.passwordError}
          helperText={formErrors.passwordError}
        />
        <Button variant="contained" type="submit" fullWidth disabled={loading}>
          {loading ? (
            <CircularProgress size={24} />
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Button
        variant="text"
        color="primary"
        fullWidth
        onClick={handleSwitchForm}
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  );
};

export default Form;
