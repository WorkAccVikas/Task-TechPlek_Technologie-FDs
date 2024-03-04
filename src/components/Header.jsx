import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

// const user = { _id: "", role: "" };
// const user = { _id: "1", role: "User" };
const user = { _id: "1", role: "Admin" };

function Header() {
  console.log("Header render");
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    setIsOpen(false);
  };

  return (
    <nav className="header flex justify-end gap-5 bg-pink-200 p-4">
      <NavLink
        to={"/"}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          "text-[#2e2e2e]" + (isActive ? " text-red-600" : "")
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/about"}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          "text-[#2e2e2e]" + (isActive ? " text-red-600" : "")
        }
      >
        About
      </NavLink>
      <NavLink
        to={"/contact"}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          "text-[#2e2e2e]" + (isActive ? " text-red-600" : "")
        }
      >
        Contact
      </NavLink>

      {user?._id ? (
        <>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center"
          >
            <FaUser />
          </button>

          <dialog open={isOpen} className="shadow">
            <div>
              {user.role === "Admin" && (
                <NavLink to={"/dashboard"} onClick={() => setIsOpen(false)}>
                  Dashboard
                </NavLink>
              )}
              <NavLink to={"/profile"} onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
              <button onClick={logoutHandler} className="flex justify-center">
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <NavLink
          to={"/login"}
          className="flex items-center hover:text-orange-500"
        >
          <FaSignInAlt />
        </NavLink>
      )}
    </nav>
  );
}

export default Header;
