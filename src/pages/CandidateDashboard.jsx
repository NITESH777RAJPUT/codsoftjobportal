import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function CandidateDashboard() {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all jobs
    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs");
            setJobs(res.data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    // Fetch my applications
    const fetchApplications = async () => {
        try {
            const res = await api.get("/applications/me");
            setApplications(res.data);
        } catch (err) {
            console.error("Error fetching my applications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === "candidate") {
            fetchJobs();
            fetchApplications();
        }
    }, [user]);

    // Apply to a job
    const applyToJob = async (jobId) => {
        try {
            await api.post(`/applications/apply/${jobId}`, {});
            alert("Application submitted successfully!");
            fetchApplications();
        } catch (err) {
            console.error("Error applying to job:", err);
            alert(err.response?.data?.message || "Application failed");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Candidate Dashboard</h2>

            {/* Jobs */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-3">Available Jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    <div className="grid gap-4">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="border p-4 rounded shadow flex justify-between"
                            >
                                <div>
                                    <h4 className="font-bold">{job.title}</h4>
                                    <p>{job.description}</p>
                                </div>
                                <button
                                    onClick={() => applyToJob(job._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Apply
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* My Applications */}
            <div>
                <h3 className="text-xl font-semibold mb-3">My Applications</h3>
                {applications.length === 0 ? (
                    <p>You haven't applied to any jobs yet.</p>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="border p-4 rounded shadow flex flex-col"
                            >
                                <p>
                                    <strong>Job:</strong> {app.job?.title}
                                </p>
                                <p>
                                    <strong>Status:</strong> {app.status}
                                </p>
                                {app.interviewDate && (
                                    <p>
                                        <strong>Interview Date:</strong>{" "}
                                        {new Date(app.interviewDate).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
