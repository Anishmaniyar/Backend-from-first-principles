# Access Token vs ID Token

## Introduction

One of the most commonly confused concepts in OAuth and OpenID Connect (OIDC) is the difference between:

```text
Access Token

and

ID Token
```

Although both are issued after authentication, they serve completely different purposes.

Understanding this distinction is important for OAuth interviews and real-world authentication systems.

---

# Why Two Tokens Exist

After a successful login:

```text
User

↓

Google

↓

Authentication Successful

↓

Tokens Issued
```

Many developers ask:

```text
Why Not Use One Token?
```

Because OAuth solves two separate problems:

```text
1. Identity

2. Authorization
```

Identity and permissions are different concerns.

---

# Access Token

Definition:

> An Access Token is a credential used to access protected resources and APIs.

Think:

```text
Permission Ticket
```

Its purpose is:

```text
Access APIs
```

---

# What Access Token Answers

Question:

```text
What Can I Access?
```

Examples:

```text
Read Profile

Read Email

Read Calendar

Read Contacts
```

The access token determines what resources the application is allowed to access.

---

# Access Token Flow

```text
Backend

↓

Access Token

↓

Google API

↓

Protected Resource

↓

Response
```

Example:

```text
Backend

↓

Google People API

↓

User Profile
```

---

# What Access Tokens Typically Contain

```text
Scopes

Permissions

Expiration Time

Audience
```

Example scopes:

```text
profile

email

calendar.read
```

These define what actions are allowed.

---

# Access Token Mental Model

Imagine entering a secure office building.

Security asks:

```text
What Areas Can You Access?
```

You show:

```text
Access Badge
```

The badge determines where you can go.

That badge is similar to an:

```text
Access Token
```

---

# ID Token

Definition:

> An ID Token is a token that contains information about the authenticated user.

Think:

```text
Identity Card
```

Its purpose is:

```text
Identify The User
```

---

# What ID Token Answers

Question:

```text
Who Is The User?
```

Examples:

```text
Name

Email

Google User ID

Profile Picture
```

The ID Token provides identity information.

---

# Example ID Token Payload

```json
{
  "sub": "12345",
  "email": "anish@gmail.com",
  "name": "Anish",
  "picture": "profile.jpg"
}
```

---

# What ID Tokens Typically Contain

```text
User ID

Email

Name

Profile Picture

Authentication Information
```

Notice:

```text
Identity Data

Not Permissions
```

---

# ID Token Mental Model

Imagine entering a building.

Security asks:

```text
Who Are You?
```

You show:

```text
Government ID Card
```

The ID card proves your identity.

That is similar to an:

```text
ID Token
```

---

# Access Token vs ID Token

## Access Token

Purpose:

```text
Authorization
```

Meaning:

```text
What Can I Access?
```

Contains:

```text
Scopes

Permissions

Expiry
```

Used By:

```text
Google APIs

GitHub APIs

Microsoft APIs
```

---

## ID Token

Purpose:

```text
Authentication
```

Meaning:

```text
Who Am I?
```

Contains:

```text
Email

Name

User ID

Profile Information
```

Used By:

```text
Your Application
```

---

# Can ID Token Call APIs?

Question:

```text
Can ID Token Access Google APIs?
```

Answer:

```text
No
```

Reason:

```text
ID Token

↓

Identity

Not Authorization
```

Protected APIs require:

```text
Access Token
```

---

# Can Access Token Identify Users?

Question:

```text
Can Access Token Tell Me Who The User Is?
```

Answer:

```text
Sometimes

But It Should Not Be Used For Authentication
```

Reason:

```text
Access Token

↓

Authorization

Not Identity
```

The correct token for user identity is:

```text
ID Token
```

---

# Real OAuth Flow

User logs in:

```text
Login With Google
```

---

Google authenticates user:

```text
User Verified
```

---

Google returns:

```text
Authorization Code
```

---

Backend exchanges:

```text
Authorization Code

↓

Access Token

+

ID Token
```

---

Backend uses:

```text
ID Token

↓

Identify User
```

Example:

```text
Anish

anish@gmail.com
```

---

Backend uses:

```text
Access Token

↓

Call Google APIs
```

Examples:

```text
Get Profile

Get Calendar

Get Contacts
```

---

# Full Flow Diagram

```text
User

↓

Google Login

↓

Authorization Code

↓

Backend

↓

Exchange Code

↓

Access Token + ID Token

----------------

ID Token

↓

Who Is User?

----------------

Access Token

↓

What Can Be Accessed?
```

---

# Common Mistakes

## ❌ Treating Access Token As User Identity

Wrong.

Use:

```text
ID Token
```

for identity.

---

## ❌ Using ID Token To Call APIs

Wrong.

Use:

```text
Access Token
```

for API access.

---

## ❌ Assuming Both Tokens Are The Same

They solve completely different problems.

---

# Quick Comparison Table

| Feature          | Access Token        | ID Token             |
| ---------------- | ------------------- | -------------------- |
| Purpose          | Authorization       | Authentication       |
| Answers          | What can I access?  | Who am I?            |
| Used By          | APIs                | Application          |
| Contains         | Scopes, Permissions | Email, Name, User ID |
| Calls APIs?      | Yes                 | No                   |
| Identifies User? | Not Reliably        | Yes                  |

---

# Key Takeaways

- Access Tokens and ID Tokens have different purposes.
- Access Tokens are used for authorization.
- ID Tokens are used for authentication.
- Access Tokens allow API access.
- ID Tokens identify the user.
- APIs expect Access Tokens.
- Applications use ID Tokens to understand who logged in.
- Never confuse identity with permissions.

---

# One-Line Summary

An Access Token answers "What resources can this application access?" while an ID Token answers "Who is the authenticated user?" and both work together to complete modern OAuth and OpenID Connect authentication flows.
