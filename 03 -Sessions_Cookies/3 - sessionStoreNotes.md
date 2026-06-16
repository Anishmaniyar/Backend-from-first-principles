# Session Store

## What is a Session Store?

A Session Store is a server-side storage mechanism that maps a Session ID to its corresponding session data.

Conceptually:

```
Session ID

↓

Session Data
```

The Session Store allows the server to remember users across multiple HTTP requests.

---

# Why Do We Need a Session Store?

After a user logs in, the server creates a session.

The server must remember information associated with that user.

Example:

```
User

↓

Login

↓

Authenticate

↓

Generate Session ID

↓

Store Session

↓

Future Request

↓

Lookup Session

↓

Authenticated
```

Without a Session Store, the server would have no way to retrieve session information.

---

# Session Mapping

Conceptually:

```
abc123

↓

{
    userId: 1,
    role: "admin"
}
```

```
xyz456

↓

{
    userId: 8,
    role: "user"
}
```

The Session ID acts as the key.

The session data acts as the value.

---

# What Is Stored Inside a Session?

Typical session data may include:

- User ID
- Authentication state
- User role
- Permissions
- Login timestamp
- Expiration timestamp
- Temporary application state

Example:

```json
{
  "userId": 42,
  "role": "admin",
  "loginTime": "...",
  "expiresAt": "..."
}
```

Passwords should never be stored inside sessions.

---

# Session Lookup Flow

```
Browser

↓

Session ID

↓

Server

↓

Session Store

↓

Find Session

↓

Authenticated User
```

The Session ID is simply a lookup key.

---

# Why Not Store Session Data in the Browser?

The browser is controlled by the user.

Users can modify:

- Cookies
- Local Storage
- Session Storage
- JavaScript
- Network requests

If important authentication data were stored directly in the browser, users could manipulate it.

Example:

```
role: "user"

↓

Modify

↓

role: "admin"
```

This would create serious security vulnerabilities.

---

# Why Store Sessions on the Server?

The server owns and controls:

- Authentication state
- User identity
- Permissions
- Business logic

Server-side storage prevents users from directly modifying trusted data.

The backend remains the source of truth.

---

# Types of Session Stores

## 1. Memory Store

Stores sessions in server memory (RAM).

Example:

```
sessions

↓

abc123 → User 1

xyz456 → User 2
```

Advantages:

- Simple
- Fast
- Easy to understand

Disadvantages:

- Lost when server restarts
- Not suitable for production scaling

---

## 2. Database Store

Stores sessions in a database.

Possible databases:

- PostgreSQL
- MySQL
- MongoDB

Advantages:

- Persistent
- Survives server restarts

Disadvantages:

- Slower than memory
- Increased database load

---

## 3. Redis

Redis is an in-memory data store commonly used for session storage.

Advantages:

- Extremely fast
- Supports automatic expiration
- Efficient for frequent reads and writes
- Well suited for large-scale applications

Redis is commonly used in production systems.

---

# What Happens If the Server Restarts?

## Memory Store

```
Server Restart

↓

Memory Cleared

↓

Sessions Lost

↓

Users Logged Out
```

---

## Database Store

```
Server Restart

↓

Database Persists

↓

Sessions Still Exist
```

---

## Redis

Depending on configuration:

```
Server Restart

↓

Redis

↓

Sessions May Persist
```

Redis can also be configured with persistence mechanisms.

---

# Why Is Redis Popular?

Sessions require:

- Fast lookups
- Fast writes
- Fast deletion
- Automatic expiration
- High throughput

Redis is optimized for these workloads, making it a common production choice.

---

# Common Misconceptions

## ❌ Session Store lives in the browser

False.

It exists on the server.

---

## ❌ Session Store contains passwords

False.

Passwords should never be stored in session data.

---

## ❌ Redis is mandatory

False.

Sessions can be stored in:

- Memory
- Databases
- Redis

Redis is simply a common production solution.

---

## ❌ Browser stores the entire session

False.

Typically, the browser only stores a Session ID.

The actual session data remains on the server.

---

# Key Takeaways

- A Session Store maps Session IDs to session data.
- The Session Store exists on the server.
- Session data includes authentication-related information.
- Passwords should never be stored in sessions.
- The browser typically stores only a Session ID.
- Memory stores are simple but temporary.
- Databases provide persistence.
- Redis is a popular production choice for session storage.
- The backend remains the source of truth.

---

# Easy Memory Trick

```
Browser

↓

Session ID

↓

Server

↓

Session Store

↓

User Data

↓

Authenticated
```

---

# One-Line Summary

A Session Store is a server-side storage mechanism that maps Session IDs to user-related session data, allowing the server to remember authenticated users across multiple HTTP requests.
