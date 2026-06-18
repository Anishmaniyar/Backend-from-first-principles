# Refresh Token Storage

## Introduction

Refresh tokens are one of the most sensitive pieces of data in an authentication system.

Unlike access tokens, refresh tokens usually have a long lifetime and can generate new access tokens repeatedly.

Because of this, choosing where to store refresh tokens is a critical security decision.

The three common storage options are:

```text
LocalStorage

Cookies

HttpOnly Cookies
```

Each option provides different security guarantees.

---

# Why Refresh Token Storage Matters

Consider:

```text
Access Token

↓

15 Minutes Lifetime
```

and

```text
Refresh Token

↓

30 Days Lifetime
```

If an attacker steals:

```text
Access Token
```

they may gain:

```text
15 Minutes Access
```

However, if an attacker steals:

```text
Refresh Token
```

they may continue generating new access tokens for:

```text
30 Days
```

or longer.

Because refresh tokens are more valuable, they require stronger protection.

---

# Storage Option 1 — LocalStorage

## Flow

```text
Login

↓

Server Returns Refresh Token

↓

Frontend Receives Token

↓

Store In LocalStorage
```

---

## Advantages

```text
Simple

Easy To Implement

Persistent Across Browser Restarts
```

---

## Security Problem

JavaScript can access LocalStorage.

```text
JavaScript

↓

Read LocalStorage

↓

Allowed
```

Example:

```text
localStorage.getItem()
```

---

## XSS Risk

If an attacker performs an XSS attack:

```text
Injected JavaScript

↓

Read LocalStorage

↓

Steal Refresh Token
```

the refresh token becomes compromised.

---

## Consequences

```text
Refresh Token Stolen

↓

Generate New Access Tokens

↓

Long-Term Account Access
```

This is why storing refresh tokens in LocalStorage is generally discouraged.

---

# Storage Option 2 — Regular Cookies

## Flow

```text
Login

↓

Set-Cookie

↓

Browser Stores Cookie
```

---

## Advantages

```text
Browser Managed

Automatically Sent With Requests
```

---

## Security Problem

Without additional protection:

```text
JavaScript

↓

Can Read Cookie
```

Example:

```text
document.cookie
```

---

## XSS Risk

```text
Injected Script

↓

Read Cookie

↓

Steal Refresh Token
```

The same token theft problem still exists.

---

# Storage Option 3 — HttpOnly Cookies

## Flow

```text
Login

↓

Set-Cookie

↓

HttpOnly

↓

Browser Stores Cookie
```

---

## Browser Behavior

```text
Browser

↓

Stores Cookie

↓

Automatically Sends Cookie
```

Authentication continues working normally.

---

## JavaScript Behavior

```text
JavaScript

↓

Attempt To Read Cookie

↓

Blocked
```

Example:

```text
document.cookie

↓

Cannot Access HttpOnly Cookie
```

---

# Why HttpOnly Cookies Are Safer

Suppose an attacker successfully executes JavaScript.

---

## LocalStorage

```text
Malicious Script

↓

Read Token

↓

Steal Token
```

Attack succeeds.

---

## HttpOnly Cookie

```text
Malicious Script

↓

Read Cookie

↓

Blocked
```

Attack fails.

---

# Why Refresh Tokens Need Extra Protection

Refresh tokens are:

```text
Long-Lived

High Value

Capable Of Generating New Access Tokens
```

Therefore:

```text
Refresh Token Theft

↓

More Dangerous

↓

Stronger Protection Required
```

---

# Typical Authentication Setup

Modern applications often use:

```text
Access Token

↓

15 Minutes

↓

Authenticate Requests

-----------------------

Refresh Token

↓

30 Days

↓

HttpOnly Cookie
```

This provides a balance between:

```text
Security

and

User Experience
```

---

# Refresh Flow

When the access token expires:

```text
Client

↓

POST /refresh

↓

Browser Automatically Sends Refresh Cookie

↓

Server Verifies Refresh Token

↓

Generate New Access Token

↓

Return New Access Token
```

The refresh token remains protected throughout the process.

---

# Comparison Table

| Feature                        | LocalStorage | Cookie | HttpOnly Cookie |
| ------------------------------ | ------------ | ------ | --------------- |
| Persistent Storage             | ✅           | ✅     | ✅              |
| Browser Managed                | ❌           | ✅     | ✅              |
| Automatically Sent             | ❌           | ✅     | ✅              |
| JavaScript Accessible          | ✅           | ✅     | ❌              |
| XSS Theft Risk                 | High         | High   | Much Lower      |
| Recommended For Refresh Tokens | ❌           | ❌     | ✅              |

---

# Why HttpOnly Cookies Are Commonly Used

HttpOnly cookies provide:

```text
Automatic Sending

Browser Management

Protection Against JavaScript Access

Reduced XSS Token Theft Risk
```

These properties make them the preferred storage location for refresh tokens in many modern authentication systems.

---

# Common Misconceptions

## ❌ LocalStorage Is Always Safe

False.

JavaScript can access LocalStorage.

---

## ❌ Cookies Are Automatically Secure

False.

Regular cookies can still be read by JavaScript.

---

## ❌ HttpOnly Prevents All Attacks

False.

It primarily helps reduce XSS-based token theft.

---

## ❌ Refresh Tokens Are Less Important Than Access Tokens

False.

Refresh tokens are often more valuable because they can generate new access tokens.

---

# Key Takeaways

- Refresh tokens are long-lived authentication credentials.
- Refresh token theft is often more dangerous than access token theft.
- LocalStorage is vulnerable to XSS-based token theft.
- Regular cookies can also be accessed by JavaScript.
- HttpOnly cookies prevent JavaScript from reading cookies.
- HttpOnly cookies significantly reduce token theft risk.
- Most modern authentication systems store refresh tokens in HttpOnly cookies.
- Refresh tokens should be protected more aggressively than access tokens.

---

# One-Line Summary

Because refresh tokens are long-lived and can generate new access tokens, they are usually stored in HttpOnly cookies, where JavaScript cannot access them, reducing the risk of XSS-based token theft and improving overall authentication security.
