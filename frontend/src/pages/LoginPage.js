import React, { useState } from 'react';
import axios from '../api/axios';  // Adjust the path to go up one level and into the api folder
import { TextField, Button, Container, Typography, Box, Grid, Paper } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before submission
        try {
            const response = await axios.post('/login', { email, password });
            console.log(response.data); // Handle successful login (e.g., save token)
            // Redirect to employee page or dashboard
        } catch (error) {
            console.error('Error logging in', error);
            setError('Invalid email or password'); // Display error message
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" component="h1" align="center">
                    Login
                </Typography>
                {error && (
                    <Box sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}>
                        <Typography>{error}</Typography>
                    </Box>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;
