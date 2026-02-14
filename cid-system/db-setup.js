const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

/**
 * Criminal Investigation Database Setup Script
 * 
 * This script initializes the MySQL database for the CID system.
 * It creates the database if it doesn't exist and sets up all required tables.
 * 
 * USAGE:
 * 1. Make sure MySQL server is running
 * 2. Update the connection details below with your MySQL credentials
 * 3. Run: node db-setup.js
 * 
 * NOTE: If you encounter connection issues, verify your MySQL credentials and ensure
 * the MySQL server is running and accessible.
 */

// Create connection to MySQL server (without database)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password' // Update with your MySQL password
});

// Read the SQL schema file
const schemaPath = path.join(__dirname, '..', 'output', 'CID', 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

// Create database and tables
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  
  console.log('Connected to MySQL server');
  
  // Create database if it doesn't exist
  connection.query('CREATE DATABASE IF NOT EXISTS cid_database', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end();
      return;
    }
    
    console.log('Database created or already exists');
    
    // Switch to the created database
    connection.query('USE cid_database', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        connection.end();
        return;
      }
      
      console.log('Using cid_database');
      
      // Split the schema SQL into individual statements
      const statements = schemaSQL
        .replace(/DELIMITER \$\$/g, '')
        .replace(/DELIMITER ;/g, '')
        .split(';')
        .filter(statement => statement.trim() !== '');
      
      // Execute each statement
      let executedStatements = 0;
      
      statements.forEach((statement, index) => {
        // Skip SELECT statements
        if (statement.trim().toUpperCase().startsWith('SELECT')) {
          executedStatements++;
          if (executedStatements === statements.length) {
            console.log('Database setup completed');
            connection.end();
          }
          return;
        }
        
        connection.query(statement, (err) => {
          executedStatements++;
          
          if (err) {
            console.error(`Error executing statement ${index + 1}:`, err);
          } else {
            console.log(`Executed statement ${index + 1}`);
          }
          
          if (executedStatements === statements.length) {
            console.log('Database setup completed');
            connection.end();
          }
        });
      });
    });
  });
});