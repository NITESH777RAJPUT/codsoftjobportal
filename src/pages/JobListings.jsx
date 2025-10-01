// pages/JobListings.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { JobContext } from "../context/JobContext";

export default function JobListings() {
    const { jobs } = useContext(JobContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    // --- (Feature Placeholder: Filtering Logic - Frontend Only) ---
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "all" || job.type === filterType)
    );
    // --- (End Feature Placeholder) ---

    return (
        <div className="max-w-6xl mx-auto mt-12 p-4">
            <h2 className="text-4xl font-extrabold mb-8 text-gray-800 border-b pb-2">
                Explore Exciting Opportunities
            </h2>

            {/* --- Advanced Filter/Search Bar (Bulky Feature) --- */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 sticky top-0 z-10">
                <input
                    type="text"
                    placeholder="Search by Title or Keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full md:w-52 bg-white appearance-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                >
                    <option value="all">All Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </select>
                <button
                    className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 font-medium w-full md:w-40"
                    onClick={() => { setSearchTerm(""); setFilterType("all"); }}
                >
                    Reset Filters
                </button>
            </div>

            {/* --- Job Listings Grid --- */}
            {filteredJobs.length === 0 && <p className="text-center text-gray-500 mt-10">No jobs match your search criteria.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <div
                        key={job._id} // Using _id which is consistent with backend/JobDetail.jsx
                        className="border p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                            {job.title}
                        </h3>
                        <p className="text-sm font-medium text-blue-600 mb-3">{job.company || "Company Name"}</p>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {job.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 border-t pt-3">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{job.type}</span>
                            <span>📍 {job.location || "Remote"}</span>
                        </div>

                        <Link
                            to={`/jobs/${job._id}`}
                            className="w-full inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-2"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}