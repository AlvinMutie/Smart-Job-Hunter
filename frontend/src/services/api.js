import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add interceptor to attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: (data) => api.post('/register', data).then(res => res.data),
    login: (formData) => api.post('/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => res.data),
    getMe: () => api.get('/me').then(res => res.data),
    updateProfile: (data) => api.post('/profile', data).then(res => res.data),
    uploadResume: (formData) => api.post('/upload-resume', formData).then(res => res.data),
};

export const jobService = {
    getJobs: (params) => api.get('/jobs', { params }).then(res => res.data),
    matchResume: (formData) => api.post('/match', formData).then(res => res.data),
    generateCoverLetter: (formData) => api.post('/generate-cover-letter', formData).then(res => res.data),
};

export const trackerService = {
    getApplications: () => api.get('/applications').then(res => res.data),
    addApplication: (data) => api.post('/applications', data).then(res => res.data),
};

export default api;
