const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Setup nodemailer (use your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iotdevxcorp@gmail.com', // replace with your email
        pass: 'ehoqdeefhvupzhsd'      // use app password if using Gmail
    }
});

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email already registered.' });
        }
        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        // Save user
        const user = new User({ username, email, password, verificationToken });
        await user.save();

        // Send verification email
        const verificationLink = `http://${req.headers.host}/api/verify/${verificationToken}`;
        transporter.sendMail({
            from: 'EcoConnect <iotdevxcorp@gmail.com>',
            to: email,
            subject: 'EcoConnect Email Verification',
            html: `<p>Hi ${username},</p>
                   <p>Click the link below to verify your email:</p>
                   <a href="${verificationLink}">${verificationLink}</a>`
        }, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Registration succeeded, but verification email failed to send.' });
            }
            res.json({ message: 'Verification email sent. Please check your inbox.' });
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Registration failed.' });
    }
});

// Verification endpoint
router.get('/verify/:token', async (req, res) => {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send('Invalid verification link.');
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.redirect('/user');
});

// User profile endpoint
router.get('/user', async (req, res) => {
    // Example: get user from session or JWT
    const userId = req.session?.userId; // or decode JWT from cookie/header
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
        username: user.username,
        email: user.email,
        ecoPoints: user.ecoPoints || 0
    });
});

module.exports = router;