# Refresh Endpoint

## Introduction

Access tokens are intentionally designed to have a short lifetime.

Example:

```text
Access Token

↓

15 Minutes
```

This improves security by limiting the amount of time a stolen token remains useful.

However, once the access token expires, the user would normally be forced to log in again.

To avoid this poor user experience, modern authentication systems use a:

```text
Refresh Endpoint
```

The refresh endpoint allows a valid refresh token to generate a new access token without requiring the user to enter credentials again.

---

# What Is A Refresh Endpoint?

A refresh endpoint is a special API endpoint responsible for:

```text
Verify Refresh Token

↓

Generate New Access Token

↓

Return New Access Token
```

Its only purpose is to issue fresh access tokens.

A common route is:

```text
POST /refresh
```

---

# Why Does The Refresh Endpoint Exist?

Without a refresh endpoint:

```text
Login

↓

Access Token

↓

Token Expires

↓

Login Again
```

Users would constantly be forced to reauthenticate.

This creates a poor user experience.

---

# The Problem

Access token:

```text
15 Minutes
```

User:

```text
Browsing Website

Watching Videos

Working On Dashboard
```

After 15 minutes:

```text
Access Token Expires
```

Next request:

```text
GET /profile
```

Server:

```text
401 Unauthorized
```

because the token is no longer valid.

---

# The Solution

Instead of forcing another login:

```text
Access Token Expired

↓

Send Refresh Token

↓

Generate New Access Token

↓

Continue Using Application
```

The user remains authenticated.

---

# High-Level Refresh Flow

```text
Login

↓

Access Token (15 Minutes)

↓

Refresh Token (30 Days)

↓

Access Token Expires

↓

POST /refresh

↓

Verify Refresh Token

↓

Generate New Access Token

↓

Return New Access Token

↓

Continue Making Requests
```

---

# Authentication Flow

## Step 1 — Login

User:

```text
Email

↓

Password

↓

Server
```

Server:

```text
Verify Credentials

↓

Generate Access Token

↓

Generate Refresh Token

↓

Return Both
```

---

## Step 2 — Access Protected APIs

Request:

```text
GET /profile
```

Client:

```text
Send Access Token
```

Server:

```text
Verify Access Token

↓

Authenticated
```

Everything works normally.

---

## Step 3 — Access Token Expires

After:

```text
15 Minutes
```

the token becomes invalid.

Request:

```text
GET /profile
```

Server:

```text
401 Unauthorized
```

---

## Step 4 — Refresh Request

Client:

```text
POST /refresh
```

Request includes:

```text
Refresh Token
```

usually stored inside:

```text
HttpOnly Cookie
```

---

## Step 5 — Verify Refresh Token

Server:

```text
Read Refresh Token

↓

Verify Signature

↓

Verify Expiration

↓

Verify User
```

If valid:

```text
Generate New Access Token
```

---

## Step 6 — Return New Access Token

Server:

```text
Return New Access Token
```

Client:

```text
Store New Access Token
```

Authentication continues.

---

# What Does The Refresh Endpoint Verify?

Unlike login:

```text
POST /login
```

the refresh endpoint does NOT verify:

```text
Email

Password
```

The user already authenticated earlier.

Instead it verifies:

```text
Refresh Token
```

---

# Verification Process

```text
POST /refresh

↓

Get Refresh Token

↓

Verify Signature

↓

Verify Expiration

↓

Verify User Exists

↓

Issue New Access Token
```

---

# What Does The Refresh Endpoint Return?

Most systems return:

```text
New Access Token
```

Example:

```text
Old Access Token

↓

Expired

↓

Refresh Endpoint

↓

New Access Token
```

The client replaces the old token.

---

# What If Refresh Token Is Expired?

Example:

```text
Refresh Token

↓

30 Days
```

After:

```text
30 Days
```

Request:

```text
POST /refresh
```

Server:

```text
Refresh Token Expired

↓

401 Unauthorized
```

User must:

```text
Login Again
```

This usually marks the end of the session.

---

# Why Not Use Refresh Tokens For Normal Requests?

Bad design:

```text
GET /profile

↓

Refresh Token
```

Problem:

```text
Refresh Token

↓

30 Day Lifetime
```

If stolen:

```text
Attacker

↓

30 Days Access
```

The security benefit of short-lived access tokens disappears.

---

# Correct Design

```text
Access Token

↓

Used For All API Requests

--------------------------

Refresh Token

↓

Used Only For /refresh
```

This separation improves security.

---

# Real-World Example

```text
Login

↓

Access Token (15 Min)

↓

Refresh Token (30 Days)

--------------------------------

Access Token Expires

↓

GET /profile

↓

401 Unauthorized

--------------------------------

POST /refresh

↓

Refresh Token Verified

↓

New Access Token

--------------------------------

GET /profile

↓

Success
```

The user often never notices this process happening.

---

# Refresh Endpoint Mental Model

Think of the refresh endpoint as:

```text
Access Token Renewal Service
```

Its job is:

```text
Valid Refresh Token

↓

Fresh Access Token
```

Nothing more.

---

# Common Misconceptions

## ❌ Refresh Endpoint Is Another Login Endpoint

False.

Login verifies:

```text
Email

Password
```

Refresh verifies:

```text
Refresh Token
```

---

## ❌ Refresh Endpoint Authenticates Users

Not exactly.

Authentication already happened during login.

The refresh endpoint continues an existing session.

---

## ❌ Refresh Tokens Should Be Used For APIs

False.

Refresh tokens should only be used to obtain new access tokens.

---

## ❌ Access Tokens Never Expire If Refresh Tokens Exist

False.

Access tokens still expire normally.

Refresh tokens simply allow new ones to be generated.

---

# Key Takeaways

- Refresh endpoints exist because access tokens expire.
- Their purpose is to generate new access tokens.
- A refresh endpoint typically verifies a refresh token.
- Login and refresh serve different purposes.
- Refresh tokens are usually stored in HttpOnly cookies.
- Access tokens are used for API requests.
- Refresh tokens are used only for token renewal.
- Refresh endpoints improve user experience while preserving security.

---

# One-Line Summary

A refresh endpoint is a dedicated API endpoint that verifies a valid refresh token and issues a new short-lived access token, allowing users to remain authenticated without repeatedly logging in while maintaining strong security through token expiration.
