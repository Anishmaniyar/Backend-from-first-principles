# Day 4 Learning Log – JWT Fundamentals & Mini JWT Demo

## Objective

The goal of Day 4 was not to build a complete authentication system.

The goal was to understand:

- Why JWT exists
- How JWT works internally
- How JWT differs from Sessions
- How JWT signatures provide security
- How token verification works
- How a protected route is implemented

---

# Key Learnings

## 1. JWT Structure

A JWT consists of three parts:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

Each section has a different responsibility.

### Header

Contains metadata about the token.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Purpose:

- Token type
- Signing algorithm

### Payload

Contains claims.

Example:

```json
{
  "id": "000001",
  "email": "john@example.com",
  "role": "user"
}
```

Purpose:

- Store information about the authenticated user
- Store token-related information

### Signature

Provides integrity verification.

Purpose:

- Detect token tampering
- Prevent attackers from modifying claims

---

# 2. JWT Libraries Automatically Create Headers

While implementing token generation, I initially expected to manually create:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

However, I learned that libraries such as:

```text
jsonwebtoken
```

automatically generate the standard JWT header.

Therefore, during token creation I only need:

```text
Payload

+

Secret Key

↓

JWT Library

↓

Complete JWT
```

---

# 3. Login Flow

The login route is responsible for:

```text
Receive Credentials

↓

Validate Credentials

↓

Generate JWT

↓

Return JWT
```

Flow:

```text
POST /login

↓

Email

↓

Password

↓

Validation

↓

Generate Token

↓

Return Token
```

The output of successful authentication is:

```text
JWT Token
```

---

# 4. Token Generation

A token is generated using:

```text
Payload

+

Secret Key

↓

jwt.sign()

↓

JWT
```

Important observations:

- Password should never be placed inside the token
- Sensitive secrets should never be placed inside the token
- Only required claims should be included

Example claims:

```text
User ID

Email

Role
```

---

# 5. Protected Routes

Routes such as:

```text
GET /verify

GET /profile
```

should not be publicly accessible.

These routes require:

```text
Valid JWT
```

before access is granted.

This introduced the concept of protected routes.

---

# 6. Authentication Middleware

Instead of verifying JWTs inside every controller:

```text
Controller

↓

Verify JWT

↓

Controller

↓

Verify JWT

↓

Controller

↓

Verify JWT
```

A middleware can perform verification once.

Flow:

```text
Request

↓

Authentication Middleware

↓

JWT Valid?

↓

Yes

↓

Controller
```

Benefits:

- Cleaner code
- Reusable logic
- Centralized authentication

---

# 7. Authorization Header

JWTs are commonly sent using:

```text
Authorization: Bearer <token>
```

Example:

```text
Authorization: Bearer eyJhbGciOi...
```

Flow:

```text
Browser

↓

Authorization Header

↓

Server

↓

Extract Token

↓

Verify Token
```

---

# 8. JWT Verification

One of the biggest realizations today was understanding how verification actually works.

Initially I thought:

```text
JWT

↓

Compare With Stored JWT

↓

Authenticated
```

This is incorrect.

JWT authentication is stateless.

The server does not store the JWT.

---

# Actual Verification Process

Server receives:

```text
Header.Payload.Signature
```

Then:

```text
Extract Header

↓

Extract Payload

↓

Extract Signature
```

The server then uses:

```text
Header

+

Payload

+

SECRET_KEY
```

to generate a new signature.

Example:

```text
Incoming Signature

↓

Signature A

--------------------

Computed Signature

↓

Signature B
```

Then:

```text
Signature A

==

Signature B ?
```

If equal:

```text
Valid Token
```

If not:

```text
Invalid Token
```

This was one of the most important JWT concepts learned today.

---

# 9. JWT Is Stateless

Unlike sessions:

```text
Session ID

↓

Server Memory

↓

User Data
```

JWT works differently.

The server stores:

```text
Nothing
```

The client stores:

```text
JWT
```

Every request includes the token.

The server simply verifies it.

This is why JWT authentication is called:

```text
Stateless Authentication
```

---

# 10. JWT Security Model

I learned that:

```text
Header

↓

Readable

--------------------

Payload

↓

Readable

--------------------

Signature

↓

Protection
```

Anyone can:

```text
Read Header

Read Payload

Modify Header

Modify Payload
```

However:

```text
Cannot Generate Valid Signature
```

without the secret key.

This is the entire security model of JWT.

---

# 11. Why Secret Keys Matter

The secret key is the foundation of JWT security.

If the secret key leaks:

```text
Attacker

↓

Creates Fake Payload

↓

Generates Valid Signature

↓

Creates Valid JWT
```

The server would trust the forged token.

Therefore:

```text
SECRET_KEY

↓

Must Remain Secret
```

at all times.

---

# 12. Debugging Learnings

While implementing the project, I discovered several important debugging points.

### Parameter Consistency

If using:

```js
next(...)
```

the controller must receive:

```js
(req, res, next);
```

Otherwise:

```text
next is not defined
```

errors occur.

---

### Object Property Accuracy

If an object contains:

```js
user.id;
user.email;
user.role;
```

then using:

```js
user._id;
user._email;
user._role;
```

returns:

```text
undefined
```

This highlighted the importance of matching property names correctly.

---

# Final Understanding

At the end of Day 4, I can confidently explain:

- Why JWT exists
- JWT structure
- Header, Payload, Signature
- JWT creation
- JWT verification
- Stateless authentication
- Protected routes
- Authorization headers
- Authentication middleware
- Session vs JWT architecture
- JWT security fundamentals

The most important lesson from today was:

```text
Never trust the Payload.

Trust the Payload only after successful Signature Verification.
```
