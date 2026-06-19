# Authentication vs Authorization

## Introduction

Authentication and Authorization are two of the most important security concepts in backend development.

Although they are closely related, they solve completely different problems.

A request typically passes through both stages before accessing protected resources.

Flow:

```text
Request

↓

Authentication

↓

Identity Known

↓

Authorization

↓

Permission Check

↓

Controller

↓

Response
```

Understanding the difference between these concepts is essential for designing secure applications.

---

# What Is Authentication?

Definition:

> Authentication is the process of verifying a user's identity.

Authentication answers the question:

```text
Who Are You?
```

The server verifies that the user is genuinely who they claim to be.

---

# Authentication Example

User sends:

```text
JWT
```

Flow:

```text
JWT

↓

Verify Signature

↓

Verify Expiration

↓

Verify Authenticity

↓

Identity Confirmed
```

Result:

```text
John
```

The server now knows:

```text
This Request Belongs To John
```

---

# Authentication Goal

Authentication's only responsibility is:

```text
Identity Verification
```

It does NOT determine what the user is allowed to do.

It only determines:

```text
Who The User Is
```

---

# Common Authentication Methods

## JWT Authentication

```text
JWT

↓

Verify

↓

Identify User
```

---

## Session Authentication

```text
Session ID

↓

Lookup Session

↓

Identify User
```

---

## API Key Authentication

```text
API Key

↓

Verify Key

↓

Identify Client
```

---

# Authentication Outcome

Successful authentication provides:

```text
User ID

Email

Role

Other User Information
```

Usually attached to:

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

---

# What Is Authorization?

Definition:

> Authorization is the process of determining what an authenticated user is allowed to do.

Authorization answers the question:

```text
What Are You Allowed To Do?
```

The server already knows who the user is.

Now it decides:

```text
What Resources

or

Actions

Can Be Accessed
```

---

# Authorization Example

Authenticated user:

```text
John
```

Role:

```text
User
```

Permissions:

```text
View Profile

Edit Profile
```

Not allowed:

```text
Delete Users

Access Admin Panel
```

---

# Authorization Goal

Authorization's responsibility is:

```text
Permission Verification
```

It determines:

```text
Can User Access This Resource?
```

---

# Authentication vs Authorization

## Authentication

Question:

```text
Who Are You?
```

Purpose:

```text
Identity Verification
```

Example:

```text
JWT Verified

↓

John
```

---

## Authorization

Question:

```text
What Can You Do?
```

Purpose:

```text
Permission Verification
```

Example:

```text
Role = User

↓

View Profile

↓

Cannot Delete Users
```

---

# Real Request Flow

Request:

```text
GET /admin
```

---

Step 1: Authentication

```text
JWT

↓

Verify

↓

John Identified
```

---

Step 2: Authorization

```text
John

↓

Role = User

↓

Admin Route Requested

↓

Access Denied
```

---

Response:

```text
403 Forbidden
```

---

# Why Authentication Comes First

Authorization requires identity.

Example:

```text
Can This User Access /admin?
```

Before answering:

```text
Who Is This User?
```

must be known.

---

Incorrect Flow:

```text
Authorization

↓

Authentication
```

Impossible.

The server cannot check permissions without first identifying the user.

---

Correct Flow:

```text
Authentication

↓

Identity Known

↓

Authorization

↓

Permission Check
```

---

# Real-World Example

## Social Media Application

Authentication:

```text
JWT Verified

↓

John Logged In
```

---

Authorization:

```text
Can John Delete This Post?
```

Result:

```text
YES

or

NO
```

---

## Banking Application

Authentication:

```text
Identify Customer
```

---

Authorization:

```text
Can Customer Transfer Money?

Can Customer Access This Account?
```

---

# Why Both Are Needed

Authentication without authorization:

```text
Everyone Logged In

↓

Can Access Everything
```

Dangerous.

---

Authorization without authentication:

```text
Permissions Checked

↓

No User Identity
```

Impossible.

---

Applications require both:

```text
Authentication

+

Authorization
```

for secure access control.

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
What Can You Do?
```

---

## ❌ Logged In Means Access To Everything

False.

Authentication does not automatically grant permissions.

Authorization still decides access.

---

## ❌ Authorization Can Happen Before Authentication

False.

The server must know the user's identity before checking permissions.

---

## ❌ JWT Automatically Handles Authorization

False.

JWT helps with authentication.

Authorization logic must still be implemented separately.

---

# Authentication + Authorization Lifecycle

```text
Request

↓

Authentication Middleware

↓

JWT Verified

↓

req.user Created

↓

Authorization Middleware

↓

Permission Check

↓

Controller

↓

Response
```

This is the standard architecture used in modern backend applications.

---

# Key Takeaways

- Authentication verifies identity.
- Authorization verifies permissions.
- Authentication answers "Who are you?"
- Authorization answers "What are you allowed to do?"
- Authentication always happens before authorization.
- JWTs are commonly used for authentication.
- Roles and permissions are commonly used for authorization.
- A logged-in user does not automatically have access to all resources.
- Secure applications require both authentication and authorization.

---

# One-Line Summary

Authentication determines who a user is, while authorization determines what that authenticated user is allowed to do within the application.
