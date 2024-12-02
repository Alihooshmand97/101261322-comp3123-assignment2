const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import auth routes for user authentication
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes for CRUD operations

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected locally'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use authentication routes for user registration and login
app.use('/auth', authRoutes); // /auth/signup and /auth/login routes

// Use employee routes for employee management
app.use('/employees', employeeRoutes); // /employees routes for CRUD operations

// Simple route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
