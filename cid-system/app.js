/**
 * ========================================================================
 * CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM
 * ========================================================================
 * 
 * HOW TO RUN THIS APPLICATION:
 * 1. Open a terminal in this directory
 * 2. Run: node app.js
 * 3. Access the application at http://localhost:3000 in your browser
 * 
 * IMPORTANT NOTES:
 * - This application uses an in-memory mock database by default
 * - No MySQL installation is required to run the demo
 * - All data will be reset when the server restarts
 * 
 * If you have MySQL installed and want to use a real database:
 * - Uncomment the MySQL connection code below (lines 43-57)
 * - Comment out the mock database code (lines 37-40)
 * - Run db-setup.js first to initialize the database
 * 
 * ========================================================================
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const mysql = require('mysql2'); // Uncomment for real MySQL connection
const mockDb = require('./mockDb'); // Using mock database

// Import routes
const policeRoutes = require('./routes/police');
const criminalRoutes = require('./routes/criminal');
const crimeRecordRoutes = require('./routes/crimeRecord');
const victimRoutes = require('./routes/victim');
const witnessRoutes = require('./routes/witness');
const investigationRoutes = require('./routes/investigation');
const courtCaseRoutes = require('./routes/courtCase');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection - using mock database
const db = mockDb.createConnection();
db.connect();
console.log('Using mock database for demonstration');

/* Real MySQL connection - uncomment if you have MySQL set up
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Update with your MySQL password
  database: 'cid_database'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
*/

// Make db available to routes
app.locals.db = db;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/police', policeRoutes);
app.use('/api/criminals', criminalRoutes);
app.use('/api/crime-records', crimeRecordRoutes);
app.use('/api/victims', victimRoutes);
app.use('/api/witnesses', witnessRoutes);
app.use('/api/investigations', investigationRoutes);
app.use('/api/court-cases', courtCaseRoutes);

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server - listen on all network interfaces for production
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access locally: http://localhost:${PORT}`);
  console.log(`For remote access, use your server's IP address or domain name`);
});