const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',         
  password: '',         
  database: 'crime_db'  
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API Endpoint to fetch crime data
app.get('/api/crimes', (req, res) => {
  connection.query('SELECT * FROM CrimeRecord', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
