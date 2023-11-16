import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [address, setAddress] = useState("");

  const handlelocationClick = async () => {
    try {
      const position = await getCurrentPosition();
      if (position) {
        const { latitude, longitude } = position.coords;
        const location = await fetchLocationFromCoordinates(
          latitude,
          longitude
        );
        setCredentials({ ...credentials, location: location });
        setAddress(location);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.location.getCurrentPosition(resolve, reject);
    });
  };

  const fetchLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/getlocation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latlong: { lat: latitude, long: longitude } }),
        }
      );

      if (response.ok) {
        const { location } = await response.json();
        return location;
      } else {
        console.error("Error fetching location");
        return "";
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/createuser",
        {
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
        }
      );

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
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
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
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder='"Click below for fetching address"'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handlelocationClick}
              name="location"
              className="btn btn-success"
            >
              Click for current Location
            </button>
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
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
