# Part 9 — Real-World Rate Limiting Examples

## Introduction

Rate limiting is applied differently depending on the API's purpose.

Sensitive endpoints receive stricter limits, while frequently used endpoints receive more relaxed limits.

Production systems configure rate limits based on security requirements, infrastructure cost, and expected user behavior.

---

# 1. Login API

Example:

```http
POST /login
```

### Problem

Without rate limiting:

- Brute-force attacks
- Password guessing
- Server abuse

### Solution

```text
5 Login Attempts

↓

Per Minute

↓

Per IP
```

Blocked clients receive:

```http
HTTP 429 Too Many Requests
```

---

# 2. OTP API

Example:

```http
POST /send-otp
```

### Problem

Without rate limiting:

- OTP spam
- Increased SMS costs
- Abuse of SMS providers

### Solution

```text
3 OTP Requests

↓

Per 10 Minutes

↓

Per Phone Number

+

Per IP
```

---

# 3. Password Reset API

Example:

```http
POST /forgot-password
```

### Problem

Without rate limiting:

- Email spam
- Inbox flooding
- Abuse of email services

### Solution

```text
5 Requests

↓

Per Hour
```

---

# 4. Public APIs

Example:

```http
GET /weather
```

### Problem

Without rate limiting:

- API abuse
- Excessive infrastructure usage
- Server overload

### Solution

```text
1000 Requests

↓

Per Hour

↓

Per API Key
```

---

# 5. AI APIs

Examples:

- OpenAI
- Claude
- Gemini

### Problem

Every request has a monetary cost.

Without rate limiting:

- High infrastructure costs
- Excessive API usage
- Resource exhaustion

### Solution

```text
100 Requests

↓

Per Minute

↓

Per API Key
```

---

# 6. Payment APIs

Example:

```http
POST /payment
```

### Problem

Without rate limiting:

- Duplicate payments
- Multiple accidental requests
- Financial risk

### Solution

```text
2 Requests

↓

Per Minute
```

Usually combined with **Idempotency Keys**.

---

# 7. File Upload APIs

Example:

```http
POST /upload
```

### Problem

Without rate limiting:

- Storage abuse
- High bandwidth usage
- Increased infrastructure costs

### Solution

```text
10 Uploads

↓

Per Hour
```

---

# 8. Search APIs

Example:

```http
GET /search
```

### Problem

Search endpoints receive frequent legitimate requests.

### Solution

```text
200 Requests

↓

Per Minute
```

Higher limits provide a better user experience.

---

# 9. Web Scraping Protection

### Problem

Bots continuously scrape website content.

Effects:

- High database load
- Increased bandwidth usage
- Content theft

### Solution

```text
100 Requests

↓

Per Minute

↓

Per IP
```

---

# Real-World Examples

## GitHub API

- Per API Token
- Example: 5000 Requests / Hour

---

## OpenAI API

- Per API Key
- Limits vary by usage tier and subscription plan.

---

## Stripe

Rate limits protect:

- Payment APIs
- Public APIs
- Backend infrastructure

---

## Instagram

Rate limiting is applied to:

- Login
- Follow
- Like
- Comment
- Upload

to reduce spam and abuse.

---

# Example Rate Limits

| Endpoint       | Example Limit | Purpose                       |
| -------------- | ------------- | ----------------------------- |
| Login          | 5/min         | Prevent brute-force attacks   |
| OTP            | 3/10 min      | Prevent SMS spam              |
| Password Reset | 5/hour        | Prevent email spam            |
| Search         | 200/min       | Support frequent searches     |
| Products       | 500/min       | Handle high read traffic      |
| Payment        | 2/min         | Prevent duplicate payments    |
| AI API         | 100/min       | Control infrastructure costs  |
| Upload         | 10/hour       | Protect storage and bandwidth |

---

# Why Different APIs Have Different Limits

Different endpoints have different:

- Security requirements
- Infrastructure costs
- Expected traffic
- Business importance
- Risk of abuse

Therefore, every API should have a rate limit appropriate for its use case.

---

# Benefits Of Rate Limiting

- Prevents brute-force attacks
- Reduces spam
- Protects backend resources
- Controls infrastructure costs
- Prevents API abuse
- Ensures fair usage
- Improves application stability

---

# Key Takeaways

- Rate limiting should be configured based on the endpoint's purpose.
- Sensitive APIs require stricter limits.
- Frequently accessed read-only APIs can have higher limits.
- Public APIs are commonly limited using API keys.
- Payment, OTP, and Login APIs usually have the strictest limits.
- Production systems often combine multiple rate limiting strategies for better security and scalability.

---

# Questions You Should Be Able To Answer

### Where is rate limiting commonly used?

```text
Login APIs, OTP APIs, Password Reset APIs, Public APIs, AI APIs, Payment APIs, File Upload APIs, Search APIs, and Web Scraping Protection.
```

---

### Why do different endpoints have different limits?

```text
Because each endpoint has different security requirements, expected traffic, infrastructure costs, and business importance.
```

---

### Which endpoints require the strictest rate limits?

```text
Login APIs, OTP APIs, Password Reset APIs, and Payment APIs because they are the most sensitive to abuse and can directly impact security or cost.
```

---

# One-Line Summary

Production applications apply different rate limits to different endpoints based on security risks, expected traffic, and infrastructure costs, ensuring a balance between protection, performance, and user experience.
