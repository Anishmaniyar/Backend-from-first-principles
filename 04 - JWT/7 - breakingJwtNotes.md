# Breaking JWTs (Understanding JWT Security)

## Introduction

One of the best ways to understand JWT security is to think like an attacker.

Instead of asking:

```text
How do JWTs work?
```

Ask:

```text
How would I try to break a JWT?
```

This exercise helps build a security mindset and explains why the Signature is the most important part of a JWT.

The goal is not to hack systems.

The goal is to understand:

```text
What attackers can do

↓

What attackers cannot do

↓

Why JWT Signatures matter
```

---

# Security Mindset

Whenever you see a JWT:

```text
Header.Payload.Signature
```

Ask:

```text
Can I read it?

Can I modify it?

Can I forge it?

Can I bypass verification?
```

These questions help reveal the purpose of the Signature.

---

# Experiment 1: Read The JWT

Suppose a JWT contains:

```json
{
  "userId": 42,
  "role": "user"
}
```

Can an attacker read it?

```text
YES
```

Why?

Because:

```text
Header

↓

Readable

--------------------

Payload

↓

Readable
```

JWT is encoded, not encrypted.

---

# Experiment 2: Modify The Payload

Original:

```json
{
  "userId": 42,
  "role": "user"
}
```

Attacker changes:

```json
{
  "userId": 42,
  "role": "admin"
}
```

Can the attacker modify it?

```text
YES
```

The attacker controls the JWT stored in their browser.

They can change any part of it.

---

# The Big Question

If modification is possible:

```text
Why Doesn't Everyone Become Admin?
```

Answer:

```text
Signature Verification
```

---

# What Happens After Modification?

Original JWT:

```text
Header

↓

Payload(role=user)

↓

Signature A
```

Attacker changes:

```text
Header

↓

Payload(role=admin)

↓

Signature A
```

Server verifies:

```text
Header

+

Payload(admin)

+

Secret

↓

Generate Signature B
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

↓

JWT Rejected
```

---

# Key Lesson

An attacker can modify:

```text
Header

↓

Yes

--------------------

Payload

↓

Yes
```

But cannot generate:

```text
Valid Signature
```

without knowing the secret.

---

# Experiment 3: Modify The Header

Original:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Attacker changes:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

Result:

```text
Header Changed

↓

Signature Invalid

↓

Verification Fails
```

The Signature protects:

```text
Header

+

Payload
```

Not just the Payload.

---

# Experiment 4: Remove The Signature

Original:

```text
Header.Payload.Signature
```

Attacker sends:

```text
Header.Payload
```

Result:

```text
No Signature

↓

Cannot Verify

↓

Reject Token
```

Without a Signature, trust is impossible.

---

# Experiment 5: Create A Completely Fake JWT

Attacker creates:

```json
{
  "userId": 1,
  "role": "admin"
}
```

and builds:

```text
Header

↓

Payload

↓

Fake Signature
```

Can the server trust it?

```text
NO
```

Server computes:

```text
Expected Signature

↓

Different

↓

Verification Failed
```

Token rejected.

---

# What Attackers Can Do

## Read Header

```text
YES
```

---

## Read Payload

```text
YES
```

---

## Modify Header

```text
YES
```

---

## Modify Payload

```text
YES
```

---

## Delete JWT

```text
YES
```

Users control their browsers.

---

# What Attackers Cannot Do

## Generate Valid Signature

```text
NO
```

Without secret.

---

## Forge Trusted JWT

```text
NO
```

Without secret.

---

## Bypass Verification

```text
NO
```

Assuming correct implementation.

---

# The Role Of The Secret

Everything depends on:

```text
Server Secret
```

JWT security model:

```text
Secret Hidden

↓

Signature Valid

↓

JWT Trusted
```

If the secret leaks:

```text
Attacker Gets Secret

↓

Creates Fake JWT

↓

Generates Valid Signature

↓

Server Trusts Token
```

JWT security completely collapses.

---

# Why Signature Verification Matters

Without verification:

```text
Payload

↓

Trusted

↓

Anyone Can Become Admin
```

With verification:

```text
Payload

↓

Modified

↓

Signature Invalid

↓

Rejected
```

Verification is what makes JWT useful.

---

# JWT Security Rule

Never trust:

```text
Payload Alone
```

Trust:

```text
Payload

+

Valid Signature
```

Only after verification.

---

# Think Like The Server

When receiving a JWT:

Do not ask:

```text
What does the payload say?
```

Ask:

```text
Can I trust what the payload says?
```

Only the Signature answers that question.

---

# Real-World Analogy

Imagine a university certificate.

Certificate says:

```text
Student

↓

Anish

Degree

↓

B.Tech
```

Someone edits:

```text
Degree

↓

PhD
```

Can they modify it?

```text
YES
```

Will the university seal still be valid?

```text
NO
```

The seal detects tampering.

JWT Signature works exactly the same way.

---

# Visual Mental Model

```text
Attacker

↓

Read JWT

↓

Modify Payload

↓

Try To Reuse Signature

↓

Server Verifies

↓

Signature Mismatch

↓

Reject Token
```

---

# Common Misconceptions

## ❌ JWT is secure because nobody can read it

False.

Anyone can read Header and Payload.

---

## ❌ Payload cannot be modified

False.

Anyone can modify it.

---

## ❌ Signature prevents reading

False.

It prevents undetected modification.

---

## ❌ JWT is encrypted

False.

JWT is encoded.

---

## ❌ Signature proves claims are correct

False.

It proves claims have not changed since signing.

---

# Key Takeaways

- JWT contents are readable.
- JWT contents are modifiable.
- The Signature protects Header and Payload integrity.
- Modifying the Payload invalidates the Signature.
- Modifying the Header invalidates the Signature.
- Attackers cannot generate valid Signatures without the secret.
- The Secret Key is the foundation of JWT security.
- Verification is what makes JWT trustworthy.
- Trust the Signature, not the Payload alone.

---

# One-Line Summary

Breaking JWTs conceptually demonstrates that while anyone can read or modify a JWT's Header and Payload, only someone with the server's secret key can generate a valid Signature, making signature verification the foundation of JWT security.
