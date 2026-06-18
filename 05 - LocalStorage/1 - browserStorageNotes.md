# Browser Storage Fundamentals

## Introduction

Modern browsers provide multiple ways to store data on the client side.

These storage mechanisms allow websites to persist information across page reloads, navigation events, and browser sessions.

The three most common browser storage options are:

```text
LocalStorage

SessionStorage

Cookies
```

Although all three can store data, they differ significantly in:

- Lifetime
- Accessibility
- Security
- Communication with the server

Understanding these differences is critical before learning authentication storage strategies.

---

# Why Browser Storage Exists

Web pages are temporary.

When a page refreshes:

```text
Page Reload

↓

JavaScript State Lost
```

Without storage:

```text
Theme Preference

↓

Lost

-------------------

Shopping Cart

↓

Lost

-------------------

Authentication State

↓

Lost
```

Browser storage solves this problem.

---

# Browser Storage Overview

```text
Browser

├── LocalStorage
├── SessionStorage
└── Cookies
```

All three store data inside the browser.

The difference lies in:

```text
Who can access it?

How long does it live?

Does it travel to the server?
```

---

# LocalStorage

## Definition

LocalStorage is a browser storage mechanism that stores data as key-value pairs and persists until explicitly removed.

Example:

```text
theme

↓

dark
```

or

```text
token

↓

jwt-token
```

---

## Characteristics

### Persistent Storage

Data survives:

```text
Page Refresh

↓

Yes

-------------------

Tab Close

↓

Yes

-------------------

Browser Restart

↓

Yes
```

Data remains available until:

```text
User Clears Storage

OR

Application Removes It
```

---

## Accessibility

JavaScript can:

```text
Read

Write

Update

Delete
```

LocalStorage data.

---

## Communication With Server

LocalStorage data:

```text
Does NOT Automatically Travel To Server
```

If data needs to be sent:

```text
JavaScript

↓

Reads LocalStorage

↓

Adds To Request

↓

Sends To Server
```

---

## Common Use Cases

```text
Theme Preferences

Language Preferences

User Settings

Draft Data

JWT Tokens (sometimes)
```

---

# SessionStorage

## Definition

SessionStorage is browser storage that survives page refreshes but is destroyed when the browser tab closes.

Think of it as:

```text
Temporary Browser Storage
```

---

## Characteristics

Data survives:

```text
Page Refresh

↓

Yes
```

Data does NOT survive:

```text
Tab Close

↓

No

-------------------

Browser Restart

↓

No
```

---

## Accessibility

JavaScript can:

```text
Read

Write

Update

Delete
```

SessionStorage data.

---

## Communication With Server

SessionStorage data:

```text
Does NOT Automatically Travel To Server
```

JavaScript must manually send it.

---

## Common Use Cases

```text
Multi-Step Forms

Temporary User State

Wizard Progress

Short-Lived UI Data
```

---

# Cookies

## Definition

Cookies are small pieces of browser-managed storage that can automatically be included in HTTP requests.

This makes them fundamentally different from LocalStorage and SessionStorage.

---

# Cookie Lifecycle

Server:

```text
Set-Cookie

↓

Browser Stores Cookie
```

Future Request:

```text
Browser

↓

Automatically Sends Cookie

↓

Server Receives Cookie
```

---

## Example Flow

Login:

```text
Server

↓

Set-Cookie

↓

session=abc123
```

Browser stores:

```text
session=abc123
```

Future request:

```text
GET /profile
```

Browser automatically sends:

```text
Cookie:

session=abc123
```

---

## Accessibility

Cookie accessibility depends on configuration.

### Normal Cookie

JavaScript:

```text
Can Read
```

---

### HttpOnly Cookie

JavaScript:

```text
Cannot Read
```

This is one of the most important security features for authentication.

---

## Communication With Server

Cookies:

```text
Automatically Travel To Server
```

No manual JavaScript attachment is required.

---

## Common Use Cases

```text
Sessions

Authentication

User Preferences

Tracking Information

Security Tokens
```

---

# LocalStorage vs SessionStorage vs Cookies

| Feature                  | LocalStorage | SessionStorage | Cookies     |
| ------------------------ | ------------ | -------------- | ----------- |
| Stores Key-Value Data    | ✅           | ✅             | ✅          |
| Survives Refresh         | ✅           | ✅             | ✅          |
| Survives Tab Close       | ✅           | ❌             | Usually ✅  |
| Survives Browser Restart | ✅           | ❌             | Usually ✅  |
| JavaScript Accessible    | ✅           | ✅             | Depends     |
| Auto Sent To Server      | ❌           | ❌             | ✅          |
| Authentication Usage     | Sometimes    | Rarely         | Very Common |

---

# Persistence Comparison

## LocalStorage

```text
Refresh

↓

Survives

-------------------

Tab Close

↓

Survives

-------------------

Browser Restart

↓

Survives
```

---

## SessionStorage

```text
Refresh

↓

Survives

-------------------

Tab Close

↓

Destroyed

-------------------

Browser Restart

↓

Destroyed
```

---

## Cookies

```text
Refresh

↓

Usually Survives

-------------------

Tab Close

↓

Usually Survives

-------------------

Browser Restart

↓

Usually Survives
```

Depending on expiration settings.

---

# JavaScript Accessibility

## LocalStorage

```text
JavaScript

↓

Access Allowed
```

---

## SessionStorage

```text
JavaScript

↓

Access Allowed
```

---

## Cookies

### Normal Cookie

```text
JavaScript

↓

Access Allowed
```

### HttpOnly Cookie

```text
JavaScript

↓

Access Denied
```

---

# Authentication Perspective

## LocalStorage Authentication

```text
JWT

↓

LocalStorage

↓

JavaScript Reads Token

↓

Manually Adds Authorization Header

↓

Request Sent
```

---

## Cookie Authentication

```text
JWT / Session ID

↓

Cookie

↓

Browser Automatically Sends

↓

Request Sent
```

---

# Key Differences

## LocalStorage

```text
Persistent

JavaScript Accessible

Manual Request Attachment
```

---

## SessionStorage

```text
Temporary

JavaScript Accessible

Manual Request Attachment
```

---

## Cookies

```text
Browser Managed

Automatically Sent

Can Be Protected With HttpOnly
```

---

# Common Misconceptions

## ❌ LocalStorage Automatically Sends Data To The Server

False.

JavaScript must manually attach data to requests.

---

## ❌ SessionStorage Is The Same As LocalStorage

False.

SessionStorage is destroyed when the tab closes.

---

## ❌ Cookies Are Only For Authentication

False.

Cookies can store many types of data.

---

## ❌ JavaScript Can Always Read Cookies

False.

HttpOnly cookies cannot be accessed by JavaScript.

---

## ❌ Cookies And Sessions Are The Same Thing

False.

Cookies are a storage mechanism.

Sessions are a server-side authentication mechanism.

---

# Key Takeaways

- Browsers provide multiple storage mechanisms.
- LocalStorage persists until manually removed.
- SessionStorage persists only for the lifetime of a browser tab.
- Cookies can automatically travel with HTTP requests.
- LocalStorage and SessionStorage require manual request attachment.
- JavaScript can access LocalStorage and SessionStorage.
- JavaScript cannot access HttpOnly cookies.
- Cookies play a major role in authentication systems.

---

# One-Line Summary

Browser storage consists primarily of LocalStorage, SessionStorage, and Cookies, each offering different persistence, accessibility, and communication characteristics, with Cookies being unique because they can automatically travel with HTTP requests and support security features such as HttpOnly.
