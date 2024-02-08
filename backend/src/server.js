// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server, listening on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
