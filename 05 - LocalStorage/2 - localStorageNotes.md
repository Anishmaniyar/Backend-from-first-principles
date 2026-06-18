# LocalStorage

## Introduction

LocalStorage is a browser-provided storage mechanism that allows websites to store data as key-value pairs directly inside the browser.

The stored data persists even after:

```text
Page Refresh

Tab Close

Browser Restart

Computer Restart
```

until it is explicitly removed.

LocalStorage is commonly used to store:

- User preferences
- Theme settings
- Draft content
- Language settings
- JWT tokens (sometimes)

---

# What Is LocalStorage?

LocalStorage is persistent client-side storage.

Think of it as:

```text
Browser

↓

Small Database

↓

LocalStorage
```

It stores information as:

```text
Key

↓

Value
```

pairs.

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

# Why Does LocalStorage Exist?

Without storage:

```text
User Changes Setting

↓

Refresh Page

↓

Setting Lost
```

With LocalStorage:

```text
User Changes Setting

↓

Store Value

↓

Refresh Page

↓

Value Still Exists
```

LocalStorage allows applications to remember information between page loads.

---

# Where Is LocalStorage Stored?

LocalStorage is stored inside the browser.

Example:

```text
Chrome

↓

Website Storage

↓

LocalStorage
```

Each website gets its own isolated storage.

Example:

```text
google.com

↓

Own LocalStorage
```

```text
amazon.com

↓

Own LocalStorage
```

One website cannot access another website's LocalStorage.

---

# LocalStorage Operations

## setItem()

Purpose:

```text
Store Data
```

Flow:

```text
JavaScript

↓

setItem()

↓

Browser Stores Data
```

Example mentally:

```text
theme

↓

dark
```

Stored in LocalStorage.

---

## getItem()

Purpose:

```text
Retrieve Data
```

Flow:

```text
LocalStorage

↓

Find Key

↓

Return Value
```

Example:

```text
theme

↓

dark
```

Returned to JavaScript.

---

## removeItem()

Purpose:

```text
Delete One Item
```

Flow:

```text
Specific Key

↓

Delete
```

Only the selected key is removed.

---

## clear()

Purpose:

```text
Delete Everything
```

Flow:

```text
LocalStorage

↓

Remove All Data
```

All stored keys and values are deleted.

---

# Persistence Behavior

One of the biggest advantages of LocalStorage is persistence.

---

## Page Refresh

```text
Refresh

↓

Data Survives
```

---

## Tab Close

```text
Close Tab

↓

Data Survives
```

---

## Browser Restart

```text
Close Browser

↓

Open Browser

↓

Data Survives
```

---

## Computer Restart

```text
Shutdown

↓

Power On

↓

Data Survives
```

Unless manually deleted.

---

# Who Can Access LocalStorage?

JavaScript.

JavaScript can:

```text
Read Data

Write Data

Update Data

Delete Data
```

LocalStorage is completely accessible to JavaScript running on the page.

---

# Authentication With LocalStorage

A common authentication flow uses JWTs.

---

## Login Flow

User:

```text
Email

↓

Password

↓

Backend
```

Backend:

```text
Generate JWT

↓

Return JWT
```

Response:

```json
{
  "token": "eyJ..."
}
```

---

## Store JWT

Frontend receives:

```text
JWT
```

and stores:

```text
JWT

↓

LocalStorage
```

Visual:

```text
Browser

↓

LocalStorage

↓

JWT
```

---

# Future Requests

When the user makes another request:

```text
Profile

Settings

Dashboard
```

the frontend must:

```text
Read JWT

↓

LocalStorage

↓

Attach To Request
```

---

# Authorization Header

Request:

```text
Authorization:

Bearer <JWT>
```

Flow:

```text
JWT

↓

LocalStorage

↓

JavaScript Reads JWT

↓

Authorization Header

↓

Request

↓

Server
```

---

# Important Difference From Cookies

LocalStorage:

```text
Store Data

↓

Data Stays In Browser

↓

NOT Automatically Sent
```

Cookies:

```text
Store Data

↓

Browser Automatically Sends Data
```

This is one of the biggest differences.

---

# Manual Sending

With LocalStorage:

```text
Read JWT

↓

Attach JWT

↓

Send Request
```

must happen every time.

The browser does not do this automatically.

---

# Why Developers Like LocalStorage

Advantages:

```text
Simple

Easy To Understand

Persistent

Easy To Implement
```

Flow:

```text
Login

↓

Store Token

↓

Read Token

↓

Send Token
```

Very straightforward.

---

# Security Concern

The biggest LocalStorage weakness:

```text
JavaScript Can Read It
```

This means:

```text
Malicious JavaScript

↓

Can Read LocalStorage
```

If an attacker successfully injects JavaScript:

```text
Read JWT

↓

Steal JWT

↓

Send To Attacker
```

This is called token theft.

---

# XSS Risk

LocalStorage itself is not insecure.

The problem is:

```text
XSS

↓

Injected JavaScript

↓

Access LocalStorage

↓

Steal Token
```

This is why storing authentication tokens in LocalStorage is debated.

---

# Real Authentication Flow

```text
Login

↓

Backend Generates JWT

↓

Frontend Receives JWT

↓

Store JWT In LocalStorage

↓

Future Request

↓

Read JWT

↓

Authorization Header

↓

Server Verifies JWT

↓

Authenticated
```

---

# LocalStorage Mental Model

```text
LocalStorage

↓

Persistent Browser Storage

↓

JavaScript Controlled

↓

Manual Request Attachment

↓

Common JWT Storage

↓

XSS Risk Exists
```

---

# Common Misconceptions

## ❌ LocalStorage Automatically Sends Data To The Server

False.

JavaScript must manually attach data to requests.

---

## ❌ LocalStorage Is Temporary

False.

Data persists until removed.

---

## ❌ Other Websites Can Read My LocalStorage

False.

Storage is isolated per website.

---

## ❌ LocalStorage Is A Database

Not exactly.

It is a simple key-value storage mechanism.

---

## ❌ LocalStorage Is Safe From XSS

False.

JavaScript can access LocalStorage.

---

# Key Takeaways

- LocalStorage is persistent browser storage.
- Data is stored as key-value pairs.
- Data survives refreshes and browser restarts.
- JavaScript can fully access LocalStorage.
- LocalStorage data is not automatically sent to the server.
- JWTs stored in LocalStorage must be manually attached to requests.
- LocalStorage is simple and convenient.
- XSS attacks can potentially steal tokens stored in LocalStorage.

---

# One-Line Summary

LocalStorage is persistent browser storage that allows JavaScript to store and retrieve key-value data, making it a convenient place to store JWTs, but because JavaScript can freely access it, LocalStorage-based authentication is vulnerable to token theft through XSS attacks.
