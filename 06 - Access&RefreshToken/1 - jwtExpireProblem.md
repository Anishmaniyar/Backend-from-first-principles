# The JWT Expiration Problem

## Introduction

JWTs are designed to be temporary authentication credentials.

One of the most important questions in authentication is:

```text
Why do JWTs expire?
```

At first glance, it may seem convenient to create a JWT that never expires.

Example:

```text
Login Once

↓

Stay Logged In Forever
```

However, this creates major security problems.

Understanding these problems is the foundation for understanding refresh tokens.

---

# Access Tokens

An access token is the JWT used to authenticate API requests.

Example:

```text
Login

↓

Generate Access Token

↓

Access Protected APIs

↓

Authenticated
```

The access token acts as proof that the user has already authenticated.

---

# Typical Access Token Flow

```text
User Login

↓

JWT Issued

↓

Access Protected Routes

↓

JWT Verified

↓

Authenticated
```

As long as the JWT is valid, the user can access protected resources.

---

# What Is Expiration?

JWTs often contain an expiration claim:

```text
exp
```

This tells the server:

```text
This Token Is Valid Until A Specific Time
```

After that time:

```text
JWT

↓

Expired

↓

Authentication Fails
```

---

# Why Do JWTs Expire?

The main reason is security.

Imagine:

```text
User Login

↓

JWT Issued

↓

JWT Stolen
```

If the token never expires:

```text
Attacker

↓

Uses Token Forever
```

The attacker may continue accessing the account indefinitely.

---

# The Token Theft Problem

Consider the following attack:

```text
User

↓

Valid JWT

↓

XSS Attack

↓

JWT Stolen

↓

Attacker Obtains Token
```

If the JWT never expires:

```text
Attacker

↓

Keeps Using Token

↓

Days

Weeks

Months

Years
```

The token remains valid forever.

---

# Token Theft Window

A very important security concept is:

```text
Token Theft Window
```

Definition:

> The amount of time a stolen token remains useful to an attacker.

---

## Forever Valid Token

```text
Token Stolen

↓

Still Valid Tomorrow

↓

Still Valid Next Month

↓

Still Valid Next Year
```

Token theft window:

```text
Unlimited
```

This is extremely dangerous.

---

## Short-Lived Token

Example:

```text
Access Token

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

↓

Attacker Loses Access
```

Token theft window:

```text
15 Minutes
```

Much safer.

---

# Security Perspective

JWT expiration is not about preventing attacks.

JWT expiration is about:

```text
Reducing Damage
```

Even if a token is stolen:

```text
Expiration

↓

Limits Attack Duration
```

---

# What Happens After Expiration?

When the expiration time is reached:

```text
JWT

↓

Expired

↓

Verification Fails

↓

Authentication Rejected
```

The server typically returns:

```text
401 Unauthorized
```

because the token is no longer valid.

---

# User Experience Problem

Now consider the user's perspective.

Example:

```text
Access Token

↓

15 Minutes
```

User:

```text
Reading Documentation

Watching Videos

Working On A Project
```

15 minutes later:

```text
Token Expires
```

User clicks:

```text
Profile
```

Request:

```text
GET /profile
```

Server:

```text
401 Unauthorized
```

The user is forced to log in again.

---

# Security vs User Experience

This creates a conflict.

---

## Security Wants

```text
Short Expiration
```

Because:

```text
Short Theft Window

↓

Less Damage
```

---

## Users Want

```text
Stay Logged In
```

Because:

```text
Better Experience

↓

Less Friction
```

---

# The Core Authentication Problem

We want:

```text
Strong Security
```

and

```text
Good User Experience
```

at the same time.

Specifically:

```text
Short-Lived Tokens

↓

Security
```

and

```text
Long User Sessions

↓

Convenience
```

These requirements appear contradictory.

---

# Real-World Example

Imagine Google Docs.

User:

```text
Open Document

↓

Typing Essay
```

15 minutes later:

```text
Access Token Expires
```

Should Google force:

```text
Login Again
```

every 15 minutes?

No.

That would be a terrible experience.

---

# Why Forever-Valid JWTs Are A Bad Idea

If JWTs never expired:

```text
JWT Stolen

↓

Forever Valid

↓

Forever Dangerous
```

Problems:

```text
Account Takeover

Long-Term Unauthorized Access

Difficult Recovery

Massive Security Risk
```

---

# The Missing Piece

At this point we have a problem:

```text
Short Expiration

↓

Good Security

---------------------

Long Sessions

↓

Good User Experience
```

How can we achieve both?

This is exactly the problem that:

```text
Refresh Tokens
```

were invented to solve.

---

# Key Takeaways

- Access tokens are used to authenticate API requests.
- JWTs typically contain an expiration time.
- Expiration limits the usefulness of stolen tokens.
- Token theft window is the time a stolen token remains valid.
- Short-lived tokens improve security.
- Short-lived tokens can hurt user experience.
- Users should not be forced to log in repeatedly.
- Security and convenience create competing requirements.
- Refresh tokens exist to solve this conflict.

---

# Common Misconceptions

## ❌ JWTs Expire Because JWT Libraries Require It

False.

Expiration is a security decision.

---

## ❌ JWT Expiration Prevents Theft

False.

Expiration limits damage after theft.

---

## ❌ Forever-Valid Tokens Are Convenient And Therefore Better

False.

They create severe security risks.

---

## ❌ Expired Tokens Are Invalid Because The Server Forgot Them

False.

The JWT itself contains expiration information.

---

# One-Line Summary

JWTs expire because limiting the lifetime of authentication tokens reduces the damage caused by token theft, but short-lived tokens create a user experience problem that refresh tokens are designed to solve.
