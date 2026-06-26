# Part 3 — Request Flow

## Introduction

Every request to a protected API passes through a **Rate Limiting Middleware** before reaching the controller.

The middleware checks Redis to determine whether the client has exceeded the configured request limit.

If the limit has not been reached, the request proceeds normally.

If the limit has been exceeded, the request is immediately rejected with **HTTP 429 (Too Many Requests)**.

---

# Request Flow

```text
Client

↓

Express Server

↓

Rate Limiter Middleware

↓

Redis

↓

Limit Reached?

↓

YES

↓

HTTP 429

----------------

NO

↓

Increment Counter

↓

Controller

↓

Response
```

The rate limiter executes **before** the controller.

---

# Step 1 — Incoming Request

A client sends an HTTP request.

Example:

```http
GET /products
```

The request first reaches the Express server.

---

# Step 2 — Client Identification

The middleware identifies who is making the request.

Possible identifiers:

- IP Address
- User ID
- API Key

Example:

```text
user:45
```

Each client has its own request counter in Redis.

---

# Step 3 — Redis Lookup

The middleware queries Redis to retrieve the current request count.

Example:

```text
user:45

↓

Current Count = 27
```

Redis stores only the request count, not the actual requests.

---

# Step 4 — Compare With Limit

The middleware compares the current request count with the configured limit.

Example:

```text
Current Count = 27

Limit = 100

↓

27 < 100

↓

Allow Request
```

If the limit has already been reached:

```text
Current Count = 100

Limit = 100

↓

Reject Request
```

---

# Step 5 — Increment Counter

If the request is allowed, Redis increments the counter.

Before:

```text
user:45

↓

27
```

After:

```text
user:45

↓

28
```

This ensures Redis always tracks the latest number of requests.

---

# Step 6 — Execute Controller

After the counter is incremented, the request proceeds to the controller.

```text
Client

↓

Controller

↓

Business Logic

↓

Database

↓

Response
```

---

# Step 7 — Return Response

If the request is allowed:

```http
HTTP 200 OK
```

The client receives the requested data.

---

# What Happens When The Limit Is Reached?

If Redis determines the client has exceeded the configured limit:

```text
Client

↓

Rate Limiter

↓

Redis

↓

Limit Reached

↓

HTTP 429 Too Many Requests
```

The controller is **never executed**.

No database queries or business logic are performed.

---

# Why Check Redis First?

Checking Redis first prevents unnecessary work.

Without rate limiting:

```text
Client

↓

Controller

↓

Database

↓

Then Check Limit
```

Resources have already been consumed.

With rate limiting:

```text
Client

↓

Redis

↓

Allowed?

↓

YES → Controller

NO → HTTP 429
```

Only valid requests reach the controller.

---

# Why Not Use PostgreSQL?

Request counters are updated on every request.

Using PostgreSQL would require constant:

- Reads
- Updates
- Disk Operations

Redis is preferred because it provides:

- In-memory storage
- Atomic increment operations
- Extremely low latency
- High throughput

---

# Internal Request Lifecycle

```text
Client

↓

Identify Client

↓

Redis Lookup

↓

Read Counter

↓

Compare With Limit

↓

Allowed?

↓

YES

↓

Increment Counter

↓

Controller

↓

Response

----------------

NO

↓

HTTP 429
```

---

# Real-World Example

GitHub API:

```text
Limit

↓

5000 Requests

↓

Per Hour
```

Redis:

```text
user:anish

↓

4999
```

Next request:

```text
5000

↓

Allowed
```

Next request:

```text
5001

↓

HTTP 429 Too Many Requests
```

The request is rejected before any backend processing occurs.

---

# Key Takeaways

- Every protected request first passes through the Rate Limiting Middleware.
- Redis stores a request counter for each client.
- The middleware compares the counter with the configured limit.
- If the client is within the limit, Redis increments the counter and the request proceeds.
- If the client exceeds the limit, the server immediately returns **HTTP 429**.
- The controller and database are skipped for blocked requests.
- Redis is used because it provides fast, atomic, in-memory counters.

---

# Questions You Should Be Able To Answer

### Why check Redis first?

```text
To determine whether the client is allowed before executing expensive operations such as business logic or database queries.
```

---

### Why not use PostgreSQL?

```text
Because request counters change on every request. Redis provides much faster in-memory counters with atomic operations and lower latency.
```

---

### What happens during a request?

```text
Client

↓

Identify Client

↓

Redis Reads Counter

↓

Compare With Limit

↓

If Allowed

↓

Increment Counter

↓

Execute Controller

↓

Response

----------------

If Limit Reached

↓

Return HTTP 429
```

---

# One-Line Summary

Every incoming request first passes through the Rate Limiting Middleware, which checks the client's request counter in Redis. If the request is within the configured limit, Redis increments the counter and the request proceeds; otherwise, the server immediately returns **HTTP 429 (Too Many Requests)** without executing the controller.
