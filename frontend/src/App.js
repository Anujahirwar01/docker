// App.js - Main React component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // State management for users and form
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // API base URL - In Docker, we use service names
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch all users from backend
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError('');

            // Axios makes HTTP requests to our Express backend
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data.data);

            console.log('✅ Users fetched:', response.data);
        } catch (error) {
            setError('Failed to fetch users. Make sure backend is running!');
            console.error('❌ Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new user
    const createUser = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            setError('Please fill in both name and email');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Send POST request to backend
            const response = await axios.post(`${API_URL}/users`, formData);
            console.log('✅ User created:', response.data);

            // Reset form and refresh users list
            setFormData({ name: '', email: '' });
            fetchUsers();

        } catch (error) {
            setError('Failed to create user. Please try again.');
            console.error('❌ Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>🐳 MERN Stack + Docker Tutorial</h1>
                <p>This React app is running in a Docker container!</p>
            </header>

            <main className="App-main">
                {/* Error display */}
                {error && <div className="error">{error}</div>}

                {/* User creation form */}
                <section className="user-form">
                    <h2>Add New User</h2>
                    <form onSubmit={createUser}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Add User'}
                        </button>
                    </form>
                </section>

                {/* Users list */}
                <section className="users-list">
                    <div className="section-header">
                        <h2>Users ({users.length})</h2>
                        <button onClick={fetchUsers} disabled={loading}>
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

                    {users.length === 0 ? (
                        <p className="empty-state">No users found. Add some users above!</p>
                    ) : (
                        <div className="users-grid">
                            {users.map((user) => (
                                <div key={user._id} className="user-card">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <small>Created: {new Date(user.createdAt).toLocaleDateString()}</small>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Docker info */}
                <section className="docker-info">
                    <h2>🐳 Docker Architecture</h2>
                    <div className="architecture">
                        <div className="service">
                            <h3>Frontend (React)</h3>
                            <p>Port 3000 • This container</p>
                        </div>
                        <div className="service">
                            <h3>Backend (Express)</h3>
                            <p>Port 5000 • API Server</p>
                        </div>
                        <div className="service">
                            <h3>Database (MongoDB)</h3>
                            <p>Port 27017 • Data Storage</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;