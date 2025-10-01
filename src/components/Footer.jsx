import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 p-4 text-center">
            <div className="container mx-auto">
                <small>© {new Date().getFullYear()} Job Portal</small>
            </div>
        </footer>
    );
}
