# 🛒 Ecommerce App — Backend API

A RESTful backend built with **Node.js** and **Express.js**, implementing authentication, authorization, and security best practices.

---

## 📁 Project Structure

```
src/
├── app.js                        # Express app entry point
├── controllers/
│   ├── authControllers.js        # Login logic & JWT generation
│   └── productControllers.js     # CRUD operations for products
├── middleware/
│   ├── authMiddleware.js         # JWT verification (protectRoute)
│   ├── authorize.js              # Role-based access control
│   ├── errorHandler.js           # Global error handler
│   ├── logger.js                 # Request logger
│   ├── rateLimiter.js            # API & Auth rate limiters
│   ├── validateProduct.js        # Full product validation
│   └── validateProductPartial.js # Partial product validation (PATCH)
├── routes/
│   ├── authRoutes.js             # POST /api/auth/login
│   └── productRoutes.js          # Product CRUD routes
├── utils/
│   ├── AppError.js               # Custom error class
│   ├── AppResponse.js            # Custom success response class
│   └── apiResponse.js            # Legacy response helpers
└── data/
    └── products.js               # In-memory product data
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run with auto-restart on file change
node --watch app.js
```

Server runs at: `http://localhost:3000`

---

## 📌 Today's Training Topics

---

## 1. 🔑 JWT (JSON Web Tokens)

### What is JWT?

JWT is a compact, self-contained token used to securely transmit information between parties as a JSON object. It is digitally signed, so it can be **verified** but not tampered with.

### Structure of a JWT

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiJ9  .  eyJ1c2VySWQiOjF9  .  SflKxwRJSMeKKF2QT4
     (Header)                 (Payload)             (Signature)
```

### How it's implemented here

**Step 1 — User logs in → server generates a token:**
```js
// authControllers.js
const token = jwt.sign(
    { userId: USER.id, username: USER.username, role: USER.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
);
```

**Step 2 — Client sends token in every request:**
```
Authorization: Bearer <token>
```

**Step 3 — Server verifies the token on protected routes:**
```js
// authMiddleware.js (protectRoute)
const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
req.user = decoded; // attach user info to request
```

### Token Error Handling

| Error | Status | Meaning |
|---|---|---|
| No token | 401 | Request has no Authorization header |
| `JsonWebTokenError` | 401 | Token is invalid or malformed |
| `TokenExpiredError` | 401 | Token has passed its expiry time |

---

## 2. 🔐 OAuth2 (Concept)

### What is OAuth2?

OAuth2 is an **authorization framework** that allows third-party apps to access user data **without exposing passwords**. It uses short-lived **access tokens** issued by an Authorization Server.

### OAuth2 vs JWT

| | JWT | OAuth2 |
|---|---|---|
| **What it is** | A token format | An authorization protocol |
| **Usage** | Authentication between client & server | Delegated access (Google, GitHub login) |
| **Who issues** | Your own server | A trusted third-party (Google, Facebook) |
| **Example** | Login with username/password | "Login with Google" |

### OAuth2 Flow (Authorization Code Flow)

```
User → clicks "Login with Google"
  → Redirected to Google's Auth Server
  → User grants permission
  → Google redirects back with an Authorization Code
  → Your server exchanges Code for an Access Token
  → Access Token used to call Google APIs on user's behalf
```

> In this project, we implement **our own JWT-based auth** (similar to the Resource Owner Password flow in OAuth2).

---

## 3. 🛡️ Role-Based Access Control (RBAC)

Authorization is handled in two middleware layers:

### `protectRoute` — checks if user is logged in
```js
// middleware/authMiddleware.js
// Verifies the JWT token and attaches req.user
```

### `authorize(...roles)` — checks if user has the right role
```js
// middleware/authorize.js
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden", 403));
        }
        next();
    };
};
```

### Route Permissions

| Method | Route | Who can access |
|---|---|---|
| `GET` | `/api/products` | Anyone (public) |
| `GET` | `/api/product/:id` | Anyone (public) |
| `POST` | `/api/products` | `user` role only |
| `PUT` | `/api/products/:id` | `user` role only |
| `DELETE` | `/api/product/:id` | `admin` role only |
| `PATCH` | `/api/product/:id` | `admin` role only |

### Test Users (hardcoded for dev)

| Username | Password | Role |
|---|---|---|
| `admin1` | `admin123` | `admin` |
| `user1` | `user123` | `user` |

---

## 4. ⏱️ Rate Limiting

Rate limiting prevents abuse by restricting how many requests an IP can make in a time window.

### Implemented using `express-rate-limit`

```js
// middleware/rateLimiter.js
```

### Two limiters in use

| Limiter | Route | Max Requests | Window |
|---|---|---|---|
| `apiLimiter` | All routes (`app.use`) | 100 requests | 15 minutes |
| `authLimiter` | `/api/auth/login` (stricter) | 3 attempts | 15 minutes |

When the limit is exceeded, a `429 Too Many Requests` error is returned via `AppError`.

### Response Headers set automatically

| Header | Meaning |
|---|---|
| `RateLimit-Limit` | Max requests allowed |
| `RateLimit-Remaining` | Requests left in window |
| `RateLimit-Reset` | Timestamp when window resets |

---

## 5. 🗄️ Caching (Concept)

Caching stores the result of expensive operations (DB queries, API calls) so repeated requests get a fast response without re-doing the work.

### Why Cache?

```
Without cache:  Request → Server → Database → Response  (~200ms)
With cache:     Request → Server → Cache Hit → Response  (~5ms)
```

### Types of Caching

| Type | Tool | Where stored |
|---|---|---|
| In-memory | `node-cache` | RAM on the server |
| Distributed | **Redis** | Separate cache server |
| HTTP Cache | `Cache-Control` headers | Client browser |

### Redis Cache Flow (how it would work here)

```js
// Before hitting DB/data:
const cached = await redis.get(`product:${id}`);
if (cached) return res.json(JSON.parse(cached));  // cache HIT

