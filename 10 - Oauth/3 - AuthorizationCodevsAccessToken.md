# Authorization Code vs Access Token

## Introduction

One of the most common OAuth misunderstandings is confusing:

```text
Authorization Code
```

with:

```text
Access Token
```

They are completely different.

Understanding the difference is essential for understanding the OAuth Authorization Code Flow.

---

# The Common Misconception

Many beginners think:

```text
Authorization Code

↓

Contains User Data
```

or

```text
Authorization Code

↓

Is The Access Token
```

Both are incorrect.

---

# What Is An Authorization Code?

Definition:

> An Authorization Code is a short-lived, one-time-use credential issued by the Authorization Server after the user successfully authenticates.

Example:

```text
abc123
```

The code is temporary.

It is not used to access APIs.

It is only used to obtain tokens.

---

# What The Authorization Code Means

Google is essentially saying:

```text
I Verified This User

↓

Here Is Temporary Proof
```

The code is proof that:

```text
User Logged In Successfully
```

---

# Authorization Code Characteristics

```text
Short-Lived

One-Time Use

Temporary

Cannot Access APIs

Cannot Fetch User Data
```

The code's only purpose is token exchange.

---

# OAuth Flow

Step 1:

```text
User

↓

Login With Google
```

---

Step 2:

```text
Google

↓

Verifies User
```

---

Step 3:

```text
Google

↓

Redirects Back

↓

/callback?code=abc123
```

Example:

```text
https://yourapp.com/callback?code=abc123
```

---

# What Happens Next?

Your backend receives:

```text
abc123
```

But the code is not enough to fetch profile information.

The backend must exchange it.

---

# Code Exchange

Backend sends:

```text
Authorization Code
```

back to Google.

Flow:

```text
Backend

↓

Authorization Code

↓

Google
```

The backend asks:

```text
I Received This Code

Can I Exchange It For Tokens?
```

---

# Why Send The Code Back?

Google validates:

```text
Is The Code Real?

Has It Expired?

Has It Been Used Before?

Did The Correct Application Request It?
```

Only if all checks pass does Google issue tokens.

---

# What Does Google Return?

Example:

```json
{
  "access_token": "...",
  "id_token": "...",
  "expires_in": 3600
}
```

Now the backend has actual OAuth tokens.

---

# What Is An Access Token?

Definition:

> An Access Token is a credential that allows an application to access protected APIs on behalf of the user.

Think:

```text
Permission Ticket
```

The access token grants API access.

---

# Access Token Characteristics

```text
Used To Call APIs

Contains Permissions

Can Access Resources

Expires After A Period Of Time
```

Unlike the authorization code, the access token is actually useful for API requests.

---

# Authorization Code vs Access Token

## Authorization Code

Purpose:

```text
Exchange For Tokens
```

Characteristics:

```text
Temporary

One-Time Use

Cannot Call APIs

Cannot Fetch User Data
```

---

## Access Token

Purpose:

```text
Access Protected APIs
```

Characteristics:

```text
Used Multiple Times

Can Call APIs

Can Fetch User Data

Contains Permissions
```

---

# Fetching User Data

Once the backend receives:

```text
Access Token
```

it can call Google's APIs.

Flow:

```text
Backend

↓

Google API

↓

Access Token

↓

User Data
```

---

Example Response

```json
{
  "name": "Anish",
  "email": "anish@gmail.com",
  "picture": "profile.jpg"
}
```

Now the application knows who the user is.

---

# Important Distinction

Wrong:

```text
Authorization Code

↓

User Data
```

---

Correct:

```text
Authorization Code

↓

Access Token

↓

Google API

↓

User Data
```

User data is never returned directly from the authorization code.

---

# Movie Ticket Analogy

Authorization Code:

```text
Claim Ticket
```

---

Access Token:

```text
Permission Pass
```

---

Flow:

```text
Buy Ticket

↓

Receive Claim Ticket

↓

Exchange Ticket

↓

Receive Entry Pass

↓

Enter Movie
```

OAuth works similarly.

---

# Complete OAuth Flow

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

Access Token

↓

Google API

↓

User Profile

↓

Create Session / JWT

↓

Authenticated
```

---

# Key Takeaways

- Authorization Code and Access Token are different.
- Authorization Code is temporary proof of successful authentication.
- Authorization Code cannot access APIs.
- Authorization Code must be exchanged for tokens.
- Access Token is used to access protected APIs.
- User data is fetched using the Access Token.
- Google validates the code before issuing tokens.
- The Authorization Code Flow is designed to keep tokens away from the browser and improve security.

---

# One-Line Summary

The Authorization Code is a short-lived proof that Google authenticated the user, while the Access Token is the credential obtained by exchanging that code and is used to access protected APIs and retrieve user information.
