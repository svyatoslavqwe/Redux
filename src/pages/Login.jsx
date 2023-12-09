import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api";
import { setUser, setLoading } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleLogin() {
    if (email === "" || password === "") {
      setEmailError(email === "" ? "Please enter your email" : "");
      setPasswordError(password === "" ? "Please enter your password" : "");
      return;
    }

    dispatch(setLoading(true));

    loginUser(email, password)
      .then((user) => {
        if (user) {
          dispatch(setUser(user));
          navigate("/home");
        } else {
          setEmailError("Incorrect email address");
          setPasswordError("Incorrect password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Log in</h1>
      <input
        id="email"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && (
        <div className="text-red-500 text-center">{emailError}</div>
      )}
      <input
        id="password"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && (
        <div className="text-red-500 text-center">{passwordError}</div>
      )}
      <button
        className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
}
