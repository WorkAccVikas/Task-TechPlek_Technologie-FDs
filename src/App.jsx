import "./App.css";
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import { AuthProvider } from "./context/AuthContext";

// import Routes
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// lazy import
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Logged In Route */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Route */}
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster position="bottom-center" />
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
