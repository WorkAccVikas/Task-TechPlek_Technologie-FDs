import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useContext } from "react";

// const One = lazy(() => import("./others/One"));

import Two from "../others/Two";

// import Routes
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import AuthContext from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// lazy import
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Profile = lazy(() => import("../pages/Profile"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const NotFound = lazy(() => import("../components/NotFound"));

function Layout() {
  console.log("Layout Page render");

  const { user } = useContext(AuthContext);

  console.log("Data User = ", user);

  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Logged In Route */}
            <Route
              element={<ProtectedRoute isAuthenticated={user ? false : true} />}
            >
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Route */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={true}
                  adminOnly={true}
                  admin={user?.role === "Admin" ? true : false}
                />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* testing */}
            <Route path="/test" element={<Two />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
        <Footer />
      </Router>
    </>
  );
}

export default Layout;
