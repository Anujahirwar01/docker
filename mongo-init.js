// mongo-init.js - MongoDB initialization script
// This script runs when MongoDB container starts for the first time

// Create a user for our application database
db = db.getSiblingDB('mern-tutorial');

// Create a user with read/write access to our database
db.createUser({
    user: 'appuser',
    pwd: 'apppassword',
    roles: [
        {
            role: 'readWrite',
            db: 'mern-tutorial'
        }
    ]
});

// Insert some sample data to demonstrate the application
db.users.insertMany([
    {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date()
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date()
    },
    {
        name: 'Docker User',
        email: 'docker@example.com',
        createdAt: new Date()
    }
]);

print('✅ MongoDB initialized with sample data!');