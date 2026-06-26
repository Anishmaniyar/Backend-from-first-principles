# Part 4 — Redis Counter

## Introduction

A **Redis Counter** is one of the most common Redis patterns.

It stores a numeric value that increases whenever an event occurs.

In rate limiting, the event is an **incoming HTTP request**.

Redis uses these counters to track how many requests each client has made within a given time window.

---

# What Is A Redis Counter?

A Redis Counter is:

```text
A Numeric Value

Stored In Redis

That Increases

Whenever An Event Occurs
```

Example:

```text
user:45

↓

3
```

Meaning:

```text
User 45

↓

Has Made

3 Requests
```

---

# Why Do We Need A Counter?

Without a counter, the backend cannot determine:

- How many requests a client has already made
- Whether the client has exceeded the configured rate limit

The counter allows the backend to make this decision.

---

# Counter Pattern

The Counter Pattern simply means:

```text
Event Happens

↓

Increase Counter
```

Examples:

- API Requests
- Page Views
- Downloads
- Login Attempts
- OTP Requests

Every event increments its corresponding counter.

---

# Where Is The Counter Stored?

Redis stores data as:

```text
Key

↓

Value
```

Example:

```text
user:45

↓

18
```

Meaning:

```text
User 45

↓

18 Requests
```

For IP-based rate limiting:

```text
ip:192.168.1.15

↓

57
```

Meaning:

```text
That IP

↓

57 Requests
```

---

# Redis INCR Command

Redis provides the **INCR** command.

Purpose:

```text
Increase Counter

By 1
```

Example:

Before:

```text
user:45

↓

7
```

Command:

```text
INCR user:45
```

After:

```text
user:45

↓

8
```

Every incoming request increments the client's counter.

---

# Why Not Use GET + SET?

A naive approach would be:

```text
GET Counter

↓

Counter + 1

↓

SET Counter
```

This can fail when multiple requests arrive simultaneously.

Example:

Current Counter:

```text
5
```

Request A:

```text
Reads 5
```

Request B:

```text
Reads 5
```

Both write:

```text
6
```

Correct value should be:

```text
7
```

One request is lost.

This problem is called a **Race Condition**.

---

# Atomic Increment

Redis solves this using:

```text
INCR
```

`INCR` is an **Atomic Operation**.

Atomic means:

```text
Completed

As One

Indivisible Operation
```

No other request can interrupt it.

Example:

Current Counter:

```text
5
```

Two simultaneous requests:

```text
Request A

↓

6

----------------

Request B

↓

7
```

Both requests are counted correctly.

---

# Counter Reset

Rate limiting counts requests only within a specific time window.

Example:

```text
100 Requests

↓

Per Minute
```

After the window expires:

```text
Counter

↓

Reset
```

Redis usually resets counters automatically using **TTL**.

Flow:

```text
Counter Created

↓

TTL Assigned

↓

TTL Expires

↓

Counter Removed
```

The next request starts a new counter.

---

# Key Design

Good Redis keys are descriptive.

Examples:

```text
user:45

ip:192.168.1.10

apikey:abc123
```

Poor examples:

```text
45

192

abc
```

Prefixes improve readability and prevent key collisions.

---

# Complete Request Flow

```text
Client

↓

Redis Reads Counter

↓

Counter < Limit ?

↓

YES

↓

INCR Counter

↓

Controller

↓

Response

----------------

NO

↓

HTTP 429
```

Redis increments the counter only when the request is allowed.

---

# Real-World Example

Suppose:

```text
Limit

↓

250 Requests

↓

Per Minute
```

Redis:

```text
apikey:xyz123

↓

249
```

Next request:

```text
250

↓

Allowed
```

Next request:

```text
251

↓

HTTP 429 Too Many Requests
```

The request is rejected before reaching the controller.

---

# Advantages Of Redis Counters

- Extremely fast (In-Memory)
- Atomic operations
- Prevents race conditions
- Easy to combine with TTL
- Shared across multiple backend servers
- Highly scalable

---

# Key Takeaways

- A Redis Counter stores the number of events for a specific client.
- Rate limiting uses counters to track incoming requests.
- Every request increments the counter using **INCR**.
- `INCR` is atomic, preventing race conditions.
- Counters are usually reset automatically using TTL.
- Good key naming improves organization and avoids collisions.
- Redis counters are widely used for rate limiting because they are fast, scalable, and reliable.

---

# Questions You Should Be Able To Answer

### What is a Redis Counter?

```text
A numeric value stored in Redis that tracks how many times an event has occurred for a specific client.
```

---

### Why use counters?

```text
To count client requests and determine whether they have exceeded the configured rate limit.
```

---

### Why is INCR important?

```text
Because INCR is an atomic operation that safely increments counters even when multiple requests arrive simultaneously, preventing race conditions.
```

---

### What is a Race Condition?

```text
A situation where multiple requests try to update the same counter simultaneously, causing incorrect values if updates are not atomic.
```

---

### Why use prefixes in Redis keys?

```text
To organize data clearly and prevent collisions between different types of keys.
```

---

# One-Line Summary

A Redis Counter tracks the number of requests made by each client, and the atomic **INCR** command safely increments the counter on every request, enabling accurate and scalable rate limiting.
