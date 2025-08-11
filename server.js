const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/approutes.js');
const authRoutes = require('./routes/auth.js');
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://eco:connect@ecoconnect.wpllon1.mongodb.net/ecoconnect?retryWrites=true&w=majority&appName=ecoconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Images')));

// Page routes
app.use('/', routes);

// Auth API routes
app.use('/api', authRoutes);

app.use((req, res) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`EcoConnect backend running at http://localhost:${PORT}`);
});