# Request Augmentation

## Introduction

As a request moves through middleware, additional information may be discovered, verified, or computed.

Instead of repeating this work inside controllers, middleware can attach new data directly to the request object.

This process is called:

```text
Request Augmentation
```

Request augmentation allows middleware and controllers to share information throughout the request lifecycle.

---

# What Is Request Augmentation?

Definition:

> Request augmentation is the process of adding custom properties to the request object during the request lifecycle.

Example:

```text
Request

↓

Authentication Middleware

↓

req.user Added

↓

Controller Uses req.user
```

The request object becomes enriched with additional information as it moves through middleware.

---

# Why Request Augmentation Exists

Consider a protected route:

```text
GET /profile
```

Request:

```http
Authorization: Bearer abc123
```

Authentication middleware verifies the JWT and extracts:

```json
{
  "id": 1,
  "email": "john@example.com",
  "role": "user"
}
```

Controllers need this information.

Without request augmentation, every controller would need to:

```text
Read Token

↓

Verify JWT

↓

Decode User

↓

Extract User Data
```

This creates duplicated logic.

---

# The Solution

Authentication middleware performs verification once:

```text
Verify JWT

↓

Decode User

↓

req.user = decodedUser
```

Now every controller can access:

```text
req.user
```

without repeating JWT verification.

---

# Before Request Augmentation

Without augmentation:

```text
Request

↓

Controller

↓

Verify JWT

↓

Decode User

↓

Get User Information

↓

Business Logic
```

Every protected controller repeats the same work.

---

# After Request Augmentation

Middleware:

```text
Verify JWT

↓

req.user = decodedUser
```

Controller:

```text
Use req.user
```

Business logic becomes simpler and cleaner.

---

# How Request Augmentation Works

Initial request:

```text
req
```

Contains:

```text
req.body

req.headers

req.params

req.query
```

These properties are provided by Express.

---

Authentication middleware runs:

```text
Verify JWT

↓

Extract User
```

Adds:

```text
req.user
```

Now the request becomes:

```text
req.body

req.headers

req.params

req.query

req.user
```

The request object has been augmented.

---

# Why Middleware Is The Ideal Place

Middleware executes before controllers.

Flow:

```text
Request

↓

Middleware

↓

Controller
```

Middleware can prepare data that later controllers need.

Example:

```text
Request

↓

Authentication Middleware

↓

Add req.user

↓

Controller
```

The controller receives an already prepared request.

---

# JWT Authentication Example

Request:

```http
GET /profile
Authorization: Bearer abc123
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Read Token

↓

Verify JWT

↓

Decode Payload

↓

req.user = decodedUser

↓

next()

↓

Controller

↓

Response
```

The controller never needs to verify the JWT again.

---

# Example User Payload

Decoded JWT:

```json
{
  "id": 1,
  "email": "john@example.com",
  "role": "user"
}
```

Middleware attaches:

```text
req.user
```

Controller can directly access:

```text
req.user.id

req.user.email

req.user.role
```

---

# Request Object Is Just An Object

Conceptually:

```js
req = {
  body: {},
  headers: {},
  params: {},
};
```

Middleware can add properties:

```js
req.user = user;
```

just like:

```js
obj.user = user;
```

There is no special magic involved.

---

# Other Examples Of Request Augmentation

## Authentication Middleware

Adds:

```text
req.user
```

---

## Language Middleware

Adds:

```text
req.language
```

---

## Validation Middleware

Adds:

```text
req.validatedBody
```

---

## Tenant Middleware

Adds:

```text
req.tenant
```

---

## Permission Middleware

Adds:

```text
req.permissions
```

Request augmentation is widely used throughout Express applications.

---

# Middleware Chain Example

Flow:

```text
Request

↓

Authentication Middleware

↓

Role Middleware

↓

Controller
```

Authentication middleware adds:

```text
req.user
```

Role middleware adds:

```text
req.permissions
```

Controller receives:

```text
req.user

req.permissions
```

already prepared.

---

# Why Not Use Global Variables?

Bad approach:

```text
global.user
```

Problem:

```text
1000 Requests

↓

Which User?
```

Multiple requests would overwrite each other's data.

---

Request augmentation keeps information attached to:

```text
One Specific Request
```

making it safe and isolated.

---

# Request Lifecycle View

Request begins:

```text
req
```

---

Authentication middleware:

```text
req.user
```

added.

---

Validation middleware:

```text
req.validatedBody
```

added.

---

Controller:

```text
Uses Data
```

---

Response sent:

```text
Request Ends
```

---

Express destroys:

```text
req

res
```

All augmented properties disappear.

Nothing persists beyond the current request.

---

# Temporary Nature Of Request Augmentation

Request augmentation is:

```text
Temporary

Per Request
```

It is NOT:

```text
Database Storage

Persistent Storage

Application State
```

The data exists only while the request is being processed.

---

# Benefits Of Request Augmentation

```text
Eliminates Duplicate Logic

Improves Code Reusability

Keeps Controllers Clean

Shares Data Between Middleware

Improves Maintainability
```

---

# Common Mistakes

## ❌ Thinking req.user Comes From Express

False.

Express does not create:

```text
req.user
```

Middleware creates it.

---

## ❌ Using req.user Without Authentication Middleware

Result:

```text
req.user

↓

undefined
```

---

## ❌ Re-Verifying JWT In Controllers

Unnecessary.

Authentication middleware already verified the token.

---

## ❌ Confusing Request Augmentation With Database Storage

Request augmentation:

```text
Temporary
```

Database:

```text
Persistent
```

These are completely different concepts.

---

# Key Takeaways

- Request augmentation means adding custom properties to the request object.
- Middleware commonly performs request augmentation.
- `req.user` is the most common example.
- Authentication middleware usually creates `req.user`.
- Controllers can use augmented data without repeating work.
- Request augmentation improves code reuse and maintainability.
- Augmented properties exist only for the current request.
- Request augmentation is temporary and not persistent storage.
- Middleware and controllers communicate through the request object.

---

# One-Line Summary

Request augmentation is the practice of adding custom properties such as `req.user` to the request object inside middleware so that later middleware and controllers can access processed information without repeating work.
