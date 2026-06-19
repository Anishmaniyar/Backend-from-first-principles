# Authentication Middleware

## Introduction

Authentication middleware is one of the most common middleware types used in backend applications.

Its responsibility is to verify the identity of a user before allowing access to protected resources.

Instead of repeating authentication logic inside every controller, authentication middleware centralizes this logic into a single reusable layer.

---

# What Is Authentication?

Authentication answers the question:

```text
Who Are You?
```

Example:

```text
User Sends JWT

↓

Server Verifies JWT

↓

User Identity Confirmed
```

If the identity can be verified:

```text
Authenticated
```

Otherwise:

```text
Unauthorized
```

---

# What Is Authentication Middleware?

Definition:

> Authentication middleware is a middleware function that verifies the identity of a user before allowing access to protected routes.

Flow:

```text
Request

↓

Authentication Middleware

↓

Authenticated?

↓

YES → Continue

NO → Reject
```

The middleware acts as a security checkpoint before the controller.

---

# Why Authentication Middleware Exists

Imagine multiple protected routes:

```text
/profile

/settings

/orders

/dashboard

/notifications
```

Without middleware, every controller would need:

```text
Extract Token

↓

Verify JWT

↓

Decode User

↓

Check Expiration
```

This creates duplicated code.

---

# DRY Principle

Authentication middleware follows:

```text
DRY

↓

Don't Repeat Yourself
```

Instead of:

```text
Controller 1

↓

Verify JWT

----------------

Controller 2

↓

Verify JWT

----------------

Controller 3

↓

Verify JWT
```

Use:

```text
Authentication Middleware

↓

All Controllers
```

Authentication logic is written once and reused everywhere.

---

# Authentication vs Authorization

These concepts are different.

---

## Authentication

Question:

```text
Who Are You?
```

Example:

```text
JWT Valid

↓

User Identified
```

---

## Authorization

Question:

```text
What Are You Allowed To Do?
```

Example:

```text
Role = Admin

↓

Can Delete Users
```

Authentication verifies identity.

Authorization verifies permissions.

---

# JWT Authentication Flow

Request:

```http
GET /profile
Authorization: Bearer abc123
```

Flow:

```text
Request

↓

Extract Token

↓

Verify JWT

↓

Decode User

↓

Attach User To Request

↓

next()

↓

Controller

↓

Response
```

---

# Step 1 — Request Arrives

Browser sends:

```http
GET /profile
Authorization: Bearer eyJhb...
```

Express receives the request.

The authentication middleware executes before the controller.

---

# Step 2 — Read Authorization Header

Authentication middleware reads:

```text
req.headers.authorization
```

Expected format:

```text
Bearer TOKEN
```

Example:

```text
Bearer abc123xyz
```

The middleware extracts:

```text
abc123xyz
```

for verification.

---

# Step 3 — Check Token Exists

Question:

```text
Did The User Send A Token?
```

If no token exists:

```text
Request

↓

Authentication Middleware

↓

No Token

↓

401 Unauthorized

↓

Request Ends
```

The controller never executes.

---

# Step 4 — Verify JWT

The middleware verifies:

```text
JWT Signature

Expiration

Integrity
```

using:

```text
SECRET_KEY
```

Questions answered during verification:

```text
Was Token Modified?

Has Token Expired?

Was Token Signed By Our Server?
```

---

# Invalid Token

If verification fails:

```text
Invalid Signature

or

Expired Token
```

Response:

```text
401 Unauthorized
```

The request ends immediately.

---

# Step 5 — Decode User Information

A valid JWT contains payload information.

Example:

```json
{
  "id": 1,
  "email": "john@example.com",
  "role": "user"
}
```

The middleware extracts this information.

---

# Step 6 — Attach User To Request

One of the most important middleware patterns:

```text
Decoded User

↓

req.user = user
```

Now:

```text
req.user
```

becomes available throughout the remainder of the request lifecycle.

---

# Why Attach User To Request?

Controllers often need information about the authenticated user.

Without middleware:

```text
Controller

↓

Verify JWT Again

↓

Decode User Again
```

Unnecessary duplication.

---

With middleware:

```text
req.user
```

already exists.

Controller can immediately access:

```text
User ID

Email

Role

Permissions
```

---

# Step 7 — Call next()

If authentication succeeds:

```text
JWT Valid

↓

User Attached To Request

↓

next()
```

The request continues.

Flow:

```text
Authentication Middleware

↓

next()

↓

Controller
```

---

# Step 8 — Controller Executes

The controller receives:

```text
req.user
```

and focuses only on:

```text
Business Logic
```

Example:

```text
Get Profile

↓

Return Profile Data
```

The controller does not need to perform authentication again.

---

# Complete Authentication Flow

```text
Request

↓

Authentication Middleware

↓

Extract Token

↓

Verify JWT

↓

Decode User

↓

req.user = user

↓

next()

↓

Controller

↓

Response
```

This is the most common JWT authentication architecture.

---

# Missing Token Flow

```text
Request

↓

Authentication Middleware

↓

No Token

↓

401 Unauthorized

↓

Request Ends
```

Controller never executes.

---

# Invalid Token Flow

```text
Request

↓

Authentication Middleware

↓

Invalid Token

↓

401 Unauthorized

↓

Request Ends
```

Controller never executes.

---

# Protected Routes

Protected routes require authentication.

Examples:

```text
/profile

/settings

/orders

/dashboard
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Authenticated?

↓

YES → Controller

NO → Reject
```

---

# Public Routes

Public routes do not require authentication.

Examples:

```text
/login

/signup

/forgot-password
```

Users can access them without logging in.

---

# Why Middleware Is Better Than Controllers

Without middleware:

```text
Controller

↓

Verify JWT

↓

Check Expiration

↓

Decode User

↓

Business Logic
```

Controllers become large and repetitive.

---

With middleware:

```text
Authentication Middleware

↓

Controller
```

Controllers contain only:

```text
Business Logic
```

This creates cleaner architecture and easier maintenance.

---

# Real Example

Route:

```text
GET /profile
```

Flow:

```text
Authorization Header

↓

Bearer Token

↓

Authentication Middleware

↓

jwt.verify()

↓

req.user = decodedUser

↓

next()

↓

getProfile()

↓

Response
```

This is the standard JWT middleware workflow used in modern applications.

---

# Common Mistakes

## ❌ Verifying JWT Inside Every Controller

Creates duplicated code.

Use middleware instead.

---

## ❌ Forgetting next()

Result:

```text
Request Hangs

Controller Never Runs
```

---

## ❌ Not Attaching User To Request

Controllers lose access to authenticated user information.

---

## ❌ Mixing Authentication And Authorization

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Can You Do?
```

They should be treated separately.

---

# Key Takeaways

- Authentication middleware verifies user identity.
- It commonly verifies JWTs, sessions, or API keys.
- Authentication logic should be centralized and reusable.
- Valid tokens allow requests to continue.
- Invalid tokens terminate the request.
- Authentication middleware often creates `req.user`.
- Controllers should not repeatedly verify tokens.
- Protected routes depend on authentication middleware.
- Authentication and authorization are different concepts.

---

# One-Line Summary

Authentication middleware is a reusable security layer that verifies a user's identity, attaches authenticated user information to the request object, and either allows access to protected routes or blocks unauthorized requests before the controller executes.
