const mysql = require('mysql2');

// Try different connection options
const connections = [
  {
    name: 'Default',
    config: {
      host: 'localhost',
      user: 'root',
      password: 'password'
    }
  },
  {
    name: 'No password',
    config: {
      host: 'localhost',
      user: 'root',
      password: ''
    }
  },
  {
    name: 'Socket',
    config: {
      socketPath: '/tmp/mysql.sock',
      user: 'root',
      password: 'password'
    }
  }
];

// Try each connection
connections.forEach(conn => {
  console.log(`Trying connection: ${conn.name}`);
  const connection = mysql.createConnection(conn.config);
  
  connection.connect((err) => {
    if (err) {
      console.error(`Error with ${conn.name} connection:`, err.message);
      connection.end();
    } else {
      console.log(`${conn.name} connection successful!`);
      connection.end();
    }
  });
});