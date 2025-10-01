import api from "./api";

export const fetchJobs = (search) => api.get("/jobs", { params: { search } }).then(r => r.data);
export const fetchJob = (id) => api.get(`/jobs/${id}`).then(r => r.data);
export const createJob = (data) => api.post("/jobs", data).then(r => r.data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data).then(r => r.data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`).then(r => r.data);
