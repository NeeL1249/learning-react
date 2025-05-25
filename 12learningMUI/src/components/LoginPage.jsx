import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";

const LoginPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));

    console.log(loggedIn);

    if (loggedIn) {
      window.alert("Login successful!");
    } else {
      window.alert("Invalid credentials or not logged in!");
    }
    setUser({
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </Box>
    </>
  );
};

export default LoginPage;
