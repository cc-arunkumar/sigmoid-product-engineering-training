// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1>GitHub OAuth Demo</h1>
        <a href="/login">Login with GitHub</a> 
    `);
});

// Login route redirect to GitHub for authentication
app.get('/login', (req, res) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`;
    res.redirect(redirectUrl);
});

// Callback route - GitHub redirects here after login
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        // Exchange the code for an access token
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
            },
            {
                headers: { Accept: 'application/json' },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            return res.status(400).send('No access token received');
        }

        // Use the access token to get user info
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = userResponse.data;

        // Display simple HTML with user info
        res.send(`
            <h1>Welcome, ${user.login}!</h1>
            <img src="${user.avatar_url}" alt="avatar" width="100" />
            <p>GitHub ID: ${user.id}</p>
            <p><a href="${user.html_url}" target="_blank">View GitHub Profile</a></p>
            <p><a href="/">Go back home</a></p>
        `);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Authentication failed');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});