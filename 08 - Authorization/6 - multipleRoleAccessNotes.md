# Multiple Role Access

## Introduction

Not every protected route should be accessible by only one role.

Many routes need to allow access to multiple roles.

Examples:

```text
Moderator + Admin

User + Moderator + Admin

Admin Only
```

This is called:

```text
Multiple Role Access
```

and is a common authorization pattern in RBAC systems.

---

# The Problem

Suppose we have:

```text
User

Moderator

Admin
```

and a route:

```text
GET /dashboard
```

If only:

```text
Role = Admin
```

is allowed, moderators will be blocked even if they should have access.

---

# The Solution

Instead of checking:

```text
Role = Admin
```

we check:

```text
Allowed Roles

↓

Admin

Moderator
```

If the user's role exists in the allowed roles list, access is granted.

---

# Authorization Flow

```text
Request

↓

Authentication Middleware

↓

req.user

↓

Authorization Middleware

↓

Allowed Roles Check

↓

Access Granted?

↓

YES → Controller

NO → 403 Forbidden
```

---

# Example Routes

## Profile Route

```text
/profile
```

Allowed Roles:

```text
User

Moderator

Admin
```

---

## Dashboard Route

```text
/dashboard
```

Allowed Roles:

```text
Moderator

Admin
```

---

## Admin Route

```text
/admin
```

Allowed Roles:

```text
Admin
```

---

# Example Authorization Check

User:

```text
Role = Moderator
```

Allowed Roles:

```text
Admin

Moderator
```

Check:

```text
Moderator Exists?

↓

YES
```

Result:

```text
Access Granted
```

---

User:

```text
Role = User
```

Allowed Roles:

```text
Admin

Moderator
```

Check:

```text
User Exists?

↓

NO
```

Result:

```text
403 Forbidden
```

---

# Why Multiple Role Access Is Useful

Benefits:

```text
Flexible Authorization

Reusable Middleware

Less Code Duplication

Scalable Permission System
```

Instead of creating:

```text
Admin Middleware

Moderator Middleware

User Middleware
```

for every role combination, one middleware can handle all cases.

---

# Authentication + Authorization Lifecycle

```text
Request

↓

Authentication Middleware

↓

req.user

↓

Authorization Middleware

↓

Allowed Roles Check

↓

Controller

↓

Response
```

---

# Common Examples

## Discord

Delete Messages:

```text
Moderator

Admin
```

---

## GitHub

Manage Repository:

```text
Owner

Maintainer
```

---

## E-Commerce

Manage Products:

```text
Vendor

Admin
```

---

# Common Mistakes

## ❌ Checking Only For Admin

Not every route is admin-only.

---

## ❌ Creating Separate Middleware For Every Role Combination

Creates unnecessary duplication.

---

## ❌ Using 401 Instead Of 403

Authentication succeeded.

Authorization failed.

Use:

```text
403 Forbidden
```

---

# Key Takeaways

- Multiple role access allows several roles to access the same route.
- Authorization checks whether the user's role exists in an allowed roles list.
- Authentication must happen before authorization.
- Multiple role access creates flexible and reusable authorization systems.
- Failed authorization should return 403 Forbidden.

---

# One-Line Summary

Multiple role access is an authorization pattern where a route defines a list of allowed roles and access is granted when the authenticated user's role exists within that list.
