# Authorization Middleware

## Introduction

Authentication identifies a user.

Authorization determines what that user is allowed to do.

Although these concepts are closely related, they solve different problems and should be implemented separately.

Authorization middleware is responsible for checking whether an authenticated user has permission to access a specific resource or perform a specific action.

---

# Authentication vs Authorization

Authentication answers:

```text
Who Are You?
```

Example:

```text
JWT

↓

Verified

↓

John
```

Result:

```text
Identity Known
```

---

Authorization answers:

```text
What Can John Do?
```

Example:

```text
Role = User

↓

Can View Profile

↓

Cannot Access Admin Panel
```

Result:

```text
Permission Decision
```

---

# Why Authorization Middleware Exists

After authentication succeeds, the server knows:

```text
Who The User Is
```

But it still does not know:

```text
What The User Is Allowed To Do
```

Authorization middleware performs this second security check.

---

# Authorization Middleware Definition

Definition:

> Authorization middleware is a middleware that verifies whether an authenticated user has sufficient permissions to access a route or perform an action.

Flow:

```text
Request

↓

Authentication Middleware

↓

req.user

↓

Authorization Middleware

↓

Permission Check

↓

Controller
```

---

# Request Lifecycle

Complete authorization flow:

```text
Request

↓

Authentication Middleware

↓

Identity Verified

↓

req.user Created

↓

Authorization Middleware

↓

Role Check

↓

Allowed?

↓

YES → Controller

NO → 403 Forbidden
```

Authentication must always happen before authorization.

---

# Why Authentication Comes First

Authorization requires identity.

Example:

```text
Can User Access /admin?
```

Before answering:

```text
Who Is The User?
```

must be known.

---

Correct order:

```text
Authentication

↓

Authorization
```

---

Incorrect order:

```text
Authorization

↓

Authentication
```

Impossible because permissions cannot be checked without identifying the user.

---

# What Authorization Middleware Uses

Authentication middleware typically creates:

```text
req.user
```

Example:

```json
{
  "id": 1,
  "name": "John",
  "role": "user"
}
```

Authorization middleware uses information from:

```text
req.user
```

to determine access.

---

# Role-Based Authorization

Authorization middleware often checks:

```text
req.user.role
```

Example roles:

```text
User

Moderator

Admin
```

---

Example:

```text
Role = User

↓

Access /profile

↓

Allowed
```

---

Example:

```text
Role = User

↓

Access /admin

↓

Forbidden
```

---

# Example Route Flow

## Profile Route

Route:

```text
GET /profile
```

Requirement:

```text
Authenticated User
```

Flow:

```text
Authentication

↓

Controller
```

No role check required.

---

## Admin Route

Route:

```text
GET /admin
```

Requirement:

```text
Admin Role
```

Flow:

```text
Authentication

↓

Authorization

↓

Controller
```

---

## Moderator Route

Route:

```text
GET /moderator
```

Requirement:

```text
Moderator

or

Admin
```

Flow:

```text
Authentication

↓

Authorization

↓

Controller
```

---

# Why Separate Authentication And Authorization?

Many beginners try to combine them into a single middleware.

Example:

```text
JWT Verification

Role Check

Permission Check

Everything Together
```

This creates large and difficult-to-maintain middleware.

---

Better architecture:

```text
Authentication Middleware

↓

Identity Verification

----------------

Authorization Middleware

↓

Permission Verification
```

Each middleware has one responsibility.

---

# Separation Of Concerns

Authentication middleware:

```text
Verify Identity
```

Question:

```text
Who Are You?
```

---

Authorization middleware:

```text
Verify Permissions
```

Question:

```text
What Are You Allowed To Do?
```

Keeping these responsibilities separate improves maintainability and reusability.

---

# Layered Security

Think of authorization as a second security layer.

Layer 1:

```text
Authentication

↓

Identity Verification
```

---

Layer 2:

```text
Authorization

↓

Permission Verification
```

Both checks must succeed before accessing protected resources.

---

# Airport Analogy

First checkpoint:

```text
Passport Check

↓

Who Are You?
```

Equivalent:

```text
Authentication
```

---

Second checkpoint:

```text
Boarding Pass Check

↓

Can You Board This Flight?
```

Equivalent:

```text
Authorization
```

You must pass both checks.

---

# 401 vs 403

A very important distinction.

---

## 401 Unauthorized

Meaning:

```text
Identity Unknown
```

Examples:

```text
Missing JWT

Invalid JWT

Expired JWT
```

Authentication failed.

---

## 403 Forbidden

Meaning:

```text
Identity Known

↓

Permission Denied
```

Example:

```text
John

↓

Role = User

↓

Trying To Access /admin
```

Authentication succeeded.

Authorization failed.

---

# Example Authorization Flow

User:

```text
John

Role = User
```

Request:

```text
GET /admin
```

Flow:

```text
Request

↓

Authentication Middleware

↓

JWT Verified

↓

req.user

↓

Authorization Middleware

↓

Role Check

↓

Role Not Allowed

↓

403 Forbidden
```

Controller never executes.

---

# Real Backend Architecture

Typical request lifecycle:

```text
Request

↓

Logger Middleware

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Controller

↓

Response
```

Each middleware performs one responsibility.

---

# Benefits Of Authorization Middleware

```text
Reusable

Centralized Permission Checks

Cleaner Controllers

Better Security

Follows Separation Of Concerns

Easy To Maintain
```

---

# Common Mistakes

## ❌ Authentication And Authorization Are The Same

False.

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Are You Allowed To Do?
```

---

## ❌ Authorization Before Authentication

Impossible.

Identity must be known first.

---

## ❌ Using 401 For Permission Errors

Wrong.

Use:

```text
403 Forbidden
```

when identity is known but access is denied.

---

## ❌ Combining All Security Logic Into One Middleware

Creates difficult-to-maintain code.

Separate responsibilities instead.

---

# Key Takeaways

- Authentication verifies identity.
- Authorization verifies permissions.
- Authentication creates `req.user`.
- Authorization uses `req.user`.
- Authentication always happens before authorization.
- Authorization middleware often checks roles.
- 401 means identity is unknown.
- 403 means identity is known but access is denied.
- Layered security improves application design.
- Authorization middleware keeps controllers clean.

---

# One-Line Summary

Authorization middleware is a security layer that runs after authentication, uses information from `req.user`, verifies roles and permissions, and determines whether an authenticated user is allowed to access a resource or perform an action.
