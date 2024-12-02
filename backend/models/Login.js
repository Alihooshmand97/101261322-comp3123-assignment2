
import React, { useState } from 'react';
import axios from '../api/axios'; // Ensure the path is correct to your axios instance

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset previous errors

        try {
            // Send login request to the backend
            const response = await axios.post('/auth/login', { email, password });

            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to employee page (or another route)
            window.location.href = '/employees'; // You can replace this with your routing logic
        } catch (err) {
            // Handle error (e.g., invalid credentials)
            setError('Invalid credentials, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
