# Request Lifecycle

## Introduction

Every time a client interacts with a backend application, a request lifecycle begins.

Examples:

```text
Open Website

Click Button

Submit Form

Fetch Data

Login
```

All of these actions generate HTTP requests.

A request lifecycle is the complete journey of a request from the client to the server and back to the client.

Understanding this flow is essential because middleware, authentication, authorization, validation, logging, and controllers all operate within this lifecycle.

---

# What Is A Request Lifecycle?

Definition:

> The complete process a request follows from the moment it is created by the client until a response is returned and the request is completed.

High-level flow:

```text
Browser

↓

Request

↓

Express Server

↓

Route Matching

↓

Middleware

↓

Controller

↓

Response

↓

Browser
```

---

# Example Request

User clicks:

```text
View Profile
```

Browser sends:

```http
GET /profile
```

The request travels to the backend server.

This begins the request lifecycle.

---

# Step 1 — Browser Creates Request

The browser prepares an HTTP request.

A request usually contains:

```text
Method

URL

Headers

Body (Optional)
```

Example:

```http
GET /profile
Authorization: Bearer xyz123
```

The browser sends this information to the server.

---

# Step 2 — Request Reaches Express

The request reaches:

```text
Internet

↓

Node.js

↓

Express
```

When Express receives the request, it creates two important objects:

```text
req

res
```

These objects exist only for the current request.

---

# The Request Object (req)

The request object contains everything sent by the client.

Examples:

```text
Headers

Body

Query Parameters

Route Parameters

URL

HTTP Method
```

Common properties:

```js
req.body;
req.headers;
req.query;
req.params;
req.method;
req.url;
```

---

## Example

Request:

```http
POST /login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Accessed through:

```js
req.body.email;
req.body.password;
```

---

# The Response Object (res)

The response object is used to send data back to the client.

Common methods:

```js
res.send();
res.json();
res.status();
```

Examples:

```js
res.status(200).json(...)
```

```js
res.send(...)
```

The response object controls what the client receives.

---

# Important Concept

Express creates a new:

```text
req

res
```

for every request.

Example:

```text
Request 1

↓

req1

res1
```

---

```text
Request 2

↓

req2

res2
```

Every request receives its own independent objects.

---

# Step 3 — Route Matching

Express examines:

```text
HTTP Method

+

URL Path
```

Example:

```http
GET /profile
```

Express searches for:

```js
router.get("/profile");
```

or

```js
app.get("/profile");
```

---

## Route Found

```text
Continue Processing
```

---

## Route Not Found

```text
404 Not Found
```

Request lifecycle ends.

---

# Step 4 — Middleware Execution

Before reaching the controller, middleware may execute.

Flow:

```text
Request

↓

Middleware

↓

Middleware

↓

Controller
```

Example:

```text
Request

↓

Logger Middleware

↓

Authentication Middleware

↓

Controller
```

Middleware can:

```text
Modify Request

Modify Response

Validate Data

Authenticate Users

Log Information

Block Requests
```

---

# Step 5 — Controller Execution

After middleware completes:

```text
Controller Runs
```

Controllers contain:

```text
Business Logic
```

Examples:

```text
Get Profile

Create User

Update User

Delete User

Generate Token
```

---

## Example

```text
Request

↓

Controller

↓

Database Query

↓

Prepare Response
```

Controllers decide what action should be performed.

---

# Step 6 — Response Sent

The controller uses the response object:

```js
res.json(...)
```

or

```js
res.send(...)
```

to return data.

Example:

```json
{
  "name": "John",
  "email": "john@example.com"
}
```

Response flow:

```text
Express

↓

Node.js

↓

Internet

↓

Browser
```

---

# Step 7 — Request Ends

After the response is sent:

```text
Request Complete
```

Express destroys:

```text
req

res
```

They no longer exist.

A future request will receive completely new request and response objects.

---

# Complete Request Lifecycle

```text
Browser

↓

Create Request

↓

Internet

↓

Express

↓

Create req & res

↓

Route Matching

↓

Middleware

↓

Controller

↓

Response

↓

Browser

↓

Request Ends
```

---

# JWT Authentication Example

Consider a protected route:

```http
GET /profile
Authorization: Bearer abc123
```

Lifecycle:

```text
Browser

↓

Request

↓

Express

↓

Authentication Middleware

↓

Verify JWT

↓

Add User To Request

↓

Controller

↓

Return Profile

↓

Response

↓

Browser
```

This is the same process used in JWT-based authentication systems.

---

# Request Lifecycle In Real Applications

Most modern applications include:

```text
Request

↓

Global Middleware

↓

Authentication Middleware

↓

Validation Middleware

↓

Controller

↓

Error Handling

↓

Response
```

Every request follows a predictable pipeline.

---

# Why Understanding The Lifecycle Matters

Understanding the request lifecycle helps explain:

```text
Middleware

Authentication

Authorization

Logging

Validation

Error Handling

Protected Routes
```

Without understanding the lifecycle, Express appears to work magically.

With understanding, Express becomes a predictable request-processing pipeline.

---

# Common Misconceptions

## ❌ req And res Exist Forever

False.

They are created for each request and destroyed afterward.

---

## ❌ Controllers Run Immediately

False.

Middleware may execute before controllers.

---

## ❌ Express Stores Request Objects Permanently

False.

Request objects exist only during the lifecycle of a request.

---

## ❌ Route Matching Happens After Middleware

Usually false.

Express first determines the route and then executes the associated middleware chain.

---

# Key Takeaways

- Every client action creates an HTTP request.
- Express creates a new `req` and `res` object for every request.
- Route matching determines which handler should process the request.
- Middleware executes before controllers.
- Controllers contain business logic.
- Responses are sent using the response object.
- Request and response objects are destroyed after the response is sent.
- Understanding the lifecycle is essential for understanding middleware and authentication.

---

# One-Line Summary

A request lifecycle is the complete journey of an HTTP request from the browser to Express, through route matching, middleware, and controllers, until a response is returned and the request objects are destroyed.
