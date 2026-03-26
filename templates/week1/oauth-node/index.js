import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// HOME route
app.get("/", (req, res) => {
  res.send(`
    <h1>Github OAuth Demo</h1>
    <a href="/login">Login with Github</a>
  `);
});

// LOGIN route
app.get("/login", (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`;
  res.redirect(redirectURL);
});

// CALLBACK route
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET_KEY,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).send("No access token received");
    }

    // Get user info (from image)
    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = userResponse.data;

    // Send HTML response (from image)
    res.send(`
      <h1>Welcome, ${user.login}!</h1>
      <img src="${user.avatar_url}" alt="avatar" width="100" />
      <p>GitHub ID: ${user.id}</p>
      <p><a href="${user.html_url}" target="_blank">View GitHub Profile</a></p>
      <p><a href="/">Go back home</a></p>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed");
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});