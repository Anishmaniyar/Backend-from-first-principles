# Error Middleware

## Introduction

Errors can occur anywhere in an application.

Examples:

```text
Invalid Input

User Not Found

JWT Verification Failed

Database Connection Failure

Missing Required Fields

Internal Server Errors
```

Without a proper error handling strategy, every controller would need to handle errors individually, resulting in duplicated code and inconsistent responses.

Express solves this problem using:

```text
Error Middleware
```

which enables centralized error handling.

---

# What Is Error Middleware?

Definition:

> Error middleware is a special Express middleware responsible for receiving, processing, and responding to application errors from a centralized location.

Unlike normal middleware:

```text
req

res

next
```

Error middleware receives:

```text
error

req

res

next
```

The presence of the first `error` parameter tells Express that this middleware is responsible for handling errors.

---

# Why Error Middleware Exists

Consider an application with multiple controllers:

```text
Login Controller

Signup Controller

Profile Controller

Orders Controller
```

Errors can occur in any of them.

Without error middleware:

```text
Controller

↓

Handle Error

↓

Send Response
```

Every controller would contain repetitive error handling logic.

---

Example:

```text
Login Controller

↓

Invalid Email

↓

Handle Error
```

---

```text
Profile Controller

↓

User Not Found

↓

Handle Error
```

---

```text
Orders Controller

↓

Database Error

↓

Handle Error
```

This creates duplication and inconsistent responses.

---

# Centralized Error Handling

Instead of handling errors inside every controller:

```text
Controller

↓

Error

↓

next(error)

↓

Error Middleware

↓

Response
```

All application errors are routed to a single location.

This approach is known as:

```text
Centralized Error Handling
```

---

# What Is next(error)?

You already know:

```text
next()

↓

Continue Normal Request Flow
```

---

Error handling introduces:

```text
next(error)

↓

Switch To Error Flow
```

---

Normal request:

```text
Everything Is Fine

↓

next()

↓

Continue Processing
```

---

Error request:

```text
Something Failed

↓

next(error)

↓

Error Middleware
```

---

# Normal Request Flow

Successful request:

```text
Request

↓

Middleware

↓

Controller

↓

Response
```

The request completes normally.

---

# Error Request Flow

Failed request:

```text
Request

↓

Middleware

↓

Controller

↓

Error

↓

next(error)

↓

Error Middleware

↓

Response
```

The request enters error handling mode.

---

# How Express Handles next(error)

When Express sees:

```text
next()
```

it continues to the next middleware or controller.

---

When Express sees:

```text
next(error)
```

it immediately:

```text
Skips Remaining Normal Middleware

↓

Searches For Error Middleware

↓

Handles Error
```

This is the key difference.

---

# Why Not Handle Errors Inside Controllers?

Without centralized error handling:

```text
Controller

↓

Business Logic

↓

Error Handling

↓

Response Formatting
```

Controllers become responsible for multiple concerns.

---

With error middleware:

```text
Controller

↓

Business Logic Only
```

---

```text
Error Middleware

↓

Error Handling Only
```

Responsibilities remain separated.

---

# Example Error Flow

Request:

```text
POST /login
```

User sends:

```text
Missing Email
```

Controller detects the issue:

```text
Missing Email

↓

Create Error

↓

next(error)
```

---

Flow:

```text
Controller

↓

next(error)

↓

Error Middleware

↓

400 Bad Request

↓

Response
```

---

# JWT Authentication Example

Request:

```text
GET /profile
```

No token provided.

Authentication middleware detects:

```text
Missing JWT
```

Instead of responding directly:

```text
Create Error

↓

next(error)
```

---

Flow:

```text
Authentication Middleware

↓

next(error)

↓

Error Middleware

↓

401 Unauthorized

↓

Response
```

The same error handler processes all authentication failures.

---

# Error Middleware As An Emergency Exit

Normal request:

```text
Request

↓

Middleware

↓

Controller

↓

Response
```

---

Failed request:

```text
Request

↓

Middleware

↓

Controller

↓

Error

↓

Error Middleware

↓

Response
```

Error middleware acts as an emergency route for failed requests.

---

# Consistent Error Responses

Without centralized handling:

Controller A:

```json
{
  "error": "Invalid Email"
}
```

---

Controller B:

```json
{
  "message": "User Not Found"
}
```

---

Controller C:

```json
{
  "err": "Database Error"
}
```

Inconsistent responses create confusion.

---

With error middleware:

```json
{
  "success": false,
  "message": "Invalid Email"
}
```

All errors follow the same structure.

---

# Benefits Of Centralized Error Handling

```text
Cleaner Controllers

Less Code Duplication

Consistent Error Responses

Easier Debugging

Improved Maintainability

Centralized Logging
```

---

# Error Types Commonly Handled

## Validation Errors

```text
Missing Fields

Invalid Input

Invalid Email
```

---

## Authentication Errors

```text
Invalid JWT

Expired JWT

Missing Token
```

---

## Authorization Errors

```text
Insufficient Permissions

Forbidden Access
```

---

## Database Errors

```text
Connection Failure

Query Failure

Constraint Violation
```

---

## Internal Server Errors

```text
Unexpected Exceptions

Application Crashes

Unknown Failures
```

---

# Error Middleware Lifecycle

```text
Request

↓

Middleware

↓

Controller

↓

Error Occurs

↓

next(error)

↓

Express Detects Error

↓

Error Middleware

↓

Formatted Response

↓

Client
```

---

# Common Mistakes

## ❌ Handling Errors In Every Controller

Leads to duplicated code.

Use centralized error middleware instead.

---

## ❌ Forgetting next(error)

Error middleware will never execute.

---

## ❌ Returning Different Error Formats

Creates inconsistent APIs.

Use a single response format.

---

## ❌ Mixing Business Logic With Error Logic

Controllers should focus on business operations.

Error middleware should focus on failures.

---

# Key Takeaways

- Error middleware centralizes application error handling.
- Error middleware receives `error`, `req`, `res`, and `next`.
- `next(error)` switches Express into error handling mode.
- Express skips normal middleware when an error occurs.
- Controllers should focus on business logic, not error formatting.
- Error middleware creates consistent API responses.
- Centralized error handling reduces duplication and improves maintainability.
- Authentication, validation, database, and server errors can all be handled in one place.

---

# One-Line Summary

Error middleware is a specialized Express middleware that receives errors through `next(error)`, centralizes application-wide error handling, and produces consistent responses from a single location instead of handling errors separately in every controller.
