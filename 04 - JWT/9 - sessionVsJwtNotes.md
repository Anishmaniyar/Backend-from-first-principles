# Sessions vs JWT

## Introduction

Sessions and JWT are two different approaches to authentication.

Neither is universally better.

Both solve the same problem:

```text
How does the server identify an authenticated user?
```

However, they solve it in different ways.

---

# Authentication Goal

After login:

```text
User

↓

Authenticated

↓

Future Requests

↓

Still Recognized
```

Both Sessions and JWT achieve this.

---

# Session Authentication

Flow:

```text
Login

↓

Create Session

↓

Store Session

↓

Return Session ID

↓

Browser Stores Cookie

↓

Future Request

↓

Session Lookup

↓

Authenticated
```

---

# Session Architecture

```text
Browser

↓

Session ID

↓

Server

↓

Session Store

↓

User Data
```

The server stores authentication state.

---

# JWT Authentication

Flow:

```text
Login

↓

Create JWT

↓

Return JWT

↓

Browser Stores JWT

↓

Future Request

↓

Verify Signature

↓

Authenticated
```

---

# JWT Architecture

```text
Browser

↓

JWT

↓

Server

↓

Verify Signature

↓

Authenticated
```

No session lookup required.

---

# Stateful vs Stateless

## Sessions

```text
Server Stores State

↓

Stateful
```

The server remembers users.

---

## JWT

```text
Server Stores No Auth State

↓

Stateless
```

The token carries the information.

---

# Authentication Comparison

## Sessions

```text
Who is this?

↓

Check Session Store
```

---

## JWT

```text
Who is this?

↓

Verify Signed Token
```

---

# Session Example

Browser sends:

```text
session=abc123
```

Server:

```text
abc123

↓

Session Store

↓

User 42
```

Authenticated.

---

# JWT Example

Browser sends:

```text
JWT
```

Server:

```text
Verify Signature

↓

Read Claims

↓

Authenticated
```

---

# Session Advantages

## Easy Logout

```text
Delete Session

↓

Done
```

---

## Easy Revocation

```text
Delete Session

↓

Immediately Invalid
```

---

## Better Server Control

Server owns authentication state.

---

## Simpler Permission Updates

Change user role:

```text
Server

↓

Update Session

↓

Done
```

---

# Session Disadvantages

## Requires Session Store

```text
Memory

Redis

Database
```

---

## Requires Lookup On Every Request

```text
Request

↓

Session Lookup

↓

Authenticated
```

---

## Scaling Complexity

Multiple servers require:

```text
Shared Session Store
```

---

# JWT Advantages

## Stateless

```text
No Session Store
```

---

## Easier Horizontal Scaling

```text
Server A

Server B

Server C

↓

All Verify JWT
```

---

## No Redis Requirement

Verification is local.

---

## Self-Contained

JWT contains:

```text
userId

role

exp
```

No lookup needed.

---

# JWT Disadvantages

## Harder Logout

Token remains valid until expiration.

---

## Harder Revocation

Issued tokens continue working.

---

## Permission Changes

Old token may contain outdated permissions.

---

## Token Theft Risk

Stolen JWT remains valid until expiration.

---

# Performance Comparison

## Session

```text
Request

↓

Session Lookup

↓

Authenticated
```

---

## JWT

```text
Request

↓

Verify Signature

↓

Authenticated
```

---

# Security Comparison

Sessions:

```text
Server Controls State
```

JWT:

```text
Client Holds Token
```

Both can be secure when implemented correctly.

---

# Common Misconceptions

## ❌ JWT is always better

False.

---

## ❌ Sessions are outdated

False.

---

## ❌ JWT is more secure

Not necessarily.

---

## ❌ Sessions don't scale

False.

Redis solves many scaling issues.

---

# When To Use Sessions

Good for:

- Traditional web applications
- Server-rendered applications
- Strong logout requirements
- High control over authentication state

---

# When To Use JWT

Good for:

- Distributed systems
- Multiple APIs
- Microservices
- Cross-service authentication

---

# Key Takeaways

- Sessions and JWT solve the same problem.
- Sessions are stateful.
- JWT is stateless.
- Sessions require storage.
- JWT requires signature verification.
- Sessions simplify logout and revocation.
- JWT simplifies scaling.
- Neither is automatically better.

---

# One-Line Summary

Sessions authenticate users by storing server-side state and performing lookups, while JWT authenticates users through signed tokens that can be verified without server-side session storage.
