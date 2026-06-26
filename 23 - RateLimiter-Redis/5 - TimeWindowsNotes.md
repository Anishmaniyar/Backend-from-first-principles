# Part 5 — Time Windows

## Introduction

A **Time Window** defines the duration during which Redis counts client requests for rate limiting.

Instead of counting requests forever, Redis counts requests only within a specific period (such as one minute or one hour). Once the time window expires, the counter resets and a new counting period begins.

---

# What Is A Time Window?

A Time Window is:

```text
A Fixed Duration

↓

During Which

Client Requests

Are Counted
```

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

---

# Why Do We Need A Time Window?

Without a time window:

```text
Request Counter

↓

Keeps Increasing Forever
```

Example:

```text
User

↓

100 Requests Today

↓

1 Request Tomorrow

↓

Blocked Forever
```

This is incorrect because rate limits should apply only for a limited duration.

With a time window:

```text
Count Requests

↓

Window Ends

↓

Counter Resets

↓

New Window Starts
```

---

# Example

Suppose the rate limit is:

```text
5 Requests

↓

Per Minute
```

Timeline:

```text
12:00:00

↓

Request 1

↓

Count = 1

----------------

Request 5

↓

Count = 5

↓

Allowed

----------------

Request 6

↓

HTTP 429
```

At:

```text
12:01:00
```

The time window resets.

Counter becomes:

```text
0
```

The client can make requests again.

---

# Fixed Window

A Fixed Window divides time into fixed intervals.

Example:

```text
12:00 - 12:01

↓

Count Requests

----------------

12:01 - 12:02

↓

New Counter

----------------

12:02 - 12:03

↓

New Counter
```

Every window starts and ends at fixed clock times.

---

# Fixed Window Problem

Suppose the limit is:

```text
100 Requests

↓

Per Minute
```

A client sends:

```text
100 Requests

↓

12:00:59
```

One second later:

```text
12:01:00

↓

Counter Resets

↓

100 More Requests
```

The client sends:

```text
200 Requests

↓

In Just 2 Seconds
```

This burst is a limitation of the Fixed Window approach.

---

# Sliding Window

A Sliding Window always considers the most recent time period.

Instead of using fixed clock intervals:

```text
12:00 - 12:01
```

it considers:

```text
Last 60 Seconds
```

For every new request.

Example:

Current Time:

```text
12:05:30
```

Redis counts requests between:

```text
12:04:30

↓

12:05:30
```

Older requests automatically fall outside the window.

---

# Rolling Window

Rolling Window is another term commonly used for Sliding Window.

Both approaches count requests within the **most recent** time period instead of fixed clock intervals.

---

# Window Reset

Every time window eventually expires.

Flow:

```text
First Request

↓

Create Counter

↓

Assign TTL

↓

TTL Expires

↓

Counter Deleted

↓

Next Request

↓

New Counter Created
```

Redis typically uses **TTL** to reset counters automatically.

---

# Fixed Window vs Sliding Window

| Fixed Window               | Sliding Window                       |
| -------------------------- | ------------------------------------ |
| Uses fixed clock intervals | Uses the last N seconds/minutes      |
| Simple to implement        | More accurate and fair               |
| May allow request bursts   | Prevents burst traffic at boundaries |
| Lower complexity           | Slightly more complex                |

---

# Real-World Example

GitHub API:

```text
5000 Requests

↓

Per Hour
```

Time Window:

```text
1 Hour
```

After one hour:

```text
Counter Resets

↓

5000 Requests Available Again
```

---

# Advantages Of Time Windows

- Prevents permanent blocking
- Makes rate limits temporary
- Provides fair access to all users
- Controls backend traffic
- Works efficiently with Redis TTL

---

# Key Takeaways

- A Time Window defines how long requests are counted.
- Counters reset when the time window expires.
- Fixed Windows use predefined clock intervals.
- Sliding Windows always consider the most recent time period.
- Sliding Windows provide fairer rate limiting than Fixed Windows.
- Redis commonly uses TTL to automatically reset request counters.

---

# Questions You Should Be Able To Answer

### What is a Time Window?

```text
A Time Window is the duration during which Redis counts client requests before resetting the request counter.
```

---

### Why reset counters?

```text
Because rate limits apply only for a specific period. Resetting counters allows clients to make requests again in the next time window.
```

---

### What is the difference between Fixed Window and Sliding Window?

```text
Fixed Window counts requests within predefined clock intervals, while Sliding Window continuously counts requests made during the most recent time period, making it more accurate and fair.
```

---

# One-Line Summary

A Time Window defines how long Redis counts requests for rate limiting. When the window expires, the counter resets, allowing clients to make new requests. Fixed Windows are simpler, while Sliding Windows provide more accurate and fair traffic control.
