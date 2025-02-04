const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Form submission endpoint
app.post('/submit', async(req, res) => {
    const { name, email, phone } = req.body;

    try {
        const msg = {
            from: 'protradingai@yahoo.com',
            to: 'protradingai@yahoo.com',
            subject: '🎉 New Trading AI Pro Sign Up!',
            html: `
                <div style="padding: 20px; background: #f9f9f9; border-radius: 10px;">
                    <h2 style="color: #333;">New Sign Up Alert! 🚀</h2>
                    <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 5px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Sign Up Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">Trading AI Pro - New Lead Notification</p>
                </div>
            `
        };
        await transporter.sendMail(msg);

        console.log('Email sent successfully');
        res.status(200).json({
            success: true,
            message: 'Thank you for signing up! We will contact you shortly.'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error processing your request. Please try again.'
        });
    }
});

// Add this endpoint to your server.js
app.get('/admin-data', async(req, res) => {
    try {
        // You can access this endpoint at http://localhost:3000/admin-data
        const allData = {
            cookies: req.cookies,
            submissions: await getAllSubmissions() // If you're storing in a database
        };
        res.json(allData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});