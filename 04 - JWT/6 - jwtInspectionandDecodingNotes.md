# Manual JWT Inspection & Decoding

## Introduction

Before using JWT libraries such as:

```text
jsonwebtoken

jose

passport-jwt
```

it is important to understand what a JWT actually looks like internally.

A JWT is not magic.

It is simply:

```text
Header.Payload.Signature
```

Understanding how to manually inspect and decode a JWT helps remove the "black box" feeling and builds intuition about how JWT authentication works.

---

# Goal of Manual Inspection

The goal is to understand:

```text
JWT

↓

Three Parts

↓

Header

Payload

Signature

↓

How They Work Together
```

Before writing code, every developer should be able to inspect a JWT and identify:

- Header
- Payload
- Signature
- Claims
- Algorithm
- Expiration
- User Information

---

# Example JWT

A JWT typically looks like:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjQyLCJyb2xlIjoidXNlciJ9.
abc123xyzSignature
```

At first glance:

```text
Random Text

↓

Confusing

↓

Hard To Read
```

However it follows a strict structure.

---

# Step 1: Split The JWT

JWTs always contain:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx

.

yyyyy

.

zzzzz
```

Conceptually:

```text
Part 1

↓

Header

-------------------

Part 2

↓

Payload

-------------------

Part 3

↓

Signature
```

The dots (`.`) act as separators.

---

# Step 2: Decode The Header

The first section contains:

```text
Base64URL(Header)
```

After decoding:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This reveals metadata.

Questions answered:

```text
Which algorithm?

↓

HS256

-------------------

Token type?

↓

JWT
```

---

# Step 3: Decode The Payload

The second section contains:

```text
Base64URL(Payload)
```

After decoding:

```json
{
  "userId": 42,
  "role": "user",
  "iat": 1710000000,
  "exp": 1711000000
}
```

This reveals claims.

Questions answered:

```text
Who is the user?

↓

userId

-------------------

What role?

↓

role

-------------------

When issued?

↓

iat

-------------------

When expires?

↓

exp
```

---

# Step 4: Observe The Signature

The third section is:

```text
Signature
```

Example:

```text
abc123xyzSignature
```

Unlike Header and Payload:

```text
Signature

↓

Cannot Be Meaningfully Decoded

↓

Verification Value
```

Its purpose is integrity verification.

---

# What Can Be Read?

Anyone possessing the JWT can read:

```text
Header

↓

Readable

-------------------

Payload

↓

Readable
```

This is normal behavior.

---

# What Cannot Be Seen?

The server secret.

Example:

```text
Server Secret

↓

Never Included In JWT

↓

Never Visible To Client
```

This is the foundation of JWT security.

---

# Manual Inspection Process

Whenever you receive a JWT:

```text
JWT

↓

Split

↓

Header

Payload

Signature

↓

Decode Header

↓

Decode Payload

↓

Inspect Claims
```

This should become a habit.

---

# Common Payload Information

While inspecting JWTs you may commonly see:

```text
sub

userId

email

role

permissions

iat

exp

iss

aud
```

Understanding these claims helps understand the token's purpose.

---

# Is JWT Encrypted?

No.

Manual inspection proves this.

You can decode:

```text
Header

↓

Readable

-------------------

Payload

↓

Readable
```

Therefore:

```text
JWT

↓

Encoded

↓

Not Encrypted
```

---

# Encoding vs Encryption

Encoding:

```text
Readable

↓

Different Format

↓

Easily Decoded
```

Encryption:

```text
Readable

↓

Hidden

↓

Requires Key
```

JWT uses:

```text
Base64URL Encoding
```

Not:

```text
Encryption
```

---

# Why This Exercise Matters

Many beginners think:

```text
JWT

↓

Secure

↓

Nobody Can Read It
```

Manual decoding immediately disproves this.

After decoding:

```text
JWT

↓

Readable Data

↓

Public Information
```

This creates the correct security mindset.

---

# What Information Should Never Be Stored?

Because the Payload is readable:

Never store:

```text
Password

OTP

Credit Card

Private Key

API Secret

Bank PIN

Sensitive Personal Data
```

Anyone with the token can decode it.

---

# Think Like An Attacker

When inspecting a JWT ask:

```text
Can I Read Header?

↓

Yes

-------------------

Can I Read Payload?

↓

Yes

-------------------

Can I Read Secret?

↓

No

-------------------

Can I Generate Valid Signature?

↓

No
```

This helps understand the security model.

---

# What Happens If Payload Is Modified?

Original:

```json
{
  "role": "user"
}
```

Modified:

```json
{
  "role": "admin"
}
```

Result:

```text
Payload Changed

↓

Signature Invalid

↓

Verification Fails

↓

Token Rejected
```

This demonstrates why the Signature exists.

---

# Manual Inspection vs Verification

Inspection:

```text
Read JWT

↓

Decode Header

↓

Decode Payload
```

Verification:

```text
Read JWT

↓

Recompute Signature

↓

Compare Signature

↓

Trust Token
```

Inspection and verification are different processes.

---

# Visual Mental Model

```text
JWT

↓

Split

↓

┌──────────┐
│ Header   │
└──────────┘

↓

Decode

↓

Metadata

===================

┌──────────┐
│ Payload  │
└──────────┘

↓

Decode

↓

Claims

===================

┌──────────┐
│Signature │
└──────────┘

↓

Verify

↓

Integrity Check
```

---

# Real-World Analogy

Imagine receiving a passport.

You can immediately inspect:

```text
Name

DOB

Passport Number

Nationality
```

You do not need government access to read it.

However:

```text
Government Seal

↓

Authenticity Verification
```

is what determines whether the passport is trusted.

JWT inspection works the same way.

---

# Common Misconceptions

## ❌ JWT contents are hidden

False.

Header and Payload are readable.

---

## ❌ Decoding means verifying

False.

Decoding only reveals information.

Verification establishes trust.

---

## ❌ Signature contains user data

False.

User data belongs in the Payload.

---

## ❌ Signature can be decoded to reveal secrets

False.

The Secret Key never appears in the JWT.

---

## ❌ Encoded means encrypted

False.

Base64URL encoding is not encryption.

---

# Key Takeaways

- JWT consists of:
  - Header
  - Payload
  - Signature
- JWT can be manually split using dots (`.`).
- Header can be decoded and inspected.
- Payload can be decoded and inspected.
- Signature is used for verification.
- JWT is encoded, not encrypted.
- Anyone can read Header and Payload.
- The Secret Key never appears in the JWT.
- Decoding does not mean verification.
- Manual inspection builds intuition about JWT internals.

---

# One-Line Summary

Manual JWT inspection involves splitting the token into Header, Payload, and Signature, decoding the readable sections to understand the token's contents, and recognizing that trust comes not from decoding but from successful signature verification.
