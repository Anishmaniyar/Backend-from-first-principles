# Global Middleware

## Introduction

In Express applications, some functionality should run for every incoming request.

Examples:

```text
JSON Parsing

Logging

CORS

Security Headers

Error Handling
```

Instead of attaching these middleware functions to every route individually, Express allows them to be registered globally using:

```js
app.use(...)
```

Global middleware executes before route handlers and applies across the entire application.

---

# What Is Global Middleware?

Definition:

> Global middleware is middleware registered at the application level using `app.use()` that executes for every incoming request.

Basic flow:

```text
Request

↓

Global Middleware

↓

Route Middleware

↓

Controller

↓

Response
```

Every request passes through the global middleware pipeline before reaching route-specific logic.

---

# Why Global Middleware Exists

Imagine an application with:

```text
/login

/signup

/profile

/orders

/settings
```

Without global middleware, common functionality would need to be repeated everywhere.

Example:

```text
Parse JSON

↓

Route 1

Route 2

Route 3

Route 4
```

This creates unnecessary duplication.

---

Global middleware allows:

```text
Parse JSON Once

↓

Reuse Everywhere
```

This follows the DRY principle:

```text
Don't Repeat Yourself
```

---

# app.use()

Global middleware is typically registered using:

```js
app.use(middleware);
```

Meaning:

```text
Run This Middleware

↓

For Every Request
```

before Express processes routes.

---

# Request Flow

Example request:

```http
GET /profile
```

Flow:

```text
Request

↓

Global Middleware

↓

Route Middleware

↓

Controller

↓

Response
```

---

Another request:

```http
POST /login
```

Flow:

```text
Request

↓

Global Middleware

↓

Controller

↓

Response
```

Global middleware runs regardless of the route being accessed.

---

# Middleware Stack

Consider:

```js
app.use(logger);
app.use(express.json());
```

Express builds a middleware chain:

```text
1. logger

2. express.json()
```

Every request passes through the stack.

---

Example:

```text
Request

↓

logger

↓

express.json()

↓

Route Handler

↓

Response
```

---

# express.json()

One of the most commonly used global middleware functions.

Registration:

```js
app.use(express.json());
```

Purpose:

```text
Parse JSON Request Bodies
```

---

# Why express.json() Works Everywhere

This is one of the most important Express concepts.

When registered globally:

```js
app.use(express.json());
```

every request passes through:

```text
express.json()
```

before reaching any route.

---

Flow:

```text
Incoming Request

↓

express.json()

↓

Parse JSON

↓

Attach req.body

↓

Controller
```

As a result:

```js
req.body;
```

works across the entire application.

---

# Example

Incoming request:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Initially:

```text
Raw JSON
```

---

express.json():

```text
Parse JSON

↓

Convert To JavaScript Object

↓

Attach To req.body
```

Controller receives:

```js
req.body.email;

req.body.password;
```

already prepared.

---

# Without express.json()

Request:

```json
{
  "email": "john@example.com"
}
```

Controller:

```js
console.log(req.body);
```

Result:

```text
undefined
```

because Express never parsed the request body.

---

# Logger Middleware Example

Global logger:

```js
app.use(logger);
```

Request:

```text
GET /profile
```

Flow:

```text
Request

↓

Logger

↓

Authentication Middleware

↓

Controller
```

---

Request:

```text
POST /login
```

Flow:

```text
Request

↓

Logger

↓

Controller
```

The logger executes for both requests because it is global.

---

# Order Matters

Middleware executes in the order it is registered.

Example:

```js
app.use(logger);
app.use(express.json());
```

Flow:

```text
Request

↓

logger

↓

express.json()

↓

Route
```

---

If reversed:

```js
app.use(express.json());
app.use(logger);
```

Flow:

```text
Request

↓

express.json()

↓

logger

↓

Route
```

Express always processes middleware:

```text
Top

↓

Bottom
```

---

# Global Middleware vs Route Middleware

## Global Middleware

Registered with:

```js
app.use(...)
```

Runs:

```text
All Requests
```

Examples:

```text
express.json()

Logger

CORS

Helmet

Error Handling
```

---

## Route Middleware

Attached directly to routes.

Example:

```js
router.get("/profile", authMiddleware, getProfile);
```

Runs:

```text
Specific Route Only
```

Examples:

```text
Authentication

Authorization

Validation
```

---

# Real Example

Application:

```js
app.use(express.json());

app.use("/api/user", userRoutes);
```

Request:

```http
POST /api/user/login
```

Flow:

```text
Request

↓

express.json()

↓

req.body Created

↓

loginUser Controller

↓

Response
```

The controller can access:

```js
req.body;
```

because the global middleware already prepared it.

---

# Benefits Of Global Middleware

```text
Eliminates Repetition

Centralized Request Processing

Cleaner Route Definitions

Improved Maintainability

Consistent Application Behavior
```

---

# Common Use Cases

## JSON Parsing

```js
app.use(express.json());
```

---

## Logging

```js
app.use(logger);
```

---

## CORS

```js
app.use(cors());
```

---

## Security Headers

```js
app.use(helmet());
```

---

## Error Handling

```js
app.use(errorHandler);
```

---

# Common Mistakes

## ❌ Assuming Middleware Order Does Not Matter

False.

Express executes middleware in registration order.

---

## ❌ Registering express.json() After Routes

Result:

```text
req.body

↓

undefined
```

because routes execute before the parser.

---

## ❌ Using Global Middleware For Route-Specific Logic

Authentication should usually be route middleware, not global middleware.

---

## ❌ Forgetting That app.use() Affects Every Request

Global middleware runs on all matching requests.

---

# Key Takeaways

- Global middleware is registered using `app.use()`.
- Global middleware executes before route handlers.
- Every request passes through global middleware.
- `express.json()` is global middleware.
- Global middleware is ideal for shared functionality.
- Middleware execution order matters.
- Global middleware helps eliminate duplicated logic.
- Route middleware applies only to specific routes.
- Express processes middleware from top to bottom.

---

# One-Line Summary

Global middleware is application-wide middleware registered using `app.use()` that executes for every incoming request before route handlers, making it ideal for shared functionality such as JSON parsing, logging, security, and request preprocessing.
