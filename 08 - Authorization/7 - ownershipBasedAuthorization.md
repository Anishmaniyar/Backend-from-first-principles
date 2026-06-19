# Ownership-Based Authorization

## Introduction

Role-Based Access Control (RBAC) is powerful, but it cannot solve every authorization problem.

Sometimes permissions depend not on a user's role, but on whether they own the resource they are trying to access.

This introduces:

```text
Ownership-Based Authorization
```

Ownership-based authorization verifies that the authenticated user owns the resource being accessed before granting permission.

---

# Why RBAC Is Not Always Enough

Consider:

```text
GET /profile/:id
```

Example:

```text
GET /profile/10
```

Question:

```text
Can Any User View Any Profile?
```

Not necessarily.

---

Suppose:

```json
{
  "id": 5,
  "role": "user"
}
```

is the authenticated user.

Request:

```text
GET /profile/10
```

RBAC only tells us:

```text
Role = User
```

It does not tell us:

```text
Does User 5 Own Profile 10?
```

This is a different authorization problem.

---

# What Is Ownership-Based Authorization?

Definition:

> Ownership-based authorization determines access by checking whether the authenticated user owns the resource being accessed.

Instead of asking:

```text
What Is Your Role?
```

it asks:

```text
Do You Own This Resource?
```

---

# Ownership Authorization Flow

```text
Request

↓

Authentication

↓

req.user

↓

Ownership Check

↓

Owns Resource?

↓

YES → Controller

NO → 403 Forbidden
```

---

# Example: Allowed Access

Authenticated user:

```json
{
  "id": 5,
  "role": "user"
}
```

Request:

```text
GET /profile/5
```

Check:

```text
Logged-In User ID

↓

5

----------------

Requested Profile ID

↓

5
```

Match:

```text
YES
```

Result:

```text
Access Granted
```

---

# Example: Denied Access

Authenticated user:

```json
{
  "id": 5,
  "role": "user"
}
```

Request:

```text
GET /profile/10
```

Check:

```text
Logged-In User ID

↓

5

----------------

Requested Profile ID

↓

10
```

Match:

```text
NO
```

Result:

```text
403 Forbidden
```

---

# What Is Being Compared?

Most ownership checks compare:

```text
req.user.id
```

with:

```text
Resource Owner ID
```

Example:

```text
Authenticated User ID

↓

5

----------------

Profile Owner ID

↓

5
```

If they match:

```text
Allow Access
```

Otherwise:

```text
Deny Access
```

---

# Profile Example

Route:

```text
GET /profile/:id
```

Ownership rule:

```text
User Can Only View Their Own Profile
```

Flow:

```text
Request

↓

Authentication

↓

req.user.id

↓

Compare With req.params.id

↓

Match?

↓

YES → Controller

NO → 403 Forbidden
```

---

# Edit Profile Example

Route:

```text
PATCH /profile/:id
```

Rule:

```text
Users Can Edit Only Their Own Profile
```

Example:

```text
User ID = 5

↓

PATCH /profile/5

↓

Allowed
```

---

Example:

```text
User ID = 5

↓

PATCH /profile/20

↓

Forbidden
```

---

# Blog Post Example

Route:

```text
DELETE /posts/:id
```

Question:

```text
Can A User Delete Any Post?
```

No.

Usually:

```text
Only The Post Owner
```

can delete it.

---

Post:

```json
{
  "id": 100,
  "authorId": 5
}
```

Authenticated user:

```json
{
  "id": 5
}
```

Check:

```text
authorId

↓

5

----------------

userId

↓

5
```

Match:

```text
YES
```

Delete allowed.

---

Different user:

```json
{
  "id": 10
}
```

Check:

```text
authorId

↓

5

----------------

userId

↓

10
```

Match:

```text
NO
```

Result:

```text
403 Forbidden
```

---

# Ownership Middleware

Ownership checks are commonly moved into middleware.

Flow:

```text
Request

↓

Authentication Middleware

↓

Ownership Middleware

↓

Controller
```

Benefits:

```text
Reusable

Cleaner Controllers

Centralized Authorization Logic
```

---

# Combining Roles And Ownership

Real applications often combine both authorization models.

Example:

```text
Delete Post
```

Rule:

```text
Owner

OR

Admin
```

---

Flow:

```text
Is Admin?

↓

YES → Allow

----------------

NO

↓

Is Owner?

↓

YES → Allow

----------------

NO

↓

403 Forbidden
```

---

# Why Combine Both?

Ownership alone may not be enough.

Example:

```text
User Can Edit Own Profile
```

But:

```text
Admin Can Edit Any Profile
```

This requires:

```text
RBAC

+

Ownership Authorization
```

working together.

---

# Real-World Examples

## Instagram

```text
Edit Profile

↓

Owner Only
```

---

## GitHub

```text
Delete Repository

↓

Owner Or Admin
```

---

## Google Drive

```text
Delete File

↓

Owner Or Shared Permission
```

---

## Banking

```text
View Account

↓

Account Owner
```

---

# RBAC vs Ownership

## RBAC

Question:

```text
What Role Are You?
```

Examples:

```text
User

Moderator

Admin
```

---

Decision Based On:

```text
Role
```

---

## Ownership Authorization

Question:

```text
Do You Own This Resource?
```

Example:

```text
User ID = 5

↓

Profile ID = 5

↓

Allowed
```

---

Decision Based On:

```text
Resource Ownership
```

---

# Authorization Lifecycle

Modern applications often use:

```text
Request

↓

Authentication

↓

RBAC Check

↓

Ownership Check

↓

Controller

↓

Response
```

Multiple authorization layers improve security.

---

# Advantages Of Ownership Authorization

```text
Protects User Resources

Supports Fine-Grained Access Control

Works Alongside RBAC

Common In Real Applications

Improves Security
```

---

# Common Mistakes

## ❌ Assuming RBAC Solves Everything

Roles cannot determine resource ownership.

---

## ❌ Allowing Users To Access Any Resource

Can expose private user data.

---

## ❌ Putting Ownership Logic In Every Controller

Creates duplicated code.

Use middleware when possible.

---

## ❌ Forgetting Admin Overrides

Many systems allow:

```text
Owner

OR

Admin
```

rather than owner only.

---

# Key Takeaways

- Ownership-based authorization checks resource ownership.
- RBAC and ownership solve different problems.
- Ownership compares authenticated user IDs with resource owner IDs.
- Users should often access only resources they own.
- Ownership authorization is commonly implemented using middleware.
- RBAC and ownership are frequently combined.
- Failed ownership checks return 403 Forbidden.
- Real-world applications rely heavily on ownership-based authorization.

---

# One-Line Summary

Ownership-based authorization grants access only when the authenticated user owns the resource being accessed, providing fine-grained security that role-based authorization alone cannot achieve.
