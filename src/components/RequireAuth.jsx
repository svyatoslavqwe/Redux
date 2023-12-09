import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
