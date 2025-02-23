import pg from 'pg'; // Import the entire pg module as a default export
const { Pool } = pg; // Destructure Pool from the imported module

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new Pool instance
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

// Log when the pool connects to the database
pool.on('connect', () => {
    console.log('Connected to Render PostgreSQL database');
});

// Export the pool for use in other modules
export default pool;