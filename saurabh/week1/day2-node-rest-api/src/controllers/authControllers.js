const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");

// Mock users database
let USERS = [
  {
    id: 1,
    username: "admin",
    password: "1234",
    email: "admin@example.com",
    role: "admin"
  },
  {
    id: 2,
    username: "user",
    password: "1234",
    email: "user@example.com",
    role: "user"
  }
];

// Login with username and password
exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    // Find user
    const user = USERS.find(u => u.username === username);

    if (!user || user.password !== password) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Generate token with role
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { 
      token, 
      user: { 
        userId: user.id, 
        username: user.username, 
        role: user.role,
        email: user.email
      } 
    });

  } catch (error) {
    return next(new AppError(error.message || "Login failed", 500));
  }
};

// Google OAuth callback handler
exports.googleCallback = (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/api/auth/oauth-error?message=Google%20authentication%20failed");
    }

    // Check if Google user already exists in our mock DB (by email)
    const existingUser = USERS.find(u => u.email === user.email);

    const authUser = existingUser
      ? existingUser
      : (function () {
          // Create a new mock user record for this Google user
          const newUser = {
            id: USERS[USERS.length - 1].id + 1,
            username: user.username,
            email: user.email,
            role: user.role, // admin if saurabhccs11@gmail.com, otherwise user
            password: null
          };
          USERS.push(newUser);
          return newUser;
        })();

    // Generate JWT
    const token = jwt.sign(
      {
        userId: authUser.id,
        username: authUser.username,
        role: authUser.role
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    // Redirect to success page with token
    res.redirect(`/api/auth/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(authUser))}`);
  } catch (error) {
    return res.redirect(`/api/auth/oauth-error?message=${encodeURIComponent(error.message)}`);
  }
};

// OAuth Success Page - Display token to user
exports.oauthSuccess = (req, res) => {
  const token = req.query.token;
  const user = req.query.user ? JSON.parse(decodeURIComponent(req.query.user)) : null;

  if (!token) {
    return res.status(400).send("<h1>Error: No token received</h1>");
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OAuth Login Success</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 900px; 
          margin: 50px auto; 
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success { 
          color: #4CAF50; 
          font-weight: bold; 
          font-size: 24px;
        }
        .token-box { 
          background: #f0f0f0; 
          padding: 15px; 
          border-radius: 5px; 
          word-break: break-all;
          font-family: monospace;
          border-left: 4px solid #4CAF50;
          margin: 20px 0;
        }
        .copy-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
        }
        .copy-btn:hover {
          background: #45a049;
        }
        h1 { color: #333; }
        h2 { color: #555; margin-top: 30px; }
        code { 
          background: #eee; 
          padding: 2px 5px;
          border-radius: 3px;
        }
        .user-info {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .user-info p {
          margin: 5px 0;
        }
        pre {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          overflow: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="success">✓ OAuth Login Successful!</h1>
        
        <div class="user-info">
          <p><strong>Welcome, ${user?.username || 'User'}!</strong></p>
          <p><strong>Email:</strong> ${user?.email || 'N/A'}</p>
          <p><strong>Role:</strong> <span style="color: #ff9800; font-weight: bold;">${user?.role || 'user'}</span></p>
          <p><strong>User ID:</strong> ${user?.id || 'N/A'}</p>
        </div>
        
        <h2>🔑 Your JWT Token:</h2>
        <div class="token-box" id="tokenBox">${token}</div>
        <button class="copy-btn" onclick="copyToClipboard()">📋 Copy Token</button>
        
        <h2>📝 How to use this token:</h2>
        <p>Add this to your request headers when calling protected endpoints:</p>
        <pre>Authorization: Bearer ${token}</pre>
        
        <h2>🧪 Test Protected Endpoints:</h2>
        <p>Use the token in Postman or curl:</p>
        <pre>curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/products</pre>
        
        <h3>Example cURL commands for each API:</h3>
        <ul>
          <li><strong>GET Products (protected):</strong> 
            <code>curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/products</code>
          </li>
          <li><strong>GET Users (protected):</strong> 
            <code>curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/users</code>
          </li>
          <li><strong>GET Orders (protected):</strong> 
            <code>curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/orders</code>
          </li>
        </ul>
        
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          <strong>Note:</strong> This token will expire in 1 hour. After that, you'll need to login again.
        </p>
      </div>

      <script>
        function copyToClipboard() {
          const token = document.getElementById('tokenBox').innerText;
          navigator.clipboard.writeText(token).then(() => {
            alert('Token copied to clipboard!');
          });
        }
      </script>
    </body>
    </html>
  `);
};

// OAuth Error Page
exports.oauthError = (req, res) => {
  const message = req.query.message || "Unknown error occurred";

  res.status(400).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OAuth Login Error</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 900px; 
          margin: 50px auto; 
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .error { 
          color: #f44336; 
          font-weight: bold; 
          font-size: 24px;
        }
        .error-box {
          background: #ffebee;
          border-left: 4px solid #f44336;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        h1 { color: #333; }
        h2 { color: #555; }
        .solution {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .solution h3 {
          color: #4CAF50;
          margin-top: 0;
        }
        code {
          background: #f5f5f5;
          padding: 2px 5px;
          border-radius: 3px;
        }
        a {
          color: #2196F3;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="error">✗ OAuth Login Failed</h1>
        
        <div class="error-box">
          <strong>Error:</strong> ${message}
        </div>
        
        <h2>🔧 Troubleshooting Steps:</h2>
        
        <div class="solution">
          <h3>Error: redirect_uri_mismatch</h3>
          <p>The redirect URL in your code doesn't match Google Console settings.</p>
          <p><strong>Solution:</strong></p>
          <ol>
            <li>Go to <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a></li>
            <li>Select your project</li>
            <li>Go to <strong>Credentials</strong></li>
            <li>Find your OAuth 2.0 Client ID</li>
            <li>Click Edit and add this URI under "Authorized redirect URIs":
              <code>http://localhost:3000/api/auth/google/callback</code>
            </li>
            <li>Save and try again</li>
          </ol>
        </div>

        <div class="solution">
          <h3>Error: invalid_client</h3>
          <p>Your Google Client ID or Client Secret is incorrect or the app is not authorized.</p>
          <p><strong>Solution:</strong></p>
          <ol>
            <li>Verify your <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in <code>.env</code></li>
            <li>Make sure they don't have extra spaces</li>
            <li>Restart your server after updating .env</li>
          </ol>
        </div>

        <div class="solution">
          <h3>Error: access_denied</h3>
          <p>You may have denied permissions or your Google account is not authorized.</p>
          <p><strong>Solution:</strong></p>
          <ol>
            <li>If you only want to allow <code>saurabhccs11@gmail.com</code>, add it as a test user in Google OAuth consent screen</li>
            <li>Go to <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a></li>
            <li>Find <strong>OAuth consent screen</strong></li>
            <li>Add test users including <code>saurabhccs11@gmail.com</code></li>
          </ol>
        </div>

        <h2>📝 Debug Info:</h2>
        <pre>Error Message: ${message}
Server: http://localhost:3000
Callback URI: http://localhost:3000/api/auth/google/callback</pre>

        <p><a href="http://localhost:3000/api/auth/oauth-info">← Back to OAuth Info</a></p>
      </div>
    </body>
    </html>
  `);
};