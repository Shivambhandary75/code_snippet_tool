import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      {user ? <Dashboard /> : <LandingPage />}
      <Footer />
    </>
  );
}