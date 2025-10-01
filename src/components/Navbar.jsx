import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md relative">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-xl font-bold text-indigo-600">Job Portal</Link>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <Link to="/jobs" className="hover:text-indigo-600">Jobs</Link>

                    {user ? (
                        <>
                            {user.role === "employer" ? (
                                <Link to="/employer" className="hover:text-indigo-600">Employer Dashboard</Link>
                            ) : (
                                <Link to="/candidate" className="hover:text-indigo-600">Candidate Dashboard</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login Dropdown */}
                            <div className="relative group">
                                <button className="hover:text-indigo-600">Login ▾</button>
                                <div className="absolute hidden group-hover:flex flex-col bg-white border rounded shadow-md z-50">
                                    <Link to="/candidate/login" className="px-4 py-2 hover:bg-gray-100">Candidate Login</Link>
                                    <Link to="/employer/login" className="px-4 py-2 hover:bg-gray-100">Employer Login</Link>
                                </div>
                            </div>

                            {/* Register Dropdown */}
                            <div className="relative group">
                                <button className="hover:text-indigo-600">Register ▾</button>
                                <div className="absolute hidden group-hover:flex flex-col bg-white border rounded shadow-md z-50">
                                    <Link to="/candidate/register" className="px-4 py-2 hover:bg-gray-100">Candidate Register</Link>
                                    <Link to="/employer/register" className="px-4 py-2 hover:bg-gray-100">Employer Register</Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-indigo-600"
                >
                    ☰
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-3 bg-gray-100 p-4">
                    <Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link>
                    {user ? (
                        <>
                            {user.role === "employer" ? (
                                <Link to="/employer" onClick={() => setIsOpen(false)}>Employer Dashboard</Link>
                            ) : (
                                <Link to="/candidate" onClick={() => setIsOpen(false)}>Candidate Dashboard</Link>
                            )}
                            <button
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Mobile Login options */}
                            <Link to="/candidate/login" onClick={() => setIsOpen(false)}>Candidate Login</Link>
                            <Link to="/employer/login" onClick={() => setIsOpen(false)}>Employer Login</Link>

                            {/* Mobile Register options */}
                            <Link to="/candidate/register" onClick={() => setIsOpen(false)}>Candidate Register</Link>
                            <Link to="/employer/register" onClick={() => setIsOpen(false)}>Employer Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
