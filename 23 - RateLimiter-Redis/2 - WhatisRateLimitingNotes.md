# Part 2 — What Is Rate Limiting?

## Introduction

Rate Limiting is a mechanism that restricts how many requests a client can make within a specified time period.

It helps protect backend services from abuse, ensures fair resource usage, and prevents excessive load on servers.

A rate limiter decides whether a request should be **allowed** or **rejected** based on the number of requests made by a client within a defined time window.

---

# What Is Rate Limiting?

Rate Limiting is the process of limiting the number of requests a client can make during a specific time window.

Example:

```text
100 Requests

↓

Per Minute
```

If the client stays within the limit:

```text
Request

↓

Allowed
```

If the client exceeds the limit:

```text
Request

↓

Rejected

↓

HTTP 429
```

---

# Core Components Of Rate Limiting

Every rate limiter needs three things:

- Client Identification
- Request Counter
- Time Window

These components work together to determine whether a request should be accepted or rejected.

---

# Client Identification

Before counting requests, the application must identify **who** is making the request.

Common identifiers include:

## IP Address

Example:

```text
192.168.1.10
```

Redis Key:

```text
ip:192.168.1.10
```

Used for:

- Public APIs
- Anonymous users
- Login endpoints

---

## User ID

Example:

```text
user:45
```

Used for:

- Authenticated users
- User-specific limits

---

## API Key

Example:

```text
apikey:ABC123
```

Used for:

- SaaS APIs
- Third-party integrations
- Developer platforms

---

# Request Counter

Redis stores a counter for each identified client.

Example:

```text
user:45

↓

Count = 3
```

Each incoming request increments the counter.

```text
Request 1

↓

Count = 1

----------------

Request 2

↓

Count = 2

----------------

Request 3

↓

Count = 3
```

The backend compares this counter against the configured limit.

---

# Time Window

A Time Window defines **how long** requests are counted.

Example:

```text
100 Requests

↓

Per Minute
```

Here:

```text
Time Window

↓

1 Minute
```

When the time window expires:

```text
Counter

↓

Reset
```

A new counting cycle begins.

---

# Rate Limiting Flow

```text
Client

↓

Identify Client

↓

Read Counter From Redis

↓

Counter < Limit ?

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

Return HTTP 429
```

The controller executes only if the client has not exceeded the configured limit.

---

# Example

Suppose the rule is:

```text
5 Requests

↓

Per Minute
```

Requests:

```text
Request 1

↓

Allowed

Count = 1
```

```text
Request 2

↓

Allowed

Count = 2
```

```text
Request 3

↓

Allowed

Count = 3
```

```text
Request 4

↓

Allowed

Count = 4
```

```text
Request 5

↓

Allowed

Count = 5
```

```text
Request 6

↓

Rejected

↓

HTTP 429 Too Many Requests
```

The client must wait until the time window resets.

---

# Why Is A Request Counter Needed?

Without a request counter, the backend cannot determine how many requests a client has already made.

Redis stores this information.

Example:

```text
user:45

↓

Requests = 83
```

The backend compares:

```text
83

<

100
```

If true:

```text
Allow Request
```

Otherwise:

```text
Reject Request
```

---

# Why Is Redis Used?

Redis is ideal because it provides:

- Fast in-memory counters
- Atomic increment operations
- Automatic expiration using TTL
- Shared counters across multiple backend servers

Instead of storing counters in application memory, every server reads and updates the same counter in Redis.

---

# Real-World Examples

## Login API

```text
5 Login Attempts

↓

Per Minute
```

---

## OTP Endpoint

```text
3 OTP Requests

↓

Per 10 Minutes
```

---

## Public API

```text
100 Requests

↓

Per Minute
```

---

## AI API

```text
50 Requests

↓

Per Hour
```

---

# Key Takeaways

- Rate limiting restricts how many requests a client can make within a time window.
- Every rate limiter requires client identification, a request counter, and a time window.
- Clients can be identified using an IP address, User ID, or API key.
- Redis stores request counters for each client.
- Every request increments the client's counter.
- Requests within the limit are allowed.
- Requests exceeding the limit receive **HTTP 429 (Too Many Requests)**.
- Redis is widely used because it provides fast, shared, in-memory counters.

---

# Questions You Should Be Able To Answer

### What is a rate limit?

```text
A rule that restricts how many requests a client can make within a specified time window.
```

---

### How does a request counter work?

```text
Redis stores a counter for each client. Every request increments the counter, and once the configured limit is reached, additional requests are rejected.
```

---

### How do we identify clients?

```text
Clients are commonly identified using an IP address, User ID, or API key. Each identifier has its own request counter in Redis.
```

---

# One-Line Summary

Rate limiting works by identifying a client, counting their requests in Redis within a defined time window, and rejecting any requests that exceed the configured limit using **HTTP 429 (Too Many Requests)**.
