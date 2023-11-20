import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  // Static list of Indian cities
    const cityOptions = [
      { label: "Mumbai", value: "Mumbai" },
      { label: "Delhi", value: "Delhi" },
      { label: "Bangalore", value: "Bangalore" },
      { label: "Kolkata", value: "Kolkata" },
      { label: "Chennai", value: "Chennai" },
      { label: "Hyderabad", value: "Hyderabad" },
      { label: "Ahmedabad", value: "Ahmedabad" },
      { label: "Pune", value: "Pune" },
      { label: "Surat", value: "Surat" },
      { label: "Jaipur", value: "Jaipur" },
      { label: "Lucknow", value: "Lucknow" },
      { label: "Kanpur", value: "Kanpur" },
      { label: "Nagpur", value: "Nagpur" },
      { label: "Indore", value: "Indore" },
      { label: "Thane", value: "Thane" },
      { label: "Bhopal", value: "Bhopal" },
      { label: "Visakhapatnam", value: "Visakhapatnam" },
      { label: "Pimpri-Chinchwad", value: "Pimpri-Chinchwad" },
      { label: "Patna", value: "Patna" },
      { label: "Vadodara", value: "Vadodara" },
      // Add more cities as needed
      { label: "Ludhiana", value: "Ludhiana" },
      { label: "Agra", value: "Agra" },
      { label: "Nashik", value: "Nashik" },
      { label: "Faridabad", value: "Faridabad" },
      { label: "Meerut", value: "Meerut" },
    ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        // Redirect to the login page
        window.location.href = "/login";
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (selectedOption) => {
    setCredentials({ ...credentials, location: selectedOption.value });
  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #333, #000)",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
          style={{ color: "#FFF" }}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="city"
              className="form-label"
              style={{ color: "#FFF" }}
            >
              City
            </label>
            <Select
              options={cityOptions}
              onChange={handleLocationChange}
              value={{
                label: credentials.location,
                value: credentials.location,
              }}
              placeholder="Select your city"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#333",
                  color: "#ccc",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "#ccc",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#4CAF50" : "#333",
                  color: "#FFF",
                }),
              }}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <button
            type="submit"
            className="m-3 btn btn-success"
            style={{ background: "#4CAF50" }}
          >
            Submit
          </button>
          <Link
            to="/login"
            className="m-3 mx-1 btn btn-danger"
            style={{ background: "#FF5050" }}
          >
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
