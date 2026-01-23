import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Settings from "../pages/Settings.jsx";
import { SettingsProvider } from "../context/SettingsContext";
import { AuthProvider } from "../context/AuthContext";

const Router = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default Router;