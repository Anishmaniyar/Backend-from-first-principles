# Part 8 — Different Rate Limiting Strategies

## Introduction

Not every API should have the same rate limit.

Different endpoints, users, and applications have different security requirements and usage patterns.

Production applications often use multiple rate limiting strategies together.

---

# Why Different Strategies?

Different APIs serve different purposes.

Examples:

| API      | Typical Limit           |
| -------- | ----------------------- |
| Login    | 5 Requests / Minute     |
| Search   | 100 Requests / Minute   |
| Products | 500 Requests / Minute   |
| Payment  | 2 Requests / Minute     |
| OTP      | 3 Requests / 10 Minutes |

Each endpoint receives a limit based on its sensitivity and expected traffic.

---

# Strategy 1 — Per IP Rate Limiting

Clients are identified using their IP address.

Example:

```text
IP Address

↓

192.168.1.20
```

Redis Key:

```text
ip:192.168.1.20
```

Use Cases:

- Public APIs
- Login APIs
- Contact Forms
- Anonymous Users

### Advantages

- Simple to implement
- Works before authentication
- Prevents basic abuse

### Limitations

- Multiple users may share the same IP.
- One abusive user can affect others using the same network.

---

# Strategy 2 — Per User Rate Limiting

Clients are identified using their authenticated User ID.

Example:

```text
User ID

↓

45
```

Redis Key:

```text
user:45
```

Use Cases:

- Authenticated APIs
- User Dashboards
- SaaS Applications

### Advantages

- Every user has an independent request limit.
- Shared IP addresses do not affect other users.

---

# Strategy 3 — Per API Key Rate Limiting

Clients are identified using an API key.

Example:

```text
API Key

↓

abc123
```

Redis Key:

```text
apikey:abc123
```

Use Cases:

- Public APIs
- Developer Platforms
- Third-Party Integrations

Examples:

- OpenAI API
- Stripe API
- GitHub API
- Google Maps API

---

# Strategy 4 — Per Route Rate Limiting

Different API routes have different request limits.

Examples:

```text
GET /products

↓

500 Requests / Minute
```

```text
POST /login

↓

5 Requests / Minute
```

```text
POST /send-otp

↓

3 Requests / 10 Minutes
```

```text
POST /payment

↓

2 Requests / Minute
```

Sensitive routes receive stricter limits.

---

# Strategy 5 — Global Rate Limiting

A single limit protects the entire application.

Example:

```text
Application

↓

50,000 Requests

↓

Per Minute
```

Useful for preventing overall infrastructure overload.

---

# Combining Strategies

Production systems often combine multiple strategies.

Example:

```text
Login API

↓

Per IP

↓

5 Requests / Minute

AND

Per User

↓

10 Requests / Hour
```

Another example:

```text
API Key

↓

1000 Requests / Hour

AND

Global Limit

↓

100,000 Requests / Hour
```

All configured limits must pass before the request is allowed.

---

# Choosing The Right Strategy

| API Type   | Recommended Strategy      |
| ---------- | ------------------------- |
| Login      | Per IP                    |
| Dashboard  | Per User                  |
| Public API | Per API Key               |
| OTP        | Per IP + Per Phone Number |
| Payment    | Per User + Per Route      |

---

# Real-World Examples

## Instagram

- Login → Per IP
- Feed → Per User
- Upload → Per User + Per Route

---

## GitHub

- Per API Token

---

## OpenAI

- Per API Key
- Plan-based request limits

---

## Banking Applications

- Per User
- Per Route
- Additional security checks

---

# Comparison

| Strategy    | Identifies By      | Best For                  |
| ----------- | ------------------ | ------------------------- |
| Per IP      | IP Address         | Public APIs, Login        |
| Per User    | User ID            | Authenticated Users       |
| Per API Key | API Key            | SaaS APIs                 |
| Per Route   | API Endpoint       | Sensitive Operations      |
| Global      | Entire Application | Infrastructure Protection |

---

# Advantages

- Flexible request control
- Better security
- Fair resource allocation
- Protects sensitive APIs
- Supports different usage patterns

---

# Key Takeaways

- Different APIs require different request limits.
- Per IP limits anonymous users and public endpoints.
- Per User limits authenticated users individually.
- Per API Key limits developers and third-party applications.
- Per Route applies different limits to different endpoints.
- Global limits protect the entire infrastructure.
- Production systems usually combine multiple strategies for better security and scalability.

---

# Questions You Should Be Able To Answer

### Should every route have the same limit?

```text
No. Different endpoints have different traffic patterns, security requirements, and business importance, so they require different rate limits.
```

---

### When should limits differ?

```text
Limits should differ based on endpoint sensitivity, expected traffic, authentication status, infrastructure cost, and security risks.
```

---

### Which strategy is most commonly used?

```text
Production applications usually combine multiple strategies such as Per IP, Per User, Per API Key, Per Route, and Global limits to provide comprehensive protection.
```

---

# One-Line Summary

Production applications use different rate limiting strategies—such as Per IP, Per User, Per API Key, Per Route, and Global limits—to provide fair usage, improve security, and protect backend infrastructure efficiently.
