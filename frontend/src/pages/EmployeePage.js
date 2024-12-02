import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { TextField, Button, Grid, Typography, Paper, Box, Alert } from '@mui/material'; // Material-UI components

function EmployeePage() {
    // State for employees
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', salary: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEmployees = () => {
            axios.get('/employees')
                .then(response => {
                    setEmployees(response.data);
                    setFilteredEmployees(response.data);
                })
                .catch(error => {
                    console.error('Error fetching employees', error);
                    setError('Error fetching employees. Please try again later.');
                });
        };

        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/employees', newEmployee);
            setEmployees([...employees, response.data]);
            setFilteredEmployees([...employees, response.data]);
            setNewEmployee({ name: '', position: '', department: '', salary: '' });
            setSuccessMessage('Employee added successfully!');
        } catch (error) {
            console.error('Error adding employee', error);
            setError('Error adding employee. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filteredList = employees.filter((employee) =>
            employee.department.toLowerCase().includes(query.toLowerCase()) ||
            employee.position.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredEmployees(filteredList);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Employee Management</Typography>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Paper sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Add New Employee</Typography>
                <form onSubmit={handleAddEmployee}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={newEmployee.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Position"
                                variant="outlined"
                                fullWidth
                                name="position"
                                value={newEmployee.position}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Department"
                                variant="outlined"
                                fullWidth
                                name="department"
                                value={newEmployee.department}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Salary"
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="salary"
                                value={newEmployee.salary}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Employee'}
                    </Button>
                </form>
            </Paper>

            <Paper sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Search Employees</Typography>
                <TextField
                    label="Search by Department or Position"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Paper>

            <Paper sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Employees List</Typography>
                <ul>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <li key={employee._id || employee.id}>
                                <Typography variant="body1">
                                    {employee.name} - {employee.position} - {employee.department} - ${employee.salary}
                                </Typography>
                            </li>
                        ))
                    ) : (
                        <Typography variant="body1">No employees found.</Typography>
                    )}
                </ul>
            </Paper>
        </Box>
    );
}

export default EmployeePage;
