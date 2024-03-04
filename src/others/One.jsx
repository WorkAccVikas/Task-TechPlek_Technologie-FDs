import { useState } from "react";
import "./App.css";
import axios from "../utils/axiosInstance";

let axiosConfig = {
  withCredentials: true,
};

function Test() {
  const [username, setUsername] = useState("ram");
  const [password, setPassword] = useState("12345");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission");
    console.table({ username, password });

    const data = await axios.post("/api/v1/user/login", {
      username,
      password,
    });

    console.log("Data = ", data);
  };
  const handleReset = (e) => {
    setUsername("");
    setPassword("");
  };

  const getData = async () => {
    const data = await axios.get("/api/v1/user/currentUser");
    console.log(`🚀 ~ getData ~ data:`, data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username or email"
        />

        <br />

        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <br />

        <button type="submit" className="bg-blue-700 text-white">
          Login
        </button>
        <button type="reset" className="bg-red-700 text-white">
          Reset
        </button>
      </form>
      <button onClick={getData}>Get Data</button>
    </>
  );
}

export default Test;
