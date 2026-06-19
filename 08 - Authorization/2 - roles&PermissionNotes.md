# Roles And Permissions

## Introduction

After authentication identifies a user, the application must determine what that user is allowed to do.

This process is called:

```text
Authorization
```

Authorization is commonly implemented using:

```text
Roles

and

Permissions
```

Roles simplify access control by grouping permissions together and assigning those groups to users.

---

# What Is A Permission?

Definition:

> A permission is a specific action a user is allowed to perform.

Examples:

```text
View Profile

Edit Profile

Create Post

Delete Comment

Ban User

Access Dashboard
```

Permissions represent individual capabilities within the application.

---

# What Is A Role?

Definition:

> A role is a collection of permissions assigned to a user.

Flow:

```text
Role

↓

Collection Of Permissions
```

Instead of assigning permissions one by one to every user, applications assign a role that already contains the required permissions.

---

# Why Roles Exist

Imagine an application with:

```text
10,000 Users
```

Without roles:

```text
Assign Permission 1

Assign Permission 2

Assign Permission 3

Assign Permission 4
```

to every individual user.

This quickly becomes difficult to manage.

---

With roles:

```text
Role

↓

Permissions
```

Users inherit permissions through their assigned role.

---

# User Role

A standard user typically has permissions such as:

```text
View Profile

Edit Own Profile

Create Posts

Like Posts

Comment On Posts
```

Restrictions:

```text
Cannot Delete Users

Cannot Access Admin Panel

Cannot Ban Users
```

Mental model:

```text
Regular Application User
```

---

# Moderator Role

Moderators help manage content and community activity.

Permissions:

```text
View Profile

Delete Comments

Remove Posts

Review Reports

Ban Users
```

Restrictions:

```text
Cannot Manage Entire System

Cannot Delete Administrators

Cannot Modify System Settings
```

Mental model:

```text
Community Manager
```

---

# Admin Role

Administrators have the highest level of access.

Permissions:

```text
Manage Users

Manage Moderators

Delete Users

Access Dashboard

View System Data

Manage Application Settings
```

In many systems:

```text
Admin

↓

All Permissions
```

Mental model:

```text
System Owner
```

---

# Role → Permission Relationship

Roles do not replace permissions.

Instead:

```text
Role

↓

Groups Permissions
```

Example:

```text
Admin
```

contains:

```text
Create User

Delete User

Ban User

Access Dashboard
```

---

Example:

```text
Moderator
```

contains:

```text
Delete Comment

Ban User

Review Reports
```

---

# Role-Based Access Control (RBAC)

The most common authorization model is:

```text
RBAC

↓

Role Based Access Control
```

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

Instead of checking individual users, the application checks the user's role.

---

# RBAC Example

User:

```text
John

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

---

User:

```text
Mike

Role = Admin
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

Result:

```text
Access Granted
```

---

# Authorization Flow

Complete flow:

```text
Request

↓

Authentication

↓

User Identified

↓

Role Retrieved

↓

Permission Check

↓

Allowed?

↓

YES → Controller

NO → Forbidden
```

Authorization happens after authentication.

---

# Real-World Examples

## Social Media

User:

```text
Create Posts

Like Posts

Comment
```

Moderator:

```text
Delete Posts

Delete Comments

Ban Users
```

Admin:

```text
Manage Entire Platform
```

---

## Discord Server

Member:

```text
Send Messages
```

Moderator:

```text
Delete Messages

Mute Members
```

Administrator:

```text
Manage Server
```

---

## E-Commerce

Customer:

```text
Place Orders

View Orders
```

Vendor:

```text
Manage Products

Manage Inventory
```

Admin:

```text
Manage Entire Platform
```

---

# Why Roles Are Better Than Individual Permissions

Without roles:

```text
User 1

Permission A

Permission B

Permission C

----------------

User 2

Permission A

Permission B

Permission C
```

Permissions become repetitive and difficult to manage.

---

With roles:

```text
Role

↓

Permissions
```

Users simply inherit permissions through their role.

---

# Database Perspective

Eventually, applications store something like:

```text
User

↓

Role
```

Example:

```text
John

↓

User
```

---

```text
Sarah

↓

Moderator
```

---

```text
Mike

↓

Admin
```

Authorization middleware later checks:

```text
req.user.role
```

to determine access.

---

# Common Mistakes

## ❌ Role And Permission Are The Same

False.

Permission:

```text
Delete User
```

Role:

```text
Admin
```

A role contains permissions.

---

## ❌ Admin Is A Permission

False.

Admin is a role.

---

## ❌ Every User Needs Unique Permissions

Usually false.

Roles exist to avoid this complexity.

---

## ❌ Authentication Automatically Handles Authorization

False.

Authentication identifies the user.

Authorization checks permissions.

---

# Key Takeaways

- Permissions define actions a user can perform.
- Roles are collections of permissions.
- Users are assigned roles.
- RBAC stands for Role-Based Access Control.
- Roles simplify authorization management.
- Multiple users can share the same role.
- Authentication identifies users.
- Authorization checks permissions.
- Admin, Moderator, and User are examples of roles.
- Authorization middleware often checks `req.user.role`.

---

# One-Line Summary

Roles and permissions form the foundation of authorization, where roles act as reusable groups of permissions that allow applications to efficiently control what authenticated users are allowed to do.
