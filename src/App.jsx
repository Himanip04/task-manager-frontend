
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import AddTask from "../pages/AddTask";

export default function App() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
   
    if (!token) {
      if (location.pathname !== "/signup") {
        navigate("/");
      }
    }
  }, [token, location.pathname]);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* PROTECTED ROUTES */}
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/add-task" element={token ? <AddTask /> : <Navigate to="/" />} />
      <Route path="/edit-task/:id" element={token ? <AddTask /> : <Navigate to="/" />} />

      {/* ANY UNKNOWN ROUTE */}
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} />} />
    </Routes>
  );
}
