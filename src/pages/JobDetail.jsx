import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJob } from "../services/jobService";

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchJob(id).then(data => {
            setJob(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="text-center mt-20 p-6">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-40 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    );

    if (!job) return (
        <div className="text-center mt-20 p-6 text-red-600 font-semibold">
            Job not found.
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
            {/* Header and Call to Action */}
            <div className="flex justify-between items-start border-b pb-6 mb-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{job.title}</h2>
                    <p className="text-lg text-blue-600 font-semibold">{job.company || "Confidential Company"}</p>
                </div>
                <Link
                    to={`/jobs/${job._id}/apply`}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                    Apply Now
                </Link>
            </div>

            {/* Job Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">📍 Location</span>
                    <span className="font-medium text-gray-800">{job.location || "Global"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">💼 Job Type</span>
                    <span className="font-medium text-gray-800">{job.type || "Full-Time"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">💰 Salary Range</span>
                    <span className="font-medium text-gray-800">{job.salary ? `₹${job.salary}` : "Competitive"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">🗓 Posted On</span>
                    <span className="font-medium text-gray-800">2 days ago (Placeholder)</span>
                </div>
            </div>

            {/* Description */}
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Job Description</h3>
                <div className="prose max-w-none text-gray-700">
                    <p>{job.description}</p>
                    {/* Add more detailed description structure here if available (e.g., bullet points) */}
                </div>
            </div>

            {/* Company Info Placeholder */}
            <div className="mt-10 border-t pt-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">About the Company</h3>
                <p className="text-gray-600">
                    {job.company || "Confidential Company"} is a leader in the {job.company || "tech"} industry, focused on innovation and growth.
                </p>
            </div>
        </div>
    );
}