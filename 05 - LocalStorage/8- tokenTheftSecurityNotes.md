# Token Theft & Security Thinking

## What Is Token Theft?

Token theft occurs when an attacker obtains a valid authentication token belonging to another user.

Example:

```text
User

↓

Valid JWT

↓

Attacker Obtains JWT

↓

Attacker Uses JWT
```

The server cannot distinguish between:

```text
Real User

and

Attacker
```

because both possess a valid token.

---

# What Can An Attacker Do With A Stolen JWT?

Potential actions:

```text
Call Protected APIs

Access Profile

Read Private Data

Perform Authenticated Actions

Impersonate User
```

The exact impact depends on application permissions.

---

# Can A Stolen JWT Be Used?

Yes.

If the JWT is valid:

```text
Authorization

↓

Bearer JWT

↓

Server Verifies Signature

↓

Authenticated
```

The server has no way to know the token was stolen.

---

# When Does The Attack Stop?

The attack stops when:

```text
JWT Expires
```

or

```text
JWT Is Revoked
```

or

```text
User Logs Out And Token Becomes Invalid
```

depending on the authentication system.

---

# What Happens If The Token Expires?

Expired token:

```text
JWT

↓

exp Claim Reached

↓

Verification Fails

↓

Authentication Rejected
```

The attacker can no longer use it.

---

# Security Thinking Mindset

When building authentication systems, always ask:

```text
What If This Token Is Stolen?

What If JavaScript Is Compromised?

What If Cookies Leak?

What If The Secret Key Leaks?

What If The Database Leaks?
```

Security starts by thinking like an attacker.

---

# Core Security Principles

## Never Trust Client Data

```text
Client

↓

Untrusted
```

Always validate on the server.

---

## Minimize Exposure

Store only necessary information.

---

## Defense In Depth

Use multiple protections:

```text
JWT Signature

+

HttpOnly

+

Secure

+

SameSite

+

HTTPS
```

No single protection is enough.

---

## Assume Breach

Design systems assuming:

```text
Attackers Exist

Mistakes Happen

Tokens May Leak
```

and build protections accordingly.

---

# Day 5 Final Understanding

You should now be able to explain:

- Why LocalStorage and Cookies behave differently.
- Why cookies are automatically sent.
- Why JWTs can be stolen.
- Why XSS is dangerous.
- Why HttpOnly exists.
- Why JWT signatures do not prevent token theft.
- How attackers use stolen tokens.
- How layered security improves authentication systems.

---

# One-Line Summary

Security thinking means continuously asking how authentication systems can fail, how attackers could abuse them, and what layers of protection can reduce the impact when things inevitably go wrong.
