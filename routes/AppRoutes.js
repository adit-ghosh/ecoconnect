const path = require('path');
const fs = require('fs');
const express = require('express');
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

module.exports = router;