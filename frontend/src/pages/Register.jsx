import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "/helpers/axios.config";
import OAuth from "../components/OAuth";

export default function Register() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await axios.post("/auth/register", data);
      if (response.data.success) {
        setLoading(false);
        // Registration was successful, navigate to the desired page
        navigate("/signin");
      } else {
        setLoading(false);
        // Registration failed, display the error message
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
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

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }} // Set button width to 100%
        >
          {loading ? "...loading" : "register"}
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <OAuth style={{ width: "100%" }} />
        </div>
      </Form>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
}
