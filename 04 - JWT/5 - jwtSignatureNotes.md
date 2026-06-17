# JWT Signature

## Introduction

The Signature is the third and most important part of a JSON Web Token.

JWT Structure:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

The Signature is responsible for protecting the Header and Payload from tampering.

Without the Signature, JWT authentication would be completely insecure.

---

# Why Does JWT Need a Signature?

Consider this Payload:

```json
{
  "userId": 42,
  "role": "user"
}
```

Since the Payload is readable, an attacker can modify it:

```json
{
  "userId": 42,
  "role": "admin"
}
```

Without a Signature:

```text
Attacker Modifies Payload

↓

Server Accepts It

↓

Privilege Escalation

↓

Security Broken
```

JWT needs a way to detect whether the Header or Payload has been modified.

This is the purpose of the Signature.

---

# What Is a JWT Signature?

A JWT Signature is a cryptographic value generated using:

```text
Header

+

Payload

+

Secret

↓

Signing Algorithm

↓

Signature
```

The Signature acts as proof that:

```text
Header

↓

Not Modified

-------------------

Payload

↓

Not Modified
```

since the token was created.

---

# Purpose of the Signature

The Signature answers one question:

```text
Can this token be trusted?
```

If the Signature is valid:

```text
Token Untouched

↓

Trust Claims
```

If the Signature is invalid:

```text
Token Modified

↓

Reject Token
```

---

# Signature Generation

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

Example:

```text
Header

↓

{
  alg: HS256
}

+

Payload

↓

{
  userId: 42,
  role: user
}

+

Secret

↓

my-secret-key

↓

HS256

↓

Signature
```

---

# The Secret Key

The most important component is:

```text
Secret Key
```

Example:

```text
my-secret-key
```

Characteristics:

```text
Known Only To Server

↓

Never Sent To Client

↓

Never Stored In JWT
```

The Secret Key is the foundation of JWT security.

---

# What Does The Client Receive?

The client receives:

```text
Header

↓

Payload

↓

Signature
```

The client never receives:

```text
Secret Key
```

JWT:

```text
Header.Payload.Signature
```

Secret:

```text
Server Only
```

---

# Why Can't Clients Generate Their Own JWTs?

Suppose an attacker changes:

```json
{
  "role": "admin"
}
```

To create a valid JWT, they would need:

```text
Header

+

Modified Payload

+

Server Secret

↓

Generate Signature
```

But:

```text
Server Secret

↓

Unknown To Attacker
```

Therefore:

```text
Cannot Generate Valid Signature

↓

Forgery Fails
```

---

# Token Creation Flow

Authentication:

```text
User Login

↓

Verify Credentials

↓

Create Header

↓

Create Payload

↓

Generate Signature

↓

Create JWT

↓

Send JWT To Browser
```

---

# JWT Verification Flow

Future request:

```text
Browser Sends JWT

↓

Server Receives JWT

↓

Split JWT

↓

Header

Payload

Signature
```

Server then recomputes:

```text
Header

+

Payload

+

Same Secret

↓

Generate New Signature
```

Compare:

```text
Incoming Signature

↓

New Signature

↓

Match?
```

If:

```text
Match

↓

Valid JWT

↓

Authenticated
```

Otherwise:

```text
Mismatch

↓

Invalid JWT

↓

Rejected
```

---

# What Happens If Payload Changes?

Original Payload:

```json
{
  "role": "user"
}
```

Original JWT:

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

↓

401 Unauthorized
```

---

# What Happens If Header Changes?

Original:

```json
{
  "alg": "HS256"
}
```

Attacker changes:

```json
{
  "alg": "RS256"
}
```

Now:

```text
Header Changed

↓

Signature Invalid

↓

Verification Fails
```

The Signature protects both:

```text
Header

↓

Protected

--------------------

Payload

↓

Protected
```

---

# Signature Protects Integrity

The Signature guarantees:

```text
Header

↓

Untouched

--------------------

Payload

↓

Untouched
```

It does NOT guarantee:

```text
Information Is Correct
```

Only that it has not been modified.

---

# Integrity vs Correctness

Important distinction:

Suppose the server accidentally creates:

```json
{
  "role": "admin"
}
```

for the wrong user.

The Signature will still verify successfully.

Why?

Because:

```text
Signature

↓

Proves Integrity

↓

Not Correctness
```

The Signature only proves:

```text
Token Not Modified
```

---

# Is the Signature Encryption?

No.

The Signature:

```text
Does NOT Encrypt Data
```

It only:

```text
Verifies Integrity
```

The Payload remains readable.

---

# Is the Signature Secret?

No.

The Signature is visible inside the JWT.

Example:

```text
Header.Payload.Signature
```

Anyone can see:

```text
Signature
```

Security comes from:

```text
Secret Key

↓

Hidden
```

Not from hiding the Signature.

---

# What Happens If The Secret Leaks?

This is catastrophic.

Attacker obtains:

```text
Secret Key
```

Now attacker can:

```text
Create Fake Payload

↓

Generate Valid Signature

↓

Forge JWT
```

Example:

```json
{
  "role": "admin"
}
```

can now be signed correctly.

The server will trust it.

---

# Signature vs Payload

## Payload

Contains:

```text
Claims

↓

Information
```

Examples:

```text
userId

role

email

exp
```

---

## Signature

Contains:

```text
Cryptographic Proof

↓

Integrity Verification
```

No user information is stored here.

---

# Real-World Analogy

Imagine a university certificate.

Certificate:

```text
Student Name

Degree

Year
```

Anyone can read it.

Anyone can photocopy it.

Anyone can edit it.

However:

```text
University Seal

↓

Authenticity
```

If someone edits:

```text
Degree

↓

PhD
```

The seal is no longer valid.

JWT Signature works the same way.

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

 Metadata   Claims    Integrity

      │         │

 Readable  Readable

      │

 Protected By Signature
```

---

# Common Misconceptions

## ❌ Signature encrypts the Payload

False.

The Payload remains readable.

---

## ❌ Signature hides information

False.

It protects integrity, not confidentiality.

---

## ❌ Signature contains user information

False.

Claims belong in the Payload.

---

## ❌ Clients can generate valid Signatures

False.

They do not know the Secret Key.

---

## ❌ Signature proves information is correct

False.

It proves information has not been modified.

---

## ❌ Signature is secret

False.

The Secret Key is secret.

The Signature is visible.

---

# Key Takeaways

- The Signature is the third part of a JWT.
- It is generated using:
  - Header
  - Payload
  - Secret Key
  - Signing Algorithm
- The Secret Key never leaves the server.
- The Signature protects the Header and Payload from tampering.
- Modifying either the Header or Payload invalidates the Signature.
- The Signature does not encrypt data.
- The Signature verifies integrity.
- The Signature does not prove correctness.
- If the Secret Key leaks, attackers can forge valid JWTs.

---

# One-Line Summary

The JWT Signature is a cryptographic proof generated from the Header, Payload, and a server-side secret key that allows the server to detect any modification of the token and trust that its contents have remained unchanged since issuance.
