
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Home
app.get('/', (req, res) => {
  res.send(`
    <h1>GitHub OAuth Demo</h1>
    <a href="/login">Login with GitHub</a>
  `);
});

app.get('/login', (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`;
  res.redirect(redirectUrl);
});

// Callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    // Get access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
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

    // Get user
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userResponse.data;

    res.send(`
      <h1>Welcome, ${user.login}</h1>
      <img src="${user.avatar_url}" width="100" />
      <p>ID: ${user.id}</p>
      <a href="${user.html_url}" target="_blank">Profile</a><br/>
      <a href="/">Go back</a>
    `);

  } catch (err) {
    console.log(err);
    res.status(500).send('Authentication failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at https://localhost/ ${PORT}`);
});