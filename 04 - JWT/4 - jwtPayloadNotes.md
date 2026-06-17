# JWT Payload

## Introduction

The Payload is the second part of a JSON Web Token.

JWT Structure:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

The Payload contains the actual information carried by the token.

This information is called **Claims**.

The Payload is the most important data section of the JWT.

---

# What Is the JWT Payload?

The Payload is a JSON object containing claims.

Claims are pieces of information about:

- The user
- The token
- The application

Example:

```json
{
  "userId": 42,
  "email": "anish@example.com",
  "role": "user"
}
```

Conceptually:

```text
Payload

↓

Claims

↓

Information
```

---

# Purpose of the Payload

The Payload answers questions such as:

```text
Who is the user?

↓

userId

--------------------

What role does the user have?

↓

role

--------------------

When does the token expire?

↓

exp
```

It carries information that the server may need when processing requests.

---

# What Are Claims?

Claims are key-value pairs stored inside the Payload.

Example:

```json
{
  "userId": 42,
  "role": "admin"
}
```

Claims:

```text
userId

↓

42

--------------------

role

↓

admin
```

Claims are simply pieces of information.

Nothing magical.

---

# Types of Claims

JWT claims are generally divided into:

```text
Registered Claims

↓

Standard JWT Claims

--------------------

Custom Claims

↓

Application-Specific Claims
```

---

# Registered Claims

JWT specification defines several common claims.

These are optional but widely used.

---

# sub (Subject)

Represents:

```text
Who is this token about?
```

Example:

```json
{
  "sub": "123"
}
```

Meaning:

```text
Subject

↓

User 123
```

Often used as the user identifier.

---

# iat (Issued At)

Represents:

```text
When was this token created?
```

Example:

```json
{
  "iat": 1710000000
}
```

Meaning:

```text
Token

↓

Issued At

↓

Specific Timestamp
```

---

# exp (Expiration)

Represents:

```text
When does this token become invalid?
```

Example:

```json
{
  "exp": 1711000000
}
```

Meaning:

```text
Current Time

↓

Greater Than exp

↓

Token Invalid
```

One of the most important JWT claims.

---

# iss (Issuer)

Represents:

```text
Who created this token?
```

Example:

```json
{
  "iss": "my-backend"
}
```

Meaning:

```text
Issuer

↓

my-backend
```

---

# aud (Audience)

Represents:

```text
Who should use this token?
```

Example:

```json
{
  "aud": "mobile-app"
}
```

Meaning:

```text
Audience

↓

mobile-app
```

Used to prevent tokens from being accepted by unintended systems.

---

# Custom Claims

Applications often add their own claims.

Example:

```json
{
  "userId": 42,
  "role": "admin",
  "premium": true
}
```

These are called:

```text
Custom Claims
```

Examples:

```text
userId

role

subscription

premium

permissions

organizationId
```

---

# Example Payload

```json
{
  "sub": "123",

  "email": "anish@example.com",

  "role": "admin",

  "iat": 1710000000,

  "exp": 1711000000
}
```

Meaning:

```text
sub

↓

User ID

--------------------

email

↓

User Email

--------------------

role

↓

Authorization Information

--------------------

iat

↓

Creation Time

--------------------

exp

↓

Expiration Time
```

---

# Is the Payload Encrypted?

No.

This is one of the most important JWT concepts.

The Payload is:

```text
Encoded

↓

Readable

↓

Not Secret
```

It is NOT:

```text
Encrypted

↓

Hidden

↓

Secret
```

---

# Base64URL Encoding

Before becoming part of the JWT:

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

Text Format
```

---

# Encoding vs Encryption

Encoding:

```text
Data

↓

Different Representation

↓

Can Be Decoded Easily
```

Encryption:

```text
Data

↓

Hidden

↓

Requires Key To Read
```

JWT uses:

```text
Encoding
```

Not:

```text
Encryption
```

---

# Can Anyone Read the Payload?

Yes.

Anyone possessing the token can decode:

```text
Header

↓

Readable

--------------------

Payload

↓

Readable
```

This is expected behavior.

---

# Can Anyone Modify the Payload?

Yes.

Example:

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

Modification is possible.

However:

```text
Payload Modified

↓

Signature Invalid

↓

Verification Fails

↓

Token Rejected
```

---

# Why Can't Attackers Simply Become Admin?

Suppose attacker changes:

```json
{
  "role": "admin"
}
```

The Payload changes.

However:

```text
Payload Changes

↓

Signature No Longer Matches

↓

Verification Fails

↓

Server Rejects JWT
```

The Signature protects integrity.

---

# What Should Never Be Stored in the Payload?

Never store:

```text
Password

OTP

Private Key

API Secret

Credit Card

Bank PIN

Sensitive Secrets
```

Because:

```text
Payload

↓

Readable By Anyone
```

Treat the Payload as publicly visible information.

---

# Does the Payload Authenticate the User?

No.

Many beginners think:

```text
Payload

↓

Contains userId

↓

Authenticated
```

Wrong.

Authentication only occurs after:

```text
Payload

+

Valid Signature

↓

Trusted
```

Without a valid Signature, the Payload cannot be trusted.

---

# Payload and Signature Relationship

The Signature is generated using:

```text
Header

+

Payload

+

Secret

↓

Algorithm

↓

Signature
```

Meaning:

```text
Payload Changes

↓

Signature Changes

↓

Verification Fails
```

The Signature protects the Payload from tampering.

---

# JWT Verification Flow

```text
JWT Received

↓

Split Into

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

Trusted
```

The Payload is trusted only after successful signature verification.

---

# Visual Mental Model

```text
                  JWT

        Header.Payload.Signature

                │

      ┌─────────┼─────────┐

      │         │         │

      ▼         ▼         ▼

   Header    Payload   Signature

      │         │

 Metadata   Claims

                │

         User Information

                │

          Readable

                │

       Not Encrypted
```

---

# Real-World Analogy

Imagine a university degree certificate.

Certificate:

```text
Student Name

Degree

Year

University
```

Anyone can read it.

Nothing is hidden.

However:

```text
University Seal

↓

Authenticity
```

The seal prevents forgery.

JWT Payload works similarly.

---

# Common Misconceptions

## ❌ Payload is encrypted

False.

It is encoded, not encrypted.

---

## ❌ Nobody can read the payload

False.

Anyone can decode it.

---

## ❌ Payload is secret

False.

Treat it as public information.

---

## ❌ Passwords can safely be stored inside JWTs

False.

Never store sensitive secrets.

---

## ❌ Payload cannot be modified

False.

Anyone can modify it.

However the Signature becomes invalid.

---

## ❌ Payload alone authenticates users

False.

Authentication requires successful signature verification.

---

# Key Takeaways

- The Payload is the second part of a JWT.
- The Payload contains claims.
- Claims are pieces of information.
- Claims can be standard or custom.
- Common claims include:
  - sub
  - iat
  - exp
  - iss
  - aud
- The Payload is Base64URL encoded.
- The Payload is not encrypted.
- Anyone can read the Payload.
- Sensitive secrets should never be stored in the Payload.
- The Signature protects the Payload from tampering.
- The Payload is trusted only after successful signature verification.

---

# One-Line Summary

The JWT Payload contains claims about the user or token, is Base64URL encoded but publicly readable, and relies on the JWT Signature to guarantee that its contents have not been modified since being issued by the server.
