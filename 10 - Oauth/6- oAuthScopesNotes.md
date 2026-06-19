# OAuth Scopes

## Introduction

Scopes define what permissions an application is requesting from a user.

Instead of giving an application full access to an account, OAuth follows the principle of:

```text
Least Privilege
```

meaning applications should receive only the permissions they actually need.

---

# What Is A Scope?

Definition:

> A scope is a permission requested by an application to access a specific resource or perform a specific action.

Examples:

```text
email

profile

calendar

drive
```

Each scope unlocks access to a specific resource.

---

# Why Scopes Exist

Without scopes:

```text
Login With Google

↓

Application Gets Everything
```

This would be extremely dangerous.

Instead:

```text
Application

↓

Requests Specific Permissions
```

Only approved permissions are granted.

---

# Example Scopes

## email

Allows access to:

```text
User Email Address
```

Example:

```text
anish@gmail.com
```

---

## profile

Allows access to:

```text
Name

Profile Picture

Basic Profile Information
```

---

## calendar

Allows access to:

```text
Google Calendar Events
```

---

## drive

Allows access to:

```text
Google Drive Files
```

---

# OAuth Permission Request

Application:

```text
Vital Drops
```

Requests:

```text
email

profile
```

Google shows:

```text
Allow Vital Drops To Access:

✓ Email

✓ Basic Profile Information
```

User approves.

---

# Why Doesn't Google Give Everything?

Security.

Imagine:

```text
Login With Google

↓

Application Gets:

Email

Drive

Calendar

Photos

Contacts

Payments
```

Even if the application only needed:

```text
Email
```

This would be excessive access.

---

# Principle Of Least Privilege

Applications should receive:

```text
Only What They Need
```

Example:

```text
Vital Drops

↓

Needs Email

Needs Profile

↓

Gets Email + Profile
```

Not:

```text
Drive

Photos

Calendar
```

---

# Consent Screen

When scopes are requested:

Google displays a consent screen.

Example:

```text
Allow Vital Drops To:

✓ View Your Email

✓ View Your Profile
```

The user decides whether to approve.

---

# OAuth Flow With Scopes

```text
Application

↓

Requests Scopes

↓

Google Consent Screen

↓

User Approves

↓

Token Contains Permissions

↓

Application Accesses Resources
```

---

# Key Takeaways

- Scopes define permissions.
- Applications request scopes.
- Users approve scopes.
- Applications receive only approved permissions.
- Scopes follow the principle of least privilege.
- Different scopes provide access to different resources.

---

# One-Line Summary

Scopes are OAuth permissions that determine what resources an application can access on behalf of a user.
