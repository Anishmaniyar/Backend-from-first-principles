# Refresh Token Concept

## Introduction

In JWT authentication systems, a common challenge is balancing:

```text
Security

and

User Experience
```

Security requires authentication tokens to expire quickly.

Users expect to remain logged in without repeatedly entering their credentials.

These two requirements conflict with each other.

Refresh tokens were introduced to solve this problem.

---

# The Core Problem

Consider a system that uses only a single JWT.

```text
Login

↓

Access Token

↓

Authenticated
```

If the token expires after:

```text
15 Minutes
```

the user must log in again every 15 minutes.

This provides strong security but creates a poor user experience.

---

## Security Perspective

Short-lived tokens are safer.

Example:

```text
Token Stolen

↓

15 Minutes Later

↓

Expired
```

The attacker has a very small window to use the stolen token.

---

## User Experience Perspective

Users expect:

```text
Login Once

↓

Stay Logged In
```

They do not want to:

```text
Login

↓

Again

↓

Again

↓

Again
```

throughout the day.

---

# The Single Token Problem

One token is trying to handle two responsibilities.

```text
Authenticate Requests

and

Keep User Logged In
```

These responsibilities require different behaviors.

---

## Authentication Requires

```text
Short Lifetime
```

because:

```text
Token Theft Risk

↓

Smaller Attack Window
```

---

## User Sessions Require

```text
Long Lifetime
```

because:

```text
Better User Experience
```

---

# The Solution: Split Responsibilities

Instead of:

```text
One Token
```

we use:

```text
Access Token

+

Refresh Token
```

Each token has a specific purpose.

---

# Access Token

The access token is used to:

```text
Authenticate API Requests
```

Examples:

```text
GET /profile

GET /settings

POST /posts

PATCH /account
```

The access token is sent frequently.

Because it is exposed more often, it is designed to have a short lifetime.

Typical lifetime:

```text
5 Minutes

15 Minutes

30 Minutes

1 Hour
```

---

# Refresh Token

The refresh token is used to:

```text
Generate New Access Tokens
```

It is not used to access:

```text
/profile

/settings

/posts

/payments
```

Its only purpose is:

```text
Access Token Expired

↓

Issue New Access Token
```

Because it is used less frequently, it can safely have a longer lifetime.

Typical lifetime:

```text
7 Days

30 Days

60 Days

90 Days
```

depending on the application.

---

# Mental Model

Think of authentication as having two passes.

---

## Access Token

Like a temporary visitor badge.

```text
Access Token

↓

Temporary

↓

Used Constantly

↓

Expires Quickly
```

---

## Refresh Token

Like a permanent registration record.

```text
Refresh Token

↓

Long-Lived

↓

Used Rarely

↓

Issues New Visitor Badges
```

---

# Authentication Flow

## Login

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

## API Requests

User accesses:

```text
GET /profile
```

Request:

```text
Access Token

↓

Server Verifies

↓

Authenticated
```

Everything works normally.

---

## Access Token Expires

After:

```text
15 Minutes
```

the access token becomes invalid.

Request:

```text
GET /profile
```

Server:

```text
401 Unauthorized
```

because the token has expired.

---

## Refresh Process

Instead of forcing login again:

```text
Client

↓

Send Refresh Token

↓

Server Verifies Refresh Token

↓

Generate New Access Token

↓

Return New Access Token
```

The user remains logged in.

---

# Complete Refresh Flow

```text
Login

↓

Access Token (15 Minutes)

↓

Refresh Token (30 Days)

↓

API Requests

↓

Access Token Expires

↓

Refresh Request

↓

New Access Token

↓

Continue Using Application
```

The user experiences no interruption.

---

# Why Not Use Refresh Tokens For Everything?

Suppose:

```text
Refresh Token

↓

Used For Every API Request
```

Now if the refresh token is stolen:

```text
Attacker

↓

30 Days Access
```

This defeats the purpose of short-lived access tokens.

Therefore:

```text
Refresh Token

↓

Never Used For Normal APIs
```

It should only be used for:

```text
POST /refresh
```

or an equivalent refresh endpoint.

---

# Why Refresh Tokens Are More Valuable

A refresh token can generate:

```text
New Access Tokens
```

repeatedly until it expires.

Because of this:

```text
Refresh Token Theft

↓

Very Dangerous
```

For this reason refresh tokens are usually stored in:

```text
HttpOnly Cookies
```

to reduce theft risk.

---

# Security Benefits

Access token:

```text
Short Lifetime

↓

Smaller Attack Window
```

Refresh token:

```text
Long Lifetime

↓

Better User Experience
```

Together they provide:

```text
Strong Security

+

Convenient Authentication
```

---

# Example Timeline

```text
Day 1

↓

Login

↓

Access Token (15 Minutes)

↓

Refresh Token (30 Days)

--------------------------------

15 Minutes Later

↓

Access Token Expires

↓

Refresh Token Generates New One

--------------------------------

Day 10

↓

Still Logged In

--------------------------------

Day 30

↓

Refresh Token Expires

↓

Login Required Again
```

---

# Common Misconceptions

## ❌ Refresh Token Is Just Another Access Token

False.

They have different responsibilities.

---

## ❌ Refresh Token Should Be Sent With Every Request

False.

Only access tokens should be used for normal API requests.

---

## ❌ Refresh Tokens Exist For Security

Partially true.

Their main purpose is balancing:

```text
Security

and

User Experience
```

---

## ❌ One Long-Lived Access Token Is Simpler

True, but much less secure.

A stolen long-lived token creates a large attack window.

---

# Key Takeaways

- Access tokens and refresh tokens solve different problems.
- Access tokens authenticate API requests.
- Refresh tokens generate new access tokens.
- Access tokens are intentionally short-lived.
- Refresh tokens are intentionally long-lived.
- Using both provides strong security and a good user experience.
- Refresh tokens should not be used for normal API requests.
- Refresh tokens are often stored in HttpOnly cookies.
- Refresh tokens exist because a single token cannot effectively provide both security and convenience.

---

# One-Line Summary

Refresh tokens solve the conflict between security and user experience by allowing applications to use short-lived access tokens for authentication while using long-lived refresh tokens to obtain new access tokens without forcing users to log in repeatedly.
