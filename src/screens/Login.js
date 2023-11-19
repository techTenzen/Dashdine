import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [name, setName] = useState(""); // New state for name
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/loginuser", {
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

      if ("success" in json && json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");

        // Show toast notification with the name
        toast.success(`Welcome, ${name}!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
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
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form
              className="border bg-dark border-success rounded p-4"
              onSubmit={handleSubmit}
            >
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {/* New name input */}
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
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
              <Link to="/createuser" className="btn btn-danger ms-2">
                I am a New user
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
