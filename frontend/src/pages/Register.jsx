import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "/helpers/axios.config";

export default function Register() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", data);
      if (response.data.success) {
        // Registration was successful, navigate to the desired page
        navigate("/signin");
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
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
          REGISTER
        </Button>
      </Form>
      <div style={{ display: "flex", margin: 10 }}>
        <p>Have an account?</p>
        <Link to="/signin" style={{ marginLeft: "5px" }}>
          <span>SignIn</span>
        </Link>
      </div>
      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
    </div>
  );
}