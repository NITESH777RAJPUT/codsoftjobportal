import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { JobContext } from "../context/JobContext";
import api from "../utils/api";

export default function EmployerDashboard() {
    const { user } = useContext(AuthContext);
    const { jobs, refreshJobs, applications, refreshApplications, addJob } = useContext(JobContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        type: "full-time",
    });

    const [myJobs, setMyJobs] = useState([]);

    // Filter employer's jobs from jobs list
    useEffect(() => {
        if (!user?._id) return;
        const mj = jobs.filter((j) => {
            if (!j.employer) return false;
            if (typeof j.employer === "string") return j.employer === user._id;
            return j.employer._id ? j.employer._id === user._id : j.employer.toString() === user._id;
        });
        setMyJobs(mj);
    }, [jobs, user]);

    // Load applications for employer via context refresh
    useEffect(() => {
        if (user?.role === "employer") refreshApplications();
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Add job
    const handleAddJob = async (e) => {
        e.preventDefault();
        try {
            const job = await addJob({
                ...formData,
                company: user.companyName || formData.company || user.name,
            });

            setFormData({
                title: "",
                description: "",
                company: "",
                location: "",
                salary: "",
                type: "full-time",
            });

            await refreshJobs();
        } catch (err) {
            console.error("Error adding job", err.response?.data || err.message);
            alert("Failed to add job");
        }
    };

    // Update applicant status (shortlist)
    const handleSelect = async (appId) => {
        try {
            await api.put(`/applications/${appId}`, { status: "shortlisted" });
            await refreshApplications();
        } catch (err) {
            console.error("Error updating application", err.response?.data || err.message);
            alert("Failed to update");
        }
    };

    if (!user || user.role !== "employer") {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold">
                Access denied. Employers only.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/* Job posting form */}
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
            <form className="flex flex-col gap-3" onSubmit={handleAddJob}>
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
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Post Job
                </button>
            </form>

            {/* Employer Jobs + Applicants */}
            <h2 className="text-2xl font-bold mt-10 mb-4">Your Jobs & Applicants</h2>
            {myJobs.map((job) => (
                <div key={job._id} className="border p-3 rounded mb-4">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p>{job.description}</p>
                    <p className="text-sm text-gray-500">{job.location} | {job.type} | {job.salary && `₹${job.salary}`}</p>

                    <h4 className="font-semibold mt-2">Applicants:</h4>
                    {applications
                        .filter((a) => a.job && (a.job._id ? a.job._id === job._id : a.job === job._id))
                        .map((app) => (
                            <div key={app._id} className="flex justify-between items-center mt-1">
                                <span>
                                    {app.candidate?.name} ({app.candidate?.email})
                                </span>
                                {app.status !== "shortlisted" ? (
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleSelect(app._id)}
                                    >
                                        Shortlist
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-semibold">Shortlisted</span>
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
