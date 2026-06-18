# Access Tokens

## Introduction

An access token is a credential used to prove that a user has already authenticated and is allowed to access protected resources.

After a successful login, the server issues an access token to the client.

The client then sends this token with future API requests to prove its identity.

Think of an access token as:

```text
Temporary Access Pass

↓

Proves Authentication

↓

Allows Access To Protected Resources
```

---

# What Is An Access Token?

Definition:

> An access token is a short-lived credential used to authenticate requests to protected APIs and resources.

Authentication flow:

```text
User Login

↓

Credentials Verified

↓

Access Token Generated

↓

Access Token Returned

↓

Future Requests Authenticated
```

The access token serves as proof that the user has already logged in.

---

# Why Is It Called An Access Token?

The token's purpose is to:

```text
Grant Access
```

to protected endpoints.

Examples:

```text
GET /profile

GET /settings

GET /orders

POST /payment
```

Before accessing these routes:

```text
Client

↓

Sends Access Token

↓

Server Verifies Token

↓

Access Granted
```

Without a valid access token:

```text
Access Denied
```

---

# Access Token Flow

```text
Login

↓

Access Token Issued

↓

Store Token

↓

API Request

↓

Send Token

↓

Verify Token

↓

Authenticated
```

This is the primary authentication flow used in JWT-based systems.

---

# What Is An Access Token Used For?

Access tokens are used to authenticate requests.

Examples:

## View Profile

```text
GET /profile

↓

Access Token Sent

↓

Token Verified

↓

Profile Returned
```

---

## Update Settings

```text
PATCH /settings

↓

Access Token Sent

↓

Token Verified

↓

Settings Updated
```

---

## Create Post

```text
POST /posts

↓

Access Token Sent

↓

Token Verified

↓

Post Created
```

Every protected API request typically requires an access token.

---

# What Information Should An Access Token Contain?

Access tokens should contain only the information needed for:

```text
Authentication

Authorization
```

Common claims include:

---

## User ID

```json
{
  "userId": "123"
}
```

Purpose:

```text
Identify The User
```

---

## User Role

```json
{
  "role": "admin"
}
```

Purpose:

```text
Determine Permissions
```

Examples:

```text
Admin

User

Manager

Moderator
```

---

## Expiration Time

```json
{
  "exp": 1234567890
}
```

Purpose:

```text
Determine When Token Expires
```

---

## Issued At

```json
{
  "iat": 1234567890
}
```

Purpose:

```text
Determine When Token Was Created
```

---

# Example Payload

```json
{
  "userId": "123",
  "email": "john@example.com",
  "role": "user",
  "iat": 1710000000,
  "exp": 1710003600
}
```

This is a typical access token payload.

---

# What Should NOT Be Stored In Access Tokens?

Never place sensitive information inside JWT payloads.

Bad examples:

```json
{
  "password": "hello123"
}
```

```json
{
  "creditCard": "1234-5678-9012"
}
```

```json
{
  "secretKey": "abc123"
}
```

Reason:

```text
JWT Payload

↓

Readable
```

JWTs are signed, not encrypted.

Anyone with the token can decode and inspect the payload.

---

# Why Are Access Tokens Short-Lived?

Access tokens are intentionally designed to expire quickly.

Reason:

```text
Token Theft Risk
```

Suppose:

```text
User Login

↓

Access Token Issued

↓

Token Stolen
```

If the token is valid forever:

```text
Attacker

↓

Permanent Access
```

This is extremely dangerous.

---

# The Token Theft Window

Definition:

> The amount of time a stolen token remains usable.

---

## Long-Lived Token

```text
Token Lifetime

↓

1 Year
```

Attack:

```text
Token Stolen

↓

1 Year Access
```

Large attack window.

---

## Short-Lived Token

```text
Token Lifetime

↓

15 Minutes
```

Attack:

```text
Token Stolen

↓

15 Minutes Pass

↓

Token Expires
```

Small attack window.

Much safer.

---

# Typical Access Token Lifetimes

Common values:

```text
5 Minutes

15 Minutes

30 Minutes

1 Hour
```

Rarely longer.

Access tokens are intentionally temporary.

---

# Why Not Make Access Tokens Valid Forever?

At first glance:

```text
Login Once

↓

Never Login Again
```

sounds convenient.

However:

```text
Token Stolen

↓

Forever Valid

↓

Forever Dangerous
```

Problems:

```text
Account Takeover

Long-Term Unauthorized Access

Security Breaches

Difficult Recovery
```

For this reason, access tokens should always expire.

---

# Security Perspective

Access tokens are designed to:

```text
Authenticate Requests
```

not:

```text
Last Forever
```

Security teams assume:

```text
Tokens May Leak
```

Therefore:

```text
Short Lifetimes

↓

Reduce Damage
```

---

# The User Experience Problem

Security wants:

```text
Short-Lived Tokens
```

because:

```text
Smaller Theft Window
```

Users want:

```text
Stay Logged In
```

because:

```text
Better Experience
```

This creates a conflict:

```text
Security

vs

Convenience
```

This problem leads directly to:

```text
Refresh Tokens
```

which solve the issue of maintaining long user sessions while keeping access tokens short-lived.

---

# Real-World Example

```text
User Login

↓

Access Token

↓

Browse Website

↓

Make API Requests

↓

Token Expires

↓

Authentication Fails
```

Without refresh tokens:

```text
User Must Login Again
```

This creates a poor user experience.

---

# Common Misconceptions

## ❌ Access Token And JWT Are The Same Thing

Not exactly.

JWT is a format.

Access token is a role.

A JWT can be used as an access token.

---

## ❌ Access Tokens Should Never Expire

False.

Expiration is one of the most important security protections.

---

## ❌ Access Tokens Are Encrypted

False.

JWT payloads are readable.

They are signed, not encrypted.

---

## ❌ Access Tokens Should Store Everything About The User

False.

Store only information needed for authentication and authorization.

---

# Key Takeaways

- Access tokens authenticate API requests.
- They are issued after successful login.
- They grant access to protected resources.
- Access tokens should contain only necessary claims.
- Sensitive information should never be stored in JWT payloads.
- Access tokens are intentionally short-lived.
- Short expiration reduces token theft impact.
- Long-lived access tokens create major security risks.
- The conflict between security and convenience leads to refresh tokens.

---

# One-Line Summary

An access token is a short-lived credential used to authenticate protected API requests, containing only essential authentication and authorization information, and designed to expire quickly to reduce the impact of token theft.
