# Why OAuth Exists

## Introduction

Before OAuth existed, third-party applications needed a user's actual credentials to access services such as Google, Facebook, or GitHub.

This created major security risks because users had to share their passwords directly with other applications.

OAuth was created to solve this problem.

---

# The Problem Before OAuth

Without OAuth, the flow looked like:

```text
User

↓

Third-Party App

↓

Enter Google Password

↓

App Stores Password

↓

App Accesses Google Account
```

The application received the user's actual credentials.

---

# Why This Was Dangerous

When a user shares a password:

```text
App

↓

Knows Password

↓

Can Access Everything
```

The application effectively gains full access to the user's account.

---

# Example: Spotify

Suppose Spotify wants access to your Google account.

Without OAuth:

```text
Spotify

↓

Ask For Google Password

↓

User Provides Password

↓

Spotify Stores Password
```

Problems:

```text
Spotify Knows Password

Spotify Can Be Hacked

Password Can Leak

User Loses Control
```

---

# The Password Sharing Problem

Imagine multiple applications asking for your Google password:

```text
Spotify

Notion

Canva

Slack

Figma
```

Every application now stores:

```text
Your Google Password
```

This dramatically increases security risk.

---

# What If One App Gets Hacked?

Suppose:

```text
Spotify Database

↓

Breached
```

If Spotify stores your password:

```text
Attacker

↓

Gets Google Password

↓

Can Access Google Account
```

A compromise in one application can affect your entire account.

---

# OAuth's Core Idea

OAuth introduced a new rule:

```text
Never Share Passwords
```

Instead of giving credentials to third-party applications:

```text
User

↓

Google

↓

Google Verifies User

↓

Google Issues Token

↓

App Receives Token
```

The application never sees the password.

---

# OAuth Flow (High Level)

```text
User

↓

Click "Login With Google"

↓

Redirect To Google

↓

Enter Password On Google

↓

Google Verifies User

↓

Google Grants Permission

↓

Application Receives Token

↓

Authenticated
```

Notice:

```text
Application Never Receives Password
```

---

# What The App Receives

OAuth provides:

```text
Access Token
```

instead of:

```text
Password
```

The token grants limited access to specific resources.

---

# Limited Access

Without OAuth:

```text
Password

↓

Full Account Access
```

---

With OAuth:

```text
Access Token

↓

Limited Permissions
```

Example:

```text
Read Email

Read Profile
```

Only.

---

# Hotel Key Analogy

Think of your password as:

```text
Master Key
```

A master key can open everything.

---

OAuth provides:

```text
Guest Key Card
```

The key card only opens specific rooms.

---

Comparison:

```text
Password

↓

Master Key

----------------

OAuth Token

↓

Limited Access Key
```

---

# Revoking Access

Suppose you no longer want Spotify connected.

Without OAuth:

```text
Change Google Password
```

because Spotify knows it.

---

With OAuth:

```text
Google Settings

↓

Revoke Spotify Access

↓

Done
```

No password change required.

---

# Granular Permissions

OAuth introduced:

```text
Scopes
```

Scopes define what an application can access.

Example:

```text
✓ Email

✓ Profile
```

Application receives only those permissions.

Not:

```text
✓ Entire Account
```

---

# Benefits Of OAuth

```text
No Password Sharing

Better Security

Limited Access

Revocable Permissions

Controlled Access

Improved User Trust
```

---

# Before OAuth vs After OAuth

## Before OAuth

```text
User

↓

App

↓

Password

↓

Full Access
```

---

## After OAuth

```text
User

↓

Google

↓

Permission Granted

↓

Token

↓

Limited Access
```

---

# Real-World Examples

Applications using OAuth:

```text
Login With Google

Login With GitHub

Login With Facebook

Login With LinkedIn

Login With Microsoft
```

All follow the same principle:

```text
Never Share Passwords
```

---

# Key Takeaways

- OAuth was created to eliminate password sharing.
- Third-party applications should never know user passwords.
- OAuth allows users to authenticate directly with the provider.
- Applications receive tokens instead of credentials.
- Tokens provide limited access.
- Access can be revoked without changing passwords.
- OAuth improves both security and user control.
- Modern social login systems are built on OAuth.

---

# One-Line Summary

OAuth was created so third-party applications can access specific user information through limited tokens and permissions without ever seeing, storing, or handling the user's actual password.
