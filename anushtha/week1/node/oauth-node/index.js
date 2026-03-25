require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>GitHub OAuth Demo</h1>
        <a href="/login">Login with GitHub</a>
    `);
});

app.get('/login', (req, res) => {
    const redirect_uri = 'http://localhost:3000/callback';

    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read:user`
    );
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.send('No code provided');
    }

    try {
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                code: code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = userResponse.data;

        res.send(`
            <h1>Welcome, ${user.login}</h1>
            <img src="${user.avatar_url}" alt="Avatar" width="100" />
            <p>GitHub ID: ${user.id}</p>
            <p><a href="${user.html_url}" target="_blank">GitHub Profile</a></p>
            <p><a href="/">Go Back</a></p>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});