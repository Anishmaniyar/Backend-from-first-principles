# JWT Signature Verification

## Introduction

Creating a JWT is only half of the process.

The real security happens during:

```text
Verification
```

Every time a protected request arrives, the server must answer one question:

```text
Can I trust this JWT?
```

The answer comes from signature verification.

Without verification:

```text
JWT Authentication

↓

Completely Insecure
```

Verification is the process that allows the server to detect:

- Modified tokens
- Forged tokens
- Fake tokens
- Expired tokens (usually checked alongside verification)

---

# Why Verification Exists

Suppose a user sends:

```json
{
  "role": "admin"
}
```

inside a JWT.

Can the server trust this?

```text
NO
```

Why?

Because anyone can modify the Payload.

The server must first verify:

```text
Was this Payload actually signed by me?
```

This is the purpose of verification.

---

# High-Level Verification Flow

```text
Incoming JWT

↓

Split Token

↓

Header

Payload

Signature

↓

Recompute Signature

↓

Compare

↓

Match?

↓

Authenticated
```

---

# Step 1: Receive JWT

Browser sends:

```text
Authorization: Bearer JWT
```

or

```text
Cookie

↓

JWT
```

Server receives:

```text
Header.Payload.Signature
```

---

# Step 2: Split The JWT

JWT:

```text
xxxxx.yyyyy.zzzzz
```

becomes:

```text
Header

Payload

Signature
```

The server extracts all three components.

---

# Step 3: Read Header

Server inspects:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Purpose:

```text
Determine Verification Algorithm
```

Example:

```text
alg = HS256

↓

Verify Using HS256
```

---

# Step 4: Read Payload

Payload contains claims:

```json
{
  "userId": 42,
  "role": "user"
}
```

At this point:

```text
Server Can Read Payload

↓

But Cannot Trust It Yet
```

Very important.

Reading is not trusting.

---

# Step 5: Extract Signature

Example:

```text
abc123xyzSignature
```

Server stores:

```text
Incoming Signature
```

for comparison.

---

# Step 6: Recompute Signature

The server now recreates the signature.

Using:

```text
Header

+

Payload

+

Secret

↓

Signing Algorithm

↓

New Signature
```

Example:

```text
Header

+

Payload

+

my-secret-key

↓

HS256

↓

Signature B
```

---

# Step 7: Compare Signatures

Server now has:

```text
Incoming Signature

↓

Signature A

-------------------

Computed Signature

↓

Signature B
```

Compare:

```text
Signature A

=

Signature B ?
```

---

# Case 1: Signatures Match

```text
Signature A

=

Signature B
```

Meaning:

```text
Header Unchanged

↓

Payload Unchanged

↓

JWT Trusted
```

Result:

```text
Authenticated
```

---

# Case 2: Signatures Do Not Match

```text
Signature A

≠

Signature B
```

Meaning:

```text
Header Modified

OR

Payload Modified

OR

Token Forged
```

Result:

```text
Verification Failed

↓

Reject JWT

↓

401 Unauthorized
```

---

# Example: Payload Tampering

Original:

```json
{
  "role": "user"
}
```

JWT:

```text
Header

↓

Payload(user)

↓

Signature A
```

Attacker changes:

```json
{
  "role": "admin"
}
```

JWT becomes:

```text
Header

↓

Payload(admin)

↓

Signature A
```

Server computes:

```text
Header

+

Payload(admin)

+

Secret

↓

Signature B
```

Compare:

```text
Signature A

≠

Signature B
```

Result:

```text
Verification Failed
```

---

# Example: Header Tampering

Original:

```json
{
  "alg": "HS256"
}
```

Modified:

```json
{
  "alg": "RS256"
}
```

Result:

```text
Header Changed

↓

Signature Invalid

↓

Verification Failed
```

The Signature protects both:

```text
Header

↓

Protected

-------------------

Payload

↓

Protected
```

---

# Why Recompute The Signature?

A common beginner question:

```text
Why not simply trust the incoming Signature?
```

Because:

```text
Attacker Controls JWT
```

Everything received from the client is untrusted.

The server must independently verify it.

---

# Security Mindset

Never trust:

```text
Client Data
```

Instead:

```text
Verify Client Data
```

JWT verification follows the same principle.

---

# What Does Verification Actually Prove?

Verification proves:

```text
Header

↓

Unmodified

-------------------

Payload

↓

Unmodified
```

since the token was signed.

It does NOT prove:

```text
Claims Are Correct
```

Only that they haven't changed.

---

# Integrity vs Correctness

Suppose the server accidentally creates:

```json
{
  "role": "admin"
}
```

for a normal user.

The Signature will verify successfully.

Why?

Because:

```text
Verification

↓

Checks Integrity

↓

Not Correctness
```

---

# Verification And Trust

Without verification:

```text
Payload

↓

Cannot Be Trusted
```

After verification:

```text
Payload

↓

Trusted
```

because the server knows it signed it.

---

# Verification And Expiration

Usually after signature verification:

```text
Verify Signature

↓

Check exp Claim

↓

Token Expired?

↓

Reject If Expired
```

Verification and expiration checks often work together.

---

# Real-World Analogy

Imagine a passport.

Passport contains:

```text
Name

DOB

Nationality
```

You can read it.

But before trusting it:

```text
Inspect Government Seal

↓

Verify Authenticity

↓

Accept Passport
```

JWT verification works exactly the same way.

---

# Visual Mental Model

```text
Incoming JWT

↓

Split

↓

Header

Payload

Signature

↓

Recompute Signature

↓

Compare

↓

Match?

├── Yes → Authenticated
│
└── No → Reject Token
```

---

# Common Misconceptions

## ❌ Decoding means verification

False.

Decoding only reveals information.

Verification establishes trust.

---

## ❌ Payload can be trusted immediately

False.

Verification must happen first.

---

## ❌ Signature proves claims are true

False.

It proves claims have not changed.

---

## ❌ Server trusts incoming Signature

False.

The server recomputes and compares.

---

## ❌ Verification prevents reading

False.

Verification prevents undetected tampering.

---

# Key Takeaways

- Verification is the foundation of JWT security.
- The server never blindly trusts a JWT.
- JWT verification involves recomputing the Signature.
- The server compares the incoming Signature with the computed Signature.
- Matching signatures mean the JWT has not been modified.
- Modified Header or Payload causes verification failure.
- Verification proves integrity, not correctness.
- Decoding and verification are different concepts.
- Authentication depends on successful verification.

---

# One-Line Summary

JWT signature verification works by recomputing a signature using the Header, Payload, and server secret, then comparing it with the incoming signature to ensure the token has not been modified and can therefore be trusted.
