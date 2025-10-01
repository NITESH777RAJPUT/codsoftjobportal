import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
    return (
        <div className="border rounded p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} • {job.location || "Remote"}</p>
            <p className="mt-2 text-sm">{job.description?.slice(0, 120)}...</p>
            <div className="mt-3">
                <Link to={`/jobs/${job._id}`} className="text-blue-600">View</Link>
            </div>
        </div>
    );
}
