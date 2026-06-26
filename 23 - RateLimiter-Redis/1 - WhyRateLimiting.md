# Part 1 — Why Rate Limiting Exists

## Introduction

Rate Limiting is a technique used to control how many requests a client can make within a specific period of time.

Its primary purpose is to protect applications from abuse, maintain backend stability, ensure fair usage, and reduce unnecessary infrastructure costs.

Redis is commonly used for rate limiting because it provides fast, in-memory counters with automatic expiration.

---

# Why Do Applications Need Rate Limiting?

Without rate limiting, any client can send unlimited requests.

Example:

```text
Client

↓

100,000 Requests

↓

Backend
```

Every request consumes backend resources.

Eventually, the server becomes slow or unavailable.

Rate limiting prevents this by restricting the number of requests allowed within a given time window.

---

# API Abuse

API Abuse occurs when a client sends requests far beyond normal or intended usage.

Examples:

- Login brute-force attacks
- OTP spam
- Web scraping
- API spam
- Automated bots

Rate limiting helps detect and stop abusive behavior.

---

# Request Flooding

Request Flooding occurs when an application receives an extremely large number of requests in a short period.

Example:

```text
Normal Traffic

↓

100 Requests / Second

----------------

Attack Traffic

↓

10,000 Requests / Second
```

Without protection, excessive requests can overwhelm the backend.

---

# Resource Protection

Every backend has limited resources.

Examples:

- CPU
- Memory
- Network Bandwidth
- Database Connections
- Redis Memory

Rate limiting prevents a single client from consuming all available resources.

---

# Fair Usage

Applications serve many users simultaneously.

Without rate limiting:

```text
One User

↓

Consumes Most Resources

↓

Other Users Experience Slowdowns
```

Rate limiting ensures that every client receives a fair share of system resources.

---

# Cost Protection

Many backend services call paid APIs.

Examples:

- OpenAI API
- Google Maps API
- SMS Gateway
- Email Services

Without rate limiting:

```text
Excessive Requests

↓

Higher API Usage

↓

Higher Infrastructure Costs
```

Rate limiting helps control unnecessary expenses.

---

# Backend Stability

Without rate limiting:

```text
Many Requests

↓

High CPU Usage

↓

Database Overload

↓

Slow Responses

↓

Possible Server Crash
```

With rate limiting:

```text
Excess Requests

↓

Rejected

↓

Backend Remains Stable
```

Rate limiting protects the overall health of the application.

---

# DoS vs DDoS (Overview)

## DoS (Denial of Service)

A single machine attempts to overwhelm a server.

```text
One Attacker

↓

Server
```

---

## DDoS (Distributed Denial of Service)

Multiple machines attack simultaneously.

```text
Machine 1

Machine 2

Machine 3

↓

Server
```

Rate limiting helps reduce abuse but cannot completely stop large-scale DDoS attacks.

---

# Common Use Cases

## Login API

```text
5 Login Attempts

↓

Temporarily Block Further Attempts
```

---

## OTP Verification

```text
3 OTP Requests

↓

Wait Before Requesting Again
```

---

## Password Reset

Limit password reset requests to prevent email abuse.

---

## AI APIs

Restrict expensive AI requests to control costs.

---

## Payment APIs

Prevent repeated payment requests caused by users or bots.

---

# Why Is Redis Used?

Redis is ideal because it provides:

- Extremely fast in-memory counters
- Atomic increment operations
- Automatic expiration using TTL
- Shared counters across multiple backend servers
- High scalability

Instead of storing request counts in application memory, Redis allows every server to use the same centralized counter.

---

# Key Takeaways

- Rate limiting controls how many requests a client can make within a time period.
- It protects applications from abuse and excessive traffic.
- It prevents brute-force attacks and request flooding.
- It reduces infrastructure costs by limiting unnecessary API usage.
- It ensures fair resource usage among users.
- Redis is commonly used because it provides fast shared counters with TTL support.
- Rate limiting improves backend stability and application reliability.

---

# Questions You Should Be Able To Answer

### Why do applications need rate limiting?

```text
To prevent abuse, protect backend resources, reduce infrastructure costs, and ensure fair usage for all users.
```

---

### What happens without rate limiting?

```text
Clients can send unlimited requests, leading to resource exhaustion, slow responses, increased costs, and possible service outages.
```

---

### Why is Redis used for rate limiting?

```text
Because Redis provides fast, in-memory, shared counters with automatic expiration, making it ideal for implementing scalable and distributed rate limiting.
```

---

# One-Line Summary

Rate limiting protects backend applications by restricting how many requests a client can make within a specific time period, preventing abuse, improving stability, ensuring fair usage, and reducing infrastructure costs.
