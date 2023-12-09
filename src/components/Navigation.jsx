import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, removeUserId } from "../redux/userReducer";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(removeUserId());
    navigate("/login");
  };

  return (
    <div className="flex space-x-4">
      <Link
        to="/home"
        className={`text-gray-500 ${
          location.pathname === "/home" ? "font-bold text-black" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/notes"
        className={`text-gray-500 ${
          location.pathname === "/notes" ? "font-bold text-black" : ""
        }`}
      >
        Notes
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray-500 bg-transparent border-none"
      >
        Logout
      </button>
    </div>
  );
}
