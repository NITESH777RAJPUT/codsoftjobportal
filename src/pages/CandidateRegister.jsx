import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function CandidateRegister() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        skills: "",
        bio: "",
    });

    const [error, setError] = useState(""); // 👈 error state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // reset error before request

        try {
            const res = await api.post("/auth/register", {
                ...formData,
                role: "candidate",
                skills: formData.skills.split(",").map((s) => s.trim()), // comma separated
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);

            navigate("/candidate");
        } catch (err) {
            console.error("Candidate register error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">Candidate Register</h2>

            {/* Error message box */}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-3 border border-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <textarea
                    name="bio"
                    placeholder="Short Bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
