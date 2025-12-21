import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import App from "./App.jsx";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth && <Navbar role={auth.role} userName={auth.user?.fullName} />}
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RootLayout />
      <Toaster position="top-right" />
    </AuthProvider>
  </BrowserRouter>
);
