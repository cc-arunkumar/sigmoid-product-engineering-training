require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/callback`;

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.error('Error: CLIENT_ID and CLIENT_SECRET environment variables are required');
  process.exit(1);
}

const states = new Set();

app.get('/', (req, res) => {
  res.send(`
    <h1>GitHub OAuth Demo</h1>
    <a href="/login">Login with GitHub</a>
  `);
});

app.get('/login', (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  states.add(state);

  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'read:user',
    state,
  });

  const redirectUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.redirect(redirectUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  const error = req.query.error;

  if (error) {
    return res.status(400).send(`<h1>GitHub OAuth error</h1><p>${error}</p><a href="/">Back</a>`);
  }

  if (!state || !states.has(state)) {
    return res.status(400).send('<h1>Invalid state</h1><p>Possible CSRF attempt</p><a href="/">Back</a>');
  }

  states.delete(state);

  if (!code) {
    return res.status(400).send('<h1>No code provided</h1><a href="/">Back</a>');
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      },
      { headers: { Accept: 'application/json' } }
    );

    if (tokenResponse.data.error) {
      return res.status(401).send(`<h1>Token Error</h1><p>${tokenResponse.data.error_description || tokenResponse.data.error}</p><a href="/">Back</a>`);
    }

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).send('<h1>No access token received</h1><a href="/">Back</a>');
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userResponse.data;

    res.send(`
      <h1>Welcome, ${user.login || 'GitHub User'}!</h1>
      <img src="${user.avatar_url || ''}" alt="avatar" width="100" />
      <p><strong>GitHub ID:</strong> ${user.id || 'N/A'}</p>
      <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
      <p><strong>Bio:</strong> ${user.bio || 'N/A'}</p>
      <p><a href="${user.html_url || '#'}" target="_blank">View GitHub Profile</a></p>
      <p><a href="/">Go back home</a></p>
    `);

  } catch (err) {
    console.error('OAuth Error:', err.response?.data || err.message || err);
    res.status(500).send('<h1>Authentication failed</h1><a href="/">Back</a>');
  }
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});