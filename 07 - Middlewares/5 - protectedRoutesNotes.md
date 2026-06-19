# Protected Routes

## Introduction

Most applications contain resources that should not be accessible to everyone.

Examples:

```text
User Profile

Orders

Settings

Notifications

Dashboard

Bank Account Information
```

Allowing anyone to access these resources would create major security risks.

Protected routes solve this problem by ensuring that only authenticated users can access specific endpoints.

---

# What Is A Protected Route?

Definition:

> A protected route is a route that requires successful authentication before access is granted.

Before a request reaches the controller, the user's identity must be verified.

Basic flow:

```text
Request

↓

Authentication Middleware

↓

Authenticated?

↓

YES → Controller

NO → Reject
```

Protected routes rely on authentication middleware to enforce access control.

---

# Why Protected Routes Exist

Without protection:

```text
Anyone

↓

Access Sensitive Data
```

Examples:

```text
View Profile

View Orders

Modify Settings

Delete Account
```

This creates serious security vulnerabilities.

---

Protected routes ensure:

```text
Only Verified Users

↓

Access Protected Resources
```

---

# Public Routes vs Protected Routes

## Public Routes

Public routes are accessible to everyone.

Examples:

```text
POST /login

POST /signup

POST /forgot-password

GET /home
```

Flow:

```text
Request

↓

Controller

↓

Response
```

No authentication is required.

---

## Protected Routes

Protected routes require authentication.

Examples:

```text
GET /profile

GET /settings

GET /orders

PATCH /account

DELETE /account
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Controller

↓

Response
```

Access is granted only after successful authentication.

---

# How Protected Routes Work

Consider:

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

Verify JWT

↓

Authenticated?

↓

YES

↓

Controller

↓

Response
```

The controller only executes after authentication succeeds.

---

# Authentication Middleware As A Gatekeeper

Authentication middleware acts as a security checkpoint.

Mental model:

```text
Request

↓

Security Check

↓

Identity Verified?

↓

YES → Continue

NO → Reject
```

Every protected route places this checkpoint before the controller.

---

# Valid Authentication Flow

Request:

```http
GET /profile
Authorization: Bearer validToken
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Token Exists

↓

Token Valid

↓

req.user Created

↓

next()

↓

Controller

↓

Response
```

Access is granted.

---

# Missing Token Flow

Request:

```http
GET /profile
```

No authentication token is provided.

Flow:

```text
Request

↓

Authentication Middleware

↓

Token Missing

↓

401 Unauthorized

↓

Request Ends
```

The controller never executes.

---

# Invalid Token Flow

Request:

```http
GET /profile
Authorization: Bearer fakeToken
```

Flow:

```text
Request

↓

Authentication Middleware

↓

JWT Verification Failed

↓

401 Unauthorized

↓

Request Ends
```

Access is denied.

---

# Expired Token Flow

Request:

```http
GET /profile
Authorization: Bearer expiredToken
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Token Expired

↓

401 Unauthorized

↓

Request Ends
```

The user must obtain a new access token or log in again.

---

# Why Protected Routes Use Middleware

Without middleware:

```text
Profile Controller

↓

Verify JWT

↓

Business Logic
```

---

```text
Settings Controller

↓

Verify JWT

↓

Business Logic
```

---

```text
Orders Controller

↓

Verify JWT

↓

Business Logic
```

Authentication logic becomes duplicated.

---

With middleware:

```text
Authentication Middleware

↓

Any Controller
```

Authentication is centralized and reusable.

---

# What Makes A Route Protected?

A route becomes protected because authentication middleware is applied before the controller.

Example:

Without middleware:

```text
GET /profile

↓

Public Route
```

---

With authentication middleware:

```text
GET /profile

↓

Protected Route
```

The route itself does not create protection.

The middleware does.

---

# Protected Route Lifecycle

Complete flow:

```text
Browser

↓

GET /profile

↓

Express

↓

Route Match

↓

Authentication Middleware

↓

Verify JWT

↓

req.user

↓

next()

↓

Controller

↓

Response

↓

Browser
```

This is the standard architecture used in JWT-based authentication systems.

---

# Authentication And Protected Routes

These concepts are related but different.

---

## Authentication Middleware

Purpose:

```text
Verify Identity
```

Question:

```text
Who Are You?
```

---

## Protected Route

Purpose:

```text
Restrict Access
```

Uses:

```text
Authentication Middleware
```

Relationship:

```text
Authentication Middleware

↓

Creates

↓

Protected Route
```

---

# Real-World Examples

## Banking Application

Protected:

```text
GET /balance

POST /transfer

GET /transactions
```

Reason:

```text
Financial Data
```

---

## E-Commerce Application

Protected:

```text
GET /orders

PATCH /profile

GET /wishlist
```

Reason:

```text
Personal User Information
```

---

## Social Media Application

Protected:

```text
POST /tweet

DELETE /tweet

GET /notifications
```

Reason:

```text
User-Specific Actions
```

---

# Protected Route Mental Model

Think of a private club.

Public area:

```text
Parking

Entrance
```

Anyone can access.

---

Restricted area:

```text
VIP Lounge
```

Requires:

```text
Membership Verification
```

Flow:

```text
Visitor

↓

Security Check

↓

Verified?

↓

YES → Enter

NO → Denied
```

Authentication middleware acts as the security checkpoint.

---

# Common Mistakes

## ❌ JWT Automatically Protects Routes

False.

JWT only proves identity.

Middleware enforces protection.

---

## ❌ Login Route Should Be Protected

False.

Routes like:

```text
/login

/signup
```

must remain public.

Otherwise users cannot authenticate.

---

## ❌ Authentication Should Be Checked Inside Every Controller

False.

Authentication should be handled by middleware.

---

## ❌ Protected Means Admin Only

False.

Protected simply means:

```text
Authenticated User Required
```

Admin permissions are handled through authorization.

---

# Key Takeaways

- Protected routes require successful authentication.
- Authentication middleware creates route protection.
- Public routes are accessible without authentication.
- Protected routes restrict access to authenticated users.
- Missing tokens result in unauthorized responses.
- Invalid or expired tokens result in unauthorized responses.
- Controllers should not perform repeated authentication checks.
- Middleware centralizes authentication logic.
- Protected routes help secure sensitive application resources.

---

# One-Line Summary

A protected route is an endpoint guarded by authentication middleware that allows only authenticated users to access resources while blocking requests with missing, invalid, or expired credentials before they reach the controller.
