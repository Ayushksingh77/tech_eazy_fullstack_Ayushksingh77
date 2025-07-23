require('dotenv').config();
const express = require('express');
const cors = require('cors');
const parcelRoutes = require('./routes/parcelRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parcels', parcelRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Zero Mile Delivery API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
