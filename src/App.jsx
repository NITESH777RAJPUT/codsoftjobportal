import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobListings from "./pages/JobListings";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateRegister from "./pages/CandidateRegister";
import CandidateLogin from "./pages/CandidateLogin";
import EmployerRegister from "./pages/EmployerRegister";
import EmployerLogin from "./pages/EmployerLogin";
import JobDetail from "./pages/JobDetail";   // ✅ import job detail page
import ApplyJob from "./pages/ApplyJob";     // ✅ import apply job page
import PostJob from "./pages/PostJob";       // ✅ import post job page
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { UserProvider } from "./context/UserContext";

function RegisterChoice() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-6">Register as</h2>
      <div className="flex justify-center gap-6">
        <Link
          to="/candidate/register"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Candidate
        </Link>
        <Link
          to="/employer/register"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Employer
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <JobProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:id" element={<JobDetail />} />   {/* ✅ job detail route */}
                <Route path="/jobs/:id/apply" element={<ApplyJob />} /> {/* ✅ apply job route */}

                <Route path="/employer" element={<EmployerDashboard />} />
                <Route path="/employer/post-job" element={<PostJob />} /> {/* ✅ post job route */}

                <Route path="/candidate" element={<CandidateDashboard />} />
                <Route path="/candidate/register" element={<CandidateRegister />} />
                <Route path="/candidate/login" element={<CandidateLogin />} />

                <Route path="/employer/register" element={<EmployerRegister />} />
                <Route path="/employer/login" element={<EmployerLogin />} />

                <Route path="/register" element={<RegisterChoice />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </JobProvider>
      </UserProvider>
    </AuthProvider>
  );
}
