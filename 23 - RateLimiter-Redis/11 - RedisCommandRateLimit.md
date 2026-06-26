# Part 11 — Redis Commands for Rate Limiting

## Introduction

Redis-based rate limiting is implemented using a small set of Redis commands.

The most commonly used commands are:

- INCR
- EXPIRE
- TTL
- GET
- DEL

Together, these commands allow Redis to count requests, automatically reset counters, and enforce rate limits efficiently.

---

# 1. INCR

The **INCR** command increments a numeric value by **1**.

### Purpose

- Count incoming requests
- Update request counters
- Perform atomic increments

Example:

Before:

```text
user:45

↓

3
```

Command:

```redis
INCR user:45
```

After:

```text
user:45

↓

4
```

### JavaScript

```javascript
await client.incr("user:45");
```

---

# 2. EXPIRE

The **EXPIRE** command assigns a **Time To Live (TTL)** to a Redis key.

### Purpose

- Automatically delete request counters
- Define the rate-limiting time window

Example:

```redis
EXPIRE user:45 60
```

Meaning:

```text
Delete This Counter

↓

After 60 Seconds
```

### JavaScript

```javascript
await client.expire("user:45", 60);
```

---

# 3. TTL

The **TTL** command returns the remaining lifetime of a Redis key.

### Purpose

- Check how much time remains before the counter expires
- Inform clients when they can retry requests

Example:

```redis
TTL user:45
```

Possible Output:

```text
42
```

Meaning:

```text
42 Seconds

↓

Remaining Before Expiration
```

### JavaScript

```javascript
await client.ttl("user:45");
```

---

# 4. GET

The **GET** command retrieves the current value stored for a Redis key.

### Purpose

- Read request counters
- Inspect stored values

Example:

```redis
GET user:45
```

Output:

```text
8
```

> Note: In many rate limiters, `GET` is not required because `INCR` already returns the updated counter value.

### JavaScript

```javascript
await client.get("user:45");
```

---

# 5. DEL

The **DEL** command removes a Redis key immediately.

### Purpose

- Reset rate limits manually
- Delete counters during testing
- Clean up unused keys

Example:

```redis
DEL user:45
```

The counter is removed immediately.

### JavaScript

```javascript
await client.del("user:45");
```

---

# Complete Request Flow

```text
Request

↓

INCR Counter

↓

First Request?

↓

YES

↓

EXPIRE 60 Seconds

↓

Allow Request

----------------

Next Requests

↓

INCR Counter

↓

Check Limit

↓

Allowed?

↓

YES

↓

Response

----------------

NO

↓

HTTP 429

↓

(Optional) TTL

↓

Tell Client When To Retry

----------------

TTL Expires

↓

Redis Deletes Counter Automatically
```

---

# Command Summary

| Command    | Purpose                                       |
| ---------- | --------------------------------------------- |
| **INCR**   | Increment the request counter                 |
| **EXPIRE** | Set the expiration time (TTL) for the counter |
| **TTL**    | Check the remaining lifetime of the counter   |
| **GET**    | Retrieve the current counter value            |
| **DEL**    | Delete the counter manually                   |

---

# Which Commands Are Used Most?

Most Redis rate limiters primarily use:

```text
INCR

+

EXPIRE
```

These two commands are sufficient to build a simple **Fixed Window Rate Limiter**.

`TTL` is commonly used to inform clients how long they must wait before retrying.

`GET` and `DEL` are used less frequently.

---

# Key Takeaways

- `INCR` atomically increments the request counter.
- `EXPIRE` assigns a TTL to automatically reset the counter.
- `TTL` returns the remaining time before the counter expires.
- `GET` retrieves the current counter value.
- `DEL` removes the counter manually.
- `INCR` and `EXPIRE` are the core commands used in most Redis-based rate limiters.

---

# Questions You Should Be Able To Answer

### What does `INCR` do?

```text
Atomically increments a numeric Redis value by one and returns the updated value.
```

---

### Why is `EXPIRE` used?

```text
To automatically delete the request counter after the configured rate-limiting time window.
```

---

### What does `TTL` return?

```text
The number of seconds remaining before a Redis key expires.
```

---

### Why isn't `GET` always required?

```text
Because INCR already returns the updated counter value, eliminating the need for a separate read operation in many implementations.
```

---

### When is `DEL` useful?

```text
For manually resetting rate limits, deleting counters during testing, or removing unnecessary Redis keys.
```

---

# One-Line Summary

Redis rate limiting is primarily built using `INCR` to count requests and `EXPIRE` to automatically reset counters, while `TTL`, `GET`, and `DEL` provide additional functionality for monitoring and managing rate limits.
