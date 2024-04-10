import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "/helpers/axios.config";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function signIn() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      setLoading(true);
      const response = await axios.post("/auth/signin", data);
      if (response.data.success) {
        dispatch(signInSuccess(response.data));
        // Registration was successful, navigate to the desired page
        navigate("/");
      } else {
        dispatch(signInFailure(response.data.message));
        // Registration failed, display the error message
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      // Handle network errors or other issues
      dispatch(signInFailure(error.message));
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

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }} // Set button width to 100%
        >
          {loading ? "...loading" : "Log In"}
        </Button>
        <div style={{ marginTop: "10px" }}>
          <OAuth />
        </div>
      </Form>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <p>Dont have an account?</p>
        <Link to="/register" style={{ marginLeft: "5px" }}>
          <span>Register</span>
        </Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
