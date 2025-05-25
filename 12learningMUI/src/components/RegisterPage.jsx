import React, { useState } from "react";
import { registerUser } from "../features/userSlice";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    setUser('');
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
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
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default RegisterPage;
