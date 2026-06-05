const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const UserRoutes = require('./Routes/UserRoutes');

const app = express();

const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
    : ['http://localhost:3000'];

app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/user', UserRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err.message);
        process.exit(1);
    });
