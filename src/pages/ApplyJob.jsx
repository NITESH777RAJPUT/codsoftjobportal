import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyToJob } from "../services/applicationService";

export default function ApplyJob() {
    const { id } = useParams();
    const [coverLetter, setCoverLetter] = useState("");
    const [file, setFile] = useState(null);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("coverLetter", coverLetter);
        if (file) fd.append("resume", file);

        try {
            await applyToJob(id, fd);
            alert("Applied!");
            nav("/jobs");
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Apply for Job</h2>
            <form onSubmit={submit} className="space-y-3 max-w-lg">
                <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Cover letter" className="w-full border p-2 rounded" />
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            </form>
        </div>
    );
}
