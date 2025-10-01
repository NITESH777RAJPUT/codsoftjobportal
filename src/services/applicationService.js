import api from "./api";

export const applyToJob = (jobId, formData) => api.post(`/applications/apply/${jobId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
}).then(r => r.data);

export const getApplicationsForJob = (jobId) => api.get(`/applications/job/${jobId}`).then(r => r.data);
