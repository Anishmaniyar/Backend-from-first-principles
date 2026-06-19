# OAuth Security Thinking

## Introduction

OAuth is designed around security.

Many parts of the OAuth Authorization Code Flow exist specifically to protect:

```text
Users

Applications

Tokens

User Data
```

Understanding the reasoning behind these security decisions is more important than memorizing the flow itself.

---

# Why Not Send Access Tokens In URLs?

Bad Example:

```text
https://myapp.com/callback?access_token=abc123
```

Problem:

```text
Access Token Visible In URL
```

---

# Risks Of URL Tokens

Access tokens in URLs can leak through:

```text
Browser History

Server Logs

Analytics Tools

Screenshots

Shared Links

Referrer Headers
```

Anyone who obtains the token may be able to use it.

---

# Example

```text
User

↓

Visits URL

↓

Access Token In Address Bar

↓

Token Stored In Browser History
```

Potential exposure:

```text
Access Token Leaked
```

---

# Secure Alternative

OAuth uses:

```text
Authorization Code

↓

Backend Exchange

↓

Access Token
```

instead of exposing tokens in URLs.

---

# Why Not Trust The Frontend?

Question:

```text
Can The Frontend Be Trusted?
```

Answer:

```text
No
```

---

# Why?

Because frontend code runs in:

```text
User Browser
```

The user controls:

```text
Browser

Extensions

Developer Tools

Network Requests
```

Anything running in the browser can potentially be inspected or manipulated.

---

# Frontend Security Principle

Assume:

```text
Frontend Is Public
```

Never place sensitive secrets in frontend code.

Examples:

```text
OAuth Client Secret

Database Credentials

Private Keys
```

must never be exposed.

---

# Why Authorization Code Exists

Question:

```text
Why Not Return Access Token Immediately?
```

Because:

```text
Browser

↓

Less Trusted Environment
```

OAuth introduces:

```text
Authorization Code
```

as a temporary credential.

---

# Authorization Code Purpose

The code acts as:

```text
Temporary Proof

↓

User Successfully Authenticated
```

The code itself cannot access APIs.

---

# Authorization Code Characteristics

```text
Short-Lived

One-Time Use

Temporary

Cannot Access Resources
```

This reduces risk if the code is intercepted.

---

# Why Token Exchange Happens On The Backend

OAuth Flow:

```text
Google

↓

Authorization Code

↓

Backend

↓

Access Token
```

Question:

```text
Why Not Exchange In Browser?
```

Because the backend is more trusted.

---

# Backend Advantages

Backend can safely store:

```text
Client Secret

Private Credentials

Tokens
```

The browser cannot.

---

# Backend Security Model

```text
Frontend

↓

Receives Code

↓

Backend

↓

Exchanges Code

↓

Receives Tokens
```

Sensitive operations remain on the server.

---

# What Happens If An Access Token Leaks?

Suppose attacker obtains:

```text
Access Token
```

The attacker may be able to:

```text
Call APIs

Read User Data

Access Resources
```

until the token expires or is revoked.

---

# Example

Attacker obtains:

```text
access_token_123
```

Attacker sends:

```text
GET /userinfo
```

with:

```text
Authorization: Bearer access_token_123
```

The API may treat the attacker as the legitimate user.

---

# Why Access Tokens Expire

Access tokens are intentionally short-lived.

Example:

```text
15 Minutes

30 Minutes

1 Hour
```

This limits damage if a token is stolen.

---

# Token Theft Window

Example:

```text
Access Token Valid

↓

1 Hour
```

Attacker can use it only during that period.

After expiration:

```text
Token Invalid
```

---

# How OAuth Reduces Risk

OAuth security mechanisms include:

```text
Authorization Code

State Parameter

Short-Lived Tokens

Backend Token Exchange

Scopes

Token Expiration
```

Each exists to reduce attack surface.

---

# Security Principles Learned

## Principle 1

```text
Never Share Passwords
```

OAuth replaces passwords with tokens.

---

## Principle 2

```text
Least Privilege
```

Applications receive only required scopes.

---

## Principle 3

```text
Never Trust The Browser
```

Sensitive operations belong on the backend.

---

## Principle 4

```text
Short-Lived Credentials
```

Access tokens expire.

---

## Principle 5

```text
Validate Every Request
```

State parameters and token validation protect against attacks.

---

# Common Interview Questions

### Why Not Send Access Tokens In URLs?

```text
Because URLs can be logged, stored, shared, and leaked.
```

---

### Why Not Trust The Frontend?

```text
Frontend code runs in the user's browser and can be inspected or manipulated.
```

---

### Why Use Authorization Codes?

```text
They provide a temporary credential that can be safely exchanged for tokens.
```

---

### Why Exchange Tokens On The Backend?

```text
The backend can safely store secrets and perform sensitive operations.
```

---

### What Happens If An Access Token Leaks?

```text
An attacker may access APIs until the token expires or is revoked.
```

---

# Complete Secure OAuth Flow

```text
User

↓

Google Login

↓

Authorization Code

↓

Backend

↓

Token Exchange

↓

Access Token

↓

Google API

↓

User Data

↓

Authenticated
```

This design minimizes exposure of sensitive credentials.

---

# Key Takeaways

- Access tokens should not be placed in URLs.
- Browsers are less trusted environments.
- Authorization codes provide a safer intermediate step.
- Token exchange should occur on the backend.
- Access tokens can be abused if stolen.
- Short token lifetimes reduce risk.
- OAuth is built around minimizing credential exposure.
- Security decisions in OAuth exist for specific attack scenarios.

---

# One-Line Summary

OAuth's security model is built around minimizing trust in the browser, keeping sensitive operations on the backend, using temporary authorization codes instead of exposing tokens directly, and limiting the impact of token theft through scopes and expiration.
