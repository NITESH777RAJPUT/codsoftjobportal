// Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // ✅ Correct API URL
            const res = await fetch("https://codsoft-jobportal.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is OK
            if (!res.ok) {
                const text = await res.text();
                console.error("Error response:", text); // shows HTML if any
                alert("Login failed. Check console for details.");
                return;
            }

            const data = await res.json();

            // Save token in localStorage
            localStorage.setItem("token", data.token);

            // Update user context
            setUser({ name: data.user.name, role: data.user.role });

            // Redirect to home
            nav("/");
        } catch (err) {
            console.error("Login error:", err);
            alert("Error logging in. Check console for details.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
