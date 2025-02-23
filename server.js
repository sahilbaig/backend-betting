import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

// Load environment variables
config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging

// Import routes
import apiRoutes from './routes/apiRoutes.js';
app.use('/api', apiRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});