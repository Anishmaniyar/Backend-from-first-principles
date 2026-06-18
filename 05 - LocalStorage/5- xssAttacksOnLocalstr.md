# XSS Attack on LocalStorage

## Introduction

One of the biggest security concerns with storing JWTs in LocalStorage is that JavaScript can freely access LocalStorage.

If an attacker successfully performs an XSS attack, they can execute JavaScript inside the victim's browser.

Since JavaScript can access LocalStorage:

```text
Attacker Script

↓

Can Access JWT
```

This is why XSS and LocalStorage are closely connected in authentication discussions.

---

# Authentication Flow With LocalStorage

Normal authentication:

```text
Login

↓

Generate JWT

↓

Store JWT

↓

LocalStorage

↓

Future Request

↓

Authorization Header

↓

Authenticated
```

Everything works correctly.

---

# The Problem

LocalStorage is fully accessible to JavaScript.

Example:

```text
JavaScript

↓

Read LocalStorage

↓

Allowed
```

This is convenient for developers.

However:

```text
Attacker JavaScript

↓

Also Read LocalStorage

↓

Allowed
```

This creates risk.

---

# Attack Flow

## Step 1

User logs in.

```text
Login

↓

JWT Generated

↓

Store JWT In LocalStorage
```

---

## Step 2

JWT remains stored.

```text
LocalStorage

↓

JWT
```

---

## Step 3

Application contains an XSS vulnerability.

```text
Attacker

↓

Injects Script
```

---

## Step 4

Victim loads the vulnerable page.

```text
Victim

↓

Open Page

↓

Browser Executes Script
```

---

## Step 5

Malicious JavaScript executes.

```text
Attacker Script

↓

Read LocalStorage
```

---

## Step 6

JWT is obtained.

```text
LocalStorage

↓

JWT Retrieved
```

---

## Step 7

JWT is sent to attacker.

```text
JWT

↓

Attacker Server

↓

Token Stolen
```

---

# Visual Flow

```text
Victim Login

↓

JWT

↓

LocalStorage

↓

XSS Exists

↓

Malicious Script Executes

↓

Read JWT

↓

Send JWT To Attacker

↓

Token Stolen
```

---

# Why Does This Work?

Because:

```text
JavaScript

↓

Can Read LocalStorage
```

and

```text
Attacker Script

↓

Is JavaScript
```

The browser treats both the same.

---

# What Happens After Token Theft?

The attacker now possesses:

```text
Valid JWT
```

They can send requests:

```text
Authorization:

Bearer <Stolen JWT>
```

to the backend.

The backend cannot tell:

```text
Real User

vs

Attacker
```

because both are presenting a valid token.

---

# Consequences

Possible outcomes:

```text
Account Takeover

Profile Access

Data Theft

Unauthorized Actions

API Abuse
```

---

# Why This Is The "Aha" Moment

Many developers think:

```text
JWT Is Signed

↓

JWT Is Secure
```

The signature only protects against:

```text
Modification
```

It does NOT protect against:

```text
Theft
```

If the attacker steals a valid JWT:

```text
Signature

↓

Still Valid
```

The token continues to work.

---

# JWT Security vs JWT Theft

## Signature Protection

Stops:

```text
Payload Modification

Token Forgery
```

---

## Signature Protection Does NOT Stop

```text
Token Theft
```

A stolen valid token is still valid.

---

# Why HttpOnly Cookies Exist

This attack is one of the primary reasons HttpOnly was introduced.

With HttpOnly:

```text
JavaScript

↓

Cannot Read Cookie
```

Therefore:

```text
Malicious Script

↓

Cannot Steal JWT Directly
```

---

# LocalStorage Security Reality

LocalStorage is not insecure by itself.

The real danger is:

```text
LocalStorage

+

XSS

↓

Token Theft
```

Without XSS:

```text
LocalStorage

↓

Usually Fine
```

With XSS:

```text
LocalStorage

↓

High Risk
```

---

# Common Misconceptions

## ❌ JWT Signature Prevents Theft

False.

It prevents modification, not theft.

---

## ❌ LocalStorage Is Broken

False.

The risk comes from XSS.

---

## ❌ Attackers Need Backend Access

False.

The attack happens entirely inside the browser.

---

## ❌ A Stolen JWT Becomes Invalid

False.

A stolen valid JWT remains valid until expiration or revocation.

---

# Key Takeaways

- LocalStorage can be accessed by JavaScript.
- XSS allows attackers to execute JavaScript.
- Malicious JavaScript can read LocalStorage.
- JWTs stored in LocalStorage can be stolen through XSS.
- JWT signatures protect integrity, not confidentiality.
- A stolen valid JWT can still authenticate requests.
- This attack is one of the main reasons HttpOnly cookies are commonly recommended.

---

# One-Line Summary

An XSS attack on LocalStorage works by executing malicious JavaScript inside a victim's browser, allowing the attacker to read and steal JWTs stored in LocalStorage, demonstrating that token theft is a different problem from token forgery and one of the primary reasons HttpOnly cookies exist.
