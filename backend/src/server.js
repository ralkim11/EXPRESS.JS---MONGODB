const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes.js'); 

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURL = 'mongodb://localhost:27017/contact';

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allowed origin
  optionsSuccessStatus: 200, // Success status for preflight requests
};

// Route handler function
app.get('/contact/.', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is a CORS-enabled function' });
});

// Applying CORS 
app.use(cors());

// Importing contactRoutes
app.use('/', contactRoutes);

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your Express server once connected to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });