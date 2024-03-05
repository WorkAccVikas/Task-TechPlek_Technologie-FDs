import React from "react";
import axios from "../utils/axiosInstance";
import Axios from "axios";

// Pass name and age in the request body
const requestBody = {
  name: "YourName",
  age: 30, // Change this to the actual age
};

function Two() {
  const getData = async () => {
    const data = await axios.get("/api/v1/user/currentUser");
    console.log(`🚀 ~ getData ~ data:`, data);
  };

  const fetchNewAccessToken = async () => {
    try {
      const jwtToken = localStorage.getItem("authTokens"); // Replace 'your_jwt_token' with the actual JWT token
      console.log(`🚀 ~ fetchNewAccessToken ~ jwtToken:`, jwtToken);
      const response = await Axios.post(
        "http://localhost:8000/api/v1/user/newAccessToken",
        requestBody, // Send requestBody here
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
          withCredentials: true,
        },
      );
      console.log(response.data); // Assuming the response contains the new access token
    } catch (error) {
      console.error("Error fetching new access token:", error);
      // Handle errors, display error messages, etc.
    }
  };

  return (
    <div>
      <h1>Two</h1>
      <button
        onClick={getData}
        className="bg-blue-500 p-5 font-bold text-white"
      >
        Get Data
      </button>
      <br />
      <button onClick={fetchNewAccessToken}>Fetch New Access Token</button>
    </div>
  );
}

export default Two;