// Cache miss — fetch from data and store
const product = products.find(p => p.id === id);
await redis.set(`product:${id}`, JSON.stringify(product), "EX", 60); // TTL = 60s
return res.json(product);
```

### Cache Invalidation

| Event | Action |
|---|---|
| `POST /products` | Clear product list cache |
| `PUT /products/:id` | Clear that product's cache |
| `DELETE /product/:id` | Clear that product's cache |

> **Cache invalidation** is considered one of the hardest problems in computer science — knowing *when* to clear the cache is as important as caching itself.

---

## 🔄 Middleware Order in `app.js`

The order of middleware in Express matters critically:

```js
app.use(express.json());    // 1. Parse JSON body
app.use(logger);            // 2. Log all requests
app.use(apiLimiter);        // 3. Rate limit all routes

app.use("/api", productRoutes);       // 4. Product routes
app.use("/api/auth", authRoutes);     // 5. Auth routes

app.use(errorHandler);      // 6. ALWAYS LAST — catches errors from all routes above
```

> ⚠️ **Golden Rule**: `errorHandler` must always be the **last** `app.use()`. If placed before routes, it will never catch route errors.

---

## 🧰 Custom Utilities

### `AppError` — Structured error class
```js
// Extends Error with a statusCode
return next(new AppError("Product not found", 404));
```

### `AppResponse` — Structured success response class
```js
// Sends a consistent JSON success response
return new AppResponse(res, "Product fetched successfully", product);
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ username, password }` | Login and get JWT token |

### Products
| Method | Endpoint | Auth Required | Role |
|---|---|---|---|
| `GET` | `/api/products` | ❌ | Public |
| `GET` | `/api/product/:id` | ❌ | Public |
| `POST` | `/api/products` | ✅ Bearer Token | `user` |
| `PUT` | `/api/products/:id` | ✅ Bearer Token | `user` |
| `PATCH` | `/api/product/:id` | ✅ Bearer Token | `admin` |
| `DELETE` | `/api/product/:id` | ✅ Bearer Token | `admin` |
