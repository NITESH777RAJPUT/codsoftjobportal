import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function EmployerLogin() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(""); // 👈 error state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // reset error before request

        try {
            const res = await api.post("/auth/login", formData);

            if (res.data.user.role !== "employer") {
                setError("This account is not an employer account.");
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);

            navigate("/employer");
        } catch (err) {
            console.error("Employer login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">Employer Login</h2>

            {/* Error message */}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-3 border border-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
