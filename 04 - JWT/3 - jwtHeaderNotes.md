# JWT Header

## Introduction

The JWT Header is the first part of a JSON Web Token.

JWT Structure:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

The Header contains metadata about the token.

It tells the verifier:

- What type of token this is
- Which algorithm was used to create the signature

The Header does **not** contain user information.

---

# What Is the JWT Header?

The Header is a JSON object containing metadata about the token.

Typical Header:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

After Base64URL encoding:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

This becomes the first section of the JWT.

---

# Purpose of the Header

The Header answers:

```text
What kind of token is this?

↓

JWT

-------------------

How should the signature be verified?

↓

Algorithm
```

Think of it as an instruction sheet attached to the token.

---

# Header Structure

Typical structure:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Main fields:

```text
alg

↓

Algorithm

-------------------

typ

↓

Type
```

---

# typ (Type)

`typ` stands for:

```text
Type
```

Example:

```json
{
  "typ": "JWT"
}
```

Meaning:

```text
This object

↓

Is a JWT
```

Purpose:

```text
Verifier

↓

Recognizes Token Type

↓

JWT
```

It simply identifies the token format.

---

# alg (Algorithm)

`alg` stands for:

```text
Algorithm
```

Example:

```json
{
  "alg": "HS256"
}
```

Meaning:

```text
Signature

↓

Created Using

↓

HS256
```

The verifier uses this information to know how the signature should be checked.

---

# Why Is alg Important?

Suppose the server creates:

```text
Header

+

Payload

+

Secret

↓

HS256

↓

Signature
```

When the token returns:

```text
JWT

↓

Header

↓

alg = HS256
```

The server knows:

```text
Use HS256

↓

Verify Signature
```

Without knowing the algorithm, the server cannot verify the token correctly.

---

# Common Algorithms

## HS256

Most common beginner algorithm.

Conceptually:

```text
Header

+

Payload

+

Shared Secret

↓

HS256

↓

Signature
```

Characteristics:

- Symmetric
- Same secret used for signing and verification
- Common in learning projects

---

## RS256

Conceptually:

```text
Private Key

↓

Sign

--------------------

Public Key

↓

Verify
```

Characteristics:

- Asymmetric cryptography
- Public/Private key pair
- Common in large-scale systems

For now, understand only the difference:

```text
HS256

↓

Shared Secret

--------------------

RS256

↓

Public / Private Keys
```

---

# Is the Header Secret?

No.

Very important:

```text
Header

↓

Public

↓

Readable
```

Anyone can decode it.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This is completely normal.

Nothing sensitive should ever be stored in the Header.

---

# Can Anyone Read the Header?

Yes.

Anyone who has the JWT can decode:

```text
Header

↓

Readable
```

This is expected behavior.

The Header is metadata.

Not secret information.

---

# Can the Header Be Modified?

Yes.

Example:

Original:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Attacker modifies:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

Modification is possible.

However:

```text
Header Changed

↓

Signature Invalid

↓

Verification Fails

↓

Token Rejected
```

---

# Does the Signature Protect the Header?

Yes.

This is extremely important.

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
Header Modified

↓

Signature Changes

↓

Verification Fails
```

The Header is protected by the Signature.

---

# What Should Never Be Stored In The Header?

Never store:

```text
Password

OTP

Private Key

API Key

Credit Card

Personal Secrets
```

The Header is publicly visible.

Treat it as public information.

---

# Header vs Payload

Many beginners confuse them.

## Header

Contains:

```text
Metadata

↓

How token works
```

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

## Payload

Contains:

```text
Claims

↓

User Information
```

Example:

```json
{
  "userId": 42,
  "role": "admin"
}
```

---

# Header vs Signature

## Header

```text
Metadata
```

---

## Signature

```text
Integrity Verification

↓

Detect Tampering
```

The Signature is not stored inside the Header.

They are separate parts.

---

# JWT Creation Flow

```text
Create Header

↓

{
    alg: HS256,
    typ: JWT
}

↓

Create Payload

↓

Generate Signature

↓

Header.Payload.Signature

↓

JWT
```

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

      │

 Metadata

      │

 alg

 typ

      │

 Readable

      │

 Public
```

---

# Real-World Analogy

Imagine a passport.

## Header

```text
Passport

↓

Type

Country

Format
```

Metadata.

---

## Payload

```text
Name

DOB

Nationality
```

Information.

---

## Signature

```text
Government Seal

↓

Authenticity
```

---

# Common Misconceptions

## ❌ Header contains user information

False.

User information belongs in the Payload.

---

## ❌ Header is encrypted

False.

It is readable by anyone.

---

## ❌ Header contains secrets

False.

Never store secrets here.

---

## ❌ Header authenticates users

False.

Authentication requires successful signature verification.

---

## ❌ alg is a password

False.

It specifies the signing algorithm.

---

# Key Takeaways

- The Header is the first part of a JWT.
- The Header contains metadata.
- Typical fields are:
  - `alg`
  - `typ`
- `typ` identifies the token type.
- `alg` specifies the signing algorithm.
- The Header is publicly readable.
- The Header is not encrypted.
- The Header should never contain secrets.
- The Signature protects both the Header and Payload from tampering.
- Modifying the Header invalidates the Signature.

---

# One-Line Summary

The JWT Header is a publicly readable metadata section that identifies the token type and signing algorithm, allowing verifiers to correctly validate the JWT while relying on the Signature to detect any modification of the Header or Payload.
