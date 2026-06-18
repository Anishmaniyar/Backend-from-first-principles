# The Logout Problem

## Introduction

At first glance, JWT authentication appears simple.

```text
Login

↓

Generate JWT

↓

Authenticated
```

However, an important question arises:

```text
How Does Logout Work?
```

With traditional session-based authentication, logout is straightforward.

With JWT-based authentication, logout becomes more complicated because JWTs are stateless.

Understanding this problem is essential for understanding why refresh tokens exist.

---

# Session Logout vs JWT Logout

## Session-Based Authentication

Session authentication works like:

```text
Session ID

↓

Server Memory

↓

User Session
```

Example:

```text
abc123

↓

User 42
```

When the user logs out:

```text
Logout

↓

Delete Session

↓

Session Gone
```

Future requests:

```text
Session ID

↓

Not Found

↓

Unauthorized
```

Logout is immediate.

---

## Why Session Logout Is Easy

Because:

```text
Server Owns Session
```

The server can:

```text
Create Session

Read Session

Delete Session
```

at any time.

---

# JWT Authentication

JWT works differently.

```text
JWT

↓

Browser Stores JWT

↓

Send JWT

↓

Server Verifies Signature

↓

Authenticated
```

Notice:

```text
Server Never Stores JWT
```

The server only verifies:

```text
JWT Signature
```

using its secret key.

---

# What Does Stateless Mean?

JWT authentication is:

```text
Stateless
```

Meaning:

```text
Server

↓

Stores Nothing About Login Session
```

The token contains all necessary information.

---

# The Logout Problem Appears

Suppose:

```text
Login

↓

JWT Issued

↓

Valid For 1 Hour
```

User clicks:

```text
Logout
```

Question:

```text
What Should The Server Delete?
```

Unlike sessions:

```text
No Session Exists
```

The server never stored the JWT.

There is nothing to remove.

---

# Basic JWT Logout

Most simple JWT applications perform:

```text
Logout

↓

Delete JWT From Browser
```

Examples:

```text
LocalStorage

↓

Remove Token
```

or

```text
Cookie

↓

Delete Cookie
```

Now:

```text
Future Requests

↓

No Token

↓

Unauthorized
```

This appears to solve the problem.

---

# The Real Problem

Consider:

```text
JWT

↓

Stolen Before Logout
```

Example:

```text
XSS Attack

↓

JWT Stolen

↓

Attacker Saves Copy
```

Now the user logs out.

Browser:

```text
Delete JWT
```

But:

```text
Attacker

↓

Still Has JWT
```

The JWT remains:

```text
Valid

Signed

Not Expired
```

The server cannot distinguish:

```text
User

vs

Attacker
```

because both possess a valid token.

---

# Why Deleting The Token Is Not Enough

Deleting a JWT from the browser:

```text
Removes Local Copy
```

It does NOT:

```text
Invalidate Every Copy
```

Any previously stolen copy remains valid until expiration.

---

# Example Timeline

```text
10:00

↓

User Login

↓

JWT Created

↓

Expires At 11:00
```

---

```text
10:10

↓

Attacker Steals JWT
```

---

```text
10:20

↓

User Logs Out

↓

JWT Deleted Locally
```

---

```text
10:30

↓

Attacker Uses JWT
```

Server:

```text
JWT Valid

↓

Authenticated
```

The attack still works.

---

# Why Access Token Expiration Matters

Access tokens are intentionally short-lived.

Example:

```text
15 Minutes
```

If stolen:

```text
Attacker

↓

Maximum Access

↓

15 Minutes
```

After:

```text
15 Minutes

↓

Token Expires
```

The token becomes useless.

Expiration limits damage.

---

# How Refresh Tokens Help

Modern systems use:

```text
Access Token

15 Minutes

----------------

Refresh Token

30 Days
```

When the user logs out:

```text
Invalidate Refresh Token

↓

Delete Refresh Cookie
```

Now:

```text
No New Access Tokens

Can Be Created
```

---

# Logout Flow With Refresh Tokens

User:

```text
Logout
```

Server:

```text
Invalidate Refresh Token

↓

Delete Refresh Token Cookie
```

Client:

```text
Delete Access Token
```

Result:

```text
Current Access Token

↓

Expires Soon

↓

Cannot Be Renewed
```

Eventually:

```text
Authentication Ends
```

---

# Why Not Instantly Revoke Access Tokens?

To immediately revoke JWTs, the server would need:

```text
Database

Redis

Blacklist

Token Tracking
```

This means:

```text
Server Must Track Tokens
```

which reduces the benefits of stateless authentication.

---

# JWT Trade-Off

## Session Authentication

```text
Easy Logout

Immediate Revocation

More Server State
```

---

## JWT Authentication

```text
Scalable

Stateless

Logout More Difficult
```

Every design choice has trade-offs.

---

# Real-World Logout Strategy

Most modern systems:

```text
Access Token

↓

5-15 Minutes

----------------

Refresh Token

↓

7-30 Days
```

Logout:

```text
Invalidate Refresh Token

↓

Delete Refresh Cookie

↓

Delete Access Token
```

The access token naturally expires shortly afterward.

---

# Common Misconceptions

## ❌ Logout Immediately Invalidates Every JWT

False.

Only local copies are removed unless token tracking is implemented.

---

## ❌ JWT Logout Works Exactly Like Sessions

False.

Sessions are server-controlled.

JWTs are stateless.

---

## ❌ Deleting The JWT Removes All Copies

False.

Previously stolen copies remain valid until expiration.

---

## ❌ Refresh Tokens Are Only For User Experience

False.

They also help manage logout and session control.

---

# Key Takeaways

- JWT logout is harder than session logout.
- JWTs are stateless and not stored by the server.
- Deleting a JWT removes only the local copy.
- Stolen JWTs remain valid until expiration.
- Access token expiration limits attack duration.
- Refresh tokens provide session control.
- Logout usually invalidates refresh tokens.
- Once the refresh token is invalidated, no new access tokens can be generated.
- Modern logout systems rely heavily on refresh token invalidation.

---

# One-Line Summary

The JWT logout problem exists because JWTs are stateless and self-contained, meaning the server cannot instantly revoke a valid token it never stored, so modern systems solve logout by deleting local tokens, invalidating refresh tokens, and allowing short-lived access tokens to expire naturally.
`**`
