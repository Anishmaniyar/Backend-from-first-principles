# Part 6 — TTL in Rate Limiting

## Introduction

TTL (**Time To Live**) is one of the most important concepts in Redis-based rate limiting.

It automatically removes request counters after the configured time window expires, allowing clients to make requests again without any manual cleanup.

TTL ensures that rate limits are **temporary**, not permanent.

---

# Why Is TTL Needed?

Suppose the rate limit is:

```text
5 Requests

↓

Per Minute
```

Redis stores:

```text
user:45

↓

5
```

If Redis never deletes this counter:

```text
user:45

↓

5

↓

Forever
```

The user would always exceed the limit and remain permanently blocked.

TTL solves this problem.

---

# How TTL Works

When the first request arrives:

```text
Client

↓

Redis Creates Counter

↓

Counter = 1

↓

TTL = 60 Seconds
```

Redis automatically starts counting down.

After 60 seconds:

```text
TTL Expires

↓

Redis Deletes Counter
```

The next request starts with a fresh counter.

---

# Request Flow

## First Request

```text
Request

↓

Counter Doesn't Exist

↓

Create Counter

↓

Counter = 1

↓

Assign TTL = 60 Seconds

↓

Response
```

---

## Subsequent Requests

```text
Request

↓

Counter Exists

↓

Increment Counter

↓

TTL Continues Counting Down

↓

Response
```

The TTL is **not reset** for every request in a Fixed Window strategy.

---

## After TTL Expires

```text
TTL Reaches Zero

↓

Redis Deletes Counter

↓

Next Request

↓

Create New Counter

↓

Assign New TTL
```

A completely new rate-limiting window begins.

---

# Timeline Example

Suppose the rate limit is:

```text
5 Requests

↓

Per Minute
```

Timeline:

```text
12:00:05

↓

Request 1

↓

Counter = 1

↓

TTL = 60 Seconds
```

```text
12:00:20

↓

Request 2

↓

Counter = 2

↓

TTL = 45 Seconds
```

```text
12:00:45

↓

Request 3

↓

Counter = 3

↓

TTL = 20 Seconds
```

```text
12:01:05

↓

TTL Expires

↓

Counter Deleted
```

```text
12:01:10

↓

New Request

↓

Counter = 1

↓

New TTL = 60 Seconds
```

---

# Redis Commands Used

## Create / Increment Counter

```redis
INCR user:45
```

---

## Set Expiration

```redis
EXPIRE user:45 60
```

Meaning:

```text
Delete This Counter

↓

After 60 Seconds
```

---

## Check Remaining Time

```redis
TTL user:45
```

Example Output:

```text
42 Seconds Remaining
```

---

# Why Use TTL Instead Of Manual Reset?

Without TTL:

```text
Application

↓

Track Every Counter

↓

Delete Expired Counters

↓

Complex
```

With TTL:

```text
Redis

↓

Automatically Deletes

Expired Counters
```

No background jobs or manual cleanup are required.

---

# Relationship Between Counter, TTL, And Time Window

```text
Request Arrives

↓

Create Counter

↓

Assign TTL

↓

Increment Counter

↓

TTL Counts Down

↓

TTL Expires

↓

Counter Deleted

↓

Next Request

↓

New Counter Created
```

---

# Real-World Example

Login API:

```text
Limit

↓

5 Login Attempts

↓

Per Minute
```

Redis:

```text
user:45

↓

5

↓

TTL = 10 Seconds
```

After 10 seconds:

```text
Counter Deleted

↓

User Gets

5 New Attempts
```

---

# Advantages Of TTL

- Automatically resets request counters
- Prevents permanent blocking
- No manual cleanup required
- Reduces backend complexity
- Efficient memory management
- Works seamlessly with Redis counters

---

# Key Takeaways

- TTL (Time To Live) automatically removes Redis counters after the configured time window.
- The first request creates the counter and assigns a TTL.
- Subsequent requests increment the same counter until the TTL expires.
- When the TTL reaches zero, Redis deletes the counter automatically.
- The next request creates a new counter and starts a new time window.
- TTL eliminates the need for scheduled cleanup jobs or manual counter resets.

---

# Questions You Should Be Able To Answer

### Why is TTL essential in rate limiting?

```text
TTL automatically removes request counters after the configured time window, allowing clients to make requests again without manual cleanup.
```

---

### What happens after expiration?

```text
Redis deletes the request counter. The next request creates a new counter and starts a new time window.
```

---

### Why not reset counters manually?

```text
Because Redis automatically manages key expiration using TTL, making rate limiting simpler, faster, and more scalable.
```

---

# One-Line Summary

TTL automatically deletes Redis request counters when the rate-limiting time window expires, allowing new requests to start with a fresh counter while eliminating the need for manual cleanup.
