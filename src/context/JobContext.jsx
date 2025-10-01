import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const JobContext = createContext();

export function JobProvider({ children }) {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await api.get("/jobs");
                setJobs(data.data || []);
            } catch (err) {
                console.error("Failed to load jobs", err.response?.data || err.message);
            }
        };
        loadJobs();
    }, []);

    const refreshJobs = async () => {
        try {
            const data = await api.get("/jobs");
            setJobs(data.data || []);
        } catch (err) {
            console.error("Failed to refresh jobs", err);
        }
    };

    const refreshApplications = async () => {
        try {
            const data = await api.get("/applications");
            setApplications(data.data || []);
        } catch (err) {
            console.error("Failed to refresh applications", err);
        }
    };

    const addJob = async (jobData) => {
        const res = await api.post("/jobs", jobData);
        setJobs((s) => [res.data, ...s]);
        return res.data;
    };

    return (
        <JobContext.Provider value={{
            jobs,
            applications,
            refreshJobs,
            refreshApplications,
            addJob
        }}>
            {children}
        </JobContext.Provider>
    );
}
