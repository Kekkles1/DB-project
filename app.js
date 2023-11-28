const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sys'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Create a simple API endpoint
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// server.js

// ... (other imports and configurations)

app.use(bodyParser.json());

// Endpoint for user login
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Query the database to check if the user exists
  db.query('SELECT * FROM users WHERE username VALUES ?', [username], (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  });
});