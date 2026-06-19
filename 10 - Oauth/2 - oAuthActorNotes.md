# OAuth Actors

## Introduction

OAuth involves multiple participants working together to authenticate users and provide controlled access to protected resources.

Before learning OAuth flows, redirects, authorization codes, and tokens, it is important to understand the four core actors involved in every OAuth process.

These actors are:

```text
Resource Owner

Client

Authorization Server

Resource Server
```

Understanding their responsibilities makes the entire OAuth flow easier to follow.

---

# The Four OAuth Actors

```text
Resource Owner

↓

Client

↓

Authorization Server

↓

Resource Server
```

Each actor has a different responsibility.

---

# 1. Resource Owner

Definition:

> The Resource Owner is the user who owns the protected resources.

In most OAuth flows:

```text
Resource Owner

↓

User
```

Examples:

```text
You

Google User

GitHub User

Facebook User
```

---

# Why Is It Called Resource Owner?

Because the user owns resources such as:

```text
Email

Profile

Avatar

Photos

Calendar

Drive Files
```

These resources belong to the user.

---

# Example

User:

```text
Anish
```

Owns:

```text
anish@gmail.com

Profile Picture

Google Account
```

Therefore:

```text
Anish

↓

Resource Owner
```

---

# Resource Owner Responsibility

The Resource Owner decides:

```text
Who Gets Access

What Access Is Allowed

When Access Is Revoked
```

The user is always in control.

---

# 2. Client

Definition:

> The Client is the application requesting access to the user's resources.

Examples:

```text
Vital Drops

Spotify

Notion

Canva

Slack
```

---

# Example

Application:

```text
Vital Drops
```

Needs:

```text
Email

Name

Profile Picture
```

The client does not own this data.

It belongs to the user.

---

# Client Responsibility

The Client:

```text
Requests Access

Receives Tokens

Uses APIs

Authenticates Users
```

---

# Client Example

```text
Vital Drops

↓

"Can I Access This User's Email?"
```

The client must request permission before accessing user data.

---

# 3. Authorization Server

Definition:

> The Authorization Server authenticates users, obtains consent, and issues OAuth tokens.

Example:

```text
Google Login
```

---

# Responsibilities

The Authorization Server:

```text
Verifies User Identity

Checks Passwords

Shows Consent Screen

Issues Authorization Codes

Issues Tokens
```

---

# Example

User clicks:

```text
Login With Google
```

Browser redirects to:

```text
accounts.google.com
```

The Google login system verifies:

```text
Email

Password

Identity
```

This is the Authorization Server.

---

# Authorization Server Mental Model

Think:

```text
Identity Verification Service
```

Question answered:

```text
Who Are You?
```

---

# 4. Resource Server

Definition:

> The Resource Server stores and provides the protected resources.

Examples:

```text
Google APIs

GitHub APIs

Facebook APIs
```

---

# Responsibilities

The Resource Server:

```text
Stores User Data

Validates Tokens

Returns Protected Resources
```

Examples:

```text
Email

Profile

Avatar

Repositories

Calendar Events
```

---

# Example

Application requests:

```text
User Profile
```

Google API returns:

```json
{
  "name": "Anish",
  "email": "anish@gmail.com"
}
```

The API providing this data is the Resource Server.

---

# Resource Server Mental Model

Think:

```text
Data Provider
```

Question answered:

```text
What Data Can Be Accessed?
```

---

# Authorization Server vs Resource Server

These two actors are commonly confused.

---

## Authorization Server

Responsible for:

```text
Authentication

Consent

Token Issuance
```

Question:

```text
Who Are You?
```

---

## Resource Server

Responsible for:

```text
Protected Resources

User Data

API Responses
```

Question:

```text
What Data Can Be Returned?
```

---

# Example OAuth Flow

Step 1:

```text
User

↓

Clicks Login With Google
```

---

Step 2:

```text
Client

↓

Redirects User To Google
```

---

Step 3:

```text
Authorization Server

↓

Verifies User
```

---

Step 4:

```text
Authorization Server

↓

Issues Token
```

---

Step 5:

```text
Client

↓

Calls Google API
```

---

Step 6:

```text
Resource Server

↓

Returns User Data
```

---

# Complete OAuth Diagram

```text
Resource Owner

↓

Anish

----------------

Client

↓

Vital Drops

----------------

Authorization Server

↓

Google Login

----------------

Resource Server

↓

Google APIs
```

---

# OAuth Communication Flow

```text
User

↓

Vital Drops

↓

Google Login

↓

User Verified

↓

Token Issued

↓

Google API

↓

User Data Returned
```

Every OAuth login follows this pattern.

---

# Real-World Example

## Login With Google

Resource Owner:

```text
Anish
```

---

Client:

```text
Vital Drops
```

---

Authorization Server:

```text
Google Login
```

---

Resource Server:

```text
Google People API
```

---

Flow:

```text
Anish

↓

Vital Drops

↓

Google Login

↓

Token

↓

Google API

↓

Profile Data
```

---

# Why These Actors Matter

Understanding the actors helps explain:

```text
Redirects

Authorization Codes

Access Tokens

ID Tokens

Scopes

Consent Screens
```

Without understanding the participants, the OAuth flow appears confusing.

---

# Common Mistakes

## ❌ Thinking Google Is One Thing

OAuth separates:

```text
Google Login

and

Google APIs
```

into different responsibilities.

---

## ❌ Thinking The App Owns User Data

The data belongs to:

```text
Resource Owner
```

not the application.

---

## ❌ Confusing Authorization Server And Resource Server

Authorization Server:

```text
Authentication
```

Resource Server:

```text
Data Access
```

---

# Key Takeaways

- OAuth involves four actors.
- The Resource Owner is the user.
- The Client is the application requesting access.
- The Authorization Server authenticates users and issues tokens.
- The Resource Server provides protected resources.
- Authorization Servers and Resource Servers have different responsibilities.
- Every OAuth flow is communication between these four participants.
- Understanding the actors makes OAuth flows much easier to understand.

---

# One-Line Summary

OAuth works through four actors—the Resource Owner (user), Client (application), Authorization Server (identity provider), and Resource Server (API provider)—which cooperate to authenticate users and securely grant limited access to protected resources.
