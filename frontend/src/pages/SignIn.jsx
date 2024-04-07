import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "/helpers/axios.config";

export default function signIn() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  console.log(data);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/auth/signin", data);
  //     console.log(response.data);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signin", data);
      if (response.data.success) {
        // Registration was successful, navigate to the desired page
        navigate("/");
      } else {
        // Registration failed, display the error message
        setError(response.data.message);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          SIGN IN
        </Button>
      </Form>
      <div style={{ display: "flex", margin: 10 }}>
        <p>Dont have an account?</p>
        <Link to="/register" style={{ marginLeft: "5px" }}>
          <span>Register</span>
        </Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
