# JWT Structure

## Introduction

A JSON Web Token (JWT) is a compact, URL-safe token format used to securely transmit claims between parties.

A JWT consists of three parts:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

The three sections are separated by dots (`.`).

Each section has a specific purpose.

---

# High-Level Structure

```text
JWT

↓

Header

↓

Payload

↓

Signature
```

Or:

```text
┌────────────┐
│  Header    │
└────────────┘

       .

┌────────────┐
│  Payload   │
└────────────┘

       .

┌────────────┐
│ Signature  │
└────────────┘
```

---

# Why Three Parts Exist

JWT separates responsibilities into three components.

```text
Header

↓

Metadata

-------------------

Payload

↓

Information

-------------------

Signature

↓

Integrity Verification
```

Each part solves a different problem.

---

# Part 1: Header

The Header contains metadata about the JWT.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Typical information:

- Token type
- Signing algorithm

Purpose:

```text
Header

↓

How should this token be interpreted?

↓

How should this token be verified?
```

The Header does **not** contain user information.

---

# Part 2: Payload

The Payload contains claims.

Claims are pieces of information stored inside the token.

Example:

```json
{
  "userId": 42,
  "email": "anish@example.com",
  "role": "user"
}
```

Purpose:

```text
Payload

↓

Information

↓

Claims
```

Examples of claims:

- userId
- email
- role
- permissions
- expiration time

---

# Part 3: Signature

The Signature protects the Header and Payload from tampering.

Conceptually:

```text
Header

+

Payload

+

Server Secret

↓

Signing Algorithm

↓

Signature
```

Purpose:

```text
Signature

↓

Verify Integrity

↓

Detect Modification
```

The Signature does not store user information.

---

# Complete JWT Example

Conceptually:

```text
Header

↓

{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload:

```text
{
  "userId": 42,
  "role": "admin"
}
```

Signature:

```text
Generated using

Header

+

Payload

+

Secret
```

Final JWT:

```text
xxxxx.yyyyy.zzzzz
```

---

# The Dot Separator

JWT uses dots (`.`) to separate sections.

Structure:

```text
Header

.

Payload

.

Signature
```

Example:

```text
eyJhbGci...

.

eyJ1c2Vy...

.

ABC123...
```

The dots are simply separators.

Nothing more.

---

# Base64URL Encoding

Before becoming a JWT:

```json
{
  "role": "admin"
}
```

is transformed into:

```text
eyJyb2xlIjoiYWRtaW4ifQ...
```

using Base64URL encoding.

Process:

```text
JSON

↓

Base64URL Encode

↓

Text Representation
```

---

# Encoding vs Encryption

This is one of the most important JWT concepts.

Encoding:

```text
Readable

↓

Different Format

↓

Can Be Decoded
```

Encryption:

```text
Readable

↓

Hidden

↓

Requires Key To Read
```

JWT uses:

```text
Base64URL Encoding
```

NOT:

```text
Encryption
```

---

# Can People Read JWT Contents?

Yes.

Anyone possessing the token can decode:

```text
Header

↓

Readable

-------------------

Payload

↓

Readable
```

The Header and Payload are not secret.

---

# Can People Modify JWT Contents?

Yes.

A user can modify:

```json
{
  "role": "user"
}
```

into:

```json
{
  "role": "admin"
}
```

However:

```text
Payload Changes

↓

Signature Invalid

↓

Verification Fails

↓

Token Rejected
```

The Signature prevents successful tampering.

---

# What Is Public?

Anyone can see:

```text
Header

Payload

Signature
```

The token itself is not hidden.

---

# What Is Secret?

The secret key used to generate the Signature.

Example:

```text
Server Secret
```

Only the server knows this value.

It never leaves the backend.

---

# Real-World Analogy

Imagine a passport.

## Header

```text
Passport Type

Country

Format
```

Metadata.

---

## Payload

```text
Name

DOB

Passport Number

Nationality
```

Information.

---

## Signature

```text
Government Stamp

Official Seal
```

Authenticity.

---

# JWT Component Responsibilities

| Component | Purpose                |
| --------- | ---------------------- |
| Header    | Metadata               |
| Payload   | Claims / Information   |
| Signature | Integrity Verification |

---

# Visual Mental Model

```text
                JWT

      Header.Payload.Signature

              │

      ┌───────┼────────┐

      │       │        │

      ▼       ▼        ▼

   Header   Payload   Signature

      │         │          │

 Metadata   Claims     Integrity

      │         │

 Readable  Readable

      │

 Not Secret
```

---

# Common Misconceptions

## ❌ JWT is encrypted

False.

JWT is encoded, not encrypted.

---

## ❌ Payload is secret

False.

Anyone can decode it.

---

## ❌ Signature stores user data

False.

It only verifies integrity.

---

## ❌ Header stores user information

False.

It stores metadata.

---

## ❌ Dots are part of the data

False.

Dots simply separate sections.

---

# Key Takeaways

- JWT consists of three parts.
- Structure:

```text
Header.Payload.Signature
```

- Header contains metadata.
- Payload contains claims.
- Signature protects against tampering.
- Header and Payload are Base64URL encoded.
- Base64URL encoding is not encryption.
- Anyone can read Header and Payload.
- The Signature ensures the token has not been modified.
- The secret key never leaves the server.

---

# One-Line Summary

A JWT is a three-part token consisting of a Header (metadata), Payload (claims), and Signature (integrity verification), where the Header and Payload are readable by anyone, and the Signature ensures the token has not been altered after being issued by the server.
