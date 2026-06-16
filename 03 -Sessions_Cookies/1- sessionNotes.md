# Sessions (Concept)

## What is a Session?

A session is **server-side memory** that allows a server to remember information about a client across multiple HTTP requests.

It solves one of the biggest limitations of HTTP:

> **HTTP is stateless.**

Without sessions, the server would treat every incoming request as a completely new request with no memory of previous interactions.

---

# Why Do Sessions Exist?

HTTP does not automatically remember:

- Who the user is
- Whether the user is logged in
- Previous requests
- Previous authentication state

Example:

```
Request 1

↓

Server

↓

Response

--------------------

Request 2

↓

Server

↓

Response
```

The second request has no built-in connection to the first request.

Sessions exist to provide this missing memory.

---

# The Problem Sessions Solve

Imagine a user logs in successfully.

```
Email

↓

Password

↓

Authenticated
```

Now the user clicks:

```
Profile

Orders

Settings

Dashboard
```

Without sessions, the server would have to verify the user's password again for every request.

```
Request

↓

Email

↓

Password

↓

Authenticate

↓

Response
```

This is inefficient and provides a poor user experience.

Instead:

```
Login Once

↓

Server Remembers User

↓

Future Requests

↓

Already Authenticated
```

---

# Server-Side Memory

The most important idea:

> **A session is server-side memory.**

It is information stored and controlled by the backend.

Think of it as:

```
Server Memory

↓

Session 1

↓

User 42

--------------------

Session 2

↓

User 18

--------------------

Session 3

↓

User 91
```

The browser does not own this memory.

The server owns it.

---

# Authentication State

One of the primary purposes of a session is storing authentication state.

Example:

```
Has this user already been verified?

↓

Yes

↓

Already Logged In
```

Instead of verifying passwords repeatedly, the server simply remembers that authentication has already happened.

---

# What Is Actually Stored?

A session does NOT store plaintext passwords.

Typical session data may include:

```
{
    userId: 42,
    email: "anish@example.com",
    role: "admin",
    loginTime: "...",
    expiresAt: "..."
}
```

Depending on the application, sessions may also contain:

- User ID
- Roles
- Permissions
- Login timestamp
- Expiration timestamp
- Preferences
- CSRF-related information

Sensitive secrets such as plaintext passwords should never be stored.

---

# High-Level Session Flow

```
User

↓

Login

↓

Authenticate

↓

Create Session

↓

Store Session

↓

Future Request

↓

Lookup Session

↓

Authenticated
```

---

# Session Lifecycle

Every session follows a lifecycle.

## 1. Session Creation

```
User Login

↓

Credentials Verified

↓

Create Session

↓

Store Session
```

The session is created only after successful authentication.

---

## 2. Session Storage

The server stores session information.

Conceptually:

```
Session

↓

User Information

↓

Authentication State

↓

Permissions

↓

Expiration
```

Storage may be:

- Memory
- Redis
- Database
- Distributed session store

(The implementation details are covered later.)

---

## 3. Session Usage

For future requests:

```
Incoming Request

↓

Find Session

↓

Session Exists?

↓

Yes

↓

User Recognized

↓

Authenticated
```

The password does not need to be verified again.

---

## 4. Session Expiration

Sessions do not live forever.

Eventually:

```
Session

↓

Expired

↓

Deleted
```

The user must authenticate again.

Expiration may occur because of:

- Inactivity
- Timeout
- Server policy
- Security policy

---

## 5. Logout

When the user logs out:

```
Logout

↓

Delete Session

↓

Forget User

↓

Future Requests

↓

Unauthorized
```

Logout simply removes the server-side memory associated with that user.

---

# Complete Session Lifecycle

```
Login

↓

Authenticate

↓

Create Session

↓

Store Session

↓

Future Requests

↓

Lookup Session

↓

Authenticated

↓

Logout / Expiration

↓

Delete Session
```

---

# Who Owns the Session?

The session belongs to the server.

```
Server

↓

Owns Session

↓

Controls Session

↓

Deletes Session
```

The browser does not own the session.

Later, we'll learn that browsers usually store only a Session ID.

---

# Where Is Session Data Stored?

Session data is stored on the backend.

Possible storage locations include:

- Server memory
- Redis
- Database
- Distributed cache

The browser does not contain the actual session data.

---

# When Is a Session Deleted?

A session may be deleted because of:

## User Logout

```
Logout

↓

Delete Session
```

---

## Inactivity Timeout

```
Inactive

↓

Timeout

↓

Delete Session
```

---

## Server Policy

```
Maximum Lifetime Reached

↓

Delete Session
```

---

## Administrator Action

```
Force Logout

↓

Delete Session
```

---

# Why Sessions Are Useful

Without sessions:

```
Every Request

↓

Password

↓

Authentication

↓

Response
```

With sessions:

```
Login Once

↓

Remember User

↓

Future Requests

↓

Already Authenticated
```

Sessions improve both security and user experience.

---

# Common Misconceptions

## ❌ Session = Cookie

False.

A session is server-side memory.

A cookie is a browser storage mechanism.

They are related but not the same thing.

---

## ❌ Sessions Store Passwords

False.

Passwords should never be stored in sessions.

---

## ❌ The Browser Owns the Session

False.

The backend owns and manages sessions.

---

## ❌ Sessions Never Expire

False.

Sessions can expire, timeout, or be invalidated.

---

## ❌ Sessions Exist Automatically

False.

The server creates a session after successful authentication.

---

# Key Takeaways

- Sessions solve the stateless nature of HTTP.
- Sessions provide server-side memory.
- Sessions allow users to remain authenticated across multiple requests.
- Sessions are created after successful authentication.
- Sessions store user-related state, not plaintext passwords.
- Sessions have a lifecycle: creation, storage, usage, expiration, and deletion.
- The backend owns the session.
- Sessions are different from cookies.
- Future requests rely on session information rather than repeated password verification.

---

# Easy Memory Trick

```
User

↓

Login

↓

Authenticate

↓

Create Session

↓

Store Session

↓

Future Requests

↓

Lookup Session

↓

Authenticated

↓

Logout

↓

Delete Session
```

---

# One-Line Summary

A session is server-side memory that allows a stateless HTTP protocol to recognize and remember authenticated users across multiple requests without requiring them to repeatedly provide their credentials.
