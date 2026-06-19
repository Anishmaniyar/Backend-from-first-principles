# Admin Routes

## Introduction

Authentication alone is not enough to secure an application.

Knowing who a user is does not automatically mean they should have access to every resource.

Some routes must be restricted to specific roles.

Example:

```text
/admin
```

should only be accessible by:

```text
Admin
```

users.

This is where authorization middleware becomes important.

---

# What Is An Admin Route?

Definition:

> An admin route is a protected route that can only be accessed by users with the Admin role.

Example:

```text
GET /admin
```

Requirement:

```text
Role = Admin
```

Any non-admin user should be denied access.

---

# Admin Route Flow

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

Admin?

↓

YES → Controller

NO → 403 Forbidden
```

The controller executes only if both authentication and authorization succeed.

---

# Step 1 — Authentication

Authentication verifies identity.

Question:

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

After verification:

```text
req.user
```

is created.

Example:

```json
{
  "id": 1,
  "email": "john@example.com",
  "role": "user"
}
```

Authentication does not decide permissions.

It only identifies the user.

---

# Step 2 — Authorization

Authorization verifies permissions.

Question:

```text
What Are You Allowed To Do?
```

Example:

```text
Role = User

↓

Trying To Access /admin

↓

Allowed?
```

Result:

```text
NO
```

Response:

```text
403 Forbidden
```

---

# Why Authentication Comes First

Authorization requires identity.

Before checking:

```text
Can User Access /admin?
```

the server must know:

```text
Who Is The User?
```

Correct order:

```text
Authentication

↓

Authorization
```

Incorrect order:

```text
Authorization

↓

Authentication
```

The user's permissions cannot be checked before identifying them.

---

# Example User Access

User:

```json
{
  "id": 1,
  "role": "user"
}
```

Request:

```text
GET /admin
```

Authorization:

```text
Role = User

↓

Admin Route

↓

Denied
```

Response:

```text
403 Forbidden
```

Controller never runs.

---

# Example Admin Access

User:

```json
{
  "id": 2,
  "role": "admin"
}
```

Request:

```text
GET /admin
```

Authorization:

```text
Role = Admin

↓

Admin Route

↓

Allowed
```

Controller executes successfully.

---

# Authorization Middleware

Authorization middleware checks:

```text
req.user.role
```

and determines whether the user is allowed to access the route.

Flow:

```text
req.user

↓

Role

↓

Permission Check

↓

Allowed?

↓

YES → next()

NO → 403
```

---

# Route Structure

Admin route:

```text
/admin
```

Protected by:

```text
Authentication Middleware

↓

Authorization Middleware

↓

Controller
```

Full flow:

```text
GET /admin

↓

Authentication

↓

Authorization

↓

Controller
```

---

# Why Separate Authentication And Authorization?

Many beginners combine both into a single middleware.

Example:

```text
Verify JWT

↓

Check Role

↓

Check Permissions

↓

Everything Together
```

This becomes difficult to maintain.

---

Better approach:

### Authentication Middleware

Responsibility:

```text
Verify Identity
```

Question:

```text
Who Are You?
```

---

### Authorization Middleware

Responsibility:

```text
Verify Permissions
```

Question:

```text
What Are You Allowed To Do?
```

Each middleware performs one responsibility.

This follows:

```text
Separation Of Concerns
```

---

# Reusable Authorization

Authorization middleware can be reused across many routes.

Examples:

```text
/admin

↓

Admin Only

----------------

/dashboard

↓

Moderator + Admin

----------------

/profile

↓

Any Authenticated User
```

Different routes can enforce different permissions.

---

# Multiple Role Access

Not every route is admin-only.

Example:

```text
/dashboard
```

Allowed roles:

```text
Moderator

Admin
```

Flow:

```text
Role

↓

Allowed Roles

↓

Access Decision
```

This makes authorization flexible.

---

# 401 vs 403

A critical distinction.

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

Flow:

```text
Request

↓

Authentication Failed

↓

401 Unauthorized
```

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
JWT Valid

↓

Role = User

↓

Trying To Access /admin

↓

403 Forbidden
```

Authentication succeeded.

Authorization failed.

---

# Visual Comparison

### 401 Unauthorized

```text
Request

↓

Authentication

↓

Failed

↓

401
```

---

### 403 Forbidden

```text
Request

↓

Authentication

↓

Success

↓

Authorization

↓

Failed

↓

403
```

---

# Real Application Examples

## Social Media

Admin Route:

```text
Delete Users

Manage Reports

Manage Moderators
```

Only admins can access.

---

## E-Commerce

Admin Route:

```text
Manage Products

Manage Orders

Manage Users
```

Restricted to administrators.

---

## Banking

Admin Route:

```text
Manage Accounts

Manage Employees

System Administration
```

Requires elevated permissions.

---

# Layered Security

Admin routes use multiple security layers.

Flow:

```text
Request

↓

Authentication

↓

Identity Verified

↓

Authorization

↓

Permission Verified

↓

Controller
```

Every layer must succeed.

---

# Common Mistakes

## ❌ Authentication Means Full Access

False.

Authentication only identifies the user.

Authorization still determines permissions.

---

## ❌ Using 401 Instead Of 403

Wrong.

Use:

```text
401
```

when identity is unknown.

Use:

```text
403
```

when identity is known but access is denied.

---

## ❌ Skipping Authorization On Sensitive Routes

Dangerous.

Admin routes must always verify permissions.

---

## ❌ Combining Authentication And Authorization Logic

Makes middleware harder to maintain and reuse.

Keep responsibilities separate.

---

# Key Takeaways

- Admin routes require authorization.
- Authentication verifies identity.
- Authorization verifies permissions.
- Authentication always happens before authorization.
- Admin routes typically check `req.user.role`.
- Admin users can access admin routes.
- Non-admin users receive `403 Forbidden`.
- `401` means identity is unknown.
- `403` means identity is known but permission is denied.
- Authorization middleware creates reusable access control.

---

# One-Line Summary

Admin routes are protected routes that require successful authentication and authorization, ensuring that only users with the appropriate role can access sensitive resources while all other authenticated users receive a `403 Forbidden` response.
