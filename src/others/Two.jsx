import React from "react";
import axios from "../utils/axiosInstance";

function Two() {
  const getData = async () => {
    const data = await axios.get("/api/v1/user/currentUser");
    console.log(`🚀 ~ getData ~ data:`, data);
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
    </div>
  );
}

export default Two;
