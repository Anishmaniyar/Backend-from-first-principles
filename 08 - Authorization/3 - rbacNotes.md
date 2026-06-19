# Role-Based Access Control (RBAC)

## Introduction

As applications grow, managing permissions individually for every user becomes difficult and inefficient.

Instead of assigning permissions directly to users, most applications use:

```text
RBAC

↓

Role Based Access Control
```

RBAC simplifies authorization by assigning users to roles and assigning permissions to those roles.

---

# What Is RBAC?

Definition:

> Role-Based Access Control (RBAC) is an authorization model where users are assigned roles, roles contain permissions, and access decisions are made based on those roles.

Flow:

```text
User

↓

Role

↓

Permissions

↓

Access Decision
```

RBAC is one of the most widely used authorization systems in modern applications.

---

# Why RBAC Exists

Imagine an application with:

```text
10,000 Users
```

Without RBAC:

```text
John

↓

Permission A

Permission B

Permission C

----------------

Sarah

↓

Permission A

Permission B

Permission C

----------------

Mike

↓

Permission A

Permission B

Permission C
```

The same permissions are repeated for thousands of users.

This becomes difficult to maintain.

---

# RBAC Solution

Instead of assigning permissions directly:

```text
User

↓

Permissions
```

RBAC introduces a middle layer:

```text
User

↓

Role

↓

Permissions
```

Permissions are defined once and shared by all users with that role.

---

# RBAC Structure

Core components:

```text
Users

Roles

Permissions
```

Relationship:

```text
User

↓

Role

↓

Permissions
```

Users inherit permissions through their assigned role.

---

# Example Roles

## User

Permissions:

```text
View Profile

Edit Profile

Create Posts

Comment

Like Posts
```

---

## Moderator

Permissions:

```text
View Profile

Delete Comments

Review Reports

Ban Users
```

---

## Admin

Permissions:

```text
Create User

Delete User

Manage Users

Access Dashboard

Manage System
```

---

# Example RBAC Flow

User:

```text
Mike

↓

Role = Admin
```

Role permissions:

```text
Delete User

Create User

View Dashboard
```

Request:

```text
DELETE /users/5
```

Authorization check:

```text
Role = Admin

↓

Has Delete User Permission?

↓

YES
```

Access granted.

---

# Another Example

User:

```text
John

↓

Role = User
```

Request:

```text
DELETE /users/5
```

Authorization check:

```text
Role = User

↓

Has Delete User Permission?

↓

NO
```

Result:

```text
403 Forbidden
```

Access denied.

---

# How RBAC Works

Step 1:

```text
User Logs In
```

---

Step 2:

```text
Authentication

↓

Identity Verified
```

---

Step 3:

```text
User Role Retrieved
```

Example:

```text
Role = Moderator
```

---

Step 4:

```text
Permission Check
```

Example:

```text
Can Moderator Delete Comments?
```

---

Step 5:

```text
YES

↓

Controller
```

or

```text
NO

↓

403 Forbidden
```

---

# Authentication + RBAC

Authentication:

```text
Who Are You?
```

Example:

```text
John
```

---

RBAC Authorization:

```text
What Can John Do?
```

Example:

```text
Role = Moderator

↓

Can Delete Comments
```

---

Complete Flow:

```text
Request

↓

Authentication

↓

req.user

↓

Role Retrieved

↓

Permission Check

↓

Controller

↓

Response
```

---

# Why RBAC Is Popular

RBAC scales well.

Without RBAC:

```text
1,000,000 Users

↓

Manage Permissions Individually
```

Very difficult.

---

With RBAC:

```text
1,000,000 Users

↓

User

Moderator

Admin
```

Manage a small set of roles instead of millions of permission assignments.

---

# Updating Permissions

Suppose moderators should now be able to:

```text
Suspend Users
```

Without RBAC:

```text
Update Every Moderator Individually
```

Huge effort.

---

With RBAC:

```text
Update Moderator Role Once
```

All moderators automatically receive the new permission.

---

# Database Perspective

Typical user record:

```text
id

name

role
```

Example:

```text
1 | John  | user

2 | Sarah | moderator

3 | Mike  | admin
```

Authorization middleware later checks:

```text
req.user.role
```

to determine access.

---

# Real-World Examples

## GitHub

Roles:

```text
Owner

Collaborator

Viewer
```

Each role has different permissions.

---

## Discord

Roles:

```text
Member

Moderator

Administrator
```

Each role has different permissions.

---

## E-Commerce

Roles:

```text
Customer

Vendor

Admin
```

Each role has different permissions.

---

## Banking

Roles:

```text
Customer

Employee

Manager

Admin
```

Each role has different permissions.

---

# Advantages Of RBAC

```text
Easy To Manage

Highly Scalable

Reduces Duplication

Centralized Permission Management

Simple Authorization Logic
```

---

# Limitations Of RBAC

Role-based access is not always enough.

Example:

```text
User

↓

Edit Profile
```

Question:

```text
Can User Edit Any Profile?
```

Answer:

```text
No

Only Their Own Profile
```

This requires:

```text
Ownership-Based Authorization
```

which extends RBAC with resource ownership checks.

---

# Common Mistakes

## ❌ Assigning Permissions To Every User

Defeats the purpose of RBAC.

---

## ❌ Thinking Roles And Permissions Are The Same

Roles contain permissions.

They are not the same thing.

---

## ❌ Assuming Admin Is A Permission

Admin is a role.

---

## ❌ Confusing Authentication With RBAC

Authentication:

```text
Who Are You?
```

RBAC:

```text
What Are You Allowed To Do?
```

---

# Key Takeaways

- RBAC stands for Role-Based Access Control.
- Users are assigned roles.
- Roles contain permissions.
- Access decisions are made based on roles.
- RBAC reduces permission duplication.
- RBAC scales well for large applications.
- Authentication identifies users.
- RBAC determines what authenticated users can do.
- Most modern applications use some form of RBAC.

---

# One-Line Summary

RBAC (Role-Based Access Control) is an authorization model where users inherit permissions through assigned roles, allowing applications to manage access efficiently, consistently, and at scale.
