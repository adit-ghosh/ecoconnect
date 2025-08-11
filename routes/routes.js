const path = require('path');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const router = express.Router();

function sendHtml(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        } else {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('500 error');
        }
    });
}

router.get('/', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Index.html'));
});

router.get('/community', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Community_Forum.html'));
});

router.get('/shop', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Shopping_Assistant.html'));
});

router.get('/education', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Education.html'));
});

router.get('/eco-ride', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Eco_Ride.html'));
});

router.get('/login', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'Login.html'));
});

router.get('/user', (req, res) => {
    sendHtml(res, path.join(__dirname, '..', 'Pages', 'User.html'));
});

router.get('/api/geocode', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Missing text parameter' });
    const apiKey = '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';
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(text)}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Geocoding failed', details: err.message });
    }
});

module.exports = router;