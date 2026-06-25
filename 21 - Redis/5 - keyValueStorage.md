# Part 5 — Key-Value Storage

## Introduction

Redis stores data using a simple but powerful model:

```text
Key

↓

Value
```

Every piece of data in Redis is identified by a unique key, which is used to store and retrieve its corresponding value.

This key-value model is the foundation of all Redis use cases, including caching, sessions, rate limiting, queues, and Pub/Sub.

---

# What Is A Key?

A key is a unique identifier for a piece of data stored in Redis.

Think of it as:

```text
Address

↓

Location Of Data
```

Example:

```bash
SET name "Anish"
```

Key:

```text
name
```

---

# What Is A Value?

A value is the actual data associated with a key.

Example:

```bash
SET name "Anish"
```

Value:

```text
Anish
```

---

Together:

```text
name

↓

Anish
```

---

# Redis Key-Value Model

Conceptually, Redis stores data like:

```text
user:1        →  Anish

user:2        →  John

product:1     →  iPhone

session:123   →  User Session
```

Every key maps to exactly one value.

---

# Why Simple Keys Don't Scale

Using simple keys like:

```bash
SET name "Anish"
```

works only for very small applications.

Suppose another user registers:

```bash
SET name "John"
```

Now:

```text
name

↓

John
```

The previous value is overwritten because keys must be unique.

---

# Namespaces

Namespaces organize Redis keys using prefixes.

Instead of:

```text
name
```

Use:

```text
user:1:name
```

Example:

```text
user:1:name

↓

Anish

----------------

user:2:name

↓

John
```

Namespaces help group related data together.

---

# Key Naming Conventions

Production applications follow consistent naming patterns.

## Common Pattern

```text
entity:id
```

Examples:

```text
user:1

user:2

product:1

product:25

order:10

session:abc123
```

---

## Detailed Pattern

```text
entity:id:field
```

Examples:

```text
user:1:name

user:1:email

user:1:phone

product:10:price
```

This makes keys easy to understand and maintain.

---

# Why Use Prefixes?

Prefixes provide organization.

Instead of:

```text
name

email

price
```

Use:

```text
user:1

product:10

session:abc123

cart:5
```

Benefits:

```text
Readable

Organized

Avoid Naming Conflicts

Easy Debugging

Easy Maintenance
```

---

# Key Lookup

Redis retrieves data using the key.

Example:

```bash
GET user:1
```

Flow:

```text
Receive Key

↓

Search Memory

↓

Find Matching Key

↓

Return Value
```

Output:

```text
Anish
```

Because Redis stores data in memory, key lookup is extremely fast.

---

# Key Lifecycle

Every Redis key follows a lifecycle.

## Step 1 — Create

```bash
SET user:1 "Anish"
```

---

## Step 2 — Read

```bash
GET user:1
```

---

## Step 3 — Update

```bash
SET user:1 "Anish Maniyar"
```

---

## Step 4 — Expire (Optional)

```bash
EXPIRE user:1 60
```

The key automatically expires after the specified time.

---

## Step 5 — Delete

```bash
DEL user:1
```

The key is permanently removed.

---

## Complete Lifecycle

```text
Create

↓

Read

↓

Update

↓

Expire / Delete
```

---

# Real-World Examples

## User Data

```text
user:1

↓

Anish
```

---

## Product Cache

```text
product:101

↓

iPhone 16
```

---

## User Session

```text
session:abc123

↓

Session Information
```

---

## Shopping Cart

```text
cart:5

↓

Cart Data
```

---

## OTP

```text
otp:+919876543210

↓

123456
```

---

## Rate Limiting

```text
rate_limit:192.168.1.5

↓

25 Requests
```

---

# Common Production Key Patterns

```text
user:1

user:1:profile

user:1:settings

product:10

order:55

cart:12

session:abc123

otp:+919876543210

cache:homepage

rate_limit:192.168.1.5
```

---

# Key Takeaways

- Redis stores data as key-value pairs.
- Every key must be unique.
- A value is the data associated with a key.
- Namespaces organize keys using prefixes.
- Good naming conventions improve readability and maintenance.
- Redis retrieves data using key lookup.
- Every key follows a lifecycle: Create → Read → Update → Expire/Delete.
- Production applications use structured keys like `user:1` and `session:abc123`.

---

# Questions You Should Be Able To Answer

### What is a key?

```text
A unique identifier used to store and retrieve data in Redis.
```

---

### What is a value?

```text
The actual data associated with a key.
```

---

### What are namespaces?

```text
A way of organizing Redis keys using prefixes such as user:, product:, and session:.
```

---

### Why use prefixes?

```text
To organize data, avoid naming conflicts, improve readability, and make Redis easier to maintain.
```

---

### What is key lookup?

```text
The process of searching Redis memory for a key and returning its associated value.
```

---

### What is the key lifecycle?

```text
Create

↓

Read

↓

Update

↓

Expire / Delete
```

---

# One-Line Summary

Redis organizes all data as key-value pairs, and production systems use structured key names like `user:1`, `product:10`, and `session:abc123` to keep data organized, scalable, and easy to retrieve.
