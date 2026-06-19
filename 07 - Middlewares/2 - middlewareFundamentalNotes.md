# Middleware Fundamentals

## Introduction

As applications grow, many routes require the same logic:

```text
Authentication

Validation

Logging

Rate Limiting

Error Handling
```

Writing the same code inside every controller leads to duplication and poor maintainability.

Middleware solves this problem by allowing reusable logic to execute before a request reaches the controller.

Middleware is one of the core concepts of Express and forms the foundation of authentication systems, request processing, and application architecture.

---

# What Is Middleware?

Definition:

> Middleware is a function that executes between an incoming request and the final controller.

Basic flow:

```text
Request

↓

Middleware

↓

Controller

↓

Response
```

Middleware gets an opportunity to inspect, modify, allow, or block a request before the controller executes.

---

# Why Middleware Exists

Imagine an application with:

```text
GET /profile

GET /settings

GET /orders

GET /notifications
```

Every route requires authentication.

Without middleware:

```text
Controller

↓

Verify JWT

↓

Business Logic
```

This verification logic would need to be repeated in every controller.

Result:

```text
Code Duplication

Harder Maintenance

Poor Scalability
```

---

# DRY Principle

Middleware helps follow the DRY principle:

```text
Don't Repeat Yourself
```

Instead of:

```text
JWT Verification

↓

Controller 1

Controller 2

Controller 3

Controller 4
```

Use:

```text
JWT Verification Middleware

↓

All Controllers
```

Write once.

Reuse everywhere.

---

# Purpose Of Middleware

Middleware is designed to handle:

```text
Cross-Cutting Concerns
```

Meaning:

```text
Logic Shared Across Multiple Routes
```

Examples:

```text
Authentication

Authorization

Validation

Logging

Rate Limiting

Error Handling

Request Parsing

CORS
```

These concerns should not be repeated inside individual controllers.

---

# Middleware Mental Model

Think of middleware as a series of checkpoints.

```text
Request

↓

Checkpoint 1

↓

Checkpoint 2

↓

Checkpoint 3

↓

Controller

↓

Response
```

Each checkpoint can:

```text
Allow Request

Modify Request

Reject Request
```

before the request reaches the controller.

---

# Middleware Parameters

Every Express middleware receives three parameters:

```text
req

res

next
```

These are the building blocks of middleware.

---

# Request Object (req)

The request object contains everything sent by the client.

Examples:

```text
Headers

Body

Query Parameters

Route Parameters

URL

Method
```

Common properties:

```js
req.body;

req.headers;

req.params;

req.query;

req.method;
```

Middleware often reads data from the request object.

---

# Response Object (res)

The response object is used to send data back to the client.

Common methods:

```js
res.send();

res.json();

res.status();
```

Middleware can use the response object to immediately terminate a request.

Example:

```text
Invalid JWT

↓

401 Unauthorized

↓

Request Ends
```

---

# next()

The third middleware parameter is:

```text
next()
```

Purpose:

```text
Pass Control To Next Middleware
```

Flow:

```text
Middleware A

↓

next()

↓

Middleware B

↓

next()

↓

Controller
```

Without calling:

```text
next()
```

the request stops.

---

# Middleware Chain

Express executes middleware sequentially.

Example:

```text
Request

↓

Logger Middleware

↓

Authentication Middleware

↓

Validation Middleware

↓

Controller

↓

Response
```

Each middleware performs a specific task before passing control to the next stage.

---

# Middleware Can Modify Requests

One of the most powerful features of middleware is request modification.

Example:

```text
Verify JWT

↓

Extract User Information

↓

Attach User To Request
```

Result:

```text
req.user
```

is now available.

Controller:

```text
req.user

↓

Use User Information
```

The controller does not need to verify the token again.

---

# Middleware Can Stop Requests

Middleware can reject requests.

Example:

```text
Request

↓

Authentication Middleware

↓

Invalid Token

↓

401 Unauthorized

↓

Request Ends
```

The controller never executes.

---

# Middleware Can Continue Requests

If validation succeeds:

```text
Request

↓

Authentication Middleware

↓

Valid Token

↓

next()

↓

Controller
```

The request continues normally.

---

# Why Not Put Everything Inside Controllers?

Without middleware:

```text
Controller

↓

Authentication

↓

Validation

↓

Logging

↓

Business Logic
```

Controllers become large and difficult to maintain.

---

With middleware:

```text
Authentication Middleware

↓

Validation Middleware

↓

Controller
```

Controllers focus only on:

```text
Business Logic
```

This creates cleaner application architecture.

---

# Middleware Order Matters

Middleware executes in the order it is registered.

Example:

```text
Logger

↓

Authentication

↓

Controller
```

is different from:

```text
Authentication

↓

Logger

↓

Controller
```

Express processes middleware:

```text
Top

↓

Bottom
```

Order affects application behavior.

---

# Common Types Of Middleware

## Authentication Middleware

Purpose:

```text
Verify JWT

Verify Session

Verify API Key
```

---

## Authorization Middleware

Purpose:

```text
Check Roles

Check Permissions

Restrict Access
```

---

## Validation Middleware

Purpose:

```text
Validate Request Body

Validate Email

Validate Password

Validate Input Data
```

---

## Logging Middleware

Purpose:

```text
Log Requests

Log URLs

Log Request Times

Log User Activity
```

---

## Error Middleware

Purpose:

```text
Handle Exceptions

Handle Application Errors

Return Consistent Error Responses
```

---

## Parsing Middleware

Example:

```js
express.json();
```

Purpose:

```text
Convert JSON

↓

req.body
```

Without parsing middleware:

```text
req.body

↓

Undefined
```

---

# Express Uses Middleware Internally

Many Express features are implemented as middleware.

Example:

```js
app.use(express.json());
```

Flow:

```text
Incoming JSON

↓

express.json()

↓

req.body Available
```

This is middleware running before the controller.

---

# Middleware Best Practices

Middleware should:

```text
Do One Thing

Be Reusable

Be Easy To Understand

Pass Control Clearly
```

---

Good Example:

```text
Authentication Only
```

or

```text
Validation Only
```

---

Bad Example:

```text
Authentication

Validation

Database Query

Email Sending

Logging
```

inside a single middleware.

This violates the single responsibility principle.

---

# Middleware Architecture

A typical request flow in a real application:

```text
Request

↓

Global Middleware

↓

Logger Middleware

↓

Authentication Middleware

↓

Validation Middleware

↓

Controller

↓

Response
```

Each layer performs a specific responsibility.

---

# Common Misconceptions

## ❌ Middleware And Controllers Are The Same

False.

Middleware processes requests.

Controllers contain business logic.

---

## ❌ Middleware Must Always Call next()

False.

Middleware may send a response and terminate the request.

---

## ❌ Middleware Cannot Modify Requests

False.

Middleware frequently adds properties such as:

```text
req.user
```

---

## ❌ Middleware Order Does Not Matter

False.

Express executes middleware sequentially.

Order directly affects application behavior.

---

# Key Takeaways

- Middleware runs between the request and the controller.
- Middleware exists to eliminate duplicated logic.
- Middleware receives `req`, `res`, and `next`.
- Middleware can inspect, modify, allow, or block requests.
- Middleware helps implement authentication, validation, logging, and error handling.
- Middleware can add data to the request object.
- Middleware can terminate requests early.
- Middleware execution order matters.
- Controllers should focus on business logic while middleware handles shared concerns.

---

# One-Line Summary

Middleware is a reusable request-processing layer that executes between incoming requests and controllers, allowing applications to handle shared concerns such as authentication, validation, logging, and error handling while keeping controllers focused on business logic.
