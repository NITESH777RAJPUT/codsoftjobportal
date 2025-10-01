import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function PostJob() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        type: "full-time",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await api.post("/jobs", formData); // backend POST call
            setSuccess("Job posted successfully!");
            setFormData({
                title: "",
                description: "",
                company: "",
                location: "",
                salary: "",
                type: "full-time",
            });
            // redirect to employer dashboard after 2 sec
            setTimeout(() => navigate("/employer"), 2000);
        } catch (err) {
            console.error("Job post error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to post job");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

            {/* Error / Success message */}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-3 border border-red-400">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-700 p-2 rounded mb-3 border border-green-400">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary (optional)"
                    value={formData.salary}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
}
