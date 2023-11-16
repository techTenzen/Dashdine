import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Import the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json);

      if ("success" in json && json.success) {
        localStorage.setItem("userEmail", credentials.email);

        // Save the authentication token to localStorage
        localStorage.setItem("authToken", json.authToken);

        // Log the token to the console
        console.log(localStorage.getItem("authToken"));

        // Use the navigate function to navigate to a different route (e.g., home)
        navigate("/");
      } else {
        // Check for a custom error message
        if ("error" in json) {
          setErrorMessage(json.error);
        } else {
          setErrorMessage("Invalid credentials. Please try again.");
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="btn btn-danger m-3">
              I am a New user
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
