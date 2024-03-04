import { lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./styles/app.scss";

import { AuthProvider } from "./context/AuthContext";

// const One = lazy(() => import("./others/One"));

// import Routes
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </>
  );
}

export default App;
