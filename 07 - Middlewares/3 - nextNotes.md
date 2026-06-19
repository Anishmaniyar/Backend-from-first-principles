# Understanding next()

## Introduction

Middleware forms the backbone of Express applications.

A request often passes through multiple middleware functions before reaching the controller.

Express needs a mechanism to determine:

```text
When One Middleware Has Finished

and

When The Next One Should Start
```

This mechanism is:

```text
next()
```

Understanding `next()` is essential for understanding how middleware chains work in Express.

---

# What Is next()?

Definition:

> `next()` is a function provided by Express that passes control from the current middleware to the next middleware or controller in the request lifecycle.

Basic flow:

```text
Request

↓

Middleware

↓

next()

↓

Next Middleware

↓

Controller

↓

Response
```

Without `next()`, Express does not know that the current middleware has finished processing.

---

# Why Does next() Exist?

Consider a request pipeline:

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
```

Express must know:

```text
When Logger Finishes

When Authentication Finishes

When Validation Finishes
```

The signal used to continue processing is:

```text
next()
```

---

# Middleware Chain

Express executes middleware sequentially.

Example:

```text
Request

↓

Logger

↓

Authentication

↓

Validation

↓

Controller

↓

Response
```

Execution flow:

```text
Logger

↓

next()

↓

Authentication

↓

next()

↓

Validation

↓

next()

↓

Controller
```

Each middleware explicitly passes control to the next stage.

---

# Request Flow With next()

Example:

```text
GET /profile
```

Middleware chain:

```text
Logger

↓

Authentication

↓

Controller
```

Execution:

```text
Request Arrives

↓

Logger Executes

↓

next()

↓

Authentication Executes

↓

next()

↓

Controller Executes

↓

Response Sent
```

The request successfully moves through the entire pipeline.

---

# What Happens If next() Is Not Called?

Suppose:

```text
Request

↓

Logger Middleware
```

and the middleware never calls:

```text
next()
```

Result:

```text
Request

↓

Logger Middleware

↓

Stops
```

The request never continues.

---

## Consequences

```text
Controller Never Executes

No Response Sent

Browser Keeps Waiting
```

This is one of the most common middleware mistakes.

---

# next() Is Not Always Required

Middleware has two possible behaviors.

---

## Option 1 — Continue Processing

Middleware finishes its work and passes control.

Flow:

```text
Middleware

↓

next()

↓

Continue Request
```

Example:

```text
JWT Valid

↓

next()
```

The request proceeds normally.

---

## Option 2 — End The Request

Middleware sends a response immediately.

Flow:

```text
Middleware

↓

Send Response

↓

Request Ends
```

Example:

```text
JWT Invalid

↓

401 Unauthorized

↓

End Request
```

No need to call:

```text
next()
```

because processing should stop.

---

# Authentication Example

Request:

```text
GET /profile
```

Authentication middleware:

```text
Check JWT
```

---

## Valid JWT

```text
JWT Valid

↓

next()

↓

Controller Executes
```

---

## Invalid JWT

```text
JWT Invalid

↓

401 Unauthorized

↓

Request Ends
```

The controller never runs.

---

# Important Rule

A middleware should typically do one of the following:

```text
Call next()
```

OR

```text
Send Response
```

Not both.

---

# Why Not Both?

Suppose middleware:

```text
Send Response

↓

next()
```

Now the next middleware or controller may also attempt to send a response.

Result:

```text
Two Responses
```

Express throws errors such as:

```text
Cannot Set Headers After They Are Sent
```

because the response was already sent.

---

# Middleware Order And next()

Middleware execution order matters.

Example:

```text
Request

↓

Logger

↓

Authentication

↓

Validation

↓

Controller
```

Execution:

```text
Logger

↓

next()

↓

Authentication

↓

next()

↓

Validation

↓

next()

↓

Controller
```

Express always processes middleware:

```text
Top

↓

Bottom
```

in the order they are registered.

---

# What Happens At The End Of The Chain?

Suppose:

```text
Request

↓

Logger Middleware

↓

Controller
```

Logger:

```text
next()
```

Express sees:

```text
No More Middleware
```

and automatically executes:

```text
Controller
```

---

# next(error)

Express provides a special form:

```text
next(error)
```

Purpose:

```text
Pass Control To Error Middleware
```

Flow:

```text
Request

↓

Controller

↓

Error Occurs

↓

next(error)

↓

Error Middleware

↓

Response
```

---

# Normal Flow vs Error Flow

## Normal Flow

```text
next()

↓

Next Middleware

↓

Controller
```

---

## Error Flow

```text
next(error)

↓

Error Middleware
```

Express skips normal middleware and routes the request to the error handler.

---

# Real JWT Authentication Example

Protected route:

```text
GET /profile
```

Request:

```text
Authorization: Bearer abc123
```

Flow:

```text
Request

↓

Authentication Middleware

↓

Verify JWT

↓

req.user = decodedUser

↓

next()

↓

Profile Controller

↓

Response
```

Without:

```text
next()
```

the controller would never execute.

---

# How Express Thinks

Express effectively follows:

```text
Run Middleware

↓

Did Middleware Call next()?

↓

YES

↓

Run Next Step

----------------

NO

↓

Stop Processing
```

This is the core idea behind middleware chaining.

---

# Common Mistakes

## ❌ Forgetting next()

Result:

```text
Request Hangs

No Response
```

---

## ❌ Sending Response Then Calling next()

Result:

```text
Multiple Responses

Express Error
```

---

## ❌ Assuming next() Sends A Response

False.

```text
next()
```

only transfers control.

It does not send anything to the client.

---

## ❌ Calling next() After Request Should End

Example:

```text
Unauthorized User

↓

401 Response

↓

next()
```

This creates unexpected behavior because processing continues after a response has already been sent.

---

# Key Takeaways

- `next()` passes control to the next middleware or controller.
- Express uses `next()` to move requests through the middleware chain.
- If `next()` is not called, the request usually stops.
- Middleware can either continue the request or end it.
- Middleware should generally call either `next()` or send a response.
- Middleware executes in the order it is registered.
- `next(error)` sends control to error-handling middleware.
- Understanding `next()` is essential for understanding Express middleware.

---

# One-Line Summary

`next()` is Express's control mechanism that moves a request through the middleware chain, allowing middleware to pass processing to the next middleware or controller while maintaining a structured request lifecycle.
