import { useContext, useState } from "react"; // Added useState
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate

const Home = () => {
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    // getDashboardLink function is no longer needed since the "Get Started" button is removed.

    // Function to handle the search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navigate to job listings and pass the search term as a query parameter
            navigate(`/jobs?q=${searchTerm.trim()}`);
        } else {
            // If empty, just go to the main job listings page
            navigate("/jobs");
        }
    };

    return (
        <div className="min-h-[90vh] w-full flex flex-col items-center justify-center bg-gray-900 text-white text-center px-4 relative overflow-hidden">
            {/* Background Gradient Effect (Bulky Animation) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="w-1/2 h-full bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 left-0"></div>
                <div className="w-1/2 h-full bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-0 right-0"></div>
            </div>

            <div className="relative z-10 max-w-4xl">
                <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                        Connect Talent.
                    </span>
                    <br />
                    Achieve Growth.
                </h1>
                <p className="mb-10 text-xl text-gray-300 max-w-2xl mx-auto">
                    The next generation platform for finding your dream role or your next star hire.
                </p>

                {/* === NEW FEATURE: PROFESSIONAL SEARCH BAR === */}
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-lg mx-auto mb-6 flex shadow-2xl rounded-full overflow-hidden transition duration-300 transform hover:scale-[1.02] border-4 border-transparent hover:border-blue-500" // Added hover animation on the form itself
                >
                    <input
                        type="text"
                        placeholder="Search for 1000s of Jobs: Developer, Manager, Designer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-4 text-gray-900 border-none outline-none focus:ring-0 rounded-l-full"
                    />
                    <button
                        type="submit"
                        className="px-6 py-4 bg-green-500 text-white font-bold hover:bg-green-600 transition duration-300 transform hover:shadow-inner"
                    >
                        Search 🔍
                    </button>
                </form>

                {/* Secondary Call to Action (Browse Jobs) */}
                <div className="flex justify-center mt-4">
                    <Link
                        to="/jobs"
                        className="px-6 py-2 text-md font-semibold border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition duration-300 transform hover:scale-105"
                    >
                        Or Browse All Jobs
                    </Link>
                </div>

            </div>

            {/* Note: Requires a small addition to your global CSS for 'animate-fade-in' and 'animate-blob' */}
        </div>
    );
};

export default Home;