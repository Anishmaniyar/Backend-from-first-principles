# Part 10 — Rate Limiting Algorithms

## Introduction

A **Rate Limiting Algorithm** defines **how requests are counted and controlled** within a given time period.

Different algorithms provide different trade-offs between:

- Accuracy
- Memory Usage
- Fairness
- Complexity
- Burst Handling

There is no single "best" algorithm. The choice depends on the application's requirements.

---

# 1. Fixed Window Counter

The simplest and most commonly used algorithm.

### How It Works

```text
Start Window

↓

Counter = 0

↓

Every Request

↓

Counter++

↓

Window Ends

↓

Counter Reset
```

### Example

```text
Limit

↓

100 Requests

↓

Per Minute
```

At the beginning of every minute:

```text
Counter

↓

Reset To 0
```

---

### Advantages

- Very simple
- Fast
- Low memory usage
- Easy to implement

### Disadvantages

- Boundary problem
- Allows sudden request bursts when a new window begins

---

# 2. Sliding Window Log

Instead of storing only a counter, Redis stores the timestamp of every request.

### How It Works

```text
Request

↓

Store Timestamp

↓

Remove Old Timestamps

↓

Count Remaining Requests
```

Example:

```text
12:00:05

12:00:12

12:00:18

12:00:41
```

Only timestamps within the most recent time window are counted.

---

### Advantages

- Highly accurate
- Fair request limiting
- Eliminates boundary problems

### Disadvantages

- Higher memory usage
- Stores every request timestamp
- More computational overhead

---

# 3. Sliding Window Counter

A hybrid approach between Fixed Window and Sliding Window Log.

### How It Works

```text
Current Window

+

Previous Window

↓

Estimate Effective Request Count
```

Instead of storing every timestamp, Redis combines data from the current and previous windows.

---

### Advantages

- More accurate than Fixed Window
- Lower memory usage than Sliding Window Log
- Better burst control

### Disadvantages

- Slightly more complex
- Provides an approximation rather than an exact count

---

# 4. Token Bucket

One of the most popular production algorithms.

### How It Works

```text
Bucket

↓

Contains Tokens

↓

Each Request

Consumes One Token
```

Example:

```text
100 Tokens

↓

Request

↓

99 Tokens
```

When all tokens are consumed:

```text
0 Tokens

↓

HTTP 429
```

---

## Token Refill

Tokens are automatically added over time.

Example:

```text
+1 Token

↓

Every Second
```

This allows the bucket to recover gradually.

---

### Advantages

- Supports short bursts
- Fair request distribution
- Efficient memory usage
- Widely used in production systems

### Disadvantages

- Slightly more complex than Fixed Window

---

# 5. Leaky Bucket

The Leaky Bucket algorithm processes requests at a constant rate.

### How It Works

```text
Incoming Requests

↓↓↓↓↓↓↓↓

↓

Bucket

↓

Requests Leave

↓

Constant Speed
```

Even if many requests arrive simultaneously, they are processed steadily.

---

### Advantages

- Smooth traffic flow
- Prevents sudden request spikes
- Stable request processing

### Disadvantages

- Requests may be delayed
- Less suitable when burst traffic should be allowed

---

# Algorithm Comparison

| Algorithm              | Accuracy  | Memory Usage | Complexity | Burst Handling |
| ---------------------- | --------- | ------------ | ---------- | -------------- |
| Fixed Window           | Low       | Very Low     | Easy       | Poor           |
| Sliding Window Log     | Very High | High         | Medium     | Good           |
| Sliding Window Counter | High      | Medium       | Medium     | Better         |
| Token Bucket           | High      | Low          | Medium     | Excellent      |
| Leaky Bucket           | High      | Low          | Medium     | Smooth         |

---

# Which Algorithm Is Used?

## Fixed Window

Common for:

- Small APIs
- Learning projects
- Simple backend applications

---

## Sliding Window

Common for:

- API Gateways
- Large backend systems
- High-traffic applications

---

## Token Bucket

Common for:

- Cloudflare
- API Gateways
- Public APIs
- Production backend systems

---

## Leaky Bucket

Common for:

- Network traffic control
- Routers
- Systems requiring smooth request processing

---

# Which Algorithm Will We Build?

For learning Redis, we'll implement:

```text
Redis Counter

+

TTL

↓

Fixed Window Counter
```

Reason:

- Simple to understand
- Easy to implement
- Demonstrates Redis counters and TTL
- Forms the foundation for understanding advanced algorithms

---

# Key Takeaways

- Rate limiting algorithms determine how requests are counted and controlled.
- Fixed Window is the simplest algorithm but suffers from boundary problems.
- Sliding Window Log provides the highest accuracy by storing every request timestamp.
- Sliding Window Counter balances accuracy and memory usage.
- Token Bucket allows controlled bursts by using refillable tokens.
- Leaky Bucket smooths incoming traffic by processing requests at a constant rate.
- Different production systems choose different algorithms based on fairness, scalability, and performance requirements.

---

# Questions You Should Be Able To Answer

### Which algorithm is the simplest?

```text
Fixed Window Counter.
```

---

### Which algorithm is the most accurate?

```text
Sliding Window Log because it stores every request timestamp.
```

---

### Which algorithm is commonly used in production?

```text
Token Bucket and Sliding Window algorithms are commonly used because they provide better fairness and burst handling while remaining efficient.
```

---

### Which algorithm will we implement?

```text
Fixed Window Counter using Redis Counters and TTL.
```

---

# One-Line Summary

Rate limiting algorithms provide different ways to count and control requests, balancing simplicity, fairness, memory usage, and performance. Fixed Window is the easiest to implement, while Token Bucket and Sliding Window algorithms are preferred in many production systems.
