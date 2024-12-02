import axios from 'axios';  // Import axios from the package
const instance = axios.create({
    baseURL: 'http://localhost:5001', // Replace with the backend URL
});

export default instance;  // Export the axios instance
