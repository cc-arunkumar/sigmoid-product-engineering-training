require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
        <h1>OAuth 2.0 Example</h1>
        <a href="/login">Login with OAuth</a>
    `);
});

app.get("/login", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`;

  res.redirect(redirectUrl);
});

// Callback route - GitHub redirects here after login
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).send("No access token received");
    }

    // Use the access token to get user info
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    // Send simple HTML response with user info
    res.send(`
        <html>
            <head>
            <title>GitHub Profile</title>
            <style>
                body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                }

                .card {
                background: #1e293b;
                padding: 30px;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                width: 320px;
                transition: transform 0.3s ease;
                }

                .card:hover {
                transform: translateY(-5px);
                }

                h1 {
                margin-bottom: 15px;
                font-size: 22px;
                }

                img {
                border-radius: 50%;
                margin: 15px 0;
                border: 3px solid #38bdf8;
                }

                p {
                margin: 8px 0;
                color: #cbd5f5;
                }

                a {
                display: inline-block;
                margin-top: 12px;
                padding: 10px 16px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                transition: 0.3s;
                }

                a.profile {
                background: #38bdf8;
                color: #0f172a;
                }

                a.profile:hover {
                background: #0ea5e9;
                }

                a.home {
                background: transparent;
                color: #94a3b8;
                }

                a.home:hover {
                color: #fff;
                }
            </style>
            </head>

            <body>
            <div class="card">
                <h1>Welcome, ${user.login} 👋</h1>
                <img src="${user.avatar_url}" alt="avatar" width="100" />
                <p><strong>GitHub ID:</strong> ${user.id}</p>

                <a class="profile" href="${user.html_url}" target="_blank">
                View Profile
                </a>

                <br/>

                <a class="home" href="/">
                Go back home
                </a>
            </div>
            </body>
        </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
